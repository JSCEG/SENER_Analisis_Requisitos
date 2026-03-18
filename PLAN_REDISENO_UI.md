# Plan de Rediseño UI

## Objetivo

Modernizar la interfaz del sitio sin romper funcionalidades existentes, manteniendo la identidad institucional y separando la capa visual de la lógica de negocio, gráficos y exportaciones.

## Principios

- No tocar primero la lógica de datos ni los scripts de gráficas.
- Reusar estructura y tokens institucionales existentes.
- Migrar por capas: layout, componentes, páginas piloto, después expansión.
- Evitar mezclar estilos nuevos y viejos sin estrategia.
- Validar cada fase en una página piloto antes de propagar.

## Diagnóstico actual

- El proyecto no tiene Tailwind configurado actualmente.
- Ya existe una base de estilos compartidos:
  - `css/base-theme.css`
  - `css/pages-common.css`
  - `css/shared-header.css`
  - `css/shared-breadcrumbs.css`
  - `css/shared-bottom-nav.css`
  - `css/cel-sankey.css`
- La lógica funcional ya está separada en varios scripts reutilizables:
  - `js/pages-common.js`
  - `js/cel-sankey.js`
  - `js/cel-historicos-sankey.js`
  - utilidades de exportación y soporte

## Estrategia recomendada

### Fase 1. Sistema visual base

Crear una capa nueva de diseño, sin sustituir de inmediato todos los estilos existentes.

Entregables:

- `tailwind.config.js`
- `postcss.config.js`
- `src/styles/tailwind.css`
- tokens visuales alineados con colores SENER / GobMX
- nueva escala de spacing, radios, sombras y tipografía

Decisión clave:

- Tailwind se usará para layout, spacing, grids, responsive y componentes de interfaz.
- ECharts, tablas especiales y ciertos estilos de charts seguirán con CSS dedicado.

### Fase 2. Shell global del sitio

Rediseñar sin tocar aún el contenido profundo de cada página:

- header principal
- navegación con dropdown
- breadcrumb
- contenedor general
- footer
- grillas base y breakpoints

Resultado:

Todas las páginas adquieren una estructura más limpia y consistente sin alterar su lógica.

### Fase 3. Biblioteca de componentes

Unificar componentes recurrentes:

- botones
- inputs
- selects
- chips
- cards
- tablas
- modales
- badges
- bloques KPI
- paneles de visualización

Objetivo:

Eliminar variaciones visuales innecesarias y reducir CSS disperso.

### Fase 4. Página piloto

Aplicar el nuevo sistema primero en una página de alto valor y riesgo controlado.

Página piloto recomendada:

- `sankey_otorgamiento_cel.html`

Por qué:

- ya concentra filtros, KPIs, gráfico, leyenda, modal y exportación
- permite validar desktop y mobile
- si queda bien, el resto del sitio hereda patrones útiles

### Fase 5. Segunda validación

Aplicar el mismo sistema a:

- `sankey_cel_historicos.html`

Con esto se valida:

- consistencia entre páginas analíticas
- comportamiento de filtros más complejos
- modales y exportaciones reutilizables

### Fase 6. Expansión al resto del sitio

Después del piloto:

- `index.html`
- páginas de presentaciones
- páginas metodológicas
- vistas de requisito CEL
- otras vistas temáticas

## Lenguaje visual propuesto

### Tono

Editorial técnico-institucional:

- sobrio
- limpio
- profesional
- con buena jerarquía
- sin verse como dashboard genérico

### Paleta

Base:

- Guinda institucional
- Verde institucional
- Dorado como acento
- neutros cálidos y grises limpios

Uso:

- guinda para títulos y foco institucional
- verde para navegación activa y elementos técnicos
- dorado para acentos discretos
- fondos claros con contraste suave

### Tipografía

- títulos: serif institucional o equivalente elegante
- cuerpo e interfaz: sans limpia y moderna

Propuesta:

- mantener `Merriweather` o equivalente para títulos
- mantener `Noto Sans` para interfaz y tablas

### Layout

- contenedores más amplios en páginas analíticas
- mejor uso de ancho en Sankeys y charts
- filtros en bandas compactas
- KPI cards más limpias y menos pesadas
- modales más generosos y mejor espaciados

## Qué no cambiar al inicio

- estructura de datos de los Sankey
- lógica de filtros
- exportaciones PNG/CSV
- scripts de ECharts
- naming funcional de IDs y hooks JS

La primera iteración debe cambiar presentación, no comportamiento.

## Riesgos a controlar

- romper selectores JS por cambios de markup
- duplicar estilos entre CSS viejo y Tailwind
- mezclar utilidades con estilos legacy sin convención
- reescribir páginas completas antes de tener componentes base

## Convención de migración

1. Mantener IDs y hooks de JS actuales.
2. Mover estilos inline a clases reutilizables.
3. Introducir clases nuevas por capa, no reemplazos desordenados.
4. Validar visual y funcionalmente cada página antes de pasar a la siguiente.

## Orden de trabajo recomendado

1. Configurar Tailwind sin desarmar CSS existente.
2. Crear layout base y componentes compartidos.
3. Rediseñar `sankey_otorgamiento_cel.html`.
4. Ajustar `sankey_cel_historicos.html`.
5. Rediseñar `index.html`.
6. Propagar al resto.

## Primer entregable sugerido

Un piloto completo sobre `sankey_otorgamiento_cel.html` con:

- nuevo header y breadcrumb
- nueva barra de filtros
- nueva composición de KPIs
- panel de Sankey más limpio
- leyenda y modal mejorados
- mobile más sólido

Si ese piloto funciona, el resto del rediseño ya no sería exploración, sino réplica controlada.
