
# Bloque III Punto 1: Disponibilidad Real de Certificados de Energía Limpia (CEL) y Transición al Nuevo Modelo de Soberanía

**Alcance:** Diagnóstico de disponibilidad, reingeniería del monitoreo bajo la LSE 2025 y estrategia de transición operativa CRE → CNE.
**Instrumentos jurídicos rectores:** Ley del Sector Eléctrico 2025 (LSE), Reglamento de la Ley del Sector Eléctrico 2025 (RLSE), Ley de Planeación y Transición Energética (LPTE).

---

## A. Marco Normativo: Del Mercado a la Planeación Vinculante

Esta sección contrasta las fuentes históricas (aún relevantes para liquidaciones pendientes) con las nuevas facultades de la CNE y SENER bajo el modelo de soberanía energética.

| Actor                        | Instrumento (Marco Anterior - Referencia) | Instrumento (Nuevo Marco LSE 2025) | Disposición Clave (Nueva)                                                                                                                                                  |
| :--------------------------- | :---------------------------------------- | :--------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **SENER**              | Aviso Requisito CEL 2019-2022             | **LSE 2025 / RLSE**          | **Transitorio Décimo Sexto (RLSE):** "Por única ocasión, la Secretaría debe publicar los requisitos de Energía Limpia para los años 2025, 2026, 2027 y 2028..." |
| **CNE (antes CRE)**    | RES/174/2016 (Otorgamiento)               | **LSE Art. 11 Fracc. XVI y XVII** | "Otorgar los Certificados de Energías Limpias... y operar el registro de los mismos".                                                                     |
| **CNE**                | A/013/2019 (Flexibilidad)                 | **LSE Art. 147 Fracc. III**  | La CNE debe verificar el cumplimiento de las obligaciones de Transición Energética y Descarbonización.                                                                   |
| **Generación Limpia** | RES/1838/2016 (Eficiencia)                | **RLSE Art. 182**            | Los CELs se otorgan en función de criterios que emita SENER y regulaciones de CNE para validar titularidad.                                                                |
| **Metas Nacionales**   | Ley de Transición Energética (LTE)      | **LPTE Art. 24**             | La Estrategia es el instrumento rector. Las metas de Energías Limpias son porcentajes mínimos vinculantes.                                                                |
| **Planeación**        | PRODESEN (Indicativo)                     | **LSE Art. 12**              | "La planeación del sector eléctrico tiene carácter**vinculante** y está a cargo de la Secretaría".                                                               |

---

## B. Matriz de Validación Jurídica y Riesgos Operativos

Identificación de brechas entre el modelo especulativo anterior y el modelo de garantía de suministro actual.

| Hallazgo / Limitación                                                                                                                       | Fundamento Jurídico (LSE 2025)                                                                                                                        | Riesgo Operativo                                                                                                  | Ajuste Propuesto (Reingeniería LSE)                                                                                                                       |
| :------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Opacidad en Disponibilidad Real:** El sistema anterior reportaba *ex-post* (10 días después del cierre de mes).                  | **LSE Art. 11 Fracc. XVII:** CNE debe llevar el registro de CELs y vigilar su integridad.                                                                                       | Incapacidad de reacción ante déficits de CELs, comprometiendo las metas de la LPTE.                             | Implementar**Tableros de Control en Tiempo Real** enlazados directamente a la medición de CENACE bajo el nuevo Art. 15 del RLSE (Proyectos Piloto). |
| **Criterios de Flexibilidad Financiera:** El A/013/2019 basaba la flexibilidad en precios de mercado (UDIs), no en capacidad técnica. | **LSE Art. 12 Fracc. I:** Procurar la Confiabilidad y Continuidad del servicio público con responsabilidad social.                              | La volatilidad financiera puede justificar incumplimientos técnicos inaceptables para la soberanía energética. | Sustituir el "Precio Implícito" por un**Índice de Suficiencia de Descarbonización** gestionado por CNE.                                           |
| **Gestión de Excedentes:** Los CELs no emitidos o erróneos se perdían o transferían sin transparencia (RES/174/2016).              | **RLSE Art. 182:** CNE emite disposiciones para liquidación, cancelación y transacciones.                                                      | Acumulación de pasivos ocultos y distorsión de la contabilidad nacional de energías limpias.                   | Crear la**Reserva Estratégica de CELs** administrada por CNE para compensar déficits sistémicos justificados.                                     |
| **Desconexión con Justicia Energética:** Emisión de CELs ciega al impacto social.                                                   | **LSE Art. 12 Fracc. VII:** Planeación con políticas de Justicia Energética y Sostenibilidad.                                                 | Otorgar CELs a proyectos con conflictos sociales activos, violando el principio de Sostenibilidad.                | Vincular la emisión de CELs a la validación de la**Manifestación de Impacto Social** (RLSE Art. 42).                                              |

---

## C. Desarrollo Analítico: Hacia el Sistema de Monitoreo Soberano

### 1. Diagnóstico de la Situación Actual (Transición)

El sistema heredado (S-CEL de la CRE) funcionaba como una cámara de compensación financiera. El nuevo sistema bajo la CNE debe funcionar como una herramienta de política pública para la **Descarbonización**.

**Datos Críticos para la CNE:**

* **Validación de Titularidad:** Migración de cuentas de la CRE a la CNE sin pérdida de datos históricos.
* **Interconexión Legada:** Identificación precisa de capacidad excluida de contratos legados que ahora generan CELs bajo LSE.
* **Sincronización CENACE-CNE:** Eliminación de la ventana de latencia de 10 días mediante interconexión directa de bases de datos.

### 2. Estado Objetivo (Arquitectura LSE 2025)

El modelo objetivo se alinea con el **Art. 147 de la LSE**, donde la CNE no solo "cuenta papeles", sino que asegura la **Descarbonización Efectiva**:

* **Monitoreo Predictivo:** Uso de IA sobre los datos de *Planeación Vinculante* (PLADESE) para prever la disponibilidad de CELs a 3 años (requisito RLSE Transitorio Décimo Sexto).
* **Trazabilidad Total:** Desde el megawatt generado hasta el cumplimiento de la obligación del Centro de Carga.
* **Auditoría de Eficiencia:** Integración de la metodología de Energía Libre de Combustible (ELC) directamente en el cálculo de emisión, verificando eficiencia térmica real.

### 3. Tabla Comparativa: Modelo Anterior vs. Modelo LSE 2025

| Aspecto                     | Modelo Anterior (Mercado)          | Modelo Objetivo (Soberanía/CNE)                                                    |
| :-------------------------- | :--------------------------------- | :---------------------------------------------------------------------------------- |
| **Gestión de Datos** | Reporte mensual estático (batch). | Flujo continuo de datos CENACE → CNE.                                              |
| **Validación**       | Documental y de buena fe.          | Técnica, basada en eficiencia real y cumplimiento social.                          |
| **Flexibilidad**      | Basada en precio (>60 UDIs).       | Basada en**Seguridad Energética** y disponibilidad física real.             |
| **Vigencia**          | Indefinida hasta consumo.          | Condicionada a la actualización del Sistema Electrónico (RLSE Transitorio Sexto). |

---

## D. Propuestas de Ajuste Normativo (Implementation Ready)

### Instrumento A: Disposiciones Administrativas de Carácter General (DACG) para el Registro de CELs (Nuevo Art. 182 RLSE)

**Propuesta de redacción para CNE:**

> "La Comisión Nacional de Energía, en coordinación con la Secretaría, establece que para el otorgamiento de CELs, los Generadores deberán acreditar no solo la inyección de energía limpia, sino el cumplimiento de los atributos de **Sostenibilidad y Justicia Energética** conforme al Art. 12 de la LSE. El sistema alertará automáticamente cuando el balance oferta-demanda proyectado a 6 meses sea inferior al umbral de seguridad definido por la Planeación Vinculante."

### Instrumento B: Mecanismo de Transición de Saldos (Transitorio Sexto RLSE)

**Estrategia de Migración:**

> "Conforme al Transitorio Sexto del RLSE, los CELs emitidos anteriormente conservan validez. Sin embargo, su liquidación en el nuevo sistema estará condicionada a la **Validación de No-Duplicidad** y a la actualización del Registro de Certificados. Se establece una ventana de 180 días para la conciliación de saldos históricos entre la extinta CRE y la nueva CNE."

---

## E. Hoja de Ruta de Transitorios y Migración

Para asegurar la continuidad operativa sin violar la nueva LSE:

1. **Fase 1 (Días 1-60):** CNE asume el control del S-CEL existente. Se suspende la emisión de nuevos criterios de flexibilidad financiera (A/013/2019 deja de aplicar por contravención a la LSE en materia de rectoría del Estado).
2. **Fase 2 (Días 61-120):** SENER publica los nuevos Requisitos de Energía Limpia 2025-2028 (Mandato RLSE Transitorio Décimo Sexto). CNE ajusta los algoritmos de validación.
3. **Fase 3 (Día 121+):** Lanzamiento del **Módulo de Disponibilidad Real**, integrando proyecciones del PLADESE. Inicio de auditorías a centrales con "valores estimados" recurrentes.
4.
