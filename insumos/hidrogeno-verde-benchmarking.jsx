import { useState, useEffect } from "react";

const COUNTRIES = {
  germany: {
    name: "Alemania", flag: "🇩🇪", tier: "advanced", tierLabel: "Avanzado",
    strategy: "Sí – Estrategia Nacional de Hidrógeno (2020, actualizada)",
    integration: "Alta", leadership: "Híbrido: energía e industria", coordination: "Alta",
    monitoring: "Alta", stakeholder: "Fuerte participación industria e investigación",
    intlCoop: "Alta – marcos UE y alianzas bilaterales",
    definitions: "Alta", regulation: "Integrada", certification: "Alta", certAlignment: "Alta", gaps: "Limitados–Moderados",
    strengths: [
      "Estrategia nacional vinculante que ancla institucionalmente el hidrógeno",
      "H2Global: mecanismo de compras con CfD que absorbe riesgo de precio",
      "Criterios RFNBO de la UE aplicados consistentemente",
      "Coordinación interministerial formal y estructurada",
      "Monitoreo y evaluación con marcos de seguimiento estructurados"
    ],
    policyLevers: {
      fiscal: "Incentivos fiscales integrados en marco UE",
      publicFunding: "CAPEX co-financiamiento y fondos de innovación sustanciales",
      revenueSupport: "H2Global: contratos CfD competitivos que socializan riesgo de precio",
      standards: "Criterios RFNBO y Garantías de Origen operativas",
      infrastructure: "Backbone de hidrógeno planificado, integración con red europea"
    },
    lessonForMexico: "Modelo de estrategia vinculante con coordinación interministerial. México debería emular la secuenciación: primero ancla estratégica, luego coordinación, después instrumentos de mercado."
  },
  netherlands: {
    name: "Países Bajos", flag: "🇳🇱", tier: "advanced", tierLabel: "Avanzado",
    strategy: "Sí – Estrategia Nacional de Hidrógeno",
    integration: "Alta", leadership: "Energía e infraestructura", coordination: "Alta",
    monitoring: "Alta", stakeholder: "Fuerte participación industria y autoridades portuarias",
    intlCoop: "Alta – marcos UE y cooperación Mar del Norte",
    definitions: "Alta", regulation: "Integrada", certification: "Alta", certAlignment: "Alta", gaps: "Limitados–Moderados",
    strengths: [
      "Modelo de desarrollo liderado por infraestructura (backbone, puertos, hubs)",
      "Cooperación regional institucionalizada (UE, Mar del Norte)",
      "Coordinación fuerte entre industria y autoridades portuarias",
      "Planificación de redes de transporte de hidrógeno integrada",
      "Reducción de duplicación mediante infraestructura compartida"
    ],
    policyLevers: {
      fiscal: "Incentivos fiscales dentro del marco UE",
      publicFunding: "Co-financiamiento para hubs e infraestructura compartida",
      revenueSupport: "Mecanismos de soporte de ingresos en desarrollo",
      standards: "RFNBO y Garantías de Origen alineadas con UE",
      infrastructure: "Backbone de hidrógeno, puertos y hubs – modelo líder mundial"
    },
    lessonForMexico: "Referencia clave en infraestructura compartida. México puede aprender a planificar clusters industriales (Veracruz, Tamaulipas) conectados a puertos para exportación."
  },
  uk: {
    name: "Reino Unido", flag: "🇬🇧", tier: "advanced", tierLabel: "Avanzado",
    strategy: "Sí – Estrategia UK de Hidrógeno",
    integration: "Alta", leadership: "Energía con enfoque en entrega", coordination: "Alta",
    monitoring: "Alta", stakeholder: "Clusters industriales y academia",
    intlCoop: "Alta – UE, Mar del Norte y EE.UU.",
    definitions: "Alta", regulation: "Integrada", certification: "Alta", certAlignment: "Media", gaps: "Moderados",
    strengths: [
      "Contratos estandarizados de largo plazo (HPBM) via Hydrogen Allocation Rounds",
      "UK Low Carbon Hydrogen Standard define umbrales de emisiones claros",
      "Despliegue organizado en clusters industriales designados",
      "LCCC como contraparte contractual para soporte de ingresos",
      "Integración del hidrógeno en planificación del sistema eléctrico"
    ],
    policyLevers: {
      fiscal: "Net Zero Hydrogen Fund complementa otros instrumentos",
      publicFunding: "NZHF: grants y co-financiamiento para proyectos",
      revenueSupport: "HPBM/LCHA: contratos estandarizados de largo plazo via HAR",
      standards: "UK Low Carbon Hydrogen Standard operativo",
      infrastructure: "Clusters industriales, planificación de redes de transporte"
    },
    lessonForMexico: "Modelo de contratos replicables y estandarizados. México puede diseñar rondas de asignación competitivas cuando avance a la fase de escalamiento."
  },
  japan: {
    name: "Japón", flag: "🇯🇵", tier: "medium", tierLabel: "Madurez Media",
    strategy: "Sí – Estrategia Básica de Hidrógeno",
    integration: "Alta", leadership: "Economía y comercio", coordination: "Alta",
    monitoring: "Alta", stakeholder: "Participación liderada por industria",
    intlCoop: "Alta – cadenas de suministro (Australia, Medio Oriente)",
    definitions: "Media–Alta", regulation: "Integrada", certification: "Media–Alta", certAlignment: "Media", gaps: "Moderados",
    strengths: [
      "Gobernanza anclada en política económica y comercial",
      "Cooperación bilateral institucionalizada para cadenas de suministro",
      "Fuerte alineación institucional entre hidrógeno y comercio internacional",
      "Liderazgo en tecnologías de uso final (celdas de combustible)",
      "Enfoque en demanda: co-combustión de H₂ y amoniaco en generación eléctrica"
    ],
    policyLevers: {
      fiscal: "Incentivos fiscales para tecnologías de hidrógeno",
      publicFunding: "Fondos públicos significativos para I+D y demostración",
      revenueSupport: "Mecanismos orientados a demanda en generación eléctrica",
      standards: "Certificación en evolución, enfoque en cadena de suministro",
      infrastructure: "Terminales de importación, almacenamiento y distribución"
    },
    lessonForMexico: "Modelo de cooperación internacional para importación/exportación. Relevante si México busca exportar hidrógeno o derivados como amoniaco."
  },
  australia: {
    name: "Australia", flag: "🇦🇺", tier: "medium", tierLabel: "Madurez Media",
    strategy: "Sí – Estrategia Nacional de Hidrógeno",
    integration: "Media–Alta", leadership: "Híbrido: federal–estatal, energía e industria", coordination: "Media",
    monitoring: "Media", stakeholder: "Participación liderada por industria en hubs",
    intlCoop: "Alta – alianzas de exportación (Japón, Corea, UE)",
    definitions: "Media", regulation: "Integrada", certification: "Media", certAlignment: "Media", gaps: "Moderados",
    strengths: [
      "Modelo de exportación con hubs vinculados a puertos y zonas renovables",
      "Hydrogen Headstart: soporte de ingresos contractual para proyectos a escala",
      "Coordinación federal-estatal con estados liderando implementación",
      "Co-localización de recursos renovables con infraestructura de exportación",
      "Esquema de certificación alineado con mercados de exportación"
    ],
    policyLevers: {
      fiscal: "No aplica incentivos fiscales específicos nacionales para H₂",
      publicFunding: "CAPEX para hubs e infraestructura compartida (ARENA, CEFC)",
      revenueSupport: "Hydrogen Headstart: contratos de soporte de ingresos competitivos",
      standards: "Esquema nacional de certificación en desarrollo",
      infrastructure: "Hubs vinculados a puertos, zonas renovables y corredores de exportación"
    },
    lessonForMexico: "Modelo relevante por recursos renovables abundantes. México puede replicar el enfoque de hubs conectados a puertos en regiones como Sonora, Baja California y Veracruz."
  },
  southkorea: {
    name: "Corea del Sur", flag: "🇰🇷", tier: "medium", tierLabel: "Madurez Media",
    strategy: "Sí – Hoja de Ruta Economía del Hidrógeno",
    integration: "Alta", leadership: "Industria y energía (legislado)", coordination: "Alta",
    monitoring: "Alta", stakeholder: "Participación industria vía sector eléctrico",
    intlCoop: "Media–Alta – cooperación bilateral Asia-Pacífico",
    definitions: "Alta", regulation: "Dedicada", certification: "Alta", certAlignment: "Media", gaps: "Limitados–Moderados",
    strengths: [
      "Ley dedicada de Economía del Hidrógeno y Seguridad – única con marco legal propio",
      "CHPS: mercado de licitación de generación eléctrica con hidrógeno limpio",
      "Anclaje de demanda en sector eléctrico como motor de escalamiento",
      "Empresas estatales (KEPCO, KOGAS) lideran implementación",
      "Ciudades del Hidrógeno: programa de distribución downstream"
    ],
    policyLevers: {
      fiscal: "Incentivos fiscales para cadena de suministro de H₂",
      publicFunding: "Programas de financiamiento para electrolizadores y cadenas",
      revenueSupport: "CHPS: licitación de generación eléctrica con H₂ limpio",
      standards: "Certificación de H₂ limpio bajo Ley de Economía del Hidrógeno",
      infrastructure: "Terminales de importación, almacenamiento (KOGAS), Ciudades H₂"
    },
    lessonForMexico: "Modelo de anclaje por demanda: en vez de subsidiar solo producción, garantizar offtake. También muestra que legislación dedicada puede aparecer en etapas avanzadas."
  },
  china: {
    name: "China", flag: "🇨🇳", tier: "medium", tierLabel: "Madurez Media",
    strategy: "Sí – Planificación nacional a mediano y largo plazo",
    integration: "Alta", leadership: "Planificación central y estatal", coordination: "Alta",
    monitoring: "Media–Alta", stakeholder: "Participación industrial estatal",
    intlCoop: "Baja – cooperación bilateral selectiva",
    definitions: "Media", regulation: "Integrada", certification: "Media", certAlignment: "Baja–Media", gaps: "Moderados–Significativos",
    strengths: [
      "Ejecución a escala industrial mediante empresas estatales (SOEs)",
      "Integración de hidrógeno en parques industriales y bases renovables",
      "Coordinación administrativa fuerte a nivel central y provincial",
      "Capacidad de despliegue masivo vía planificación centralizada",
      "Integración de producción de H₂ en sectores de acero, químicos y refinación"
    ],
    policyLevers: {
      fiscal: "Subsidios provinciales y financiamiento estatal",
      publicFunding: "Bancos de desarrollo y programas provinciales",
      revenueSupport: "Objetivos de despliegue administrativos, no contratos de mercado",
      standards: "Estándares técnicos y de seguridad nacionales",
      infrastructure: "Parques industriales, zonas de demostración, bases renovables"
    },
    lessonForMexico: "Modelo de ejecución industrial. Relevante para entender cómo integrar H₂ en sectores existentes (refinación, químicos), aunque el modelo de gobernanza es muy diferente."
  },
  india: {
    name: "India", flag: "🇮🇳", tier: "emerging", tierLabel: "Emergente",
    strategy: "Sí – Misión Nacional de Hidrógeno Verde",
    integration: "Media", leadership: "Energía, basado en misión", coordination: "Media",
    monitoring: "Media", stakeholder: "Creciente participación industrial",
    intlCoop: "Media – UE y alianzas bilaterales",
    definitions: "Media", regulation: "Integrada", certification: "Media", certAlignment: "Media", gaps: "Moderados",
    strengths: [
      "Enfoque de misión nacional que establece objetivos claros",
      "Definiciones introducidas como parte del marco de misión",
      "Esquema SIGHT: incentivos tanto para producción de electrolizadores como de H₂",
      "Obligaciones de consumo de hidrógeno verde (mandatos de demanda)",
      "Integración progresiva de arreglos institucionales"
    ],
    policyLevers: {
      fiscal: "Incentivos fiscales y exenciones para manufactura de electrolizadores",
      publicFunding: "Esquema SIGHT: subsidios para producción de H₂ y electrolizadores",
      revenueSupport: "Mandatos de consumo de H₂ verde en refinación y fertilizantes",
      standards: "Definiciones operativas, certificación en evolución",
      infrastructure: "En desarrollo, vinculada a corredores industriales"
    },
    lessonForMexico: "Modelo de misión con mandatos de demanda. México podría considerar obligaciones de consumo de H₂ verde en refinación y fertilizantes como ancla de mercado."
  },
  chile: {
    name: "Chile", flag: "🇨🇱", tier: "emerging", tierLabel: "Emergente",
    strategy: "Sí – Estrategia Nacional de Hidrógeno Verde",
    integration: "Media", leadership: "Energía con orientación a exportación", coordination: "Media",
    monitoring: "Media", stakeholder: "Participación enfocada en pilotos",
    intlCoop: "Media – UE y cooperación de exportación",
    definitions: "Media", regulation: "Integrada", certification: "Media", certAlignment: "Media", gaps: "Moderados",
    strengths: [
      "Estrategia con fuerte orientación exportadora (amoniaco, e-fuels)",
      "CORFO como agencia de implementación con co-financiamiento CAPEX",
      "Recursos renovables excepcionales (solar en Atacama, eólico en Magallanes)",
      "Plan de Acción 2023-2030 con hitos claros",
      "Infraestructura portuaria vinculada a corredores de exportación"
    ],
    policyLevers: {
      fiscal: "Sin incentivos fiscales específicos para H₂",
      publicFunding: "CORFO: co-financiamiento competitivo para pilotos FOAK",
      revenueSupport: "Sin CfDs – riesgo de precio permanece con sector privado",
      standards: "Hoja de ruta regulatoria con criterios de certificación en desarrollo",
      infrastructure: "Hubs de exportación vinculados a puertos (Magallanes, Antofagasta)"
    },
    lessonForMexico: "Par más cercano con recursos renovables similares. Chile muestra que la orientación exportadora necesita complementarse con mecanismos de soporte de ingresos para escalar."
  },
  colombia: {
    name: "Colombia", flag: "🇨🇴", tier: "peer", tierLabel: "Par (Early-stage)",
    strategy: "Sí – Hoja de Ruta del Hidrógeno",
    integration: "Baja–Media", leadership: "Energía, etapa temprana", coordination: "Baja–Media",
    monitoring: "Baja", stakeholder: "Participación multi-actor temprana",
    intlCoop: "Media – regional y cooperación UE",
    definitions: "Media", regulation: "Integrada", certification: "Media", certAlignment: "Media", gaps: "Moderados–Significativos",
    strengths: [
      "Reconocimiento legal del hidrógeno verde en marco de energías renovables",
      "Sandboxes regulatorios para pruebas controladas de pilotos",
      "Apoyo piloto con Ecopetrol como actor industrial clave",
      "Estándares técnicos en desarrollo complementan marco legal",
      "Cooperación regional e internacional en avance"
    ],
    policyLevers: {
      fiscal: "Incentivos fiscales generales de transición energética aplicables a H₂",
      publicFunding: "Apoyo a pilotos y estudios de factibilidad",
      revenueSupport: "Sin mecanismos CfD – mercado de H₂ aún no formado",
      standards: "Reconocimiento legal, sandboxes regulatorios operativos",
      infrastructure: "Sin redes de transporte dedicadas, integración en instalaciones existentes"
    },
    lessonForMexico: "Par directo en etapa similar. Los sandboxes regulatorios de Colombia son un modelo interesante para México mientras desarrolla su marco normativo."
  },
  peru: {
    name: "Perú", flag: "🇵🇪", tier: "peer", tierLabel: "Par (Early-stage)",
    strategy: "Sí – Hoja de Ruta Nacional de Hidrógeno",
    integration: "Baja", leadership: "Energía, etapa de planificación", coordination: "Baja",
    monitoring: "Baja", stakeholder: "Participación limitada",
    intlCoop: "Baja – apoyo multilateral únicamente",
    definitions: "Baja", regulation: "Ninguna", certification: "Baja", certAlignment: "Baja", gaps: "Significativos",
    strengths: [
      "Hoja de ruta nacional publicada como señal de intención",
      "Potencial renovable reconocido (solar, eólico)",
      "ProInversión como vehículo potencial para atraer inversión privada",
      "Reconocimiento de necesidad de marco regulatorio",
      "Cooperación con organismos multilaterales"
    ],
    policyLevers: {
      fiscal: "Sin incentivos fiscales específicos para H₂",
      publicFunding: "Apoyo multilateral para estudios y planificación",
      revenueSupport: "Sin mecanismos de soporte de ingresos",
      standards: "Sin marco de certificación operativo",
      infrastructure: "Sin infraestructura dedicada planificada"
    },
    lessonForMexico: "Ejemplo de lo que sucede sin marco regulatorio ni institucional claro: los proyectos se estancan en fase de anuncio. México debe evitar este escenario."
  }
};

const MEXICO_RECS = [
  { title: "Ancla Estratégica Vinculante", description: "Emitir un Plan Nacional de Hidrógeno Renovable como referencia institucional formal. Integrar hidrógeno en políticas de energía, clima e industria.", phase: "Inmediato", ref: ["Alemania", "Reino Unido"], icon: "📋" },
  { title: "Liderazgo Institucional Claro", description: "Establecer liderazgo híbrido energía-industria con SENER al frente, con coordinación formal interministerial (SEMARNAT, CONAGUA, ASEA, CRE, CENACE).", phase: "Inmediato", ref: ["Alemania", "Japón"], icon: "🏛️" },
  { title: "Definiciones y Marco Regulatorio", description: "Definir criterios operacionales para 'hidrógeno verde' con umbrales de emisiones y reglas de electricidad renovable. Adaptar leyes existentes primero.", phase: "Corto plazo", ref: ["India", "Chile", "UE"], icon: "⚖️" },
  { title: "Incentivos Fiscales y Pilotos", description: "Comenzar con incentivos fiscales y financiamiento público para pilotos. Son herramientas de entrada, no de escala.", phase: "Corto plazo", ref: ["Colombia", "India"], icon: "💰" },
  { title: "Clusters Industriales", description: "Planificar clusters donde confluyan recursos renovables, demanda industrial y logística: Sonora, Nuevo León, Veracruz, Baja California.", phase: "Mediano plazo", ref: ["Países Bajos", "Australia", "UK"], icon: "🏭" },
  { title: "Soporte de Ingresos (CfD)", description: "Diseñar contratos CfD o offtake garantizado para absorber riesgo de mercado. Sin estos, los proyectos no pasan de pilotos a inversión bancable.", phase: "Mediano plazo", ref: ["Alemania (H2Global)", "UK (HPBM)"], icon: "📊" },
  { title: "Mandatos de Demanda", description: "Obligaciones de consumo de H₂ verde en refinación y fertilizantes como ancla de demanda doméstica.", phase: "Mediano plazo", ref: ["India", "Corea del Sur"], icon: "🎯" },
  { title: "Certificación y Estándares", description: "Esquema de certificación nacional alineado con estándares internacionales (RFNBO, GoO) para mercado doméstico y exportación.", phase: "Mediano plazo", ref: ["UE/Alemania", "Australia"], icon: "✅" }
];

const BARRIERS = [
  { name: "Incertidumbre de ingresos y riesgo de demanda", icon: "📉", desc: "H₂ verde más caro que alternativas fósiles. Sin ingresos predecibles, los proyectos no son bancables." },
  { name: "Incertidumbre regulatoria", icon: "📜", desc: "Falta de definiciones, permisos y certificación específica para hidrógeno." },
  { name: "Altos costos de producción", icon: "💸", desc: "Inversión intensiva en electrolizadores, generación renovable e infraestructura." },
  { name: "Brechas de infraestructura", icon: "🔌", desc: "Sin infraestructura compartida, cada proyecto necesita soluciones propias costosas." },
  { name: "Desafíos de coordinación", icon: "🔄", desc: "Múltiples actores sin coordinación clara retrasan decisiones y fragmentan permisos." }
];

const tc = {
  advanced: { bg: "rgba(34,197,94,0.12)", border: "#22c55e", text: "#4ade80" },
  medium: { bg: "rgba(59,130,246,0.12)", border: "#3b82f6", text: "#60a5fa" },
  emerging: { bg: "rgba(249,115,22,0.12)", border: "#f97316", text: "#fb923c" },
  peer: { bg: "rgba(168,85,247,0.12)", border: "#a855f7", text: "#c084fc" }
};

const tierLabels = { advanced: "Avanzado", medium: "Madurez Media", emerging: "Emergente", peer: "Par (Early-stage)" };

function RatingBar({ level }) {
  const m = { "Alta":5, "Media–Alta":4, "Media":3, "Baja–Media":2, "Baja":1, "Dedicada":5, "Integrada":3, "Ninguna":0, "Limitados–Moderados":4, "Moderados":3, "Moderados–Significativos":2, "Significativos":1 };
  const v = m[level] ?? 3;
  const clr = v >= 4 ? "#22c55e" : v >= 3 ? "#eab308" : "#ef4444";
  return (
    <div style={{ display:"flex", gap:2, alignItems:"center" }}>
      {[1,2,3,4,5].map(i => <div key={i} style={{ width:16, height:5, borderRadius:2, background: i<=v ? clr : "rgba(255,255,255,0.08)" }} />)}
      <span style={{ fontSize:11, marginLeft:6, color:"rgba(255,255,255,0.5)" }}>{level}</span>
    </div>
  );
}

export default function App() {
  const [section, setSection] = useState("overview");
  const [selCountry, setSelCountry] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => { setTimeout(() => setReady(true), 80); }, []);

  const navItems = [
    { id:"overview", label:"Panorama", icon:"🌎" },
    { id:"countries", label:"Países", icon:"🏳️" },
    { id:"compare", label:"Comparar", icon:"⚖️" },
    { id:"mexico", label:"México", icon:"🇲🇽" },
    { id:"barriers", label:"Barreras", icon:"🚧" },
    { id:"findings", label:"Hallazgos", icon:"🔍" },
  ];

  const toggleCmp = k => setCompareList(p => p.includes(k) ? p.filter(x=>x!==k) : p.length<4 ? [...p,k] : p);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,600;0,6..72,700;1,6..72,400&family=DM+Sans:wght@400;500;600;700&display=swap');
    * { box-sizing:border-box; margin:0; padding:0; }
    @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
    ::-webkit-scrollbar{width:5px;height:5px}
    ::-webkit-scrollbar-track{background:transparent}
    ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.12);border-radius:3px}
    body{background:#080d19;margin:0}
  `;

  const S = { ff:"'DM Sans',sans-serif", serif:"'Newsreader','Georgia',serif" };
  const card = { background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:12, padding:24 };

  return (
    <div style={{ fontFamily:S.serif, background:"#080d19", color:"#e8e6e1", minHeight:"100vh" }}>
      <style>{css}</style>

      {/* BG */}
      <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none" }}>
        <div style={{ position:"absolute", top:-200, right:-200, width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(34,197,94,0.05)0%,transparent 70%)" }} />
        <div style={{ position:"absolute", bottom:-150, left:-150, width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(59,130,246,0.04)0%,transparent 70%)" }} />
      </div>

      {/* Header */}
      <header style={{ position:"relative", zIndex:10, padding:"44px 28px 20px", borderBottom:"1px solid rgba(255,255,255,0.05)", opacity:ready?1:0, transform:ready?"none":"translateY(-16px)", transition:"all 0.7s cubic-bezier(0.16,1,0.3,1)" }}>
        <div style={{ maxWidth:1140, margin:"0 auto" }}>
          <div style={{ fontFamily:S.ff, fontSize:10, letterSpacing:3, textTransform:"uppercase", color:"#22c55e", marginBottom:10, fontWeight:600 }}>GCIEP · SENER · Benchmarking Internacional</div>
          <h1 style={{ fontSize:"clamp(26px,4vw,44px)", fontWeight:700, lineHeight:1.08, maxWidth:780, letterSpacing:"-0.02em" }}>Hidrógeno Verde en México</h1>
          <p style={{ fontSize:"clamp(14px,1.8vw,18px)", fontWeight:300, color:"rgba(255,255,255,0.5)", marginTop:8, maxWidth:680, lineHeight:1.5, fontStyle:"italic" }}>Evaluación comparativa internacional para el Plan Nacional de Hidrógeno Renovable</p>
        </div>
      </header>

      {/* Nav */}
      <nav style={{ position:"sticky", top:0, zIndex:100, backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", background:"rgba(8,13,25,0.88)", borderBottom:"1px solid rgba(255,255,255,0.05)", padding:"0 28px" }}>
        <div style={{ maxWidth:1140, margin:"0 auto", display:"flex", gap:0, overflowX:"auto" }}>
          {navItems.map(n => (
            <button key={n.id} onClick={() => { setSection(n.id); setSelCountry(null); }}
              style={{ background:"none", border:"none", color:section===n.id?"#22c55e":"rgba(255,255,255,0.45)", padding:"13px 16px", cursor:"pointer", fontFamily:S.ff, fontSize:12.5, fontWeight:section===n.id?600:400, whiteSpace:"nowrap", borderBottom:section===n.id?"2px solid #22c55e":"2px solid transparent", transition:"all 0.25s" }}>
              <span style={{ marginRight:5 }}>{n.icon}</span>{n.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main style={{ position:"relative", zIndex:10, maxWidth:1140, margin:"0 auto", padding:"28px 28px 80px" }}>

        {/* OVERVIEW */}
        {section==="overview" && (
          <div style={{ animation:"fadeUp 0.5s ease" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:16, marginBottom:36 }}>
              {[
                { n:"11", l:"Países evaluados", s:"3 avanzados · 4 madurez media · 2 emergentes · 2 pares" },
                { n:"3", l:"Dimensiones de análisis", s:"Gobernanza · Regulación · Palancas de política" },
                { n:"390k+", l:"t H₂/año potencial", s:"Demanda industrial estimada en México" },
                { n:"0", l:"Proyectos con FID", s:"Todos en fase concepto o factibilidad" }
              ].map((c,i) => (
                <div key={i} style={{ ...card, opacity:ready?1:0, transform:ready?"none":"translateY(16px)", transition:`all 0.5s ease ${i*0.08}s` }}>
                  <div style={{ fontFamily:S.ff, fontSize:34, fontWeight:700, color:"#22c55e", lineHeight:1 }}>{c.n}</div>
                  <div style={{ fontFamily:S.ff, fontSize:13, fontWeight:600, marginTop:6, color:"rgba(255,255,255,0.88)" }}>{c.l}</div>
                  <div style={{ fontSize:12.5, color:"rgba(255,255,255,0.4)", marginTop:3, lineHeight:1.4 }}>{c.s}</div>
                </div>
              ))}
            </div>

            <h2 style={{ fontFamily:S.ff, fontSize:18, fontWeight:600, marginBottom:14 }}>Marco Analítico: 3 Dimensiones</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:14, marginBottom:36 }}>
              {[
                { t:"Gobernanza e Instituciones", c:"#22c55e", items:["Liderazgo institucional","Coordinación interministerial","Estrategias nacionales","Monitoreo y evaluación","Cooperación internacional"] },
                { t:"Fundamentos Legales y Regulatorios", c:"#3b82f6", items:["Definiciones de H₂ verde","Regulación dedicada vs. integrada","Certificación y sostenibilidad","Alineación con marcos internacionales","Brechas regulatorias"] },
                { t:"Palancas de Política", c:"#a855f7", items:["Incentivos fiscales","Financiamiento público / CAPEX","Soporte de ingresos (CfD)","Estándares y certificación","Infraestructura habilitadora"] }
              ].map((d,i) => (
                <div key={i} style={{ ...card, borderTop:`3px solid ${d.c}`, borderColor:`rgba(255,255,255,0.07)` }}>
                  <div style={{ height:3, background:d.c, margin:"-24px -24px 16px", borderRadius:"12px 12px 0 0" }} />
                  <h3 style={{ fontFamily:S.ff, fontSize:14.5, fontWeight:600, color:d.c, marginBottom:12 }}>{d.t}</h3>
                  {d.items.map((it,j) => <div key={j} style={{ fontSize:13, color:"rgba(255,255,255,0.6)", padding:"4px 0", borderBottom:j<d.items.length-1?"1px solid rgba(255,255,255,0.04)":"none" }}>{it}</div>)}
                </div>
              ))}
            </div>

            <div style={{ background:"rgba(34,197,94,0.07)", border:"1px solid rgba(34,197,94,0.18)", borderRadius:12, padding:22 }}>
              <h3 style={{ fontFamily:S.ff, fontSize:15, fontWeight:600, color:"#22c55e", marginBottom:8 }}>💡 Hallazgo Central</h3>
              <p style={{ fontSize:14.5, lineHeight:1.7, color:"rgba(255,255,255,0.7)" }}>
                La <strong style={{ color:"#e8e6e1" }}>secuenciación y alineación</strong> de gobernanza, regulación y política – no un instrumento individual – determina si el desarrollo del hidrógeno avanza de estrategia a inversión bancable. Los países exitosos combinan liderazgo institucional claro, marcos regulatorios progresivos y soporte de política que evoluciona con la madurez del mercado.
              </p>
            </div>
          </div>
        )}

        {/* COUNTRIES LIST */}
        {section==="countries" && !selCountry && (
          <div style={{ animation:"fadeUp 0.5s ease" }}>
            <h2 style={{ fontFamily:S.ff, fontSize:20, fontWeight:600, marginBottom:22 }}>11 Países de Referencia</h2>
            {["advanced","medium","emerging","peer"].map(tier => (
              <div key={tier} style={{ marginBottom:28 }}>
                <div style={{ fontFamily:S.ff, fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:tc[tier].text, marginBottom:10, display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ width:20, height:2, background:tc[tier].border, borderRadius:1 }} />
                  {tierLabels[tier]}
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:10 }}>
                  {Object.entries(COUNTRIES).filter(([,c])=>c.tier===tier).map(([k,c]) => (
                    <button key={k} onClick={()=>setSelCountry(k)}
                      style={{ ...card, cursor:"pointer", textAlign:"left", padding:"18px 16px", transition:"all 0.25s", borderColor:"rgba(255,255,255,0.07)" }}
                      onMouseOver={e=>{e.currentTarget.style.borderColor=tc[tier].border;e.currentTarget.style.transform="translateY(-2px)"}}
                      onMouseOut={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.07)";e.currentTarget.style.transform="none"}}>
                      <div style={{ fontSize:26, marginBottom:6 }}>{c.flag}</div>
                      <div style={{ fontFamily:S.ff, fontSize:14, fontWeight:600, color:"#e8e6e1" }}>{c.name}</div>
                      <div style={{ fontSize:11.5, color:tc[tier].text, marginTop:3 }}>{c.tierLabel}</div>
                      <div style={{ fontSize:11.5, color:"rgba(255,255,255,0.4)", marginTop:6 }}>Liderazgo: {c.leadership}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* COUNTRY DETAIL */}
        {section==="countries" && selCountry && (() => {
          const c = COUNTRIES[selCountry];
          const t = tc[c.tier];
          return (
            <div style={{ animation:"fadeUp 0.4s ease" }}>
              <button onClick={()=>setSelCountry(null)} style={{ background:"none", border:"none", color:"#22c55e", cursor:"pointer", fontFamily:S.ff, fontSize:12.5, padding:0, marginBottom:20 }}>← Volver</button>
              <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:28 }}>
                <span style={{ fontSize:52 }}>{c.flag}</span>
                <div>
                  <h2 style={{ fontFamily:S.ff, fontSize:26, fontWeight:700 }}>{c.name}</h2>
                  <span style={{ fontFamily:S.ff, fontSize:12, padding:"2px 10px", borderRadius:16, background:t.bg, color:t.text, border:`1px solid ${t.border}`, fontWeight:600 }}>{c.tierLabel}</span>
                </div>
              </div>

              {/* Gov */}
              <div style={{ ...card, marginBottom:16 }}>
                <h3 style={{ fontFamily:S.ff, fontSize:15, fontWeight:600, color:"#22c55e", marginBottom:14 }}>Gobernanza e Instituciones</h3>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:14 }}>
                  {[["Estrategia",c.strategy],["Integración",c.integration],["Liderazgo",c.leadership],["Coordinación",c.coordination],["Monitoreo",c.monitoring],["Stakeholders",c.stakeholder],["Coop. Internacional",c.intlCoop]].map(([l,v],i) => (
                    <div key={i}>
                      <div style={{ fontFamily:S.ff, fontSize:10.5, color:"rgba(255,255,255,0.4)", marginBottom:3, textTransform:"uppercase", letterSpacing:1 }}>{l}</div>
                      <div style={{ fontSize:13, color:"rgba(255,255,255,0.8)" }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legal */}
              <div style={{ ...card, marginBottom:16 }}>
                <h3 style={{ fontFamily:S.ff, fontSize:15, fontWeight:600, color:"#3b82f6", marginBottom:14 }}>Fundamentos Legales y Regulatorios</h3>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:14 }}>
                  {[["Definiciones H₂",c.definitions],["Regulación",c.regulation],["Certificación",c.certification],["Alineación Intl.",c.certAlignment],["Brechas",c.gaps]].map(([l,v],i) => (
                    <div key={i}>
                      <div style={{ fontFamily:S.ff, fontSize:10.5, color:"rgba(255,255,255,0.4)", marginBottom:5, textTransform:"uppercase", letterSpacing:1 }}>{l}</div>
                      <RatingBar level={v} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Policy */}
              <div style={{ ...card, marginBottom:16 }}>
                <h3 style={{ fontFamily:S.ff, fontSize:15, fontWeight:600, color:"#a855f7", marginBottom:14 }}>Palancas de Política</h3>
                {Object.entries(c.policyLevers).map(([k,v],i) => {
                  const labels = {fiscal:"Incentivos Fiscales",publicFunding:"Financiamiento Público",revenueSupport:"Soporte de Ingresos",standards:"Estándares y Certificación",infrastructure:"Infraestructura"};
                  return (
                    <div key={i} style={{ padding:"10px 0", borderBottom:i<4?"1px solid rgba(255,255,255,0.05)":"none" }}>
                      <div style={{ fontFamily:S.ff, fontSize:11.5, fontWeight:600, color:"#a855f7", marginBottom:3 }}>{labels[k]}</div>
                      <div style={{ fontSize:13.5, color:"rgba(255,255,255,0.65)", lineHeight:1.5 }}>{v}</div>
                    </div>
                  );
                })}
              </div>

              {/* Strengths */}
              <div style={{ ...card, marginBottom:16 }}>
                <h3 style={{ fontFamily:S.ff, fontSize:15, fontWeight:600, color:"#eab308", marginBottom:12 }}>Fortalezas Clave</h3>
                {c.strengths.map((s,i) => (
                  <div key={i} style={{ display:"flex", gap:9, padding:"6px 0" }}>
                    <span style={{ color:"#22c55e", fontSize:12, marginTop:2 }}>✦</span>
                    <span style={{ fontSize:13.5, color:"rgba(255,255,255,0.7)", lineHeight:1.5 }}>{s}</span>
                  </div>
                ))}
              </div>

              {/* Lesson */}
              <div style={{ background:"rgba(34,197,94,0.07)", border:"1px solid rgba(34,197,94,0.18)", borderRadius:12, padding:22 }}>
                <h3 style={{ fontFamily:S.ff, fontSize:15, fontWeight:600, color:"#22c55e", marginBottom:7 }}>🇲🇽 Lección para México</h3>
                <p style={{ fontSize:14, color:"rgba(255,255,255,0.75)", lineHeight:1.6 }}>{c.lessonForMexico}</p>
              </div>
            </div>
          );
        })()}

        {/* COMPARE */}
        {section==="compare" && (
          <div style={{ animation:"fadeUp 0.5s ease" }}>
            <h2 style={{ fontFamily:S.ff, fontSize:20, fontWeight:600, marginBottom:6 }}>Comparar Países</h2>
            <p style={{ fontSize:13, color:"rgba(255,255,255,0.45)", marginBottom:18 }}>Selecciona hasta 4 países</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginBottom:24 }}>
              {Object.entries(COUNTRIES).map(([k,c]) => (
                <button key={k} onClick={()=>toggleCmp(k)}
                  style={{ background:compareList.includes(k)?"rgba(34,197,94,0.13)":"rgba(255,255,255,0.025)", border:`1px solid ${compareList.includes(k)?"#22c55e":"rgba(255,255,255,0.08)"}`, borderRadius:18, padding:"5px 12px", cursor:"pointer", fontSize:12.5, fontFamily:S.ff, color:compareList.includes(k)?"#22c55e":"rgba(255,255,255,0.55)", transition:"all 0.2s" }}>
                  {c.flag} {c.name}
                </button>
              ))}
            </div>
            {compareList.length>=2 ? (
              <div style={{ overflowX:"auto" }}>
                <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12.5, fontFamily:S.ff }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign:"left", padding:"10px 14px", borderBottom:"1px solid rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.45)", fontWeight:500, minWidth:140 }}>Indicador</th>
                      {compareList.map(k => <th key={k} style={{ textAlign:"left", padding:"10px 14px", borderBottom:"1px solid rgba(255,255,255,0.08)", color:tc[COUNTRIES[k].tier].text, fontWeight:600, minWidth:150 }}>{COUNTRIES[k].flag} {COUNTRIES[k].name}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Madurez",k=>COUNTRIES[k].tierLabel],["Integración",k=>COUNTRIES[k].integration],["Liderazgo",k=>COUNTRIES[k].leadership],["Coordinación",k=>COUNTRIES[k].coordination],["Monitoreo",k=>COUNTRIES[k].monitoring],["Definiciones H₂",k=>COUNTRIES[k].definitions],["Regulación",k=>COUNTRIES[k].regulation],["Certificación",k=>COUNTRIES[k].certification],["Brechas",k=>COUNTRIES[k].gaps],["Coop. Intl.",k=>COUNTRIES[k].intlCoop]
                    ].map(([l,fn],i) => (
                      <tr key={i} style={{ background:i%2===0?"rgba(255,255,255,0.012)":"transparent" }}>
                        <td style={{ padding:"9px 14px", borderBottom:"1px solid rgba(255,255,255,0.04)", color:"rgba(255,255,255,0.55)", fontWeight:500 }}>{l}</td>
                        {compareList.map(k => <td key={k} style={{ padding:"9px 14px", borderBottom:"1px solid rgba(255,255,255,0.04)", color:"rgba(255,255,255,0.78)" }}>{fn(k)}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ textAlign:"center", padding:50, color:"rgba(255,255,255,0.25)", fontSize:14, fontStyle:"italic" }}>Selecciona al menos 2 países</div>
            )}
          </div>
        )}

        {/* MEXICO */}
        {section==="mexico" && (
          <div style={{ animation:"fadeUp 0.5s ease" }}>
            <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:28 }}>
              <span style={{ fontSize:52 }}>🇲🇽</span>
              <div>
                <h2 style={{ fontFamily:S.ff, fontSize:26, fontWeight:700 }}>México</h2>
                <span style={{ fontFamily:S.ff, fontSize:12, padding:"2px 10px", borderRadius:16, background:"rgba(249,115,22,0.12)", color:"#fb923c", border:"1px solid #f97316", fontWeight:600 }}>Etapa Formativa</span>
              </div>
            </div>

            <div style={{ background:"rgba(249,115,22,0.07)", border:"1px solid rgba(249,115,22,0.18)", borderRadius:12, padding:22, marginBottom:28 }}>
              <h3 style={{ fontFamily:S.ff, fontSize:15, fontWeight:600, color:"#f97316", marginBottom:12 }}>Situación Actual</h3>
              {[
                "Etapa formativa: la mayoría de proyectos en fase de concepto o factibilidad",
                "Sin legislación específica de hidrógeno – Lineamientos emitidos en 2024",
                "Responsabilidades institucionales dispersas entre múltiples entidades federales",
                "Potencial renovable fuerte (solar y eólico) pero sin marcos habilitantes",
                "Demanda industrial existente: refinación, químicos, minería, fertilizantes (~390,000 t H₂/año)",
                "Pipeline de 12 proyectos anunciados – ninguno con decisión final de inversión"
              ].map((it,i) => (
                <div key={i} style={{ display:"flex", gap:9, padding:"5px 0" }}>
                  <span style={{ color:"#f97316", fontSize:9, marginTop:5 }}>●</span>
                  <span style={{ fontSize:13.5, color:"rgba(255,255,255,0.7)", lineHeight:1.5 }}>{it}</span>
                </div>
              ))}
            </div>

            <h3 style={{ fontFamily:S.ff, fontSize:18, fontWeight:600, marginBottom:18, color:"#22c55e" }}>Ruta de Acción Recomendada</h3>
            {["Inmediato","Corto plazo","Mediano plazo"].map(phase => (
              <div key={phase} style={{ marginBottom:24 }}>
                <div style={{ fontFamily:S.ff, fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", marginBottom:10, color:phase==="Inmediato"?"#ef4444":phase==="Corto plazo"?"#eab308":"#22c55e" }}>● {phase}</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:12 }}>
                  {MEXICO_RECS.filter(r=>r.phase===phase).map((r,i) => (
                    <div key={i} style={{ ...card, padding:"18px 18px" }}>
                      <div style={{ fontSize:22, marginBottom:6 }}>{r.icon}</div>
                      <h4 style={{ fontFamily:S.ff, fontSize:14, fontWeight:600, marginBottom:6, color:"#e8e6e1" }}>{r.title}</h4>
                      <p style={{ fontSize:12.5, color:"rgba(255,255,255,0.6)", lineHeight:1.55, marginBottom:8 }}>{r.description}</p>
                      <div style={{ fontSize:10.5, color:"rgba(255,255,255,0.35)" }}>Ref: {r.ref.join(", ")}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BARRIERS */}
        {section==="barriers" && (
          <div style={{ animation:"fadeUp 0.5s ease" }}>
            <h2 style={{ fontFamily:S.ff, fontSize:20, fontWeight:600, marginBottom:6 }}>Barreras Globales al Hidrógeno Verde</h2>
            <p style={{ fontSize:13, color:"rgba(255,255,255,0.45)", marginBottom:24, lineHeight:1.6 }}>Barreras estructurales observadas en todos los mercados. La diferencia entre escalar y estancarse está en cómo se abordan de forma secuenciada.</p>
            <div style={{ display:"grid", gap:14 }}>
              {BARRIERS.map((b,i) => (
                <div key={i} style={{ ...card, display:"flex", gap:18, alignItems:"flex-start" }}>
                  <span style={{ fontSize:32, lineHeight:1 }}>{b.icon}</span>
                  <div>
                    <h3 style={{ fontFamily:S.ff, fontSize:15, fontWeight:600, marginBottom:4, color:"#e8e6e1" }}>{b.name}</h3>
                    <p style={{ fontSize:13.5, color:"rgba(255,255,255,0.55)", lineHeight:1.5 }}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop:28, background:"rgba(59,130,246,0.07)", border:"1px solid rgba(59,130,246,0.18)", borderRadius:12, padding:22 }}>
              <h3 style={{ fontFamily:S.ff, fontSize:15, fontWeight:600, color:"#3b82f6", marginBottom:14 }}>Mapeo Barreras → Dimensiones</h3>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:14 }}>
                {[
                  { b:"Coordinación y fragmentación", d:"Gobernanza e Instituciones", c:"#22c55e" },
                  { b:"Incertidumbre regulatoria", d:"Fundamentos Legales", c:"#3b82f6" },
                  { b:"Costos, demanda e infraestructura", d:"Palancas de Política", c:"#a855f7" }
                ].map((m,i) => (
                  <div key={i} style={{ padding:14, borderRadius:8, background:"rgba(255,255,255,0.025)", borderLeft:`3px solid ${m.c}` }}>
                    <div style={{ fontFamily:S.ff, fontSize:10.5, color:"rgba(255,255,255,0.4)", marginBottom:4 }}>Barrera</div>
                    <div style={{ fontSize:13, fontWeight:500, color:"rgba(255,255,255,0.8)", marginBottom:8 }}>{m.b}</div>
                    <div style={{ fontFamily:S.ff, fontSize:10.5, color:"rgba(255,255,255,0.4)", marginBottom:3 }}>Dimensión</div>
                    <div style={{ fontSize:13, fontWeight:600, color:m.c }}>{m.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FINDINGS */}
        {section==="findings" && (
          <div style={{ animation:"fadeUp 0.5s ease" }}>
            <h2 style={{ fontFamily:S.ff, fontSize:20, fontWeight:600, marginBottom:24 }}>Hallazgos Clave del Benchmarking</h2>
            {[
              { dim:"Gobernanza e Instituciones", c:"#22c55e", items:[
                { t:"La madurez de gobernanza es el mayor diferenciador", d:"Países que escalan anclan hidrógeno en estrategias vinculantes e integran en energía, clima e industria." },
                { t:"Liderazgo híbrido energía-industria domina", d:"Sistemas maduros abarcan energía e industria (Alemania, Japón); etapa temprana solo energía." },
                { t:"Coordinación formal distingue mercados maduros", d:"Mercados establecidos: coordinación interministerial formal. Tempranos: informal o por proyecto." },
                { t:"Cooperación internacional se institucionaliza con exportación", d:"Países exportadores institucionalizan cooperación (Países Bajos, Japón)." }
              ]},
              { dim:"Fundamentos Legales y Regulatorios", c:"#3b82f6", items:[
                { t:"Todos retienen brechas, incluso líderes", d:"Jurisdicciones avanzadas enfrentan temas de escalamiento e integración (UK, Alemania)." },
                { t:"Claridad regulatoria mejora por iteración", d:"Países refinan reglas progresivamente conforme proyectos avanzan." },
                { t:"Definiciones claras anclan antes de profundizar", d:"Primero umbrales de emisiones y reglas de electricidad, luego certificación." },
                { t:"Legislación dedicada solo a escala avanzada", d:"Leyes de hidrógeno emergen tarde, reflejando complejidad (Corea del Sur)." }
              ]},
              { dim:"Palancas de Política", c:"#a855f7", items:[
                { t:"Secuenciación importa más que cualquier palanca", d:"Ningún instrumento solo explica éxito. Depende de secuencia de pilotos a escala." },
                { t:"Soporte de ingresos separa pilotos de escala", d:"Mecanismos CfD cierran brecha de costos (H2Global, HPBM)." },
                { t:"Anclaje de demanda sustituye subsidios de producción", d:"Demanda garantizada vía offtake regulado (Corea del Sur)." },
                { t:"Infraestructura crítica al escalar en paralelo", d:"Coordinación de infraestructura pasa de opcional a esencial." }
              ]}
            ].map((s,si) => (
              <div key={si} style={{ marginBottom:32 }}>
                <h3 style={{ fontFamily:S.ff, fontSize:16, fontWeight:600, color:s.c, paddingBottom:8, borderBottom:`2px solid ${s.c}30`, marginBottom:14 }}>{s.dim}</h3>
                <div style={{ display:"grid", gap:10 }}>
                  {s.items.map((f,fi) => (
                    <div key={fi} style={{ ...card, padding:"16px 18px" }}>
                      <div style={{ fontFamily:S.ff, fontSize:13.5, fontWeight:600, color:"rgba(255,255,255,0.88)", marginBottom:4 }}>{f.t}</div>
                      <div style={{ fontSize:12.5, color:"rgba(255,255,255,0.55)", lineHeight:1.55 }}>{f.d}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div style={{ background:"rgba(168,85,247,0.07)", border:"1px solid rgba(168,85,247,0.18)", borderRadius:12, padding:22 }}>
              <h3 style={{ fontFamily:S.ff, fontSize:15, fontWeight:600, color:"#a855f7", marginBottom:8 }}>Conclusión</h3>
              <p style={{ fontSize:13.5, color:"rgba(255,255,255,0.7)", lineHeight:1.7 }}>
                El progreso más allá de pilotos se determina menos por instrumentos individuales y más por cómo gobernanza, regulación y soporte de política se combinan y secuencian. Los marcos evolucionan incrementalmente – mercados tempranos usan estructuras existentes, con regulación específica e infraestructura emergiendo conforme el despliegue escala.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
