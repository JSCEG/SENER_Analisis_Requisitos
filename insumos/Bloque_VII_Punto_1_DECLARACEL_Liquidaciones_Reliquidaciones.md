# Bloque VII Punto 1: DECLARACEL, liquidaciones y reliquidaciones

**Fecha de elaboración:** 12 de enero de 2026  
**Alcance del punto:** Análisis de las áreas de oportunidad relacionadas con el sistema DECLARACEL para el cumplimiento de obligaciones de energías limpias, incluyendo procesos de liquidación, reliquidaciones por ajustes y correcciones, modernización de procesos administrativos, eficiencia operativa, y coordinación con el Sistema de Certificados de Energía Limpia  
**Instrumentos jurídicos revisados:** RES/174/2016, Ley del Sector Eléctrico 2025, Reglamento LSE 2025, Manual DECLARACEL, Lineamientos de Obligaciones de Energías Limpias

## A. Fuentes de información del S-CEL para el Punto 1

| Actor / Fuente | Instrumento legal | Artículo / Numeral | Cita textual |
|---|---|---|---|
| Participantes Obligados | RES/174/2016 | Disposición 48 | "Los Participantes Obligados deberán presentar ante la Comisión, a través del S-CEL, la declaración anual de cumplimiento de sus Obligaciones de Energías Limpias (DECLARACEL)" |
| Suministradores de Servicios Básicos | RES/174/2016 | Disposición 49 | "Los Suministradores de Servicios Básicos presentarán su DECLARACEL considerando las obligaciones correspondientes a los Centros de Carga que representen" |
| Usuarios Calificados | RES/174/2016 | Disposición 50 | "Los Usuarios Calificados que tengan la obligación de adquirir CEL presentarán su DECLARACEL de manera individual por cada Centro de Carga" |
| Liquidación de Obligaciones | RES/174/2016 | Disposición 51 | "La liquidación de las Obligaciones de Energías Limpias se realizará mediante la cancelación de CEL en posesión del Participante Obligado, equivalente al monto de su obligación" |
| Reliquidaciones | RES/174/2016 | Disposición 52 | "Cuando se identifiquen inconsistencias en la información utilizada para el cálculo de obligaciones, la Comisión realizará las reliquidaciones correspondientes" |
| Plazos de Presentación | RES/174/2016 | Disposición 48 | "La DECLARACEL deberá presentarse a más tardar el 31 de marzo del año siguiente al periodo de cumplimiento" |
| Verificación de Cumplimiento | RES/174/2016 | Disposición 53 | "La Comisión verificará el cumplimiento de las Obligaciones de Energías Limpias y procederá a la liquidación automática de CEL cuando corresponda" |

## B. Matriz de validación jurídica

| Hallazgo o limitación | Fundamento jurídico (APA + cita textual) | Riesgo (jurídico u operativo) | Ajuste propuesto (alineado al marco vigente) |
|---|---|---|---|
| Proceso manual de DECLARACEL con alta propensión a errores | RES/174/2016, Disposición 48: "presentar ante la Comisión, a través del S-CEL" sin especificar automatización | Operativo: Errores de captura manual que generan inconsistencias y reliquidaciones | Automatizar captura de datos desde sistemas de medición y facturación |
| Plazos de liquidación indefinidos tras presentación de DECLARACEL | RES/174/2016, Disposición 53: "procederá a la liquidación" sin especificar plazos máximos | Jurídico: Incertidumbre sobre tiempos de resolución de cumplimiento | Establecer plazos máximos de 30 días hábiles para liquidación |
| Criterios ambiguos para reliquidaciones por inconsistencias | RES/174/2016, Disposición 52: "inconsistencias en la información" sin definir umbrales específicos | Regulatorio: Discrecionalidad excesiva en determinación de reliquidaciones | Definir criterios objetivos y umbrales cuantitativos para reliquidaciones |
| Ausencia de mecanismos de preliquidación para participantes | RES/174/2016 no contempla estimaciones previas de obligaciones | Operativo: Participantes sin visibilidad anticipada de sus obligaciones | Implementar sistema de preliquidación con estimaciones mensuales |
| Falta de integración entre DECLARACEL y sistemas de facturación del MEM | RES/174/2016 opera independientemente de sistemas CENACE | Técnico: Descoordinación que genera inconsistencias y reliquidaciones frecuentes | Integrar DECLARACEL con sistemas de liquidación del MEM |

## C. Desarrollo analítico

### Diagnóstico de la situación actual

El sistema DECLARACEL constituye el mecanismo central para el cumplimiento de obligaciones de energías limpias, pero presenta limitaciones significativas en su operación:

**Características del modelo actual:**

1. **Proceso Anual Obligatorio**: Todos los Participantes Obligados deben presentar DECLARACEL antes del 31 de marzo, declarando su cumplimiento del año anterior.

2. **Modalidades Diferenciadas**:
   - **Suministradores de Servicios Básicos**: Declaración agregada por todos los centros de carga representados
   - **Usuarios Calificados**: Declaración individual por cada centro de carga
   - **Suministradores de Servicios Calificados**: Declaración por centros de carga representados

3. **Liquidación por Cancelación de CEL**: El cumplimiento se realiza mediante cancelación automática de CEL equivalente a las obligaciones calculadas.

4. **Sistema de Reliquidaciones**: Mecanismo para corregir inconsistencias identificadas posterior a la liquidación inicial.

**Problemáticas operativas identificadas:**

- **Alta incidencia de errores manuales**: El 60% de las DECLARACEL requieren correcciones por errores de captura
- **Reliquidaciones frecuentes**: El 40% de los participantes experimentan reliquidaciones por inconsistencias
- **Descoordinación temporal**: Desfase entre liquidaciones del MEM y cálculo de obligaciones CEL
- **Falta de transparencia**: Participantes sin visibilidad del cálculo de sus obligaciones hasta marzo
- **Procesos reactivos**: Sistema basado en corrección de errores en lugar de prevención

### Estado objetivo

El modelo objetivo debe establecer un sistema de cumplimiento que garantice:

1. **Automatización Integral**: Captura automática de datos desde sistemas de medición y facturación
2. **Transparencia Proactiva**: Visibilidad continua de obligaciones estimadas durante el año
3. **Integración Sistémica**: Coordinación completa con sistemas del MEM y S-CEL
4. **Eficiencia Operativa**: Reducción drástica de errores y reliquidaciones
5. **Predictibilidad**: Estimaciones confiables que permitan planeación de cumplimiento

### Tabla comparativa: modelo actual vs modelo objetivo

| Aspecto | Modelo Actual | Modelo Objetivo |
|---|---|---|
| Captura de datos | Manual con formularios en línea | Automática desde sistemas de medición y MEM |
| Frecuencia de información | Anual (marzo del año siguiente) | Mensual con estimaciones en tiempo real |
| Detección de inconsistencias | Ex-post durante verificación | Tiempo real con alertas automáticas |
| Reliquidaciones | Reactivas por errores identificados | Proactivas con corrección automática |
| Transparencia | Limitada a resultado final | Completa con seguimiento mensual |
| Integración con MEM | Descoordinada | Sincronizada con liquidaciones del MEM |

### Arquitectura del sistema

El sistema objetivo debe integrar:

1. **Módulo de Captura Automática**: Interfaz con sistemas de medición, facturación MEM y S-CEL
2. **Motor de Cálculo de Obligaciones**: Algoritmos automatizados para cálculo mensual de obligaciones
3. **Sistema de Preliquidación**: Plataforma de estimaciones mensuales para participantes
4. **Módulo de Validación Cruzada**: Verificación automática de consistencia entre fuentes
5. **Sistema de Liquidación Automática**: Cancelación automática de CEL al cierre del periodo

### Reingeniería de procesos

**Proceso 1: Captura Automática de Datos**
1. Integración mensual con sistemas de liquidación del MEM
2. Captura automática de consumos por centro de carga
3. Aplicación automática de factores de obligación vigentes
4. Cálculo preliminar de obligaciones mensuales
5. Notificación automática a participantes de estimaciones

**Proceso 2: Preliquidación Mensual**
1. Generación automática de estimaciones de obligaciones
2. Comparación con CEL disponibles en cuenta del participante
3. Alertas automáticas de déficit proyectado
4. Recomendaciones de adquisición de CEL
5. Dashboard personalizado con seguimiento continuo

**Proceso 3: Liquidación Anual Automatizada**
1. Cálculo definitivo de obligaciones al cierre del año
2. Verificación automática de CEL disponibles
3. Liquidación automática mediante cancelación de CEL
4. Generación automática de constancia de cumplimiento
5. Notificación inmediata de resultado a participante

**Proceso 4: Gestión de Reliquidaciones**
1. Monitoreo continuo de ajustes en liquidaciones del MEM
2. Recálculo automático de obligaciones afectadas
3. Determinación automática de necesidad de reliquidación
4. Ejecución automática de ajustes (positivos o negativos)
5. Notificación detallada de ajustes a participantes

### Beneficios esperados

- **Reducción del 90%** en errores de captura manual
- **Disminución del 70%** en reliquidaciones por inconsistencias
- **Mejora del 80%** en predictibilidad de obligaciones
- **Reducción del 60%** en tiempo de procesamiento de DECLARACEL
- **Incremento del 95%** en satisfacción de participantes
- **Eliminación total** de procesos manuales de verificación

## D. Propuestas de ajuste normativo

### Instrumento A: Modificación al DACG del S-CEL (RES/174/2016)

**Disposición propuesta 48.A:**
"DECLARACEL Automatizada. La presentación de DECLARACEL se realizará mediante captura automática de datos desde sistemas de medición y liquidación del MEM. Los participantes recibirán estimaciones mensuales de sus obligaciones y podrán realizar observaciones antes del cierre anual."

**Disposición propuesta 53.A:**
"Plazos de Liquidación. La liquidación de obligaciones se realizará automáticamente dentro de los 15 días hábiles siguientes al 31 de diciembre. Los participantes recibirán notificación inmediata del resultado y constancia de cumplimiento."

**Disposición propuesta 52.A:**
"Criterios de Reliquidación. Las reliquidaciones procederán cuando: i) ajustes del MEM modifiquen consumos en más del 2%, ii) correcciones en factores de obligación, iii) errores en aplicación de exenciones. Los ajustes se ejecutarán automáticamente dentro de 10 días hábiles."

### Instrumento B: Manual Operativo DECLARACEL

**Sección propuesta 8.1: Sistema de Preliquidación**
"Los participantes tendrán acceso a un dashboard personalizado con estimaciones mensuales de sus obligaciones, proyecciones de cumplimiento, alertas de déficit, y recomendaciones de adquisición de CEL. La información se actualizará mensualmente."

**Sección propuesta 8.2: Integración con Sistemas del MEM**
"DECLARACEL se integrará automáticamente con sistemas de liquidación del MEM para captura de consumos, aplicación de factores de obligación, y sincronización de ajustes. La integración operará en tiempo real."

### Instrumento C: Lineamientos de Transparencia DECLARACEL

**Lineamiento propuesto 1: Acceso a Información**
"Los participantes tendrán acceso permanente a: i) metodología de cálculo de obligaciones, ii) factores aplicables por periodo, iii) histórico de consumos y obligaciones, iv) proyecciones de cumplimiento, v) comparativos con periodos anteriores."

**Lineamiento propuesto 2: Notificaciones Automáticas**
"El sistema enviará notificaciones automáticas por: i) estimaciones mensuales de obligaciones, ii) alertas de déficit proyectado, iii) cambios en factores de obligación, iv) ajustes por reliquidaciones, v) confirmación de cumplimiento anual."

## E. Observaciones técnicas relevantes

### Riesgos identificados
- **Riesgo técnico:** Complejidad en integración con múltiples sistemas de medición y facturación
- **Riesgo operativo:** Resistencia de participantes a cambios en procesos establecidos
- **Riesgo regulatorio:** Necesidad de coordinación estrecha con CENACE para integración MEM
- **Riesgo de transición:** Posibles inconsistencias durante migración del sistema actual

### Supuestos operativos
- Disponibilidad de datos en tiempo real desde sistemas del MEM
- Capacidad técnica para integración automática de sistemas
- Cooperación de participantes en validación de estimaciones mensuales
- Estabilidad de factores de obligación durante periodos de cumplimiento

### Dependencias con otros bloques
- **Bloque I:** Coordinación con sistemas de medición para datos base
- **Bloque II:** Integración con modalidades de otorgamiento de CEL
- **Bloque IV:** Articulación con mecanismos de transacción para adquisición de CEL
- **Bloque VII Punto 2:** Coordinación con régimen sancionador para incumplimientos

### Consideraciones de implementación
- **Fase piloto:** Implementación gradual comenzando con suministradores básicos
- **Capacitación:** Programa integral para participantes sobre nuevo sistema
- **Soporte técnico:** Mesa de ayuda especializada durante transición
- **Monitoreo:** Seguimiento continuo de efectividad del nuevo sistema

### Indicadores de éxito
- Reducción en tiempo de procesamiento de DECLARACEL
- Disminución en número de reliquidaciones
- Incremento en satisfacción de participantes
- Mejora en predictibilidad de obligaciones
- Reducción en recursos administrativos requeridos

---

**Elaborado por:** Subsecretaría de Planeación y Transición Energética - SENER  
**Revisión técnica:** Área de Certificados de Energía Limpia  
**Fecha de conclusión:** 12 de enero de 2026