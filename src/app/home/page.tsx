"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { ScrewdriverListDTO } from "@/infrastructure/screwdriver/screwdriver.list.dto";
import { useWorkstation } from "@/providers/WorkstationProvider";

export const Home = () => {
  const { workstation } = useWorkstation();

  const [tools, setTools] = useState<ScrewdriverListDTO[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH SOLO cuando hay workstation
  useEffect(() => {
    if (!workstation?.id) return;

    setLoading(true);
    setTools([]); // 🔥 limpia estado anterior

    fetch(`/api/v1/screwdrivers?workstationId=${workstation.id}`)
      .then((res) => res.json())
      .then((data) => setTools(data.data || []))
      .catch(() => setTools([]))
      .finally(() => setLoading(false));

  }, [workstation]);

  // 🔒 BLOQUEAR render hasta tener workstation
  if (!workstation) return null;

  return (
    <div className={styles.dashboard}>
      <main className={styles.main}>

        {/* KPIs */}
        <div className={styles.kpis}>
          <div className={styles.card}>
            <h3>Estado general</h3>
            <div className={styles.donut} />
          </div>

          <div className={styles.card}>
            <h3>Progreso del día</h3>
            <div className={styles.progress}>
              <div style={{ width: "75%" }} />
            </div>
            <span>6 / 8 calibraciones</span>
          </div>

          <div className={styles.card}>
            <h3>⚠ 1 herramienta fuera</h3>
            <p>Requiere recalibración</p>
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className={styles.loading}>
            Cargando herramientas...
          </div>
        )}

        {/* SIN DATOS */}
        {!loading && tools.length === 0 && (
          <div className={styles.empty}>
            No hay herramientas en esta estación
          </div>
        )}

        {/* LISTA */}
        {!loading && tools.length > 0 && (
          <div className={styles.tools}>
            {tools.map((tool) => (
              <span key={tool.id} className={styles.tool}>
                
                <div>
                  <strong>{tool.serialNumber}</strong>
                  <span>Modelo: {tool.model}</span>
                </div>

                <div className={styles.statusPending}>
                  Pendiente
                </div>

              </span>
            ))}
          </div>
        )}

      </main>
    </div>
  );
};

export default Home;

// "use client";

// import { useEffect, useState } from "react";
// import styles from "./page.module.scss";
// import { ScrewdriverListDTO } from "@/infrastructure/screwdriver/screwdriver.list.dto";
// import { useWorkstation } from "@/providers/WorkstationProvider";

// export const Home = () => {
//   const { workstation } = useWorkstation();

//   const [tools, setTools] = useState<ScrewdriverListDTO[]>([]);
//   const [loading, setLoading] = useState(true);

//   // 🔥 FETCH SOLO cuando hay workstation
//   useEffect(() => {
//     if (!workstation?.id) return;

//     setLoading(true);

//     fetch(`/api/v1/screwdrivers?workstationId=${workstation.id}`)
//       .then((res) => res.json())
//       .then((data) => setTools(data.data || []))
//       .catch(() => setTools([]))
//       .finally(() => setLoading(false));
//   }, [workstation]);

//   // 🔒 BLOQUEAR render hasta tener workstation
//   if (!workstation) {
//     return null; // el modal ya está activo en el provider
//   }

//   return (
//     <div className={styles.dashboard}>
//       <main className={styles.main}>

//         {/* KPIs */}
//         <div className={styles.kpis}>
//           <div className={styles.card}>
//             <h3>Estado general</h3>
//             <div className={styles.donut} />
//           </div>

//           <div className={styles.card}>
//             <h3>Progreso del día</h3>
//             <div className={styles.progress}>
//               <div style={{ width: "75%" }} />
//             </div>
//             <span>6 / 8 calibraciones</span>
//           </div>

//           <div className={styles.card}>
//             <h3>⚠ 1 herramienta fuera</h3>
//             <p>Requiere recalibración</p>
//           </div>
//         </div>

//         {/* LOADING */}
//         {loading ? (
//           <div className={styles.loading}>Cargando herramientas...</div>
//         ) : (
//           <div className={styles.tools}>
//             {tools.map((tool) => (
//               <span key={tool.id} className={styles.tool}>
//                 <div>
//                   <strong>{tool.serialNumber}</strong>
//                   <span>Modelo: {tool.model}</span>
//                 </div>

//                 <div className={styles.statusPending}>Pendiente</div>
//               </span>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Home;

// // "use client";

// // import { useEffect, useState } from "react";
// // import styles from "./page.module.scss";
// // import { ScrewdriverListDTO } from "@/infrastructure/screwdriver/screwdriver.list.dto";

// // export const Home = () => {
// //   const [tools, setTools] = useState<ScrewdriverListDTO[]>([]);

// //   function getWorkstationFromCookie() {
// //     const cookie = document.cookie
// //       .split('; ')
// //       .find(row => row.startsWith('workstation='));

// //     if (!cookie) return null;

// //     try {
// //       return JSON.parse(cookie.split('=')[1]).id;
// //     } catch {
// //       return null;
// //     }
// //   }

// //   useEffect(() => {
// //     fetch(`/api/v1/screwdrivers?workstationId=${getWorkstationFromCookie()}`)
// //       .then((res) => res.json())
// //       .then((data) => setTools(data.data));
// //   }, []);

// //   return (
// //     <div className={styles.dashboard}>
// //       {/* MAIN */}
// //       <main className={styles.main}>

// //         {/* KPIs */}
// //         <div className={styles.kpis}>
// //           <div className={styles.card}>
// //             <h3>Estado general</h3>
// //             <div className={styles.donut} />
// //           </div>

// //           <div className={styles.card}>
// //             <h3>Progreso del día</h3>
// //             <div className={styles.progress}>
// //               <div style={{ width: "75%" }} />
// //             </div>
// //             <span>6 / 8 calibraciones</span>
// //           </div>

// //           <div className={styles.card}>
// //             <h3>⚠ 1 herramienta fuera</h3>
// //             <p>Requiere recalibración</p>
// //           </div>
// //         </div>

// //         {/* LISTA */}
// //         <div className={styles.tools}>
// //           {tools.map((tool) => (
// //             <span key={tool.id} className={styles.tool}>
// //               <div>
// //                 <strong>{tool.serialNumber}</strong>
// //                 <span>Modelo: {tool.model}</span>
// //               </div>

// //               <div className={styles.statusPending}>Pendiente</div>
// //             </span>
// //           ))}
// //         </div>
// //       </main>
// //     </div>
// //   );
// // };

// // export default Home;
