import Link from "next/link";
import styles from "./page.module.scss";

const modules = [
  { name: "Usuarios", path: "/admin/users" },
  { name: "Workstations", path: "/admin/workstations" },
  { name: "Atornilladores", path: "/admin/screwdrivers" },
  { name: "Modelos", path: "/admin/terminal-models" },
  { name: "Torques", path: "/admin/torque-specs" },
];

export default function AdminPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Panel de Administración</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "1rem"
      }}>
        {modules.map((mod) => (
          <Link key={mod.path} href={mod.path} style={{ textDecoration: "none" }}>
            <div className={styles.card} style={{ cursor: "pointer" }}>
              <h3 style={{ marginBottom: "0.5rem" }}>{mod.name}</h3>
              <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                Gestionar {mod.name.toLowerCase()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// import Link from "next/link";

// export default function AdminPage() {
//   return (
//     <div style={{ padding: "2rem" }}>
//       <h1>Administración</h1>

//       <ul>
//         <li><Link href="/admin/users">Usuarios</Link></li>
//         <li><Link href="/admin/workstations">Workstations</Link></li>
//         <li><Link href="/admin/screwdrivers">Atornilladores</Link></li>
//         <li><Link href="/admin/models">Modelos</Link></li>
//         <li><Link href="/admin/torques">Torques</Link></li>
//       </ul>
//     </div>
//   );
// }

// // import Link from "next/link";

// // export default function AdminPage() {
// //   return (
// //     <div style={{ padding: "2rem" }}>
// //       <h1>Administración</h1>

// //       <ul>
// //         <li><Link href="/admin/users">Usuarios</Link></li>
// //         <li><Link href="/admin/workstations">Workstations</Link></li>
// //         <li><Link href="/admin/screwdrivers">Atornilladores</Link></li>
// //         <li><Link href="/admin/models">Modelos</Link></li>
// //         <li><Link href="/admin/torques">Torques</Link></li>
// //       </ul>
// //     </div>
// //   );
// // }