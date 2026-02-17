
# Bloque II Punto 2: Dictámenes Técnicos, Verificación CNE y Régimen de Transición

**Alcance del punto:** Reingeniería del proceso de certificación de atributos limpios, transición de Unidades Acreditadas a esquemas de validación de datos CNE/CENACE y reglas para nucleoeléctricas.
**Instrumentos jurídicos base:** Ley del Sector Eléctrico 2025 (LSE), Reglamento de la LSE 2025, RES/2910/2017 (Marco anterior referencia).

## A. Fuentes de información del S-CEL (Nuevo Marco LSE 2025)

| Actor / Fuente                    | Instrumento legal   | Artículo / Numeral        | Cita textual / Aplicación                                                                                                                                                                                           |
| --------------------------------- | ------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **CNE (Autoridad)**               | Reglamento LSE 2025 | Art. 182                  | "Los Certificados de Energías Limpias son otorgados por la CNE en función de los criterios que para tal efecto emita la Secretaría... y emitir las disposiciones administrativas... que regulen el otorgamiento"    |
| **Sistemas de Medición**          | Reglamento LSE 2025 | Art. 2, Fracc. XXVII      | "Conjunto de elementos que permiten la adquisición, transmisión... de datos de un medidor... [incluyendo] Un sistema de sincronía de tiempo"                                                                        |
| **Generación Inyectada**          | Reglamento LSE 2025 | Art. 2, Fracc. XIV        | "Generación de Electricidad Inyectada Total: Suma de la generación de energía eléctrica neta inyectada al Sistema Eléctrico Nacional... conforme a la metodología que emita la Secretaría"                          |
| **Validez Histórica**             | Reglamento LSE 2025 | Transitorio Sexto         | "Los Certificados de Energías Limpias emitidos con anterioridad... conservan su validez... hasta su liquidación o cancelación voluntaria"                                                                           |
| **Dictamen Técnico (Antecedente)**| RES/2910/2017       | Numeral 3.3               | *Referencia Histórica:* "Exposición por escrito... que avala el cumplimiento... derivado de una visita en campo" (Se sustituye por validación digital)                                                              |
| **Transición de Medición**        | Reglamento LSE 2025 | Transitorio Décimo Cuarto | "Las Centrales Eléctricas... deben informar a la CNE el estatus de sus Sistemas de Medición... La CNE... [establecerá] los periodos y mecanismos para transitar las actualizaciones"                                |

## B. Matriz de validación jurídica (Reingeniería LSE 2025)

| Hallazgo o limitación (Marco Anterior)                                                               | Fundamento Anterior (RES/2910/2017)                                  | Solución Nuevo Marco (LSE 2025)                                                                                                                                  | Ajuste Operativo Inmediato                                                                                                                             |
| ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Vacío Nuclear:** Ausencia de reglas de medición para CEL en nucleoeléctricas.                      | Transitorio Cuarto RES/2910/2017 (Uso de analogía de cogeneración)   | **Art. 182 Reglamento LSE:** Facultad directa de CNE para otorgar CELs bajo criterios SENER. **Transitorio 14:** CNE define transición de medición.              | **Emitir DACG Específica:** Establecer "Piso Técnico Nuclear" basado en promedio histórico validado por CENACE (eliminando dictamen externo).          |
| **Conflicto de Interés:** Unidades Acreditadas certificando a empresas de su propio grupo económico. | RES/2910/2017 (Sin prohibición explícita)                            | **Art. 6 Reglamento LSE:** Principios de transparencia, imparcialidad, honestidad y buena fe en la actuación administrativa.                                      | **Veto Normativo:** Prohibir en las nuevas Disposiciones la certificación cruzada intragrupo bajo pena de revocación.                                  |
| **Desconexión de Datos:** Dictámenes estáticos ("foto") vs operación real.                           | RES/2910/2017 Numeral 21 (Equipos instalados y calibrados)           | **Art. 2 XXVII Reglamento LSE:** "Sistema de Medición" integral (telemetría + sincronía).                                                                         | **Validación Digital:** Sustituir la visita física por la integración de datos API CENACE para tecnologías puras (Solar/Eólica).                       |
| **Eficiencia Económica:** No considerada para priorizar despacho/CEL.                                | RES/003/2011                                                         | **Art. 2 Fracc. X Reglamento LSE:** Definición de "Eficiencia" incluye minimización de costo total a largo plazo.                                                 | **Criterio de Prioridad:** La validación de CELs priorizará centrales que demuestren eficiencia operativa y menores costos sistémicos.                 |

## C. Desarrollo analítico

### Diagnóstico: Fallas del Modelo Anterior (RES/2910/2017)

1. **Redundancia de Costos:** Se priorizaba la burocracia sobre la física, obligando a centrales con tecnologías obvias y trazables (como fotovoltaica o eólica, donde no hay combustible que auditar) a pagar cuantiosas sumas a terceros privados para certificar lo evidente.
2. **Riesgo de Datos (Dictamen "Foto"):** El modelo de Unidad Acreditada se basaba en certificar una "foto" estática de la planta cada 3 años. Esto dejaba ciega a la autoridad sobre cambios operativos diarios, desviaciones de eficiencia o modificaciones no reportadas durante el periodo de vigencia.
3. **Privatización de la Fe Pública:** Se delegó la validación del atributo "limpio" a entes privados con incentivos comerciales cruzados, restando soberanía a la CNE y al CENACE sobre la veracidad de los datos que sustentan el mercado.

### Estado Objetivo (Modelo LSE 2025)

El nuevo marco LSE 2025 plantea un cambio de paradigma: migrar de un modelo de **Certificación Externalizada** (basado en papeles y visitas esporádicas) a un modelo de **Soberanía de Datos** (basado en flujo de información continuo). En este esquema, la CNE recupera la facultad de validación directa, apoyándose en la infraestructura de medición del CENACE para automatizar la emisión de CELs, eliminando intermediarios innecesarios y costos de transacción.

### Tabla comparativa: Modelo Anterior vs. Nuevo Modelo LSE

| Aspecto                        | Modelo Anterior (Unidades Acreditadas)                                      | Nuevo Modelo (Validación CNE/CENACE - LSE 2025)                                           |
| ------------------------------ | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Centrales Nucleoeléctricas** | Sin regla clara (analogía cogeneración). Dependiente de dictamen externo.   | **Medición Directa.** Validación de inyección neta por CENACE + Historial CNSNS.          |
| **Renovación**                 | Trámite manual documental y visita presencial cada 1 o 3 años.              | **Automática (Tácita).** Si la telemetría es continua y válida, la certificación se mantiene. |
| **Costo para el Generador**    | Alto (Honorarios recurrentes de Unidad Acreditada).                         | **Bajo/Nulo.** Proceso administrativo sustentado en datos operativos existentes.          |
| **Vigencia**                   | Periodos fijos rígidos.                                                     | **Indefinida (Condicionada).** Sujeta a la transmisión ininterrumpida de datos de medición. |
| **Rol de Terceros**            | Indispensable y obligatorio para todos.                                     | **Acotado.** Solo para tecnologías complejas (cogeneración, bioenergía) que requieren auditoría física de combustible. |

### Arquitectura del Sistema de Validación

Para implementar el Artículo 182 del Reglamento LSE, se propone la siguiente arquitectura lógica:

1. **Módulo de Ingesta (CENACE):** Recibe en tiempo real las variables críticas del Sistema de Medición (MWh consumidos, MWh entregados, Timestamp, Estatus Operativo).
2. **Motor de Reglas (CNE):**
    *   *Regla 1 (Tecnología Pura):* Si la fuente es Solar/Eólica/Nuclear/Hidro y la telemetría es válida -> **Certificación Automática**.
    *   *Regla 2 (Tecnología Mixta):* Si la fuente es Cogeneración/Bioenergía -> Requiere input adicional de flujo de combustible (Medible) o inspección semestral de CNE (si no hay telemetría de combustible).
3. **Registro S-CEL:** Emisión de certificados basada estrictamente en la "Generación de Electricidad Inyectada Total" (Art. 2 Fracc. XIV RLSE) validada por el motor de reglas, desacoplando la emisión del proceso comercial.

## D. Propuestas de ajuste normativo (Texto para DACG CNE)

Se proponen las siguientes redacciones para ser integradas en las nuevas Disposiciones Administrativas de Carácter General (DACG) que emitirá la CNE, fundamentadas en el Art. 182 y 190 del Reglamento LSE 2025.

### Instrumento A: Modificación a las Disposiciones del S-CEL (CNE)

**Disposición 11.3 (Nuevo - Vía Rápida Nuclear):**
> "Para el otorgamiento de Certificados de Energías Limpias a centrales nucleoeléctricas propiedad del Estado o con participación estatal mayoritaria, la CNE validará directamente la Generación de Electricidad Inyectada Total conforme a los registros operativos del CENACE y los reportes de seguridad de la CNSNS. Se exime a estas centrales de la presentación de Dictamen Técnico de terceros, sustituyéndose este requisito por el reporte oficial de medición validado por el operador del sistema."

**Disposición 34.A (Nuevo - Independencia y Conflicto de Interés):**
> "En los casos excepcionales donde la metodología de cálculo requiera la verificación de terceros (específicamente para tecnologías con uso de combustibles fósiles o bioenergía compleja), las unidades de inspección o entidades de verificación **no podrán tener vinculación societaria, comercial o de grupo económico** con la central generadora a certificar. La violación a esta disposición, conforme a los principios de honestidad e imparcialidad del Art. 6 del Reglamento, resultará en la revocación inmediata de la acreditación y la nulidad de los dictámenes emitidos."

**Disposición 28.3 (Digitalización y Vigencia):**
> "La vigencia de la certificación de Central Eléctrica Limpia será indefinida, quedando sujeta a una **verificación digital continua** a través de los Sistemas de Medición validados por el CENACE. Cualquier interrupción en la transmisión de datos de medición por un periodo mayor a 24 horas suspenderá automáticamente la elegibilidad de la central para recibir CELs por la energía generada en dicho intervalo, restableciéndose una vez normalizada la telemetría, conforme a los plazos de transición del Transitorio Décimo Cuarto del Reglamento de la LSE."

## E. Estrategia de Transición (Transitorios)

Para asegurar una migración ordenada del marco de la Ley de la Industria Eléctrica (LIE) al nuevo marco de la Ley del Sector Eléctrico (LSE) 2025, se establecen las siguientes directrices transitorias:

1. **Validez de CELs Históricos (Seguridad Jurídica):**
   De conformidad con el **Transitorio Sexto** del Reglamento LSE, se ratifica la plena validez de todos los Certificados de Energías Limpias emitidos con anterioridad a la entrada en vigor del nuevo reglamento, manteniéndose vigentes bajo las condiciones originales de su emisión hasta su liquidación o cancelación voluntaria.

2. **Periodo de Gracia para Actualización de Medición (120 días):**
   En atención al **Transitorio Décimo Cuarto**, las Centrales Eléctricas que a la fecha de publicación de las nuevas DACG no cuenten con sistemas de telemetría compatibles con los nuevos estándares de validación de la CNE/CENACE, dispondrán de un plazo de 120 días naturales para regularizar sus sistemas. Durante este periodo de transición, la CNE aceptará como válidos los dictámenes técnicos vigentes emitidos por Unidades Acreditadas bajo el esquema anterior, garantizando que no se detenga la emisión de certificados mientras se moderniza la infraestructura.

3. **Migración Administrativa de Permisos:**
   Para las centrales que realicen la migración de su Permiso de Generación (de LIE a LSE), el anexo técnico de "Atributos Limpios" del nuevo permiso funcionará como la certificación base para el S-CEL. Esto eliminará la necesidad de un trámite separado de "Dictamen Técnico" inicial para el 80% de los casos (tecnologías puras como Solar, Eólica, Hidroeléctrica y Nuclear), simplificando la carga administrativa y centrando el control en la operación real.
