"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";

declare global {
  interface Window {
    cv: any;
  }
}

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };
    startCamera();
  }, []);

  const segmentMap: Record<string, string> = {
    "1111110": "0",
    "0110000": "1",
    "1101101": "2",
    "1111001": "3",
    "0110011": "4",
    "1011011": "5",
    "1011111": "6",
    "1110000": "7",
    "1111111": "8",
    "1111011": "9",
  };

  const processFrame = () => {
    if (!videoRef.current || !canvasRef.current || !window.cv) return;

    const cv = window.cv;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 260;
    const height = 100;

    canvas.width = width;
    canvas.height = height;

    const sx = video.videoWidth / 2 - width / 2;
    const sy = video.videoHeight / 2 - height / 2;

    ctx.drawImage(video, sx, sy, width, height, 0, 0, width, height);

    let src = cv.imread(canvas);
    let gray = new cv.Mat();
    let blur = new cv.Mat();
    let thresh = new cv.Mat();

    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
    cv.GaussianBlur(gray, blur, new cv.Size(5, 5), 0);
    cv.adaptiveThreshold(
      blur,
      thresh,
      255,
      cv.ADAPTIVE_THRESH_GAUSSIAN_C,
      cv.THRESH_BINARY_INV,
      11,
      2
    );

    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();
    cv.findContours(
      thresh,
      contours,
      hierarchy,
      cv.RETR_EXTERNAL,
      cv.CHAIN_APPROX_SIMPLE
    );

    let digits: { x: number; value: string }[] = [];
    let decimals: number[] = [];

    for (let i = 0; i < contours.size(); i++) {
      let cnt = contours.get(i);
      let rect = cv.boundingRect(cnt);

      // Detectar dígitos grandes
      if (rect.height > 40 && rect.width > 15) {
        let digitROI = thresh.roi(rect);
        const segments = getSegments(digitROI, cv);
        const key = segments.join("");

        if (segmentMap[key]) {
          digits.push({ x: rect.x, value: segmentMap[key] });
        }

        digitROI.delete();
      }

      // Detectar punto decimal pequeño
      if (rect.height < 25 && rect.width < 25 && rect.y > height * 0.6) {
        decimals.push(rect.x);
      }

      cnt.delete();
    }

    // Ordenar dígitos de izquierda a derecha
    digits.sort((a, b) => a.x - b.x);

    let finalNumber = "";

    digits.forEach((digit, index) => {
      finalNumber += digit.value;

      // Verificar si hay punto cercano a la derecha
      const hasDecimal = decimals.some(
        (dx) => dx > digit.x && dx < digit.x + 50
      );

      if (hasDecimal) {
        finalNumber += ".";
      }
    });

    setResult(finalNumber);

    src.delete();
    gray.delete();
    blur.delete();
    thresh.delete();
    contours.delete();
    hierarchy.delete();
  };

  const getSegments = (digit: any, cv: any): number[] => {
    const w = digit.cols;
    const h = digit.rows;

    const segments = [
      new cv.Rect(w * 0.2, 0, w * 0.6, h * 0.15),
      new cv.Rect(w * 0.75, h * 0.15, w * 0.2, h * 0.35),
      new cv.Rect(w * 0.75, h * 0.55, w * 0.2, h * 0.35),
      new cv.Rect(w * 0.2, h * 0.85, w * 0.6, h * 0.15),
      new cv.Rect(0, h * 0.55, w * 0.2, h * 0.35),
      new cv.Rect(0, h * 0.15, w * 0.2, h * 0.35),
      new cv.Rect(w * 0.2, h * 0.45, w * 0.6, h * 0.15),
    ];

    let on: number[] = [];

    segments.forEach((seg) => {
      let roi = digit.roi(seg);
      let total = cv.countNonZero(roi);
      let area = seg.width * seg.height;
      on.push(total / area > 0.4 ? 1 : 0);
      roi.delete();
    });

    return on;
  };

  return (
    <div className={styles.container}>
      <div className={styles.cameraWrapper}>
        <video ref={videoRef} autoPlay playsInline />
        <div className={styles.overlay} />
      </div>

      <button onClick={processFrame}>Leer Display</button>

      <canvas ref={canvasRef} className={styles.canvas} />

      <h2>Resultado: {result || "—"}</h2>
    </div>
  );
}

// "use client";

// import { useEffect, useRef, useState } from "react";
// import styles from "./page.module.scss";

// declare global {
//   interface Window {
//     cv: any;
//   }
// }

// export default function Home() {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [result, setResult] = useState<string>("");

//   useEffect(() => {
//     const startCamera = async () => {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: "environment" },
//       });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
//     };
//     startCamera();
//   }, []);

//   const segmentMap: Record<string, string> = {
//     "1111110": "0",
//     "0110000": "1",
//     "1101101": "2",
//     "1111001": "3",
//     "0110011": "4",
//     "1011011": "5",
//     "1011111": "6",
//     "1110000": "7",
//     "1111111": "8",
//     "1111011": "9",
//   };

//   const processFrame = () => {
//     if (!videoRef.current || !canvasRef.current || !window.cv) return;

//     const cv = window.cv;
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const width = 260;
//     const height = 100;

//     canvas.width = width;
//     canvas.height = height;

//     const sx = video.videoWidth / 2 - width / 2;
//     const sy = video.videoHeight / 2 - height / 2;

//     ctx.drawImage(video, sx, sy, width, height, 0, 0, width, height);

//     let src = cv.imread(canvas);
//     let gray = new cv.Mat();
//     let blur = new cv.Mat();
//     let thresh = new cv.Mat();

//     cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
//     cv.GaussianBlur(gray, blur, new cv.Size(5, 5), 0);
//     cv.adaptiveThreshold(
//       blur,
//       thresh,
//       255,
//       cv.ADAPTIVE_THRESH_GAUSSIAN_C,
//       cv.THRESH_BINARY_INV,
//       11,
//       2
//     );

//     let contours = new cv.MatVector();
//     let hierarchy = new cv.Mat();

//     cv.findContours(
//       thresh,
//       contours,
//       hierarchy,
//       cv.RETR_EXTERNAL,
//       cv.CHAIN_APPROX_SIMPLE
//     );

//     let digits: string[] = [];

//     for (let i = 0; i < contours.size(); i++) {
//       let cnt = contours.get(i);
//       let rect = cv.boundingRect(cnt);

//       if (rect.height > 40 && rect.width > 15) {
//         let digitROI = thresh.roi(rect);

//         const segments = getSegments(digitROI, cv);
//         const key = segments.join("");

//         if (segmentMap[key]) {
//           digits.push(segmentMap[key]);
//         }

//         digitROI.delete();
//       }
//       cnt.delete();
//     }

//     setResult(digits.join(""));

//     src.delete();
//     gray.delete();
//     blur.delete();
//     thresh.delete();
//     contours.delete();
//     hierarchy.delete();
//   };

//   const getSegments = (digit: any, cv: any): number[] => {
//     const w = digit.cols;
//     const h = digit.rows;

//     const segments = [
//       new cv.Rect(w * 0.2, 0, w * 0.6, h * 0.15), // a
//       new cv.Rect(w * 0.75, h * 0.15, w * 0.2, h * 0.35), // b
//       new cv.Rect(w * 0.75, h * 0.55, w * 0.2, h * 0.35), // c
//       new cv.Rect(w * 0.2, h * 0.85, w * 0.6, h * 0.15), // d
//       new cv.Rect(0, h * 0.55, w * 0.2, h * 0.35), // e
//       new cv.Rect(0, h * 0.15, w * 0.2, h * 0.35), // f
//       new cv.Rect(w * 0.2, h * 0.45, w * 0.6, h * 0.15), // g
//     ];

//     let on: number[] = [];

//     segments.forEach((seg) => {
//       let roi = digit.roi(seg);
//       let total = cv.countNonZero(roi);
//       let area = seg.width * seg.height;

//       on.push(total / area > 0.4 ? 1 : 0);
//       roi.delete();
//     });

//     return on;
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.cameraWrapper}>
//         <video ref={videoRef} autoPlay playsInline />
//         <div className={styles.overlay} />
//       </div>

//       <button onClick={processFrame}>Leer Display</button>

//       <canvas ref={canvasRef} className={styles.canvas} />

//       <h2>Resultado: {result || "—"}</h2>
//     </div>
//   );
// }

// // "use client";

// // import { useEffect, useRef, useState } from "react";
// // import { createWorker, Worker } from "tesseract.js";
// // import styles from "./page.module.scss";

// // export default function Home() {
// //   const videoRef = useRef<HTMLVideoElement>(null);
// //   const canvasRef = useRef<HTMLCanvasElement>(null);
// //   const workerRef = useRef<Worker | null>(null);

// //   const [result, setResult] = useState<string>("");
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     const init = async () => {
// //       // Cámara
// //       const stream = await navigator.mediaDevices.getUserMedia({
// //         video: { facingMode: "environment" },
// //       });

// //       if (videoRef.current) {
// //         videoRef.current.srcObject = stream;
// //       }

// //       // OCR Worker
// //       const worker = await createWorker("eng");
// //       await worker.setParameters({
// //         tessedit_char_whitelist: "0123456789.-",
// //       });

// //       workerRef.current = worker;
// //     };

// //     init();

// //     return () => {
// //       workerRef.current?.terminate();
// //     };
// //   }, []);

// //   const captureAndProcess = async () => {
// //     if (!videoRef.current || !canvasRef.current || !workerRef.current) return;

// //     setLoading(true);

// //     const video = videoRef.current;
// //     const canvas = canvasRef.current;
// //     const ctx = canvas.getContext("2d");
// //     if (!ctx) return;

// //     const width = 300;
// //     const height = 120;

// //     // Escalamos x2 para mejorar OCR
// //     const scale = 2;

// //     canvas.width = width * scale;
// //     canvas.height = height * scale;

// //     const sx = video.videoWidth / 2 - width / 2;
// //     const sy = video.videoHeight / 2 - height / 2;

// //     ctx.drawImage(
// //       video,
// //       sx,
// //       sy,
// //       width,
// //       height,
// //       0,
// //       0,
// //       width * scale,
// //       height * scale
// //     );

// //     const imageData = ctx.getImageData(
// //       0,
// //       0,
// //       canvas.width,
// //       canvas.height
// //     );

// //     const data = imageData.data;

// //     // Convertir a gris + threshold
// //     for (let i = 0; i < data.length; i += 4) {
// //       const gray =
// //         0.299 * data[i] +
// //         0.587 * data[i + 1] +
// //         0.114 * data[i + 2];

// //       // threshold ajustable
// //       const value = gray > 110 ? 120 : 150;

// //       data[i] = value;
// //       data[i + 1] = value;
// //       data[i + 2] = value;
// //     }

// //     ctx.putImageData(imageData, 0, 0);

// //     const {
// //       data: { text },
// //     } = await workerRef.current.recognize(canvas);

// //     const cleaned = text.replace(/[^\d.-]/g, "").trim();

// //     setResult(cleaned);
// //     setLoading(false);
// //   };

// //   return (
// //     <div className={styles.container}>
// //       <div className={styles.cameraWrapper}>
// //         <video ref={videoRef} autoPlay playsInline />
// //         <div className={styles.overlay} />
// //       </div>

// //       <button onClick={captureAndProcess} disabled={loading}>
// //         {loading ? "Procesando..." : "Leer Display"}
// //       </button>

// //       <canvas ref={canvasRef} className={styles.canvas} />

// //       <h2>Resultado: {result || "—"}</h2>
// //     </div>
// //   );
// // }