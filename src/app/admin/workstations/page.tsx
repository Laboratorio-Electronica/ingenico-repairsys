'use client'

import { useEffect, useState } from "react";
import styles from "../page.module.scss";
import { Area } from "@/shared/enums";

/* 🔥 ENUM */
// enum Area {
//   LABORATORY = "LABORATORY",
//   WAREHOUSE = "WAREHOUSE",
// }

interface Workstation {
  id?: string;
  code: string;
  content: {
    es: { name: string; description: string };
    en: { name: string; description: string };
  };
  area: Area;
}

const emptyForm: Workstation = {
  code: "",
  content: {
    es: { name: "", description: "" },
    en: { name: "", description: "" },
  },
  area: Area.LABORATORY,
};

export default function WorkstationsPage() {
  const [data, setData] = useState<any[]>([]);
  const [form, setForm] = useState<Workstation>(emptyForm);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Workstation | null>(null);

  const areaOptions = Object.values(Area);

  const fetchData = async () => {
    const res = await fetch("/api/v1/workstations");
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

  const openEdit = (item: Workstation) => {
    setEditing(item);
    setForm(item);
    setOpen(true);
  };

  const handleSave = async () => {
    if (!form.code || !form.content.es.name) {
      alert("Campos obligatorios");
      return;
    }

    const method = form.id ? "PUT" : "POST";

    console.log(JSON.stringify(form))

    await fetch(`/api/v1/workstations${form.id ? `/${form.id}` : ""}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar workstation?")) return;

    await fetch(`/api/v1/workstations/${id}`, {
      method: "DELETE",
    });

    fetchData();
  };

  // console.log(data)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Workstations</h1>

      <div className={styles.card}>
        <button className={styles.buttonPrimary} onClick={openCreate}>
          + Crear Workstation
        </button>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre (ES)</th>
              <th>Área</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map(item => (
                <tr key={item.id}>
                  <td>{item.code}</td>
                  <td>{item.name}</td>
                  <td>{item.area}</td>

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
                <td colSpan={4} style={{ textAlign: "center" }}>
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
            <h2>{editing ? "Editar" : "Crear"} Workstation</h2>

            {/* CODE */}
            <input
              className={styles.input}
              placeholder="Código"
              value={form.code}
              onChange={e => setForm({ ...form, code: e.target.value })}
            />

            <h4>Contenido ES</h4>
            <input
              className={styles.input}
              placeholder="Nombre"
              // value={form.content.es.name}
              value={form.content.es.name}
              onChange={e =>
                setForm({
                  ...form,
                  content: {
                    ...form.content,
                    es: { ...form.content.es, name: e.target.value },
                  },
                })
              }
            />

            <input
              className={styles.input}
              placeholder="Descripción"
              value={form.content.es.description}
              onChange={e =>
                setForm({
                  ...form,
                  content: {
                    ...form.content,
                    es: {
                      ...form.content.es,
                      description: e.target.value,
                    },
                  },
                })
              }
            />

            <h4>Contenido EN</h4>
            <input
              className={styles.input}
              placeholder="Name"
              value={form.content.en.name}
              onChange={e =>
                setForm({
                  ...form,
                  content: {
                    ...form.content,
                    en: { ...form.content.en, name: e.target.value },
                  },
                })
              }
            />

            <input
              className={styles.input}
              placeholder="Description"
              value={form.content.en.description}
              onChange={e =>
                setForm({
                  ...form,
                  content: {
                    ...form.content,
                    en: {
                      ...form.content.en,
                      description: e.target.value,
                    },
                  },
                })
              }
            />

            {/* AREA */}
            <select
              className={styles.input}
              value={form.area}
              onChange={e =>
                setForm({
                  ...form,
                  area: e.target.value as Area,
                })
              }
            >
              {areaOptions.map(a => (
                <option key={a} value={a}>
                  {a}
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

// // import CrudPage from "@/components/admin/CrudPage";

// import CrudPage from "../CrudPage";

// export default function WorkstationsPage() {
//   return (
//     <CrudPage
//       title="Workstations"
//       endpoint="/api/v1/workstations"
//       fields={[
//         { key: "name", label: "Nombre" },
//       ]}
//     />
//   );
// }

// // 'use client'

// // import { useEffect, useState } from "react";

// // export default function WorkstationsPage() {
// //   const [list, setList] = useState<any[]>([]);
// //   const [name, setName] = useState("");

// //   const fetchData = async () => {
// //     const res = await fetch("/api/v1/workstations");
// //     const data = await res.json();
// //     setList(data);
// //   };

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const create = async () => {
// //     await fetch("/api/v1/workstations", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({ name }),
// //     });

// //     setName("");
// //     fetchData();
// //   };

// //   return (
// //     <div style={{ padding: "2rem" }}>
// //       <h1>Workstations</h1>

// //       <input value={name} onChange={(e) => setName(e.target.value)} />
// //       <button onClick={create}>Crear</button>

// //       <ul>
// //         {list.map((w) => (
// //           <li key={w.id}>{w.name}</li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }