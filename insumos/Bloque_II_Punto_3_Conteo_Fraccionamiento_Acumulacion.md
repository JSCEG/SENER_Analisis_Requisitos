
# Bloque II Punto 3: Conteo, fraccionamiento y acumulación de Certificados de Energía Limpia (S-CEL 2.0)

**Alcance:** Definición de reglas algorítmicas y normativas para la medición, acumulación de fracciones y emisión de CEL bajo la autoridad de la Comisión Nacional de Energía (CNE).
**Instrumentos jurídicos base:** Ley del Sector Eléctrico 2025 (LSE), Ley de Planeación y Transición Energética (LPTE).

## A. Auditoría de Fuentes: Transición del Marco Anterior al Nuevo

Esta tabla contrasta las fuentes operativas originales (CRE/RES/174/2016) con los nuevos mandatos de la CNE para justificar la reingeniería del proceso.

| Concepto                          | Referencia Anterior (RES/174/2016 - CRE)                                   | Limitación Operativa Detectada                                                                      | Nuevo Fundamento (LSE 2025 / LPTE - CNE)                                                                                                                                                            |
| :-------------------------------- | :------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Autoridad Emisora**       | CRE (Ley de la Industria Eléctrica 2014)                                  | Fragmentación de datos entre CRE y CENACE. Burocracia en validación manual.                        | **CNE (Comisión Nacional de Energía).** "La CNE está facultada para: ... Otorgar los Certificados de Energías Limpias" y "Verificar el cumplimiento de los requisitos".                   |
| **Medición y Datos**       | Disposición 32 (Acumulación simple). Dependencia de reporte de terceros. | Imprecisión en decimales provocaba pérdidas de valor en generadores pequeños (Micro-generación). | **Soberanía del Dato.** "La CNE puede establecer requerimientos de estimación, medición, y reporte relacionado con la generación de Energías Limpias" (Art. 147 Fracc. V LSE 2025).           |
| **Definición de Limpieza** | Lineamientos CEL (Tecnología + Combustible).                              | Ambigüedad en co-procesamiento y centrales híbridas.                                               | **Taxonomía Estricta.** La LSE define explícitamente las Energías Limpias (Art. 3, XXI, incisos a-m), incluyendo criterios de eficiencia de la CNE para cogeneración e hidrógeno.        |
| **Base de Otorgamiento**    | Mercado impulsado por oferta/demanda privada.                              | Volatilidad y falta de alineación con metas nacionales.                                             | **Planeación Vinculante.** El otorgamiento debe alinearse a las "metas de transición energética, descarbonización" establecidas por la Secretaría (SENER) (Art. 147 LSE).                |
| **Migración**              | N/A                                                                        | Riesgo de vacío legal durante el cambio de sistema.                                                 | **Continuidad Regulada.** Los permisos anteriores siguen surtiendo efectos hasta su vigencia, pero se debe facilitar la migración expedita a la nueva Ley (Transitorios Noveno y Sexto LSE). |

## B. Matriz de Validación Jurídica (LSE 2025)

Se proponen ajustes operativos sustentados en las nuevas facultades de la CNE para eliminar las "zonas grises" del conteo y garantizar la Justicia Energética.

| Hallazgo / Limitación Actual                                            | Fundamento Jurídico LSE 2025 (Cita Textual)                                                                                                                    | Riesgo Mitigado                                                                                              | Ajuste Técnico Propuesto                                                                                                    |
| :----------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| **Redondeo impreciso** (pérdida de fracciones < 0.1 MWh)          | **Art. 10 Fracc. XIX LSE:** "Fomentar el otorgamiento de créditos... para el financiamiento de Centrales Eléctricas de Generación Limpia Distribuida". | Subestimación de CELs afecta la viabilidad financiera de la Generación Distribuida (Justicia Energética). | **Regla de 4 Decimales:** Acumulación exacta hasta 0.9999 MWh antes de emitir.                                        |
| **Centrales Híbridas** (Mezcla de tecnologías sin desglose)      | **Art. 11 Fracc. XIX LSE:** La CNE debe "Emitir los criterios de eficiencia utilizados en la definición de Energías Limpias".                           | "Greenwashing" o conteo doble en centrales con respaldo fósil no medido correctamente.                      | **Acumulación Segregada:** "Wallets" de acumulación separadas por tipo de tecnología (ej. Solar vs. Cogeneración). |
| **Inconsistencias de Datos** (Diferencias > 2%)                    | **Art. 11 Fracc. XI y XII LSE:** "Vigilar la operación del Mercado... e instruir las correcciones que deban realizarse a los parámetros registrados".   | Retrasos en la liquidación mensual y disputas administrativas largas.                                       | **Validación Automática:** Interconexión directa API CNE-CENACE. Plazo de corrección: 15 días máx.               |
| **Paros y Mantenimientos** (Vacío legal en conteo durante pausas) | **Art. 3 Fracc. XLIX LSE:** Garantizar "Calidad, Confiabilidad, Continuidad y seguridad" del Sistema Eléctrico.                                          | Otorgamiento indebido de CELs basado en estimaciones erróneas durante paros.                                | **Flag de Estado Operativo:** Suspensión automática de conteo estimado durante estados de "Mantenimiento".           |

## C. Desarrollo Analítico: Modelo S-CEL 2.0

### Diagnóstico de la situación

El modelo anterior operaba bajo una lógica de "mínimos necesarios". El nuevo modelo bajo la LSE 2025 opera bajo una lógica de **trazabilidad y soberanía**, donde cada fracción de MWh cuenta para las Metas de Transición Energética que la SENER está obligada a reportar en el PLATEASE.

### Arquitectura del Sistema Objetivo

El sistema se rediseña para cumplir con el **Artículo 147 de la LSE**, que faculta a la CNE para establecer requerimientos de medición:

1. **Motor de Ingesta (CNE-Link):** Recibe datos brutos del CENACE (Art. 11 VI LSE).
   * *Input:* `Energía_Inyectada_MWh` (precisión `float` 4 decimales).
   * *Input:* `Fuente_Energia_ID` (Catálogo LSE Art. 3 XXI).
2. **Lógica de Fraccionamiento (Art. 11 XX LSE):**
   * Si `Tecnología` == "Limpia Pura" (Solar/Eólica): Factor 1.0.
   * Si `Tecnología` == "Cogeneración/Bio": Factor calculado según eficiencia térmica (Art. 3 XXI k, l, m LSE).
3. **Bóveda de Acumulación (Ledger):**
   * Mantiene el saldo de fracciones mes a mes ("Rollover").
   * **Regla de corte:** Al alcanzar $\ge 1.0000$, se emite 1 CEL y se resta 1.0000 del saldo. El remanente permanece en la cuenta del usuario.

### Tabla Comparativa: Modelo Anterior vs Modelo LSE 2025

| Aspecto                 | Modelo RES/174/2016                       | Modelo LSE 2025 (Objetivo)                                                                 |
| :---------------------- | :---------------------------------------- | :----------------------------------------------------------------------------------------- |
| **Precisión**    | 1 o 2 decimales (pérdida de residuales). | **4 decimales** (Art. 147 V LSE) para captura total de valor.                        |
| **Híbridas**     | Conteo global por central.                | **Desglose por tecnología** (Art. 3 XXI LSE).                                       |
| **Validación**   | Manual / Reactiva.                        | **Automática / Instructiva** (CNE instruye corrección al CENACE).                  |
| **Transparencia** | Datos privados del participante.          | Datos alineados al**Sistema Nacional de Información Energética** (Art. 8 XI LPTE). |

## D. Propuestas de Ajuste Normativo (Nuevas DACG)

Estas propuestas sustituyen las disposiciones de la RES/174/2016 y se integran como **Disposiciones Administrativas de Carácter General (DACG)** emitidas por la CNE.

### Instrumento A: DACG para la Emisión y Validación de CELs (CNE-DACG-001-2026)

**Disposición 32.A (Nuevo Estándar de Precisión):**

> "De conformidad con la facultad de la CNE establecida en el artículo 147 fracción V de la Ley del Sector Eléctrico, la medición para la emisión de CEL se realizará con una precisión de cuatro cifras decimales. Las fracciones de MWh se acumularán mensualmente en el registro del Participante del Mercado. La emisión del CEL se perfeccionará automáticamente en el momento en que el saldo acumulado de fracciones sea igual o superior a la unidad (1.0000 MWh)."

**Disposición 32.B (Trazabilidad por Tecnología):**

> "Para dar cumplimiento a la clasificación de Energías Limpias del artículo 3 fracción XXI de la Ley, la acumulación de fracciones deberá segregarse por tecnología de generación. En centrales híbridas o de cogeneración, se aplicarán los criterios de eficiencia emitidos por la CNE (Art. 11 XIX LSE) antes de la acumulación en el saldo de fracciones."

**Disposición 30.A (Corrección de Inconsistencias):**

> "En ejercicio de la facultad de vigilancia del artículo 11 fracción XI de la Ley, la CNE notificará inconsistencias entre la medición reportada y la registrada por el CENACE. El Generador tendrá un plazo perentorio de 15 días hábiles para subsanar la diferencia. En caso de silencio, prevalecerá el dato del CENACE corregido por la CNE según el artículo 11 fracción XII de la Ley."

## E. Estrategia de Transición (Transitorios y Migración)

Para evitar la parálisis operativa durante la migración del sistema CRE al sistema CNE, se activan los mecanismos de los artículos transitorios de la LSE 2025.

1. **Reconocimiento de Saldos Históricos:**

   * De acuerdo con el **Transitorio Noveno** de la LSE, los permisos y actos administrativos anteriores continúan surtiendo efectos. La CNE reconocerá los saldos de fracciones acumulados bajo la vigencia de la CRE como "Saldo Inicial" en el nuevo sistema.
2. **Ventanilla Única de Aclaración:**

   * Se implementará la **Ventanilla Única** ordenada en el Transitorio Noveno y Sexto de la LSE para resolver discrepancias de conteo del periodo 2024-2025 de manera expedita, facilitando la migración de Generadores y Generadores Exentos al nuevo esquema.
3. **Periodo de Coexistencia (180 días):**

   * Durante los primeros 180 días (plazo para actualización de metodologías según **Transitorio Cuarto**), el sistema S-CEL aceptará reportes en formatos anteriores, ejecutando una conversión interna al estándar de 4 decimales para garantizar la continuidad del despacho y la liquidación.
