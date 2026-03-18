import { useState, useEffect, useRef, useCallback } from "react";

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
  bg: "#FFFFFF",
  surface: "#F8F9FA",
  border: "#DDDDDD",
};

const FF = {
  h: "'Merriweather', 'Georgia', serif",
  b: "'Noto Sans', sans-serif",
};

function useExport() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (window.html2canvas) { setOk(true); return; }
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
    s.onload = () => setOk(true);
    document.head.appendChild(s);
  }, []);
  const go = useCallback(async (ref, name) => {
    if (!ref.current || !window.html2canvas) return;
    const cv = await window.html2canvas(ref.current, {
      backgroundColor: "#fff", scale: 3, useCORS: true, logging: false,
    });
    const a = document.createElement("a");
    a.download = `${name}.png`;
    a.href = cv.toDataURL("image/png");
    a.click();
  }, []);
  return { go, ok };
}

function DLBtn({ onClick, ok }) {
  return (
    <button onClick={onClick} disabled={!ok} style={{
      fontFamily: FF.b, fontSize: 10.5, fontWeight: 600,
      background: ok ? C.verde : C.grisCl, color: ok ? "#fff" : C.gris,
      border: "none", borderRadius: 4, padding: "5px 12px",
      cursor: ok ? "pointer" : "default",
      display: "inline-flex", alignItems: "center", gap: 4,
    }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      PNG
    </button>
  );
}

function HBar({ value, max = 5, color = C.verde, label }) {
  const pct = (value / max) * 100;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ flex: 1, height: 7, background: C.grisCl, borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 4, transition: "width 0.7s ease" }} />
      </div>
      {label && <span style={{ fontSize: 10.5, color: C.gris, minWidth: 32, fontFamily: FF.b }}>{label}</span>}
    </div>
  );
}

const ENTITIES = [
  { entity: "SENER", role: "Política energética, Lineamientos H₂", type: "Estrategia", c: C.guinda },
  { entity: "SEMARNAT", role: "Evaluación de impacto ambiental, permisos ambientales", type: "Ambiental", c: C.verde },
  { entity: "CONAGUA", role: "Permisos de uso de agua para electrólisis", type: "Agua", c: "#2563a0" },
  { entity: "CRE", role: "Regulación eléctrica, interconexión a red", type: "Energía", c: C.dorado },
  { entity: "CENACE", role: "Despacho del sistema eléctrico, conexión de electrolizadores", type: "Red", c: "#555" },
  { entity: "ASEA", role: "Seguridad industrial en actividades de energía", type: "Seguridad", c: C.guinda },
  { entity: "Autoridades estatales y municipales", role: "Uso de suelo, zonificación, permisos de construcción", type: "Local", c: C.gris },
  { entity: "Autoridades portuarias", role: "Terminales, logística de exportación de H₂/amoniaco", type: "Transporte", c: C.verde },
];

const AXES = [
  {
    title: "Integración Prioritaria y Vía Rápida",
    subtitle: "Fast-track para proyectos estratégicos de H₂",
    color: C.guinda, icon: "⚡",
    what: "Crear un canal acelerado para proyectos de hidrógeno que cumplan ciertos criterios (escala, ubicación en clusters estratégicos, contribución a metas NDC). Los proyectos calificados tendrían plazos máximos vinculantes para cada etapa del permiso y se les presumiría interés público preponderante.",
    how: [
      "Definir criterios de elegibilidad para vía rápida (capacidad mínima, ubicación en cluster, compromiso de inversión)",
      "Establecer plazos máximos por etapa: MIA simplificada (3 meses), permisos de agua (2 meses), interconexión eléctrica (4 meses)",
      "Aplicar presunción de interés público: el proyecto prevalece sobre restricciones de uso de suelo a menos que haya justificación ambiental específica",
      "Silencio administrativo positivo: si la autoridad no responde en plazo, se entiende otorgado el permiso",
    ],
    intl: "La UE adoptó en diciembre 2025 la Directiva de Aceleración de Permisos con plazos vinculantes y silencio positivo. Alemania creó una task force dedicada para MIA de H₂. El NZIA de la UE (2024) otorga estatus de 'proyecto estratégico net-zero' con permisos acelerados.",
    risks: ["Riesgo de debilitar evaluación ambiental", "Necesidad de dotar de recursos a autoridades", "Posible resistencia de autoridades locales"],
  },
  {
    title: "Ventanilla Única (One-Stop-Shop)",
    subtitle: "Un solo punto de contacto para todos los permisos",
    color: C.verde, icon: "🏢",
    what: "Consolidar todos los trámites en un solo punto de contacto institucional. El desarrollador interactúa con una sola ventanilla que coordina internamente con SEMARNAT, CONAGUA, CRE, CENACE y autoridades locales. Esto elimina la necesidad de navegar múltiples procesos en paralelo.",
    how: [
      "Designar a SENER (o un organismo delegado) como ventanilla única para proyectos de H₂",
      "La ventanilla recibe una sola solicitud integrada y la distribuye a cada autoridad competente",
      "Cada autoridad emite su resolución dentro de plazos coordinados",
      "El desarrollador recibe un solo paquete de resoluciones",
      "Digitalizar el proceso: portal único de seguimiento y presentación",
    ],
    intl: "La RED III de la UE exige ventanillas únicas para renovables en todos los estados miembros. Países Bajos y Alemania ya operan one-stop-shops para proyectos energéticos. La UE reporta que el 60% de proyectos ya tienen presentación digital completa.",
    risks: ["Requiere acuerdo interinstitucional fuerte", "Necesita inversión en plataforma digital", "Cuello de botella si la ventanilla no tiene capacidad"],
  },
  {
    title: "Planificación Integrada en Redes",
    subtitle: "Conectar electrolizadores al sistema eléctrico y de transporte de H₂",
    color: C.dorado, icon: "🔌",
    what: "Integrar los electrolizadores y la infraestructura de H₂ en la planificación de redes eléctricas y de gas desde el inicio. No esperar a que los proyectos soliciten conexión individualmente, sino planificar la capacidad de red necesaria en clusters estratégicos.",
    how: [
      "CENACE incluye demanda de electrolizadores en su planificación de expansión de red",
      "Identificar zonas con capacidad de red existente o ampliable para clusters de H₂",
      "Establecer reglas claras de conexión a red para electrolizadores (prioridad, tarifas, balanceo)",
      "Planificar corredores de transporte de H₂ (ductos nuevos o reconversión de gasoductos)",
      "Coordinar con CFE y CENAGAS la planificación de infraestructura compartida",
    ],
    intl: "La UE creó ENNOH (red europea de operadores de hidrógeno) para planificación coordinada. Países Bajos reconvierte gasoductos de Gasunie a H₂. UK integra electrolizadores en planificación de National Grid. La Directiva UE exige planes de red de H₂ a 10 años.",
    risks: ["Coordinación CENACE-CENAGAS-CFE sin precedente", "Inversiones en red necesitan horizonte largo", "Sobredimensionar si demanda tarda"],
  },
  {
    title: "Entorno Regulatorio Controlado (Sandbox)",
    subtitle: "Espacio para probar reglas sin el peso de todo el marco",
    color: "#666", icon: "🧪",
    what: "Un espacio donde los primeros proyectos operan bajo reglas simplificadas, temporales y supervisadas. No es exención de regulación, sino un marco controlado que permite aprender qué reglas funcionan antes de legislar para todo el sector.",
    how: [
      "Definir alcance: número limitado de proyectos (5-10), duración (3-5 años), ubicación en clusters designados",
      "Otorgar permisos temporales con condiciones de monitoreo reforzado",
      "Permitir excepciones controladas a regulación que no tiene versión adaptada a H₂",
      "Recopilar datos y lecciones para diseñar regulación definitiva",
      "Mecanismo de salida: cómo transita el proyecto del sandbox al marco normal",
    ],
    intl: "Colombia usa sandboxes regulatorios para pilotos con Ecopetrol. La UE recomienda 'exenciones legislativas dirigidas para tecnologías innovadoras'. El Innovation Fund europeo reporta que proyectos sugieren sandboxes como solución prioritaria.",
    risks: ["Puede percibirse como falta de regulación", "Necesita supervisión activa", "Dificultad de transición al marco definitivo"],
  },
];

const INTL = [
  { c: "UE", f: "🇪🇺", ft: 5, os: 5, gp: 5, sb: 4, note: "Directiva de Aceleración (dic 2025): plazos vinculantes, silencio positivo. ENNOH para redes de H₂. NZIA con estatus estratégico." },
  { c: "Alemania", f: "🇩🇪", ft: 4, os: 4, gp: 5, sb: 3, note: "Task force para MIA de H₂. BNetzA planifica backbone. Länder con coordinación federal." },
  { c: "Países Bajos", f: "🇳🇱", ft: 4, os: 5, gp: 5, sb: 3, note: "Gasunie reconvierte gasoductos. Rotterdam como hub con permisos coordinados." },
  { c: "Reino Unido", f: "🇬🇧", ft: 4, os: 4, gp: 4, sb: 3, note: "Clusters designados con permisos coordinados. National Grid planifica integración." },
  { c: "Australia", f: "🇦🇺", ft: 3, os: 3, gp: 3, sb: 3, note: "Estados lideran permisos. AEMO incluye H₂ en planificación eléctrica." },
  { c: "Corea del Sur", f: "🇰🇷", ft: 4, os: 3, gp: 4, sb: 3, note: "Ley de Economía del H₂ cubre permisos. KOGAS planifica terminales." },
  { c: "India", f: "🇮🇳", ft: 3, os: 2, gp: 2, sb: 2, note: "NGHM agiliza permisos para electrolizadores. Portal digital. Fragmentación estatal." },
  { c: "Colombia", f: "🇨🇴", ft: 1, os: 1, gp: 1, sb: 3, note: "Sandboxes operativos con Ecopetrol. Sin ventanilla ni planificación de redes." },
  { c: "México", f: "🇲🇽", ft: 0, os: 0, gp: 0, sb: 0, note: "Sin mecanismos dedicados. 8+ entidades sin coordinación. Lineamientos 2024 no cubren permisos." },
];

const TIMELINE = [
  { phase: "Inmediato (2026)", c: C.guinda, items: [
    { t: "Mapear el proceso actual completo", d: "Documentar paso a paso los permisos que un proyecto de H₂ necesita: MIA, agua, interconexión, conexión, seguridad, uso de suelo. Identificar tiempos reales, cuellos de botella y duplicaciones." },
    { t: "Designar a SENER como coordinador de permisos de H₂", d: "No requiere nueva ley. SENER asume rol de facilitador que coordina con las demás entidades. Primer paso hacia la ventanilla única." },
    { t: "Definir criterios para proyectos estratégicos", d: "Qué proyectos califican para tratamiento prioritario: capacidad mínima, ubicación en cluster, contribución a NDC, compromiso de inversión verificable." },
  ]},
  { phase: "Corto plazo (2026–2027)", c: C.dorado, items: [
    { t: "Lanzar sandbox regulatorio en 2-3 clusters", d: "Sonora-Baja California, Nuevo León-Tamaulipas y/o Veracruz. 5-10 proyectos piloto bajo reglas simplificadas con monitoreo reforzado. Duración: 3-5 años." },
    { t: "Crear ventanilla única digital", d: "Portal donde el desarrollador presenta una sola solicitud que se distribuye internamente. Requiere convenios con SEMARNAT, CONAGUA, CRE, CENACE." },
    { t: "Establecer plazos máximos por etapa", d: "Tiempos vinculantes: MIA simplificada (90 días), agua (60 días), interconexión (120 días), uso de suelo (60 días). Silencio administrativo positivo." },
    { t: "Incluir electrolizadores en planificación de CENACE", d: "CENACE y CENAGAS consideran demanda de electrolizadores en expansión y contemplan reconversión de gasoductos." },
  ]},
  { phase: "Mediano plazo (2027–2029)", c: C.verde, items: [
    { t: "Regulación secundaria de permisos de H₂", d: "Basada en lecciones del sandbox, formalizar vía rápida, ventanilla única y plazos vinculantes. Publicar en DOF como acuerdos SENER-SEMARNAT-CONAGUA." },
    { t: "Plan de red de hidrógeno a 10 años", d: "CENAGAS desarrolla plan vinculado a clusters, puertos y demanda industrial. Gasoductos reconvertibles y rutas nuevas." },
    { t: "Estatus de proyecto de interés público para H₂", d: "Vía decreto, presunción de interés público preponderante para proyectos estratégicos, similar al modelo UE." },
    { t: "Graduar proyectos del sandbox al marco regulatorio", d: "Definir cómo un proyecto piloto obtiene permisos definitivos basados en la experiencia del sandbox." },
  ]},
];

const QUESTIONS = [
  { cat: "Vía Rápida y Priorización", c: C.guinda, qs: [
    "¿Qué criterios definen un 'proyecto estratégico de H₂' elegible para vía rápida?",
    "¿Es viable el silencio administrativo positivo en México dado el marco legal actual?",
    "¿Cómo se evita que la vía rápida debilite la evaluación ambiental?",
    "¿Se necesita reforma legislativa o basta con regulación secundaria?",
    "¿Qué pasa con proyectos que no califican para vía rápida?",
  ]},
  { cat: "Ventanilla Única", c: C.verde, qs: [
    "¿Quién opera la ventanilla: SENER, un organismo desconcentrado o una unidad nueva?",
    "¿Qué autoridades estarían obligadas a participar y bajo qué convenio?",
    "¿Es factible la digitalización completa en el corto plazo?",
    "¿Cómo se manejan las competencias de autoridades estatales y municipales?",
    "¿Quién arbitra cuando dos autoridades tienen criterios contradictorios?",
  ]},
  { cat: "Planificación de Redes", c: C.dorado, qs: [
    "¿Tiene CENACE mandato para incluir electrolizadores en su planificación?",
    "¿Es viable la reconversión de gasoductos a hidrógeno? ¿Bajo qué marco legal?",
    "¿Quién financia la expansión de red: presupuesto público, desarrolladores o tarifas?",
    "¿Cómo se conecta con la planificación de renovables (PRODESEN)?",
    "¿Se necesita un operador de red de H₂ dedicado o CENAGAS absorbe la función?",
  ]},
  { cat: "Sandbox Regulatorio", c: "#666", qs: [
    "¿Cuántos proyectos entran al sandbox y con qué criterios?",
    "¿Qué permisos se simplifican y cuáles se mantienen (ej. seguridad)?",
    "¿Cómo se sistematizan lecciones para alimentar regulación definitiva?",
    "¿Los permisos temporales se convierten automáticamente en definitivos?",
    "¿Cómo se manejan riesgos ambientales y de seguridad con reglas simplificadas?",
  ]},
  { cat: "Vinculación con Programas Públicos", c: C.guinda, qs: [
    "¿Los incentivos fiscales futuros deberían condicionarse a usar la ventanilla única?",
    "¿Los contratos CfD exigirán permisos vía rápida como condición?",
    "¿Cómo se integra el proceso de permisos con el esquema de certificación?",
    "¿Se priorizará en programas públicos a proyectos en clusters con sandbox?",
    "¿Cómo se evita que el sistema de permisos sea la barrera principal?",
  ]},
];

const NAV = [
  { id: "problema", label: "El Problema", icon: "⚠️" },
  { id: "ejes", label: "4 Ejes de Solución", icon: "🔧" },
  { id: "internacional", label: "Internacional", icon: "🌍" },
  { id: "mexico", label: "Propuesta México", icon: "🇲🇽" },
  { id: "preguntas", label: "Preguntas", icon: "❓" },
];

export default function App() {
  const [ready, setReady] = useState(false);
  const [sec, setSec] = useState("problema");
  const { go, ok: pngOk } = useExport();

  const refEntities = useRef(null);
  const refAxes = useRef(null);
  const refIntl = useRef(null);
  const refTimeline = useRef(null);
  const refQuestions = useRef(null);

  useEffect(() => {
    setTimeout(() => setReady(true), 100);
  }, []);

  const cardStyle = {
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 8,
    padding: "20px 18px",
  };

  return (
    <div style={{ fontFamily: FF.b, background: C.bg, color: C.text, minHeight: "100vh", lineHeight: 1.65 }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,400&family=Noto+Sans:ital,wght@0,400;0,600;0,700;1,400&display=swap"
        rel="stylesheet"
      />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        ::selection { background: rgba(155,34,71,0.15); }
        @media print { .no-print { display: none !important; } }
      `}</style>

      {/* GobMX bar */}
      <div style={{ background: C.guinda, height: 5 }} />

      {/* Header */}
      <header style={{
        background: C.bg, borderBottom: `1px solid ${C.border}`,
        padding: "22px 24px 18px",
        opacity: ready ? 1 : 0,
        transform: ready ? "none" : "translateY(-10px)",
        transition: "all 0.6s ease",
      }}>
        <div style={{ maxWidth: 940, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: C.gris, marginBottom: 8, fontWeight: 600 }}>
                Propuesta de Análisis · Secretaría de Energía
              </div>
              <h1 style={{ fontFamily: FF.h, fontSize: "clamp(20px,3vw,30px)", fontWeight: 700, lineHeight: 1.18, color: C.guinda, maxWidth: 680 }}>
                Agilizar el Otorgamiento de Permisos para Proyectos de Hidrógeno
              </h1>
              <p style={{ fontSize: 14, color: C.gris, marginTop: 6, fontStyle: "italic", maxWidth: 650, lineHeight: 1.5 }}>
                Integración prioritaria, vía rápida, planificación de redes y entorno regulatorio controlado
              </p>
            </div>
            <div style={{ textAlign: "right", fontSize: 11, color: C.gris, lineHeight: 1.6, flexShrink: 0 }}>
              <div style={{ fontWeight: 600 }}>Marzo 2026</div>
              <div style={{ marginTop: 6, padding: "3px 10px", border: `1px solid ${C.guinda}40`, color: C.guinda, borderRadius: 4, fontSize: 10, letterSpacing: 1, fontWeight: 600 }}>
                SENER · GCIEP
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Nav */}
      <nav className="no-print" style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${C.border}`,
        padding: "0 24px",
      }}>
        <div style={{ maxWidth: 940, margin: "0 auto", display: "flex", gap: 0, overflowX: "auto" }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => setSec(n.id)} style={{
              fontFamily: FF.b, fontSize: 11.5,
              fontWeight: sec === n.id ? 700 : 400,
              color: sec === n.id ? C.guinda : C.gris,
              background: "none", border: "none",
              padding: "11px 14px", cursor: "pointer",
              whiteSpace: "nowrap",
              borderBottom: sec === n.id ? `3px solid ${C.guinda}` : "3px solid transparent",
              marginBottom: -1, transition: "all 0.2s",
            }}>
              <span style={{ marginRight: 4 }}>{n.icon}</span>{n.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main style={{ maxWidth: 940, margin: "0 auto", padding: "26px 24px 72px" }}>

        {/* ═══ PROBLEMA ═══ */}
        {sec === "problema" && (
          <div style={{ animation: "fadeUp 0.5s ease" }}>
            <h2 style={{ fontFamily: FF.h, fontSize: 20, fontWeight: 700, color: C.guinda, marginBottom: 12, paddingBottom: 6, borderBottom: `2px solid ${C.guinda}` }}>
              El Problema: 8+ entidades, cero coordinación
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 14 }}>
              Hoy en México, un proyecto de hidrógeno verde necesita permisos de <strong>al menos 8 entidades diferentes</strong> que operan de forma independiente, con procesos que no se hablan entre sí. El desarrollador debe navegar cada proceso en paralelo, cumplir requisitos que a veces se contradicen, y asumir tiempos que nadie controla.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 24 }}>
              Esto no es exclusivo de México — es una barrera estructural identificada internacionalmente. La diferencia es que los países que avanzan han empezado a resolverlo. México aún no.
            </p>

            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
              <DLBtn onClick={() => go(refEntities, "mapa_permisos_mx")} ok={pngOk} />
            </div>
            <div ref={refEntities} style={{ background: "#fff", borderRadius: 8, padding: "22px 18px", border: `1px solid ${C.border}` }}>
              <div style={{ fontFamily: FF.h, fontSize: 14, fontWeight: 700, color: C.guinda, marginBottom: 14 }}>
                Entidades que un proyecto de H₂ debe navegar en México
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
                {ENTITIES.map((p, i) => (
                  <div key={i} style={{ ...cardStyle, borderLeft: `4px solid ${p.c}`, padding: "14px 14px" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: p.c }}>{p.entity}</div>
                    <div style={{ fontSize: 12, color: "#555", marginTop: 4, lineHeight: 1.45 }}>{p.role}</div>
                    <span style={{ fontSize: 10, fontWeight: 600, color: p.c, background: p.c + "12", padding: "1px 8px", borderRadius: 10, marginTop: 6, display: "inline-block", border: `1px solid ${p.c}25` }}>
                      {p.type}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ background: C.guindaLt, borderRadius: 6, padding: "14px 14px", marginTop: 16 }}>
                <p style={{ fontSize: 13, color: C.guinda, lineHeight: 1.55, fontWeight: 500 }}>
                  Resultado: los 12 proyectos anunciados en México están en fase de concepto o factibilidad. Ninguno ha llegado a decisión de inversión. La complejidad regulatoria es uno de los factores que lo explican.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ═══ EJES ═══ */}
        {sec === "ejes" && (
          <div style={{ animation: "fadeUp 0.5s ease" }}>
            <h2 style={{ fontFamily: FF.h, fontSize: 20, fontWeight: 700, color: C.guinda, marginBottom: 4, paddingBottom: 6, borderBottom: `2px solid ${C.guinda}` }}>
              Cuatro Ejes de Solución
            </h2>
            <p style={{ fontSize: 14, color: C.gris, marginBottom: 20 }}>
              Cada eje ataca un aspecto diferente del problema. Funcionan mejor combinados.
            </p>

            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
              <DLBtn onClick={() => go(refAxes, "ejes_solucion")} ok={pngOk} />
            </div>
            <div ref={refAxes} style={{ display: "grid", gap: 18, background: "#fff", padding: 8 }}>
              {AXES.map((a, i) => (
                <div key={i} style={{ ...cardStyle, borderLeft: `5px solid ${a.color}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <span style={{ fontSize: 28 }}>{a.icon}</span>
                    <div>
                      <h3 style={{ fontFamily: FF.h, fontSize: 17, fontWeight: 700, color: a.color, lineHeight: 1.2 }}>
                        {a.title}
                      </h3>
                      <div style={{ fontSize: 12, color: C.gris }}>{a.subtitle}</div>
                    </div>
                  </div>

                  <p style={{ fontSize: 13.5, lineHeight: 1.65, color: "#444", marginBottom: 14 }}>{a.what}</p>

                  <div style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 10.5, fontWeight: 700, color: a.color, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>
                      Cómo funciona
                    </div>
                    {a.how.map((h, j) => (
                      <div key={j} style={{ display: "flex", gap: 8, padding: "3px 0" }}>
                        <span style={{ color: a.color, fontSize: 11, marginTop: 2, flexShrink: 0 }}>▸</span>
                        <span style={{ fontSize: 12.5, color: "#555", lineHeight: 1.5 }}>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: C.verdeLt, borderRadius: 6, padding: "10px 12px", marginBottom: 12 }}>
                    <div style={{ fontSize: 10.5, fontWeight: 700, color: C.verde, textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>
                      Referencia internacional
                    </div>
                    <p style={{ fontSize: 12, lineHeight: 1.55, color: "#444" }}>{a.intl}</p>
                  </div>

                  <div>
                    <div style={{ fontSize: 10.5, fontWeight: 700, color: C.gris, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
                      Riesgos a considerar
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {a.risks.map((rk, j) => (
                        <span key={j} style={{ fontSize: 11, background: "#fff3e0", color: "#c06000", padding: "3px 10px", borderRadius: 10, border: "1px solid #f0d0a0" }}>
                          {rk}
                        </span>
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
              Experiencia Internacional Comparada
            </h2>
            <p style={{ fontSize: 14, color: C.gris, marginBottom: 20 }}>
              Cómo otros países están resolviendo el problema de permisos para hidrógeno.
            </p>

            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
              <DLBtn onClick={() => go(refIntl, "comparativo_permisos")} ok={pngOk} />
            </div>
            <div ref={refIntl} style={{ background: "#fff", borderRadius: 8, padding: "22px 18px", border: `1px solid ${C.border}`, overflowX: "auto" }}>
              <div style={{ fontFamily: FF.h, fontSize: 14, fontWeight: 700, color: C.guinda, marginBottom: 14 }}>
                Madurez en agilización de permisos para H₂
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: FF.b }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${C.guinda}` }}>
                    {["País", "Vía Rápida", "Ventanilla", "Redes", "Sandbox", "Nota clave"].map((h, i) => (
                      <th key={i} style={{ textAlign: "left", padding: "8px 8px", fontWeight: 700, color: C.guinda, fontSize: 10, letterSpacing: 0.5, textTransform: "uppercase" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {INTL.map((row, i) => {
                    const isMX = row.c === "México";
                    return (
                      <tr key={i} style={{ borderBottom: `1px solid ${C.grisCl}`, background: isMX ? C.guindaLt : i % 2 === 0 ? C.surface : "#fff" }}>
                        <td style={{ padding: "9px 8px", fontWeight: 700, fontSize: 12.5, whiteSpace: "nowrap" }}>
                          {row.f} {row.c}
                        </td>
                        {[row.ft, row.os, row.gp, row.sb].map((v, j) => (
                          <td key={j} style={{ padding: "9px 8px" }}>
                            <HBar
                              value={v} max={5}
                              color={v === 0 ? "#ddd" : v >= 4 ? C.verde : v >= 3 ? C.dorado : C.guinda}
                              label={`${v}/5`}
                            />
                          </td>
                        ))}
                        <td style={{ padding: "9px 8px", fontSize: 11, color: "#555", lineHeight: 1.4, maxWidth: 250 }}>
                          {row.note}
                        </td>
                      </tr>
                    );
                  })}
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
            <p style={{ fontSize: 14, color: C.gris, marginBottom: 20 }}>
              Secuencia de acciones para que SENER lidere la agilización de permisos.
            </p>

            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
              <DLBtn onClick={() => go(refTimeline, "ruta_permisos_mx")} ok={pngOk} />
            </div>
            <div ref={refTimeline} style={{
              background: "#fff", borderRadius: 8,
              padding: "26px 22px 26px 48px",
              border: `1px solid ${C.border}`,
              position: "relative",
            }}>
              <div style={{ fontFamily: FF.h, fontSize: 16, fontWeight: 700, color: C.guinda, marginBottom: 22 }}>
                Ruta de agilización de permisos
              </div>
              <div style={{
                position: "absolute", left: 32, top: 68, bottom: 30, width: 2,
                background: `linear-gradient(to bottom, ${C.guinda}, ${C.dorado}, ${C.verde})`,
                borderRadius: 1,
              }} />

              {TIMELINE.map((ph, pi) => (
                <div key={pi} style={{ marginBottom: 30 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, position: "relative" }}>
                    <div style={{
                      position: "absolute", left: -24, width: 16, height: 16, borderRadius: "50%",
                      background: ph.c, border: "3px solid #fff",
                      boxShadow: `0 0 0 2px ${ph.c}40`,
                    }} />
                    <h3 style={{ fontFamily: FF.h, fontSize: 15, fontWeight: 700, color: ph.c }}>{ph.phase}</h3>
                  </div>
                  <div style={{ display: "grid", gap: 10 }}>
                    {ph.items.map((it, ii) => (
                      <div key={ii} style={{
                        background: C.surface, borderRadius: 6,
                        padding: "14px 14px", borderLeft: `3px solid ${ph.c}`,
                      }}>
                        <h4 style={{ fontFamily: FF.h, fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 4 }}>
                          {it.t}
                        </h4>
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
            <p style={{ fontSize: 14, color: C.gris, marginBottom: 20 }}>
              25 preguntas en 5 categorías que SENER debe resolver para diseñar el marco de permisos.
            </p>

            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
              <DLBtn onClick={() => go(refQuestions, "preguntas_permisos")} ok={pngOk} />
            </div>
            <div ref={refQuestions} style={{ display: "grid", gap: 16, background: "#fff", padding: 8 }}>
              {QUESTIONS.map((cat, ci) => (
                <div key={ci} style={{ ...cardStyle, borderLeft: `4px solid ${cat.c}` }}>
                  <h3 style={{ fontFamily: FF.h, fontSize: 15, fontWeight: 700, color: cat.c, marginBottom: 12 }}>
                    {cat.cat}
                  </h3>
                  {cat.qs.map((q, qi) => (
                    <div key={qi} style={{
                      display: "flex", gap: 10, padding: "6px 0",
                      borderBottom: qi < cat.qs.length - 1 ? `1px solid ${C.grisCl}` : "none",
                    }}>
                      <span style={{ fontFamily: FF.b, fontSize: 11, fontWeight: 700, color: cat.c, minWidth: 22, marginTop: 1 }}>
                        {qi + 1}.
                      </span>
                      <span style={{ fontSize: 13, color: "#444", lineHeight: 1.55 }}>{q}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div style={{ background: C.verdeLt, border: `1px solid ${C.verde}30`, borderRadius: 8, padding: "18px 18px", marginTop: 20 }}>
              <h3 style={{ fontFamily: FF.h, fontSize: 14, fontWeight: 700, color: C.verde, marginBottom: 6 }}>
                Siguiente paso propuesto
              </h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#444" }}>
                Organizar un <strong>taller de mapeo de procesos con SENER, CRE, SEMARNAT, CONAGUA y CENACE</strong> para documentar el proceso actual y diseñar la ventanilla única. Este taller alimentaría el capítulo de permisos del Plan Nacional de Hidrógeno Renovable (Deliverable D3 del programa GCIEP).
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer style={{ fontSize: 11, color: C.gris, textAlign: "center", padding: "24px 0 0", marginTop: 36, borderTop: `1px solid ${C.border}` }}>
          <div>Propuesta basada en GCIEP D2, experiencia internacional y análisis regulatorio</div>
          <div style={{ marginTop: 3, color: C.guinda, fontWeight: 600 }}>Secretaría de Energía · Gobierno de México</div>
        </footer>
      </main>
    </div>
  );
}
