// page.tsx
"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";

import { useUser } from "@/providers/UserProvider";
import { useWorkstation } from "@/providers/WorkstationProvider";

import ScrewdriverStep from "./components/ScrewdriverStep";
import ModelStep from "./components/ModelStep";
import TorqueStep from "./components/TorqueStep";
import MeasurementStep from "./components/MeasurementStep";

const TorqueClient = () => {
  const { user } = useUser();
  const { workstation } = useWorkstation();

  const [screwdrivers, setScrewdrivers] = useState<any[]>([]);
  const [models, setModels] = useState<any[]>([]);
  const [torques, setTorques] = useState<any[]>([]);

  const [screwdriverSelected, setScrewdriverSelected] = useState<any>();
  const [modelSelected, setModelSelected] = useState<any>();
  const [torqueSelected, setTorqueSelected] = useState<any | null>(null);
  const [availableTorque, setAvailableTorque] = useState<any[]>([]);

  const [appliedTorque, setAppliedTorque] = useState<number>();
  const [resultado, setResultado] = useState<boolean | null>(null);

  const [mostrarEscanerPaso5, setMostrarEscanerPaso5] = useState(false);
  const [imagenPaso5, setImagenPaso5] = useState(null);
  const [observaciones, setObservaciones] = useState("");

  if (!user || !workstation) return null;

  // ================= LOAD =================
  useEffect(() => {
    fetch("/api/v1/screwdrivers").then(r => r.json()).then(d => setScrewdrivers(d.data));
    fetch("/api/v1/terminal-models").then(r => r.json()).then(d => setModels(d.data));
    fetch("/api/v1/torque-specs").then(r => r.json()).then(d => setTorques(d.data));
  }, []);

  const screwdriversInWorkstation = screwdrivers.filter(
    (s) => s.workstationId._id === workstation.id
  );

  // ================= LOGIC =================
  const handleSelectModelo = (e: any) => {
    const modelo = models.find((m) => m.id === e.target.value);
    setModelSelected(modelo);
    setTorqueSelected(null);
    setAppliedTorque(0);
    setResultado(null);

    if (modelo) {
      setAvailableTorque(
        torques.filter((t) => t.modelId === modelo.id)
      );
    }
  };

  const handleSelectTorque = (t: any) => {
    setTorqueSelected(t);
    setAppliedTorque(t.torque);
    setResultado(null);
  };

  const evaluar = () => {
    if (!torqueSelected) return;
    const diff = Math.abs((appliedTorque || 0) - torqueSelected.torque);
    setResultado(diff <= torqueSelected.tolerance);
  };

  // const guardar = async () => {
  //   if (!torqueSelected) return;

  //   await fetch("/api/v1/calibration/torque", {
  //     method: "POST",
  //     headers: {"Content-Type": "application/json"},
  //     body: JSON.stringify({
  //       technician: user.username,
  //       workstationId: workstation.id,
  //       screwdriverId: screwdriverSelected?.id,
  //       modelId: modelSelected?.id,
  //       torqueSpecId: torqueSelected.id,
  //       expectedTorque: torqueSelected.torque,
  //       appliedTorque,
  //       tolerance: torqueSelected.tolerance,
  //       isCorrect: resultado,
  //       observations: observaciones,
  //     }),
  //   });

  //   alert("Calibración guardada");
  // };
  // console.log(user)

  const guardar = async () => {
  if (!torqueSelected || !appliedTorque) return;

  await fetch("/api/v1/calibration/torque", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      technicianId: user.userId, // 🔥 CAMBIO

      workstationId: workstation.id,
      screwdriverId: screwdriverSelected?.id,
      modelId: modelSelected?.id,
      torqueSpecId: torqueSelected.id,

      expectedTorque: torqueSelected.torque,
      appliedTorque,
      tolerance: torqueSelected.tolerance,

      captureMethod: "manual", // 🔥 o "scanner" si viene del lector

      observations: observaciones,
    }),
  });

  alert("Calibración guardada");
};

  const limpiar = () => {
    setResultado(null);
    setAppliedTorque(undefined);
    setTorqueSelected(null);
  };

  // ================= UI =================
  return (
    <div className={styles.container}>
      <div className={styles.app}>
        <h1 className={styles.title}>Calibración del torque</h1>

        <ScrewdriverStep
          screwdrivers={screwdriversInWorkstation}
          selected={screwdriverSelected}
          onSelect={setScrewdriverSelected}
        />

        {screwdriverSelected && (
          <ModelStep
            models={models}
            selected={modelSelected}
            onChange={handleSelectModelo}
          />
        )}

        {availableTorque.length > 0 && (
          <TorqueStep
            torques={availableTorque}
            selected={torqueSelected}
            onSelect={handleSelectTorque}
          />
        )}

        {torqueSelected && (
          <MeasurementStep
            appliedTorque={appliedTorque}
            setAppliedTorque={setAppliedTorque}
            resultado={resultado}
            evaluar={evaluar}
            guardar={guardar}
            limpiar={limpiar}
            mostrarEscaner={mostrarEscanerPaso5}
            setMostrarEscaner={setMostrarEscanerPaso5}
          />
        )}
      </div>
    </div>
  );
};

export default TorqueClient;

// "use client";

// import { useEffect, useState } from "react";
// import styles from "./page.module.scss";

// import { ScrewdriverListDTO } from "@/infrastructure/screwdriver/screwdriver.list.dto";
// import { TerminalModelListDTO } from "@/infrastructure/terminal-model/terminal-model.list.dto";
// import { Torque } from "@/types/calibracion";

// import { useUser } from "@/providers/UserProvider";
// import { useWorkstation } from "@/providers/WorkstationProvider";
// import clsx from "clsx";
// import { EscanerSieteSegmentos } from "./components/sevenSegments";

// const TorqueClient = () => {
//   const { user } = useUser();
//   const { workstation } = useWorkstation();

//   const [screwdriverSelected, setScrewdriverSelected] = useState<ScrewdriverListDTO>();
//   const [modelSelected, setModelSelected] = useState<TerminalModelListDTO>();
//   const [torqueSelected, setTorqueSelected] = useState<any | null>(null);
//   const [resultado, setResultado] = useState<boolean | null>(null);
//   const [torques, setTorques] = useState<any[]>([]);
//   const [availableTorque, setAvailableTorque] = useState<Torque[]>([]);
//   const [appliedTorque, setAppliedTorque] = useState<number>();
//   const [models, setModels] = useState<TerminalModelListDTO[]>([]);
//   const [mostrarEscanerPaso5, setMostrarEscanerPaso5] = useState(false);
//   const [imagenPaso5, setImagenPaso5] = useState(null);
//   const [mensajeGlobal, setMensajeGlobal] = useState("");
//   const [observaciones, setObservaciones] = useState("");

//   // 🔒 evitar render antes de tener contexto
//   if (!user || !workstation) return null;

//   const guardar = async () => {
//     if (!torqueSelected) return;

//     const data = {
//       technician: user.username,
//       workstationId: workstation.id,
//       screwdriverId: screwdriverSelected?.id,
//       modelId: modelSelected?.id,
//       torqueSpecId: torqueSelected.id,
//       expectedTorque: torqueSelected.torque,
//       appliedTorque: appliedTorque,
//       tolerance: torqueSelected.tolerance,
//       isCorrect: resultado,
//       observations: "N/A",
//     };

//     await fetch("/api/v1/calibration/torque", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     alert("Calibración guardada");
//   };

//   const limpiar = () => {
//     setResultado(null);
//     setAppliedTorque(undefined);
//     setTorqueSelected(null);
//   };

//   const [screwdrivers, setScrewdrivers] = useState<any[]>([]);

//   const loadScrewdrivers = async () => {
//     const res = await fetch("/api/v1/screwdrivers");
//     const data = await res.json();
//     setScrewdrivers(data.data);
//   };

//   useEffect(() => {
//     loadScrewdrivers();
//   }, []);

//   const screwdriversInWorkstation = workstation.id
//     ? screwdrivers.filter((s) => s.workstationId._id === workstation.id)
//     : [];

//   const handleSelectModelo = (e: any) => {
//     const id = e.target.value;
//     const modelo = models.find((m) => m.id === id);
//     setModelSelected(modelo);
//     setTorqueSelected(null);
//     setAppliedTorque(0);
//     setResultado(null);
//     if (modelo) {
//       const disponibles = torques.filter(
//         (t) => t.modelId === modelo.id,
//       );
//       setAvailableTorque(disponibles);
//     }
//   };

//   const loadModels = async () => {
//     const res = await fetch("/api/v1/terminal-models");
//     const data = await res.json();
//     setModels(data.data);
//   };

//   useEffect(() => {
//     loadModels();
//   }, []);

//   const cargarTorques = async () => {
//     const res = await fetch("/api/v1/torque-specs");
//     const data = await res.json();
//     setTorques(data.data);
//   };

//   useEffect(() => {
//     cargarTorques();
//   }, []);

//   const handleSelectTorque = (torqueItem: any) => {
//     setTorqueSelected(torqueItem);
//     setAppliedTorque(torqueItem.torque);
//     setResultado(null);
//   };

//   const evaluar = () => {
//     if (!torqueSelected) return;

//     const aplicado = parseFloat(appliedTorque?.toString() || "0");
//     const diff = Math.abs(aplicado - torqueSelected.torque);
//     setResultado(diff <= torqueSelected.tolerance);
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.app}>
//         <h1 className={styles.title}>Calibración del torque</h1>

//         {workstation.id && (
//           <div className={styles["step-card"]}>
//             <h2>🔧 PASO 1: SELECCIONAR ATORNILLADOR Y VALIDAR CON CÁMARA</h2>

//             <select
//               className={styles.select}
//               onChange={(e) => {
//                 const selected = screwdriversInWorkstation.find(
//                   (s) => s.id.toString() === e.target.value,
//                 );
//                 setScrewdriverSelected(selected);
//               }}
//               value={screwdriverSelected?.id?.toString() || ""}
//             >
//               <option value="">Seleccionar</option>

//               {screwdriversInWorkstation.map((s) => (
//                 <option key={s.id} value={s.id}>
//                   {s.serialNumber} - {s.model}
//                 </option>
//               ))}
//             </select>

//             {screwdriverSelected && (
//               <>
//                 <div className={styles["info-card"]}>
//                   {screwdriverSelected.lastCalibration ? (
//                     <>
//                       <div className={styles["info-row"]}>
//                         <span className={styles["info-label"]}>Fecha:</span>{" "}
//                         {new Date(
//                           screwdriverSelected.lastCalibration,
//                         ).toLocaleString()}
//                       </div>
//                       <div
//                         style={{ color: "black" }}
//                         className={styles["info-row"]}
//                       >
//                         <span className={styles["info-label"]}>
//                           Torque aplicado:
//                         </span>{" "}
//                         {screwdriverSelected.currentTorque.toString()} N·m
//                       </div>
//                     </>
//                   ) : (
//                     <div>No hay calibraciones previas (primera vez)</div>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>
//         )}

//         {screwdriverSelected && (
//           <>
//             <h2>🔧 PASO 2: SELECCIONAR MODELO</h2>
//             <div className={styles["step-card"]}>
//               <select
//                 onChange={handleSelectModelo}
//                 value={modelSelected?.id.toString() || ""}
//               >
//                 <option value="">-- Modelo --</option>
//                 {models.map((m) => (
//                   <option key={m.id.toString()} value={m.id.toString()}>
//                     {m.code} ({m.technology})
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </>
//         )}

//         {availableTorque.length > 0 && (
//           <div className={styles["step-card"]}>
//             <h2>🔧 PASO 3: SELECCIONAR TORQUE</h2>

//             <div className={styles["torque-grid"]}>
//               {/* {availableTorque.map((t:any) => ( */}
//               {availableTorque.map((t: any) => (
//                 <button
//                   key={t.id}
//                   className={`${styles["torque-btn"]} ${
//                     torqueSelected?.id === t.id ? styles["selected"] : ""
//                   }`}
//                   onClick={() => handleSelectTorque(t)}
//                 >
//                   {/* {t.torque} N·m */}
//                   <div>{t.torque.toFixed(3)} N·m</div>
//                   <div className={styles["small"]}>{t.use}</div>
//                   <div className={styles["small"]}>±{t.tolerance}</div>
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {torqueSelected && (
//           <div className={styles["step-card"]}>
//             <h2>🔧 PASO 4: INGRESAR TORQUE APLICADO Y EVALUAR</h2>
//             <div
//               style={{
//                 display: "flex",
//                 gap: "20px",
//                 alignItems: "center",
//                 flexWrap: "wrap",
//               }}
//             >
//               <div>
//                 <label>Torque aplicado (N·m):</label>
//                 <div style={{ display: "flex", gap: "8px", marginTop: "5px" }}>
//                   <input
//                     style={{ width: "200px" }}
//                     type="number"
//                     step="0.001"
//                     value={appliedTorque?.toString() || ""}
//                     onChange={(e) => setAppliedTorque(parseFloat(e.target.value) || 0)}
//                   />

//                   <button
//                     type="button"
//                     className="btn-small"
//                     onClick={() => setMostrarEscanerPaso5(true)}
//                     style={{
//                       background: "#004a8f",
//                       color: "white",
//                       border: "none",
//                       borderRadius: "8px",
//                       padding: "0 15px",
//                     }}
//                   >
//                     📷 Leer display
//                   </button>
//                 </div>
//               </div>

//               <button
//                 className={clsx(styles["btn"], styles["btn-primary"])}
//                 onClick={evaluar}
//               >
//                 🔍 EVALUAR
//               </button>
//             </div>

//             {mostrarEscanerPaso5 && (
//               <EscanerSieteSegmentos
//                 onClose={() => setMostrarEscanerPaso5(false)}
//                 onCapture={(valor, valido, imagen: any) => {
//                   setAppliedTorque(parseFloat(valor));
//                   if (imagen) setImagenPaso5(imagen);
//                   setMostrarEscanerPaso5(false);
//                   setTimeout(evaluar, 100);
//                 }}
//                 valorReferencia={null}
//               />
//             )}

//             {resultado !== null && (
//               <div className={styles.resultBox}>
//                 <div className={resultado ? styles.resultOk : styles.resultNok}>
//                   {resultado ? "Dentro de tolerancia" : "Fuera de tolerancia"}
//                 </div>
//               </div>
//             )}

//             {resultado && (
//               <div className={styles.resultBox}>
//                 <div className={`result-status ${resultado ? "ok" : "nok"}`}>
//                   {resultado
//                     ? "✅ DENTRO DE TOLERANCIA"
//                     : "❌ FUERA DE TOLERANCIA"}
//                 </div>
//                 <div className="result-diff">
//                 </div>
//               </div>
//             )}

//             {mensajeGlobal && (
//               <div
//                 className={
//                   mensajeGlobal.includes("✅")
//                     ? "mensaje-exito"
//                     : "mensaje-error"
//                 }
//               >
//                 {mensajeGlobal}
//               </div>
//             )}

//             <div style={{ marginTop: "20px" }}>
//               <label>Observaciones:</label>
//               <textarea
//                 rows={2}
//                 value={observaciones}
//                 onChange={(e) => setObservaciones(e.target.value)}
//                 style={{
//                   width: "100%",
//                   padding: "12px",
//                   borderRadius: "12px",
//                   border: "2px solid #c2d9f0",
//                 }}
//               />
//             </div>

//             <div className={styles["btn-group"]}>
//               <button
//                 className={clsx(styles["btn"], styles["btn-primary"])}
//                 onClick={guardar}
//                 disabled={!resultado}
//               >
//                 💾 Guardar
//               </button>

//               <button
//                 className={clsx(styles["btn"], styles["btn-warning"])}
//                 onClick={limpiar}
//               >
//                 🧹 Limpiar
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TorqueClient;
