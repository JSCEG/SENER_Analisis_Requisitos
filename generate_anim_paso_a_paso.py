svg = []
w = 900
h = 800

svg.append('<?xml version="1.0" encoding="utf-8"?>')
svg.append(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">')
svg.append('<defs>')
svg.append('<style>')
svg.append('''
    text { font-family: "Noto Sans", Arial, sans-serif; }
    .main-title { font-size: 26px; font-weight: 700; fill: #9B2247; }
    .subtitle { font-size: 16px; fill: #666; font-style: italic; }
    
    .box { rx: 10; ry: 10; stroke-width: 2; fill: #ffffff; }
    .box-title { font-size: 18px; font-weight: 700; }
    .box-text { font-size: 14px; fill: #333; }
    .highlight { font-weight: 700; }
    
    .guinda { fill: #9B2247; }
    .dorado { fill: #A57F2C; }
    .verde  { fill: #1E5B4F; }
    .gris   { fill: #6c757d; }
    
    .stroke-guinda { stroke: #9B2247; }
    .stroke-dorado { stroke: #A57F2C; }
    .stroke-verde  { stroke: #1E5B4F; }
    
    /* Animations */
    .step1 { opacity: 0; animation: fadeIn 0.8s ease-out 1s forwards; }
    .step2 { opacity: 0; animation: fadeIn 0.8s ease-out 4s forwards; }
    .step3 { opacity: 0; animation: fadeIn 0.8s ease-out 7s forwards; }
    .step4 { opacity: 0; animation: fadeIn 0.8s ease-out 10s forwards; }
    .step5 { opacity: 0; animation: fadeIn 0.8s ease-out 13s forwards; }
    
    .arrow1 { stroke-dasharray: 200; stroke-dashoffset: 200; animation: drawArrow 1s ease-out 2.5s forwards; }
    .arrow2 { stroke-dasharray: 200; stroke-dashoffset: 200; animation: drawArrow 1s ease-out 5.5s forwards; }
    .arrow3 { stroke-dasharray: 200; stroke-dashoffset: 200; animation: drawArrow 1s ease-out 8.5s forwards; }
    .arrow4 { stroke-dasharray: 200; stroke-dashoffset: 200; animation: drawArrow 1s ease-out 11.5s forwards; }
    
    @keyframes fadeIn { to { opacity: 1; } }
    @keyframes drawArrow { to { stroke-dashoffset: 0; } }
''')
svg.append('</style>')
svg.append('''
    <marker id="arrow-guinda" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#9B2247" />
    </marker>
    <marker id="arrow-verde" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#1E5B4F" />
    </marker>
''')
svg.append('</defs>')

# Background
svg.append(f'<rect width="100%" height="100%" fill="#fdfdfd" />')

# Headers
svg.append(f'<text x="{w/2}" y="50" text-anchor="middle" class="main-title">Metodología Paso a Paso: Determinación del Requisito CEL</text>')
svg.append(f'<text x="{w/2}" y="75" text-anchor="middle" class="subtitle">Guía explicativa para la determinación del Requisito Anual (Ejemplo Base 2025)</text>')

# --- STEP 1: DEMANDA OBLIGADA (DENOMINADOR) ---
cx1 = w/2 - 200
cy1 = 150
svg.append(f'''
<g class="step1">
    <rect x="{cx1 - 180}" y="{cy1}" width="360" height="130" class="box stroke-dorado" />
    <rect x="{cx1 - 180}" y="{cy1}" width="360" height="40" fill="#A57F2C" rx="10" />
    <rect x="{cx1 - 180}" y="{cy1+20}" width="360" height="20" fill="#A57F2C" /> <!-- square bottom corners -->
    <text x="{cx1}" y="{cy1 + 27}" text-anchor="middle" class="box-title" fill="#fff">1. Demanda Obligada (Denominador)</text>
    
    <text x="{cx1 - 160}" y="{cy1 + 65}" class="box-text"><tspan class="highlight dorado">Consumo Nacional Total</tspan></text>
    <text x="{cx1 - 160}" y="{cy1 + 85}" class="box-text">Toda la demanda de energía del país.</text>
    <text x="{cx1 - 160}" y="{cy1 + 115}" class="box-text highlight">MENOS (-): <tspan fill="#666">Contratos Legados (CIL)</tspan></text>
</g>
''')

# --- STEP 2: OFERTA ACREDITABLE (NUMERADOR) ---
cx2 = w/2 + 200
cy2 = 150
svg.append(f'''
<g class="step2">
    <rect x="{cx2 - 190}" y="{cy2}" width="380" height="150" class="box stroke-verde" />
    <rect x="{cx2 - 190}" y="{cy2}" width="380" height="40" fill="#1E5B4F" rx="10" />
    <rect x="{cx2 - 190}" y="{cy2+20}" width="380" height="20" fill="#1E5B4F" />
    <text x="{cx2}" y="{cy2 + 27}" text-anchor="middle" class="box-title" fill="#fff">2. Oferta Acreditable (Numerador)</text>
    
    <text x="{cx2 - 170}" y="{cy2 + 65}" class="box-text">Total de CELs disponibles de:</text>
    <text x="{cx2 - 150}" y="{cy2 + 85}" class="box-text">✅ <tspan class="highlight verde">Renovables Nuevas</tspan> (Solar, Eólica)</text>
    <text x="{cx2 - 150}" y="{cy2 + 105}" class="box-text">✅ <tspan class="highlight verde">Centrales Legadas</tspan> (Hidro, Nuclear CFE al 100%)</text>
    <text x="{cx2 - 150}" y="{cy2 + 125}" class="box-text">✅ <tspan class="highlight verde">Hidrógeno Verde</tspan> (25% en mezcla)</text>
</g>
''')

# --- ARROWS TO STEP 3 ---
svg.append(f'<path d="M {cx1} {cy1+130} Q {cx1} {cy1+180} {w/2 - 20} {330}" fill="none" class="stroke-guinda arrow1" stroke-width="3" marker-end="url(#arrow-guinda)" />')
svg.append(f'<path d="M {cx2} {cy2+150} Q {cx2} {cy2+200} {w/2 + 20} {330}" fill="none" class="stroke-guinda arrow2" stroke-width="3" marker-end="url(#arrow-guinda)" />')

# --- STEP 3: CÁLCULO DEL REQUISITO ---
cx3 = w/2
cy3 = 350
svg.append(f'''
<g class="step3">
    <rect x="{cx3 - 225}" y="{cy3}" width="450" height="160" class="box stroke-guinda" fill="#fdf0f3" />
    <rect x="{cx3 - 225}" y="{cy3}" width="450" height="40" fill="#9B2247" rx="10" />
    <rect x="{cx3 - 225}" y="{cy3+20}" width="450" height="20" fill="#9B2247" />
    <text x="{cx3}" y="{cy3 + 27}" text-anchor="middle" class="box-title" fill="#fff">3. Cálculo del Requisito de CEL</text>
    
    <text x="{cx3}" y="{cy3 + 70}" text-anchor="middle" class="box-text" font-size="20">Fórmula General:</text>
    <text x="{cx3}" y="{cy3 + 105}" text-anchor="middle" class="box-title guinda" font-size="22">REQUISITO (%) = <tspan class="verde">Oferta</tspan> / <tspan class="dorado">Demanda</tspan></text>
    <line x1="{cx3+50}" y1="{cy3 + 110}" x2="{cx3+200}" y2="{cy3 + 110}" class="stroke-guinda" stroke-width="2" />
    
    <text x="{cx3}" y="{cy3 + 140}" text-anchor="middle" class="box-text">Ej. 2025: 89.4M MWh (Oferta) / 279.4M MWh (Demanda) = <tspan class="highlight guinda">31.99%</tspan></text>
</g>
''')

# --- ARROW TO STEP 4 ---
svg.append(f'<path d="M {cx3} {cy3+160} L {cx3} {540}" fill="none" class="stroke-guinda arrow3" stroke-width="3" marker-end="url(#arrow-guinda)" />')

# --- STEP 4: OBLIGACIÓN POR PARTICIPANTE ---
cx4 = w/2
cy4 = 550
svg.append(f'''
<g class="step4">
    <rect x="{cx4 - 300}" y="{cy4}" width="600" height="150" class="box stroke-guinda" stroke-dasharray="5,5" />
    <text x="{cx4}" y="{cy4 + 30}" text-anchor="middle" class="box-title guinda">4. ¿Qué significa esto para los participantes?</text>
    
    <text x="{cx4 - 270}" y="{cy4 + 65}" class="box-text">Cada participante obligado (Suministradores, Usuarios Calificados) debe adquirir:</text>
    
    <rect x="{cx4 - 180}" y="{cy4 + 85}" width="360" height="45" fill="#f5f5f5" rx="5" />
    <text x="{cx4}" y="{cy4 + 112}" text-anchor="middle" class="box-title" font-size="16">CELs a Comprar = <tspan class="highlight gris">Su Consumo</tspan> × <tspan class="highlight guinda">Requisito %</tspan></text>
</g>
''')

# --- STEP 5: CONCLUSIÓN ---
svg.append(f'''
<g class="step5">
    <path d="M {cx4} {cy4+150} L {cx4} {725}" fill="none" class="stroke-verde arrow4" stroke-width="3" marker-end="url(#arrow-verde)" />
    
    <rect x="{w/2 - 250}" y="{735}" width="500" height="40" rx="20" fill="#1E5B4F" />
    <text x="{w/2}" y="{760}" text-anchor="middle" font-size="16" fill="#fff" font-weight="700">Objetivo: Fomentar que el consumo impulse nuevas energías limpias</text>
</g>
''')

svg.append('</svg>')

with open("c:/Proyectos/60.-Diseñador de Graficos/paso_a_paso_requisito_cel.svg", "w", encoding="utf-8") as f:
    f.write("\n".join(svg))
print("SVG de paso a paso generado")
