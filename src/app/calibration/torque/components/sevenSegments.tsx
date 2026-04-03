import { decodeSevenSegmentAdvanced } from "@/lib/vision/sevenSegmentDecoder"
import { useEffect, useRef, useState } from "react"
import styles from '../page.module.scss'
import clsx from "clsx"

type EscanerProps = {
  onClose: () => void
  onCapture: (valor: string, valido: boolean, imagen: string | null) => void
  valorReferencia?: number | string | null
  mensajeReferencia?: string
  toleranciaPorcentual?: number
}

type Estado = "listo" | "procesando" | "manual" | "error"

export function EscanerSieteSegmentos({
  onClose,
  onCapture,
  valorReferencia,
  mensajeReferencia,
  toleranciaPorcentual = 3
}: EscanerProps) {

  const videoRef = useRef<HTMLVideoElement | null>(null)

  const [estado, setEstado] = useState<Estado>("listo")
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [mensaje, setMensaje] = useState<string>("")
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [valorManual, setValorManual] = useState<string>("")

  useEffect(() => {
    iniciarCamara()
    return () => detenerCamara()
  }, [])

  const iniciarCamara = async (): Promise<void> => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false
      })

      setStream(mediaStream)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }

    } catch {
      setMensaje("❌ No se pudo acceder a la cámara")
      setEstado("error")
    }
  }

  const detenerCamara = (): void => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
  }

  const capturarYDecodificar = async (): Promise<void> => {

    if (!videoRef.current) return

    setEstado("procesando")
    setMensaje("")

    const video = videoRef.current

    const canvas = document.createElement("canvas")
    canvas.width = 1280
    canvas.height = 720

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    const imageDataUrl = canvas.toDataURL("image/jpeg", 0.8)
    setCapturedImage(imageDataUrl)

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    // escala de grises
    for (let i = 0; i < data.length; i += 4) {
      const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
      data[i] = gray
      data[i + 1] = gray
      data[i + 2] = gray
    }

    const ancho = canvas.width
    const alto = canvas.height

    // binarización OTSU
    const histogram = new Array<number>(256).fill(0)

    for (let i = 0; i < data.length; i += 4) {
      histogram[Math.round(data[i])]++
    }

    const total = data.length / 4

    let sum = 0
    for (let t = 0; t < 256; t++) {
      sum += t * histogram[t]
    }

    let sumB = 0
    let wB = 0
    let maxVariance = 0
    let threshold = 128

    for (let t = 0; t < 256; t++) {

      wB += histogram[t]
      if (wB === 0) continue

      const wF = total - wB
      if (wF === 0) break

      sumB += t * histogram[t]

      const mB = sumB / wB
      const mF = (sum - sumB) / wF

      const variance = wB * wF * (mB - mF) * (mB - mF)

      if (variance > maxVariance) {
        maxVariance = variance
        threshold = t
      }
    }

    for (let i = 0; i < data.length; i += 4) {
      const val = data[i] > threshold ? 255 : 0
      data[i] = val
      data[i + 1] = val
      data[i + 2] = val
    }

    const anchoDigito = ancho * 0.6
    const altoDigito = alto * 0.4
    const x = (ancho - anchoDigito) / 2
    const y = (alto - altoDigito) / 2

    const digitosEncontrados: number[] = []

    const anchoDigitoIndividual = anchoDigito / 4

    for (let d = 0; d < 4; d++) {

      const digX = x + d * anchoDigitoIndividual

      const digito = decodeSevenSegmentAdvanced(
        imageData,
        digX,
        y,
        anchoDigitoIndividual,
        altoDigito
      )

      if (digito === null) {
        setMensaje("❌ No se pudieron leer todos los dígitos. Ingresa manualmente.")
        setEstado("manual")
        return
      }

      digitosEncontrados.push(digito)
    }

    let numero = digitosEncontrados.join("")

    if (numero.length >= 2) {
      numero = numero[0] + "." + numero.slice(1)
    } else {
      setMensaje("❌ Formato de número no reconocido")
      setEstado("manual")
      return
    }

    let valido = true
    let validacionMensaje = ""

    if (valorReferencia !== null && valorReferencia !== undefined) {

      const nuevo = parseFloat(numero)
      const ref = parseFloat(String(valorReferencia))

      if (!isNaN(nuevo) && !isNaN(ref) && ref !== 0) {

        const diff = Math.abs(nuevo - ref)
        const porcentaje = (diff / ref) * 100

        if (porcentaje > toleranciaPorcentual) {
          valido = false
          validacionMensaje = `⚠️ Variación del ${porcentaje.toFixed(1)}%`
        } else {
          validacionMensaje = `✅ Variación del ${porcentaje.toFixed(1)}%`
        }

      } else {
        validacionMensaje = "✅ Primera calibración"
      }

    } else {
      validacionMensaje = "✅ Lectura realizada"
    }

    setMensaje(validacionMensaje)

    if (valido) {
      setEstado("listo")
      onCapture(numero, true, imageDataUrl)
      setTimeout(onClose, 1500)
    } else {
      setEstado("manual")
    }
  }

  const handleManualSubmit = (): void => {

    const val = parseFloat(valorManual)

    if (isNaN(val)) {
      setMensaje("❌ Valor inválido")
      return
    }

    onCapture(valorManual, true, capturedImage)
    setTimeout(onClose, 1500)
  }

  return (
    <div className={styles["modal"]}>
      <div className={styles["modal-content"]}>

        <h3 style={{ color: "#004a8f", marginBottom: "20px" }}>
          📷 Escanear display
        </h3>

        {estado !== "manual" ? (
          <>
            <video ref={videoRef} autoPlay playsInline />

            {mensajeReferencia && (
              <div style={{ marginTop: 10, fontSize: 14, textAlign: "center" }}>
                {mensajeReferencia}
              </div>
            )}

            {mensaje && (
              <div className={mensaje.includes("✅") ? styles["mensaje-exito"] : styles["mensaje-error"]}>
                {mensaje}
              </div>
            )}

            <div style={{ display: "flex", gap: 15, justifyContent: "center", marginTop: 20 }}>
              <button
                className={clsx(styles["btn"], styles["btn-primary"])}
                onClick={capturarYDecodificar}
                disabled={estado === "procesando"}
              >
                {estado === "procesando" ? "Procesando..." : "📸 Capturar y validar"}
              </button>

              <button className={clsx(styles["btn"], styles["btn-warning"])} onClick={() => setEstado("manual")}>
                ✏️ Ingresar manual
              </button>

              <button className={clsx(styles["btn"], styles["btn-secondary"])} onClick={onClose}>
                ❌ Cancelar
              </button>
            </div>
          </>
        ) : (
          <>
            <p>No se pudo leer automáticamente. Ingresa el valor:</p>

            {capturedImage && (
              <img
                src={capturedImage}
                alt="Captura"
                style={{ width: "100%", maxHeight: 200, objectFit: "contain" }}
              />
            )}

            <input
              type="number"
              step="0.001"
              value={valorManual}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValorManual(e.target.value)
              }
            />

            <button className={clsx(styles["btn"], styles["btn-primary"])} onClick={handleManualSubmit}>
              ✅ Aceptar
            </button>
          </>
        )}

      </div>
    </div>
  )
}

// import { useEffect, useRef, useState } from "react";

// // ========== DECODIFICADOR DE 7 SEGMENTOS ==========
// export function decodeSevenSegmentAdvanced(imageData, x, y, ancho, alto) {
//   const segmentos = {
//     a: { x1: 0.2, y1: 0.1, x2: 0.8, y2: 0.2 },
//     b: { x1: 0.8, y1: 0.2, x2: 0.9, y2: 0.5 },
//     c: { x1: 0.8, y1: 0.5, x2: 0.9, y2: 0.8 },
//     d: { x1: 0.2, y1: 0.8, x2: 0.8, y2: 0.9 },
//     e: { x1: 0.1, y1: 0.5, x2: 0.2, y2: 0.8 },
//     f: { x1: 0.1, y1: 0.2, x2: 0.2, y2: 0.5 },
//     g: { x1: 0.2, y1: 0.45, x2: 0.8, y2: 0.55 },
//   };

//   let estado = {};
//   for (let seg in segmentos) {
//     const s = segmentos[seg];
//     const sx = Math.floor(x + ancho * s.x1);
//     const sy = Math.floor(y + alto * s.y1);
//     const sw = Math.max(1, Math.floor(ancho * (s.x2 - s.x1)));
//     const sh = Math.max(1, Math.floor(alto * (s.y2 - s.y1)));

//     let suma = 0,
//       count = 0;
//     for (let py = sy; py < sy + sh; py++) {
//       for (let px = sx; px < sx + sw; px++) {
//         const idx = (py * imageData.width + px) * 4;
//         if (idx >= 0 && idx < imageData.data.length) {
//           suma += imageData.data[idx];
//           count++;
//         }
//       }
//     }
//     const brillo = count > 0 ? suma / count : 255;
//     estado[seg] = brillo < 128;
//   }

//   const digitos = {
//     "a,b,c,d,e,f": 0,
//     "b,c": 1,
//     "a,b,d,e,g": 2,
//     "a,b,c,d,g": 3,
//     "b,c,f,g": 4,
//     "a,c,d,f,g": 5,
//     "a,c,d,e,f,g": 6,
//     "a,b,c": 7,
//     "a,b,c,d,e,f,g": 8,
//     "a,b,c,d,f,g": 9,
//   };

//   let activos = [];
//   for (let seg in estado) if (estado[seg]) activos.push(seg);
//   activos.sort();
//   const clave = activos.join(",");

//   return digitos[clave] !== undefined ? digitos[clave] : null;
// }

// // ========== COMPONENTE ESCÁNER ==========
// export function EscanerSieteSegmentos({
//   onClose,
//   onCapture,
//   valorReferencia,
//   mensajeReferencia,
//   toleranciaPorcentual = 3,
// }) {
//   const videoRef = useRef(null);
//   const [estado, setEstado] = useState("listo");
//   const [stream, setStream] = useState(null);
//   const [mensaje, setMensaje] = useState("");
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [valorManual, setValorManual] = useState("");

//   useEffect(() => {
//     iniciarCamara();
//     return () => detenerCamara();
//   }, []);

//   const iniciarCamara = async () => {
//     try {
//       const mediaStream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: "environment" },
//         audio: false,
//       });
//       setStream(mediaStream);
//       if (videoRef.current) videoRef.current.srcObject = mediaStream;
//     } catch (error) {
//       setMensaje("❌ No se pudo acceder a la cámara");
//       setEstado("error");
//     }
//   };

//   const detenerCamara = () => {
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop());
//       setStream(null);
//     }
//   };

//   const capturarYDecodificar = async () => {
//     if (!videoRef.current) return;
//     setEstado("procesando");
//     setMensaje("");

//     const video = videoRef.current;
//     const canvas = document.createElement("canvas");
//     canvas.width = 1280;
//     canvas.height = 720;
//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//     const imageDataUrl = canvas.toDataURL("image/jpeg", 0.8);
//     setCapturedImage(imageDataUrl);

//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     const data = imageData.data;
//     for (let i = 0; i < data.length; i += 4) {
//       const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
//       data[i] = gray;
//       data[i + 1] = gray;
//       data[i + 2] = gray;
//     }

//     // Ecualización adaptativa (simplificada)
//     const ancho = canvas.width,
//       alto = canvas.height;
//     const tiles = 4;
//     const tileW = Math.floor(ancho / tiles);
//     const tileH = Math.floor(alto / tiles);
//     const clipLimit = 40;
//     for (let ti = 0; ti < tiles; ti++) {
//       for (let tj = 0; tj < tiles; tj++) {
//         const startX = ti * tileW;
//         const startY = tj * tileH;
//         const endX = ti === tiles - 1 ? ancho : startX + tileW;
//         const endY = tj === tiles - 1 ? alto : startY + tileH;

//         let hist = new Array(256).fill(0);
//         for (let y = startY; y < endY; y++) {
//           for (let x = startX; x < endX; x++) {
//             const idx = (y * ancho + x) * 4;
//             hist[Math.round(data[idx])]++;
//           }
//         }
//         let excess = 0;
//         for (let i = 0; i < 256; i++) {
//           if (hist[i] > clipLimit) {
//             excess += hist[i] - clipLimit;
//             hist[i] = clipLimit;
//           }
//         }
//         const addEach = Math.floor(excess / 256);
//         for (let i = 0; i < 256; i++) hist[i] += addEach;

//         let cdf = [];
//         let sum = 0;
//         for (let i = 0; i < 256; i++) {
//           sum += hist[i];
//           cdf[i] = sum;
//         }
//         const minCdf = cdf.find((v) => v > 0);
//         for (let i = 0; i < 256; i++) {
//           cdf[i] = Math.round(((cdf[i] - minCdf) * 255) / (sum - minCdf));
//         }

//         for (let y = startY; y < endY; y++) {
//           for (let x = startX; x < endX; x++) {
//             const idx = (y * ancho + x) * 4;
//             const val = Math.round(data[idx]);
//             data[idx] = cdf[val];
//             data[idx + 1] = cdf[val];
//             data[idx + 2] = cdf[val];
//           }
//         }
//       }
//     }

//     // Binarización OTSU
//     let histogram = new Array(256).fill(0);
//     for (let i = 0; i < data.length; i += 4)
//       histogram[Math.round(data[i])] += 1;
//     let total = data.length / 4;
//     let sum = 0;
//     for (let t = 0; t < 256; t++) sum += t * histogram[t];
//     let sumB = 0,
//       wB = 0,
//       maxVariance = 0,
//       threshold = 128;
//     for (let t = 0; t < 256; t++) {
//       wB += histogram[t];
//       if (wB === 0) continue;
//       let wF = total - wB;
//       if (wF === 0) break;
//       sumB += t * histogram[t];
//       let mB = sumB / wB;
//       let mF = (sum - sumB) / wF;
//       let variance = wB * wF * (mB - mF) * (mB - mF);
//       if (variance > maxVariance) {
//         maxVariance = variance;
//         threshold = t;
//       }
//     }
//     for (let i = 0; i < data.length; i += 4) {
//       const val = data[i] > threshold ? 255 : 0;
//       data[i] = val;
//       data[i + 1] = val;
//       data[i + 2] = val;
//     }

//     // Detección de posición del display (asumimos centro)
//     const anchoDigito = ancho * 0.6;
//     const altoDigito = alto * 0.4;
//     const x = (ancho - anchoDigito) / 2;
//     const y = (alto - altoDigito) / 2;

//     let digitosEncontrados = [];
//     const anchoDigitoIndividual = anchoDigito / 4;
//     for (let d = 0; d < 4; d++) {
//       const digX = x + d * anchoDigitoIndividual;
//       const digito = decodeSevenSegmentAdvanced(
//         imageData,
//         digX,
//         y,
//         anchoDigitoIndividual,
//         altoDigito,
//       );
//       if (digito === null) {
//         setMensaje(
//           "❌ No se pudieron leer todos los dígitos. Ingresa manualmente.",
//         );
//         setEstado("manual");
//         return;
//       }
//       digitosEncontrados.push(digito);
//     }

//     let numero = digitosEncontrados.join("");
//     if (numero.length >= 2) {
//       numero = numero[0] + "." + numero.slice(1);
//     } else {
//       setMensaje("❌ Formato de número no reconocido");
//       setEstado("manual");
//       return;
//     }

//     // Validación contra referencia
//     let validacionMensaje = "";
//     let valido = true;
//     if (valorReferencia !== null && valorReferencia !== undefined) {
//       const nuevo = parseFloat(numero);
//       const ref = parseFloat(valorReferencia);
//       if (!isNaN(nuevo) && !isNaN(ref) && ref !== 0) {
//         const diff = Math.abs(nuevo - ref);
//         const porcentaje = (diff / ref) * 100;
//         if (porcentaje > toleranciaPorcentual) {
//           valido = false;
//           validacionMensaje = `⚠️ Variación del ${porcentaje.toFixed(1)}% (máx ${toleranciaPorcentual}%)`;
//         } else {
//           validacionMensaje = `✅ Variación del ${porcentaje.toFixed(1)}% (dentro del ${toleranciaPorcentual}%)`;
//         }
//       } else {
//         validacionMensaje = "✅ Primera calibración, válida";
//       }
//     } else {
//       validacionMensaje = "✅ Lectura realizada";
//     }

//     setMensaje(validacionMensaje);
//     if (valido) {
//       setEstado("listo");
//       onCapture(numero, true, imageDataUrl);
//       setTimeout(onClose, 1500);
//     } else {
//       setEstado("manual");
//     }
//   };

//   const handleManualSubmit = () => {
//     const val = parseFloat(valorManual);
//     if (isNaN(val)) {
//       setMensaje("❌ Valor inválido");
//       return;
//     }
//     let valido = true;
//     let validacionMensaje = "";
//     if (valorReferencia !== null && valorReferencia !== undefined) {
//       const ref = parseFloat(valorReferencia);
//       if (!isNaN(ref) && ref !== 0) {
//         const diff = Math.abs(val - ref);
//         const porcentaje = (diff / ref) * 100;
//         if (porcentaje > toleranciaPorcentual) {
//           valido = false;
//           validacionMensaje = `⚠️ Variación del ${porcentaje.toFixed(1)}% (máx ${toleranciaPorcentual}%)`;
//         } else {
//           validacionMensaje = `✅ Variación del ${porcentaje.toFixed(1)}% (dentro del ${toleranciaPorcentual}%)`;
//         }
//       }
//     } else {
//       validacionMensaje = "✅ Lectura manual aceptada";
//     }
//     setMensaje(validacionMensaje);
//     if (valido) {
//       onCapture(valorManual, true, capturedImage);
//       setTimeout(onClose, 1500);
//     }
//   };

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <h3 style={{ color: "#004a8f", marginBottom: "20px" }}>
//           📷 Escanear display
//         </h3>
//         {estado !== "manual" ? (
//           <>
//             <video ref={videoRef} autoPlay playsInline />
//             {mensajeReferencia && (
//               <div
//                 style={{
//                   marginTop: "10px",
//                   fontSize: "14px",
//                   color: "#666",
//                   textAlign: "center",
//                 }}
//               >
//                 {mensajeReferencia}
//               </div>
//             )}
//             {mensaje && (
//               <div
//                 className={
//                   mensaje.includes("✅") ? "mensaje-exito" : "mensaje-error"
//                 }
//               >
//                 {mensaje}
//               </div>
//             )}
//             <div
//               style={{
//                 display: "flex",
//                 gap: "15px",
//                 justifyContent: "center",
//                 marginTop: "20px",
//               }}
//             >
//               <button
//                 className="btn btn-primary"
//                 onClick={capturarYDecodificar}
//                 disabled={estado === "procesando"}
//               >
//                 {estado === "procesando"
//                   ? "Procesando..."
//                   : "📸 Capturar y validar"}
//               </button>
//               <button
//                 className="btn btn-warning"
//                 onClick={() => setEstado("manual")}
//               >
//                 ✏️ Ingresar manual
//               </button>
//               <button className="btn btn-secondary" onClick={onClose}>
//                 ❌ Cancelar
//               </button>
//             </div>
//           </>
//         ) : (
//           <div>
//             <p style={{ marginBottom: "15px" }}>
//               No se pudo leer automáticamente. Ingresa el valor manualmente:
//             </p>
//             {capturedImage && (
//               <img
//                 src={capturedImage}
//                 alt="Captura"
//                 style={{
//                   width: "100%",
//                   maxHeight: "200px",
//                   objectFit: "contain",
//                   marginBottom: "15px",
//                   borderRadius: "8px",
//                 }}
//               />
//             )}
//             <input
//               type="number"
//               step="0.001"
//               placeholder="Ej: 0.150"
//               value={valorManual}
//               onChange={(e) => setValorManual(e.target.value)}
//               style={{ width: "100%", marginBottom: "15px" }}
//             />
//             {mensaje && (
//               <div
//                 className={
//                   mensaje.includes("✅") ? "mensaje-exito" : "mensaje-error"
//                 }
//               >
//                 {mensaje}
//               </div>
//             )}
//             <div
//               style={{ display: "flex", gap: "15px", justifyContent: "center" }}
//             >
//               <button className="btn btn-primary" onClick={handleManualSubmit}>
//                 ✅ Aceptar
//               </button>
//               <button className="btn btn-secondary" onClick={onClose}>
//                 ❌ Cancelar
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
