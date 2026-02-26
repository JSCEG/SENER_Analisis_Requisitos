import math

years = [2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039]
consumoGWh = [279471.95, 290864.22, 302003.28, 312714.26, 323021.58, 334116.99, 340321.85, 347967.39, 354359.89, 362784.21, 370785.19, 378693.07, 388018.20, 397289.64, 405223.09]
generacionGWh = [89401.38, 96644.80, 102007.46, 120690.75, 139478.50, 153163.82, 156787.56, 174210.91, 181007.70, 186506.27, 194659.12, 210099.91, 214245.62, 230298.06, 241722.29]
requisitoPC = [31.99, 33.22, 33.78, 38.59, 43.18, 45.84, 46.07, 50.07, 51.08, 51.41, 52.50, 55.48, 55.22, 57.97, 59.65]

w = 1100
h = 650
margins = {"left": 100, "right": 100, "top": 120, "bottom": 80}
plot_w = w - margins["left"] - margins["right"]
plot_h = h - margins["top"] - margins["bottom"]

# Scaling
max_gwh = 450000
max_pct = 70

def get_x(i):
    return margins["left"] + i * (plot_w / 14.0)

def get_yl(val):    
    return margins["top"] + plot_h - (val / max_gwh) * plot_h

def get_yr(val):
    return margins["top"] + plot_h - (val / max_pct) * plot_h

svg = []
svg.append('<?xml version="1.0" encoding="utf-8"?>')
svg.append(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">')
svg.append('<defs>')
svg.append('<style>')
svg.append('''
    text { font-family: "Noto Sans", Arial, sans-serif; }
    text { font-family: "Noto Sans", sans-serif; }
    .title { font-size: 24px; font-weight: 700; fill: #9B2247; }
    .subtitle { font-size: 16px; fill: #666; }
    .axis-label { font-size: 13px; fill: #6c757d; }
    .axis-title { font-size: 14px; font-weight: 700; }
    .grid-line { stroke: #e6e6e6; stroke-width: 1; }
    
    .area-consumo { fill: #98989A; opacity: 0; animation: fadeInArea 1s ease-out 0.5s forwards; }
    .area-generacion { fill: #28a745; opacity: 0; animation: fadeInArea2 1s ease-out 1s forwards; }
    
    .line-req { stroke: #9B2247; stroke-width: 4; fill: none; stroke-dasharray: 2000; stroke-dashoffset: 2000; animation: drawLine 2s ease-in-out 1.5s forwards; }
    
    .marker { fill: #9B2247; stroke: white; stroke-width: 2; opacity: 0; animation: fadeIn 0.5s ease-out 3s forwards; }
    .data-label { font-size: 12px; font-weight: 700; fill: #9B2247; opacity: 0; animation: fadeIn 0.5s ease-out 3s forwards; }
    .data-label-bg { fill: white; opacity: 0; animation: fadeInBg 0.5s ease-out 3s forwards; }
    
    .legend-text { font-size: 14px; fill: #333; }
    
    @keyframes drawLine { to { stroke-dashoffset: 0; } }
    @keyframes fadeInArea { to { opacity: 0.15; } }
    @keyframes fadeInArea2 { to { opacity: 0.25; } }
    @keyframes fadeIn { to { opacity: 1; } }
    @keyframes fadeInBg { to { opacity: 0.7; } }
''')
svg.append('</style>')
svg.append('</defs>')

# Background
svg.append(f'<rect width="100%" height="100%" fill="#ffffff" rx="16"/>')

# Titles
svg.append(f'<text x="{w/2}" y="50" text-anchor="middle" class="title">Cálculo del Requisito CEL (2025-2039)</text>')
svg.append(f'<text x="{w/2}" y="75" text-anchor="middle" class="subtitle">Consumo obligado, generación limpia y porcentaje de requisito</text>')

# Grid and Y Axes
for i in range(6):
    pct_val = i * (max_pct / 5)
    gwh_val = i * (max_gwh / 5)
    y = margins["top"] + plot_h - i * (plot_h / 5)
    
    # Grid
    svg.append(f'<line x1="{margins["left"]}" y1="{y}" x2="{w - margins["right"]}" y2="{y}" class="grid-line" />')
    
    # Left Axis (GWh -> MWh label: so 450,000 GWh = 450M MWh we just print in M)
    lbl_left = f"{int(gwh_val / 1000)}M" if gwh_val > 0 else "0"
    svg.append(f'<text x="{margins["left"] - 15}" y="{y + 5}" text-anchor="end" class="axis-label">{lbl_left}</text>')
    
    # Right Axis (%)
    lbl_right = f"{int(pct_val)}%"
    svg.append(f'<text x="{w - margins["right"] + 15}" y="{y + 5}" text-anchor="start" class="axis-label">{lbl_right}</text>')

svg.append(f'<text x="25" y="{margins["top"] + plot_h/2}" transform="rotate(-90 25 {margins["top"] + plot_h/2})" text-anchor="middle" class="axis-title" fill="#6c757d">Millones de MWh</text>')
svg.append(f'<text x="{w - 25}" y="{margins["top"] + plot_h/2}" transform="rotate(-90 {w - 25} {margins["top"] + plot_h/2})" text-anchor="middle" class="axis-title" fill="#9B2247">Requisito (%)</text>')

# X Axis
for i, year in enumerate(years):
    x = get_x(i)
    y = margins["top"] + plot_h
    svg.append(f'<text x="{x}" y="{y + 25}" text-anchor="middle" class="axis-label">{year}</text>')
    svg.append(f'<line x1="{x}" y1="{y}" x2="{x}" y2="{y+5}" stroke="#ccc" stroke-width="1"/>')
svg.append(f'<line x1="{margins["left"]}" y1="{margins["top"] + plot_h}" x2="{w - margins["right"]}" y2="{margins["top"] + plot_h}" stroke="#333" stroke-width="1"/>')

# Data string building for Consumo Obligado (Area)
pts_c = [f"{get_x(0)},{margins['top'] + plot_h}"]
for i, val in enumerate(consumoGWh):
    pts_c.append(f"{get_x(i)},{get_yl(val)}")
pts_c.append(f"{get_x(14)},{margins['top'] + plot_h}")
svg.append(f'<polygon points="{" ".join(pts_c)}" class="area-consumo"/>')

# Data string building for Generacion Limpia (Area)
pts_g = [f"{get_x(0)},{margins['top'] + plot_h}"]
for i, val in enumerate(generacionGWh):
    pts_g.append(f"{get_x(i)},{get_yl(val)}")
pts_g.append(f"{get_x(14)},{margins['top'] + plot_h}")
svg.append(f'<polygon points="{" ".join(pts_g)}" class="area-generacion"/>')

# Data string building for Requisito % (Line)
d_r = []
d_r.append(f"M {get_x(0)} {get_yr(requisitoPC[0])}")
for i in range(1, 15):
    d_r.append(f"L {get_x(i)} {get_yr(requisitoPC[i])}")
svg.append(f'<path d="{" ".join(d_r)}" class="line-req" />')

# Markers and labels for Requisito
for i in range(15):
    x = get_x(i)
    y = get_yr(requisitoPC[i])
    svg.append(f'<circle cx="{x}" cy="{y}" r="6" class="marker" />')
    lbl = f"{requisitoPC[i]:.2f}%"
    svg.append(f'<text x="{x}" y="{y - 15}" text-anchor="middle" class="data-label" style="text-shadow: -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff;">{lbl}</text>')

# Legend
leg_y = h - 25
start_x = w/2 - 250
svg.append(f'<rect x="{start_x}" y="{leg_y-10}" width="15" height="15" fill="#98989A" fill-opacity="0.15" />')
svg.append(f'<text x="{start_x + 25}" y="{leg_y+3}" class="legend-text">Consumo Obligado</text>')

svg.append(f'<rect x="{start_x + 180}" y="{leg_y-10}" width="15" height="15" fill="#28a745" fill-opacity="0.25" />')
svg.append(f'<text x="{start_x + 205}" y="{leg_y+3}" class="legend-text">Generación Limpia</text>')

svg.append(f'<line x1="{start_x + 360}" y1="{leg_y-2}" x2="{start_x + 390}" y2="{leg_y-2}" stroke="#9B2247" stroke-width="4" />')
svg.append(f'<circle cx="{start_x + 375}" cy="{leg_y-2}" r="5" fill="#9B2247" stroke="white" stroke-width="1" />')
svg.append(f'<text x="{start_x + 400}" y="{leg_y+3}" class="legend-text">Requisito (%)</text>')


svg.append('</svg>')

with open("c:/Proyectos/60.-Diseñador de Graficos/calculo_requisito_cel_animado.svg", "w", encoding="utf-8") as f:
    f.write("\n".join(svg))
print("SVG generado")
