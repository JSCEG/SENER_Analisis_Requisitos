# Nuevo Mecanismo para adquirir CEL (SENER 2026)

Con retraso: ⏰ Past Due
Estado: En curso
Fecha límite: 02/28/2025
Prioridad: Baja
Tipo de tarea: 💬 Solicitud de funciones
Nivel de esfuerzo: Pequeño
Descripción: Incluir las actualizaciones de los productos en la próxima nota de la versión.
Última actualización:: 5 de marzo de 2026 12:11

## REQUISITOS PARA ADQUIRIR CERTIFICADOS DE ENERGÍAS LIMPIAS

## Objetivo

Ajustar la metodología actual que establece el requisito para adquirir Certificados de Energías Limpias (CEL), conforme a lo establecido en el Artículo 143 de la LSE: *"Los requisitos para adquirir Certificados de Energías Limpias se deben establecer como una proporción del total de la Energía Eléctrica consumida [...] de acuerdo con la **planeación vinculante y la Confiabilidad del Sistema Eléctrico Nacional**”.*

## Problemática que resuelve la propuesta

La metodología de cálculo ya no puede limitarse a una simple división aritmética (Oferta/Demanda). En los ejercicios de proyección arroja un requerimiento bastante alto (inmanejable) que tendría impacto en los costos del suministro. La nueva Ley del sector Eléctrico obliga y faculta a SENER legalmente a aplicar factores de **"Confiabilidad" (restricciones operativas dictadas por el CENACE) y lineamientos de "Planeación Vinculante" (que exigen proteger las tarifas eléctricas bajo el principio de Justicia Energética**.

**Metodología y Fórmula Propuesta**

<aside>
💡

**FÓRMULA COMPLETA DEL REQUISITO DE CEL AJUSTADO**

*R*(%)=[*ConsumoNacionalTotal*−*ConsumoExentoCIL*[(*Gen*.*Limpia*−*GLD*)×*Fconf*]−*Pal*]×*Fje*

</aside>

**Donde:**

- ***Limpia:** Generación Limpia Total Proyectada en el Plan de Desarrollo del Sector Eléctrico. Incluye hidroeléctricas, nucleoeléctrica y la proporción exacta de energía limpia generada por mezcla de combustibles (como el hidrógeno en ciclos combinados).*
- ***GLD (Generación Limpia Distribuida):** Se excluye del cálculo base. Asumimos que esta energía operará principalmente bajo esquemas de medición neta (compensación local) por las barreras administrativas para certificarla.*
- ***(Factor de Confiabilidad):** Factor de descuento que reconoce que el CENACE aplica restricciones de inyección por seguridad de la red y mantiene recursos como reserva operativa. No toda la capacidad limpia proyectada inyecta energía real.*
- ***(Pérdidas por Almacenamiento):** Energía descontada por la eficiencia de las baterías. El Artículo 195 del Reglamento de la LSE prohíbe explícitamente otorgar CELs a los Sistemas de Almacenamiento, ya que no generan energía, solo la desplazan.*
- ***Consumo Nacional Total:** Proyección de la demanda bruta del país.*
- ***Consumo Exento CIL:** Demanda de los Centros de Carga amparados bajo Contratos de Interconexión Legados, los cuales conservan el derecho de exención de compra de CELs por la porción de energía que reciben de sus propias centrales legadas.*
- ***Factor de Justicia Energética:** Se aplica a toda la ecuación técnica. Su función es amortiguar el impacto regulatorio en el usuario final. Al multiplicar el resultado técnico por este factor, se busca proteger las tarifas del Suministro Básico y garantizando la asequibilidad del servicio, mandato explícito de los **Artículos 3 y 12 de la LSE.***

## A quiénes aplica

- **Suministradoras** (de Servicios Básicos, Servicios Calificados y de Último Recurso).
- **Usuarios Calificados Participantes del Mercado** (que acuden directamente al Mercado Eléctrico Mayorista).
- **Usuarios Finales con esquemas de Autoconsumo** (el titular del permiso de generación para autoconsumo asume la responsabilidad de cubrir los CELs por la energía que consuma de la red que no provenga de fuentes limpias).

## Otras consideraciones: cambios, implicaciones y riesgos

- **Cambio en el Otorgamiento:** El otorgamiento de CELs ya no depende de la fecha de inicio de operación comercial ni de la propiedad de la central. Esto permite que el Estado, a través de sus grandes centrales (hidroeléctricas y nucleares), garantice el abasto de certificados.
- **Implicación Económica:** Al introducir el Factor de Confiabilidad y excluir la GLD de la fórmula, logramos un porcentaje de requisito (R%) más bajo y manejable. Esto previene un impacto inflacionario en las Tarifas Reguladas del Suministro Básico, cumpliendo con el mandato de Justicia Energética de la LSE.
- **Migración de Contratos Legados (CIL):** Existe el riesgo de que los titulares de CIL decidan migrar masivamente al nuevo régimen de la LSE. Si esto ocurre, perderán su exención y su demanda se sumará al denominador, incrementando súbitamente la necesidad de CELs a nivel nacional.
- **Mitigación del Riesgo:** La decisión de excluir a la Generación Limpia Distribuida (GLD) de la fórmula inicial funciona como un margen de seguridad. Aquellos usuarios de GLD que sí logren obtener CELs, aportarán certificados adicionales no contemplados en la meta oficial, creando un "colchón de liquidez" en el mercado que evitará escasez y controlará los precios ante cualquier aumento imprevisto en la demanda

## Ejemplo de Aplicación:

*"Usamos toda la energía limpia para el año 2026 que se planea generar en el país, le restamos la generación en techos (GLD) **para tener un margen de seguridad,** y a ese bloque le aplicamos un castigo por las restricciones operativas del CENACE (). A lo que queda, le descontamos la energía que se pierde en las baterías () porque la Ley prohíbe darles certificados.*

*Esa oferta real la dividimos entre el consumo nacional de los obligados (restando a los legados exentos).*

*Finalmente, al porcentaje resultante, le aplicamos el Factor de Justicia Energética () al 80% para proteger las tarifas, logrando un Requisito oficial publicable, manejable y 100% apegado a la Ley."*

## Variables usadas en el ejercicio para el año 2026 de acuerdo con los datos de prospectiva:

Variables Año 2026 de acuerdo con los rdatos de prospectiva:

- (Demanda Obligada descontando CIL) = 290,864.21 GWh
- (Oferta Limpia Total sin Generación Distribuida) = 96,644.80 GWh
- (Oferta Intermitente: Solar + Eólica) = 44,720.53 GWh
- (Oferta Firme: Hidro + Geo + Bio + Nuclear + Cogen) = 51,924.27 GWh
- **(Pérdidas por Almacenamiento -** *Pal***) = 36.35 GWh** *(Nota: Calculado considerando la capacidad proyectada de 166 MW de baterías para 2026 a 4 horas de almacenamiento, operando un ciclo diario con un 15% de pérdida por eficiencia).*

**Escenario A: Metodología Tradicional**

La fórmula anterior era una división aritmética simple directa:

*R*(%)=(*ConsumoNacionalTotal*)−*ConsumoExentoCIL*(*Gen*.*Limpia*−*GLD*)

Sustituyendo: *R*(%)=290,864.21 GWh96,644.80 GWh=0.3322

**Resultado Tradicional = 33.22 %**

**Escenario B: Metodología Propuesta (Ajustada LSE 2025)**

Esta metodología se desglosa en 4 fórmulas para justificar los factores operativos, las restricciones legales de almacenamiento y la protección tarifaria.

**Fórmula 1: Oferta Ajustada por Confiabilidad (***Oajustada***)** Se aplica el factor de descuento a la generación limpia para garantizar la Confiabilidad del SEN (Art. 143 LSE), separando las tecnologías por su naturaleza operativa:

- *Fconf*_*int* = (Castigo a intermitentes por recortes/congestión) = 0.80
- *Fconf*_*firme* = (Castigo a firmes por reserva operativa) = 0.90

*Oajustada*=(*Oint*×*Fconf*_*int*)+(*Ofirme*×*Fconf*_*firme*)

Sustituyendo: *Oajustada*=(44,720.53×0.80)+(51,924.27×0.90)=82,508.26 GWh

**Fórmula 2: Oferta Neta Despachable con Almacenamiento (***Oneta***)** Se restan las pérdidas por eficiencia de ciclo de las baterías, ya que los Sistemas de Almacenamiento no generan energía y tienen prohibido recibir CELs (Art. 195 Reglamento LSE).

*Oneta*=*Oajustada*−*Pal*

Sustituyendo: *Oneta*=82,508.26 GWh−36.35 GWh=82,471.91 GWh

**Fórmula 3: Requisito Técnico (***Rtecnico***)** Se calcula la proporción real con la oferta neta despachable:

*Rtecnico*(%)=*DobligadaOneta*

Sustituyendo: *Rtecnico*(%)=290,864.21 GWh82,471.91 GWh=0.2835 **Requisito Técnico = 28.35 %**

**Fórmula 4: Requisito Final con Justicia Energética (***Rfinal***)** Para evitar un salto abrupto en tarifas (Art. 12 LSE), se aplica el factor de transición o Justicia Energética:

- *Fje* = (Tope de absorción del impacto tarifario) = 0.80

*Rfinal*(%)=*Rtecnico*×*Fje*

Sustituyendo: *Rfinal*(%)=28.35%×0.80=22.68% **Requisito Final Propuesto (***R*%**) = 22.68 %**

**Resumen Matemático del Impacto:** Δ*R*=*Rtradicional*−*Rfinal*=33.22%−22.68%=**10.54 pp.**

## Tabla Comparativa de Obligaciones 2026 ambos Escenarios

| ***Obligación de CEL de Participantes Obligados de Acuerdo al Requisito Calculado*** | **33.2268%** | **22.6900%** |
| --- | --- | --- |
| ***Año*** | **2026** | **2026** |
| ***Básico*** | 81,947.6839 | 55,960.6774 |
| ***Calificado (CFE y suministradores)*** | 14,697.1208 | 10,036.4135 |
| ***Total*** | *96,644.8047* | 65,997.0909 |

## ¿Como se estimaron la “Pérdidas por Almacenamiento” para este ejercicio?

El cálculo de las Pérdidas por Almacenamiento de **36.35 GWh** para el año 2026 se obtuvo cruzando los datos oficiales del Excel con los parámetros técnicos de operación de las baterías.

- **Capacidad de Baterías en 2026 (166 MW)** la capacidad instalada neta proyectada para la tecnología de **Baterías** en el año 2026 es exactamente de **166 MW**.
- **Duración del Almacenamiento (4 horas)** El documento oficial del PLADESE (Sección 3.4.1, sobre adiciones de capacidad) establece claramente la regla de diseño para estos sistemas: *"Para el ejercicio los sistemas de almacenamiento con baterías incorporados del PVIRCE 2025-2039 se consideran **cuatro horas de almacenamiento***".
- **El cálculo del ciclo anual** Asumiendo un uso estándar de la red donde las baterías se cargan y descargan una vez al día (1 ciclo diario) durante todo el año, la energía total que transitará por ellas se calcula así:
- ***Mwh x4 hrs=664Mwh por día x365 días=242,360 MWhr al año***

es decir, **242.36 GWh**

# ¿Que motiva la Propuesta de ajuste?

---

## LSE 2025  Capitulo III - De las Obligaciones para Energías Limpias, Transición Energética y Descarbonización del Sector Eléctrico

Artículo 143.- Los requisitos para adquirir Certificados de Energías Limpias se deben establecer como una ***proporción del total de la Energía Eléctrica consumida en los Centros de Carga de acuerdo con la planeación vinculante y la Confiabilidad del Sistema Eléctrico Nacional***.

<aside>
💡

**Si el requisito no toma en cuenta la Confiabilidad, el acuerdo que publique la Secretaría de Energía (SENER) estaría violando el artículo 143 de la Ley.**

</aside>

# Factor de Confiabilidad en la Fórmula

---

**¿Qué es exactamente la Confiabilidad ante la Ley?** El **Artículo 3, fracción IX de la LSE** define la Confiabilidad como la:

Habilidad y capacidad del Sistema Eléctrico Nacional para satisfacer la demanda de energía eléctrica de las Usuarias Finales bajo condiciones de suficiencia, Seguridad de Despacho, conforme a los criterios de Continuidad, Accesibilidad, Calidad, seguridad y Sostenibilidad que emita la CNE;

<aside>
💡

Habilidad de satisfacer demanda de UF bajo condiciones de s**uficiencia, seguridad de despacho conforme a criterios de Continuidad, Accesibilidad, Calidad, Seguridad y Sostenibilidad que emita CNE)**

</aside>

Es decir, la Confiabilidad `**es la obligación del Estado (a través del CENACE) de garantizar que la luz no se vaya, lo cual implica mantener reservas, regular el voltaje y, cuando sea necesario,** limitar la inyección de energía que desestabilice la red.`

---

<aside>
💡

**La Energía Neta es lo que la planta *puede* inyectar; la Confiabilidad es lo que la red *le permite* inyectar.**

</aside>

 *"Una planta solar puede tener 100 MWh de 'Energía Neta' listos en su puerta para inyectar a la red. Sin embargo, si las líneas de transmisión están saturadas, el CENACE, por mandato de **Confiabilidad**, le ordenará no inyectar 20 MWh para evitar un apagón. La Energía Neta sigue siendo 100, pero la energía realmente despachada fue 80."*

Las Bases del Mercado establecen que el CENACE tiene la facultad exclusiva de *"emitir instrucciones diferentes a los resultados del Despacho Económico"* para mantener la Confiabilidad del Sistema Eléctrico Nacional, aislando elementos o reduciendo generación cuando hay emergencias o congestión

*"Si en la fórmula solo usamos la Energía Neta proyectada por el PLADESE sin aplicarle nuestro Factor de Confiabilidad (Fconf), estamos asumiendo que el CENACE va a dejar que pase el 100% de esa energía. La Ley prohíbe dar CELs por energía que el CENACE rechaza por Confiabilidad."*

*"El Cenace reportará a la Comisión cualquier caso en el que una Central Eléctrica Limpia haya generado energía eléctrica en violación de las instrucciones de despacho emitidas por el Cenace. **No se otorgarán CEL por la energía eléctrica generada durante el tiempo de violación de dichas instrucciones**"*.

L*os 96,644 GWh de oferta limpia que nos proyecta el PLADESE para 2026 **ya son Energía Neta**, y aun así nos arroja un requisito inmanejable del 33.22%. La Energía Neta solo descuenta lo que la planta consume internamente, pero asume un mundo ideal sin cuellos de botella en las líneas de transmisión. El **Factor de Confiabilidad** que propongo descuenta la energía que el CENACE va a bloquear en la vida real por saturación o reservas. Si no aplicamos este factor, le exigiremos a CFE Suministro Básico comprar millones de CELs sobre energía que nunca logró entrar a la red."*

---

<aside>
💡

**Por qué el Factor de Confiabilidad (*Fconf*) se divide en "Intermitente" y "Firme", esto responde a cómo el Centro Nacional de Control de Energía (CENACE) administra físicamente la red.**

</aside>

**CENACE restringe la inyección de energía de las plantas solares de una manera muy distinta a como restringe a las presas hidroeléctricas**, y las **Bases del Mercado Eléctrico** clasifican y tratan a estas tecnologías por separado

```sql
3.3.16 Las Unidades de Central Eléctrica deberán registrarse con uno de las siguientes cuatro estatus. El uso de los estatus no-despachables podrá ser validado por la Unidad de Vigilancia del Mercado; en caso de determinar que una fuente es despachable, dicha Unidad puede ordenar el cambio de su estatus.
(a) Firme despachable: Fuente que tiene la capacidad de seguir instrucciones de despacho en tiempo real hasta su Capacidad Instalada (por ejemplo, ciclo combinado, termoeléctrica convencional o carboeléctrica).
(b) Firme no-despachable: Fuente que tiene la capacidad de producir hasta su Capacidad Instalada bajo condiciones normales, sin la capacidad de controlar su nivel de producción en tiempo real (por ejemplo, ciertas instalaciones de cogeneración, generación nucleoeléctrica o geotérmica). Dichas unidades no están exentas de seguir instrucciones del CENACE cuando se requiere por Confiabilidad; sin embargo, en el despacho económico se asumirá que su producción está fija en el último valor medido o en el valor pronosticado.
(Cuarta Sección) DIARIO OFICIAL Martes 8 de septiembre de 2015
(c) Intermitente despachable: Fuente que tiene la capacidad de seguir instrucciones de despacho en tiempo real desde su nivel de producción mínima y hasta una capacidad intermitente (por ejemplo, eólica o solar con la capacidad de reducir generación mediante instrucciones automáticas de despacho). Todas las Unidades de Central Eléctrica para las que exista tecnología disponible que permita su control, deberán registrarse en esta categoría.
(d) Intermitente no-despachable: Fuente intermitente que no tiene la capacidad de controlar su nivel de producción en tiempo real. Dichas unidades no están exentas de seguir instrucciones del CENACE cuando se requiere por Confiabilidad, sin embargo, en el despacho económico se asumirá que su producción está fija en el último valor medido o en el valor pronosticado.
```

**1. Por qué se castiga a las Intermitentes (Solar y Eólica) con un factor mayor (ej. 0.80)**

 *"A las plantas solares y eólicas se les aplica un factor de descuento por el fenómeno de **recorte de energía (curtailment)** motivado por la congestión de las líneas de transmisión y la falta de inercia."*

- **El Fundamento Técnico:** El Plan de Desarrollo del Sector Eléctrico (PLADESE) señala explícitamente que las centrales intermitentes carecen de "energía cinética (Inercia Física)" y tienen una reducida capacidad para aportar al nivel de corto circuito, lo que obliga al sistema a requerir otras plantas de respaldo para mantener la eficiencia, calidad, confiabilidad y seguridad.
- **El Fundamento Operativo y Legal:** Las Bases del Mercado Eléctrico establecen que todos los recursos, incluyendo los intermitentes, están obligados a reducir su generación de conformidad con las instrucciones del CENACE para preservar la Confiabilidad. Si las líneas están llenas o hay inestabilidad, el CENACE "apaga" temporalmente los parques solares y eólicos.
- **El Impacto en CELs:** La regla es tajante: si una central limpia inyecta energía violando las instrucciones de reducción del CENACE, **"No se otorgarán CEL por la energía eléctrica generada durante el tiempo de violación de dichas instrucciones"**. Por lo tanto, **asumir que el 100% de su energía neta se va a inyectar es irreal;** se debe descontar lo que el CENACE va a recortar por Confiabilidad.

**2. Por qué se castiga a las Firmes (Hidroeléctrica, Nuclear, Geotermia) con un factor menor (ej. 0.90)**

*"A las plantas firmes limpias no se les recorta por intermitencia, pero no se les deja inyectar el 100% de su capacidad porque el CENACE las retiene obligatoriamente para proveer **Servicios Conexos y Reservas Operativas**."*

- **El Fundamento Técnico:** El PLADESE indica que para asegurar la confiabilidad del Sistema Eléctrico Nacional, es fundamental contar con un "Margen de Reserva" (MR) que garantice el suministro incluso en fallas imprevistas. Este margen debe ser suficiente para cubrir la salida de operación de otra central o fenómenos naturales.
- **El Fundamento Operativo y Legal:** Las Bases del Mercado Eléctrico dictan que el CENACE debe asignar capacidades para mantener Reservas Rodantes, Reservas No Rodantes, Reservas Operativas y Reservas Reactivas. Además, el CENACE puede reducir las ofertas de los participantes para producir energía real si es necesario para garantizar la disponibilidad de Reservas Reactivas o control de voltaje.
- **El Impacto en CELs:** Una presa hidroeléctrica (Firme despachable) puede tener agua para generar 100 MWh, pero el CENACE le ordena generar solo 90 MWh y guardar 10 MWh de capacidad girando en vacío (Reserva Rodante) por si otra planta falla. Esa capacidad guardada da "Confiabilidad", pero como no inyecta MWh físicos, no genera CELs.

<aside>
💡

*La fórmula separa el factor en dos porque el CENACE asegura la Confiabilidad de dos formas distintas dependiendo de la tecnología, tal como lo mandatan las Bases del Mercado Eléctrico. A las solares y eólicas (Intermitentes) el CENACE les **recorta inyección** para evitar que saturen las líneas o desestabilicen la red. A las hidroeléctricas y nucleares (Firmes) el CENACE les **retiene capacidad** para usarlas como Servicios Conexos y Margen de Reserva Operativa. En ambos casos, es energía neta limpia que la planta tiene lista para producir, pero que por instrucciones directas de Confiabilidad del CENACE no entra a la red y, por estricto mandato regulatorio, no genera CELs. Si no diferenciamos estos factores, nuestro cálculo será irreal."*

</aside>

## Factor de Pérdidas por Almacenamiento

---

¿Cómo se justifica legalmente el factor de pérdidas por almacenamiento?

La justificación legal para descontar el factor de pérdidas por almacenamiento se fundamenta explícitamente en el **Artículo 195 del Reglamento de la Ley del Sector Eléctrico (RLSE)**. Este artículo establece la prohibición tajante de otorgar certificados a las baterías, dictando lo siguiente:

<aside>
💡

**Art. 195 RLSE** - "Los Sistemas de Almacenamiento de Energía Eléctrica **no pueden recibir Certificados de Energía Limpia** y tampoco le son aplicables los requisitos en la materia, toda vez que la acreditación y el requerimiento de los Certificados de Energía Limpia **se originan por la generación y consumo de energía eléctrica y no por su almacenamiento**".

</aside>

Almacenar energía no es lo mismo que generarla

. Cuando la energía limpia pasa por una batería, una parte se pierde físicamente por ineficiencia (en forma de calor o conversión). Si en la metodología no restamos esas pérdidas *Pal*,estaríamos sumando "energía fantasma" al cálculo nacional y asumiendo que recibirá un CEL, lo cual **viola directamente la prohibición del Artículo 195 del RLSE**, pues la ley exige que el certificado nazca solo de la energía que efectivamente se genera y se consume.

**¿Por qué no basta con decir "usemos la energía inyectada" y por qué es obligatorio aplicar el descuento del porcentaje de pérdidas (*Pal*) en tu fórmula?**

*Si estuviéramos en diciembre de 2026, sí **podríamos simplemente ver el medidor de lo que se inyectó a la red y listo.** Pero estamos publicando una meta hacia el futuro. Nuestra fórmula se alimenta de las **proyecciones** del Plan de Desarrollo del Sector Eléctrico (PLADESE). El PLADESE nos dice cuánta energía limpia total van a producir las plantas, pero **no nos da el dato exacto de cuánta de esa energía se va a perder en el camino por el uso de baterías**."*

**La física de las baterías: La energía que "desaparece"**

Cuando la planta solar proyectada en el PLADESE genera 100 MWh de energía neta, esa es la "Oferta Limpia". Sin embargo, si por instrucciones del CENACE esos 100 MWh se guardan en una batería para usarse en la noche, la batería **solo va a devolver 85 MWh** a la red (asumiendo el 15% de pérdida por ineficiencia térmica y conversión).

Esos 15 MWh de diferencia **se perdieron físicamente en forma de calor**.

**La trampa matemática si no restamos el porcentaje (*Pal*)**

Si en nuestra metodología tomamos los datos de generación del PLADESE (los 100 MWh) y **no** le restamos el porcentaje de pérdida de las baterías (*Pal*), nuestro cálculo va a asumir que esos 100 MWh van a llegar a la red y van a generar 100 CELs.

- **El problema:** Estaríamos fijando un Porcentaje de Requisito (*R*%) artificialmente alto basado en 100 CELs.
- **La realidad:** En la operación real, el medidor solo registrará 85 MWh inyectados y la Comisión Nacional de Energía (CNE) solo entregará 85 CELs.
- **El resultado desastroso:** Obligaríamos a los suministradores a comprar 100 CELs cuando en el país solo existirán 85 CELs. Generaríamos una escasez artificial, los precios se dispararían y habría multas masivas.

**4. El candado legal (Artículo 195 del RLSE)**

Para rematar, la ley nos obliga a ser precisos. El **Artículo 195 del Reglamento de la Ley del Sector Eléctrico** dicta que los Sistemas de Almacenamiento *"no pueden recibir Certificados de Energía Limpia... toda vez que la acreditación se origina por la generación y consumo de energía eléctrica y no por su almacenamiento"*.

Por lo tanto, la "energía fantasma" que se pierde dentro de la batería jamás llegará al consumo y está legalmente impedida de generar un CEL.

<aside>
💡

*"El CEL solo se otorga por la energía final inyectada a la red. Justamente por eso, como nuestra fórmula usa datos de **proyección a futuro** (el PLADESE), tenemos que descontarle artificialmente el % de energía que sabemos que las baterías se van a 'comer' en forma de calor. Si no restamos esas pérdidas (Pal) en el papel hoy, mañana le estaremos exigiendo a los obligados que compren CELs sobre una energía que se evaporó en las baterías y que la Comisión Nacional de Energía (CNE) jamás va a emitir."*

</aside>

```sql
El cálculo de las Pérdidas por Almacenamiento (Pal) utilizando el Plan de Desarrollo del Sector Eléctrico (PLADESE) se realiza cruzando la capacidad proyectada de baterías con sus parámetros técnicos de operación indicados en el plan.
A continuación, se detalla el procedimiento paso a paso utilizando como ejemplo el año 2026:
1. Capacidad de Baterías proyectada Se toma la capacidad instalada neta proyectada para la tecnología de Baterías (sistemas de almacenamiento) en el año de interés. De acuerdo con los datos prospectivos del PLADESE (pestaña Capacidad-Neta de tu base de datos), para el año 2026 se estima una capacidad de 166 MW.
2. Duración del Almacenamiento Se multiplica la capacidad por las horas de diseño de las baterías. El documento oficial del PLADESE establece textualmente que, para los ejercicios prospectivos de 2025-2039, los sistemas de almacenamiento con baterías incorporados se consideran de cuatro horas de almacenamiento.
Cálculo de energía diaria: 166 MW × 4 horas = 664 MWh por día.
3. Cálculo de la Energía Ciclada Anualmente Para obtener el volumen anual, se asume operativamente un ciclo de carga y descarga diario (los 365 días del año) para determinar el total de energía limpia que transita por estos sistemas.
Cálculo anual: 664 MWh/día × 365 días = 242,360 MWh al año (equivalente a 242.36 GWh).
4. Aplicación del Porcentaje de Pérdida Técnica (Pal) Finalmente, se multiplica la energía total anual que pasa por las baterías por el porcentaje de ineficiencia técnica (la energía que se disipa como calor durante el proceso de carga y conversión).
Nota importante: La cifra exacta del 15% de pérdida técnica no proviene de las fuentes proporcionadas y es posible que desees verificarla de manera independiente. Como mencionamos anteriormente, al no existir un parámetro explícito en el PLADESE para la ineficiencia, se recurre al estándar técnico internacional de "eficiencia de ciclo redondo" para baterías de iones de litio a gran escala, el cual asume una pérdida del 15%.
Cálculo final: 242.36 GWh × 0.15 = 36.35 GWh.
¿Por qué exige la metodología restar este resultado? El propio análisis metodológico señala que es fundamental no contabilizar la capacidad de las baterías como generación limpia adicional. Esto se debe a que el Artículo 195 del Reglamento de la Ley del Sector Eléctrico prohíbe que los Sistemas de Almacenamiento reciban CELs, puesto que estos dispositivos únicamente desplazan la energía en el tiempo, pero no generan energía nueva. Restar estos 36.35 GWh (P 
al) asegura que el requisito no se infle cobrando certificados sobre energía que se perdió en la ineficiencia del ciclo.
```

# Factor de Justicia Energética en la Fómula

---

El **Factor de Justicia Energética (***Fje***)** y su relación directa con los CEL, → El impacto financiero de los certificados con los nuevos mandatos constitucionales y legales de protección a las tarifas.

 uso de este factor no es una invención arbitraria,

<aside>
💡

El Artículo 3, fracción XXVIII de la LSE, define la Justicia Energética como las acciones para reducir la pobreza energética mediante el acceso a energía **"asequible"** (es decir, pagable para la población).

</aside>

<aside>
💡

**El vínculo con las tarifas:** El Artículo 118 del Reglamento de la LSE mandata que el diseño de las Tarifas Eléctricas debe considerar explícitamente la **Justicia Energética**

</aside>

<aside>
💡

El Artículo 2 de la Ley del Sector Eléctrico (LSE) declara que el Suministro Básico es una actividad estratégica que debe "proveer al pueblo de los Estados Unidos Mexicanos de electricidad al **menor precio posible**". Esto se refuerza en el Artículo 4, fracción V, que exige lograr esto "evitando Lucro en el Suministro Básico"

</aside>

 **La relación directa entre los CEL y las Tarifas** 

- Los CEL no son solo un "papel", son un costo regulatorio. Si la fórmula matemática pura nos arroja un Requisito del 33%, significa que la Suministradora de Servicios Básicos (CFE) estará obligada a salir al mercado a comprar millones de certificados de golpe.
- Ese sobrecosto multimillonario por comprar CELs se transfiere irremediablemente a los "Ingresos Recuperables" de la Suministradora y, por lo tanto, **presiona al alza las Tarifas Finales del Suministro Básico**.
- **Conclusión:** Un requerimiento de CEL desproporcionado encarece el recibo de luz de las familias, violando el principio legal de proveer energía "asequible" y al "menor precio posible".

*"Para evitar ese impacto inflacionario, introducimos el Factor de Justicia Energética en la fórmula (ej. 0.80). Este factor funciona como un **amortiguador tarifario**. Lo que hace es 'topar' matemáticamente la meta exigible para que la Suministradora solo esté obligada a comprar la cantidad de CELs que el sistema tarifario puede absorber sin subirle el precio de la luz a los usuarios."*

<aside>
💡

**La relación directa entre los CEL y las Tarifas** 

*La relación es simple: **a mayor requisito de CEL, mayor costo para CFE Suministro Básico, y mayor riesgo de que suba la tarifa de luz**. La nueva Ley nos exige en sus Artículos 2 y 3 garantizar la **Justicia Energética**, que significa dar luz asequible y al menor precio posible.*

*Si publicamos el requisito bruto del 33%, CFE tendría que gastar miles de millones comprando certificados, lo cual impactaría la tarifa y violaría la Ley. Al aplicar el **Factor de Justicia Energética** en nuestra metodología, justificamos legalmente bajar el requisito a un 22%. Con esto, logramos tres cosas: cumplimos con la meta de transición energética de forma gradual, reducimos la carga financiera para CFE y, lo más importante, protegemos las tarifas del usuario final cumpliendo el mandato de Justicia Energética."*

</aside>

¿Cómo impacta el Factor de Justicia Energética en el costo de los CEL?

El **Factor de Justicia Energética (***Fje***)** impacta el costo de los Certificados de Energías Limpias (CEL) mediante un efecto de "doble beneficio" en el mercado: **reduce el volumen total de certificados que se deben comprar y, como consecuencia, desploma su precio unitario.**

Este impacto se fundamenta tanto en nuestra propuesta metodológica como en los mandatos de la nueva Ley del Sector Eléctrico (LSE) 2025. Aquí te explico exactamente cómo opera este impacto en los costos:

**1. Reducción directa del volumen de compra (Menos demanda)**

Al aplicar el *Fje* (ej. 0.80) al cálculo técnico, reducimos artificialmente la meta exigible (bajándola en nuestro ejemplo del 28.36% al 22.69%). Esto significa que las Suministradoras, principalmente CFE Suministro Básico, tendrán que adquirir millones de CELs menos al año para cumplir con la ley. Al tener una obligación menor, el costo total de cumplimiento regulatorio disminuye automáticamente.

**2. Desplome del precio unitario del CEL (Efecto Oferta vs. Demanda)**

El mercado de CELs opera bajo la ley de oferta y demanda, donde el precio se convierte en un indicador clave. Al utilizar el *Fje*, alteramos intencionalmente este balance a favor del comprador:

- **Oferta Masiva:** La nueva LSE 2025 establece que el otorgamiento de CELs ya no depende de la fecha de inicio de operación comercial ni de la propiedad. Esto inunda el mercado de certificados provenientes de todas las centrales limpias, incluyendo las grandes hidroeléctricas y la nuclear del Estado.
- **Demanda Contenida:** Al mismo tiempo, el *Fje* "topa" o contiene la demanda oficial exigida a los Suministradores.
- **El Impacto:** Una oferta masiva frente a una demanda reducida por el *Fje* genera un superávit de certificados en el mercado. En cualquier mercado, la sobreoferta provoca que el **precio unitario del CEL caiga drásticamente**.

**3. Contención de las Tarifas Eléctricas (El impacto en el usuario final)**

El impacto final y más importante del *Fje* es la protección al bolsillo del consumidor, lo cual es la esencia del concepto legal.

La LSE define la **Justicia Energética** como las acciones encaminadas a reducir la pobreza energética y las desigualdades, garantizando el acceso a energía **asequible** (pagable) para la atención de necesidades básicas. Si no aplicáramos el *Fje*, el alto costo de comprar millones de CELs caros (por un requerimiento abrupto del 33%) sería transferido directamente al usuario final a través de un aumento en las Tarifas Reguladas del Suministro Básico.

**En resumen para tu justificación:** El **Factor de Justicia Energética** funciona como un amortiguador financiero. Al aplicarlo, el Estado evita generar una escasez artificial de certificados, abarata el costo unitario del CEL en el mercado secundario y reduce el volumen de compra obligatorio. Esto asegura que el cumplimiento de las metas de energías limpias no se traduzca en inflación eléctrica, cumpliendo el mandato de proveer energía asequible y combatir la pobreza energética.