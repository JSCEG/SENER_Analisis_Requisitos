import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════
   GobMX Institutional Palette & Design Tokens
   ═══════════════════════════════════════════════ */
const C = {
  guinda: "#9B2247",
  verde: "#1E5B4F",
  dorado: "#A57F2C",
  gris: "#98989A",
  grisCl: "#E5E5E5",
  guindaLt: "rgba(155,34,71,0.05)",
  verdeLt: "rgba(30,91,79,0.06)",
  doradoLt: "rgba(165,127,44,0.06)",
  text: "#333333",
  textSec: "#98989A",
  bg: "#FFFFFF",
  surface: "#F8F9FA",
  border: "#DDDDDD",
};
const FF = { h: "'Merriweather', 'Georgia', serif", b: "'Noto Sans', sans-serif" };

/* ═══════════════════════════════════════════════
   PNG Export utility using html2canvas via CDN
   ═══════════════════════════════════════════════ */
function useExportPNG() {
  const [h2cLoaded, setH2cLoaded] = useState(false);
  useEffect(() => {
    if (window.html2canvas) { setH2cLoaded(true); return; }
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
    s.onload = () => setH2cLoaded(true);
    document.head.appendChild(s);
  }, []);

  const exportRef = useCallback(async (ref, filename = "grafico") => {
    if (!ref.current || !window.html2canvas) return;
    try {
      const canvas = await window.html2canvas(ref.current, {
        backgroundColor: "#FFFFFF",
        scale: 3,
        useCORS: true,
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `${filename}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (e) { console.error("Export error", e); }
  }, []);

  return { exportRef, h2cLoaded };
}

function ExportBtn({ onClick, loaded }) {
  return (
    <button onClick={onClick} disabled={!loaded}
      style={{
        fontFamily: FF.b, fontSize: 11, fontWeight: 600,
        background: loaded ? C.verde : C.grisCl, color: loaded ? "#fff" : C.gris,
        border: "none", borderRadius: 4, padding: "6px 14px",
        cursor: loaded ? "pointer" : "default", transition: "all 0.2s",
        display: "inline-flex", alignItems: "center", gap: 5
      }}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      Descargar PNG
    </button>
  );
}

/* ═══════════════════════════════════════════════
   Chart Components
   ═══════════════════════════════════════════════ */
function ScoreCircle({ value, max = 5, color = C.verde, size = 36 }) {
  const r = (size - 6) / 2, circ = 2 * Math.PI * r, off = circ - (value / max) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.grisCl} strokeWidth={3} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={3}
        strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(.4,0,.2,1)" }} />
      <text x={size/2} y={size/2} textAnchor="middle" dominantBaseline="central"
        style={{ transform:"rotate(90deg)", transformOrigin:"center", fontSize:11, fontWeight:700, fill:C.text, fontFamily:FF.b }}>{value}</text>
    </svg>
  );
}

function HBar({ value, max = 5, color = C.verde, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 8, background: C.grisCl, borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: `${(value/max)*100}%`, height: "100%", background: color, borderRadius: 4, transition: "width 0.8s cubic-bezier(.4,0,.2,1)" }} />
      </div>
      {label && <span style={{ fontSize: 11, color: C.gris, minWidth: 32, fontFamily: FF.b, fontWeight: 600 }}>{label}</span>}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Data
   ═══════════════════════════════════════════════ */
const COMPARE = [
  { c:"Alemania", f:"🇩🇪", t:"Avanzado", tc:C.verde, gov:5, reg:4, pol:5, inf:5, mx:"Secuenciación: ancla estratégica → coordinación → instrumentos de mercado" },
  { c:"Países Bajos", f:"🇳🇱", t:"Avanzado", tc:C.verde, gov:5, reg:4, pol:4, inf:5, mx:"Clusters conectados a puertos (Veracruz, Tamaulipas)" },
  { c:"Reino Unido", f:"🇬🇧", t:"Avanzado", tc:C.verde, gov:5, reg:4, pol:5, inf:4, mx:"Rondas de asignación competitivas al escalar" },
  { c:"Japón", f:"🇯🇵", t:"Madurez Media", tc:C.dorado, gov:5, reg:4, pol:4, inf:4, mx:"Cooperación internacional para exportar H₂" },
  { c:"Australia", f:"🇦🇺", t:"Madurez Media", tc:C.dorado, gov:3, reg:3, pol:4, inf:4, mx:"Hubs en regiones con sol/viento + acceso portuario" },
  { c:"Corea del Sur", f:"🇰🇷", t:"Madurez Media", tc:C.dorado, gov:5, reg:5, pol:4, inf:4, mx:"Garantizar offtake, no solo subsidiar producción" },
  { c:"China", f:"🇨🇳", t:"Madurez Media", tc:C.dorado, gov:4, reg:3, pol:3, inf:4, mx:"Integrar H₂ en refinación, químicos y acero" },
  { c:"India", f:"🇮🇳", t:"Emergente", tc:C.guinda, gov:3, reg:3, pol:3, inf:2, mx:"Mandatos de demanda en PEMEX y fertilizantes" },
  { c:"Chile", f:"🇨🇱", t:"Emergente", tc:C.guinda, gov:3, reg:3, pol:2, inf:3, mx:"Sin CfDs los proyectos se estancan" },
  { c:"Colombia", f:"🇨🇴", t:"Par", tc:C.gris, gov:2, reg:2, pol:2, inf:1, mx:"Sandbox regulatorio como modelo transitorio" },
  { c:"Perú", f:"🇵🇪", t:"Par", tc:C.gris, gov:1, reg:1, pol:1, inf:1, mx:"Ejemplo a evitar: sin instituciones, nada avanza" },
];

const GROUPS = [
  { g:"Avanzados", sub:"Alemania, Países Bajos, UK", gov:5, reg:4, pol:4.7, inf:4.7, c:C.verde },
  { g:"Madurez Media", sub:"Japón, Australia, Corea, China", gov:4.3, reg:3.8, pol:3.8, inf:4, c:C.dorado },
  { g:"Emergentes", sub:"India, Chile", gov:3, reg:3, pol:2.5, inf:2.5, c:C.guinda },
  { g:"Pares de México", sub:"Colombia, Perú", gov:1.5, reg:1.5, pol:1.5, inf:1, c:C.gris },
];

const PATTERNS = [
  { t:"Las instituciones fuertes son el diferenciador #1", txt:"Alemania, UK y Corea del Sur coordinan ministerios de forma formal y estructurada. SENER necesita un mecanismo de coordinación con SEMARNAT, CONAGUA, CRE y CENACE que tenga mandatos claros, no reuniones informales.", c:C.verde },
  { t:"Nadie escala solo con subsidios", txt:"Los incentivos fiscales sirven para pilotos, no para escalar. Los países que avanzan introducen contratos que garantizan ingresos a productores de H₂ (como H2Global en Alemania o HPBM en UK).", c:C.guinda },
  { t:"La demanda es tan importante como la oferta", txt:"India y Corea obligan a ciertos sectores industriales a consumir H₂ verde. Si México hiciera lo mismo en refinación y fertilizantes, crearía un mercado doméstico real.", c:C.dorado },
  { t:"Sin infraestructura compartida, todo cuesta más", txt:"Países Bajos y Australia planifican puertos, ductos y hubs desde el inicio. Si cada proyecto mexicano resuelve su propia logística, los costos se disparan.", c:C.verde },
];

const TIMELINE = [
  { phase:"Inmediato (2026)", c:C.guinda, items:[
    { t:"Emitir el Plan Nacional de Hidrógeno Renovable", d:"Como documento institucional vinculante que ordene responsabilidades de cada entidad federal. Es el ancla de todo lo demás. Así lo hizo Alemania con su Estrategia Nacional." },
    { t:"Crear mecanismo de coordinación interministerial formal", d:"SENER como cabeza, con SEMARNAT, CONAGUA, ASEA, CRE y CENACE con mandatos claros. Alemania y UK tienen coordinación formal que funciona." },
    { t:"Definir qué es 'hidrógeno verde' en México", d:"Umbrales de emisiones, reglas sobre electricidad renovable y metodología de contabilidad. Sin definición, no hay apoyos ni certificación. La UE e India lo hicieron temprano." }
  ]},
  { phase:"Corto plazo (2026–2027)", c:C.dorado, items:[
    { t:"Diseñar incentivos fiscales para pilotos", d:"Exenciones, depreciación acelerada y co-financiamiento para primeros proyectos. Son instrumentos de entrada necesarios para que alguien dé el primer paso." },
    { t:"Adaptar el marco regulatorio existente", d:"Ajustar la Ley de Hidrocarburos, la Ley de la Industria Eléctrica y regulación ambiental. El 80% de los países evaluados empezaron adaptando leyes existentes." },
    { t:"Lanzar pilotos en 2-3 clusters estratégicos", d:"Donde confluyan sol/viento, industria y logística: Sonora-Baja California, Nuevo León-Tamaulipas, Veracruz. Australia y Países Bajos planifican por hubs." }
  ]},
  { phase:"Mediano plazo (2027–2029)", c:C.verde, items:[
    { t:"Introducir contratos de soporte de ingresos (CfD)", d:"El instrumento que separa países que escalan de los que se quedan en pilotos. Sin esto, ningún banco financia. Referencia: H2Global (Alemania) y HPBM (UK)." },
    { t:"Establecer mandatos de consumo de H₂ verde", d:"Un porcentaje del hidrógeno en refinación, fertilizantes y químicos debe ser verde. Crea demanda real. India y Corea del Sur ya lo hacen." },
    { t:"Esquema de certificación nacional", d:"Alineado con RFNBO y Garantías de Origen para que el H₂ mexicano compita en exportación. Australia diseña su certificación para mercados asiáticos." },
    { t:"Planificar infraestructura compartida", d:"Ductos, puertos y hubs para múltiples proyectos. El backbone holandés de hidrógeno es el modelo más avanzado del mundo." }
  ]}
];

/* ═══════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════ */
export default function App() {
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState("comparativo");
  const { exportRef, h2cLoaded } = useExportPNG();

  const refTable = useRef(null);
  const refBars = useRef(null);
  const refPatterns = useRef(null);
  const refTimeline = useRef(null);
  const refSummary = useRef(null);

  useEffect(() => { setTimeout(() => setReady(true), 100); }, []);

  return (
    <div style={{ fontFamily: FF.b, background: C.bg, color: C.text, minHeight: "100vh", lineHeight: 1.65 }}>
      <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,400&family=Noto+Sans:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        ::selection{background:rgba(155,34,71,0.15)}
        @media print{.no-print{display:none!important}}
        button:focus-visible{outline:2px solid ${C.guinda};outline-offset:2px}
      `}</style>

      {/* ═══ HEADER BAR (GobMX style) ═══ */}
      <div style={{ background: C.guinda, height: 5 }} />
      <header style={{
        background: C.bg, borderBottom: `1px solid ${C.border}`, padding: "24px 28px 20px",
        opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(-10px)",
        transition: "all 0.6s cubic-bezier(.16,1,.3,1)"
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: C.gris, marginBottom: 8, fontWeight: 600 }}>
                Nota Informativa · Secretaría de Energía
              </div>
              <h1 style={{ fontFamily: FF.h, fontSize: "clamp(22px,3.2vw,34px)", fontWeight: 700, lineHeight: 1.15, color: C.guinda, maxWidth: 620, letterSpacing: "-0.01em" }}>
                México ante el hidrógeno verde: qué hacen otros países y qué nos toca hacer
              </h1>
            </div>
            <div style={{ textAlign: "right", fontSize: 11, color: C.gris, lineHeight: 1.6, flexShrink: 0 }}>
              <div style={{ fontWeight: 600 }}>Febrero 2026</div>
              <div>GCIEP / UK FCDO</div>
              <div style={{ marginTop: 6, padding: "3px 10px", border: `1px solid ${C.guinda}40`, color: C.guinda, borderRadius: 4, fontSize: 10, letterSpacing: 1, fontWeight: 600 }}>ENTREGABLE D2</div>
            </div>
          </div>
        </div>
      </header>

      {/* ═══ CONTENT ═══ */}
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "28px 28px 72px" }}>

        {/* ── RESUMEN EJECUTIVO ── */}
        <section style={{ animation: "fadeUp 0.6s ease", marginBottom: 40 }} ref={refSummary}>
          <h2 style={{ fontFamily: FF.h, fontSize: 22, fontWeight: 700, color: C.guinda, marginBottom: 14, paddingBottom: 8, borderBottom: `2px solid ${C.guinda}` }}>
            Resumen Ejecutivo
          </h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.75, marginBottom: 14 }}>
            Se analizaron <strong>11 países</strong> para entender cómo han logrado (o no) desarrollar mercados de hidrógeno verde. La conclusión es clara: <strong>no existe un instrumento mágico</strong>. Lo que distingue a los países exitosos es cómo combinan y ordenan en el tiempo tres cosas: instituciones fuertes, reglas claras y apoyos que evolucionan.
          </p>
          <p style={{ fontSize: 15.5, lineHeight: 1.75, marginBottom: 14 }}>
            México tiene ventajas reales — sol, viento, industria que ya usa hidrógeno — pero hoy <strong>ningún proyecto ha llegado a decisión de inversión</strong>. Los Lineamientos de 2024 fueron un primer paso. Ahora viene lo más importante: el andamiaje institucional y regulatorio que convierta intención en inversión.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 12, marginTop: 22 }}>
            {[
              { n: "11", l: "países evaluados", c: C.verde },
              { n: "3", l: "dimensiones de análisis", c: C.dorado },
              { n: "390k+", l: "t H₂/año potencial MX", c: C.guinda },
              { n: "0", l: "proyectos con inversión firme", c: "#C03030" }
            ].map((d, i) => (
              <div key={i} style={{
                background: C.surface, borderRadius: 8, padding: "16px 14px",
                borderBottom: `3px solid ${d.c}`,
                opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(12px)",
                transition: `all 0.5s ease ${0.1 + i * 0.07}s`
              }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: d.c, lineHeight: 1 }}>{d.n}</div>
                <div style={{ fontSize: 12, fontWeight: 500, color: C.gris, marginTop: 4 }}>{d.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── HALLAZGO CENTRAL ── */}
        <section style={{ animation: "fadeUp 0.6s ease 0.08s both", marginBottom: 40 }}>
          <div style={{ background: C.verde, color: "#fff", borderRadius: 8, padding: "24px 26px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -50, right: -50, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
            <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8, color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>Hallazgo central del estudio</div>
            <p style={{ fontFamily: FF.h, fontSize: 17, lineHeight: 1.7, fontWeight: 400, position: "relative", zIndex: 1 }}>
              Lo que separa a los países que avanzan de los que se quedan en anuncios no es un instrumento en particular, sino <em>cómo ordenan en el tiempo</em> su gobernanza, regulación y apoyos. Primero instituciones claras, luego reglas suficientes, después instrumentos financieros que crecen con el mercado.
            </p>
          </div>
        </section>

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.border}, transparent)`, margin: "0 0 32px" }} />

        {/* ── TABS ── */}
        <div className="no-print" style={{ display: "flex", gap: 0, marginBottom: 24, borderBottom: `2px solid ${C.grisCl}` }}>
          {[["comparativo", "Comparativo de Países"], ["implementacion", "Implementación en México"]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              style={{
                fontFamily: FF.b, fontSize: 13, fontWeight: tab === id ? 700 : 500,
                color: tab === id ? C.guinda : C.gris,
                background: "none", border: "none", padding: "10px 20px", cursor: "pointer",
                borderBottom: tab === id ? `3px solid ${C.guinda}` : "3px solid transparent",
                marginBottom: -2, transition: "all 0.2s"
              }}>{label}</button>
          ))}
        </div>

        {/* ═══════ COMPARATIVO ═══════ */}
        {tab === "comparativo" && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>

            <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#555", marginBottom: 22 }}>
              Cada país fue evaluado en cuatro ejes: gobernanza, regulación, política e infraestructura. La escala va de 1 (incipiente) a 5 (avanzado). La última columna traduce la experiencia de cada país en una acción concreta para SENER.
            </p>

            {/* TABLE */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
              <ExportBtn onClick={() => exportRef(refTable, "comparativo_paises")} loaded={h2cLoaded} />
            </div>
            <div ref={refTable} style={{ background: "#fff", borderRadius: 8, padding: "20px 16px", border: `1px solid ${C.border}`, overflowX: "auto" }}>
              <div style={{ fontFamily: FF.h, fontSize: 14, fontWeight: 700, color: C.guinda, marginBottom: 14 }}>Evaluación comparativa: 11 países de referencia</div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${C.guinda}` }}>
                    {["País", "Nivel", "Gob.", "Reg.", "Pol.", "Infra.", "Relevancia para México"].map((h, i) => (
                      <th key={i} style={{ textAlign: "left", padding: "8px 8px", fontWeight: 700, color: C.guinda, fontSize: 10, letterSpacing: 0.5, textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map((r, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${C.grisCl}`, background: i % 2 === 0 ? C.surface : "#fff" }}>
                      <td style={{ padding: "9px 8px", fontWeight: 600, fontSize: 12.5, whiteSpace: "nowrap" }}>{r.f} {r.c}</td>
                      <td style={{ padding: "9px 8px" }}>
                        <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 10, background: r.tc + "14", color: r.tc, border: `1px solid ${r.tc}30` }}>{r.t}</span>
                      </td>
                      {[r.gov, r.reg, r.pol, r.inf].map((v, j) => (
                        <td key={j} style={{ padding: "9px 8px" }}><ScoreCircle value={v} color={r.tc} size={32} /></td>
                      ))}
                      <td style={{ padding: "9px 8px", fontSize: 11.5, color: "#555", lineHeight: 1.4, maxWidth: 220 }}>{r.mx}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* BARS */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 28, marginBottom: 8 }}>
              <ExportBtn onClick={() => exportRef(refBars, "fortaleza_por_grupo")} loaded={h2cLoaded} />
            </div>
            <div ref={refBars} style={{ background: "#fff", borderRadius: 8, padding: "22px 20px", border: `1px solid ${C.border}` }}>
              <div style={{ fontFamily: FF.h, fontSize: 14, fontWeight: 700, color: C.guinda, marginBottom: 16 }}>Fortaleza promedio por grupo de países</div>
              {GROUPS.map((g, i) => (
                <div key={i} style={{ marginBottom: 18 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: g.c, marginBottom: 2 }}>{g.g}</div>
                  <div style={{ fontSize: 11, color: C.gris, marginBottom: 8 }}>{g.sub}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "4px 10px", alignItems: "center" }}>
                    {[["Gobernanza", g.gov], ["Regulación", g.reg], ["Política", g.pol], ["Infraestr.", g.inf]].map(([l, v], j) => (
                      <React.Fragment key={j}>
                        <span style={{ fontSize: 11, color: "#777" }}>{l}</span>
                        <HBar value={v} color={g.c} label={v.toFixed(1)} />
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* PATTERNS */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 28, marginBottom: 8 }}>
              <ExportBtn onClick={() => exportRef(refPatterns, "patrones_clave")} loaded={h2cLoaded} />
            </div>
            <div ref={refPatterns} style={{ background: "#fff", borderRadius: 8, padding: "22px 20px", border: `1px solid ${C.border}` }}>
              <h3 style={{ fontFamily: FF.h, fontSize: 16, fontWeight: 700, color: C.verde, marginBottom: 16 }}>Patrones clave de la comparación</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 14 }}>
                {PATTERNS.map((p, i) => (
                  <div key={i} style={{ background: C.surface, borderRadius: 8, padding: "18px 16px", borderLeft: `4px solid ${p.c}` }}>
                    <h4 style={{ fontFamily: FF.h, fontSize: 14, fontWeight: 700, color: p.c, marginBottom: 6 }}>{p.t}</h4>
                    <p style={{ fontSize: 13, lineHeight: 1.6, color: "#555" }}>{p.txt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══════ IMPLEMENTACIÓN ═══════ */}
        {tab === "implementacion" && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#555", marginBottom: 6 }}>
              Basado en la experiencia internacional, estas son las acciones que SENER debería considerar, ordenadas por prioridad. No se trata de copiar modelos, sino de adaptar lo que funciona a la realidad mexicana.
            </p>
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: C.gris, marginBottom: 26, fontStyle: "italic" }}>
              Principio rector: primero lo institucional, después lo regulatorio, y los instrumentos financieros crecen conforme madura el mercado.
            </p>

            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
              <ExportBtn onClick={() => exportRef(refTimeline, "ruta_implementacion_mexico")} loaded={h2cLoaded} />
            </div>
            <div ref={refTimeline} style={{ background: "#fff", borderRadius: 8, padding: "26px 22px 26px 48px", border: `1px solid ${C.border}`, position: "relative" }}>
              <div style={{ fontFamily: FF.h, fontSize: 16, fontWeight: 700, color: C.guinda, marginBottom: 22 }}>Ruta de implementación para SENER</div>

              {/* Vertical line */}
              <div style={{ position: "absolute", left: 32, top: 68, bottom: 30, width: 2, background: `linear-gradient(to bottom, ${C.guinda}, ${C.dorado}, ${C.verde})`, borderRadius: 1 }} />

              {TIMELINE.map((ph, pi) => (
                <div key={pi} style={{ marginBottom: 32 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, position: "relative" }}>
                    <div style={{ position: "absolute", left: -24, width: 16, height: 16, borderRadius: "50%", background: ph.c, border: "3px solid #fff", boxShadow: `0 0 0 2px ${ph.c}40` }} />
                    <h3 style={{ fontFamily: FF.h, fontSize: 15, fontWeight: 700, color: ph.c }}>{ph.phase}</h3>
                  </div>
                  <div style={{ display: "grid", gap: 10 }}>
                    {ph.items.map((it, ii) => (
                      <div key={ii} style={{ background: C.surface, borderRadius: 6, padding: "16px 16px", borderLeft: `3px solid ${ph.c}` }}>
                        <h4 style={{ fontFamily: FF.h, fontSize: 13.5, fontWeight: 700, color: C.text, marginBottom: 5 }}>{it.t}</h4>
                        <p style={{ fontSize: 13, lineHeight: 1.6, color: "#555" }}>{it.d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Warning */}
            <div style={{ background: C.doradoLt, border: `1px solid ${C.dorado}40`, borderRadius: 8, padding: "20px 20px", marginTop: 24 }}>
              <h3 style={{ fontFamily: FF.h, fontSize: 14, fontWeight: 700, color: C.dorado, marginBottom: 6 }}>⚠️ Lo que pasa cuando no se actúa</h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.65, color: "#6b5530" }}>
                Perú publicó una hoja de ruta pero no la acompañó con instituciones ni instrumentos. Resultado: cero avance. Colombia avanzó con sandboxes regulatorios, pero sin mecanismos de soporte, sus proyectos no escalan. <strong>México tiene mejores condiciones que ambos, pero la ventana no es permanente.</strong>
              </p>
            </div>
          </div>
        )}

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.border}, transparent)`, margin: "36px 0 32px" }} />

        {/* ── EN SÍNTESIS ── */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: FF.h, fontSize: 20, fontWeight: 700, color: C.guinda, marginBottom: 14, paddingBottom: 8, borderBottom: `2px solid ${C.guinda}` }}>En síntesis</h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 14 }}>
            La experiencia internacional muestra que el hidrógeno verde no avanza con un solo programa ni con una sola ley. <strong>Avanza cuando hay un sistema coherente</strong> donde las instituciones saben qué les toca, la regulación da certeza suficiente para invertir y los apoyos evolucionan con el mercado.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 14 }}>
            México tiene la materia prima: sol, viento, industria que ya consume hidrógeno y ubicación estratégica. Lo que falta es el <strong>andamiaje institucional</strong>. El Plan Nacional de Hidrógeno Renovable es la oportunidad para construirlo.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75 }}>
            La siguiente fase del programa GCIEP analizará en detalle el marco existente y acompañará a SENER en el diseño del esquema de gobernanza para hidrógeno verde.
          </p>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ fontSize: 11, color: C.gris, textAlign: "center", padding: "18px 0", borderTop: `1px solid ${C.border}` }}>
          <div>Basado en: GCIEP Deliverable D2 — International Benchmarking Assessment (Enero 2026)</div>
          <div style={{ marginTop: 3 }}>Preparado por PwC, Mott MacDonald y aliados · Financiado por UK FCDO</div>
          <div style={{ marginTop: 3, color: C.guinda, fontWeight: 600 }}>Secretaría de Energía · Gobierno de México</div>
        </footer>
      </main>
    </div>
  );
}
