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
        'cne_sistema_cel.html'
    ]);
    const HIDROGENO_FILES = new Set([
        'hidrogeno_verde.html',
        'hidrogeno_entregable.html',
        'Notas_Tecnicas_Hidrogeno_Verde_SENER.html'
    ]);
    const HERRAMIENTAS_FILES = new Set([
        'calculadora_conversiones_energeticas.html'
    ]);
    const ANALISIS_ITEMS = [
        ['metodologia_cel.html', '1. Metodología'],
        ['pronostico_generacion.html', '2. Pronóstico'],
        ['indicador_y_requisito_cel.html', '3. Indicador vs Requisito'],
        ['requisito_cel.html', '4. Requisito Anual'],
        ['obligacion_cel_participantes.html', '5. Obligación Participantes'],
        ['estrategia_transicion_cel.html', '6. Estrategia Transición'],
        ['presentacion_requisito_cel.html', '7. Presentación Requisitos'],
        ['presentacion_nuevo_mecanismo_cel.html', '8. Presentación Nuevo Mecanismo 2026'],
        ['presentacion_ejecutiva_cel.html', '9. Presentación Ejecutiva CEL']
    ];
    const OTORGAMIENTO_ITEMS = [
        ['presentacion_otorgamiento_cel.html', 'Presentación Otorgamiento'],
        ['sankey_otorgamiento_cel.html', 'Sankey Energía vs CEL otorgados'],
        ['sankey_cel_historicos.html', 'Sankey CEL históricos otorgados'],
        ['mexico.html', 'Cadena México I-REC'],
        ['cne_sistema_cel.html', 'Informe CNE: Sistema CEL 2022–2025']
    ];
    const HERRAMIENTAS_ITEMS = [
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
        const hidrogenoActive = HIDROGENO_FILES.has(CURRENT_FILE);
        const herramientasActive = HERRAMIENTAS_FILES.has(CURRENT_FILE);

        return `
            <div class="nav-brand">
                <a href="index.html" style="color:white; text-decoration:none; display:flex; align-items:center; gap:8px;">
                    <i class="bi bi-bar-chart-fill"></i> SENER | DGTE
                </a>
            </div>
            <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
                <span></span><span></span><span></span>
            </button>
            <ul class="nav-menu">
                <li class="nav-item"><a href="index.html" class="nav-link${activeClass(isActive('index.html'))}"${isActive('index.html') ? ' aria-current="page"' : ''}>Inicio</a></li>
                ${buildDropdown('Análisis Requisito de CEL', ANALISIS_ITEMS, ANALISIS_FILES.has(CURRENT_FILE))}
                ${buildDropdown('Otorgamiento CEL', OTORGAMIENTO_ITEMS, OTORGAMIENTO_FILES.has(CURRENT_FILE))}
                <li class="nav-item"><a href="construccion.html" class="nav-link${activeClass(isActive('construccion.html'))}"${isActive('construccion.html') ? ' aria-current="page"' : ''}>Sistema de Comercio de Emisiones</a></li>
                <li class="nav-item">
                    <a href="#" class="nav-link nav-dropdown-toggle${activeClass(hidrogenoActive)}">Hidrógeno Verde <span class="dropdown-icon">&#9662;</span></a>
                    <ul class="nav-dropdown-menu">
                        <li><a href="hidrogeno_verde.html" class="nav-dropdown-link${activeClass(isActive('hidrogeno_verde.html'))}"${isActive('hidrogeno_verde.html') ? ' aria-current="page"' : ''}>Vista general</a></li>
                        <li><a href="Notas_Tecnicas_Hidrogeno_Verde_SENER.html" class="nav-dropdown-link${activeClass(isActive('Notas_Tecnicas_Hidrogeno_Verde_SENER.html'))}"${isActive('Notas_Tecnicas_Hidrogeno_Verde_SENER.html') ? ' aria-current="page"' : ''}>Notas técnicas</a></li>
                    </ul>
                </li>
                <li class="nav-item"><a href="eolica_marina.html" class="nav-link${activeClass(isActive('eolica_marina.html'))}"${isActive('eolica_marina.html') ? ' aria-current="page"' : ''}>Eólica Marina</a></li>
                ${buildDropdown('Herramientas', HERRAMIENTAS_ITEMS, herramientasActive)}
                <li class="nav-item"><a href="documentacion_analisis.html" class="nav-link${activeClass(isActive('documentacion_analisis.html'))}"${isActive('documentacion_analisis.html') ? ' aria-current="page"' : ''}>Documentación</a></li>
                <li class="nav-item"><a href="https://buscador-leyes.pages.dev/" target="_blank" rel="noopener noreferrer" class="nav-link">Buscador Jurídico</a></li>
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
                            <h1>Dirección General de Transición Energética</h1>
                            <p>Subsecretaría de Planeación y Transición Energética · SENER</p>
                        </div>
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
