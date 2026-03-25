import re
from pathlib import Path


FILES_WITH_NAV = [
    "calculadora_conversiones_energeticas.html",
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

NAV_MARKUP = '    <nav class="site-nav"></nav>'


def main() -> None:
    nav_pattern = re.compile(r'(?s)[ \t]*<nav class="site-nav">.*?</nav>')

    for filename in FILES_WITH_NAV:
        path = Path(filename)
        content = path.read_text(encoding="utf-8")

        if not nav_pattern.search(content):
            print(f"Skipping {filename}: nav not found")
            continue

        updated = nav_pattern.sub(NAV_MARKUP, content, count=1)
        path.write_text(updated, encoding="utf-8")
        print(f"Updated {filename}")


if __name__ == "__main__":
    main()
