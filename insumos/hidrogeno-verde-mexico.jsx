import { useState, useEffect, useRef } from "react";

const COUNTRIES = {
  germany: {
    name: "Alemania",
    flag: "🇩🇪",
    tier: "advanced",
    tierLabel: "Avanzado",
    color: "#D4A843",
    coords: { x: 52, y: 22 },
    governance: {
      score: 5,
      highlights: [
        "Estrategia Nacional de Hidrógeno vinculante como ancla institucional formal",
        "Liderazgo híbrido energía-industria bajo BMWK",
        "Coordinación interministerial formal y mecanismos de monitoreo estructurados",
        "Hidrógeno integrado en políticas de energía, clima e industriales",
        "Cooperación internacional institucionalizada (IPCEI, UE)"
      ]
    },
    regulation: {
      score: 5,
      highlights: [
        "Definiciones alineadas con la UE (criterios RFNBO)",
        "Sistema de certificación operativo (Garantías de Origen)",
        "Marco regulatorio claro con referencia común institucional",
        "Regulación embebida en leyes energéticas existentes + específica para H2",
        "Brechas regulatorias menores, principalmente en escalamiento"
      ]
    },
    policy: {
      score: 5,
      highlights: [
        "Incentivos fiscales dentro de marcos de energías renovables",
        "Financiamiento público robusto (KfW, IPCEI) para electrolizadores e infraestructura",
        "H2Global: mecanismo CfD de soporte de ingresos mediante compras públicas",
        "Estándares y certificación RFNBO operativos",
        "Planificación de red troncal de hidrógeno (BNetzA)"
      ]
    },
    keyLesson: "La combinación y secuenciación de instrumentos —no uno solo— es lo que permite escalar. Alemania muestra el modelo más completo de gobernanza, regulación y política coordinadas."
  },
  netherlands: {
    name: "Países Bajos",
    flag: "🇳🇱",
    tier: "advanced",
    tierLabel: "Avanzado",
    color: "#E8793A",
    coords: { x: 50, y: 21 },
    governance: {
      score: 5,
      highlights: [
        "Modelo de gobernanza liderado por infraestructura",
        "Gasunie (operador estatal de red) lidera planificación de transporte de H2",
        "Puerto de Róterdam como hub central de clústeres industriales",
        "Cooperación regional institucionalizada (UE, Mar del Norte)",
        "Integración estrecha con marcos de red regulada"
      ]
    },
    regulation: {
      score: 4,
      highlights: [
        "Regulación vía leyes energéticas existentes alineadas con la UE",
        "Elementos específicos de H2 introducidos por regulación secundaria",
        "Sin ley dedicada de hidrógeno, pero cobertura regulatoria efectiva",
        "Certificación alineada con RFNBO y Garantías de Origen",
        "Permisos simplificados para integración temprana"
      ]
    },
    policy: {
      score: 5,
      highlights: [
        "SDE++ como mecanismo de soporte de ingresos operativo",
        "Financiamiento público vía RVO para transición energética",
        "Infraestructura regulada: red troncal de H2 y reconversión de gasoductos",
        "Estrategia de hubs portuarios para importación y distribución",
        "Backbone Europeo de Hidrógeno como activo estratégico"
      ]
    },
    keyLesson: "La infraestructura compartida y regulada reduce costos de integración. Países Bajos demuestra que planificar la red desde el inicio permite el desarrollo paralelo de múltiples proyectos."
  },
  uk: {
    name: "Reino Unido",
    flag: "🇬🇧",
    tier: "advanced",
    tierLabel: "Avanzado",
    color: "#3B82C4",
    coords: { x: 47, y: 20 },
    governance: {
      score: 5,
      highlights: [
        "DESNZ lidera estrategia, diseño de mercado y elegibilidad",
        "Gobernanza integrada en descarbonización industrial y net zero",
        "Ofgem regula redes de gas y electricidad (incluida futura adaptación H2)",
        "LCCC como contraparte contractual de mecanismos de soporte",
        "Despliegue organizado por clústeres industriales designados"
      ]
    },
    regulation: {
      score: 4,
      highlights: [
        "UK Low Carbon Hydrogen Standard define umbrales de emisiones",
        "Definiciones y certificación establecidas",
        "Brechas moderadas en escalamiento e integración sistémica",
        "Proyectos navegan mezcla de requisitos establecidos y emergentes",
        "Estándar replicable para elegibilidad de soporte"
      ]
    },
    policy: {
      score: 5,
      highlights: [
        "HPBM: contratos de ingreso estandarizados a largo plazo",
        "Hydrogen Allocation Rounds (HAR): rondas competitivas repetibles",
        "Net Zero Hydrogen Fund (NZHF) para financiamiento público",
        "Despliegue basado en clústeres con coordinación regional",
        "Integración de producción H2 en planificación del sistema eléctrico"
      ]
    },
    keyLesson: "Los contratos estandarizados y repetibles (HAR/HPBM) crean una vía replicable para proyectos. El enfoque de clústeres industriales permite coordinar producción y demanda."
  },
  japan: {
    name: "Japón",
    flag: "🇯🇵",
    tier: "medium",
    tierLabel: "Medio",
    color: "#DC4040",
    coords: { x: 82, y: 30 },
    governance: {
      score: 4,
      highlights: [
        "METI lidera estrategia, regulación y financiamiento de forma centralizada",
        "Enfoque en seguridad energética y cadenas de suministro",
        "JOGMEC apoya financiamiento y mitigación de riesgo internacional",
        "Cooperación bilateral formalizada con socios de suministro",
        "Miembro fundador de Mission Innovation Hydrogen Mission"
      ]
    },
    regulation: {
      score: 4,
      highlights: [
        "Marcos formales de seguridad y manejo de hidrógeno establecidos",
        "Ley de Promoción de Sociedad del Hidrógeno",
        "Claridad regulatoria para despliegue downstream e infraestructura",
        "Definiciones y criterios de bajo carbono en evolución",
        "Regulación madura para importación y almacenamiento"
      ]
    },
    policy: {
      score: 4,
      highlights: [
        "Mecanismos de soporte de brecha de precio para H2/amoniaco",
        "Programas de co-combustión en generación eléctrica",
        "Marco GX (Green Transformation) para transición energética",
        "Subsidios METI para producción, infraestructura y terminales de importación",
        "Enfoque en creación de demanda más que en producción doméstica"
      ]
    },
    keyLesson: "La demanda garantizada puede sustituir subsidios a la producción. Japón muestra que anclar la demanda (co-combustión, industria) es viable cuando la producción doméstica es limitada."
  },
  australia: {
    name: "Australia",
    flag: "🇦🇺",
    tier: "medium",
    tierLabel: "Medio",
    color: "#2ECC71",
    coords: { x: 85, y: 65 },
    governance: {
      score: 4,
      highlights: [
        "Modelo federal-estatal con dirección nacional y ejecución estatal",
        "ARENA administra grants e innovación",
        "Clean Energy Regulator supervisa certificación renovable",
        "Roles claramente delineados entre niveles de gobierno",
        "Diseñado para proyectos grandes basados en hubs"
      ]
    },
    regulation: {
      score: 3,
      highlights: [
        "Certificación nacional en desarrollo para credibilidad de exportación",
        "Marcos regulatorios aún evolucionando",
        "Dirección clara pero madurez de certificación en progreso",
        "Alineación con requisitos de mercados de exportación",
        "Permisología estatal variable según jurisdicción"
      ]
    },
    policy: {
      score: 4,
      highlights: [
        "Hydrogen Headstart: soporte de ingresos para proyectos a gran escala",
        "ARENA y CEFC para financiamiento público y co-inversión",
        "Desarrollo de hubs alineado con zonas de recursos renovables",
        "Infraestructura compartida en puertos para exportación",
        "Énfasis en financiamiento CAPEX para primeros proyectos"
      ]
    },
    keyLesson: "Los hubs de hidrógeno vinculados a puertos y zonas renovables reducen costos de infraestructura y aceleran la integración para mercados de exportación."
  },
  southkorea: {
    name: "Corea del Sur",
    flag: "🇰🇷",
    tier: "medium",
    tierLabel: "Medio",
    color: "#6C5CE7",
    coords: { x: 80, y: 30 },
    governance: {
      score: 4,
      highlights: [
        "MOTIE lidera estrategia bajo ley dedicada de economía del hidrógeno",
        "Coordinación interministerial formal",
        "KEPCO y KOGAS (empresas estatales) ejecutan despliegue",
        "Marco legal dedicado (Hydrogen Economy Act)",
        "Modelo estatal con implementación vía empresas públicas"
      ]
    },
    regulation: {
      score: 5,
      highlights: [
        "Ley dedicada de Economía del Hidrógeno y Seguridad",
        "Certificación de hidrógeno limpio bajo ley dedicada",
        "Reglas específicas de seguridad, certificación y participación de mercado",
        "Alcance legal claro y reducción de ambigüedad",
        "Regulación más avanzada entre mercados de escala media"
      ]
    },
    policy: {
      score: 4,
      highlights: [
        "CHPS: mercado de licitación para generación con H2 limpio",
        "Anclaje de demanda vía sector eléctrico (co-combustión)",
        "Financiamiento para cadenas de suministro y electrolizadores",
        "KOGAS: terminales de importación y almacenamiento",
        "Programa Hydrogen Cities para distribución downstream"
      ]
    },
    keyLesson: "Una ley dedicada de hidrógeno proporciona claridad legal única, pero típicamente aparece en etapas avanzadas. Corea demuestra que el anclaje de demanda vía sector eléctrico es un motor poderoso."
  },
  china: {
    name: "China",
    flag: "🇨🇳",
    tier: "medium",
    tierLabel: "Medio",
    color: "#E74C3C",
    coords: { x: 75, y: 32 },
    governance: {
      score: 4,
      highlights: [
        "NDRC y NEA establecen dirección estratégica central",
        "Gobiernos provinciales y SOEs ejecutan proyectos",
        "Coordinación administrativa más que basada en mercado",
        "Parques industriales y bases renovables como unidades de ejecución",
        "Sin ley de mercado dedicada; gobernanza por planificación"
      ]
    },
    regulation: {
      score: 3,
      highlights: [
        "Estándares técnicos y de seguridad nacionales (SAC)",
        "Regulación embebida en planes sectoriales provinciales",
        "Sin mercado o certificación tipo UE",
        "Directrices técnicas para integración renovable-H2",
        "Enfoque en estándares operacionales más que en certificación"
      ]
    },
    policy: {
      score: 4,
      highlights: [
        "Financiamiento público fuerte vía bancos de desarrollo (CDB)",
        "Programas provinciales para parques industriales de H2",
        "Inversión balance-sheet de empresas estatales (Sinopec, Baowu)",
        "Menor dependencia de instrumentos de mercado (CfDs, subastas)",
        "Planificación centralizada como motor principal"
      ]
    },
    keyLesson: "La escala industrial puede lograrse por coordinación administrativa y SOEs, pero requiere un ecosistema institucional muy diferente al de mercados abiertos."
  },
  india: {
    name: "India",
    flag: "🇮🇳",
    tier: "emerging",
    tierLabel: "Emergente",
    color: "#FF9933",
    coords: { x: 70, y: 40 },
    governance: {
      score: 3,
      highlights: [
        "Misión Nacional de Hidrógeno Verde (NGHM) como marco central",
        "MNRE con mandato general; múltiples ministerios involucrados",
        "Comité directivo interministerial bajo NGHM",
        "SHIP (Strategic Hydrogen Innovation Partnership) multiactores",
        "Roles institucionales aún consolidándose"
      ]
    },
    regulation: {
      score: 2,
      highlights: [
        "Definiciones de hidrógeno verde introducidas vía NGHM",
        "Criterios guían programas tempranos mientras se refinan parámetros",
        "Referencia regulatoria usable pero en evolución",
        "Certificación y contabilidad de emisiones en desarrollo",
        "Brechas en marcos de permisos específicos para H2"
      ]
    },
    policy: {
      score: 3,
      highlights: [
        "SIGHT: programa de soporte CAPEX para electrolizadores y manufactura",
        "Incentivos para manufactura doméstica de electrolizadores",
        "Metas de demanda en desarrollo",
        "Integración industrial en refinerías y fertilizantes como pilotos",
        "Enfoque 'scale-first' con regulación siguiendo al despliegue"
      ]
    },
    keyLesson: "El modelo de misión permite arranque rápido, pero los roles institucionales deben consolidarse. La claridad regulatoria mejora iterativamente conforme avanzan los proyectos."
  },
  chile: {
    name: "Chile",
    flag: "🇨🇱",
    tier: "emerging",
    tierLabel: "Emergente",
    color: "#C0392B",
    coords: { x: 28, y: 68 },
    governance: {
      score: 3,
      highlights: [
        "Ministerio de Energía lidera dirección estratégica",
        "CORFO como agencia de implementación principal (CAPEX, pilotos)",
        "Permisos ambientales por procesos nacionales establecidos",
        "Hidrógeno como prioridad estratégica en estrategia nacional",
        "Integración en gobernanza industrial orientada a exportación en evolución"
      ]
    },
    regulation: {
      score: 2,
      highlights: [
        "Definiciones en estrategia nacional y hoja de ruta regulatoria",
        "Certificación en proceso de maduración",
        "Alineación con estándares internacionales para mercados de exportación",
        "Sin ley dedicada; regulación embebida en marco energético",
        "Criterios de sostenibilidad ambiental aplicables a proyectos H2"
      ]
    },
    policy: {
      score: 3,
      highlights: [
        "Incentivos fiscales generales de energías renovables aplicados a H2",
        "CORFO: co-financiamiento CAPEX competitivo para pilotos y FOAK",
        "Sin mecanismos CfD o garantías de ingresos",
        "Riesgo de mercado con sector privado a largo plazo",
        "Hubs regionales y corredores de exportación en desarrollo (Magallanes)"
      ]
    },
    keyLesson: "Chile tiene recursos excepcionales pero sin estabilización de ingresos, los proyectos no escalan. La brecha entre ambición y bankability requiere mecanismos de absorción de riesgo."
  },
  colombia: {
    name: "Colombia",
    flag: "🇨🇴",
    tier: "early",
    tierLabel: "Temprano",
    color: "#F1C40F",
    coords: { x: 26, y: 48 },
    governance: {
      score: 2,
      highlights: [
        "MME lidera política dentro de agenda de transición energética",
        "Instituciones de planificación y regulación apoyan según configuración",
        "Enfoque en pilotos y aprendizaje regulatorio",
        "Sandboxes regulatorios para pruebas controladas",
        "Coordinación informal y basada en proyectos"
      ]
    },
    regulation: {
      score: 1,
      highlights: [
        "Reconocimiento legal del H2 verde en marco de renovables",
        "Estándares técnicos en desarrollo",
        "Sandboxes regulatorios para pilotos",
        "Sin certificación ni permisos específicos de H2",
        "Brechas significativas en seguridad, permisos y certificación"
      ]
    },
    policy: {
      score: 2,
      highlights: [
        "Soporte a pilotos y estudios de factibilidad",
        "Incentivos fiscales limitados, sin soporte de ingresos",
        "Sin CfDs ni instrumentos de mercado dedicados",
        "Pilotos liderados por Ecopetrol y actores nacionales",
        "Sin redes de transporte ni hubs dedicados"
      ]
    },
    keyLesson: "Colombia refleja la etapa temprana donde la prioridad es clarificar el marco regulatorio antes de intentar despliegue a escala."
  },
  peru: {
    name: "Perú",
    flag: "🇵🇪",
    tier: "early",
    tierLabel: "Temprano",
    color: "#D35400",
    coords: { x: 25, y: 58 },
    governance: {
      score: 1,
      highlights: [
        "MINEM lidera desarrollo de política en fase de planificación",
        "ProInversión apoya promoción de inversión",
        "Actividad enfocada en hojas de ruta, estudios y consultas",
        "Sin programas de despliegue operativos",
        "Gobernanza orientada a definir caminos futuros"
      ]
    },
    regulation: {
      score: 1,
      highlights: [
        "Regulación en etapa de hoja de ruta y planificación",
        "Proyectos regulados por leyes existentes sin guía específica de H2",
        "Brechas significativas en seguridad, permisos y certificación",
        "Sin certificación ni marco regulatorio dedicado",
        "Definiciones indicativas en hoja de ruta sin operacionalizar"
      ]
    },
    policy: {
      score: 1,
      highlights: [
        "Actividad limitada a estudios, diagnósticos y consultas",
        "Sin instrumentos de financiamiento público dedicados",
        "Sin soporte de ingresos ni instrumentos de mercado",
        "Sin infraestructura de transporte ni hubs planeados",
        "Proyectos conceptuales o en etapa de factibilidad"
      ]
    },
    keyLesson: "Perú ilustra el punto de partida donde todo está por construirse. México comparte algunas de estas características y debe evitar quedarse en esta etapa."
  }
};

const MEXICO = {
  name: "México",
  flag: "🇲🇽",
  situation: [
    "Etapa formativa en desarrollo de hidrógeno verde",
    "Recursos renovables fuertes (solar y eólido) y base industrial establecida",
    "La mayoría de proyectos en etapa de concepto o factibilidad",
    "Sin legislación dedicada de hidrógeno (Lineamientos 2024 como paso inicial)",
    "Responsabilidades institucionales dispersas entre múltiples autoridades",
    "Sin decisión final de inversión (FID) en ningún proyecto",
    "Potencial de sustitución piloto de +390,000 t H2/año en sectores clave",
    "Concentración industrial en Veracruz, Tamaulipas, NL, Sonora, BC, Durango"
  ],
  recommendations: [
    {
      phase: "Fase 1: Fundamentos (0-2 años)",
      icon: "🏗️",
      actions: [
        "Establecer liderazgo institucional claro (modelo híbrido energía-industria como Alemania)",
        "Crear mecanismo formal de coordinación interministerial (SENER + SE + SEMARNAT + CFE)",
        "Definir hidrógeno verde con criterios claros de emisiones y fuentes renovables",
        "Desarrollar marco regulatorio adaptando leyes existentes (Ley Eléctrica, Ley de Hidrocarburos)",
        "Emitir estrategia nacional vinculante como ancla institucional",
        "Activar incentivos fiscales y financiamiento público para pilotos"
      ]
    },
    {
      phase: "Fase 2: Escalamiento (2-5 años)",
      icon: "📈",
      actions: [
        "Introducir mecanismos de estabilización de ingresos (tipo CfD o H2Global)",
        "Desarrollar sistema de certificación alineado con estándares internacionales",
        "Planificar infraestructura compartida en clústeres industriales existentes",
        "Establecer hubs de hidrógeno en zonas de co-localización recurso-demanda",
        "Crear mecanismos de anclaje de demanda (mandatos de mezcla, offtake regulado)",
        "Institucionalizar cooperación internacional bilateral y multilateral"
      ]
    },
    {
      phase: "Fase 3: Integración Sistémica (5-10 años)",
      icon: "🌐",
      actions: [
        "Coordinar infraestructura de transporte (ductos, puertos, almacenamiento)",
        "Integrar producción H2 en planificación del sistema eléctrico nacional",
        "Considerar legislación dedicada de hidrógeno cuando la complejidad lo requiera",
        "Evolucionar política hacia integración sistémica y coordinación de infraestructura",
        "Desarrollar capacidad exportadora vinculada a hubs portuarios",
        "Monitorear y evaluar progreso con marco estructurado de indicadores"
      ]
    }
  ],
  keyFindings: [
    {
      title: "La secuenciación importa más que cualquier instrumento individual",
      detail: "No hay una política única que explique el éxito. Los resultados dependen de cómo se secuencian gobernanza, regulación y política conforme los mercados evolucionan."
    },
    {
      title: "La gobernanza madura es el diferenciador más fuerte",
      detail: "Países que escalan anclan el H2 en estrategias nacionales vinculantes, aseguran liderazgo institucional claro y mantienen coordinación interagencial formal."
    },
    {
      title: "La certeza regulatoria evoluciona incrementalmente",
      detail: "Incluso mercados avanzados tienen brechas. La regulación se refina progresivamente — no se diseña completa desde el inicio."
    },
    {
      title: "Sin absorción de riesgo de ingresos, los proyectos no escalan",
      detail: "Países que superan pilotos consistentemente introducen mecanismos de estabilización de ingresos (CfDs, subastas, contratos públicos)."
    },
    {
      title: "La infraestructura compartida es esencial al escalar",
      detail: "Sin coordinación de infraestructura, los costos se inflan y la integración se estanca."
    },
    {
      title: "Las políticas solo de producción son insuficientes",
      detail: "Asegurar demanda a largo plazo mediante políticas dirigidas es igualmente crucial para crear un mercado estable."
    }
  ]
};

const DIMENSIONS = {
  governance: { label: "Gobernanza", icon: "🏛️", color: "#3B82F6" },
  regulation: { label: "Regulación", icon: "⚖️", color: "#8B5CF6" },
  policy: { label: "Política", icon: "🎯", color: "#10B981" }
};

const TIERS = {
  advanced: { label: "Avanzado", color: "#D4A843", countries: ["germany", "netherlands", "uk"] },
  medium: { label: "Medio", color: "#3B82C4", countries: ["japan", "australia", "southkorea", "china"] },
  emerging: { label: "Emergente", color: "#E8793A", countries: ["india", "chile"] },
  early: { label: "Temprano", color: "#95A5A6", countries: ["colombia", "peru"] }
};

function ScoreBar({ score, max = 5, color }) {
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 18,
            height: 8,
            borderRadius: 2,
            background: i < score ? color : "rgba(255,255,255,0.1)",
            transition: "all 0.4s ease",
            transitionDelay: `${i * 60}ms`
          }}
        />
      ))}
      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginLeft: 6 }}>{score}/{max}</span>
    </div>
  );
}

function NavTab({ label, active, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 18px",
        background: active ? "rgba(255,255,255,0.12)" : "transparent",
        border: active ? "1px solid rgba(255,255,255,0.2)" : "1px solid transparent",
        borderRadius: 8,
        color: active ? "#fff" : "rgba(255,255,255,0.5)",
        cursor: "pointer",
        fontSize: 13,
        fontWeight: active ? 600 : 400,
        transition: "all 0.3s",
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontFamily: "'DM Sans', sans-serif"
      }}
    >
      <span style={{ fontSize: 16 }}>{icon}</span>
      {label}
    </button>
  );
}

function CountryCard({ id, country, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px 16px",
        background: isSelected ? `${country.color}22` : "rgba(255,255,255,0.03)",
        border: isSelected ? `1px solid ${country.color}55` : "1px solid rgba(255,255,255,0.06)",
        borderRadius: 10,
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.3s",
        width: "100%",
        fontFamily: "'DM Sans', sans-serif"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 22 }}>{country.flag}</span>
          <div>
            <div style={{ color: "#fff", fontSize: 14, fontWeight: 500 }}>{country.name}</div>
            <div style={{
              fontSize: 10,
              color: country.color,
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginTop: 2
            }}>
              {country.tierLabel}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {[country.governance.score, country.regulation.score, country.policy.score].map((s, i) => (
            <div key={i} style={{
              width: 8, height: 8, borderRadius: "50%",
              background: s >= 4 ? "#10B981" : s >= 3 ? "#F59E0B" : s >= 2 ? "#EF4444" : "#6B7280",
              opacity: 0.7
            }} />
          ))}
        </div>
      </div>
    </button>
  );
}

function DimensionDetail({ country, dimension }) {
  const dim = DIMENSIONS[dimension];
  const data = country[dimension];
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      borderRadius: 12,
      padding: 20,
      border: "1px solid rgba(255,255,255,0.06)"
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>{dim.icon}</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: dim.color }}>{dim.label}</span>
        </div>
        <ScoreBar score={data.score} color={dim.color} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {data.highlights.map((h, i) => (
          <div key={i} style={{
            display: "flex", gap: 8, alignItems: "flex-start",
            fontSize: 12.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.5
          }}>
            <span style={{ color: dim.color, fontSize: 8, marginTop: 5, flexShrink: 0 }}>●</span>
            {h}
          </div>
        ))}
      </div>
    </div>
  );
}

function ComparisonView({ selectedDimension }) {
  const dim = DIMENSIONS[selectedDimension];
  const sorted = Object.entries(COUNTRIES).sort((a, b) => b[1][selectedDimension].score - a[1][selectedDimension].score);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 20 }}>{dim.icon}</span>
        <span style={{ fontSize: 16, fontWeight: 600, color: dim.color }}>{dim.label}</span>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>— Comparativa de 11 países</span>
      </div>
      {sorted.map(([id, c]) => (
        <div key={id} style={{
          display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
          background: "rgba(255,255,255,0.03)", borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.05)"
        }}>
          <span style={{ fontSize: 18, width: 28 }}>{c.flag}</span>
          <span style={{ fontSize: 13, color: "#fff", fontWeight: 500, width: 120, flexShrink: 0 }}>{c.name}</span>
          <div style={{ flex: 1 }}>
            <div style={{
              height: 10, borderRadius: 5,
              background: `linear-gradient(90deg, ${dim.color}44, ${dim.color})`,
              width: `${(c[selectedDimension].score / 5) * 100}%`,
              transition: "width 0.6s ease",
              minWidth: 8
            }} />
          </div>
          <span style={{ fontSize: 13, color: dim.color, fontWeight: 700, width: 28, textAlign: "right" }}>
            {c[selectedDimension].score}
          </span>
        </div>
      ))}
    </div>
  );
}

function MexicoView() {
  const [activePhase, setActivePhase] = useState(0);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{
        background: "linear-gradient(135deg, #006847 0%, #00843D 50%, #CE1126 100%)",
        borderRadius: 16, padding: 28, position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.45)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 36 }}>🇲🇽</span>
            <div>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#fff", fontFamily: "'Playfair Display', serif" }}>
                México: Situación Actual
              </h2>
              <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>
                Etapa formativa — comparable a Colombia y Perú en madurez de mercado
              </p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {MEXICO.situation.map((s, i) => (
              <div key={i} style={{
                fontSize: 12, color: "rgba(255,255,255,0.85)", display: "flex", gap: 6, alignItems: "flex-start",
                lineHeight: 1.5
              }}>
                <span style={{ color: "#FFD700", fontSize: 7, marginTop: 5 }}>◆</span>
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ margin: "0 0 14px 0", fontSize: 16, fontWeight: 700, color: "#fff", fontFamily: "'Playfair Display', serif" }}>
          📋 Hallazgos Clave del Benchmarking
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {MEXICO.keyFindings.map((f, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 16,
              border: "1px solid rgba(255,255,255,0.06)"
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#D4A843", marginBottom: 6, lineHeight: 1.4 }}>{f.title}</div>
              <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.55 }}>{f.detail}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ margin: "0 0 14px 0", fontSize: 16, fontWeight: 700, color: "#fff", fontFamily: "'Playfair Display', serif" }}>
          🗺️ Hoja de Ruta Recomendada para México
        </h3>
        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          {MEXICO.recommendations.map((r, i) => (
            <button key={i} onClick={() => setActivePhase(i)} style={{
              flex: 1, padding: "10px 12px",
              background: activePhase === i ? "rgba(212,168,67,0.15)" : "rgba(255,255,255,0.03)",
              border: activePhase === i ? "1px solid rgba(212,168,67,0.4)" : "1px solid rgba(255,255,255,0.06)",
              borderRadius: 8, cursor: "pointer", textAlign: "center",
              fontFamily: "'DM Sans', sans-serif"
            }}>
              <div style={{ fontSize: 20 }}>{r.icon}</div>
              <div style={{ fontSize: 11, color: activePhase === i ? "#D4A843" : "rgba(255,255,255,0.5)", fontWeight: 600, marginTop: 4 }}>
                {r.phase}
              </div>
            </button>
          ))}
        </div>
        <div style={{
          background: "rgba(212,168,67,0.06)", borderRadius: 12, padding: 20,
          border: "1px solid rgba(212,168,67,0.15)"
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {MEXICO.recommendations[activePhase].actions.map((a, i) => (
              <div key={i} style={{
                display: "flex", gap: 10, alignItems: "flex-start",
                fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.5
              }}>
                <span style={{
                  background: "#D4A843", color: "#000", width: 20, height: 20,
                  borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 700, flexShrink: 0, marginTop: 1
                }}>{i + 1}</span>
                {a}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MaturityModel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, margin: 0 }}>
        El documento evalúa 11 países en tres dimensiones centrales. Los mercados de hidrógeno progresan 
        a través de etapas definidas — la clave no es tener todos los instrumentos, sino secuenciarlos correctamente.
      </p>
      {Object.entries(TIERS).map(([tid, tier]) => (
        <div key={tid} style={{
          background: `${tier.color}08`, borderRadius: 12, padding: 18,
          borderLeft: `3px solid ${tier.color}`
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: tier.color,
            letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10
          }}>
            {tier.label}
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {tier.countries.map(cid => {
              const c = COUNTRIES[cid];
              return (
                <div key={cid} style={{
                  background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "10px 14px",
                  border: "1px solid rgba(255,255,255,0.06)", flex: "1 1 180px", minWidth: 180
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                    <span style={{ fontSize: 18 }}>{c.flag}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{c.name}</span>
                  </div>
                  {Object.entries(DIMENSIONS).map(([did, dim]) => (
                    <div key={did} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                      <span style={{ fontSize: 10, width: 80, color: "rgba(255,255,255,0.4)" }}>{dim.label}</span>
                      <ScoreBar score={c[did].score} color={dim.color} />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
          {tid === "early" && (
            <div style={{
              marginTop: 14, padding: "10px 14px", background: "rgba(206,17,38,0.1)",
              borderRadius: 8, border: "1px solid rgba(206,17,38,0.2)",
              display: "flex", alignItems: "center", gap: 10
            }}>
              <span style={{ fontSize: 22 }}>🇲🇽</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#CE1126" }}>México — Etapa formativa</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>
                  Comparable a Colombia/Perú. Necesita evolucionar hacia la etapa emergente con fundamentos sólidos.
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function BarriersView() {
  const barriers = [
    {
      icon: "💰",
      title: "Incertidumbre de Ingresos y Riesgo de Demanda",
      description: "El H2 verde es más caro que alternativas fósiles. Sin ingresos predecibles o offtake comprometido, los proyectos enfrentan alto riesgo de mercado, limitando financiabilidad.",
      solution: "CfDs, contratos de offtake público, mandatos de demanda",
      countries: "Alemania (H2Global), UK (HPBM), Corea del Sur (CHPS)"
    },
    {
      icon: "📜",
      title: "Incertidumbre Regulatoria y Estándares en Evolución",
      description: "Definiciones, certificación y permisos específicos de H2 ausentes o en evolución. Crea incertidumbre para desarrolladores y financiadores.",
      solution: "Definiciones claras, certificación operativa, permisos dedicados",
      countries: "Alemania (RFNBO), Corea del Sur (Ley H2), EU (Garantías de Origen)"
    },
    {
      icon: "🏭",
      title: "Altos Costos de Producción e Intensidad de Capital",
      description: "Inversión sustancial en electrolizadores, generación renovable e infraestructura. Costos exceden significativamente al H2 convencional.",
      solution: "Co-financiamiento CAPEX, grants públicos, financiamiento de desarrollo",
      countries: "Alemania (KfW/IPCEI), Australia (ARENA), India (SIGHT)"
    },
    {
      icon: "🔗",
      title: "Brechas de Infraestructura e Integración Sistémica",
      description: "Sin infraestructura compartida, cada proyecto depende de soluciones a medida, aumentando costos y riesgo de ejecución.",
      solution: "Redes troncales reguladas, hubs portuarios, planificación coordinada",
      countries: "Países Bajos (Gasunie), Australia (hubs), UK (clústeres)"
    },
    {
      icon: "🤝",
      title: "Desafíos de Coordinación y Ejecución",
      description: "Múltiples actores en energía, industria, medio ambiente, agua, transporte. Roles poco claros retrasan decisiones y fragmentan permisos.",
      solution: "Liderazgo institucional claro, coordinación interministerial formal",
      countries: "Alemania (BMWK), Japón (METI), UK (DESNZ)"
    }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, margin: 0 }}>
        El documento identifica cinco barreras estructurales comunes que restringen el despliegue de hidrógeno verde globalmente. 
        La diferencia entre mercados no es la presencia de estas barreras — todos las tienen — sino cómo las abordan.
      </p>
      {barriers.map((b, i) => (
        <div key={i} style={{
          background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 18,
          border: "1px solid rgba(255,255,255,0.06)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 22 }}>{b.icon}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{b.title}</span>
          </div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", margin: "0 0 10px 0", lineHeight: 1.55 }}>
            {b.description}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div style={{
              flex: 1, minWidth: 200, background: "rgba(16,185,129,0.08)", borderRadius: 8, padding: "8px 12px",
              border: "1px solid rgba(16,185,129,0.15)"
            }}>
              <div style={{ fontSize: 10, color: "#10B981", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Solución</div>
              <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.75)" }}>{b.solution}</div>
            </div>
            <div style={{
              flex: 1, minWidth: 200, background: "rgba(59,130,246,0.08)", borderRadius: 8, padding: "8px 12px",
              border: "1px solid rgba(59,130,246,0.15)"
            }}>
              <div style={{ fontSize: 10, color: "#3B82F6", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Referentes</div>
              <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.75)" }}>{b.countries}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCountry, setSelectedCountry] = useState("germany");
  const [compDimension, setCompDimension] = useState("governance");

  const tabs = [
    { id: "overview", label: "Modelo de Madurez", icon: "📊" },
    { id: "countries", label: "Países", icon: "🌍" },
    { id: "compare", label: "Comparar", icon: "⚡" },
    { id: "barriers", label: "Barreras", icon: "🚧" },
    { id: "mexico", label: "México", icon: "🇲🇽" }
  ];

  const country = COUNTRIES[selectedCountry];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0B0F",
      color: "#fff",
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />

      <header style={{
        padding: "28px 32px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "linear-gradient(180deg, rgba(212,168,67,0.06) 0%, transparent 100%)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <span style={{ fontSize: 10, color: "#D4A843", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            GCIEP • MEX.TO.NRHP • Deliverable D2
          </span>
        </div>
        <h1 style={{
          margin: "6px 0 8px",
          fontSize: 26,
          fontWeight: 700,
          fontFamily: "'Playfair Display', serif",
          background: "linear-gradient(135deg, #fff 0%, #D4A843 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Benchmarking Internacional de Hidrógeno Verde
        </h1>
        <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.45)", maxWidth: 700 }}>
          Evaluación comparativa de gobernanza, regulación y política de 11 países para apoyar 
          el desarrollo de la Política Nacional de Hidrógeno Renovable de México — SENER
        </p>
        <div style={{ display: "flex", gap: 6, marginTop: 16, flexWrap: "wrap" }}>
          {tabs.map(t => (
            <NavTab key={t.id} label={t.label} icon={t.icon}
              active={activeTab === t.id} onClick={() => setActiveTab(t.id)} />
          ))}
        </div>
      </header>

      <main style={{ padding: "24px 32px", maxWidth: 1100 }}>
        {activeTab === "overview" && <MaturityModel />}

        {activeTab === "countries" && (
          <div style={{ display: "flex", gap: 24 }}>
            <div style={{ width: 240, flexShrink: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 600, marginBottom: 4, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Seleccionar país
              </div>
              {Object.entries(COUNTRIES).map(([id, c]) => (
                <CountryCard key={id} id={id} country={c}
                  isSelected={selectedCountry === id}
                  onClick={() => setSelectedCountry(id)} />
              ))}
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{
                background: `linear-gradient(135deg, ${country.color}15, transparent)`,
                borderRadius: 14, padding: 22,
                border: `1px solid ${country.color}30`
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                  <span style={{ fontSize: 36 }}>{country.flag}</span>
                  <div>
                    <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>{country.name}</h2>
                    <span style={{
                      fontSize: 11, color: country.color, fontWeight: 600,
                      letterSpacing: "0.06em", textTransform: "uppercase"
                    }}>
                      Mercado {country.tierLabel}
                    </span>
                  </div>
                </div>
                <div style={{
                  marginTop: 12, padding: "10px 14px",
                  background: "rgba(255,255,255,0.04)", borderRadius: 8,
                  fontSize: 12.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.6,
                  borderLeft: `3px solid ${country.color}`
                }}>
                  💡 <strong style={{ color: "#D4A843" }}>Lección clave:</strong> {country.keyLesson}
                </div>
              </div>
              {Object.keys(DIMENSIONS).map(dim => (
                <DimensionDetail key={dim} country={country} dimension={dim} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "compare" && (
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {Object.entries(DIMENSIONS).map(([did, dim]) => (
                <button key={did} onClick={() => setCompDimension(did)} style={{
                  padding: "8px 16px",
                  background: compDimension === did ? `${dim.color}20` : "rgba(255,255,255,0.03)",
                  border: compDimension === did ? `1px solid ${dim.color}40` : "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 8, cursor: "pointer", color: compDimension === did ? dim.color : "rgba(255,255,255,0.5)",
                  fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif"
                }}>
                  {dim.icon} {dim.label}
                </button>
              ))}
            </div>
            <ComparisonView selectedDimension={compDimension} />
          </div>
        )}

        {activeTab === "barriers" && <BarriersView />}
        {activeTab === "mexico" && <MexicoView />}
      </main>

      <footer style={{
        padding: "16px 32px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        fontSize: 11, color: "rgba(255,255,255,0.25)", textAlign: "center"
      }}>
        Basado en: International Benchmarking Assessment — GCIEP/FCDO/PwC — Deliverable D2 — Enero 2026
      </footer>
    </div>
  );
}
