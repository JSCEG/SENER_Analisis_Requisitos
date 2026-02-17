
# Bloque I - Punto 2: Registro de participantes, cuentas y administración del S-RCEL (Nuevo Sistema)

**Fecha de elaboración:** 12 de enero de 2026
**Alcance:** Registro de Sujetos Obligados y Voluntarios, transición de cuentas legadas y administración técnica del Registro.
**Marco Jurídico de Transición:** Reglamento de la Ley del Sector Eléctrico 2025 (RLSE), Transitorios del RLSE y DACG vigentes (supletoriedad).

---

## A. Fuentes de Información del S-RCEL (Evolución Normativa)

Esta tabla actualiza las fuentes de autoridad, pasando de la antigua CRE a la nueva CNE.

| Actor / Fuente                      | Instrumento Legal (LSE 2025) | Artículo / Numeral | Cita Textual / Interpretación Jurídica                                                                                                    |
| :---------------------------------- | :--------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------ |
| **CNE (Nueva Autoridad)**     | Reglamento LSE 2025          | Art. 182            | "Los CEL son otorgados por la CNE... quien emitirá las disposiciones para regular el funcionamiento del sistema electrónico".             |
| **Uso Obligatorio de S-RCEL** | Reglamento LSE 2025          | Art. 184            | "Las transacciones de compraventa, liquidación y cancelación voluntaria... solo se pueden realizar a través del sistema electrónico". |
| **Sujetos Obligados**         | Reglamento LSE 2025          | Art. 186            | Se redefine la obligación como una proporción del consumo total en los Centros de Carga, impactando la configuración de las cuentas.     |
| **Validez de Activos (CELs)** | Reglamento LSE 2025          | Transitorio Sexto   | "Los CEL emitidos con anterioridad... conservan su validez... hasta su liquidación o cancelación voluntaria".                             |
| **Principios del Sistema**    | Reglamento LSE 2025          | Art. 6              | El registro debe operar bajo principios de "simplificación administrativa, mejores prácticas de la industria, transparencia y celeridad". |

---

## B. Matriz de Transición y Validación Jurídica

Esta matriz funciona como puente entre la realidad operativa actual ("lo que había") y la solución legal ("lo que debe ser").

| Hallazgo (Realidad Operativa Actual)                         | Origen (Marco Anterior - LIE/CRE)                                   | Estatus bajo LSE 2025 (Fundamento de Transición)                                                                                                                          | Ajuste Propuesto (Reingeniería Operativa)                                                                                                   |
| :----------------------------------------------------------- | :------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| **Gestión manual de cuentas y validación**           | Basado en Disp. 18 de las antiguas DACG (RES/174/2016).             | **Transitorio Cuarto:** Las normas viejas aplican *solo* hasta que la CNE emita las nuevas. **Art. 6:** La gestión manual viola el principio de eficiencia. | **Automatización:** Implementar "Onboarding Digital" cruzando datos vía API con el registro de Participantes del Mercado del CENACE. |
| **Existencia de CELs "Legados" en el sistema**         | CELs emitidos bajo reglas de mercado 2014.                          | **Transitorio Sexto:** Otorga "Ultravividad" a estos activos. El sistema debe reconocerlos legalmente.                                                               | **Segregación de Cartera:** El S-RCEL debe distinguir técnicamente entre "CELs Legados" y "Nuevos CELs" para liquidación.           |
| **Falta de interoperabilidad (Silos de información)** | DACG A/067/2017 no preveía conexión obligatoria.                  | **Art. 182 y 184:** Mandata el funcionamiento del sistema electrónico y su uso obligatorio para todas las transacciones.                    | **Inyección de Datos:** Interconexión S-RCEL ↔ CENACE para carga automática de medición, eliminando errores de captura.           |
| **Ciberseguridad no especificada**                     | Reglas anteriores enfocadas en operación, no en seguridad digital. | **Art. 182 y Art. 4:** Facultan el uso de medios electrónicos seguros y mandatan a la CNE la emisión de reglas de funcionamiento del sistema. | **Estándar ISO 27001:** Definir en las nuevas DACG la obligatoriedad de encriptación y trazabilidad inmutable conforme al Art. 4. |

---

## C. Desarrollo Analítico y Propuesta Normativa

### Diagnóstico de la Situación (La "Foto Actual")

Actualmente, el registro opera con procesos diseñados en 2016 que dependen de validaciones manuales. Si bien el **Transitorio Cuarto** del Reglamento permite la operación temporal bajo reglas anteriores, esto genera riesgos operativos (cuellos de botella) ante la migración masiva de permisos prevista en los **Transitorios Octavo y Vigesimotercero**.

### Estado Objetivo

Un sistema administrado por la CNE que automatice el ciclo de vida del CEL (emisión-transacción-cancelación), garantizando la **Justicia Energética** mediante interfaces simplificadas para pequeños generadores y la integridad de los datos para el Monitor Independiente.

### Propuestas de Texto para las Nuevas DACG (CNE)

Se propone la inclusión de los siguientes artículos en las nuevas Disposiciones Administrativas que la CNE debe emitir conforme al Art. 182 del Reglamento:

> **Disposición X (Automatización e Interoperabilidad):**
> "La CNE implementará mecanismos de interoperabilidad con el CENACE. La creación de cuentas y la emisión de CEL se realizará preferentemente mediante la inyección automática de datos de medición validados, reduciendo la carga administrativa en cumplimiento a los principios de **simplificación y eficiencia** del Artículo 6 del Reglamento."

> **Disposición Y (Seguridad y Continuidad):**
> "El Sistema contará con una infraestructura de respaldo geográficamente distribuida y protocolos de ciberseguridad que garanticen la integridad de los activos. Se asegurará un Objetivo de Punto de Recuperación (RPO) menor a 1 hora para proteger la titularidad de los certificados conforme a la definición de **Seguridad** del Artículo 2 del Reglamento."

---

**Elaborado por:** Consultoría Experta en Regulación (Validado vs. LSE 2025).
