import { useState, useEffect, useRef, useCallback } from "react";

const C = {
  guinda: "#9B2247", verde: "#1E5B4F", dorado: "#A57F2C", gris: "#98989A",
  grisCl: "#E5E5E5", guindaLt: "rgba(155,34,71,0.05)", verdeLt: "rgba(30,91,79,0.06)",
  doradoLt: "rgba(165,127,44,0.06)", text: "#333", bg: "#FFF", surface: "#F8F9FA", border: "#DDD",
};
const FF = { h: "'Merriweather','Georgia',serif", b: "'Noto Sans',sans-serif" };

function useExport() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (window.html2canvas) { setOk(true); return; }
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
    s.onload = () => setOk(true); document.head.appendChild(s);
  }, []);
  const go = useCallback(async (ref, name) => {
    if (!ref.current || !window.html2canvas) return;
    const cv = await window.html2canvas(ref.current, { backgroundColor: "#fff", scale: 3, useCORS: true, logging: false });
    const a = document.createElement("a"); a.download = `${name}.png`; a.href = cv.toDataURL("image/png"); a.click();
  }, []);
  return { go, ok };
}

function DL({ onClick, ok }) {
  return (
    <button onClick={onClick} disabled={!ok} style={{
      fontFamily: FF.b, fontSize: 10.5, fontWeight: 600, background: ok ? C.verde : C.grisCl,
      color: ok ? "#fff" : C.gris, border: "none", borderRadius: 4, padding: "5px 12px",
      cursor: ok ? "pointer" : "default", display: "inline-flex", alignItems: "center", gap: 4,
    }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
      </svg>PNG
    </button>
  );
}

function HBar({ value, max = 5, color = C.verde, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ flex: 1, height: 7, background: C.grisCl, borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: color, borderRadius: 4, transition: "width 0.7s ease" }} />
      </div>
      {label && <span style={{ fontSize: 10.5, color: C.gris, minWidth: 32, fontFamily: FF.b }}>{label}</span>}
    </div>
  );
}

const NAV = [
  { id: "reto", label: "El Reto", icon: "💡" },
  { id: "instrumentos", label: "3 Instrumentos", icon: "🔧" },
  { id: "internacional", label: "Internacional", icon: "🌍" },
  { id: "mexico", label: "Propuesta México", icon: "🇲🇽" },
  { id: "preguntas", label: "Preguntas", icon: "❓" },
];

const INSTRUMENTS = [
  {
    title: "Modelo de Asociación de Desarrollo Mixto",
    subtitle: "Inversión público-privada para compartir riesgo",
    color: C.guinda, icon: "🤝",
    what: "Un esquema donde el sector público y el privado co-invierten en proyectos de H₂ verde, compartiendo tanto el riesgo como el retorno. El gobierno aporta capital, garantías o activos (ej. terrenos, infraestructura), y el privado aporta tecnología, gestión y capital complementario. No es privatización ni subsidio puro: es co-desarrollo con reglas claras.",
    how: [
      "Gobierno aporta: capital semilla, garantías parciales de crédito, terrenos en clusters estratégicos, infraestructura compartida (red eléctrica, agua, acceso portuario)",
      "Sector privado aporta: tecnología de electrólisis, gestión de proyecto, capital de equity, offtake comercial",
      "Estructura: SPV (vehículo de propósito especial) con participación mixta, gobernanza independiente y horizonte de salida definido",
      "Selección competitiva: los proyectos se seleccionan mediante licitación con criterios de viabilidad, impacto y compromiso de inversión",
      "Retorno social: generación de empleo, reducción de emisiones, desarrollo tecnológico local, aprendizaje institucional",
    ],
    intlRef: "Alemania usa KfW (banco público de desarrollo) como co-inversor y garante. Australia combina fondos de ARENA + CEFC (corporación financiera de energía limpia) con capital privado en hubs. India estructura SIGHT con componentes de co-financiamiento público-privado. El Banco Mundial promueve blended finance para H₂ en economías en desarrollo.",
    risks: ["Complejidad de gobernanza del SPV", "Riesgo de captura por intereses privados", "Necesidad de capacidad técnica en el sector público para negociar"],
  },
  {
    title: "Apoyos a CAPEX (Subsidios y Grants)",
    subtitle: "Reducir el costo de entrada del primer proyecto",
    color: C.verde, icon: "💰",
    what: "Subsidios directos o grants que cubren un porcentaje del costo de capital (CAPEX) de los primeros proyectos de H₂ verde. Reducen la barrera de entrada al disminuir la inversión inicial necesaria. Son la herramienta más común en la etapa temprana: todos los países que avanzan empezaron con alguna forma de apoyo CAPEX.",
    how: [
      "Definir porcentaje de co-financiamiento: típicamente 20-40% del CAPEX total para proyectos FOAK (first-of-a-kind)",
      "Asignar vía convocatoria competitiva: los proyectos compiten por fondos limitados con criterios de mérito técnico, viabilidad financiera y ubicación estratégica",
      "Condicionar el desembolso a hitos: diseño aprobado, FID, inicio de construcción, puesta en operación",
      "Vincular a certificación: solo proyectos que demuestren producción de H₂ verde certificado reciben desembolsos finales",
      "Limitar en el tiempo: los apoyos CAPEX son para la primera generación de proyectos, no permanentes",
    ],
    intlRef: "ARENA (Australia) financia hubs con grants competitivos. CORFO (Chile) opera co-financiamiento CAPEX para pilotos FOAK. UK Net Zero Hydrogen Fund (NZHF) otorga grants para desarrollo y construcción. India SIGHT subsidia tanto producción de electrolizadores como de H₂. Alemania co-financia vía IPCEI (Proyectos Importantes de Interés Común Europeo).",
    risks: ["Riesgo de financiar proyectos que no llegan a operación", "Carga fiscal si no se acota el presupuesto", "Puede generar dependencia si no se complementa con instrumentos de mercado"],
  },
  {
    title: "Incentivos Ligados a la Producción",
    subtitle: "Pagar por cada kg de H₂ verde producido, no por el activo instalado",
    color: C.dorado, icon: "⚡",
    what: "A diferencia de los apoyos CAPEX (que pagan por construir), los incentivos a la producción pagan por producir. El productor recibe un monto por cada kg de H₂ verde efectivamente generado. Esto alinea el incentivo con el resultado: solo se cobra si se produce. Pueden tomar forma de créditos fiscales por producción (PTC), contratos CfD o pagos por diferencia de precio.",
    how: [
      "Crédito fiscal por producción (PTC): el productor recibe un crédito fiscal por cada kg de H₂ producido durante un período definido (ej. 10 años). Modelo: US IRA Section 45V",
      "Contratos por Diferencia (CfD): el gobierno paga la diferencia entre el costo de producción y el precio de mercado. Modelo: H2Global (Alemania), HPBM (UK)",
      "Pagos por producción directos: subsidio operativo por kg producido durante un período de arranque. Modelo: Hydrogen Headstart (Australia)",
      "Todos se asignan vía subasta competitiva: los productores compiten por el menor subsidio necesario, maximizando eficiencia del gasto público",
      "Se vinculan a certificación: solo producción certificada como verde recibe el incentivo",
    ],
    intlRef: "EE.UU. (IRA §45V): hasta $3/kg H₂ según intensidad de carbono — el incentivo más generoso del mundo. Alemania H2Global: CfD competitivos que absorben diferencia de precio. UK HPBM: contratos estandarizados de 15 años vía Hydrogen Allocation Rounds. Australia Hydrogen Headstart: soporte de ingresos para proyectos de escala. India SIGHT: incentivos por kg producido en primeros 3 años.",
    risks: ["Carga fiscal de largo plazo si el gap de precio no se cierra", "Complejidad de diseño del mecanismo CfD", "Riesgo de sobrecompensación si los costos bajan más rápido de lo esperado"],
  },
];

const INTL = [
  { c: "EE.UU.", f: "🇺🇸", ppp: 3, capex: 4, prod: 5, tc: C.dorado, note: "IRA §45V: hasta $3/kg por 10 años. Hubs DOE con co-inversión federal-estatal-privada. El incentivo a producción más potente del mundo." },
  { c: "Alemania", f: "🇩🇪", ppp: 5, capex: 5, prod: 5, tc: C.verde, note: "KfW como co-inversor público. IPCEI para CAPEX. H2Global CfD para producción. El paquete más completo." },
  { c: "Reino Unido", f: "🇬🇧", ppp: 4, capex: 4, prod: 5, tc: C.verde, note: "NZHF grants + HPBM contratos de 15 años. Modelo de clusters con inversión pública en infraestructura compartida." },
  { c: "Australia", f: "🇦🇺", ppp: 4, capex: 5, prod: 4, tc: C.dorado, note: "ARENA grants + CEFC financiamiento + Hydrogen Headstart para soporte de ingresos. Co-inversión federal-estatal." },
  { c: "India", f: "🇮🇳", ppp: 3, capex: 4, prod: 3, tc: C.guinda, note: "SIGHT: subsidio a electrolizadores y a producción. Mandatos de demanda como complemento. Banco Mundial como co-financiador." },
  { c: "Chile", f: "🇨🇱", ppp: 2, capex: 3, prod: 1, tc: C.guinda, note: "CORFO: co-financiamiento CAPEX para pilotos. Sin CfDs ni incentivos a producción — proyectos se estancan." },
  { c: "Corea del Sur", f: "🇰🇷", ppp: 4, capex: 3, prod: 4, tc: C.dorado, note: "KEPCO/KOGAS como socios públicos. CHPS como mecanismo de demanda garantizada en sector eléctrico." },
  { c: "Colombia", f: "🇨🇴", ppp: 1, capex: 1, prod: 1, tc: C.gris, note: "Incentivos fiscales generales. Pilotos con Ecopetrol. Sin CAPEX dedicado ni incentivos a producción." },
  { c: "México", f: "🇲🇽", ppp: 0, capex: 0, prod: 0, tc: C.gris, note: "Sin instrumentos dedicados. Sin co-inversión pública, sin grants, sin incentivos a producción. Todo por diseñar." },
];

const TIMELINE = [
  { phase: "Inmediato (2026)", c: C.guinda, items: [
    { t: "Diseñar el marco conceptual de asociación público-privada para H₂", d: "Definir qué aporta el gobierno (terrenos, infraestructura, garantías) y qué aporta el privado (tecnología, capital, gestión). Estructurar modelo de SPV con gobernanza independiente. Referencia: KfW (Alemania), ARENA+CEFC (Australia)." },
    { t: "Identificar fuentes de financiamiento para CAPEX grants", d: "Mapear opciones: presupuesto federal (PEF), banca de desarrollo (NAFIN, BANOBRAS), cooperación internacional (BID, Banco Mundial, KfW, UK FCDO), fondo verde climático. Cuantificar necesidad para 3-5 proyectos piloto." },
    { t: "Estudiar viabilidad de incentivos fiscales para producción", d: "Analizar si es factible un crédito fiscal tipo PTC dentro del marco fiscal mexicano. Evaluar alternativas: exención de ISR por producción de H₂ verde, depreciación acelerada de electrolizadores, IVA cero a H₂ certificado." },
  ]},
  { phase: "Corto plazo (2026–2027)", c: C.dorado, items: [
    { t: "Lanzar primera convocatoria de CAPEX grants", d: "Convocatoria competitiva para 3-5 proyectos piloto en clusters estratégicos. Co-financiamiento del 30-40% del CAPEX. Desembolso condicionado a hitos (FID, construcción, operación). Vinculado a certificación." },
    { t: "Estructurar 1-2 proyectos piloto de asociación mixta", d: "En clusters prioritarios (Sonora, Nuevo León, Veracruz), co-desarrollar con sector privado. Gobierno aporta terreno + conexión eléctrica + permiso simplificado (sandbox). Privado aporta electrolizador + gestión + offtake." },
    { t: "Implementar incentivos fiscales de primera generación", d: "Exención de ISR por 5 años para ingresos derivados de venta de H₂ verde certificado. Depreciación acelerada al 100% en primer año para electrolizadores. Tasa cero de IVA para H₂ verde destinado a uso industrial." },
    { t: "Negociar co-financiamiento con banca multilateral", d: "Presentar pipeline de proyectos a BID, Banco Mundial, KfW y FCDO para obtener blended finance que complemente recursos públicos mexicanos." },
  ]},
  { phase: "Mediano plazo (2027–2029)", c: C.verde, items: [
    { t: "Diseñar e implementar mecanismo CfD mexicano", d: "Basado en lecciones de pilotos, crear contratos por diferencia donde el gobierno paga la brecha entre costo de producción y precio de mercado. Asignación vía subasta competitiva. Contratos de 10-15 años. Este es el instrumento que convierte pilotos en inversión a escala." },
    { t: "Escalar de pilotos a primera generación comercial", d: "Con CAPEX grants + CfD + asociación mixta operando, los primeros proyectos alcanzan FID. Meta: 2-3 proyectos en construcción para 2029." },
    { t: "Evaluar y ajustar instrumentos", d: "Revisar desempeño de grants (¿los proyectos operan?), incentivos fiscales (¿atrajeron inversión?) y CfDs (¿el gap de precio se está cerrando?). Ajustar montos, plazos y condiciones con base en datos reales." },
    { t: "Transitar de incentivos a la producción hacia señales de mercado", d: "Conforme los costos bajan y el mercado madura, reducir gradualmente subsidios e introducir mandatos de consumo y mercados de certificados. El objetivo es que el H₂ verde sea competitivo sin apoyo permanente." },
  ]},
];

const QUESTIONS = [
  { cat: "Asociación Público-Privada", c: C.guinda, qs: [
    "¿Qué entidad pública lideraría las asociaciones: SENER, NAFIN, BANOBRAS, un fondo dedicado?",
    "¿Qué activos puede aportar el gobierno (terrenos federales, infraestructura CFE/CENAGAS, garantías)?",
    "¿Cómo se estructura la gobernanza del SPV para evitar conflictos de interés?",
    "¿Qué marco legal aplica: Ley de Asociaciones Público-Privadas, concesiones, contratos de servicios?",
    "¿Cómo se define el horizonte de salida del gobierno una vez el proyecto es viable?",
  ]},
  { cat: "Apoyos a CAPEX", c: C.verde, qs: [
    "¿De dónde salen los recursos: PEF, banca de desarrollo, cooperación internacional, o mezcla?",
    "¿Cuánto CAPEX se necesita para los primeros 3-5 proyectos piloto?",
    "¿Qué porcentaje de co-financiamiento es competitivo internacionalmente (30%? 40%? 50%)?",
    "¿La certificación de H₂ verde es condición para acceder al CAPEX?",
    "¿Cómo se evita financiar proyectos que no llegan a operación (mecanismo de clawback)?",
  ]},
  { cat: "Incentivos a la Producción", c: C.dorado, qs: [
    "¿Es factible un crédito fiscal tipo PTC en el sistema tributario mexicano? ¿Requiere reforma?",
    "¿Cuál sería el monto por kg de H₂ producido que haga viable los primeros proyectos?",
    "¿Se puede diseñar un CfD mexicano sin crear una entidad contraparte (tipo LCCC en UK)?",
    "¿Los incentivos a producción se aplican solo a H₂ verde o también a derivados (amoniaco, metanol)?",
    "¿Cómo se financia el CfD a largo plazo: presupuesto, sobretasa al H₂ fósil, fondo dedicado?",
  ]},
  { cat: "Secuenciación y Complementariedad", c: "#666", qs: [
    "¿Se lanzan los 3 instrumentos al mismo tiempo o se secuencian (CAPEX primero, luego CfD)?",
    "¿Cómo se evita la doble subsidización (un proyecto con grant + CfD + exención fiscal)?",
    "¿Los mandatos de demanda (PEMEX, fertilizantes) son complemento o sustituto de los CfDs?",
    "¿Cuál es la duración máxima de los apoyos antes de esperar competitividad de mercado?",
    "¿Cómo se integran estos instrumentos con la certificación y el sistema de permisos?",
  ]},
  { cat: "Gobernanza y Rendición de Cuentas", c: C.guinda, qs: [
    "¿Quién administra las convocatorias de CAPEX: SENER, CONACYT, un fondo especial?",
    "¿Cómo se auditan los desembolsos y se mide el impacto?",
    "¿Se publican los resultados de cada proyecto financiado con recursos públicos?",
    "¿Cómo se previene la captura de los instrumentos por un grupo reducido de empresas?",
    "¿Qué mecanismos de transparencia y participación ciudadana se incorporan?",
  ]},
];

const crd = { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px 18px" };

export default function App() {
  const [ready, setReady] = useState(false);
  const [sec, setSec] = useState("reto");
  const { go, ok } = useExport();
  const refs = { reto: useRef(null), inst: useRef(null), intl: useRef(null), mx: useRef(null), qs: useRef(null) };
  useEffect(() => { setTimeout(() => setReady(true), 100); }, []);

  return (
    <div style={{ fontFamily: FF.b, background: C.bg, color: C.text, minHeight: "100vh", lineHeight: 1.65 }}>
      <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,400&family=Noto+Sans:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px) } to { opacity:1; transform:translateY(0) } }
        ::selection { background: rgba(155,34,71,0.15); }
        @media print { .no-print { display: none !important; } }
      `}</style>

      <div style={{ background: C.guinda, height: 5 }} />

      <header style={{ background: C.bg, borderBottom: `1px solid ${C.border}`, padding: "22px 24px 18px", opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(-10px)", transition: "all 0.6s ease" }}>
        <div style={{ maxWidth: 940, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: C.gris, marginBottom: 8, fontWeight: 600 }}>Propuesta de Análisis · Secretaría de Energía</div>
              <h1 style={{ fontFamily: FF.h, fontSize: "clamp(20px,3vw,30px)", fontWeight: 700, lineHeight: 1.18, color: C.guinda, maxWidth: 700 }}>
                Apoyar la Producción Temprana de Hidrógeno Verde
              </h1>
              <p style={{ fontSize: 14, color: C.gris, marginTop: 6, fontStyle: "italic", maxWidth: 660 }}>
                Asociación público-privada, apoyos a CAPEX e incentivos ligados a la producción
              </p>
            </div>
            <div style={{ textAlign: "right", fontSize: 11, color: C.gris, lineHeight: 1.6, flexShrink: 0 }}>
              <div style={{ fontWeight: 600 }}>Marzo 2026</div>
              <div style={{ marginTop: 6, padding: "3px 10px", border: `1px solid ${C.guinda}40`, color: C.guinda, borderRadius: 4, fontSize: 10, letterSpacing: 1, fontWeight: 600 }}>SENER · GCIEP</div>
            </div>
          </div>
        </div>
      </header>

      <nav className="no-print" style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}`, padding: "0 24px" }}>
        <div style={{ maxWidth: 940, margin: "0 auto", display: "flex", gap: 0, overflowX: "auto" }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => setSec(n.id)} style={{ fontFamily: FF.b, fontSize: 11.5, fontWeight: sec === n.id ? 700 : 400, color: sec === n.id ? C.guinda : C.gris, background: "none", border: "none", padding: "11px 14px", cursor: "pointer", whiteSpace: "nowrap", borderBottom: sec === n.id ? `3px solid ${C.guinda}` : "3px solid transparent", marginBottom: -1, transition: "all 0.2s" }}>
              <span style={{ marginRight: 4 }}>{n.icon}</span>{n.label}
            </button>
          ))}
        </div>
      </nav>

      <main style={{ maxWidth: 940, margin: "0 auto", padding: "26px 24px 72px" }}>

        {/* ═══ RETO ═══ */}
        {sec === "reto" && (
          <div style={{ animation: "fadeUp 0.5s ease" }}>
            <h2 style={{ fontFamily: FF.h, fontSize: 20, fontWeight: 700, color: C.guinda, marginBottom: 12, paddingBottom: 6, borderBottom: `2px solid ${C.guinda}` }}>
              El reto: nadie invierte sin que alguien absorba el riesgo inicial
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 14 }}>
              El hidrógeno verde es hoy <strong>significativamente más caro</strong> que el hidrógeno fósil. Un electrolizador requiere inversión intensiva de capital, electricidad renovable barata y un comprador que garantice volumen. Sin apoyo público, ningún banco financia un proyecto de primera generación porque el riesgo es demasiado alto y el retorno demasiado incierto.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 14 }}>
              La experiencia internacional es contundente: <strong>todos los países que han pasado de pilotos a inversión real</strong> lo hicieron con alguna combinación de inversión pública, subsidios al capital y/o incentivos a la producción. Los que solo tuvieron estrategias sin instrumentos financieros se quedaron en anuncios.
            </p>

            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
              <DL onClick={() => go(refs.reto, "brecha_costo_h2")} ok={ok} />
            </div>
            <div ref={refs.reto} style={{ background: "#fff", borderRadius: 8, padding: "22px 18px", border: `1px solid ${C.border}` }}>
              <div style={{ fontFamily: FF.h, fontSize: 14, fontWeight: 700, color: C.guinda, marginBottom: 16 }}>
                Por qué se necesitan los 3 instrumentos combinados
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
                {[
                  { title: "La brecha de costo", desc: "El H₂ verde cuesta 2-4x más que el fósil. Sin apoyo, no es competitivo. Los grants CAPEX reducen la inversión inicial, pero no resuelven la operación.", icon: "📊", c: C.guinda },
                  { title: "El riesgo de mercado", desc: "¿Quién compra H₂ verde a precio premium? Sin demanda garantizada, el productor asume todo el riesgo. Los CfDs y los incentivos a producción absorben ese riesgo.", icon: "📉", c: C.dorado },
                  { title: "El riesgo de ejecución", desc: "Un electrolizador FOAK es tecnología nueva en contexto nuevo. La asociación público-privada comparte el riesgo de ejecución entre ambos sectores.", icon: "⚙️", c: C.verde },
                  { title: "La señal de compromiso", desc: "Cuando el gobierno co-invierte, envía una señal de que va en serio. Esto atrae capital privado y reduce la prima de riesgo percibida por los mercados financieros.", icon: "🏛️", c: "#555" },
                ].map((d, i) => (
                  <div key={i} style={{ ...crd, borderTop: `3px solid ${d.c}`, textAlign: "center" }}>
                    <div style={{ fontSize: 28, marginBottom: 6 }}>{d.icon}</div>
                    <h4 style={{ fontFamily: FF.h, fontSize: 13, fontWeight: 700, color: d.c, marginBottom: 4 }}>{d.title}</h4>
                    <p style={{ fontSize: 12.5, color: "#555", lineHeight: 1.55 }}>{d.desc}</p>
                  </div>
                ))}
              </div>
              <div style={{ background: C.verdeLt, borderRadius: 6, padding: "14px", marginTop: 16 }}>
                <p style={{ fontSize: 13, color: C.verde, lineHeight: 1.55, fontWeight: 500 }}>
                  Hallazgo clave del D2: "Los incentivos fiscales son herramientas de entrada, no de escala. Los mecanismos de soporte de ingresos separan a los mercados piloto de los que escalan." México necesita los tres instrumentos secuenciados.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ═══ 3 INSTRUMENTOS ═══ */}
        {sec === "instrumentos" && (
          <div style={{ animation: "fadeUp 0.5s ease" }}>
            <h2 style={{ fontFamily: FF.h, fontSize: 20, fontWeight: 700, color: C.guinda, marginBottom: 4, paddingBottom: 6, borderBottom: `2px solid ${C.guinda}` }}>
              Tres Instrumentos para Producción Temprana
            </h2>
            <p style={{ fontSize: 14, color: C.gris, marginBottom: 20 }}>Cada uno ataca una barrera diferente. Funcionan mejor combinados y secuenciados.</p>

            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
              <DL onClick={() => go(refs.inst, "instrumentos_produccion")} ok={ok} />
            </div>
            <div ref={refs.inst} style={{ display: "grid", gap: 18, background: "#fff", padding: 8 }}>
              {INSTRUMENTS.map((a, i) => (
                <div key={i} style={{ ...crd, borderLeft: `5px solid ${a.color}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <span style={{ fontSize: 28 }}>{a.icon}</span>
                    <div>
                      <h3 style={{ fontFamily: FF.h, fontSize: 17, fontWeight: 700, color: a.color, lineHeight: 1.2 }}>{a.title}</h3>
                      <div style={{ fontSize: 12, color: C.gris }}>{a.subtitle}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 13.5, lineHeight: 1.65, color: "#444", marginBottom: 14 }}>{a.what}</p>
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 10.5, fontWeight: 700, color: a.color, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Cómo funciona</div>
                    {a.how.map((h, j) => (
                      <div key={j} style={{ display: "flex", gap: 8, padding: "3px 0" }}>
                        <span style={{ color: a.color, fontSize: 11, marginTop: 2, flexShrink: 0 }}>▸</span>
                        <span style={{ fontSize: 12.5, color: "#555", lineHeight: 1.5 }}>{h}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: C.verdeLt, borderRadius: 6, padding: "10px 12px", marginBottom: 12 }}>
                    <div style={{ fontSize: 10.5, fontWeight: 700, color: C.verde, textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>Referencia internacional</div>
                    <p style={{ fontSize: 12, lineHeight: 1.55, color: "#444" }}>{a.intlRef}</p>
                  </div>
                  <div>
                    <div style={{ fontSize: 10.5, fontWeight: 700, color: C.gris, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Riesgos</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {a.risks.map((rk, j) => (
                        <span key={j} style={{ fontSize: 11, background: "#fff3e0", color: "#c06000", padding: "3px 10px", borderRadius: 10, border: "1px solid #f0d0a0" }}>{rk}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ INTERNACIONAL ═══ */}
        {sec === "internacional" && (
          <div style={{ animation: "fadeUp 0.5s ease" }}>
            <h2 style={{ fontFamily: FF.h, fontSize: 20, fontWeight: 700, color: C.guinda, marginBottom: 4, paddingBottom: 6, borderBottom: `2px solid ${C.guinda}` }}>
              Comparativo Internacional
            </h2>
            <p style={{ fontSize: 14, color: C.gris, marginBottom: 20 }}>Qué instrumentos usan otros países para apoyar producción temprana.</p>

            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
              <DL onClick={() => go(refs.intl, "comparativo_produccion")} ok={ok} />
            </div>
            <div ref={refs.intl} style={{ background: "#fff", borderRadius: 8, padding: "22px 18px", border: `1px solid ${C.border}`, overflowX: "auto" }}>
              <div style={{ fontFamily: FF.h, fontSize: 14, fontWeight: 700, color: C.guinda, marginBottom: 14 }}>
                Madurez de instrumentos de apoyo a producción de H₂
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: FF.b }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${C.guinda}` }}>
                    {["País", "Asoc. Mixta", "CAPEX Grants", "Incentivo Prod.", "Nota clave"].map((h, i) => (
                      <th key={i} style={{ textAlign: "left", padding: "8px 8px", fontWeight: 700, color: C.guinda, fontSize: 10, letterSpacing: 0.5, textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {INTL.map((row, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${C.grisCl}`, background: row.c === "México" ? C.guindaLt : i % 2 === 0 ? C.surface : "#fff" }}>
                      <td style={{ padding: "9px 8px", fontWeight: 700, fontSize: 12.5, whiteSpace: "nowrap" }}>{row.f} {row.c}</td>
                      {[row.ppp, row.capex, row.prod].map((v, j) => (
                        <td key={j} style={{ padding: "9px 8px" }}>
                          <HBar value={v} max={5} color={v === 0 ? "#ddd" : v >= 4 ? C.verde : v >= 3 ? C.dorado : C.guinda} label={`${v}/5`} />
                        </td>
                      ))}
                      <td style={{ padding: "9px 8px", fontSize: 11, color: "#555", lineHeight: 1.4, maxWidth: 260 }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═══ MÉXICO ═══ */}
        {sec === "mexico" && (
          <div style={{ animation: "fadeUp 0.5s ease" }}>
            <h2 style={{ fontFamily: FF.h, fontSize: 20, fontWeight: 700, color: C.guinda, marginBottom: 4, paddingBottom: 6, borderBottom: `2px solid ${C.guinda}` }}>
              Propuesta de Implementación para México
            </h2>
            <p style={{ fontSize: 14, color: C.gris, marginBottom: 20 }}>Secuencia de acciones para habilitar producción temprana de H₂ verde.</p>

            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
              <DL onClick={() => go(refs.mx, "ruta_produccion_mx")} ok={ok} />
            </div>
            <div ref={refs.mx} style={{ background: "#fff", borderRadius: 8, padding: "26px 22px 26px 48px", border: `1px solid ${C.border}`, position: "relative" }}>
              <div style={{ fontFamily: FF.h, fontSize: 16, fontWeight: 700, color: C.guinda, marginBottom: 22 }}>
                Ruta para apoyar producción temprana
              </div>
              <div style={{ position: "absolute", left: 32, top: 68, bottom: 30, width: 2, background: `linear-gradient(to bottom, ${C.guinda}, ${C.dorado}, ${C.verde})`, borderRadius: 1 }} />

              {TIMELINE.map((ph, pi) => (
                <div key={pi} style={{ marginBottom: 30 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, position: "relative" }}>
                    <div style={{ position: "absolute", left: -24, width: 16, height: 16, borderRadius: "50%", background: ph.c, border: "3px solid #fff", boxShadow: `0 0 0 2px ${ph.c}40` }} />
                    <h3 style={{ fontFamily: FF.h, fontSize: 15, fontWeight: 700, color: ph.c }}>{ph.phase}</h3>
                  </div>
                  <div style={{ display: "grid", gap: 10 }}>
                    {ph.items.map((it, ii) => (
                      <div key={ii} style={{ background: C.surface, borderRadius: 6, padding: "14px 14px", borderLeft: `3px solid ${ph.c}` }}>
                        <h4 style={{ fontFamily: FF.h, fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 4 }}>{it.t}</h4>
                        <p style={{ fontSize: 12.5, lineHeight: 1.55, color: "#555" }}>{it.d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ PREGUNTAS ═══ */}
        {sec === "preguntas" && (
          <div style={{ animation: "fadeUp 0.5s ease" }}>
            <h2 style={{ fontFamily: FF.h, fontSize: 20, fontWeight: 700, color: C.guinda, marginBottom: 4, paddingBottom: 6, borderBottom: `2px solid ${C.guinda}` }}>
              Preguntas Estratégicas
            </h2>
            <p style={{ fontSize: 14, color: C.gris, marginBottom: 20 }}>25 preguntas en 5 categorías que SENER debe resolver para diseñar los instrumentos de apoyo.</p>

            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
              <DL onClick={() => go(refs.qs, "preguntas_produccion")} ok={ok} />
            </div>
            <div ref={refs.qs} style={{ display: "grid", gap: 16, background: "#fff", padding: 8 }}>
              {QUESTIONS.map((cat, ci) => (
                <div key={ci} style={{ ...crd, borderLeft: `4px solid ${cat.c}` }}>
                  <h3 style={{ fontFamily: FF.h, fontSize: 15, fontWeight: 700, color: cat.c, marginBottom: 12 }}>{cat.cat}</h3>
                  {cat.qs.map((q, qi) => (
                    <div key={qi} style={{ display: "flex", gap: 10, padding: "6px 0", borderBottom: qi < cat.qs.length - 1 ? `1px solid ${C.grisCl}` : "none" }}>
                      <span style={{ fontFamily: FF.b, fontSize: 11, fontWeight: 700, color: cat.c, minWidth: 22, marginTop: 1 }}>{qi + 1}.</span>
                      <span style={{ fontSize: 13, color: "#444", lineHeight: 1.55 }}>{q}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div style={{ background: C.verdeLt, border: `1px solid ${C.verde}30`, borderRadius: 8, padding: "18px 18px", marginTop: 20 }}>
              <h3 style={{ fontFamily: FF.h, fontSize: 14, fontWeight: 700, color: C.verde, marginBottom: 6 }}>Siguiente paso propuesto</h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#444" }}>
                Organizar un <strong>taller de diseño de instrumentos financieros con SENER, SHCP, NAFIN, BANOBRAS y banca multilateral (BID, Banco Mundial)</strong> para cuantificar necesidades de financiamiento, evaluar viabilidad fiscal de los incentivos y estructurar la primera convocatoria de CAPEX grants. Este taller alimentaría el capítulo de instrumentos financieros del Plan Nacional de Hidrógeno Renovable.
              </p>
            </div>
          </div>
        )}

        <footer style={{ fontSize: 11, color: C.gris, textAlign: "center", padding: "24px 0 0", marginTop: 36, borderTop: `1px solid ${C.border}` }}>
          <div>Propuesta basada en GCIEP D2, experiencia internacional y análisis de instrumentos financieros</div>
          <div style={{ marginTop: 3, color: C.guinda, fontWeight: 600 }}>Secretaría de Energía · Gobierno de México</div>
        </footer>
      </main>
    </div>
  );
}
