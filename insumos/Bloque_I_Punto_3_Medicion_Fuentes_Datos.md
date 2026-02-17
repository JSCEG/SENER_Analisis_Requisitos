# Bloque I - Punto 3: Medición, fuentes de información y datos vinculantes


**Fecha de elaboración:** 11 de enero de 2026
**Alcance del punto:** Medición, fuentes de información y datos vinculantes que alimentan el S-CEL
**Instrumentos jurídicos revisados:** DACG S-CEL (RES/174/2016 y A/067/2017), RES/142/2017 (Generación Distribuida), Disposiciones de Autoconsumo (2025), Bases del Mercado Eléctrico, Lineamientos CEL

---

## A. Fuentes de Información del S-CEL


|                                                    | mento legal               | Artículo / Numeral | Cita textual                                                                                                                                                                                                                                          |
| -------------------------------------------------- | ------------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **CENACE**                                   | DACG S-CEL (RES/174/2016) | Disp. 26            | "el Cenace, los Transportistas, los Distribuidores, los Generadores y Generadores Exentos que producen energía por el abasto aislado, informarán a la Comisión mediante el Sistema, la energía eléctrica generada en el mes calendario anterior" |
| **Transportistas**                           | DACG S-CEL (RES/174/2016) | Disp. 26            | "informarán a la Comisión mediante el Sistema, la energía eléctrica generada en el mes calendario anterior por cada Central Eléctrica Limpia"                                                                                                    |
| **Distribuidores**                           | DACG S-CEL (A/067/2017)   | Disp. 32.B          | "para otorgar los CEL a los Suministradores que representen Generación Limpia Distribuida se utilizará los datos de medición reportados por el Distribuidor"                                                                                       |
| **Generadores (Abasto Aislado)**             | DACG S-CEL (RES/174/2016) | Disp. 26            | "los Generadores y Generadores Exentos que producen energía por el abasto aislado, informarán a la Comisión"                                                                                                                                       |
| **Medición Vinculante CENACE**              | DACG S-CEL (A/067/2017)   | Disp. 32.B          | "Los datos de medición de generación utilizados en las liquidaciones y reliquidaciones reportados por el Cenace al S-CEL serán la base para el otorgamiento de los CEL"                                                                            |
| **Participantes Obligados (Abasto Aislado)** | DACG S-CEL (A/067/2017)   | Disp. 30.B          | "Para el abasto aislado las Centrales Eléctricas deberán reportar al S-CEL la energía generada neta y consumida mensualmente"                                                                                                                      |

---

## B. Matriz de Validación Jurídica


| Hallazgo o limitación actual                                                         | Fundamento jurídico (APA + cita textual)                                                                                                                                                                                                                                                                                                         | Riesgo (jurídico u operativo)                                                           | Ajuste propuesto                                                                          |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Dependencia de reportes manuales para abasto aislado**                        | Comisión Reguladora de Energía. (2017).*DACG del Sistema de CEL modificadas* . Disposición 30.B. "Para el abasto aislado las Centrales Eléctricas deberán reportar al S-CEL la energía generada neta y consumida mensualmente"                                                                                                            | Operativo: Errores de captura manual y retrasos en información                          | Implementar sistemas de medición automática para abasto aislado                         |
| **Falta de validación cruzada automática entre fuentes**                      | Comisión Reguladora de Energía. (2016).*DACG del Sistema de CEL* . Disposición 30. "será empleada para verificar la validez y consistencia de la información que se consideró para el otorgamiento de CEL"                                                                                                                                | Técnico: Inconsistencias no detectadas oportunamente entre fuentes                      | Desarrollar algoritmos de validación cruzada en tiempo real                              |
| **Cobertura parcial de generación distribuida**                                | DACG S-CEL (A/067/2017), Disp. 32.B                                                                                                                                                                                                                                                                                                               | Dependencia exclusiva de reportes del Distribuidor para GLD                              | Operativo: Subregistro de generación limpia distribuida                                  |
| **Falta de integración con sistemas de medición distribuida <0.5 MW**         | RES/142/2017, Capítulo VI: "el Distribuidor, elaborará y actualizará una base de datos y reportes"                                                                                                                                                                                                                                             | Operativo: Ausencia de datos de centrales pequeñas con potencial significativo agregado | Implementar protocolos de RES/142/2017 para medición distribuida                         |
| **Ausencia de metodologías de contraprestación en medición**                 | RES/142/2017, Anexo I: "Medición neta de energía: metodología de contraprestación que considera los flujos de energía eléctrica recibidos y entregados"                                                                                                                                                                                     | Técnico: Medición inadecuada para esquemas Net Metering y Net Billing                  | Integrar metodologías de medición bidireccional según RES/142/2017                     |
| **Falta de integración con figura de autoconsumo**                             | Disposiciones de Autoconsumo (2025): "regular la figura de Autoconsumo de Energía Eléctrica"                                                                                                                                                                                                                                                    | Operativo: Medición no adaptada para modalidades de autoconsumo                         | Implementar sistemas de medición específicos para autoconsumo según disposiciones 2025 |
| **Ausencia de medición para centrales 0.7-20 MW en autoconsumo**               | Disposiciones de Autoconsumo (2025): rango específico 0.7-20 MW                                                                                                                                                                                                                                                                                  | Técnico: Vacío en medición para rango intermedio de autoconsumo                       | Desarrollar protocolos de medición para autoconsumo interconectado 0.7-20 MW             |
| **Ausencia de integración del abasto aislado no interconectado**               | Comisión Reguladora de Energía. (2017).*DACG del Sistema de CEL modificadas* . Disposición 30. "Para el cálculo de las Obligaciones en materia de Energías Limpias para los Centros de Carga que se suministren por abasto aislado no interconectado al SEN, se utilizarán los datos de medición que el Participante del S-CEL entregue" | Regulatorio: Falta de control sobre datos no verificables                                | Establecer mecanismos de verificación independiente                                      |
| **Falta de criterios específicos para abasto aislado con necesidades propias** | Acuerdo A/049/2017: "criterio de interpretación del concepto 'necesidades propias', establecido en el artículo 22 de la Ley de la Industria Eléctrica"                                                                                                                                                                                         | Técnico: Medición no diferenciada para abasto aislado con necesidades propias          | Implementar criterios específicos de medición para abasto aislado según A/049/2017     |
| **Uso de valores estimados sin criterios claros de calidad**                    | Comisión Reguladora de Energía. (2017).*DACG del Sistema de CEL modificadas* . Disposición 31. "En aquellos casos en que no sea posible determinar el número de CEL... la Comisión podrá usar temporalmente valores estimados"                                                                                                            | Técnico: Imprecisión en otorgamiento de CEL por estimaciones                           | Definir criterios de calidad y límites para uso de estimaciones                          |
| **Plazos de reporte heterogéneos entre actores**                               | DACG S-CEL (RES/174/2016), Disp. 26                                                                                                                                                                                                                                                                                                               | "en los diez primeros días hábiles de cada mes" vs reportes trimestrales               | Operativo: Desincronización de información                                              |

---

## C. Desarrollo Analítico


### Diagnóstico de la Situación Actual

.

El sistema de medición y fuentes de información del S-CEL presenta las siguientes características:

#### Fuentes de Datos Actuales


* Datos de liquidaciones y reliquidaciones del MEM
* Base para otorgamiento de CEL a centrales interconectadas
* Información más confiable y automatizada

1. **Transportistas y Distribuidores** :

* Reporte mensual de generación por central
* Información complementaria a CENACE
* Datos de generación limpia distribuida (solo Distribuidores)

1. **Generadores de Abasto Aislado** :

* Reportes manuales mensuales
* Mayor riesgo de errores e inconsistencias
* Diferenciación entre interconectado y no interconectado al SEN

1. **Participantes Obligados (Abasto Aislado)** :

* Reportes de consumo para cálculo de obligaciones
* Datos no verificados independientemente

#### Problemáticas Identificadas

[](https://github.com/JSCEG/AnalisisCEL/blob/main/secciones/Bloque_I_Punto_3_Medicion_Fuentes_Datos.md#problem%C3%A1ticas-identificadas)

1. **Heterogeneidad de Fuentes** :

* Diferentes niveles de automatización y confiabilidad
* Plazos de reporte no homogéneos
* Calidad variable de la información

1. **Limitaciones de Cobertura** :

* Generación distribuida dependiente únicamente del Distribuidor
* Abasto aislado no interconectado sin verificación independiente
* Falta de integración de sistemas de medición inteligente

1. **Deficiencias en Validación** :

* Validación cruzada manual y ex-post
* Uso frecuente de valores estimados
* Ausencia de alertas automáticas de inconsistencias

1. **Riesgos Operativos** :

* Dependencia de reportes manuales propensos a errores
* Retrasos en detección de inconsistencias
* Dificultad para auditar información de abasto aislado

### Estado Objetivo


Implementar un sistema integral de medición que garantice:

#### Principios Rectores


* **Universalidad** : Cobertura de toda la generación limpia nacional
* **Automatización** : Captura automática de datos desde sistemas de medición
* **Confiabilidad** : Validación cruzada en tiempo real entre múltiples fuentes
* **Trazabilidad** : Seguimiento completo desde generación hasta registro
* **Verificabilidad** : Mecanismos independientes de verificación

#### Características del Sistema Objetivo


* **Medición Universal** : Cobertura de gran escala, distribuida y aislada
* **Integración Completa** : Conexión con todos los sistemas de medición
* **Validación Automática** : Algoritmos de verificación cruzada en tiempo real
* **Calidad de Datos** : Estándares mínimos de precisión y completitud
* **Auditoría Continua** : Monitoreo permanente de calidad de información

### Tabla Comparativa: Modelo Actual vs Modelo Objetivo


| Concepto                   | Modelo Actual                             | Modelo Objetivo                                       |
| -------------------------- | ----------------------------------------- | ----------------------------------------------------- |
| **Cobertura**        | Limitada a gran escala interconectada     | Universal: gran escala + distribuida + aislada        |
| **Fuentes de Datos** | Principalmente CENACE + reportes manuales | CENACE + Distribuidores + IoT + Telemetría           |
| **Validación**      | Manual, ex-post, tolerancia 2%            | Automática, tiempo real, alertas inmediatas          |
| **Abasto Aislado**   | Reportes manuales sin verificación       | Medición automática con verificación independiente |
| **GLD**              | Solo reportes del Distribuidor            | Medición inteligente + múltiples fuentes            |
| **Estimaciones**     | Sin criterios claros de calidad           | Límites estrictos y criterios de calidad definidos   |
| **Plazos**           | Heterogéneos (mensual/trimestral)        | Homogéneos, tiempo real cuando sea posible           |
| **Trazabilidad**     | Limitada por fuente                       | Completa, desde medidor hasta CEL                     |

### Arquitectura del Sistema (Descripción Conceptual)


#### Componentes Principales

[](https://github.com/JSCEG/AnalisisCEL/blob/main/secciones/Bloque_I_Punto_3_Medicion_Fuentes_Datos.md#componentes-principales)

1. **Hub Central de Datos**
   * Recepción y consolidación de todas las fuentes
   * Normalización y estandarización de formatos
   * Almacenamiento con trazabilidad completa
2. **Red de Sensores IoT**
   * Medición inteligente para generación distribuida
   * Telemetría para abasto aislado
   * Comunicación en tiempo real vía redes celulares/satelitales
3. **Motor de Validación Cruzada**
   * Algoritmos de detección de inconsistencias
   * Validación automática entre múltiples fuentes
   * Alertas inmediatas de anomalías
4. **Sistema de Calidad de Datos**
   * Métricas de completitud, precisión y oportunidad
   * Clasificación automática de calidad por fuente
   * Reportes de calidad para mejora continua
5. **Plataforma de Auditoría**
   * Verificación independiente de datos críticos
   * Muestreo estadístico para validación
   * Trazabilidad completa de modificaciones

### Reingeniería de Procesos (Pasos Operativos)


#### Proceso Optimizado de Captura y Validación

**Captura Automática Universal**

1. * CENACE: Datos de liquidaciones en tiempo real
   * Distribuidores: Medición inteligente de GLD
   * Abasto Aislado: Telemetría automática
   * Transportistas: Validación cruzada de datos CENACE
2. **Normalización y Consolidación**
   * Conversión automática a formatos estándar
   * Asignación de timestamps precisos
   * Clasificación por tipo de fuente y tecnología
   * Almacenamiento con metadatos completos
3. **Validación Cruzada Automática**
   * Comparación entre fuentes múltiples
   * Detección de outliers estadísticos
   * Verificación de consistencia temporal
   * Generación automática de alertas
4. **Gestión de Calidad**
   * Evaluación automática de completitud
   * Cálculo de métricas de precisión
   * Clasificación de confiabilidad por fuente
   * Reportes de calidad para mejora
5. **Auditoría y Verificación**
   * Muestreo aleatorio para verificación independiente
   * Auditorías programadas de fuentes críticas
   * Validación de estimaciones contra datos reales
   * Documentación completa de ajustes

### Beneficios Esperados


#### Beneficios Operativos


* **Cobertura Universal** : Captura del 100% de generación limpia nacional
* **Precisión** : Reducción del 90% en errores de medición
* **Oportunidad** : Datos disponibles en tiempo real vs. 10 días
* **Confiabilidad** : Validación cruzada automática entre fuentes

#### Beneficios Regulatorios


* **Transparencia** : Trazabilidad completa de datos
* **Equidad** : Tratamiento homogéneo de todas las fuentes
* **Cumplimiento** : Adherencia automática a estándares de calidad
* **Auditoría** : Capacidades avanzadas de verificación

#### Beneficios Ambientales


* **Precisión Ambiental** : Medición exacta de generación limpia
* **Incentivos Correctos** : Señales precisas para inversión
* **Monitoreo** : Seguimiento real del impacto ambiental
* **Planificación** : Datos confiables para política energética

---

## D. Propuestas de Ajuste Normativo


### Instrumento A: Modificaciones a DACG S-CEL


**Disposición 26 Bis (Adición):** "Medición Universal. El S-CEL integrará datos de medición de toda la generación limpia nacional, incluyendo gran escala interconectada, generación distribuida y abasto aislado, mediante sistemas automatizados de captura y validación."

**Disposición 30 (Modificación):** "Validación Cruzada Automática. El sistema implementará algoritmos de validación cruzada en tiempo real entre todas las fuentes de información, generando alertas automáticas cuando las inconsistencias superen el 1% o los umbrales estadísticos establecidos."

**Disposición 31 (Modificación):** "Uso Limitado de Estimaciones. Los valores estimados solo podrán utilizarse cuando la información real no esté disponible por causas de fuerza mayor, por un período máximo de 30 días, y deberán cumplir con criterios de calidad mínimos del 95% de precisión."

**Disposición 32.B (Modificación):** "Medición Vinculante Integral. Los datos de medición vinculante incluirán información de CENACE, sistemas de medición inteligente para GLD, telemetría para abasto aislado, y validación cruzada automática entre todas las fuentes."

### Instrumento B: Manual de Medición y Calidad de Datos


**Capítulo 1: Estándares de Medición**Especificaciones técnicas para equipos de medición

* Protocolos de comunicación y transmisión de datos
* Requisitos de precisión por tipo de tecnología
* Procedimientos de calibración y mantenimiento

**Capítulo 2: Validación y Calidad**

* Algoritmos de validación cruzada
* Métricas de calidad de datos
* Procedimientos de detección de anomalías
* Protocolos de corrección de errores

**Capítulo 3: Integración de Sistemas**

* APIs para integración con sistemas externos
* Formatos estándar de intercambio de datos
* Protocolos de seguridad para transmisión
* Procedimientos de respaldo y recuperación

**Capítulo 4: Auditoría y Verificación**

* Procedimientos de auditoría independiente
* Muestreo estadístico para verificación
* Protocolos de investigación de inconsistencias
* Documentación de ajustes y correcciones

---

## E. Observaciones Técnicas Relevantes


### Riesgos Identificados


1. **Riesgo Tecnológico** : Dependencia de sistemas de comunicación para áreas remotas
2. **Riesgo de Integración** : Complejidad de integrar múltiples sistemas heterogéneos
3. **Riesgo de Calidad** : Posible degradación inicial durante período de transición
4. **Riesgo Económico** : Costos significativos de implementación de infraestructura
5. **Riesgo Operativo** : Resistencia al cambio por parte de participantes actuales

### Supuestos Operativos


1. **Infraestructura de Comunicaciones** : Disponibilidad de redes celulares/satelitales
2. **Capacidad Técnica** : Personal especializado para operación de sistemas avanzados
3. **Cooperación de Participantes** : Colaboración en implementación de nuevos sistemas
4. **Recursos Presupuestales** : Financiamiento para modernización tecnológica
5. **Estabilidad Regulatoria** : Marco normativo estable durante implementación

### Dependencias con Otros Puntos del Bloque


* **Punto 1 (Inscripción)** : Los participantes inscritos deben proporcionar datos de medición
* **Punto 2 (Administración)** : El sistema de administración debe procesar los datos de medición

### Dependencias con Otros Bloques


* **Bloque II (Otorgamiento)** : Los datos de medición son base para otorgamiento de CEL
* **Bloque III (Disponibilidad)** : La medición precisa es esencial para calcular disponibilidad real
* **Bloque VII (Cumplimiento)** : Los datos de medición son base para verificación de obligaciones

### Consideraciones de Implementación


1. **Implementación Gradual** : Piloto en regiones específicas antes de despliegue nacional
2. **Capacitación Intensiva** : Programa de capacitación para operadores y participantes
3. **Período de Transición** : Operación paralela de sistemas durante 6 meses
4. **Monitoreo Continuo** : Seguimiento de métricas de calidad durante implementación
5. **Ajustes Iterativos** : Mejora continua basada en experiencia operativa

---

**Elaborado por:** Dirección General de Electricidad - SENER
**Revisado por:** Unidad de Planeación Energética
**Aprobado por:** Subsecretaría de Planeación y Transición Energética
