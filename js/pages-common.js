document.addEventListener('DOMContentLoaded', function () {
    const DESKTOP_NAV_BREAKPOINT = 1200;
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

    renderSharedNavigation();
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
            <li class="nav-item">
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
            <div class="nav-brand">
                <a href="index.html" class="nav-brand__link">
                    <span class="nav-brand__mark" aria-hidden="true">
                        <i class="bi bi-grid-1x2-fill"></i>
                    </span>
                    <span class="nav-brand__copy">
                        <span class="nav-brand__eyebrow">Plataforma de análisis</span>
                        <span class="nav-brand__label">DGTE · SENER</span>
                    </span>
                </a>
            </div>
            <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
                <span></span><span></span><span></span>
            </button>
            <ul class="nav-menu">
                <li class="nav-item"><a href="index.html" class="nav-link${activeClass(isActive('index.html'))}"${isActive('index.html') ? ' aria-current="page"' : ''}>Inicio</a></li>
                ${buildDropdown('CEL', ANALISIS_ITEMS, ANALISIS_FILES.has(CURRENT_FILE))}
                ${buildDropdown('Mercados', OTORGAMIENTO_ITEMS, OTORGAMIENTO_FILES.has(CURRENT_FILE))}
                ${buildDropdown('Transición', TRANSICION_ITEMS, transicionActive)}
                ${buildDropdown('Notas', NOTAS_ITEMS, notasActive)}
                ${buildDropdown('Presentaciones', PRESENTACIONES_ITEMS, presentacionesActive)}
                ${buildDropdown('Herramientas', HERRAMIENTAS_ITEMS, herramientasActive)}
            </ul>
        `;
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
                            <p>Instrumentos editoriales, visualizaciones y herramientas de consulta para política energética.</p>
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
        const navMenu = document.querySelector('.nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function (event) {
                event.stopPropagation();
                const isOpen = navMenu.classList.toggle('active');
                navToggle.classList.toggle('active', isOpen);
                navToggle.setAttribute('aria-expanded', String(isOpen));
            });

            document.addEventListener('click', function (event) {
                if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });

            document.addEventListener('keydown', function (event) {
                if (event.key === 'Escape') {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }

        document.querySelectorAll('.nav-dropdown-toggle').forEach((toggle) => {
            toggle.addEventListener('click', function (event) {
                if (window.innerWidth < DESKTOP_NAV_BREAKPOINT) {
                    event.preventDefault();
                    const parent = this.parentElement;
                    parent.classList.toggle('open');
                    const dropdownMenu = parent.querySelector('.nav-dropdown-menu');

                    if (dropdownMenu) {
                        dropdownMenu.classList.toggle('active');
                    }
                }
            });
        });

        window.addEventListener('resize', function () {
            if (!navMenu || !navToggle) {
                return;
            }

            if (window.innerWidth >= DESKTOP_NAV_BREAKPOINT) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.querySelectorAll('.nav-item.open').forEach((item) => item.classList.remove('open'));
                document.querySelectorAll('.nav-dropdown-menu.active').forEach((menu) => menu.classList.remove('active'));
            }
        });
    }
});
