# FICHAS TÉCNICAS Y MÓDULOS DE OFERTA DE INGENIERÍA (FASE 3)
## Empresa: SERVIDOR SATELITAL (Titular: Jorge Alberto Sarapura)
### Enfoque: Portafolio de Soluciones Robustas B2B para Condiciones Climáticas Extremas

---

## 1. FICHA TÉCNICA CLASE MUNDIAL: KIT STARLINK MINI MÓVIL OPTIMIZADO B2B

El **Kit Starlink Mini Móvil** es rediseñado y homologado internamente por el equipo de ingeniería de **Servidor Satelital** para satisfacer las demandas rigurosas de la industria minera, la exploración petrolera, la logística de camiones de gran porte y el transporte de pasajeros (turismo de aventura 4x4) en zonas de nula cobertura móvil tradicional en el NOA.

### 1.1 Diagrama Físico de Instalación e Integración Energética (Conceptual ID)
```
          [Constelación Satelital Starlink LEO]
                      \ | /  (Señal de Alta Fidelidad - Fase Activa)
                       \|/
                 +---------------+
                 |  Antena Mini  | <--- Montaje Magnético Neodimio N52 (130 kgf)
                 +---------------+
                         |
                         | Cable Exterior Doble Apantallado Cat6 SF/UTP UV (IP67)
                         v
  +----------------------------------------------+
  | Módulo Inversor/Regulador DC-DC Servidor S.  | <--- Estabilización Activa (Entrada: 12-24V -> Salida: 30V Reg.)
  +----------------------------------------------+
            |                             |
            |                             | Ficha Reforzada Encendedor
            v                             v
  [Router Wi-Fi 6 Integrado]    [Alimentación DC Nativa de Batería (Camión/4x4)]
  (Red Inalámbrica Interna)
```

### 1.2 Especificaciones de Hardware y Dimensiones de Ingeniería

| Parámetro Técnico | Especificación de Fábrica | Optimización Especial de Servidor Satelital |
| :--- | :--- | :--- |
| **Tecnología de Antena** | Arreglo plano orientado electrónicamente (Active Phased Array). | Recubrimiento hidrófugo adicional contra congelamiento de alta montaña. |
| **Voltaje de Suministro** | 100-240V AC mediante transformador común de consumo doméstico. | **Conversión DC-DC Nativa Directa (12V/24V a 30V Estabilizados)** para encendedores de camiones y camionetas. |
| **Margen de Tolerancia Eléctrica**| No tolerado por fallas del convertidor de fábrica. | Bobina de filtrado contra picos de arranque del alternador del vehículo hasta 35V. |
| **Soporte y Fijación** | Trípode plástico plegable simple para uso estático en tierra. | **Base Magnética Industrial con Cuatro (4) Imanes de Neodimio N52** recubiertos de caucho anti-rayas, soporta vientos de hasta 140 km/h y vibración de grado todoterreno severo. |
| **Clasificación de Estanqueidad**| IP67 estándar. | Refuerzo de sellado epoxi en conector RJ45 exterior para impedir la entrada de polvo salino (Litio). |
| **Consumo Eléctrico Promedio** | 25W - 40W promedio. | Reducción de disipación térmica mediante bypass directo de AC, reduciendo pérdidas del transformador en un **35%**. |
| **Rango Operativo Térmico** | -30°C a 50°C. | Probado y certificado operacionalmente en la alta cordillera (pases fronterizos y yacimientos de litio). |

### 1.3 Ventajas Operativas y Comercialización
1.  **Instalación Instantánea Sin Dañar el Vehículo**: El sistema magnético autoadherente permite posicionar y retirar la antena de la chapa de cualquier camioneta o cabina de camión en tan solo 45 segundos, eliminando la necesidad de tornillos o remaches que comprometen la carrocería o la garantía del fabricante automotriz.
2.  **Operabilidad 100% en Movimiento**: El firmware del equipo ha sido optimizado con la licencia de tráfico Itinerante / Global bajo supervisión certificada, habilitando ancho de banda constante superior a los **150 Mbps de descarga** incluso viajando a velocidades de autopista o en travesías sinuosas de montaña.
3.  **Eficiencia de Batería Excepcional**: Al operar directo de la red eléctrica DC (continua) del vehículo, evita la necesidad de instalar convertidores AC ineficientes de 12V-220V que sobrecalientan las cabinas y causan descargas rápidas en las paradas del motor.

---

## 2. FICHA TÉCNICA AVANZADA: SISTEMA DE GEOLOCALIZACIÓN Y GPS HÍBRIDO

El **GPS Híbrido** de **Servidor Satelital** es la solución definitiva para el control preventivo y de seguridad física de activos de transporte pesado, maquinaria vial y flotas mineras que alternan operaciones entre carreteras nacionales de buena conectividad celular y ramales secundarios/yacimientos en absoluto silencio radioeléctrico.

### 2.1 La Arquitectura Lógica del Failover Automático de Red

```
          [Dispositivo Tracker GPS Híbrido con Firmware de Conmutación de Turno]
                               /                   \
                              /                     \
       (Enlace Primario: Señal 4G/LTE)        (Enlace de Respaldo: Red Satelital)
                            /                         \
                           v                           v
              [Estación de Telefonía Móvil]    [Red Inalámbrica Local Starlink Mini]
                           |                           |
                           \                           /
                            v                         v
                       [Servidor de Control Central de Trazabilidad]
                      (Visualización en Centro de Monitoreo - API Telemetría)
```

### 2.2 Especificaciones de Funcionamiento e Interconexión

*   **Firmware Multi-Ruta Activo (Conmutación por Heartbeat)**: El dispositivo GPS realiza un testeo constante de latido IP (*heartbeat*) cada 10 segundos contra nuestro servidor de enrutamiento dedicado. Si detecta una pérdida de paquetes mayor al 70% en el canal telefónico móvil (4G), conmuta automáticamente su pila de red para enviar sus reportes cifrados NMEA a través del gateway de red Wi-Fi inalámbrico autopropagado por el Kit Starlink Mini Móvil instalado en el propio vehículo de la flota o la camioneta de cuadrilla.
*   **Batería Interna de Respaldo Autoportante**: Celda de Polímero de Litio integrada de **1200 mAh** con circuito inteligente de carga. Permite que, incluso ante un corte total de energía del camión o sabotaje deliberado de las baterías primarias, el dispositivo continúe transmitiendo coordenadas GPS precisas durante un lapso de 48 horas adicionales.
*   **Encapsulado Grado Militar**: Gabinete de policarbonato con certificación **IK08 contra impactos** y clasificación de estanqueidad **IP69K** (soporta lavados a alta presión y temperatura, e impide la entrada de polvo fino suspendido).
*   **Giroscopio y Acelerómetro de Seis (6) Ejes**: Integrado internamente para control sutil de estilo de conducción: frenadas bruscas, aceleraciones excesivas, giros peligrosos y desvíos no autorizados.

### 2.3 Ventajas Operativas Clave para Minería y Logística
*   **Monitoreo Transparente e Ininterrumpido**: El despachador logístico observa en su sistema de mapas satelitales el avance del camión sin saltos abruptos en la traza, incluso en los tramos más cerrados de la Cordillera de los Andes o en el altiplano andino.
*   **Seguridad para el Chofer y la Carga**: Botón de pánico físico integrado e inastillable que funciona de manera redundante sin importar las condiciones del terreno, enviando alertas prioritarias en vivo directo al centro de respuesta rápida.
*   **Reducción de Costos Operativos por Tráfico de Datos**: El firmware está programado para priorizar siempre el canal celular tradicional que resulta significativamente más económico, y solo conmuta al abono de datos satelital cuando no hay opciones gratuitas o celulares disponibles.

---

## 3. FICHA TÉCNICA AVANZADA: SISTEMA DE VIDEO TELEMÁTICA Y DASHCAMS IA UBITRACK PRO

El **Sistema de Video Telemática Activa y Dashcams IA Ubitrack Pro** combina visión artificial dual, sensores de inercia y transmisión de video de alta velocidad para transformar la seguridad operacional y la gestión de reclamos en flotas corporativas en el NOA.

### 3.1 Arquitectura del Flujo de Datos y Descarga Remota

```
  [Cámara Dual IA (Frontal + Cabina IR)]
                 |
  (Detección G-Sensor: Impactos / Frenadas / Alertas ADAS/DMS)
                 |
  [Conectividad Dual: Red 4G LTE + Enlace Wi-Fi Starlink Móvil 12V-24V]
                 |
                 v
  [Plataforma Ubitrack Pro / Centro de Monitoreo 24/7]
                 |
  +-------------------------------------------------------------+
  | MÓDULO MEDIA - ESTADOS DE DESCARGA REMOTA (Clips 1 min)     |
  | 🟨 AMARILLO: Solicitud enviada a la memoria de la cámara    |
  | 🟦 AZUL: Descarga en proceso vía red de datos               |
  | 🟩 VERDE: Video disponible para reproducción en HD          |
  +-------------------------------------------------------------+
```

### 3.2 Tabla de Especificaciones de Ingeniería

| Parámetro Técnico | Especificación de Fábrica | Optimización Especial Servidor Satelital |
| :--- | :--- | :--- |
| **Canales de Cámara** | Frontal carretera (Full HD) e Interna de cabina con visión nocturna IR. | Carcasa reforzada antivibración apta para caminos de ripio en la Puna y alta montaña. |
| **Memoria y Retención** | 72 a 96 horas de grabación continua en bucle local. | Memoria industrial con protección contra corrupción por corte repentino de energía. |
| **Transmisión en Vivo** | Módulo Live Stream (~1 min por solicitud). | Operable cuando la unidad está con Contacto ON o en circulación vía 4G o Wi-Fi satelital. |
| **Alertas IA (DMS/ADAS)** | Sensor de eventos en tiempo real. | Configuración de umbrales para fatiga, uso de celular, distracción, colisión frontal y frenadas. |
| **Alimentación Eléctrica** | 12V-24V DC Nativo. | Regulador DC-DC con supresor de picos de tensión del alternador hasta 35V. |

---
### [LISTO PARA CONFIRMACIÓN DE LA FASE 4: SECCIONES CORPORATIVAS, DATOS LEGALES Y LLAMADOS A LA ACCIÓN]
