import styles from "../page.module.scss";
import { CalibrationTorqueListDTO } from "@/infrastructure/calibration-torque/calibration-torque.list.dto";

type Props = {
  data: CalibrationTorqueListDTO[];
};

export default function HistoryTable({ data }: Props) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Técnico</th>
            <th>Workstation</th>
            <th>Atornillador</th>
            <th>Torque</th>
            {/* <th>Resultado</th> */}
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>
                {new Date(row.createdAt).toLocaleString("es-CO", {
                  timeZone: "America/Bogota",
                })}
              </td>

              <td>{row.technician.username}</td>

              <td>{row.workstation.code}</td>

              <td>
                {row.screwdriver.serialNumber} ({row.screwdriver.model})
              </td>

              <td>
                {row.appliedTorque} / {row.expectedTorque}
                <div style={{ fontSize: 12, opacity: 0.7 }}>
                  Δ {row.diff.toFixed(3)} ({row.diffPercentage.toFixed(1)}%)
                </div>
              </td>

              {/* <td>
                <span
                  className={
                    row.isCorrect ? styles.badgeOk : styles.badgeNok
                  }
                >
                  {row.isCorrect ? "OK" : "NOK"}
                </span>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// import styles from "../page.module.scss";

// type Props = {
//   data: any[];
// };

// export default function HistoryTable({ data }: Props) {
//   return (
//     <div className={styles.tableContainer}>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>Fecha</th>
//             <th>Técnico</th>
//             <th>Workstation</th>
//             <th>Atornillador</th>
//             <th>Torque</th>
//             <th>Resultado</th>
//           </tr>
//         </thead>

//         <tbody>
//           {data.map((row) => (
//             <tr key={row.id}>
//               <td>
//                 {new Date(row.createdAt).toLocaleString("es-CO", {
//                   timeZone: "America/Bogota",
//                 })}
//               </td>

//               <td>{row.technician}</td>
//               <td>{row.workstationId}</td>

//               <td>{row.screwdriverId?.serialNumber}</td>

//               <td>
//                 {row.appliedTorque} / {row.expectedTorque}
//               </td>

//               <td>
//                 <span
//                   className={
//                     row.isCorrect ? styles.badgeOk : styles.badgeNok
//                   }
//                 >
//                   {row.isCorrect ? "OK" : "NOK"}
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// // type Props = {
// //   data: any[];
// // };

// // export default function HistoryTable({ data }: Props) {
// //   return (
// //     <table style={{ width: "100%", borderCollapse: "collapse" }}>
// //       <thead>
// //         <tr>
// //           <th>Fecha</th>
// //           <th>Técnico</th>
// //           <th>Workstation</th>
// //           <th>Atornillador</th>
// //           <th>Torque</th>
// //           <th>Resultado</th>
// //         </tr>
// //       </thead>

// //       <tbody>
// //         {data.map((row) => (
// //           <tr key={row.id}>
// //             <td>
// //               {new Date(row.createdAt).toLocaleString("es-CO", {
// //                 timeZone: "America/Bogota",
// //               })}
// //             </td>

// //             <td>{row.technician}</td>
// //             <td>{row.workstationId}</td>

// //             <td>{row.screwdriverId?.serialNumber}</td>

// //             <td>
// //               {row.appliedTorque} / {row.expectedTorque}
// //             </td>

// //             <td>
// //               {row.isCorrect ? "✅ OK" : "❌ NOK"}
// //             </td>
// //           </tr>
// //         ))}
// //       </tbody>
// //     </table>
// //   );
// // }