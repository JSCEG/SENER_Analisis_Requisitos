import { useState, useEffect, useRef, useCallback } from "react";

const C = { guinda:"#9B2247", verde:"#1E5B4F", dorado:"#A57F2C", gris:"#98989A", grisCl:"#E5E5E5", guindaLt:"rgba(155,34,71,0.05)", verdeLt:"rgba(30,91,79,0.06)", doradoLt:"rgba(165,127,44,0.06)", text:"#333", bg:"#FFF", surface:"#F8F9FA", border:"#DDD" };
const FF = { h:"'Merriweather','Georgia',serif", b:"'Noto Sans',sans-serif" };

function useExport(){const[ok,setOk]=useState(false);useEffect(()=>{if(window.html2canvas){setOk(true);return;}const s=document.createElement("script");s.src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";s.onload=()=>setOk(true);document.head.appendChild(s);},[]);const go=useCallback(async(ref,name)=>{if(!ref.current||!window.html2canvas)return;const cv=await window.html2canvas(ref.current,{backgroundColor:"#fff",scale:3,useCORS:true,logging:false});const a=document.createElement("a");a.download=`${name}.png`;a.href=cv.toDataURL("image/png");a.click();},[]);return{go,ok};}
function DL({onClick,ok}){return <button onClick={onClick} disabled={!ok} style={{fontFamily:FF.b,fontSize:10.5,fontWeight:600,background:ok?C.verde:C.grisCl,color:ok?"#fff":C.gris,border:"none",borderRadius:4,padding:"5px 12px",cursor:ok?"pointer":"default",display:"inline-flex",alignItems:"center",gap:4}}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>PNG</button>;}
function HBar({value,max=5,color=C.verde,label}){return <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{flex:1,height:7,background:C.grisCl,borderRadius:4,overflow:"hidden"}}><div style={{width:`${(value/max)*100}%`,height:"100%",background:color,borderRadius:4,transition:"width 0.7s ease"}}/></div>{label&&<span style={{fontSize:10.5,color:C.gris,minWidth:32,fontFamily:FF.b}}>{label}</span>}</div>;}

const NAV = [
  { id:"reto", label:"El Reto", icon:"💡" },
  { id:"instrumentos", label:"Instrumentos", icon:"🔧" },
  { id:"sectores", label:"Sectores Clave MX", icon:"🏭" },
  { id:"internacional", label:"Internacional", icon:"🌍" },
  { id:"mexico", label:"Propuesta México", icon:"🇲🇽" },
  { id:"preguntas", label:"Preguntas", icon:"❓" },
];

const INSTRUMENTS = [
  { title:"Mandatos de Consumo de H₂ Verde", subtitle:"Obligar a sectores industriales a usar un porcentaje de H₂ renovable", color:C.guinda, icon:"📋",
    what:"El gobierno establece que un porcentaje del hidrógeno consumido en ciertos sectores industriales debe ser verde. Esto crea demanda garantizada que reduce el riesgo de offtake para los productores. Es el instrumento más poderoso para crear mercado doméstico porque convierte la ambición climática en obligación contractual.",
    how:["Definir sectores obligados: refinación, fertilizantes, químicos, acero (donde H₂ ya se usa)","Establecer porcentajes graduales: 5% al 2028, 10% al 2030, 20% al 2035 (ejemplo)","Vincular a certificación: solo H₂ verde certificado cuenta para cumplimiento","Diseñar penalidades por incumplimiento: multas o compra obligatoria de certificados","Revisión periódica: ajustar porcentajes según evolución de costos y oferta"],
    intlRef:"India: mandatos de consumo de H₂ verde en refinación (10%) y fertilizantes (5%) bajo NGHM. UE RED III: 42% del H₂ industrial debe ser RFNBO para 2030. Corea del Sur: CHPS obliga a generadores eléctricos a incluir H₂/amoniaco en su mix.",
    risks:["Carga sobre industria si el H₂ verde no está disponible a precio razonable","Necesidad de periodo de gracia suficiente","Riesgo de que PEMEX y sector fertilizantes resistan mandatos"],
  },
  { title:"Contratos de Offtake Garantizado", subtitle:"El gobierno o empresas públicas se comprometen a comprar H₂ verde", color:C.verde, icon:"📝",
    what:"Una empresa pública (PEMEX, CFE) o el propio gobierno firma contratos de compra de H₂ verde a largo plazo con productores. Esto da certeza de ingresos al productor y hace el proyecto bancable. Es la forma más directa de crear demanda: alguien se compromete a comprar.",
    how:["PEMEX firma contratos de compra de H₂ verde para sus refinerías (sustitución parcial de H₂ fósil)","CFE evalúa co-combustión de H₂/amoniaco en centrales de ciclo combinado","Contratos de 10-15 años con volúmenes y precios definidos (o fórmula de precio)","Asignación vía licitación competitiva para obtener mejor precio","Vinculación con certificación: solo H₂ certificado es elegible"],
    intlRef:"Corea del Sur: KEPCO y KOGAS firman contratos de offtake para H₂ en generación eléctrica. Japón: JERA (generadora) co-combustiona amoniaco en termoeléctricas. Alemania: H2Global funciona como comprador intermediario que luego revende al mercado.",
    risks:["Expone a PEMEX/CFE a riesgo de precio del H₂ verde","Requiere voluntad política para comprometer entidades públicas","Complejidad contractual para definir precio justo a largo plazo"],
  },
  { title:"Compras Públicas Verdes", subtitle:"El gobierno como comprador ancla de productos fabricados con H₂ verde", color:C.dorado, icon:"🏛️",
    what:"El gobierno usa su poder de compra para preferir productos fabricados con H₂ verde: acero verde para infraestructura pública, fertilizantes verdes para programas agrícolas, amoniaco verde para la industria. Esto crea demanda indirecta de H₂ a través de la cadena de valor.",
    how:["Incluir criterio de contenido de H₂ verde en licitaciones públicas de acero, cemento y fertilizantes","Establecer prima verde máxima que el gobierno está dispuesto a pagar (ej. hasta 10-15% sobre precio convencional)","Aplicar a grandes programas de infraestructura: Tren Maya, refinería Dos Bocas, puertos, carreteras","Certificar la cadena de valor: el proveedor demuestra uso de H₂ verde en su proceso","Publicar plan anual de compras verdes con volúmenes estimados"],
    intlRef:"UE: Green Public Procurement Directive incluye criterios de carbono en compras de acero y cemento. EE.UU.: Buy Clean Act requiere análisis de carbono embebido en materiales de construcción federal. Japón: procurement público preferencial para vehículos de celda de combustible.",
    risks:["Incremento de costos en obras públicas","Pocos proveedores iniciales de materiales 'verdes'","Necesidad de sistema de verificación de cadena de valor"],
  },
  { title:"Señales de Precio al Carbono", subtitle:"Hacer más caro el H₂ fósil para cerrar la brecha con el verde", color:"#666", icon:"💨",
    what:"En lugar de solo subsidiar el H₂ verde, también encarecer el fósil. Esto puede hacerse vía impuesto al carbono, sobretasa al H₂ producido con metano sin captura, o integración con mercado de carbono. Reduce la brecha de costo desde ambos lados.",
    how:["Evaluar viabilidad de impuesto al carbono sobre H₂ producido con SMR sin captura","Integrar H₂ en el eventual mercado de carbono mexicano","Establecer sobretasa al uso industrial de H₂ gris que financie fondo de transición","Exentar H₂ verde certificado de cualquier carga de carbono","Diseñar trayectoria gradual: señal de precio baja al inicio que crece con el tiempo"],
    intlRef:"UE: CBAM (Carbon Border Adjustment Mechanism) afecta importaciones de productos hechos con H₂ gris. UK: UK ETS incluye sectores que consumen H₂. Alemania: precio de carbono nacional complementa el EU ETS. Corea del Sur: K-ETS incluye emisiones industriales de H₂ fósil.",
    risks:["Políticamente difícil de implementar","Impacto en competitividad si no se aplica a importaciones","Puede ser regresivo si no se diseña con cuidado"],
  },
  { title:"Estímulo a Exportaciones de H₂ y Derivados", subtitle:"Crear demanda externa para la producción mexicana", color:C.verde, icon:"🚢",
    what:"México tiene ventaja competitiva para exportar H₂ verde o derivados (amoniaco, metanol, e-fuels) a mercados con déficit de producción propia. Crear condiciones para la exportación genera demanda adicional a la doméstica y posiciona a México en la cadena global.",
    how:["Negociar acuerdos bilaterales de compra con UE (CBAM genera demanda de H₂ verde), Japón, Corea","Desarrollar infraestructura portuaria para exportación de amoniaco en Veracruz, Baja California, Tamaulipas","Alinear certificación mexicana con RFNBO para acceso al mercado europeo","Habilitar zonas económicas especiales para producción de H₂ para exportación","Coordinarse con EE.UU. para potencial exportación transfronteriza"],
    intlRef:"Australia: modelo de exportación a Japón y Corea vía amoniaco y puertos dedicados. Chile: Magallanes como hub de exportación de e-fuels a Europa. Países Bajos: Rotterdam como hub de importación, lo que crea oportunidad para exportadores. Arabia Saudita: NEOM produce amoniaco verde para exportación.",
    risks:["Dependencia de mercados externos volátiles","Inversión en infraestructura portuaria significativa","Competencia con Australia, Chile, Medio Oriente y norte de África"],
  },
];

const MX_SECTORS = [
  { sector:"Refinación (PEMEX)", h2Use:"~180,000 t H₂/año", type:"Desulfuración, hydrocracking", potential:"Mayor consumidor de H₂ en México. Sustitución directa de H₂ gris por verde. PEMEX como comprador ancla.", priority:5, c:C.guinda },
  { sector:"Fertilizantes", h2Use:"~80,000 t H₂/año", type:"Producción de amoniaco y urea", potential:"Segundo consumidor. Amoniaco verde como producto exportable. Cadena directa producción→uso.", priority:5, c:C.guinda },
  { sector:"Químicos", h2Use:"~50,000 t H₂/año", type:"Metanol, peróxido de hidrógeno", potential:"Demanda concentrada en clusters industriales. Metanol verde como commodity exportable.", priority:4, c:C.dorado },
  { sector:"Minería y Metales", h2Use:"~40,000 t H₂/año", type:"Reducción directa de hierro, procesamiento", potential:"Acero verde para mercado doméstico e internacional. Clusters en Monterrey-Monclova.", priority:3, c:C.dorado },
  { sector:"Generación Eléctrica", h2Use:"Nuevo", type:"Co-combustión H₂/amoniaco en ciclo combinado", potential:"CFE podría co-combustionar H₂ en centrales existentes. Crea demanda flexible y de gran escala.", priority:3, c:C.verde },
  { sector:"Transporte Pesado", h2Use:"Nuevo", type:"Celdas de combustible para camiones, buses, trenes", potential:"Aplicación de largo plazo. Requiere infraestructura de distribución. Piloto en corredores logísticos.", priority:2, c:C.gris },
  { sector:"Puertos y Exportación", h2Use:"Nuevo", type:"Amoniaco verde, metanol, e-fuels para exportación", potential:"Veracruz, Lázaro Cárdenas, Altamira como hubs de exportación a UE, EE.UU., Asia.", priority:4, c:C.verde },
];

const INTL = [
  { c:"India", f:"🇮🇳", mandatos:5, offtake:3, procurement:2, carbon:2, export:2, tc:C.guinda, note:"Mandatos de H₂ verde en refinación (10%) y fertilizantes (5%). Modelo más agresivo de demanda obligatoria." },
  { c:"UE", f:"🇪🇺", mandatos:5, offtake:4, procurement:4, carbon:5, export:3, tc:C.verde, note:"RED III: 42% H₂ industrial RFNBO para 2030. CBAM encarece H₂ gris importado. Green Public Procurement." },
  { c:"Corea del Sur", f:"🇰🇷", mandatos:4, offtake:5, procurement:3, carbon:4, export:1, tc:C.dorado, note:"CHPS: demanda garantizada en sector eléctrico. KEPCO/KOGAS como compradores ancla. K-ETS activo." },
  { c:"Japón", f:"🇯🇵", mandatos:3, offtake:4, procurement:4, carbon:3, export:1, tc:C.dorado, note:"JERA co-combustiona amoniaco. Procurement de vehículos fuel cell. Contratos bilaterales de importación." },
  { c:"Alemania", f:"🇩🇪", mandatos:4, offtake:4, procurement:3, carbon:5, export:2, tc:C.verde, note:"H2Global como intermediario de compra. EU ETS + precio de carbono nacional. CBAM complementario." },
  { c:"Reino Unido", f:"🇬🇧", mandatos:3, offtake:5, procurement:3, carbon:4, export:2, tc:C.verde, note:"HPBM contratos de 15 años como offtake garantizado. UK ETS. Clusters como ancla de demanda." },
  { c:"Australia", f:"🇦🇺", mandatos:2, offtake:3, procurement:2, carbon:2, export:5, tc:C.dorado, note:"Modelo enfocado en exportación. Contratos con Japón y Corea. Hubs portuarios dedicados." },
  { c:"Chile", f:"🇨🇱", mandatos:1, offtake:1, procurement:1, carbon:1, export:3, tc:C.guinda, note:"Orientación exportadora pero sin mandatos ni offtake doméstico. Proyectos se estancan por falta de demanda." },
  { c:"México", f:"🇲🇽", mandatos:0, offtake:0, procurement:0, carbon:0, export:0, tc:C.gris, note:"Sin instrumentos de demanda. 390,000 t/año de potencial pero sin mandatos, contratos ni señales de precio." },
];

const TIMELINE = [
  { phase:"Inmediato (2026)", c:C.guinda, items:[
    { t:"Cuantificar la demanda actual de H₂ fósil por sector", d:"Estudio detallado con PEMEX, sector fertilizantes y químicos para saber exactamente cuánto H₂ gris se usa, dónde y a qué precio. Sin este dato, no se pueden diseñar mandatos ni contratos." },
    { t:"Evaluar viabilidad de mandatos de sustitución en PEMEX", d:"¿Puede PEMEX sustituir 5% de su H₂ gris por verde al 2028? ¿A qué costo? ¿Necesita inversión en infraestructura? Dialogar con PEMEX para definir trayectoria realista." },
    { t:"Incluir criterio de H₂ verde en Programa Nacional de Infraestructura", d:"Que las grandes obras públicas consideren compra de acero y cemento con contenido de H₂ verde. Señal temprana de demanda." },
  ]},
  { phase:"Corto plazo (2026–2027)", c:C.dorado, items:[
    { t:"Publicar mandatos de consumo de H₂ verde", d:"Obligar a refinación (5% al 2028, 10% al 2030) y fertilizantes (5% al 2029) a sustituir H₂ gris. Vinculado a certificación. Con penalidades por incumplimiento y periodo de gracia." },
    { t:"Estructurar primer contrato de offtake PEMEX-productor", d:"PEMEX firma contrato piloto de compra de H₂ verde para 1-2 refinerías. 10-15 años, volumen y precio definidos. Licitación competitiva entre productores." },
    { t:"Lanzar programa de compras públicas verdes", d:"Incluir criterio de carbono embebido en licitaciones de acero para infraestructura federal. Prima verde de hasta 10-15% sobre precio convencional." },
    { t:"Negociar acuerdos bilaterales de exportación", d:"Con UE (contexto CBAM), Japón y Corea. Memorandos de entendimiento para compra de amoniaco/H₂ verde mexicano. Alinear certificación con RFNBO." },
  ]},
  { phase:"Mediano plazo (2027–2030)", c:C.verde, items:[
    { t:"Escalar mandatos y ampliar a más sectores", d:"Subir porcentajes en refinación y fertilizantes. Incorporar químicos y acero. Introducir mandato de co-combustión de H₂/amoniaco en generación eléctrica (CFE)." },
    { t:"Introducir señal de precio al carbono sobre H₂ gris", d:"Sobretasa al H₂ producido con SMR sin captura. Trayectoria gradual. Ingresos destinados a fondo de transición que financia CfDs y CAPEX." },
    { t:"Desarrollar infraestructura de exportación", d:"Terminales de amoniaco en Veracruz y Altamira. Ductos dedicados en clusters. Logística para exportación transfronteriza a EE.UU." },
    { t:"Integrar H₂ en mercado de carbono mexicano", d:"Cuando el mercado de carbono esté operativo, incluir emisiones de H₂ fósil. Crear interacción entre señal de precio de carbono y mandatos de consumo." },
  ]},
];

const QUESTIONS = [
  { cat:"Mandatos de Consumo", c:C.guinda, qs:[
    "¿PEMEX puede técnicamente sustituir H₂ gris por verde en sus refinerías sin modificaciones mayores?",
    "¿Cuál es el porcentaje de sustitución realista para 2028? ¿Y para 2030?",
    "¿Cómo se diseñan las penalidades por incumplimiento sin paralizar operaciones industriales?",
    "¿Los mandatos aplican también a la industria privada o solo a entidades públicas?",
    "¿Cómo se garantiza que haya oferta suficiente de H₂ verde cuando los mandatos entren en vigor?",
  ]},
  { cat:"Contratos de Offtake", c:C.verde, qs:[
    "¿PEMEX tiene capacidad legal y financiera para firmar contratos de compra de H₂ verde a 10-15 años?",
    "¿A qué precio por kg de H₂ verde es viable el primer contrato de offtake?",
    "¿CFE podría co-combustionar H₂ o amoniaco en centrales de ciclo combinado existentes?",
    "¿Quién absorbe la diferencia de precio entre H₂ verde y gris: PEMEX, el gobierno, el consumidor?",
    "¿Se necesita un intermediario tipo H2Global o PEMEX/CFE pueden ser compradores directos?",
  ]},
  { cat:"Compras Públicas Verdes", c:C.dorado, qs:[
    "¿Existe marco legal para incluir criterios de carbono embebido en licitaciones públicas?",
    "¿Cuánto más caro sería el acero verde para obras de infraestructura (prima verde estimada)?",
    "¿Hay proveedores mexicanos que puedan ofrecer materiales con contenido de H₂ verde?",
    "¿Se puede aplicar a Tren Maya, Dos Bocas y otros megaproyectos retroactivamente?",
    "¿Cómo se verifica que el proveedor efectivamente usó H₂ verde en su proceso?",
  ]},
  { cat:"Señales de Precio al Carbono", c:"#666", qs:[
    "¿Es políticamente viable un impuesto al carbono sobre H₂ gris en México?",
    "¿Cuál sería la trayectoria de precio necesaria para cerrar la brecha H₂ verde vs gris?",
    "¿Cómo se coordina con el pilar de producción (evitar doble carga: impuesto + sin subsidio)?",
    "¿El CBAM europeo ya afecta exportaciones mexicanas de productos intensivos en H₂?",
    "¿Un fondo de transición financiado con recaudación de carbono es viable institucionalmente?",
  ]},
  { cat:"Exportación", c:C.verde, qs:[
    "¿Cuáles son los mercados de exportación más accesibles para México (EE.UU., UE, Japón)?",
    "¿Qué producto es más exportable: H₂ puro, amoniaco o metanol?",
    "¿Qué infraestructura portuaria se necesita y cuánto cuesta?",
    "¿La certificación mexicana será reconocida por la UE bajo CBAM?",
    "¿Cómo compite México en precio con Australia, Chile y norte de África?",
  ]},
];

const crd = { background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, padding:"20px 18px" };

export default function App() {
  const [ready,setReady]=useState(false);
  const [sec,setSec]=useState("reto");
  const {go,ok}=useExport();
  const refs={reto:useRef(null),inst:useRef(null),sect:useRef(null),intl:useRef(null),mx:useRef(null),qs:useRef(null)};
  useEffect(()=>{setTimeout(()=>setReady(true),100);},[]);

  return (
    <div style={{fontFamily:FF.b,background:C.bg,color:C.text,minHeight:"100vh",lineHeight:1.65}}>
      <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,400&family=Noto+Sans:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet"/>
      <style>{`*{box-sizing:border-box;margin:0;padding:0}@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}::selection{background:rgba(155,34,71,0.15)}@media print{.no-print{display:none!important}}`}</style>
      <div style={{background:C.guinda,height:5}}/>

      <header style={{background:C.bg,borderBottom:`1px solid ${C.border}`,padding:"22px 24px 18px",opacity:ready?1:0,transform:ready?"none":"translateY(-10px)",transition:"all 0.6s ease"}}>
        <div style={{maxWidth:940,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
            <div>
              <div style={{fontSize:10,letterSpacing:3,textTransform:"uppercase",color:C.gris,marginBottom:8,fontWeight:600}}>Propuesta de Análisis · Secretaría de Energía</div>
              <h1 style={{fontFamily:FF.h,fontSize:"clamp(20px,3vw,30px)",fontWeight:700,lineHeight:1.18,color:C.guinda,maxWidth:700}}>Estimular la Demanda de Hidrógeno Verde</h1>
              <p style={{fontSize:14,color:C.gris,marginTop:6,fontStyle:"italic",maxWidth:660}}>Mandatos de consumo, contratos de offtake, compras verdes, señales de carbono y exportación</p>
            </div>
            <div style={{textAlign:"right",fontSize:11,color:C.gris,lineHeight:1.6,flexShrink:0}}>
              <div style={{fontWeight:600}}>Marzo 2026</div>
              <div style={{marginTop:6,padding:"3px 10px",border:`1px solid ${C.guinda}40`,color:C.guinda,borderRadius:4,fontSize:10,letterSpacing:1,fontWeight:600}}>SENER · GCIEP</div>
            </div>
          </div>
        </div>
      </header>

      <nav className="no-print" style={{position:"sticky",top:0,zIndex:100,background:"rgba(255,255,255,0.95)",backdropFilter:"blur(12px)",borderBottom:`1px solid ${C.border}`,padding:"0 24px"}}>
        <div style={{maxWidth:940,margin:"0 auto",display:"flex",gap:0,overflowX:"auto"}}>
          {NAV.map(n=><button key={n.id} onClick={()=>setSec(n.id)} style={{fontFamily:FF.b,fontSize:11.5,fontWeight:sec===n.id?700:400,color:sec===n.id?C.guinda:C.gris,background:"none",border:"none",padding:"11px 14px",cursor:"pointer",whiteSpace:"nowrap",borderBottom:sec===n.id?`3px solid ${C.guinda}`:"3px solid transparent",marginBottom:-1,transition:"all 0.2s"}}><span style={{marginRight:4}}>{n.icon}</span>{n.label}</button>)}
        </div>
      </nav>

      <main style={{maxWidth:940,margin:"0 auto",padding:"26px 24px 72px"}}>

        {sec==="reto"&&<div style={{animation:"fadeUp 0.5s ease"}}>
          <h2 style={{fontFamily:FF.h,fontSize:20,fontWeight:700,color:C.guinda,marginBottom:12,paddingBottom:6,borderBottom:`2px solid ${C.guinda}`}}>El reto: sin comprador, no hay productor</h2>
          <p style={{fontSize:15,lineHeight:1.75,marginBottom:14}}>El hallazgo más contundente del benchmarking internacional es que <strong>subsidiar solo la producción no alcanza</strong>. Chile tiene recursos renovables excepcionales y co-financiamiento CAPEX, pero sin mecanismos de demanda garantizada sus proyectos se estancan. India, en cambio, con mandatos obligatorios de consumo de H₂ verde en refinación y fertilizantes, está creando mercado real.</p>
          <p style={{fontSize:15,lineHeight:1.75,marginBottom:14}}>México consume <strong>~390,000 toneladas de H₂ al año</strong> en refinación, fertilizantes, químicos y minería. Todo ese hidrógeno es fósil. La pregunta no es si hay demanda — ya la hay. La pregunta es <strong>cómo convertir demanda de H₂ gris en demanda de H₂ verde</strong>.</p>

          <div style={{display:"flex",justifyContent:"flex-end",marginBottom:8}}><DL onClick={()=>go(refs.reto,"reto_demanda")} ok={ok}/></div>
          <div ref={refs.reto} style={{background:"#fff",borderRadius:8,padding:"22px 18px",border:`1px solid ${C.border}`}}>
            <div style={{fontFamily:FF.h,fontSize:14,fontWeight:700,color:C.guinda,marginBottom:16}}>¿Por qué la demanda es el eslabón faltante?</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14}}>
              {[
                {t:"El productor necesita comprador",d:"Sin contrato de offtake, ningún banco financia. El riesgo de demanda es la barrera #1 para bankability.",icon:"📝",c:C.guinda},
                {t:"El H₂ gris es más barato",d:"Sin obligación de cambiar, la industria no sustituye voluntariamente. Los mandatos crean la señal.",icon:"💸",c:C.dorado},
                {t:"La exportación sola no basta",d:"Chile depende de exportación pero sin mercado doméstico. El mercado interno da estabilidad.",icon:"🌊",c:C.verde},
                {t:"Demanda crea escala, escala baja costos",d:"Más demanda = más producción = curva de aprendizaje = costos más bajos. Círculo virtuoso.",icon:"📈",c:"#555"},
              ].map((d,i)=><div key={i} style={{...crd,borderTop:`3px solid ${d.c}`,textAlign:"center"}}><div style={{fontSize:28,marginBottom:6}}>{d.icon}</div><h4 style={{fontFamily:FF.h,fontSize:13,fontWeight:700,color:d.c,marginBottom:4}}>{d.t}</h4><p style={{fontSize:12.5,color:"#555",lineHeight:1.55}}>{d.d}</p></div>)}
            </div>
            <div style={{background:C.verdeLt,borderRadius:6,padding:"14px",marginTop:16}}>
              <p style={{fontSize:13,color:C.verde,lineHeight:1.55,fontWeight:500}}>Hallazgo D2: "El anclaje de demanda puede sustituir subsidios de producción. Corea del Sur prioriza demanda garantizada vía offtake regulado en lugar de soporte directo a producción."</p>
            </div>
          </div>
        </div>}

        {sec==="instrumentos"&&<div style={{animation:"fadeUp 0.5s ease"}}>
          <h2 style={{fontFamily:FF.h,fontSize:20,fontWeight:700,color:C.guinda,marginBottom:4,paddingBottom:6,borderBottom:`2px solid ${C.guinda}`}}>Cinco Instrumentos para Estimular Demanda</h2>
          <p style={{fontSize:14,color:C.gris,marginBottom:20}}>Desde mandatos obligatorios hasta señales de precio. Se complementan entre sí.</p>
          <div style={{display:"flex",justifyContent:"flex-end",marginBottom:8}}><DL onClick={()=>go(refs.inst,"instrumentos_demanda")} ok={ok}/></div>
          <div ref={refs.inst} style={{display:"grid",gap:18,background:"#fff",padding:8}}>
            {INSTRUMENTS.map((a,i)=><div key={i} style={{...crd,borderLeft:`5px solid ${a.color}`}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}><span style={{fontSize:28}}>{a.icon}</span><div><h3 style={{fontFamily:FF.h,fontSize:17,fontWeight:700,color:a.color,lineHeight:1.2}}>{a.title}</h3><div style={{fontSize:12,color:C.gris}}>{a.subtitle}</div></div></div>
              <p style={{fontSize:13.5,lineHeight:1.65,color:"#444",marginBottom:14}}>{a.what}</p>
              <div style={{marginBottom:14}}><div style={{fontSize:10.5,fontWeight:700,color:a.color,textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>Cómo funciona</div>{a.how.map((h,j)=><div key={j} style={{display:"flex",gap:8,padding:"3px 0"}}><span style={{color:a.color,fontSize:11,marginTop:2,flexShrink:0}}>▸</span><span style={{fontSize:12.5,color:"#555",lineHeight:1.5}}>{h}</span></div>)}</div>
              <div style={{background:C.verdeLt,borderRadius:6,padding:"10px 12px",marginBottom:12}}><div style={{fontSize:10.5,fontWeight:700,color:C.verde,textTransform:"uppercase",letterSpacing:1,marginBottom:3}}>Referencia internacional</div><p style={{fontSize:12,lineHeight:1.55,color:"#444"}}>{a.intlRef}</p></div>
              <div><div style={{fontSize:10.5,fontWeight:700,color:C.gris,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Riesgos</div><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{a.risks.map((rk,j)=><span key={j} style={{fontSize:11,background:"#fff3e0",color:"#c06000",padding:"3px 10px",borderRadius:10,border:"1px solid #f0d0a0"}}>{rk}</span>)}</div></div>
            </div>)}
          </div>
        </div>}

        {sec==="sectores"&&<div style={{animation:"fadeUp 0.5s ease"}}>
          <h2 style={{fontFamily:FF.h,fontSize:20,fontWeight:700,color:C.guinda,marginBottom:4,paddingBottom:6,borderBottom:`2px solid ${C.guinda}`}}>Sectores Clave para México</h2>
          <p style={{fontSize:14,color:C.gris,marginBottom:20}}>Dónde está la demanda hoy y dónde se puede crear.</p>
          <div style={{display:"flex",justifyContent:"flex-end",marginBottom:8}}><DL onClick={()=>go(refs.sect,"sectores_demanda_mx")} ok={ok}/></div>
          <div ref={refs.sect} style={{background:"#fff",borderRadius:8,padding:"22px 18px",border:`1px solid ${C.border}`,overflowX:"auto"}}>
            <div style={{fontFamily:FF.h,fontSize:14,fontWeight:700,color:C.guinda,marginBottom:14}}>Mapa de demanda de H₂ en México por sector</div>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,fontFamily:FF.b}}>
              <thead><tr style={{borderBottom:`2px solid ${C.guinda}`}}>{["Sector","Consumo actual","Uso","Prioridad","Oportunidad para H₂ verde"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"8px 8px",fontWeight:700,color:C.guinda,fontSize:10,letterSpacing:0.5,textTransform:"uppercase"}}>{h}</th>)}</tr></thead>
              <tbody>{MX_SECTORS.map((s,i)=><tr key={i} style={{borderBottom:`1px solid ${C.grisCl}`,background:i%2===0?C.surface:"#fff"}}>
                <td style={{padding:"9px 8px",fontWeight:700,fontSize:12.5}}>{s.sector}</td>
                <td style={{padding:"9px 8px",fontSize:12,color:"#555"}}>{s.h2Use}</td>
                <td style={{padding:"9px 8px",fontSize:11.5,color:"#555"}}>{s.type}</td>
                <td style={{padding:"9px 8px"}}><HBar value={s.priority} max={5} color={s.c} label={`${s.priority}/5`}/></td>
                <td style={{padding:"9px 8px",fontSize:11.5,color:"#555",lineHeight:1.4,maxWidth:240}}>{s.potential}</td>
              </tr>)}</tbody>
            </table>
          </div>
        </div>}

        {sec==="internacional"&&<div style={{animation:"fadeUp 0.5s ease"}}>
          <h2 style={{fontFamily:FF.h,fontSize:20,fontWeight:700,color:C.guinda,marginBottom:4,paddingBottom:6,borderBottom:`2px solid ${C.guinda}`}}>Comparativo Internacional</h2>
          <p style={{fontSize:14,color:C.gris,marginBottom:20}}>Qué instrumentos de demanda usa cada país.</p>
          <div style={{display:"flex",justifyContent:"flex-end",marginBottom:8}}><DL onClick={()=>go(refs.intl,"comparativo_demanda")} ok={ok}/></div>
          <div ref={refs.intl} style={{background:"#fff",borderRadius:8,padding:"22px 18px",border:`1px solid ${C.border}`,overflowX:"auto"}}>
            <div style={{fontFamily:FF.h,fontSize:14,fontWeight:700,color:C.guinda,marginBottom:14}}>Madurez de instrumentos de demanda de H₂</div>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,fontFamily:FF.b}}>
              <thead><tr style={{borderBottom:`2px solid ${C.guinda}`}}>{["País","Mandatos","Offtake","Compras","Carbono","Export","Nota"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"8px 6px",fontWeight:700,color:C.guinda,fontSize:10,letterSpacing:0.5,textTransform:"uppercase"}}>{h}</th>)}</tr></thead>
              <tbody>{INTL.map((row,i)=><tr key={i} style={{borderBottom:`1px solid ${C.grisCl}`,background:row.c==="México"?C.guindaLt:i%2===0?C.surface:"#fff"}}>
                <td style={{padding:"8px 6px",fontWeight:700,fontSize:12,whiteSpace:"nowrap"}}>{row.f} {row.c}</td>
                {[row.mandatos,row.offtake,row.procurement,row.carbon,row.export].map((v,j)=><td key={j} style={{padding:"8px 6px"}}><HBar value={v} max={5} color={v===0?"#ddd":v>=4?C.verde:v>=3?C.dorado:C.guinda} label={`${v}/5`}/></td>)}
                <td style={{padding:"8px 6px",fontSize:11,color:"#555",lineHeight:1.35,maxWidth:220}}>{row.note}</td>
              </tr>)}</tbody>
            </table>
          </div>
        </div>}

        {sec==="mexico"&&<div style={{animation:"fadeUp 0.5s ease"}}>
          <h2 style={{fontFamily:FF.h,fontSize:20,fontWeight:700,color:C.guinda,marginBottom:4,paddingBottom:6,borderBottom:`2px solid ${C.guinda}`}}>Propuesta de Implementación</h2>
          <p style={{fontSize:14,color:C.gris,marginBottom:20}}>Secuencia de acciones para crear demanda doméstica e internacional de H₂ verde.</p>
          <div style={{display:"flex",justifyContent:"flex-end",marginBottom:8}}><DL onClick={()=>go(refs.mx,"ruta_demanda_mx")} ok={ok}/></div>
          <div ref={refs.mx} style={{background:"#fff",borderRadius:8,padding:"26px 22px 26px 48px",border:`1px solid ${C.border}`,position:"relative"}}>
            <div style={{fontFamily:FF.h,fontSize:16,fontWeight:700,color:C.guinda,marginBottom:22}}>Ruta para estimular demanda de H₂ verde</div>
            <div style={{position:"absolute",left:32,top:68,bottom:30,width:2,background:`linear-gradient(to bottom,${C.guinda},${C.dorado},${C.verde})`,borderRadius:1}}/>
            {TIMELINE.map((ph,pi)=><div key={pi} style={{marginBottom:30}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,position:"relative"}}><div style={{position:"absolute",left:-24,width:16,height:16,borderRadius:"50%",background:ph.c,border:"3px solid #fff",boxShadow:`0 0 0 2px ${ph.c}40`}}/><h3 style={{fontFamily:FF.h,fontSize:15,fontWeight:700,color:ph.c}}>{ph.phase}</h3></div>
              <div style={{display:"grid",gap:10}}>{ph.items.map((it,ii)=><div key={ii} style={{background:C.surface,borderRadius:6,padding:"14px 14px",borderLeft:`3px solid ${ph.c}`}}><h4 style={{fontFamily:FF.h,fontSize:13,fontWeight:700,color:C.text,marginBottom:4}}>{it.t}</h4><p style={{fontSize:12.5,lineHeight:1.55,color:"#555"}}>{it.d}</p></div>)}</div>
            </div>)}
          </div>
        </div>}

        {sec==="preguntas"&&<div style={{animation:"fadeUp 0.5s ease"}}>
          <h2 style={{fontFamily:FF.h,fontSize:20,fontWeight:700,color:C.guinda,marginBottom:4,paddingBottom:6,borderBottom:`2px solid ${C.guinda}`}}>Preguntas Estratégicas</h2>
          <p style={{fontSize:14,color:C.gris,marginBottom:20}}>25 preguntas en 5 categorías sobre cómo crear demanda de H₂ verde en México.</p>
          <div style={{display:"flex",justifyContent:"flex-end",marginBottom:8}}><DL onClick={()=>go(refs.qs,"preguntas_demanda")} ok={ok}/></div>
          <div ref={refs.qs} style={{display:"grid",gap:16,background:"#fff",padding:8}}>
            {QUESTIONS.map((cat,ci)=><div key={ci} style={{...crd,borderLeft:`4px solid ${cat.c}`}}>
              <h3 style={{fontFamily:FF.h,fontSize:15,fontWeight:700,color:cat.c,marginBottom:12}}>{cat.cat}</h3>
              {cat.qs.map((q,qi)=><div key={qi} style={{display:"flex",gap:10,padding:"6px 0",borderBottom:qi<cat.qs.length-1?`1px solid ${C.grisCl}`:"none"}}><span style={{fontFamily:FF.b,fontSize:11,fontWeight:700,color:cat.c,minWidth:22,marginTop:1}}>{qi+1}.</span><span style={{fontSize:13,color:"#444",lineHeight:1.55}}>{q}</span></div>)}
            </div>)}
          </div>
          <div style={{background:C.verdeLt,border:`1px solid ${C.verde}30`,borderRadius:8,padding:"18px 18px",marginTop:20}}>
            <h3 style={{fontFamily:FF.h,fontSize:14,fontWeight:700,color:C.verde,marginBottom:6}}>Siguiente paso propuesto</h3>
            <p style={{fontSize:13.5,lineHeight:1.6,color:"#444"}}>Organizar un <strong>taller de demanda con SENER, PEMEX, CFE, sector fertilizantes (FERTIMEX/privados) y SE (Secretaría de Economía)</strong> para cuantificar demanda actual, evaluar viabilidad de mandatos y estructurar el primer contrato de offtake piloto. Este taller alimentaría el capítulo de demanda del Plan Nacional de Hidrógeno Renovable.</p>
          </div>
        </div>}

        <footer style={{fontSize:11,color:C.gris,textAlign:"center",padding:"24px 0 0",marginTop:36,borderTop:`1px solid ${C.border}`}}>
          <div>Propuesta basada en GCIEP D2, experiencia internacional y análisis sectorial</div>
          <div style={{marginTop:3,color:C.guinda,fontWeight:600}}>Secretaría de Energía · Gobierno de México</div>
        </footer>
      </main>
    </div>
  );
}
