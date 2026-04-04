"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";

import HistoryFilters from "./components/HistoryFilters";
import HistoryTable from "./components/HistoryTable";

import { CalibrationTorqueListDTO } from "@/infrastructure/calibration-torque/calibration-torque.list.dto";

export default function HistoryPage() {
  const [data, setData] = useState<CalibrationTorqueListDTO[]>([]);
  const [filtered, setFiltered] = useState<CalibrationTorqueListDTO[]>([]);

  const [filters, setFilters] = useState({
    search: "",
    month: "",
    year: "",
  });

  const load = async () => {
    try {
      const res = await fetch("/api/v1/calibration/torque");
      const json = await res.json();

      setData(json.data);
      setFiltered(json.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    let result = [...data];

    // 🔍 filtro por serial
    if (filters.search) {
      result = result.filter((r) =>
        r.screwdriver.serialNumber
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      );
    }

    // 📅 año
    if (filters.year) {
      result = result.filter(
        (r) =>
          new Date(r.createdAt).getFullYear().toString() === filters.year
      );
    }

    // 📅 mes
    if (filters.month) {
      result = result.filter(
        (r) =>
          (new Date(r.createdAt).getMonth() + 1).toString() === filters.month
      );
    }

    setFiltered(result);
  }, [filters, data]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>📜 Historial de calibraciones</h1>

        <HistoryFilters filters={filters} setFilters={setFilters} />

        <HistoryTable data={filtered} />
      </div>
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import styles from "./page.module.scss";

// import HistoryFilters from "./components/HistoryFilters";
// import HistoryTable from "./components/HistoryTable";

// export default function HistoryPage() {
//   const [data, setData] = useState<any[]>([]);
//   const [filtered, setFiltered] = useState<any[]>([]);

//   const [filters, setFilters] = useState({
//     search: "",
//     month: "",
//     year: "",
//   });

//   const load = async () => {
//     try {
//       const res = await fetch("/api/v1/calibration/torque");
//       const json = await res.json();
//       setData(json.data);
//       setFiltered(json.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   useEffect(() => {
//     let result = [...data];

//     if (filters.search) {
//       result = result.filter((r) =>
//         r.screwdriverId?.serialNumber
//           ?.toLowerCase()
//           .includes(filters.search.toLowerCase())
//       );
//     }

//     if (filters.year) {
//       result = result.filter(
//         (r) =>
//           new Date(r.createdAt).getFullYear().toString() === filters.year
//       );
//     }

//     if (filters.month) {
//       result = result.filter(
//         (r) =>
//           (new Date(r.createdAt).getMonth() + 1).toString() === filters.month
//       );
//     }

//     setFiltered(result);
//   }, [filters, data]);

//   return (
//     <div className={styles.container}>
//       <div className={styles.card}>
//         <h1 className={styles.title}>📜 Historial de calibraciones</h1>

//         <HistoryFilters filters={filters} setFilters={setFilters} />

//         <HistoryTable data={filtered} />
//       </div>
//     </div>
//   );
// }

// // "use client";

// // import { useEffect, useState } from "react";
// // import HistoryFilters from "./components/HistoryFilters";
// // import HistoryTable from "./components/HistoryTable";
// // // import HistoryTable from "./components/HistoryTable";
// // // import HistoryFilters from "./components/HistoryFilters";

// // export default function HistoryPage() {
// //   const [data, setData] = useState<any[]>([]);
// //   const [filtered, setFiltered] = useState<any[]>([]);

// //   const [filters, setFilters] = useState({
// //     search: "",
// //     month: "",
// //     year: "",
// //   });

// //   const load = async () => {
// //     try {
// //       const res = await fetch("/api/v1/calibration/torque");
// //       const json = await res.json();
// //       setData(json.data);
// //       setFiltered(json.data);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   useEffect(() => {
// //     load();
// //   }, []);

// //   useEffect(() => {
// //     let result = [...data];

// //     // filtro búsqueda
// //     if (filters.search) {
// //       result = result.filter((r) =>
// //         r.screwdriverId?.serialNumber
// //           ?.toLowerCase()
// //           .includes(filters.search.toLowerCase())
// //       );
// //     }

// //     // filtro año
// //     if (filters.year) {
// //       result = result.filter(
// //         (r) => new Date(r.createdAt).getFullYear().toString() === filters.year
// //       );
// //     }

// //     // filtro mes
// //     if (filters.month) {
// //       result = result.filter(
// //         (r) =>
// //           (new Date(r.createdAt).getMonth() + 1).toString() === filters.month
// //       );
// //     }

// //     setFiltered(result);
// //   }, [filters, data]);

// //   return (
// //     <div style={{ padding: 20 }}>
// //       <h1>Historial de calibraciones</h1>

// //       <HistoryFilters filters={filters} setFilters={setFilters} />

// //       <HistoryTable data={filtered} />
// //     </div>
// //   );
// // }