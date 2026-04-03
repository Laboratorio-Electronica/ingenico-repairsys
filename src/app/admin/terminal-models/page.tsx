'use client'

import { useEffect, useState } from "react";
import styles from "../page.module.scss";
import { TerminalTechnology } from "@/shared/enums";

/* 🔥 ENUM REAL */
// export enum Technology {
//   AXIUM = "AXIUM",
//   TELIUM = "TELIUM",
//   MOVE = "MOVE",
// }

interface Model {
  id?: string;
  code: string;
  technology: TerminalTechnology;
}

const emptyForm: Model = {
  code: "",
  technology: TerminalTechnology.AXIUM,
};

export default function ModelsPage() {
  const [data, setData] = useState<Model[]>([]);
  const [form, setForm] = useState<Model>(emptyForm);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Model | null>(null);

  const technologyOptions = Object.values(TerminalTechnology);

  const fetchData = async () => {
    const res = await fetch("/api/v1/terminal-models");
    const json = await res.json();
    setData(Array.isArray(json) ? json : json.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const openEdit = (item: Model) => {
    setEditing(item);
    setForm(item);
    setOpen(true);
  };

  const handleSave = async () => {
    if (!form.code || !form.technology) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const method = form.id ? "PUT" : "POST";

    await fetch(`/api/v1/terminal-models${form.id ? `/${form.id}` : ""}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar modelo?")) return;

    await fetch(`/api/v1/terminal-models/${id}`, { method: "DELETE" });
    fetchData();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Modelos</h1>

      <div className={styles.card}>
        <button className={styles.buttonPrimary} onClick={openCreate}>
          + Crear Modelo
        </button>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Código</th>
              <th>Tecnología</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map(item => (
                <tr key={item.id}>
                  <td>{item.code}</td>
                  <td>{item.technology}</td>

                  <td style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      className={styles.buttonSecondary}
                      onClick={() => openEdit(item)}
                    >
                      Editar
                    </button>

                    <button
                      className={styles.buttonDanger}
                      onClick={() => handleDelete(item.id!)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr key="empty">
                <td colSpan={3} style={{ textAlign: "center" }}>
                  Sin datos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {open && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h2>{editing ? "Editar Modelo" : "Crear Modelo"}</h2>

            {/* CODE */}
            <input
              className={styles.input}
              placeholder="Código (DX4000)"
              value={form.code}
              onChange={e => setForm({ ...form, code: e.target.value })}
            />

            {/* TECHNOLOGY SELECT */}
            <select
              className={styles.input}
              value={form.technology}
              onChange={e =>
                setForm({
                  ...form,
                  technology: e.target.value as TerminalTechnology,
                })
              }
            >
              {technologyOptions.map(tech => (
                <option key={tech} value={tech}>
                  {tech.charAt(0) + tech.slice(1).toLowerCase()}
                </option>
              ))}
            </select>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button className={styles.buttonPrimary} onClick={handleSave}>
                Guardar
              </button>

              <button
                className={styles.buttonSecondary}
                onClick={() => setOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 'use client'

// import { useEffect, useState } from "react";
// import styles from "../page.module.scss";

// interface Model {
//   id?: string;
//   code: string;
//   technology: string;
// }

// const emptyForm: Model = {
//   code: "",
//   technology: "",
// };

// export default function ModelsPage() {
//   const [data, setData] = useState<Model[]>([]);
//   const [form, setForm] = useState<Model>(emptyForm);
//   const [open, setOpen] = useState(false);
//   const [editing, setEditing] = useState<Model | null>(null);

//   const fetchData = async () => {
//     const res = await fetch("/api/v1/terminal-models");
//     const json = await res.json();
//     setData(Array.isArray(json) ? json : json.data || []);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const openCreate = () => {
//     setEditing(null);
//     setForm(emptyForm);
//     setOpen(true);
//   };

//   const openEdit = (item: Model) => {
//     setEditing(item);
//     setForm(item);
//     setOpen(true);
//   };

//   const handleSave = async () => {
//     const method = form.id ? "PUT" : "POST";

//     await fetch(`/api/v1/terminal-models${form.id ? `/${form.id}` : ""}`, {
//       method,
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     setOpen(false);
//     fetchData();
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("¿Eliminar modelo?")) return;

//     await fetch(`/api/v1/terminal-models/${id}`, { method: "DELETE" });
//     fetchData();
//   };

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Modelos</h1>

//       <div className={styles.card}>
//         <button className={styles.buttonPrimary} onClick={openCreate}>
//           + Crear Modelo
//         </button>

//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Código</th>
//               <th>Tecnología</th>
//               <th>Acciones</th>
//             </tr>
//           </thead>

//           <tbody>
//             {data.length > 0 ? (
//               data.map(item => (
//                 <tr key={item.id}>
//                   <td>{item.code}</td>
//                   <td>{item.technology}</td>

//                   <td style={{ display: "flex", gap: "0.5rem" }}>
//                     <button
//                       className={styles.buttonSecondary}
//                       onClick={() => openEdit(item)}
//                     >
//                       Editar
//                     </button>

//                     <button
//                       className={styles.buttonDanger}
//                       onClick={() => handleDelete(item.id!)}
//                     >
//                       Eliminar
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr key="empty">
//                 <td colSpan={3} style={{ textAlign: "center" }}>
//                   Sin datos
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* MODAL */}
//       {open && (
//         <div className={styles.overlay}>
//           <div className={styles.modal}>
//             <h2>{editing ? "Editar Modelo" : "Crear Modelo"}</h2>

//             <input
//               className={styles.input}
//               placeholder="Código (DX4000)"
//               value={form.code}
//               onChange={e => setForm({ ...form, code: e.target.value })}
//             />

//             <input
//               className={styles.input}
//               placeholder="Tecnología (AXIUM)"
//               value={form.technology}
//               onChange={e =>
//                 setForm({ ...form, technology: e.target.value })
//               }
//             />

//             <div style={{ display: "flex", gap: "0.5rem" }}>
//               <button className={styles.buttonPrimary} onClick={handleSave}>
//                 Guardar
//               </button>

//               <button
//                 className={styles.buttonSecondary}
//                 onClick={() => setOpen(false)}
//               >
//                 Cancelar
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // // import CrudPage from "@/components/admin/CrudPage";

// // import CrudPage from "../CrudPage";

// // export default function ModelsPage() {
// //   return (
// //     <CrudPage
// //       title="Modelos"
// //       endpoint="/api/v1/models"
// //       fields={[
// //         { key: "name", label: "Nombre" },
// //         { key: "family", label: "Familia" },
// //       ]}
// //     />
// //   );
// // }

// // // 'use client'

// // // import { useEffect, useState } from "react";

// // // export default function ModelsPage() {
// // //   const [list, setList] = useState<any[]>([]);
// // //   const [form, setForm] = useState({
// // //     name: "",
// // //     family: "",
// // //   });

// // //   const fetchData = async () => {
// // //     const res = await fetch("/api/v1/models");
// // //     const data = await res.json();
// // //     setList(data);
// // //   };

// // //   useEffect(() => {
// // //     fetchData();
// // //   }, []);

// // //   const create = async () => {
// // //     await fetch("/api/v1/models", {
// // //       method: "POST",
// // //       headers: {
// // //         "Content-Type": "application/json",
// // //       },
// // //       body: JSON.stringify(form),
// // //     });

// // //     fetchData();
// // //   };

// // //   return (
// // //     <div style={{ padding: "2rem" }}>
// // //       <h1>Modelos</h1>

// // //       <input placeholder="Nombre" onChange={(e) => setForm({ ...form, name: e.target.value })} />
// // //       <input placeholder="Familia" onChange={(e) => setForm({ ...form, family: e.target.value })} />

// // //       <button onClick={create}>Crear</button>

// // //       <ul>
// // //         {list.map((item) => (
// // //           <li key={item.id}>
// // //             {item.name} - {item.family}
// // //           </li>
// // //         ))}
// // //       </ul>
// // //     </div>
// // //   );
// // // }