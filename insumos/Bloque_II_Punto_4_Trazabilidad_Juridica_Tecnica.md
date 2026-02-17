# Bloque II Punto 4: Trazabilidad jurídica y técnica del Certificado de Energía Limpia (S-CEL 2.0)

**Alcance:** Protocolo técnico-jurídico para el ciclo de vida del CEL bajo el principio de Planeación Vinculante y Soberanía Energética.  
**Marco Jurídico Vigente:** Ley del Sector Eléctrico (LSE 2025), Reglamento de la LSE 2025 (RLSE), Ley de Planeación y Transición Energética (LPTE).

## A. Auditoría del Marco Anterior ("Foto Actual")

**Diagnóstico de Fallo Operativo:**
El modelo anterior, gestionado por la CRE bajo las Disposiciones Administrativas RES/174/2016, operaba bajo una lógica de mercado especulativo desconectado de la realidad operativa del SEN.
1.  **Centralización Vulnerable:** La plataforma S-CEL (Sistema de Gestión de Certificados y Cumplimiento de Obligaciones de Energías Limpias) residía en servidores desconectados de la medición fiscal del CENACE, dependiendo de reportes de "buena fe" de los generadores.
2.  **Falta de Validación Técnica:** No existía un mecanismo robusto para verificar que el MWh reportado correspondiera efectivamente a energía limpia inyectada y no a simulaciones o arbitraje regulatorio.
3.  **Opacidad Legal:** La derogación fáctica de la autoridad de la CRE ha dejado a los participantes en un limbo jurídico sobre quién valida sus atributos ambientales hoy.

**Estatus:** *Obsoleto y No Vinculante*. Se requiere migración inmediata al nuevo estándar de Soberanía.

## B. Reingeniería Jurídica (Marco LSE 2025)

El control del sistema pasa de un regulador autónomo a la **Comisión Nacional de Energía (CNE)**, como órgano desconcentrado encargado de la ejecución de la política energética dictada por **SENER**.

### B.1. Fundamentos de Autoridad (LSE 2025)

| Facultad | Autoridad | Fundamento Legal (LSE 2025) | Mandato |
| :--- | :--- | :--- | :--- |
| **Emisión de CELs** | **CNE** | **Art. 147 Fracc. III** | *"La CNE debe otorgar los Certificados de Energías Limpias que correspondan, emitir la regulación para validar su titularidad y verificar el cumplimiento de dichas obligaciones."* |
| **Registro (S-CEL 2.0)** | **CNE** | **Art. 149** | *"La CNE debe crear y mantener el Registro de Certificados, el cual al menos debe tener el matriculado de cada certificado, así como la información correspondiente a su fecha de emisión, vigencia e historial de personas propietarias."* |
| **Política y Criterios** | **SENER** | **Art. 147 Fracc. I y II** | La Secretaría establece los requisitos de Transición Energética y los criterios para reconocer a las Generadoras Limpias. |
| **Validación de Datos** | **CENACE** | **Art. 11 LSE / Art. 124 LSE** | CENACE provee los datos de medición fiscal necesarios para que la CNE valide la generación real antes de la emisión. |

### B.2. Reglamento de la LSE (RLSE 2025)

El Reglamento detalla la operatividad del sistema en sus artículos 180 al 194.
-   **Art. 182 (RLSE):** Establece que la emisión es un acto electrónico de fe pública, no un mero trámite administrativo.
-   **Art. 184 (RLSE):** Obliga a que todas las transacciones de CELs (compra/venta) se realicen dentro de la plataforma oficial para evitar el doble conteo.

## C. Trazabilidad Técnica (Estándar S-CEL 2.0)

Para dar cumplimiento al **Art. 149 de la LSE** (Matriculado e Historial), se define el nuevo estándar técnico del Certificado. El S-CEL 2.0 no es solo una base de datos, es un **Sistema de Trazabilidad Integral**.

### C.1. Identificador Único (UID) Soberano

Cada MWh de energía limpia genera un activo digital único e irrepetible.
Estructura del Matriculado: `MX-[TEC]-[NODO]-[MES]-[AÑO]-[HASH]`

1.  **`MX`:** Jurisdicción Soberana (México).
2.  **`[TEC]`:** Tecnología de Generación (SOL, EOL, HID, NUC, BIO, GEO).
3.  **`[NODO]`:** Zona de Carga/Generación del SEN (Trazabilidad Regional).
4.  **`[MES/AÑO]`:** Temporalidad de la inyección (Vigencia de 30 meses según Art. 146 LSE).
5.  **`[HASH]`:** Firma criptográfica que vincula el certificado a la medición fiscal del CENACE.

### C.2. Capa de Metadatos (Expediente Digital)

Al consultar el UID en el Registro de la CNE, el sistema despliega:
*   **Fuente:** Central Generadora y Permiso CNE asociado.
*   **Validación:** Fecha y hora de la conciliación con CENACE.
*   **Estatus Social:** *Cumplimiento / Incumplimiento* (Vinculado a la Evaluación de Impacto Social de SENER).
*   **Historial de Propiedad:** Cadena de custodia desde el Generador hasta el Usuario Final o Suministrador (Obligado).

## D. Tablas Comparativas (Antes vs Ahora)

| Concepto | Modelo Anterior (CRE / LIE) | Nuevo Modelo (CNE / LSE 2025) | Impacto |
| :--- | :--- | :--- | :--- |
| **Autoridad Emisora** | Comisión Reguladora de Energía (CRE) | **Comisión Nacional de Energía (CNE)** | Centralización de la política y ejecución en el Estado. |
| **Base de Datos** | S-CEL (Plataforma Privada/Externa) | **Registro de Certificados (Plataforma Soberana)** | Seguridad nacional y soberanía de datos (Art. 149 LSE). |
| **Validación** | Declarativa (Buena Fe) | **Automatizada (Interoperabilidad)** | Eliminación de fraude y "CELs de papel" sin respaldo energético. |
| **Vigencia** | Indefinida (Especulativa) | **30 Meses (Art. 146 LSE)** | Fomento a la liquidez y desincentivo al acaparamiento. |

## E. Estrategia de Transición (Transitorios)

Para asegurar la continuidad del mercado y el cumplimiento de las Metas Nacionales durante la migración:

1.  **Reconocimiento de Legados:** Los CELs emitidos por la CRE antes de la entrada en vigor de la LSE 2025 serán reconocidos en el nuevo Registro, marcados con el estatus "LEGADO". Mantendrán su validez hasta su liquidación o expiración (Transitorio Sexto RLSE).
2.  **Ventanilla de Migración:** Los Participantes del Mercado deberán darse de alta en el nuevo sistema de la CNE en un plazo no mayor a 90 días hábiles.
3.  **Validación Retroactiva:** La CNE se reserva el derecho de auditar la emisión histórica de CELs para detectar inconsistencias con los datos de CENACE.
