import glob
import re
from pathlib import Path


FILES_WITH_NAV = [
    "cne_sistema_cel.html",
    "construccion.html",
    "documentacion_analisis.html",
    "eolica_marina.html",
    "estrategia_transicion_cel.html",
    "hidrogeno_entregable.html",
    "hidrogeno_verde.html",
    "index.html",
    "indicador_y_requisito_cel.html",
    "metodologia_cel.html",
    "obligacion_cel_participantes.html",
    "presentacion_ejecutiva_cel.html",
    "presentacion_nuevo_mecanismo_cel.html",
    "presentacion_otorgamiento_cel.html",
    "presentacion_requisito_cel.html",
    "pronostico_generacion.html",
    "requisito_cel.html",
    "mexico.html",
    "sankey_cel_historicos.html",
    "sankey_otorgamiento_cel.html",
]

ANALISIS_FILES = {
    "metodologia_cel.html",
    "pronostico_generacion.html",
    "indicador_y_requisito_cel.html",
    "requisito_cel.html",
    "obligacion_cel_participantes.html",
    "estrategia_transicion_cel.html",
    "presentacion_requisito_cel.html",
    "presentacion_nuevo_mecanismo_cel.html",
    "presentacion_ejecutiva_cel.html",
}

OTORGAMIENTO_FILES = {
    "presentacion_otorgamiento_cel.html",
    "sankey_otorgamiento_cel.html",
    "sankey_cel_historicos.html",
    "cne_sistema_cel.html",
    "mexico.html",
}

ANALISIS_ITEMS = [
    ("metodologia_cel.html", "1. Metodología"),
    ("pronostico_generacion.html", "2. Pronóstico"),
    ("indicador_y_requisito_cel.html", "3. Indicador vs Requisito"),
    ("requisito_cel.html", "4. Requisito Anual"),
    ("obligacion_cel_participantes.html", "5. Obligación Participantes"),
    ("estrategia_transicion_cel.html", "6. Estrategia Transición"),
    ("presentacion_requisito_cel.html", "7. Presentación Requisitos"),
    ("presentacion_nuevo_mecanismo_cel.html", "8. Presentación Nuevo Mecanismo 2026"),
    ("presentacion_ejecutiva_cel.html", "9. Presentación Ejecutiva CEL"),
]

OTORGAMIENTO_ITEMS = [
    ("presentacion_otorgamiento_cel.html", "Presentación Otorgamiento"),
    ("sankey_otorgamiento_cel.html", "Sankey Energía vs CEL otorgados"),
    ("sankey_cel_historicos.html", "Sankey CEL históricos otorgados"),
    ("mexico.html", "Cadena México I-REC"),
    ("cne_sistema_cel.html", "Informe CNE: Sistema CEL 2022–2025"),
]


def active_class(condition: bool) -> str:
    return " active" if condition else ""


def build_dropdown(title: str, items: list[tuple[str, str]], current_file: str, group_files: set[str]) -> str:
    toggle_class = f'nav-link nav-dropdown-toggle{active_class(current_file in group_files)}'
    lines = [
        '            <li class="nav-item">',
        f'                <a href="#" class="{toggle_class}">{title} <span class="dropdown-icon">&#9662;</span></a>',
        '                <ul class="nav-dropdown-menu">',
    ]

    for href, label in items:
        link_class = f'nav-dropdown-link{active_class(current_file == href)}'
        lines.append(f'                    <li><a href="{href}" class="{link_class}">{label}</a></li>')

    lines.extend([
        '                </ul>',
        '            </li>',
    ])
    return "\n".join(lines)


def build_nav(current_file: str) -> str:
    inicio_active = current_file == "index.html"
    docs_active = current_file == "documentacion_analisis.html"
    comercio_active = current_file == "construccion.html"
    hidrogeno_active = current_file in {"hidrogeno_verde.html", "hidrogeno_entregable.html"}
    eolica_active = current_file == "eolica_marina.html"

    lines = [
        '    <nav class="site-nav">',
        '        <div class="nav-brand">',
        '            <a href="index.html" style="color:white; text-decoration:none; display:flex; align-items:center; gap:8px;">',
        '                <i class="bi bi-bar-chart-fill"></i> SENER | DGTE',
        '            </a>',
        '        </div>',
        '        <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">',
        '            <span></span><span></span><span></span>',
        '        </button>',
        '        <ul class="nav-menu">',
        f'            <li class="nav-item"><a href="index.html" class="nav-link{active_class(inicio_active)}">Inicio</a></li>',
        build_dropdown("Análisis Requisito de CEL", ANALISIS_ITEMS, current_file, ANALISIS_FILES),
        build_dropdown("Otorgamiento CEL", OTORGAMIENTO_ITEMS, current_file, OTORGAMIENTO_FILES),
        f'            <li class="nav-item"><a href="construccion.html" class="nav-link{active_class(comercio_active)}">Sistema de Comercio de Emisiones</a></li>',
        '            <li class="nav-item">',
        f'                <a href="#" class="nav-link nav-dropdown-toggle{active_class(hidrogeno_active)}">Hidrógeno Verde <span class="dropdown-icon">&#9662;</span></a>',
        '                <ul class="nav-dropdown-menu">',
        '                    <li><a href="hidrogeno_verde.html" class="nav-dropdown-link">Vista general</a></li>',
        '                    <li><a href="Notas_Tecnicas_Hidrogeno_Verde_SENER.html" class="nav-dropdown-link">Notas técnicas</a></li>',
        '                </ul>',
        '            </li>',
        f'            <li class="nav-item"><a href="eolica_marina.html" class="nav-link{active_class(eolica_active)}">Eólica Marina</a></li>',
        f'            <li class="nav-item"><a href="documentacion_analisis.html" class="nav-link{active_class(docs_active)}">Documentación</a></li>',
        '            <li class="nav-item"><a href="https://buscador-leyes.pages.dev/" target="_blank" rel="noopener noreferrer" class="nav-link">Buscador Jurídico</a></li>',
        '        </ul>',
        '    </nav>',
    ]
    return "\n".join(lines)


def main() -> None:
    nav_pattern = re.compile(r"(?s)[ \t]*<nav class=\"site-nav\">.*?</nav>")

    for filename in FILES_WITH_NAV:
        path = Path(filename)
        content = path.read_text(encoding="utf-8")
        new_nav = build_nav(path.name)

        if not nav_pattern.search(content):
            print(f"Skipping {filename}: nav not found")
            continue

        updated = nav_pattern.sub(new_nav, content, count=1)
        path.write_text(updated, encoding="utf-8")
        print(f"Updated {filename}")


if __name__ == "__main__":
    main()
