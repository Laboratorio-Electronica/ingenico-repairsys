import styles from "../page.module.scss";

type Filters = {
  search: string;
  month: string;
  year: string;
};

type Props = {
  filters: Filters;
  setFilters: (f: Filters) => void;
};

export default function HistoryFilters({ filters, setFilters }: Props) {
  return (
    <div className={styles.filters}>
      <input
        className={styles.input}
        placeholder="Buscar serial..."
        value={filters.search}
        onChange={(e) =>
          setFilters({ ...filters, search: e.target.value })
        }
      />

      <select
        className={styles.select}
        value={filters.month}
        onChange={(e) =>
          setFilters({ ...filters, month: e.target.value })
        }
      >
        <option value="">Mes</option>
        {[...Array(12)].map((_, i) => (
          <option key={i} value={(i + 1).toString()}>
            {i + 1}
          </option>
        ))}
      </select>

      <select
        className={styles.select}
        value={filters.year}
        onChange={(e) =>
          setFilters({ ...filters, year: e.target.value })
        }
      >
        <option value="">Año</option>
        {[2024, 2025, 2026].map((y) => (
          <option key={y} value={y.toString()}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
}

// import styles from "../page.module.scss";

// type Props = {
//   filters: any;
//   setFilters: (f: any) => void;
// };

// export default function HistoryFilters({ filters, setFilters }: Props) {
//   return (
//     <div className={styles.filters}>
//       <input
//         className={styles.input}
//         placeholder="Buscar serial..."
//         value={filters.search}
//         onChange={(e) =>
//           setFilters({ ...filters, search: e.target.value })
//         }
//       />

//       <select
//         className={styles.select}
//         value={filters.month}
//         onChange={(e) =>
//           setFilters({ ...filters, month: e.target.value })
//         }
//       >
//         <option value="">Mes</option>
//         {[...Array(12)].map((_, i) => (
//           <option key={i} value={(i + 1).toString()}>
//             {i + 1}
//           </option>
//         ))}
//       </select>

//       <select
//         className={styles.select}
//         value={filters.year}
//         onChange={(e) =>
//           setFilters({ ...filters, year: e.target.value })
//         }
//       >
//         <option value="">Año</option>
//         {[2024, 2025, 2026].map((y) => (
//           <option key={y} value={y.toString()}>
//             {y}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

// // type Props = {
// //   filters: any;
// //   setFilters: (f: any) => void;
// // };

// // export default function HistoryFilters({ filters, setFilters }: Props) {
// //   return (
// //     <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
// //       <input
// //         placeholder="Buscar serial..."
// //         value={filters.search}
// //         onChange={(e) =>
// //           setFilters({ ...filters, search: e.target.value })
// //         }
// //       />

// //       <select
// //         value={filters.month}
// //         onChange={(e) =>
// //           setFilters({ ...filters, month: e.target.value })
// //         }
// //       >
// //         <option value="">Mes</option>
// //         {[...Array(12)].map((_, i) => (
// //           <option key={i} value={i + 1}>
// //             {i + 1}
// //           </option>
// //         ))}
// //       </select>

// //       <select
// //         value={filters.year}
// //         onChange={(e) =>
// //           setFilters({ ...filters, year: e.target.value })
// //         }
// //       >
// //         <option value="">Año</option>
// //         {[2024, 2025, 2026].map((y) => (
// //           <option key={y}>{y}</option>
// //         ))}
// //       </select>
// //     </div>
// //   );
// // }