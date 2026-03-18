(function () {
    const TECH_COLORS = {
        EOLICA: '#14B8A6',
        FOTOVOLTAICA: '#F6C700',
        GEOTERMOELECTRICA: '#C2410C',
        NUCLEOELECTRICA: '#7C3AED',
        BIOMASA: '#43A047',
        COGENERACION: '#8D6E63',
        HIDROELECTRICA: '#1565C0',
        'NO DISPONIBLE': '#64748B'
    };

    const OWNER_COLORS = {
        Estado: '#9B2247',
        Privado: '#1E5B4F'
    };

    const MONTH_COLORS = {
        Enero: '#2563EB',
        Febrero: '#0EA5E9',
        Marzo: '#06B6D4',
        Abril: '#14B8A6',
        Mayo: '#22C55E',
        Junio: '#84CC16',
        Julio: '#F59E0B',
        Agosto: '#F97316',
        Septiembre: '#EF4444',
        Octubre: '#EC4899',
        Noviembre: '#A855F7',
        Diciembre: '#6366F1'
    };

    const state = {
        year: 'Todos',
        owner: 'Todos',
        razonSocial: 'Todos',
        search: '',
        activeOnly: false,
        pisoOnly: false,
        activeTechs: new Set(),
        chart: null,
        subChart: null,
        chartResizeObserver: null,
        initialized: false,
        currentGraph: null,
        selectedNodeName: null,
        modalOpen: false
    };

    const rows = Array.isArray(window.celHistoricosRows) ? window.celHistoricosRows : [];
    const years = [...new Set(rows.map(row => row.year).filter(Boolean))].sort((a, b) => b - a);
    const technologies = [...new Set(rows.map(row => row.technology).filter(Boolean))].sort();
    const razonSociales = [...new Set(rows.map(row => String(row.razonSocial || '').trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'es-MX'));

    function byId(id) { return document.getElementById(id); }
    function formatNumber(value, decimals = 2) {
        return Number(value || 0).toLocaleString('es-MX', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    }
    function formatCompact(value, suffix) {
        const num = Number(value || 0);
        const abs = Math.abs(num);
        let scaled = num;
        let unit = '';
        if (abs >= 1e6) { scaled = num / 1e6; unit = 'M'; }
        else if (abs >= 1e3) { scaled = num / 1e3; unit = 'k'; }
        return `${formatNumber(scaled, 2)}${unit} ${suffix}`.trim();
    }
    function safeDisplayName(text) { return String(text || '').replace(/\n/g, ' · '); }
    function escapeHtml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
    function shortTech(tech) {
        const labels = {
            EOLICA: 'Eólica', FOTOVOLTAICA: 'Fotovoltaica', GEOTERMOELECTRICA: 'Geotermo',
            NUCLEOELECTRICA: 'Nucleo', BIOMASA: 'Biomasa', COGENERACION: 'Cogeneración',
            HIDROELECTRICA: 'Hidro', 'NO DISPONIBLE': 'No disp.'
        };
        return labels[tech] || tech;
    }
    function getNodeLabel(node) { return node?.displayName || node?.shortLabel || node?.name || ''; }
    function getNodeColor(kind, value) {
        if (kind === 'owner') return OWNER_COLORS[value] || '#64748B';
        if (kind === 'tech') return TECH_COLORS[value] || '#64748B';
        if (kind === 'month') return MONTH_COLORS[value] || '#64748B';
        if (kind === 'root') return '#243746';
        if (kind === 'total') return '#7a1b38';
        return '#64748B';
    }
    function getFilteredRows() {
        return rows.filter(row => {
            if (!row || !row.year) return false;
            if (state.year !== 'Todos' && row.year !== Number(state.year)) return false;
            if (state.owner !== 'Todos' && row.ownerType !== state.owner) return false;
            if (state.razonSocial !== 'Todos' && String(row.razonSocial || '').trim() !== state.razonSocial) return false;
            if (!state.activeTechs.has(row.technology)) return false;
            if (state.activeOnly && !row.activeInMonth) return false;
            if (state.pisoOnly && Number(row.piso || 0) <= 0) return false;
            if (Number(row.cel || 0) <= 0) return false;
            if (state.search) {
                const haystack = `${row.technology} ${row.razonSocial} ${row.permiso} ${row.month}`.toLowerCase();
                if (!haystack.includes(state.search)) return false;
            }
            return true;
        });
    }
    function buildTechFilters() {
        const container = byId('celh-tech-filters');
        if (!container) return;
        container.innerHTML = '';
        technologies.forEach(tech => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'cel-sankey-chip active';
            button.dataset.tech = tech;
            button.textContent = shortTech(tech);
            button.addEventListener('click', () => {
                if (state.activeTechs.has(tech)) state.activeTechs.delete(tech); else state.activeTechs.add(tech);
                if (!state.activeTechs.size) technologies.forEach(item => state.activeTechs.add(item));
                syncTechFilters(); render();
            });
            container.appendChild(button);
        });
        technologies.forEach(tech => state.activeTechs.add(tech));
        syncTechFilters();
    }
    function syncTechFilters() {
        document.querySelectorAll('#celh-tech-filters .cel-sankey-chip').forEach(button => {
            button.classList.toggle('active', state.activeTechs.has(button.dataset.tech));
        });
    }
    function updateSummary(filteredRows) {
        const totalCel = filteredRows.reduce((sum, row) => sum + row.cel, 0);
        const records = filteredRows.length;
        const permits = new Set(filteredRows.map(row => row.permiso).filter(Boolean)).size;
        const avgElc = records ? filteredRows.reduce((sum, row) => sum + Number(row.elc || 0), 0) / records : 0;
        byId('celh-summary-cel').textContent = formatCompact(totalCel, 'CEL');
        byId('celh-summary-records').textContent = formatNumber(records, 0);
        byId('celh-summary-permits').textContent = formatNumber(permits, 0);
        byId('celh-summary-elc').textContent = formatNumber(avgElc, 3);
        byId('celh-summary-note').textContent = `${records} filas mensuales visibles`;
        byId('celh-side-year').textContent = String(state.year);
        byId('celh-side-owner').textContent = state.owner;
        byId('celh-side-cel').textContent = formatCompact(totalCel, 'CEL');
        byId('celh-side-permits').textContent = formatNumber(permits, 0);
    }
    function updateRanking(filteredRows) {
        const tbody = byId('celh-ranking-body');
        if (!tbody) return;
        const grouped = new Map();
        filteredRows.forEach(row => {
            const key = row.technology;
            if (!grouped.has(key)) grouped.set(key, { technology: key, cel: 0, ownerTypes: new Set() });
            const item = grouped.get(key);
            item.cel += Number(row.cel || 0);
            item.ownerTypes.add(row.ownerType);
        });
        const top = Array.from(grouped.values()).sort((a, b) => b.cel - a.cel).slice(0, 8);
        tbody.innerHTML = '';
        top.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td><div><strong>${shortTech(item.technology)}</strong></div><div class="cel-sankey-badge">${Array.from(item.ownerTypes).join(' · ')}</div></td><td>${formatCompact(item.cel, 'CEL')}</td>`;
            tbody.appendChild(tr);
        });
        if (!top.length) tbody.innerHTML = '<tr><td colspan="2">No hay tecnologías visibles.</td></tr>';
    }
    function addNode(map, id, config) {
        if (!map.has(id)) map.set(id, { name: id, ...config, rows: [] });
        const node = map.get(id);
        if (config.row) node.rows.push(config.row);
    }
    function addLink(map, source, target, value, unit, row) {
        const key = `${source}__${target}__${unit}`;
        if (!map.has(key)) map.set(key, { source, target, value: 0, unit, rows: [] });
        const link = map.get(key);
        link.value += Number(value || 0);
        if (row) link.rows.push(row);
    }
    function buildGraph(filteredRows) {
        const nodes = new Map();
        const links = new Map();
        const totalCel = filteredRows.reduce((sum, row) => sum + Number(row.cel || 0), 0);
        addNode(nodes, 'celh-root', { depth: 0, kind: 'root', unit: 'CEL', displayName: `CEL Históricos\n${formatCompact(totalCel, 'CEL')}`, shortLabel: `CEL Históricos\n${formatCompact(totalCel, 'CEL')}`, itemStyle: { color: getNodeColor('root') } });
        addNode(nodes, 'celh-total', { depth: 4, kind: 'total', unit: 'CEL', displayName: `CEL otorgados\n${formatCompact(totalCel, 'CEL')}`, shortLabel: `CEL otorgados\n${formatCompact(totalCel, 'CEL')}`, itemStyle: { color: getNodeColor('total') } });
        filteredRows.forEach(row => {
            const ownerId = `owner-${row.ownerType}`;
            const techId = `tech-${row.ownerType}-${row.technology}`;
            const monthId = `month-${row.month}`;
            addNode(nodes, ownerId, { depth: 1, kind: 'owner', unit: 'CEL', displayName: `${row.ownerType}\nCEL`, shortLabel: `${row.ownerType}\nCEL`, rawLabel: row.ownerType, itemStyle: { color: getNodeColor('owner', row.ownerType) }, row });
            addNode(nodes, techId, { depth: 2, kind: 'tech', unit: 'CEL', displayName: `${shortTech(row.technology)}\nCEL`, shortLabel: `${shortTech(row.technology)}\nCEL`, rawLabel: row.technology, itemStyle: { color: getNodeColor('tech', row.technology) }, row });
            addNode(nodes, monthId, { depth: 3, kind: 'month', unit: 'CEL', displayName: `${row.month}\nCEL`, shortLabel: `${row.month}\nCEL`, rawLabel: row.month, itemStyle: { color: getNodeColor('month', row.month) }, row });
            addLink(links, 'celh-root', ownerId, row.cel, 'CEL', row);
            addLink(links, ownerId, techId, row.cel, 'CEL', row);
            addLink(links, techId, monthId, row.cel, 'CEL', row);
            addLink(links, monthId, 'celh-total', row.cel, 'CEL', row);
        });
        return { nodes: Array.from(nodes.values()), links: Array.from(links.values()) };
    }
    function getNodeByName(name) { return state.currentGraph?.nodes.find(node => node.name === name) || null; }
    function getNodeFlows(name) { return { incoming: state.currentGraph?.links.filter(link => link.target === name) || [], outgoing: state.currentGraph?.links.filter(link => link.source === name) || [] }; }
    function getNodeFlowSummary(name) {
        const { incoming, outgoing } = getNodeFlows(name);
        return { incoming, outgoing, inflow: incoming.reduce((sum, link) => sum + link.value, 0), outflow: outgoing.reduce((sum, link) => sum + link.value, 0) };
    }
    function buildHoverList(title, links, lookupKey) {
        if (!links.length) return `<div style="margin-top:6px;"><strong>${title}:</strong> sin registros</div>`;
        const items = links.slice(0, 4).map(link => {
            const node = getNodeByName(link[lookupKey]);
            return `<div style="margin-top:2px;">• ${escapeHtml(safeDisplayName(node?.displayName || link[lookupKey]))}: ${formatNumber(link.value, 2)} ${escapeHtml(link.unit)}</div>`;
        }).join('');
        const remaining = links.length > 4 ? `<div style="margin-top:2px; color:#6b7280;">+ ${links.length - 4} más</div>` : '';
        return `<div style="margin-top:6px;"><strong>${title}:</strong>${items}${remaining}</div>`;
    }
    function renderLegend(containerId, nodes) {
        const container = byId(containerId); if (!container) return; container.innerHTML = '';
        const seen = new Set();
        nodes.forEach(node => {
            const color = node?.itemStyle?.color; const label = safeDisplayName(node?.displayName || node?.name || '');
            if (!color || !label || seen.has(label)) return; seen.add(label);
            const el = document.createElement('div'); el.className = 'cel-sankey-legend-item';
            el.innerHTML = `<span class="cel-sankey-legend-swatch" style="background:${color}"></span><span>${escapeHtml(label)}</span>`;
            container.appendChild(el);
        });
    }
    async function exportChartPng(chart, fileName, surfaceId) {
        const surface = surfaceId ? byId(surfaceId) : null;
        if (surface && typeof html2canvas === 'function') {
            const canvas = await html2canvas(surface, { backgroundColor: '#ffffff', scale: 2, useCORS: true });
            const link = document.createElement('a'); link.href = canvas.toDataURL('image/png'); link.download = fileName; link.click(); return;
        }
        if (!chart) return;
        const link = document.createElement('a'); link.href = chart.getDataURL({ pixelRatio: 2, backgroundColor: '#ffffff' }); link.download = fileName; link.click();
    }
    function scheduleMainResize() { requestAnimationFrame(() => state.chart?.resize()); setTimeout(() => state.chart?.resize(), 60); setTimeout(() => state.chart?.resize(), 180); }
    function renderSubSankey(node, incoming, outgoing) {
        const container = byId('celh-subchart'); if (!container || typeof echarts === 'undefined') return;
        if (!state.subChart) state.subChart = echarts.init(container);
        const nodeMap = new Map();
        nodeMap.set(node.name, { name: node.name, displayName: node.displayName, shortLabel: node.shortLabel, itemStyle: node.itemStyle, depth: 1 });
        const links = [];
        incoming.forEach(link => { const sourceNode = getNodeByName(link.source); if (!sourceNode) return; nodeMap.set(sourceNode.name, { name: sourceNode.name, displayName: sourceNode.displayName, shortLabel: sourceNode.shortLabel, itemStyle: sourceNode.itemStyle, depth: 0 }); links.push({ source: sourceNode.name, target: node.name, value: link.value, unit: link.unit }); });
        outgoing.forEach(link => { const targetNode = getNodeByName(link.target); if (!targetNode) return; nodeMap.set(targetNode.name, { name: targetNode.name, displayName: targetNode.displayName, shortLabel: targetNode.shortLabel, itemStyle: targetNode.itemStyle, depth: 2 }); links.push({ source: node.name, target: targetNode.name, value: link.value, unit: link.unit }); });
        const subFlowSummary = (nodeName) => { const incomingLinks = links.filter(link => link.target === nodeName); const outgoingLinks = links.filter(link => link.source === nodeName); return { incomingLinks, outgoingLinks, inflow: incomingLinks.reduce((sum, link) => sum + link.value, 0), outflow: outgoingLinks.reduce((sum, link) => sum + link.value, 0) }; };
        const subFlowList = (title, list, lookupKey) => { if (!list.length) return `<div style="margin-top:6px;"><strong>${title}:</strong> sin registros</div>`; const items = list.slice(0, 4).map(link => { const relatedNode = nodeMap.get(link[lookupKey]); return `<div style="margin-top:2px;">• ${escapeHtml(safeDisplayName(relatedNode?.displayName || link[lookupKey]))}: ${formatNumber(link.value, 2)} ${escapeHtml(link.unit)}</div>`; }).join(''); const remaining = list.length > 4 ? `<div style="margin-top:2px; color:#6b7280;">+ ${list.length - 4} más</div>` : ''; return `<div style="margin-top:6px;"><strong>${title}:</strong>${items}${remaining}</div>`; };
        state.subChart.setOption({ backgroundColor: 'transparent', tooltip: { trigger: 'item', confine: true, formatter(params) { if (params.dataType === 'edge') return `<strong>${escapeHtml(safeDisplayName(params.data.source))}</strong> → <strong>${escapeHtml(safeDisplayName(params.data.target))}</strong><br>${formatNumber(params.data.value, 2)} ${params.data.unit}`; const summary = subFlowSummary(params.data?.name); return `<strong>${escapeHtml(safeDisplayName(params.data.displayName || params.name))}</strong><div style="margin-top:6px;"><strong>Entradas:</strong> ${formatNumber(summary.inflow, 2)} CEL</div><div><strong>Salidas:</strong> ${formatNumber(summary.outflow, 2)} CEL</div>${subFlowList('Qué entra', summary.incomingLinks, 'source')}${subFlowList('Qué sale', summary.outgoingLinks, 'target')}`; } }, series: [{ type: 'sankey', data: Array.from(nodeMap.values()), links, nodeAlign: 'justify', nodeGap: 24, nodeWidth: 24, layoutIterations: 64, draggable: true, lineStyle: { color: 'gradient', opacity: 0.55, curveness: 0.5 }, label: { color: '#243746', fontFamily: 'Noto Sans, sans-serif', fontSize: 8, backgroundColor: 'rgba(255,255,255,0.92)', borderRadius: 6, padding: [2, 4], formatter(params) { return getNodeLabel(params.data); } } }] }, true);
        renderLegend('celh-sub-legend', Array.from(nodeMap.values()));
        requestAnimationFrame(() => state.subChart?.resize()); setTimeout(() => state.subChart?.resize(), 60);
    }
    function openModal(nodeName) {
        const modal = byId('celh-detail-modal'); if (!modal || !state.currentGraph) return;
        const node = getNodeByName(nodeName); if (!node) return; state.selectedNodeName = nodeName;
        const { incoming, outgoing, inflow, outflow } = getNodeFlowSummary(nodeName);
        byId('celh-modal-title').textContent = safeDisplayName(node.displayName || node.name);
        byId('celh-modal-summary').textContent = `${node.rows?.length || 0} fila(s) mensuales contribuyen a este nodo.`;
        byId('celh-detail-inflow').textContent = formatCompact(inflow, 'CEL');
        byId('celh-detail-outflow').textContent = formatCompact(outflow, 'CEL');
        const incomingBody = byId('celh-detail-incoming-body'); const outgoingBody = byId('celh-detail-outgoing-body'); const recordsBody = byId('celh-detail-records-body');
        incomingBody.innerHTML = ''; outgoingBody.innerHTML = ''; recordsBody.innerHTML = '';
        if (!incoming.length) incomingBody.innerHTML = '<tr><td colspan="3">Sin entradas.</td></tr>'; else incoming.forEach(link => { const source = getNodeByName(link.source); const tr = document.createElement('tr'); tr.innerHTML = `<td>${escapeHtml(safeDisplayName(source?.displayName || link.source))}</td><td>${formatNumber(link.value, 2)}</td><td>${link.unit}</td>`; incomingBody.appendChild(tr); });
        if (!outgoing.length) outgoingBody.innerHTML = '<tr><td colspan="3">Sin salidas.</td></tr>'; else outgoing.forEach(link => { const target = getNodeByName(link.target); const tr = document.createElement('tr'); tr.innerHTML = `<td>${escapeHtml(safeDisplayName(target?.displayName || link.target))}</td><td>${formatNumber(link.value, 2)}</td><td>${link.unit}</td>`; outgoingBody.appendChild(tr); });
        const detailRows = (node.rows || []).slice(0, 40);
        if (!detailRows.length) recordsBody.innerHTML = '<tr><td colspan="7">Sin registros.</td></tr>'; else detailRows.forEach(row => { const tr = document.createElement('tr'); tr.innerHTML = `<td>${row.year}</td><td>${escapeHtml(row.month)}</td><td>${escapeHtml(shortTech(row.technology))}</td><td>${escapeHtml(row.ownerType)}</td><td>${escapeHtml(row.permiso)}</td><td>${formatNumber(row.cel, 2)}</td><td>${formatNumber(row.piso, 2)}</td>`; recordsBody.appendChild(tr); });
        renderSubSankey(node, incoming, outgoing);
        modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; state.modalOpen = true;
        requestAnimationFrame(() => state.subChart?.resize()); setTimeout(() => state.subChart?.resize(), 100);
    }
    function closeModal() { const modal = byId('celh-detail-modal'); if (!modal) return; modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; state.modalOpen = false; }
    function getOption(graph) {
        const nodeLookup = new Map(graph.nodes.map(node => [node.name, node.displayName || node.name]));
        return { backgroundColor: 'transparent', tooltip: { trigger: 'item', confine: true, formatter(params) { if (params.dataType === 'edge') { const source = nodeLookup.get(params.data.source) || params.data.source; const target = nodeLookup.get(params.data.target) || params.data.target; return `<strong>${escapeHtml(safeDisplayName(source))}</strong> → <strong>${escapeHtml(safeDisplayName(target))}</strong><br>${formatNumber(params.data.value, 2)} CEL`; } const node = params.data || {}; const summary = getNodeFlowSummary(node.name); return `<strong>${escapeHtml(safeDisplayName(node.displayName || node.name))}</strong><div style="margin-top:6px;"><strong>Entradas:</strong> ${formatNumber(summary.inflow, 2)} CEL</div><div><strong>Salidas:</strong> ${formatNumber(summary.outflow, 2)} CEL</div>${buildHoverList('Qué entra', summary.incoming, 'source')}${buildHoverList('Qué sale', summary.outgoing, 'target')}<span class="cel-tooltip-action">Ver detalle</span>`; } }, series: [{ type: 'sankey', left: '1%', right: '1%', top: 20, bottom: 20, data: graph.nodes, links: graph.links, nodeAlign: 'justify', nodeGap: 24, nodeWidth: 28, layoutIterations: 64, draggable: true, emphasis: { focus: 'adjacency' }, lineStyle: { color: 'gradient', opacity: 0.5, curveness: 0.55 }, label: { color: '#243746', fontFamily: 'Noto Sans, sans-serif', fontSize: 8, backgroundColor: 'rgba(255,255,255,0.92)', borderRadius: 6, padding: [2, 4], lineHeight: 12, formatter(params) { return getNodeLabel(params.data); } } }] };
    }
    function ensureChart() {
        const container = byId('celh-chart'); if (!container || typeof echarts === 'undefined') return null;
        if (!state.chart) { state.chart = echarts.init(container); state.chart.on('click', params => { if (params.dataType === 'node') openModal(params.data?.name); }); }
        return state.chart;
    }
    function renderEmpty(message) { const container = byId('celh-chart'); if (!container) return; container.innerHTML = `<div class="cel-sankey-empty"><div><strong>${message}</strong><br>Ajusta los filtros para reconstruir el flujo.</div></div>`; renderLegend('celh-main-legend', []); closeModal(); }
    function render() {
        const filteredRows = getFilteredRows(); updateSummary(filteredRows); updateRanking(filteredRows);
        if (!filteredRows.length) { state.currentGraph = null; state.selectedNodeName = null; if (state.chart) { state.chart.dispose(); state.chart = null; } renderEmpty('No hay datos para los filtros seleccionados.'); return; }
        state.currentGraph = buildGraph(filteredRows); const chart = ensureChart(); if (!chart) return; chart.clear(); chart.setOption(getOption(state.currentGraph), true); renderLegend('celh-main-legend', state.currentGraph.nodes); scheduleMainResize(); if (state.modalOpen && state.selectedNodeName) openModal(state.selectedNodeName);
    }
    function wireEvents() {
        const yearSelect = byId('celh-year'); const ownerSelect = byId('celh-owner'); const razonSocialSelect = byId('celh-razon-social'); const searchInput = byId('celh-search');
        const activeToggle = byId('celh-active-toggle'); const pisoToggle = byId('celh-piso-toggle'); const resetButton = byId('celh-reset');
        const exportPngButton = byId('celh-export-png'); const exportCsvButton = byId('celh-export-csv'); const exportModalButton = byId('celh-modal-export-png');
        const modal = byId('celh-detail-modal'); const modalClose = byId('celh-modal-close');
        if (yearSelect) { const allOption = document.createElement('option'); allOption.value = 'Todos'; allOption.textContent = 'Todos'; yearSelect.appendChild(allOption); years.forEach(year => { const option = document.createElement('option'); option.value = String(year); option.textContent = String(year); yearSelect.appendChild(option); }); yearSelect.value = state.year; yearSelect.addEventListener('change', () => { state.year = yearSelect.value; render(); }); }
        if (ownerSelect) ownerSelect.addEventListener('change', () => { state.owner = ownerSelect.value; render(); });
        if (razonSocialSelect) { razonSociales.forEach(razonSocial => { const option = document.createElement('option'); option.value = razonSocial; option.textContent = razonSocial; razonSocialSelect.appendChild(option); }); razonSocialSelect.value = state.razonSocial; razonSocialSelect.addEventListener('change', () => { state.razonSocial = razonSocialSelect.value; render(); }); }
        if (searchInput) searchInput.addEventListener('input', () => { state.search = searchInput.value.trim().toLowerCase(); render(); });
        if (activeToggle) activeToggle.addEventListener('change', () => { state.activeOnly = activeToggle.checked; render(); });
        if (pisoToggle) pisoToggle.addEventListener('change', () => { state.pisoOnly = pisoToggle.checked; render(); });
        if (resetButton) resetButton.addEventListener('click', () => { state.year = 'Todos'; state.owner = 'Todos'; state.razonSocial = 'Todos'; state.search = ''; state.activeOnly = false; state.pisoOnly = false; state.selectedNodeName = null; byId('celh-year').value = 'Todos'; byId('celh-owner').value = 'Todos'; byId('celh-razon-social').value = 'Todos'; byId('celh-search').value = ''; byId('celh-active-toggle').checked = false; byId('celh-piso-toggle').checked = false; state.activeTechs.clear(); technologies.forEach(tech => state.activeTechs.add(tech)); syncTechFilters(); closeModal(); render(); });
        if (exportPngButton) exportPngButton.addEventListener('click', () => exportChartPng(state.chart, `sankey_cel_historicos_${state.year}.png`, 'celh-main-export'));
        if (exportCsvButton) exportCsvButton.addEventListener('click', () => { const filteredRows = getFilteredRows(); const csvRows = [['AÑO','MES','OWNER','TECNOLOGIA','PERMISO','RAZON_SOCIAL','CEL','ELC','PISO','ACTIVO_DESDE','ACTIVO_HASTA']]; filteredRows.forEach(row => csvRows.push([row.year,row.month,row.ownerType,row.technology,row.permiso,row.razonSocial,row.cel,row.elc,row.piso,row.activoDesde,row.activoHasta])); const csv = csvRows.map(r => r.join(',')).join('\n'); const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `cel_historicos_${state.year}.csv`; a.click(); URL.revokeObjectURL(url); });
        if (exportModalButton) exportModalButton.addEventListener('click', () => { if (!state.subChart || !state.selectedNodeName) return; exportChartPng(state.subChart, `subsankey_cel_historicos_${state.selectedNodeName}_${state.year}.png`, 'celh-sub-export'); });
        if (modalClose) modalClose.addEventListener('click', closeModal);
        if (modal) modal.addEventListener('click', event => { const target = event.target; if (target instanceof HTMLElement && target.dataset.closeModal === 'true') closeModal(); });
        document.addEventListener('keydown', event => { if (event.key === 'Escape' && state.modalOpen) closeModal(); });
        window.addEventListener('resize', () => { state.chart?.resize(); state.subChart?.resize(); });
    }
    function init() {
        if (state.initialized || !byId('celh-chart')) return; buildTechFilters(); wireEvents(); render();
        const chartContainer = byId('celh-chart'); if (chartContainer && typeof ResizeObserver !== 'undefined' && !state.chartResizeObserver) { state.chartResizeObserver = new ResizeObserver(() => state.chart?.resize()); state.chartResizeObserver.observe(chartContainer); }
        window.addEventListener('load', () => scheduleMainResize(), { once: true }); state.initialized = true;
    }
    document.addEventListener('DOMContentLoaded', init);
})();
