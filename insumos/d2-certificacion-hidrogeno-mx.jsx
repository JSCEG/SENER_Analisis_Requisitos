import { useState, useEffect, useRef, useCallback } from "react";

const C = {
  guinda:"#9B2247", verde:"#1E5B4F", dorado:"#A57F2C", gris:"#98989A", grisCl:"#E5E5E5",
  guindaLt:"rgba(155,34,71,0.05)", verdeLt:"rgba(30,91,79,0.06)", doradoLt:"rgba(165,127,44,0.06)",
  text:"#333333", bg:"#FFFFFF", surface:"#F8F9FA", border:"#DDDDDD",
};
const FF = { h:"'Merriweather','Georgia',serif", b:"'Noto Sans',sans-serif" };

function useExportPNG() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (window.html2canvas) { setOk(true); return; }
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
    s.onload = () => setOk(true);
    document.head.appendChild(s);
  }, []);
  const exp = useCallback(async (ref, name="grafico") => {
    if (!ref.current || !window.html2canvas) return;
    const cv = await window.html2canvas(ref.current, { backgroundColor:"#fff", scale:3, useCORS:true, logging:false });
    const a = document.createElement("a"); a.download=`${name}.png`; a.href=cv.toDataURL("image/png"); a.click();
  }, []);
  return { exp, ok };
}

function DLBtn({ onClick, ok }) {
  return (
    <button onClick={onClick} disabled={!ok}
      style={{ fontFamily:FF.b, fontSize:10.5, fontWeight:600, background:ok?C.verde:C.grisCl, color:ok?"#fff":C.gris, border:"none", borderRadius:4, padding:"5px 12px", cursor:ok?"pointer":"default", display:"inline-flex", alignItems:"center", gap:4 }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      PNG
    </button>
  );
}

function HBar({ value, max=5, color=C.verde, label }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
      <div style={{ flex:1, height:7, background:C.grisCl, borderRadius:4, overflow:"hidden" }}>
        <div style={{ width:`${(value/max)*100}%`, height:"100%", background:color, borderRadius:4, transition:"width 0.7s ease" }} />
      </div>
      {label && <span style={{ fontSize:10.5, color:C.gris, minWidth:50, fontFamily:FF.b }}>{label}</span>}
    </div>
  );
}

/* ═══════════ SECTIONS DATA ═══════════ */
const NAV = [
  { id:"marco", label:"Marco de Análisis", icon:"📐" },
  { id:"modelos", label:"Modelos Internacionales", icon:"🌍" },
  { id:"hibrido", label:"Reconocimiento Híbrido", icon:"🔀" },
  { id:"nacional", label:"Esquema Nacional MX", icon:"🇲🇽" },
  { id:"verificacion", label:"Verificación y Programas", icon:"✅" },
  { id:"preguntas", label:"Preguntas Estratégicas", icon:"❓" },
];

const MODELS = [
  { country:"UE / CertifHy", flag:"🇪🇺", type:"Esquema voluntario + regulatorio", approach:"Doble vía: Garantías de Origen (GoO) para divulgación voluntaria + Esquema RFNBO para cumplimiento regulatorio. CertifHy obtuvo reconocimiento oficial de la Comisión Europea en marzo 2025.", verification:"Auditoría por organismos acreditados (Bureau Veritas, TÜV SÜD). Verificación anual de terceros. Datos en portal digital.", linkToPrograms:"Certificación vinculada directamente a elegibilidad para subsidios, metas RED II y comercio transfronterizo.", strengths:["Marco más maduro globalmente","Doble propósito: cumplimiento + voluntario","Reconocimiento mutuo con esquemas nacionales","Infraestructura digital para trazabilidad"], maturity:5, c:C.verde },
  { country:"Reino Unido", flag:"🇬🇧", type:"Estándar nacional obligatorio", approach:"UK Low Carbon Hydrogen Standard (LCHS): define umbrales de emisiones (≤20g CO₂e/MJ) y reglas de elegibilidad. Vinculado directamente al HPBM y Hydrogen Allocation Rounds.", verification:"Verificación por organismos acreditados UKAS. Proceso estandarizado vinculado a contratos de soporte de ingresos.", linkToPrograms:"Requisito obligatorio para acceder a HPBM, NZHF y cualquier soporte público. Sin certificación, sin contrato.", strengths:["Vínculo directo certificación → acceso a programas","Umbrales claros y cuantificados","Proceso repetible y estandarizado","Modelo para mercados que escalan"], maturity:5, c:C.verde },
  { country:"Corea del Sur", flag:"🇰🇷", type:"Certificación legislada", approach:"Marco de certificación bajo la Ley de Economía del Hidrógeno. Define elegibilidad para el CHPS (mercado de generación eléctrica con H₂ limpio). MOTIE establece criterios técnicos y de emisiones.", verification:"Verificación administrativa vinculada a la ley. Korea Power Exchange valida el cumplimiento.", linkToPrograms:"Certificación es prerequisito legal para participar en CHPS y acceder a cualquier apoyo público.", strengths:["Base legal dedicada (única en el mundo)","Certificación anclada en demanda eléctrica","Integración con mercado de energía","Señal de confianza para inversores"], maturity:4, c:C.dorado },
  { country:"Australia", flag:"🇦🇺", type:"Esquema nacional en desarrollo", approach:"Esquema de certificación nacional diseñado para credibilidad en mercados de exportación (Japón, Corea, UE). Clean Energy Regulator supervisa. REGO framework como base.", verification:"CER supervisa verificación. Alineación con requisitos de mercados destino es la prioridad.", linkToPrograms:"Vinculado a Hydrogen Headstart y CAPEX de ARENA. Sin certificación, difícil acceso a contratos de exportación.", strengths:["Diseñado para interoperabilidad con mercados destino","CER como regulador creíble y experimentado","Enfoque pragmático: exportación primero","Evolución progresiva basada en demanda"], maturity:3, c:C.dorado },
  { country:"India (GHCI)", flag:"🇮🇳", type:"Esquema nacional recién lanzado", approach:"Green Hydrogen Certification Scheme of India (GHCI) lanzado en abril 2025 por MNRE. BEE como agencia nodal. Mide kgCO₂e/kgH₂. Verificación por ACV agencies. Portal digital integrado.", verification:"Verificación anual obligatoria por terceros acreditados. Datos en Green Hydrogen Portal. Integración planeada con mercado de créditos de carbono (2026).", linkToPrograms:"Vinculado a SIGHT y mandatos de consumo de H₂ verde. En proceso de integrar con Carbon Credit Trading Scheme.", strengths:["Lanzamiento rápido en mercado emergente","Integración con créditos de carbono","Portal digital desde el inicio","Modelo replicable para países en desarrollo"], maturity:3, c:C.guinda },
];

const HYBRID_COMPONENTS = [
  { name:"Esquemas Voluntarios Privados", desc:"Operados por el sector privado (CertifHy, TÜV). Certifican atributos ambientales del H₂. Útiles para ESG, divulgación corporativa y mercados voluntarios. Reconocidos por gobiernos cuando cumplen criterios.", icon:"🏢", examples:"CertifHy GoO, ISCC PLUS, TÜV SÜD" },
  { name:"Esquemas Nacionales Obligatorios", desc:"Diseñados por gobierno para vincular certificación con acceso a programas públicos, subsidios y metas regulatorias. Definen umbrales de emisiones y reglas de elegibilidad.", icon:"🏛️", examples:"UK LCHS, Corea CHPS, India GHCI" },
  { name:"Reconocimiento Mutuo", desc:"Acuerdos entre esquemas para que certificados emitidos en un país sean válidos en otro. Esencial para comercio transfronterizo de H₂. G7 y G20 lo priorizan como agenda. IPHE e IEA H2 TCP lideran el trabajo técnico.", icon:"🤝", examples:"CertifHy ↔ esquemas nacionales UE, Australia ↔ Japón" },
  { name:"Verificación Administrada", desc:"Proceso de auditoría por organismos acreditados que valida cumplimiento con criterios del esquema. Incluye monitoreo anual, trazabilidad de datos y portal digital.", icon:"🔍", examples:"Bureau Veritas, TÜV SÜD, BEE (India), UKAS (UK)" },
];

const MX_DESIGN = [
  { title:"Definir el alcance", questions:["¿El esquema cubrirá solo producción o también transporte, almacenamiento y uso final?","¿Se incluirán derivados como amoniaco y metanol, o solo H₂ puro?","¿Se aplicará solo a H₂ 'verde' (electrólisis + renovable) o también a 'bajo carbono'?"], recommendation:"Comenzar con producción de H₂ verde vía electrólisis. Expandir progresivamente a derivados y low-carbon conforme el mercado madure." },
  { title:"Establecer la métrica GHG", questions:["¿Se adoptará kgCO₂e/kgH₂ (como India) o gCO₂e/MJ (como UK)?","¿Cuál será el umbral máximo de emisiones para calificar como 'verde'?","¿Se incluirán emisiones upstream de electricidad, agua y transporte?","¿Cómo se tratará la electricidad de red vs. PPA vs. generación dedicada?"], recommendation:"Adoptar gCO₂e/MJ alineado con RFNBO (≤28.2 gCO₂e/MJ o equivalente en kgCO₂e/kgH₂ ≈3.38) para facilitar reconocimiento internacional. Definir reglas de electricidad que funcionen con la red mexicana." },
  { title:"Diseñar la gobernanza", questions:["¿Quién será la entidad emisora de certificados? ¿SENER, CRE, un organismo nuevo?","¿Se creará un registro digital nacional? ¿Quién lo administrará?","¿Cómo se acreditarán los organismos verificadores?","¿Se aceptarán esquemas voluntarios privados para cumplimiento regulatorio?"], recommendation:"SENER como autoridad rectora, CRE como regulador operativo, con acreditación vía EMA (Entidad Mexicana de Acreditación). Permitir esquemas voluntarios reconocidos para evitar duplicar infraestructura." },
  { title:"Vincular con programas públicos", questions:["¿La certificación será requisito para acceder a incentivos fiscales?","¿Se vinculará a mandatos de consumo (refinación, fertilizantes)?","¿Los contratos CfD futuros exigirán certificación?","¿Cómo se integra con el mercado de certificados de energía limpia existente?"], recommendation:"Hacer la certificación obligatoria para cualquier programa público desde el inicio. Esto crea el ancla de demanda para el propio esquema de certificación." },
  { title:"Habilitar reconocimiento internacional", questions:["¿Se buscará alineación con RFNBO desde el diseño?","¿Se negociarán acuerdos de reconocimiento mutuo con UE, Japón, Corea?","¿Se participará en IPHE y IEA H2 TCP para armonización?","¿Cómo se manejarán las diferencias entre requisitos de distintos mercados destino?"], recommendation:"Diseñar el esquema con interoperabilidad RFNBO como principio. Participar en IPHE desde ahora. Negociar bilateral con UE como prioridad dado el CBAM." },
];

const STRATEGIC_QS = [
  { category:"Diseño Institucional", color:C.guinda, qs:[
    "¿Debería México crear un organismo dedicado de certificación de H₂ o asignar la función a una entidad existente (CRE, SENER)?",
    "¿Qué papel tendrá la Entidad Mexicana de Acreditación (EMA) en la acreditación de verificadores?",
    "¿Cómo se coordinará el esquema de certificación con los Lineamientos de 2024 y el futuro Plan Nacional?",
    "¿Se necesita una reforma legal o basta con regulación secundaria para implementar el esquema?",
  ]},
  { category:"Métrica y Umbrales", color:C.dorado, qs:[
    "¿Cuál es el umbral de emisiones más ambicioso pero realista dado el mix eléctrico mexicano?",
    "¿Cómo se tratará la temporalidad y geográficidad de la electricidad renovable (additionality, correlación temporal)?",
    "¿Se adoptará contabilidad mensual, horaria o anual para matching de electricidad?",
    "¿Qué tratamiento recibirá el consumo de agua en la certificación, dado el estrés hídrico en regiones clave?",
  ]},
  { category:"Reconocimiento y Comercio", color:C.verde, qs:[
    "¿Es viable un modelo híbrido donde México reconozca esquemas privados (CertifHy) para cumplimiento mientras desarrolla el propio?",
    "¿Qué mercados de exportación son prioritarios (UE, EE.UU., Japón) y cómo afecta eso el diseño?",
    "¿Cómo se posiciona México ante el CBAM europeo en relación a exportaciones de H₂ y derivados?",
    "¿Se debería participar en el Task 47 de IEA H₂ TCP para influir en los estándares globales?",
  ]},
  { category:"Verificación Operativa", color:"#555", qs:[
    "¿Existe capacidad técnica suficiente en México para la verificación? ¿Se necesita formar verificadores?",
    "¿Qué infraestructura digital se requiere (portal, registro, trazabilidad)?",
    "¿Cómo se financiará el esquema: tasas a productores, presupuesto público, o híbrido?",
    "¿Qué frecuencia de verificación es adecuada para la etapa inicial (anual, por lote, continua)?",
  ]},
  { category:"Vínculo con Programas Públicos", color:C.guinda, qs:[
    "¿Los incentivos fiscales para H₂ (cuando existan) deberían requerir certificación desde el día uno?",
    "¿Cómo se vincula la certificación con los mandatos de consumo en PEMEX y sector fertilizantes?",
    "¿Los futuros contratos CfD o de offtake garantizado deberían exigir certificación como condición?",
    "¿Se integra el esquema con el mercado de Certificados de Energía Limpia (CELs) o se crea un instrumento paralelo?",
    "¿Cómo se evita que la certificación se convierta en barrera burocrática para los primeros proyectos?",
  ]},
];

/* ═══════════ APP ═══════════ */
export default function App() {
  const [ready, setReady] = useState(false);
  const [sec, setSec] = useState("marco");
  const { exp, ok: pngOk } = useExportPNG();
  const refs = { modelos: useRef(null), hibrido: useRef(null), nacional: useRef(null), verificacion: useRef(null), preguntas: useRef(null), maturity: useRef(null) };

  useEffect(() => { setTimeout(()=>setReady(true),100); }, []);

  const cardS = { background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, padding:"20px 18px" };

  return (
    <div style={{ fontFamily:FF.b, background:C.bg, color:C.text, minHeight:"100vh", lineHeight:1.65 }}>
      <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,400&family=Noto+Sans:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}::selection{background:rgba(155,34,71,0.15)}@media print{.no-print{display:none!important}}`}</style>

      <div style={{ background:C.guinda, height:5 }} />
      {/* HEADER */}
      <header style={{ background:C.bg, borderBottom:`1px solid ${C.border}`, padding:"22px 24px 18px", opacity:ready?1:0, transform:ready?"none":"translateY(-10px)", transition:"all 0.6s ease" }}>
        <div style={{ maxWidth:940, margin:"0 auto" }}>
          <div style={{ fontSize:10, letterSpacing:3, textTransform:"uppercase", color:C.gris, marginBottom:8, fontWeight:600 }}>Propuesta de Análisis · Secretaría de Energía</div>
          <h1 style={{ fontFamily:FF.h, fontSize:"clamp(20px,3vw,30px)", fontWeight:700, lineHeight:1.18, color:C.guinda, maxWidth:700 }}>
            Marco de Certificación de Hidrógeno Verde para México
          </h1>
          <p style={{ fontSize:14, color:C.gris, marginTop:6, fontStyle:"italic", maxWidth:650, lineHeight:1.5 }}>
            Reconocimiento híbrido, esquema nacional y verificación administrada vinculada a programas públicos
          </p>
        </div>
      </header>

      {/* NAV */}
      <nav className="no-print" style={{ position:"sticky", top:0, zIndex:100, background:"rgba(255,255,255,0.95)", backdropFilter:"blur(12px)", borderBottom:`1px solid ${C.border}`, padding:"0 24px" }}>
        <div style={{ maxWidth:940, margin:"0 auto", display:"flex", gap:0, overflowX:"auto" }}>
          {NAV.map(n => (
            <button key={n.id} onClick={()=>setSec(n.id)}
              style={{ fontFamily:FF.b, fontSize:11.5, fontWeight:sec===n.id?700:400, color:sec===n.id?C.guinda:C.gris, background:"none", border:"none", padding:"11px 14px", cursor:"pointer", whiteSpace:"nowrap", borderBottom:sec===n.id?`3px solid ${C.guinda}`:"3px solid transparent", marginBottom:-1, transition:"all 0.2s" }}>
              <span style={{ marginRight:4 }}>{n.icon}</span>{n.label}
            </button>
          ))}
        </div>
      </nav>

      {/* CONTENT */}
      <main style={{ maxWidth:940, margin:"0 auto", padding:"26px 24px 72px" }}>

        {/* ═══ MARCO ═══ */}
        {sec==="marco" && (
          <div style={{ animation:"fadeUp 0.5s ease" }}>
            <h2 style={{ fontFamily:FF.h, fontSize:20, fontWeight:700, color:C.guinda, marginBottom:12, paddingBottom:6, borderBottom:`2px solid ${C.guinda}` }}>¿Por qué un marco de certificación?</h2>
            <p style={{ fontSize:15, lineHeight:1.75, marginBottom:16 }}>
              Sin certificación, el hidrógeno verde es solo una promesa. La certificación convierte una declaración de intenciones en un atributo <strong>verificable, comercializable y vinculable a programas públicos</strong>. La experiencia internacional muestra que la certificación no impulsa el despliegue por sí sola, pero es condición necesaria para que funcionen los instrumentos que sí lo impulsan: contratos CfD, mandatos de consumo, comercio internacional.
            </p>
            <p style={{ fontSize:15, lineHeight:1.75, marginBottom:24 }}>
              Esta propuesta plantea un <strong>modelo híbrido</strong> para México: un esquema nacional propio vinculado a programas públicos, que al mismo tiempo reconozca esquemas voluntarios internacionales para facilitar el comercio y evitar duplicar infraestructura.
            </p>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:12 }}>
              {[
                { t:"Certificación", d:"Probar que el H₂ cumple criterios ambientales y de origen renovable", c:C.guinda, icon:"📜" },
                { t:"Reconocimiento Híbrido", d:"Aceptar tanto esquemas nacionales como voluntarios privados reconocidos", c:C.verde, icon:"🔀" },
                { t:"Esquema Nacional", d:"Marco propio que SENER diseña y vincula a sus programas", c:C.dorado, icon:"🏛️" },
                { t:"Verificación Administrada", d:"Auditoría por terceros acreditados con trazabilidad digital", c:"#555", icon:"🔍" },
              ].map((d,i) => (
                <div key={i} style={{ ...cardS, borderTop:`3px solid ${d.c}`, textAlign:"center" }}>
                  <div style={{ fontSize:28, marginBottom:6 }}>{d.icon}</div>
                  <h4 style={{ fontFamily:FF.h, fontSize:13.5, fontWeight:700, color:d.c, marginBottom:4 }}>{d.t}</h4>
                  <p style={{ fontSize:12.5, color:"#666", lineHeight:1.5 }}>{d.d}</p>
                </div>
              ))}
            </div>

            <div style={{ background:C.verdeLt, border:`1px solid ${C.verde}30`, borderRadius:8, padding:"18px 18px", marginTop:24 }}>
              <h3 style={{ fontFamily:FF.h, fontSize:14, fontWeight:700, color:C.verde, marginBottom:6 }}>Principio rector</h3>
              <p style={{ fontSize:14, lineHeight:1.65, color:"#444" }}>
                La certificación debe ser <strong>habilitadora, no barrera</strong>. En la etapa formativa de México, el esquema debe ser lo suficientemente riguroso para tener credibilidad internacional, pero lo suficientemente simple para no frenar los primeros proyectos. La sofisticación se añade conforme el mercado crece.
              </p>
            </div>
          </div>
        )}

        {/* ═══ MODELOS ═══ */}
        {sec==="modelos" && (
          <div style={{ animation:"fadeUp 0.5s ease" }}>
            <h2 style={{ fontFamily:FF.h, fontSize:20, fontWeight:700, color:C.guinda, marginBottom:4, paddingBottom:6, borderBottom:`2px solid ${C.guinda}` }}>Modelos Internacionales de Certificación</h2>
            <p style={{ fontSize:14, color:C.gris, marginBottom:20 }}>Cómo los países líderes vinculan certificación con elegibilidad para programas públicos.</p>

            <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:8 }}>
              <DLBtn onClick={()=>exp(refs.maturity,"madurez_certificacion")} ok={pngOk} />
            </div>
            <div ref={refs.maturity} style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:8, padding:"20px 18px", marginBottom:24 }}>
              <div style={{ fontFamily:FF.h, fontSize:14, fontWeight:700, color:C.guinda, marginBottom:14 }}>Madurez de esquemas de certificación</div>
              {MODELS.map((m,i) => (
                <div key={i} style={{ marginBottom:14, paddingBottom:12, borderBottom:i<MODELS.length-1?`1px solid ${C.grisCl}`:"none" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
                    <span style={{ fontWeight:700, fontSize:13 }}>{m.flag} {m.country}</span>
                    <span style={{ fontSize:10.5, color:m.c, fontWeight:600, padding:"1px 8px", borderRadius:10, background:m.c+"14", border:`1px solid ${m.c}30` }}>{m.type}</span>
                  </div>
                  <HBar value={m.maturity} color={m.c} label={`${m.maturity}/5`} />
                </div>
              ))}
            </div>

            <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:8 }}>
              <DLBtn onClick={()=>exp(refs.modelos,"modelos_certificacion")} ok={pngOk} />
            </div>
            <div ref={refs.modelos} style={{ display:"grid", gap:14, background:"#fff", padding:4 }}>
              {MODELS.map((m,i) => (
                <div key={i} style={{ ...cardS, borderLeft:`4px solid ${m.c}` }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10, flexWrap:"wrap", gap:8 }}>
                    <div>
                      <h3 style={{ fontFamily:FF.h, fontSize:16, fontWeight:700, color:m.c }}>{m.flag} {m.country}</h3>
                      <div style={{ fontSize:11, color:C.gris, marginTop:2 }}>{m.type}</div>
                    </div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:12, marginBottom:12 }}>
                    <div><div style={{ fontSize:10, fontWeight:700, color:C.guinda, textTransform:"uppercase", letterSpacing:1, marginBottom:3 }}>Enfoque</div><div style={{ fontSize:12.5, lineHeight:1.55, color:"#555" }}>{m.approach}</div></div>
                    <div><div style={{ fontSize:10, fontWeight:700, color:C.verde, textTransform:"uppercase", letterSpacing:1, marginBottom:3 }}>Verificación</div><div style={{ fontSize:12.5, lineHeight:1.55, color:"#555" }}>{m.verification}</div></div>
                    <div><div style={{ fontSize:10, fontWeight:700, color:C.dorado, textTransform:"uppercase", letterSpacing:1, marginBottom:3 }}>Vínculo con Programas</div><div style={{ fontSize:12.5, lineHeight:1.55, color:"#555" }}>{m.linkToPrograms}</div></div>
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                    {m.strengths.map((s,j) => <span key={j} style={{ fontSize:11, background:m.c+"10", color:m.c, padding:"3px 10px", borderRadius:12, border:`1px solid ${m.c}25` }}>{s}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ HÍBRIDO ═══ */}
        {sec==="hibrido" && (
          <div style={{ animation:"fadeUp 0.5s ease" }}>
            <h2 style={{ fontFamily:FF.h, fontSize:20, fontWeight:700, color:C.guinda, marginBottom:4, paddingBottom:6, borderBottom:`2px solid ${C.guinda}` }}>Reconocimiento Híbrido</h2>
            <p style={{ fontSize:14, color:C.gris, marginBottom:20 }}>Un modelo donde México opera su propio esquema pero reconoce esquemas voluntarios para cumplimiento.</p>

            <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:8 }}>
              <DLBtn onClick={()=>exp(refs.hibrido,"reconocimiento_hibrido")} ok={pngOk} />
            </div>
            <div ref={refs.hibrido} style={{ background:"#fff", padding:20, borderRadius:8, border:`1px solid ${C.border}` }}>
              <div style={{ fontFamily:FF.h, fontSize:15, fontWeight:700, color:C.verde, marginBottom:16 }}>Componentes del modelo híbrido</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:14 }}>
                {HYBRID_COMPONENTS.map((h,i) => (
                  <div key={i} style={{ ...cardS, borderTop:`3px solid ${[C.dorado,C.guinda,C.verde,"#555"][i]}` }}>
                    <div style={{ fontSize:26, marginBottom:6 }}>{h.icon}</div>
                    <h4 style={{ fontFamily:FF.h, fontSize:13.5, fontWeight:700, color:C.text, marginBottom:6 }}>{h.name}</h4>
                    <p style={{ fontSize:12.5, lineHeight:1.55, color:"#555", marginBottom:8 }}>{h.desc}</p>
                    <div style={{ fontSize:11, color:C.gris }}><strong>Ejemplos:</strong> {h.examples}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop:20, background:C.guindaLt, border:`1px solid ${C.guinda}20`, borderRadius:8, padding:"16px 16px" }}>
                <h4 style={{ fontFamily:FF.h, fontSize:13, fontWeight:700, color:C.guinda, marginBottom:6 }}>¿Cómo funcionaría en México?</h4>
                <p style={{ fontSize:13, lineHeight:1.6, color:"#555" }}>
                  SENER establece el <strong>Esquema Nacional Mexicano</strong> con umbrales de emisiones y reglas de elegibilidad propias. Al mismo tiempo, <strong>reconoce formalmente</strong> esquemas voluntarios que cumplan criterios mínimos (ej. CertifHy RFNBO). Un productor puede certificarse por cualquier vía reconocida para acceder a programas públicos. Esto acelera el arranque porque no se espera a que la infraestructura nacional esté lista para que los primeros proyectos se certifiquen.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ═══ NACIONAL ═══ */}
        {sec==="nacional" && (
          <div style={{ animation:"fadeUp 0.5s ease" }}>
            <h2 style={{ fontFamily:FF.h, fontSize:20, fontWeight:700, color:C.guinda, marginBottom:4, paddingBottom:6, borderBottom:`2px solid ${C.guinda}` }}>Diseño del Esquema Nacional Mexicano</h2>
            <p style={{ fontSize:14, color:C.gris, marginBottom:20 }}>Cinco bloques de decisión que SENER debe resolver.</p>

            <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:8 }}>
              <DLBtn onClick={()=>exp(refs.nacional,"esquema_nacional_mx")} ok={pngOk} />
            </div>
            <div ref={refs.nacional} style={{ display:"grid", gap:16, background:"#fff", padding:8 }}>
              {MX_DESIGN.map((b,i) => (
                <div key={i} style={{ ...cardS, borderLeft:`4px solid ${[C.guinda,C.dorado,C.verde,"#555",C.guinda][i]}` }}>
                  <h3 style={{ fontFamily:FF.h, fontSize:16, fontWeight:700, color:[C.guinda,C.dorado,C.verde,"#555",C.guinda][i], marginBottom:10 }}>
                    <span style={{ fontFamily:FF.b, fontSize:12, fontWeight:700, background:[C.guinda,C.dorado,C.verde,"#555",C.guinda][i], color:"#fff", borderRadius:12, padding:"2px 9px", marginRight:8 }}>{i+1}</span>
                    {b.title}
                  </h3>
                  <div style={{ marginBottom:12 }}>
                    <div style={{ fontSize:10.5, fontWeight:700, color:C.gris, textTransform:"uppercase", letterSpacing:1, marginBottom:6 }}>Preguntas clave</div>
                    {b.questions.map((q,j) => (
                      <div key={j} style={{ display:"flex", gap:8, padding:"4px 0" }}>
                        <span style={{ color:C.guinda, fontSize:11, marginTop:2, flexShrink:0 }}>▸</span>
                        <span style={{ fontSize:13, color:"#555", lineHeight:1.5 }}>{q}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background:C.verdeLt, borderRadius:6, padding:"10px 12px" }}>
                    <div style={{ fontSize:10.5, fontWeight:700, color:C.verde, textTransform:"uppercase", letterSpacing:1, marginBottom:3 }}>Recomendación</div>
                    <p style={{ fontSize:12.5, lineHeight:1.55, color:"#444" }}>{b.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ VERIFICACIÓN ═══ */}
        {sec==="verificacion" && (
          <div style={{ animation:"fadeUp 0.5s ease" }}>
            <h2 style={{ fontFamily:FF.h, fontSize:20, fontWeight:700, color:C.guinda, marginBottom:4, paddingBottom:6, borderBottom:`2px solid ${C.guinda}` }}>Verificación y Vínculo con Programas Públicos</h2>
            <p style={{ fontSize:14, color:C.gris, marginBottom:20 }}>Cómo la certificación se conecta con los instrumentos que SENER diseñe.</p>

            <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:8 }}>
              <DLBtn onClick={()=>exp(refs.verificacion,"verificacion_programas")} ok={pngOk} />
            </div>
            <div ref={refs.verificacion} style={{ background:"#fff", padding:20, borderRadius:8, border:`1px solid ${C.border}` }}>
              <div style={{ fontFamily:FF.h, fontSize:15, fontWeight:700, color:C.verde, marginBottom:16 }}>Cadena: Producción → Certificación → Programa Público</div>

              {/* Flow */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:4, flexWrap:"wrap", marginBottom:24, padding:"16px 0" }}>
                {[
                  { label:"Productor de H₂", sub:"Genera datos de producción", c:C.gris },
                  { label:"→", sub:"", c:"transparent" },
                  { label:"Verificador Acreditado", sub:"Auditoría de terceros", c:C.dorado },
                  { label:"→", sub:"", c:"transparent" },
                  { label:"Esquema de Certificación", sub:"Emite certificado", c:C.verde },
                  { label:"→", sub:"", c:"transparent" },
                  { label:"Programa Público", sub:"Valida elegibilidad", c:C.guinda },
                ].map((s,i) => s.label==="→" ? (
                  <div key={i} style={{ fontSize:20, color:C.gris, padding:"0 2px" }}>→</div>
                ) : (
                  <div key={i} style={{ textAlign:"center", padding:"12px 14px", background:s.c+"10", border:`1px solid ${s.c}30`, borderRadius:8, minWidth:130 }}>
                    <div style={{ fontSize:12, fontWeight:700, color:s.c }}>{s.label}</div>
                    <div style={{ fontSize:10.5, color:"#777", marginTop:2 }}>{s.sub}</div>
                  </div>
                ))}
              </div>

              <h4 style={{ fontFamily:FF.h, fontSize:14, fontWeight:700, color:C.dorado, marginBottom:12 }}>Programas públicos que deberían requerir certificación</h4>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:12 }}>
                {[
                  { prog:"Incentivos Fiscales (futuros)", desc:"Exenciones y depreciación acelerada para producción de H₂ verde. Solo con certificado válido.", status:"Por diseñar", c:C.guinda },
                  { prog:"Contratos CfD / Offtake", desc:"Contratos de soporte de ingresos. La certificación valida que el H₂ producido cumple con criterios.", status:"Por diseñar", c:C.verde },
                  { prog:"Mandatos de Consumo", desc:"Obligaciones de uso de H₂ verde en refinación y fertilizantes. La certificación prueba cumplimiento.", status:"Por diseñar", c:C.dorado },
                  { prog:"Financiamiento Público (CAPEX)", desc:"Co-financiamiento para pilotos y hubs. Certificación como condición para desembolsos.", status:"Por diseñar", c:C.gris },
                  { prog:"Comercio Internacional", desc:"Exportación de H₂ o derivados. Certificación reconocida internacionalmente habilita acceso a mercados.", status:"Requiere acuerdos", c:C.verde },
                  { prog:"CELs / Créditos de Carbono", desc:"Integración potencial con mercado de Certificados de Energía Limpia o futuro mercado de carbono.", status:"A explorar", c:C.dorado },
                ].map((p,i) => (
                  <div key={i} style={{ ...cardS, borderTop:`3px solid ${p.c}` }}>
                    <h4 style={{ fontFamily:FF.h, fontSize:13, fontWeight:700, color:p.c, marginBottom:4 }}>{p.prog}</h4>
                    <p style={{ fontSize:12, lineHeight:1.5, color:"#555", marginBottom:6 }}>{p.desc}</p>
                    <span style={{ fontSize:10, fontWeight:600, padding:"2px 8px", borderRadius:10, background:p.c+"12", color:p.c, border:`1px solid ${p.c}25` }}>{p.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ PREGUNTAS ═══ */}
        {sec==="preguntas" && (
          <div style={{ animation:"fadeUp 0.5s ease" }}>
            <h2 style={{ fontFamily:FF.h, fontSize:20, fontWeight:700, color:C.guinda, marginBottom:4, paddingBottom:6, borderBottom:`2px solid ${C.guinda}` }}>Preguntas Estratégicas para SENER</h2>
            <p style={{ fontSize:14, color:C.gris, marginBottom:20 }}>25 preguntas organizadas en 5 categorías que deben resolverse para diseñar el marco de certificación.</p>

            <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:8 }}>
              <DLBtn onClick={()=>exp(refs.preguntas,"preguntas_estrategicas")} ok={pngOk} />
            </div>
            <div ref={refs.preguntas} style={{ display:"grid", gap:16, background:"#fff", padding:8 }}>
              {STRATEGIC_QS.map((cat,ci) => (
                <div key={ci} style={{ ...cardS, borderLeft:`4px solid ${cat.color}` }}>
                  <h3 style={{ fontFamily:FF.h, fontSize:15, fontWeight:700, color:cat.color, marginBottom:12 }}>{cat.category}</h3>
                  {cat.qs.map((q,qi) => (
                    <div key={qi} style={{ display:"flex", gap:10, padding:"6px 0", borderBottom:qi<cat.qs.length-1?`1px solid ${C.grisCl}`:"none" }}>
                      <span style={{ fontFamily:FF.b, fontSize:11, fontWeight:700, color:cat.color, minWidth:22, marginTop:1 }}>{qi+1}.</span>
                      <span style={{ fontSize:13.5, color:"#444", lineHeight:1.55 }}>{q}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div style={{ background:C.verdeLt, border:`1px solid ${C.verde}30`, borderRadius:8, padding:"18px 18px", marginTop:20 }}>
              <h3 style={{ fontFamily:FF.h, fontSize:14, fontWeight:700, color:C.verde, marginBottom:6 }}>Siguiente paso propuesto</h3>
              <p style={{ fontSize:13.5, lineHeight:1.6, color:"#444" }}>
                Organizar un <strong>taller técnico con SENER, CRE, EMA y SEMARNAT</strong> para priorizar estas preguntas y definir la hoja de ruta del esquema de certificación. Este taller podría alimentar directamente el diseño del capítulo de certificación del Plan Nacional de Hidrógeno Renovable, alineado con la siguiente fase del programa GCIEP (Deliverable D3).
              </p>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <footer style={{ fontSize:11, color:C.gris, textAlign:"center", padding:"24px 0 0", marginTop:36, borderTop:`1px solid ${C.border}` }}>
          <div>Propuesta analítica basada en GCIEP Deliverable D2 e investigación complementaria</div>
          <div style={{ marginTop:3, color:C.guinda, fontWeight:600 }}>Secretaría de Energía · Gobierno de México</div>
        </footer>
      </main>
    </div>
  );
}
