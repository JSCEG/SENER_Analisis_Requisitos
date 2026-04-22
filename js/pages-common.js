document.addEventListener('DOMContentLoaded', function () {
    const MOBILE_NAV_BREAKPOINT = 860;
    const ANALISIS_FILES = new Set([
        'metodologia_cel.html',
        'pronostico_generacion.html',
        'indicador_y_requisito_cel.html',
        'requisito_cel.html',
        'obligacion_cel_participantes.html',
        'estrategia_transicion_cel.html',
        'presentacion_requisito_cel.html',
        'presentacion_nuevo_mecanismo_cel.html',
        'presentacion_ejecutiva_cel.html'
    ]);
    const OTORGAMIENTO_FILES = new Set([
        'presentacion_otorgamiento_cel.html',
        'sankey_otorgamiento_cel.html',
        'sankey_cel_historicos.html',
        'mexico.html',
        'cne_sistema_cel.html',
        'construccion.html'
    ]);
    const HIDROGENO_FILES = new Set([
        'hidrogeno_verde.html',
        'hidrogeno_entregable.html',
        'Notas_Tecnicas_Hidrogeno_Verde_SENER.html',
        'eolica_marina.html'
    ]);
    const NOTAS_FILES = new Set([
        'mapa-energia-nl-institucional.html'
    ]);
    const PRESENTACIONES_FILES = new Set([
        'tecnologias-emergentes.html'
    ]);
    const HERRAMIENTAS_FILES = new Set([
        'calculadora_conversiones_energeticas.html',
        'documentacion_analisis.html'
    ]);
    const ANALISIS_ITEMS = [
        ['metodologia_cel.html', 'Metodología'],
        ['pronostico_generacion.html', 'Pronóstico'],
        ['indicador_y_requisito_cel.html', 'Indicador vs requisito'],
        ['requisito_cel.html', 'Requisito anual'],
        ['obligacion_cel_participantes.html', 'Obligación de participantes'],
        ['estrategia_transicion_cel.html', 'Estrategia de transición'],
        ['presentacion_requisito_cel.html', 'Presentación de requisitos'],
        ['presentacion_nuevo_mecanismo_cel.html', 'Nuevo mecanismo 2026'],
        ['presentacion_ejecutiva_cel.html', 'Presentación ejecutiva']
    ];
    const OTORGAMIENTO_ITEMS = [
        ['presentacion_otorgamiento_cel.html', 'Otorgamiento CEL'],
        ['sankey_otorgamiento_cel.html', 'Sankey energía vs CEL'],
        ['sankey_cel_historicos.html', 'CEL históricos'],
        ['mexico.html', 'Cadena México I-REC'],
        ['cne_sistema_cel.html', 'Informe CNE 2022-2025'],
        ['construccion.html', 'Sistema de Comercio de Emisiones'],
        {
            href: 'https://buscador-leyes.pages.dev/',
            label: 'Marco legal energético',
            target: '_blank',
            rel: 'noopener noreferrer'
        }
    ];
    const TRANSICION_ITEMS = [
        ['hidrogeno_verde.html', 'Hidrógeno verde'],
        ['Notas_Tecnicas_Hidrogeno_Verde_SENER.html', 'Notas técnicas de hidrógeno'],
        ['eolica_marina.html', 'Eólica marina']
    ];
    const NOTAS_ITEMS = [
        ['mapa-energia-nl-institucional.html', 'Mapa de proyectos energéticos en NL']
    ];
    const PRESENTACIONES_ITEMS = [
        ['tecnologias-emergentes.html', 'Tecnologías emergentes']
    ];
    const HERRAMIENTAS_ITEMS = [
        {
            href: 'documentacion_analisis.html',
            label: 'Documentación'
        },
        {
            href: 'https://buscador-leyes.pages.dev/',
            label: 'Buscador jurídico',
            target: '_blank',
            rel: 'noopener noreferrer'
        },
        {
            href: 'calculadora_conversiones_energeticas.html',
            label: 'Calculadora energética'
        },
        {
            href: 'https://notas-inteligentes.pages.dev/',
            label: 'Notas inteligentes',
            target: '_blank',
            rel: 'noopener noreferrer'
        }
    ];
    const CURRENT_FILE = getCurrentFileName();

    renderTopBar();
    renderSharedNavigation();
    renderMobileDrawer();
    renderBottomNav();
    renderSharedHeader();
    renderSharedFooter();
    bindNavigationInteractions();

    function getCurrentFileName() {
        const pathname = window.location.pathname || '';
        const cleanPath = pathname.endsWith('/') ? `${pathname}index.html` : pathname;
        const segments = decodeURIComponent(cleanPath).split('/');
        return segments[segments.length - 1] || 'index.html';
    }

    function isActive(fileName) {
        return CURRENT_FILE === fileName;
    }

    function activeClass(condition) {
        return condition ? ' active' : '';
    }

    function currentGroup() {
        if (ANALISIS_FILES.has(CURRENT_FILE)) {
            return 'cel';
        }

        if (OTORGAMIENTO_FILES.has(CURRENT_FILE)) {
            return 'mercados';
        }

        if (HIDROGENO_FILES.has(CURRENT_FILE)) {
            return 'transicion';
        }

        if (HERRAMIENTAS_FILES.has(CURRENT_FILE)) {
            return 'herramientas';
        }

        if (NOTAS_FILES.has(CURRENT_FILE)) {
            return 'notas';
        }

        return 'inicio';
    }

    function renderTopBar() {
        const nav = document.querySelector('.site-nav');
        if (!nav || document.querySelector('.site-topbar')) {
            return;
        }

        const topBar = document.createElement('div');
        topBar.className = 'site-topbar';
        topBar.innerHTML = `
            <div class="site-topbar__inner">
                <strong>SENER</strong>
                <span>Secretaría de Energía</span>
                <span>|</span>
                <span>Subsecretaría de Planeación y Transición Energética</span>
                <span>|</span>
                <span>Actualización 2026</span>
            </div>
        `;

        nav.parentNode.insertBefore(topBar, nav);
    }

    function buildDropdown(title, items, activeGroup) {
        const links = items.map((item) => {
            const href = Array.isArray(item) ? item[0] : item.href;
            const label = Array.isArray(item) ? item[1] : item.label;
            const isInternalActive = !Array.isArray(item) && item.external ? false : isActive(href);
            const target = !Array.isArray(item) && item.target ? ` target="${item.target}"` : '';
            const rel = !Array.isArray(item) && item.rel ? ` rel="${item.rel}"` : '';

            return `<li><a href="${href}" class="nav-dropdown-link${activeClass(isInternalActive)}"${isInternalActive ? ' aria-current="page"' : ''}${target}${rel}>${label}</a></li>`;
        }).join('');

        return `
            <li class="nav-item nav-dropdown">
                <a href="#" class="nav-link nav-dropdown-toggle${activeClass(activeGroup)}">${title} <span class="dropdown-icon">&#9662;</span></a>
                <ul class="nav-dropdown-menu">
                    ${links}
                </ul>
            </li>
        `;
    }

    function buildNavigationMarkup() {
        const transicionActive = HIDROGENO_FILES.has(CURRENT_FILE);
        const notasActive = NOTAS_FILES.has(CURRENT_FILE);
        const presentacionesActive = PRESENTACIONES_FILES.has(CURRENT_FILE);
        const herramientasActive = HERRAMIENTAS_FILES.has(CURRENT_FILE);

        return `
            <div class="nav-inner">
                <div class="nav-brand">
                    <a href="index.html" class="nav-brand__link">
                        <span class="nav-brand__mark" aria-hidden="true">
                            <i class="bi bi-grid-1x2-fill"></i>
                        </span>
                        <span class="nav-brand__copy">
                            <span class="nav-brand__label">DGTE · SENER</span>
                            <span class="nav-brand__eyebrow">Plataforma de análisis</span>
                        </span>
                    </a>
                </div>
                <ul class="nav-links nav-menu">
                    <li class="nav-item"><a href="index.html" class="nav-link${activeClass(isActive('index.html'))}"${isActive('index.html') ? ' aria-current="page"' : ''}>Inicio</a></li>
                    ${buildDropdown('CEL', ANALISIS_ITEMS, ANALISIS_FILES.has(CURRENT_FILE))}
                    ${buildDropdown('Mercados', OTORGAMIENTO_ITEMS, OTORGAMIENTO_FILES.has(CURRENT_FILE))}
                    ${buildDropdown('Transición', TRANSICION_ITEMS, transicionActive)}
                    ${buildDropdown('Notas', NOTAS_ITEMS, notasActive)}
                    ${buildDropdown('Presentaciones', PRESENTACIONES_ITEMS, presentacionesActive)}
                    ${buildDropdown('Herramientas', HERRAMIENTAS_ITEMS, herramientasActive)}
                </ul>
                <div class="nav-end">
                    <span class="nav-pill">2026</span>
                    <button class="nav-toggle nav-hamburger" aria-label="Abrir menú" aria-expanded="false" aria-controls="site-nav-drawer">
                        <span class="nav-toggle__bars" aria-hidden="true"><span></span><span></span><span></span></span>
                    </button>
                </div>
            </div>
        `;
    }

    function buildDrawerSection(title, items, icon) {
        const links = items.map((item) => {
            const href = Array.isArray(item) ? item[0] : item.href;
            const label = Array.isArray(item) ? item[1] : item.label;
            const target = !Array.isArray(item) && item.target ? ` target="${item.target}"` : '';
            const rel = !Array.isArray(item) && item.rel ? ` rel="${item.rel}"` : '';
            const externalMark = target ? ' ↗' : '';
            const active = href === CURRENT_FILE;

            return `<a href="${href}" class="nav-drawer-link${activeClass(active)}"${active ? ' aria-current="page"' : ''}${target}${rel}><i class="bi ${icon}"></i>${label}${externalMark}</a>`;
        }).join('');

        return `
            <div class="nav-drawer-section">${title}</div>
            ${links}
        `;
    }

    function renderMobileDrawer() {
        if (document.getElementById('site-nav-overlay') || document.getElementById('site-nav-drawer')) {
            return;
        }

        const overlay = document.createElement('div');
        overlay.id = 'site-nav-overlay';
        overlay.className = 'nav-overlay';

        const drawer = document.createElement('nav');
        drawer.id = 'site-nav-drawer';
        drawer.className = 'nav-drawer';
        drawer.setAttribute('aria-label', 'Menú principal');
        drawer.innerHTML = `
            <div class="nav-drawer-head">
                <div class="nav-drawer-brand">
                    <span class="nav-brand__mark" aria-hidden="true"><i class="bi bi-grid-1x2-fill"></i></span>
                    <span class="nav-brand__copy">
                        <span class="nav-brand__label">DGTE · SENER</span>
                        <span class="nav-brand__eyebrow">Plataforma de análisis</span>
                    </span>
                </div>
                <button class="nav-drawer-close" type="button" aria-label="Cerrar menú"><i class="bi bi-x-lg"></i></button>
            </div>
            <div class="nav-drawer-body">
                <div class="nav-drawer-section">General</div>
                <a href="index.html" class="nav-drawer-link${activeClass(isActive('index.html'))}"${isActive('index.html') ? ' aria-current="page"' : ''}><i class="bi bi-house"></i>Inicio</a>
                ${buildDrawerSection('CEL — Análisis de Requisito', ANALISIS_ITEMS, 'bi-bar-chart-line')}
                ${buildDrawerSection('Mercados', OTORGAMIENTO_ITEMS, 'bi-diagram-3')}
                ${buildDrawerSection('Transición energética', TRANSICION_ITEMS, 'bi-lightning-charge')}
                ${buildDrawerSection('Notas', NOTAS_ITEMS, 'bi-map')}
                ${buildDrawerSection('Presentaciones', PRESENTACIONES_ITEMS, 'bi-file-earmark-slides')}
                ${buildDrawerSection('Herramientas', HERRAMIENTAS_ITEMS, 'bi-grid')}
            </div>
        `;

        document.body.appendChild(overlay);
        document.body.appendChild(drawer);
    }

    function renderBottomNav() {
        if (document.querySelector('.bottom-nav')) {
            return;
        }

        const section = currentGroup();
        const bottomNav = document.createElement('nav');
        bottomNav.className = 'bottom-nav';
        bottomNav.setAttribute('aria-label', 'Navegación principal');
        bottomNav.innerHTML = `
            <div class="bottom-nav-inner">
                <a href="index.html" class="bottom-nav-item${activeClass(section === 'inicio')}"${section === 'inicio' ? ' aria-current="page"' : ''}><i class="bi bi-house-fill"></i>Inicio</a>
                <a href="metodologia_cel.html" class="bottom-nav-item${activeClass(section === 'cel')}"${section === 'cel' ? ' aria-current="page"' : ''}><i class="bi bi-bar-chart-line-fill"></i>CEL</a>
                <a href="presentacion_otorgamiento_cel.html" class="bottom-nav-item${activeClass(section === 'mercados')}"${section === 'mercados' ? ' aria-current="page"' : ''}><i class="bi bi-lightning-charge-fill"></i>Mercados</a>
                <a href="calculadora_conversiones_energeticas.html" class="bottom-nav-item${activeClass(section === 'herramientas')}"${section === 'herramientas' ? ' aria-current="page"' : ''}><i class="bi bi-calculator-fill"></i>Calc</a>
                <button class="bottom-nav-item" type="button" data-bottom-nav-menu><i class="bi bi-grid-fill"></i>Más</button>
            </div>
        `;

        document.body.appendChild(bottomNav);
    }

    function renderSharedNavigation() {
        const nav = document.querySelector('.site-nav');
        if (!nav) {
            return;
        }

        nav.innerHTML = buildNavigationMarkup();
    }

    function renderSharedHeader() {
        document.querySelectorAll('[data-shared-header]').forEach((header) => {
            header.classList.add('site-header');
            header.innerHTML = `
                <div class="site-header__content">
                    <div class="site-header__brand">
                        <img src="img/logo_sener.png" alt="SENER">
                        <div class="site-header__divider"></div>
                        <div class="site-header__text">
                            <span class="site-header__eyebrow">Subsecretaría de Planeación y Transición Energética</span>
                            <h1>Dirección General de Transición Energética</h1>
                            <p>Instrumentos de análisis, visualizaciones y herramientas de consulta para política energética.</p>
                        </div>
                    </div>
                    <div class="site-header__meta">
                        <span class="site-header__pill">SENER</span>
                        <span class="site-header__pill">Actualización 2026</span>
                    </div>
                </div>
            `;
        });
    }

    function renderSharedFooter() {
        document.querySelectorAll('[data-shared-footer]').forEach((footer) => {
            footer.classList.add('site-footer');
            footer.innerHTML = `
                <div class="site-footer__inner">
                    <p>&copy; 2026 Secretaría de Energía · Subsecretaría de Planeación y Transición Energética</p>
                    <img src="img/logo_sener.png" alt="SENER" class="site-footer__logo">
                </div>
            `;
        });
    }

    function bindNavigationInteractions() {
        const navToggle = document.querySelector('.nav-toggle');
        const navDrawer = document.getElementById('site-nav-drawer');
        const navOverlay = document.getElementById('site-nav-overlay');
        const navClose = document.querySelector('.nav-drawer-close');
        const bottomNavMenu = document.querySelector('[data-bottom-nav-menu]');

        function setDrawerState(isOpen) {
            if (!navDrawer || !navOverlay || !navToggle) {
                return;
            }

            navDrawer.classList.toggle('open', isOpen);
            navOverlay.classList.toggle('open', isOpen);
            navToggle.classList.toggle('active', isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
            document.body.classList.toggle('nav-drawer-open', isOpen);
        }

        if (navToggle && navDrawer && navOverlay) {
            navToggle.addEventListener('click', function (event) {
                event.stopPropagation();
                const isOpen = !navDrawer.classList.contains('open');
                setDrawerState(isOpen);
            });

            navOverlay.addEventListener('click', function () {
                setDrawerState(false);
            });

            navClose?.addEventListener('click', function () {
                setDrawerState(false);
            });

            bottomNavMenu?.addEventListener('click', function () {
                setDrawerState(true);
            });

            document.addEventListener('keydown', function (event) {
                if (event.key === 'Escape') {
                    setDrawerState(false);
                }
            });
        }

        document.querySelectorAll('.nav-dropdown-toggle').forEach((toggle) => {
            toggle.addEventListener('click', function (event) {
                if (window.innerWidth < MOBILE_NAV_BREAKPOINT) {
                    event.preventDefault();
                    setDrawerState(true);
                }
            });
        });

        window.addEventListener('resize', function () {
            if (!navToggle || !navDrawer) {
                return;
            }

            if (window.innerWidth >= MOBILE_NAV_BREAKPOINT) {
                setDrawerState(false);
            }
        });
    }
});
