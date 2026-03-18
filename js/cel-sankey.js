(function () {
    const TECH_COLORS = {
        EOLICA: '#14B8A6',
        FOTOVOLTAICA: '#F6C700',
        GEOTERMOELECTRICA: '#C2410C',
        NUCLEOELECTRICA: '#7C3AED',
        BIOMASA: '#43A047',
        COGENERACION: '#8D6E63',
        HIDROELECTRICA: '#1565C0'
    };

    const SECTOR_COLORS = {
        Estado: '#9B2247',
        Privado: '#1E5B4F'
    };

    const DECAL_BY_DEPTH = [
        { symbol: 'rect', dashArrayX: [1, 0], dashArrayY: [2, 3], rotation: Math.PI / 8 },
        { symbol: 'circle', dashArrayX: [2, 2], dashArrayY: [3, 2], rotation: 0 },
        { symbol: 'line', dashArrayX: [3, 2], dashArrayY: [2, 4], rotation: -Math.PI / 6 },
        { symbol: 'triangle', dashArrayX: [1, 2], dashArrayY: [4, 2], rotation: Math.PI / 4 },
        { symbol: 'diamond', dashArrayX: [2, 1], dashArrayY: [2, 3], rotation: Math.PI / 3 },
        { symbol: 'rect', dashArrayX: [4, 2], dashArrayY: [1, 3], rotation: -Math.PI / 8 },
        { symbol: 'circle', dashArrayX: [1, 3], dashArrayY: [1, 4], rotation: 0 }
    ];

    const state = {
        year: null,
        sector: 'Todos',
        search: '',
        activeTechs: new Set(),
        chart: null,
        subChart: null,
        chartResizeObserver: null,
        initialized: false,
        decalEnabled: false,
        currentGraph: null,
        selectedNodeName: null,
        modalOpen: false
    };

    const rows = Array.isArray(window.celSankeyRows) ? window.celSankeyRows : [];
    const years = [...new Set(rows.map(row => row.year))].sort((a, b) => b - a);
    const allTechs = [...new Set(rows.map(row => row.technology))].sort();

    function byId(id) {
        return document.getElementById(id);
    }

    function formatNumber(value, decimals = 2) {
        return Number(value || 0).toLocaleString('es-MX', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    }

    function formatCompact(value, suffix) {
        const num = Number(value || 0);
        const abs = Math.abs(num);
        let scaled = num;
        let unit = '';
        if (abs >= 1e6) {
            scaled = num / 1e6;
            unit = 'M';
        } else if (abs >= 1e3) {
            scaled = num / 1e3;
            unit = 'k';
        }
        return `${formatNumber(scaled, 2)}${unit} ${suffix}`.trim();
    }

    function prettyTech(tech) {
        return String(tech || '')
            .toLowerCase()
            .split('_')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join(' ');
    }

    function shortTech(tech) {
        const labels = {
            EOLICA: 'Eólica',
            FOTOVOLTAICA: 'Fotovoltaica',
            GEOTERMOELECTRICA: 'Geotermo',
            NUCLEOELECTRICA: 'Nucleo',
            BIOMASA: 'Biomasa',
            COGENERACION: 'Cogeneración',
            HIDROELECTRICA: 'Hidro'
        };
        return labels[tech] || prettyTech(tech);
    }

    function safeDisplayName(text) {
        return String(text || '').replace(/\n/g, ' · ');
    }

    function escapeHtml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function prettyNodeType(kind) {
        const labels = {
            generation: 'Generación total',
            sectorEnergy: 'Sector energético',
            techEnergy: 'Tecnología energética',
            factor: 'Factor ELC',
            techCel: 'Tecnología CEL',
            sectorCel: 'Sector CEL',
            celTotal: 'CEL otorgados'
        };
        return labels[kind] || 'Nodo Sankey';
    }

    function getNodeLabel(node) {
        if (!node) return '';
        return node.displayName || node.shortLabel || node.name;
    }

    function createDecal(depth) {
        if (!state.decalEnabled) return null;
        const base = DECAL_BY_DEPTH[depth % DECAL_BY_DEPTH.length];
        return {
            ...base,
            color: 'rgba(255,255,255,0.4)'
        };
    }

    function getNodeStyle(color, depth) {
        const style = {
            color,
            borderColor: '#ffffff',
            borderWidth: 1
        };
        const decal = createDecal(depth);
        if (decal) style.decal = decal;
        return style;
    }

    function buildTechnologyList() {
        const container = byId('cel-tech-filters');
        if (!container) return;

        container.innerHTML = '';
        allTechs.forEach(tech => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'cel-sankey-chip active';
            button.dataset.tech = tech;
            button.textContent = prettyTech(tech);
            button.addEventListener('click', () => {
                if (state.activeTechs.has(tech)) state.activeTechs.delete(tech);
                else state.activeTechs.add(tech);

                if (state.activeTechs.size === 0) {
                    allTechs.forEach(item => state.activeTechs.add(item));
                }

                syncTechnologyChips();
                render();
            });
            container.appendChild(button);
        });

        allTechs.forEach(tech => state.activeTechs.add(tech));
        syncTechnologyChips();
    }

    function syncTechnologyChips() {
        document.querySelectorAll('#cel-tech-filters .cel-sankey-chip').forEach(button => {
            button.classList.toggle('active', state.activeTechs.has(button.dataset.tech));
        });
    }

    function getFilteredRows() {
        return rows.filter(row => {
            if (state.year && row.year !== state.year) return false;
            if (state.sector !== 'Todos' && row.companyType !== state.sector) return false;
            if (!state.activeTechs.has(row.technology)) return false;
            if (state.search) {
                const haystack = `${row.companyType} ${row.technology}`.toLowerCase();
                if (!haystack.includes(state.search)) return false;
            }
            return true;
        });
    }

    function updateSummary(filteredRows) {
        const totalEnergy = filteredRows.reduce((sum, row) => sum + row.totalEnergy, 0);
        const totalCel = filteredRows.reduce((sum, row) => sum + row.totalCelGranted, 0);
        const weightedFactor = totalEnergy > 0 ? totalCel / totalEnergy : 0;
        const permisionarios = filteredRows.reduce((sum, row) => sum + row.totalPermisionarios, 0);

        byId('cel-summary-generation').textContent = formatCompact(totalEnergy, 'MWh');
        byId('cel-summary-cel').textContent = formatCompact(totalCel, 'CEL');
        byId('cel-summary-factor').textContent = formatNumber(weightedFactor, 3);
        byId('cel-summary-permits').textContent = formatNumber(permisionarios, 0);
        byId('cel-summary-note').textContent = `${filteredRows.length} registros visibles en ${state.year}`;

        byId('cel-side-energy').textContent = formatCompact(totalEnergy, 'MWh');
        byId('cel-side-cel').textContent = formatCompact(totalCel, 'CEL');
        byId('cel-side-sector').textContent = state.sector;
        byId('cel-side-year').textContent = String(state.year || '');
    }

    function updateRanking(filteredRows) {
        const tbody = byId('cel-ranking-body');
        if (!tbody) return;

        const topRows = [...filteredRows]
            .sort((a, b) => b.totalCelGranted - a.totalCelGranted)
            .slice(0, 7);

        tbody.innerHTML = '';

        topRows.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div><strong>${prettyTech(row.technology)}</strong></div>
                    <div class="cel-sankey-badge">${row.companyType}</div>
                </td>
                <td>${formatCompact(row.totalEnergy, 'MWh')}</td>
                <td>${formatCompact(row.totalCelGranted, 'CEL')}</td>
                <td>${formatNumber(row.averageElc, 3)}</td>
            `;
            tbody.appendChild(tr);
        });

        if (!topRows.length) {
            const tr = document.createElement('tr');
            tr.innerHTML = '<td colspan="4">No hay registros para los filtros actuales.</td>';
            tbody.appendChild(tr);
        }
    }

    function addAggregatedLink(linkMap, source, target, value, unit, row) {
        const key = `${source}__${target}__${unit}`;
        if (!linkMap.has(key)) {
            linkMap.set(key, {
                source,
                target,
                value: 0,
                unit,
                rows: []
            });
        }
        const link = linkMap.get(key);
        link.value += value;
        if (row) link.rows.push(row);
    }

    function buildSankey(filteredRows) {
        const nodes = new Map();
        const linkMap = new Map();

        function addNode(id, config) {
            if (!nodes.has(id)) {
                nodes.set(id, { name: id, ...config, rows: [] });
            }
            const node = nodes.get(id);
            if (config.row) node.rows.push(config.row);
        }

        const totalEnergy = filteredRows.reduce((sum, row) => sum + row.totalEnergy, 0);
        const totalCel = filteredRows.reduce((sum, row) => sum + row.totalCelGranted, 0);

        addNode('generation-total', {
            depth: 0,
            kind: 'generation',
            unit: 'MWh',
            displayName: `Generación\n${formatCompact(totalEnergy, 'MWh')}`,
            shortLabel: `Generación\n${formatCompact(totalEnergy, 'MWh')}`,
            rawLabel: 'Generación',
            itemStyle: getNodeStyle('#243746', 0)
        });

        addNode('cel-total', {
            depth: 6,
            kind: 'celTotal',
            unit: 'CEL',
            displayName: `CEL otorgados\n${formatCompact(totalCel, 'CEL')}`,
            shortLabel: `CEL otorgados\n${formatCompact(totalCel, 'CEL')}`,
            rawLabel: 'CEL otorgados',
            itemStyle: getNodeStyle('#7a1b38', 6)
        });

        filteredRows.forEach(row => {
            const sectorEnergyId = `sector-energy-${row.companyType}`;
            const techEnergyId = `tech-energy-${row.companyType}-${row.technology}`;
            const factorId = `factor-${row.companyType}-${row.technology}`;
            const techCelId = `tech-cel-${row.companyType}-${row.technology}`;
            const sectorCelId = `sector-cel-${row.companyType}`;

            addNode(sectorEnergyId, {
                depth: 1,
                kind: 'sectorEnergy',
                unit: 'MWh',
                displayName: `${row.companyType}\nMWh`,
                shortLabel: `${row.companyType}\nMWh`,
                rawLabel: `${row.companyType} MWh`,
                itemStyle: getNodeStyle(SECTOR_COLORS[row.companyType] || '#9B2247', 1),
                row
            });

            addNode(techEnergyId, {
                depth: 2,
                kind: 'techEnergy',
                unit: 'MWh',
                displayName: `${prettyTech(row.technology)}\nMWh`,
                shortLabel: `${shortTech(row.technology)}\nMWh`,
                rawLabel: `${prettyTech(row.technology)} MWh`,
                itemStyle: getNodeStyle(TECH_COLORS[row.technology] || '#1E88E5', 2),
                row
            });

            addNode(factorId, {
                depth: 3,
                kind: 'factor',
                unit: 'factor',
                displayName: `Factor ELC\n${formatNumber(row.averageElc, 3)}`,
                shortLabel: `Factor\n${formatNumber(row.averageElc, 3)}`,
                rawLabel: `Factor ELC ${prettyTech(row.technology)} ${row.companyType}`,
                itemStyle: getNodeStyle('#A57F2C', 3),
                row
            });

            addNode(techCelId, {
                depth: 4,
                kind: 'techCel',
                unit: 'CEL',
                displayName: `${prettyTech(row.technology)}\nCEL`,
                shortLabel: `${shortTech(row.technology)}\nCEL`,
                rawLabel: `${prettyTech(row.technology)} CEL`,
                itemStyle: getNodeStyle(TECH_COLORS[row.technology] || '#1E88E5', 4),
                row
            });

            addNode(sectorCelId, {
                depth: 5,
                kind: 'sectorCel',
                unit: 'CEL',
                displayName: `${row.companyType}\nCEL`,
                shortLabel: `${row.companyType}\nCEL`,
                rawLabel: `${row.companyType} CEL`,
                itemStyle: getNodeStyle(SECTOR_COLORS[row.companyType] || '#1E5B4F', 5),
                row
            });

            addAggregatedLink(linkMap, 'generation-total', sectorEnergyId, row.totalEnergy, 'MWh', row);
            addAggregatedLink(linkMap, sectorEnergyId, techEnergyId, row.totalEnergy, 'MWh', row);
            addAggregatedLink(linkMap, techEnergyId, factorId, row.totalEnergy, 'MWh', row);
            addAggregatedLink(linkMap, factorId, techCelId, row.totalCelGranted, 'CEL', row);
            addAggregatedLink(linkMap, techCelId, sectorCelId, row.totalCelGranted, 'CEL', row);
            addAggregatedLink(linkMap, sectorCelId, 'cel-total', row.totalCelGranted, 'CEL', row);
        });

        const links = Array.from(linkMap.values());
        return {
            nodes: Array.from(nodes.values()),
            links
        };
    }

    function getNodeByName(nodeName) {
        return state.currentGraph?.nodes.find(item => item.name === nodeName) || null;
    }

    function getNodeFlows(nodeName) {
        return {
            incoming: state.currentGraph?.links.filter(link => link.target === nodeName) || [],
            outgoing: state.currentGraph?.links.filter(link => link.source === nodeName) || []
        };
    }

    function getNodeFlowSummary(nodeName) {
        const { incoming, outgoing } = getNodeFlows(nodeName);
        const inflow = incoming.reduce((sum, link) => sum + link.value, 0);
        const outflow = outgoing.reduce((sum, link) => sum + link.value, 0);
        return { incoming, outgoing, inflow, outflow };
    }

    function buildHoverFlowList(title, links, lookupKey) {
        if (!links.length) {
            return `<div style="margin-top:6px;"><strong>${title}:</strong> sin registros</div>`;
        }

        const items = links
            .slice(0, 4)
            .map(link => {
                const node = getNodeByName(link[lookupKey]);
                const label = escapeHtml(safeDisplayName(node?.displayName || link[lookupKey]));
                return `<div style="margin-top:2px;">• ${label}: ${formatNumber(link.value, 2)} ${escapeHtml(link.unit)}</div>`;
            })
            .join('');

        const remaining = links.length > 4
            ? `<div style="margin-top:2px; color:#6b7280;">+ ${links.length - 4} más</div>`
            : '';

        return `<div style="margin-top:6px;"><strong>${title}:</strong>${items}${remaining}</div>`;
    }

    function renderLegend(containerId, nodes) {
        const container = byId(containerId);
        if (!container) return;

        const seen = new Set();
        const items = [];

        (nodes || []).forEach(node => {
            const color = node?.itemStyle?.color;
            const label = safeDisplayName(node?.displayName || node?.name || '');
            if (!color || !label || seen.has(label)) return;
            seen.add(label);
            items.push({ color, label });
        });

        container.innerHTML = '';

        items.forEach(item => {
            const el = document.createElement('div');
            el.className = 'cel-sankey-legend-item';
            el.innerHTML = `<span class="cel-sankey-legend-swatch" style="background:${item.color}"></span><span>${escapeHtml(item.label)}</span>`;
            container.appendChild(el);
        });
    }

    async function exportChartPng(chart, fileName, surfaceId) {
        const surface = surfaceId ? byId(surfaceId) : null;

        if (surface && typeof html2canvas === 'function') {
            const canvas = await html2canvas(surface, {
                backgroundColor: '#ffffff',
                scale: 2,
                useCORS: true
            });
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = fileName;
            link.click();
            return;
        }

        if (!chart) return;
        const url = chart.getDataURL({
            pixelRatio: 2,
            backgroundColor: '#ffffff'
        });
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
    }

    function scheduleChartResize() {
        requestAnimationFrame(() => {
            if (state.chart) state.chart.resize();
        });
        setTimeout(() => {
            if (state.chart) state.chart.resize();
        }, 60);
        setTimeout(() => {
            if (state.chart) state.chart.resize();
        }, 180);
    }

    function renderSubSankey(node, incoming, outgoing) {
        const container = byId('cel-subchart');
        if (!container || typeof echarts === 'undefined') return;

        if (!state.subChart) {
            state.subChart = echarts.init(container);
        }

        const nodeMap = new Map();
        nodeMap.set(node.name, {
            name: node.name,
            displayName: node.displayName || node.name,
            depth: 1,
            itemStyle: {
                color: node.itemStyle?.color || '#243746',
                borderColor: '#fff',
                borderWidth: 1
            }
        });

        const links = [];

        incoming.forEach(link => {
            const sourceNode = getNodeByName(link.source);
            if (!sourceNode) return;
            nodeMap.set(sourceNode.name, {
                name: sourceNode.name,
                displayName: sourceNode.displayName || sourceNode.name,
                depth: 0,
                itemStyle: {
                    color: sourceNode.itemStyle?.color || '#64748b',
                    borderColor: '#fff',
                    borderWidth: 1
                }
            });
            links.push({ source: sourceNode.name, target: node.name, value: link.value, unit: link.unit });
        });

        outgoing.forEach(link => {
            const targetNode = getNodeByName(link.target);
            if (!targetNode) return;
            nodeMap.set(targetNode.name, {
                name: targetNode.name,
                displayName: targetNode.displayName || targetNode.name,
                depth: 2,
                itemStyle: {
                    color: targetNode.itemStyle?.color || '#64748b',
                    borderColor: '#fff',
                    borderWidth: 1
                }
            });
            links.push({ source: node.name, target: targetNode.name, value: link.value, unit: link.unit });
        });

        const subFlowSummary = (nodeName) => {
            const incomingLinks = links.filter(link => link.target === nodeName);
            const outgoingLinks = links.filter(link => link.source === nodeName);
            const inflow = incomingLinks.reduce((sum, link) => sum + link.value, 0);
            const outflow = outgoingLinks.reduce((sum, link) => sum + link.value, 0);
            return { incomingLinks, outgoingLinks, inflow, outflow };
        };

        const subFlowList = (title, list, lookupKey) => {
            if (!list.length) {
                return `<div style="margin-top:6px;"><strong>${title}:</strong> sin registros</div>`;
            }

            const items = list
                .slice(0, 4)
                .map(link => {
                    const relatedNode = nodeMap.get(link[lookupKey]);
                    const label = escapeHtml(safeDisplayName(relatedNode?.displayName || link[lookupKey]));
                    return `<div style="margin-top:2px;">• ${label}: ${formatNumber(link.value, 2)} ${escapeHtml(link.unit)}</div>`;
                })
                .join('');

            const remaining = list.length > 4
                ? `<div style="margin-top:2px; color:#6b7280;">+ ${list.length - 4} más</div>`
                : '';

            return `<div style="margin-top:6px;"><strong>${title}:</strong>${items}${remaining}</div>`;
        };

        state.subChart.setOption({
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'item',
                confine: true,
                formatter(params) {
                    if (params.dataType === 'edge') {
                        return `<strong>${escapeHtml(safeDisplayName(params.data.source))}</strong> → <strong>${escapeHtml(safeDisplayName(params.data.target))}</strong><br>${formatNumber(params.data.value, 2)} ${params.data.unit}`;
                    }
                    const nodeName = params.data?.name;
                    const summary = subFlowSummary(nodeName);
                    const inflowUnit = summary.incomingLinks[0]?.unit || '';
                    const outflowUnit = summary.outgoingLinks[0]?.unit || '';
                    return `
                        <strong>${escapeHtml(safeDisplayName(params.data.displayName || params.name))}</strong>
                        <div style="margin-top:6px;"><strong>Entradas:</strong> ${formatNumber(summary.inflow, 2)} ${escapeHtml(inflowUnit)}</div>
                        <div><strong>Salidas:</strong> ${formatNumber(summary.outflow, 2)} ${escapeHtml(outflowUnit)}</div>
                        ${subFlowList('Qué entra', summary.incomingLinks, 'source')}
                        ${subFlowList('Qué sale', summary.outgoingLinks, 'target')}
                    `;
                }
            },
            series: [{
                type: 'sankey',
                data: Array.from(nodeMap.values()),
                links,
                nodeAlign: 'justify',
                nodeGap: 26,
                nodeWidth: 24,
                layoutIterations: 64,
                draggable: true,
                lineStyle: {
                    color: 'gradient',
                    opacity: 0.55,
                    curveness: 0.5
                },
                label: {
                    color: '#243746',
                    fontFamily: 'Noto Sans, sans-serif',
                    fontSize: 8,
                    backgroundColor: 'rgba(255,255,255,0.92)',
                    borderRadius: 6,
                    padding: [2, 4],
                    formatter(params) {
                        return getNodeLabel(params.data);
                    }
                },
                levels: [
                    { depth: 0, itemStyle: { borderColor: '#fff', borderWidth: 1 } },
                    { depth: 1, itemStyle: { borderColor: '#fff', borderWidth: 1 } },
                    { depth: 2, itemStyle: { borderColor: '#fff', borderWidth: 1 } }
                ]
            }]
        }, true);
        requestAnimationFrame(() => {
            if (state.subChart) state.subChart.resize();
        });
        setTimeout(() => {
            if (state.subChart) state.subChart.resize();
        }, 60);
        renderLegend('cel-sub-legend', Array.from(nodeMap.values()));
    }

    function openDetailModal(nodeName) {
        const modal = byId('cel-detail-modal');
        const nameEl = byId('cel-modal-title');
        const summaryEl = byId('cel-modal-summary');
        const inflowEl = byId('cel-detail-inflow');
        const outflowEl = byId('cel-detail-outflow');
        const incomingBody = byId('cel-detail-incoming-body');
        const outgoingBody = byId('cel-detail-outgoing-body');

        if (!modal || !nameEl || !summaryEl || !inflowEl || !outflowEl || !incomingBody || !outgoingBody) return;

        if (!nodeName || !state.currentGraph) {
            return;
        }

        const node = getNodeByName(nodeName);
        if (!node) return;

        const { incoming, outgoing } = getNodeFlows(nodeName);
        const inflow = incoming.reduce((sum, link) => sum + link.value, 0);
        const outflow = outgoing.reduce((sum, link) => sum + link.value, 0);

        nameEl.textContent = safeDisplayName(node.displayName || node.rawLabel || node.name);
        summaryEl.textContent = `${prettyNodeType(node.kind)}. ${node.rows.length ? `${node.rows.length} registro(s) contribuyen a este nodo.` : 'Nodo agregado del flujo.'}`;
        inflowEl.textContent = formatCompact(inflow, incoming[0]?.unit || node.unit || '');
        outflowEl.textContent = formatCompact(outflow, outgoing[0]?.unit || node.unit || '');

        incomingBody.innerHTML = '';
        outgoingBody.innerHTML = '';

        if (!incoming.length) {
            incomingBody.innerHTML = '<tr><td colspan="3">No recibe flujos de entrada.</td></tr>';
        } else {
            incoming.forEach(link => {
                const sourceNode = state.currentGraph.nodes.find(item => item.name === link.source);
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${safeDisplayName(sourceNode?.displayName || link.source)}</td>
                    <td>${formatNumber(link.value, 2)}</td>
                    <td>${link.unit}</td>
                `;
                incomingBody.appendChild(tr);
            });
        }

        if (!outgoing.length) {
            outgoingBody.innerHTML = '<tr><td colspan="3">No genera salidas posteriores.</td></tr>';
        } else {
            outgoing.forEach(link => {
                const targetNode = state.currentGraph.nodes.find(item => item.name === link.target);
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${safeDisplayName(targetNode?.displayName || link.target)}</td>
                    <td>${formatNumber(link.value, 2)}</td>
                    <td>${link.unit}</td>
                `;
                outgoingBody.appendChild(tr);
            });
        }

        renderSubSankey(node, incoming, outgoing);
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        state.modalOpen = true;
        requestAnimationFrame(() => {
            if (state.subChart) state.subChart.resize();
        });
        setTimeout(() => {
            if (state.subChart) state.subChart.resize();
        }, 100);
    }

    function closeDetailModal() {
        const modal = byId('cel-detail-modal');
        if (!modal) return;
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        state.modalOpen = false;
    }

    function getOption(graph) {
        const nodeLookup = new Map(graph.nodes.map(node => [node.name, node.displayName || node.name]));
        return {
            backgroundColor: 'transparent',
            animationDuration: 500,
            tooltip: {
                trigger: 'item',
                confine: true,
                formatter(params) {
                    if (params.dataType === 'edge') {
                        const sourceName = nodeLookup.get(params.data.source) || params.data.source;
                        const targetName = nodeLookup.get(params.data.target) || params.data.target;
                        return `<strong>${escapeHtml(safeDisplayName(sourceName))}</strong> → <strong>${escapeHtml(safeDisplayName(targetName))}</strong><br>${formatNumber(params.data.value, 2)} ${params.data.unit}`;
                    }
                    const node = params.data || {};
                    const summary = getNodeFlowSummary(node.name);
                    const inflowUnit = summary.incoming[0]?.unit || node.unit || '';
                    const outflowUnit = summary.outgoing[0]?.unit || node.unit || '';
                    return `
                        <strong>${escapeHtml(safeDisplayName(node.displayName || node.name))}</strong><br>
                        ${escapeHtml(prettyNodeType(node.kind))}${node.unit ? `<br>Unidad: ${escapeHtml(node.unit)}` : ''}
                        <div style="margin-top:6px;"><strong>Entradas:</strong> ${formatNumber(summary.inflow, 2)} ${escapeHtml(inflowUnit)}</div>
                        <div><strong>Salidas:</strong> ${formatNumber(summary.outflow, 2)} ${escapeHtml(outflowUnit)}</div>
                        ${buildHoverFlowList('Qué entra', summary.incoming, 'source')}
                        ${buildHoverFlowList('Qué sale', summary.outgoing, 'target')}
                        <span class="cel-tooltip-action">Ver detalle</span>
                    `;
                }
            },
            series: [
                {
                type: 'sankey',
                left: '1%',
                right: '1%',
                top: 20,
                bottom: 20,
                data: graph.nodes,
                links: graph.links,
                nodeAlign: 'justify',
                nodeGap: 28,
                nodeWidth: 28,
                layoutIterations: 64,
                draggable: true,
                emphasis: { focus: 'adjacency' },
                    lineStyle: {
                        color: 'gradient',
                        opacity: 0.5,
                        curveness: 0.55
                    },
                label: {
                    color: '#243746',
                    fontFamily: 'Noto Sans, sans-serif',
                    fontSize: 8,
                    backgroundColor: 'rgba(255,255,255,0.92)',
                    borderRadius: 6,
                    padding: [2, 4],
                    lineHeight: 12,
                    formatter(params) {
                        return getNodeLabel(params.data);
                    }
                },
                    levels: [
                        { depth: 0, itemStyle: { borderColor: '#fff', borderWidth: 1 } },
                        { depth: 1, itemStyle: { borderColor: '#fff', borderWidth: 1 } },
                        { depth: 2, itemStyle: { borderColor: '#fff', borderWidth: 1 } },
                        { depth: 3, itemStyle: { borderColor: '#fff', borderWidth: 1 } },
                        { depth: 4, itemStyle: { borderColor: '#fff', borderWidth: 1 } },
                        { depth: 5, itemStyle: { borderColor: '#fff', borderWidth: 1 } },
                        { depth: 6, itemStyle: { borderColor: '#fff', borderWidth: 1 } }
                    ]
                }
            ]
        };
    }

    function renderEmpty(message) {
        const chartContainer = byId('cel-chart');
        if (!chartContainer) return;
        chartContainer.innerHTML = `<div class="cel-sankey-empty"><div><strong>${message}</strong><br>Ajusta los filtros para reconstruir el flujo.</div></div>`;
        closeDetailModal();
    }

    function ensureChart() {
        const container = byId('cel-chart');
        if (!container || typeof echarts === 'undefined') return null;
        if (!state.chart) {
            container.innerHTML = '';
            state.chart = echarts.init(container);
            state.chart.on('click', params => {
                if (params.dataType !== 'node') return;
                state.selectedNodeName = params.data?.name || null;
                openDetailModal(state.selectedNodeName);
            });
        }
        return state.chart;
    }

    function render() {
        const filteredRows = getFilteredRows();
        updateSummary(filteredRows);
        updateRanking(filteredRows);

        if (!filteredRows.length) {
            state.currentGraph = null;
            state.selectedNodeName = null;
            if (state.chart) {
                state.chart.dispose();
                state.chart = null;
            }
            renderEmpty('No hay datos para la combinación seleccionada.');
            return;
        }

        state.currentGraph = buildSankey(filteredRows);

        const chart = ensureChart();
        if (!chart) return;
        chart.clear();
        chart.setOption(getOption(state.currentGraph), true);
        renderLegend('cel-main-legend', state.currentGraph.nodes);
        scheduleChartResize();

        const validNode = state.currentGraph.nodes.some(node => node.name === state.selectedNodeName);
        if (!validNode) {
            state.selectedNodeName = state.currentGraph.nodes[0]?.name || null;
        }
        if (state.modalOpen && state.selectedNodeName) {
            openDetailModal(state.selectedNodeName);
        }
    }

    function exportCsv() {
        const filteredRows = getFilteredRows();
        const csvRows = [
            ['AÑO', 'SECTOR', 'TECNOLOGIA', 'PERMISIONARIOS', 'FACTOR_ELC', 'TOTAL_CEL_OTORGADO', 'TOTAL_ENERGIA']
        ];

        filteredRows.forEach(row => {
            csvRows.push([
                row.year,
                row.companyType,
                row.technology,
                row.totalPermisionarios,
                row.averageElc,
                row.totalCelGranted,
                row.totalEnergy
            ]);
        });

        const csv = csvRows.map(row => row.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `sankey_otorgamiento_cel_${state.year}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    }

    function exportPng() {
        const chart = ensureChart();
        if (!chart) return;
        exportChartPng(chart, `sankey_otorgamiento_cel_${state.year}.png`, 'cel-main-export');
    }

    function wireEvents() {
        const yearSelect = byId('cel-year');
        const sectorSelect = byId('cel-sector');
        const searchInput = byId('cel-search');
        const resetButton = byId('cel-reset');
        const exportCsvButton = byId('cel-export-csv');
        const exportPngButton = byId('cel-export-png');
        const exportModalPngButton = byId('cel-modal-export-png');
        const decalToggle = byId('cel-decal-toggle');
        const modalClose = byId('cel-modal-close');
        const modal = byId('cel-detail-modal');

        if (yearSelect) {
            years.forEach(year => {
                const option = document.createElement('option');
                option.value = String(year);
                option.textContent = String(year);
                yearSelect.appendChild(option);
            });
            state.year = years[0];
            yearSelect.value = String(state.year);
            yearSelect.addEventListener('change', () => {
                state.year = Number(yearSelect.value);
                render();
            });
        }

        if (sectorSelect) {
            sectorSelect.addEventListener('change', () => {
                state.sector = sectorSelect.value;
                render();
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', () => {
                state.search = searchInput.value.trim().toLowerCase();
                render();
            });
        }

        if (decalToggle) {
            decalToggle.addEventListener('change', () => {
                state.decalEnabled = decalToggle.checked;
                render();
            });
        }

        if (resetButton) {
            resetButton.addEventListener('click', () => {
                state.year = years[0];
                state.sector = 'Todos';
                state.search = '';
                state.decalEnabled = false;
                state.selectedNodeName = null;
                byId('cel-year').value = String(state.year);
                byId('cel-sector').value = state.sector;
                byId('cel-search').value = '';
                if (byId('cel-decal-toggle')) byId('cel-decal-toggle').checked = false;
                state.activeTechs.clear();
                allTechs.forEach(tech => state.activeTechs.add(tech));
                syncTechnologyChips();
                closeDetailModal();
                render();
            });
        }

        if (exportCsvButton) exportCsvButton.addEventListener('click', exportCsv);
        if (exportPngButton) exportPngButton.addEventListener('click', exportPng);
        if (exportModalPngButton) {
            exportModalPngButton.addEventListener('click', async () => {
                if (!state.subChart || !state.selectedNodeName) return;
                await exportChartPng(state.subChart, `subsankey_${state.selectedNodeName}_${state.year}.png`, 'cel-sub-export');
            });
        }
        if (modalClose) modalClose.addEventListener('click', closeDetailModal);
        if (modal) {
            modal.addEventListener('click', event => {
                const target = event.target;
                if (target instanceof HTMLElement && target.dataset.closeModal === 'true') {
                    closeDetailModal();
                }
            });
        }

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && state.modalOpen) {
                closeDetailModal();
            }
        });

        window.addEventListener('resize', () => {
            if (state.chart) state.chart.resize();
            if (state.subChart) state.subChart.resize();
        });
    }

    function init() {
        if (state.initialized) return;
        if (!byId('cel-chart')) return;
        buildTechnologyList();
        wireEvents();
        render();

        const chartContainer = byId('cel-chart');
        if (chartContainer && typeof ResizeObserver !== 'undefined' && !state.chartResizeObserver) {
            state.chartResizeObserver = new ResizeObserver(() => {
                if (state.chart) state.chart.resize();
            });
            state.chartResizeObserver.observe(chartContainer);
        }

        window.addEventListener('load', () => {
            scheduleChartResize();
        }, { once: true });

        state.initialized = true;
    }

    document.addEventListener('DOMContentLoaded', init);
    window.CELSankeyPage = { init };
})();
