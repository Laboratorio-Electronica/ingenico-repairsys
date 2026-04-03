'use client'

import { useEffect, useMemo, useState } from "react";
import styles from "../page.module.scss";
import { TorqueSpecListDTO } from "@/infrastructure/torque-spec/torque-spec.list.dto";

interface Torque {
  id?: string;
  modelId: string;
  torque: number;
  tolerance: number;
  minTorque: number;
  maxTorque: number;
  screwType: string;
  use: { es: string; en: string };
  order: number;
  status: "active" | "inactive";
}

interface Model {
  id: string;
  brand: string;
  code: string;
  technology: string;
}

const emptyForm: Torque = {
  modelId: "",
  torque: 0,
  tolerance: 0,
  minTorque: 0,
  maxTorque: 0,
  screwType: "",
  use: { es: "", en: "" },
  order: 1,
  status: "active",
};

export default function TorquesPage() {
  const [data, setData] = useState<any[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [form, setForm] = useState<Torque>(emptyForm);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Torque | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔗 map para mostrar nombre en tabla
  const modelMap = useMemo(() => {
    const map: Record<string, string> = {};
    models.forEach(m => { map[m.id] = m.code; });
    return map;
  }, [models]);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/v1/torque-specs");
      const json = await res.json();
      setData(Array.isArray(json) ? json : json.data || []);
    } catch (e) {
      console.error("Error cargando torques", e);
      setData([]);
    }
  };

  const fetchModels = async () => {
    try {
      const res = await fetch("/api/v1/terminal-models");
      const json = await res.json();
      setModels(Array.isArray(json) ? json : json.data || []);
    } catch (e) {
      console.error("Error cargando modelos", e);
      setModels([]);
    }
  };

  useEffect(() => {
    fetchData();
    fetchModels();
  }, []);

  // ⚙️ cálculo automático min/max
  useEffect(() => {
    const min = (form.torque || 0) - (form.tolerance || 0);
    const max = (form.torque || 0) + (form.tolerance || 0);

    setForm(prev => ({
      ...prev,
      minTorque: parseFloat(min.toFixed(3)),
      maxTorque: parseFloat(max.toFixed(3)),
    }));
  }, [form.torque, form.tolerance]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const openEdit = (item: Torque) => {
    setEditing(item);
    setForm(item);
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const method = form.id ? "PUT" : "POST";

      await fetch(`/api/v1/torque-specs${form.id ? `/${form.id}` : ""}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setOpen(false);
      fetchData();
    } catch (e) {
      console.error("Error guardando", e);
      alert("Error guardando");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar torque?")) return;

    try {
      await fetch(`/api/v1/torque-specs/${id}`, { method: "DELETE" });
      fetchData();
    } catch (e) {
      console.error("Error eliminando", e);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Torques</h1>

      <div className={styles.card}>
        <button className={styles.buttonPrimary} onClick={openCreate}>
          + Crear Torque
        </button>

        {/* 📊 TABLE */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Modelo</th>
              <th>Torque</th>
              <th>Tolerancia</th>
              <th>Tipo</th>
              <th>Uso</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map(item => (
                <tr key={item.id}>
                  <td>{modelMap[item.modelId] || item.modelId}</td>
                  <td>{item.torque} Nm</td>
                  <td>± {item.tolerance}</td>
                  <td>{item.screwType}</td>
                  <td>{item.use}</td>

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
                <td colSpan={6} style={{ textAlign: "center" }}>
                  Sin datos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🧩 MODAL */}
      {open && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h2>{editing ? "Editar Torque" : "Crear Torque"}</h2>

            {/* MODEL */}
            <select
              className={styles.input}
              value={form.modelId}
              onChange={e =>
                setForm({ ...form, modelId: e.target.value })
              }
            >
              <option value="">Seleccionar modelo</option>
              {models.map(m => (
                <option key={m.id} value={m.id}>
                  {m.code}
                </option>
              ))}
            </select>

            {/* TORQUE */}
            <input
              className={styles.input}
              type="number"
              placeholder="Torque"
              value={form.torque}
              onChange={e =>
                setForm({ ...form, torque: parseFloat(e.target.value) })
              }
            />

            {/* TOLERANCE */}
            <input
              className={styles.input}
              type="number"
              placeholder="Tolerancia"
              value={form.tolerance}
              onChange={e =>
                setForm({ ...form, tolerance: parseFloat(e.target.value) })
              }
            />

            <p>Min: {form.minTorque}</p>
            <p>Max: {form.maxTorque}</p>

            {/* SCREW TYPE */}
            <input
              className={styles.input}
              placeholder="Tipo de tornillo"
              value={form.screwType}
              onChange={e =>
                setForm({ ...form, screwType: e.target.value })
              }
            />

            {/* USE */}
            <input
              className={styles.input}
              placeholder="Uso (ES)"
              value={form.use.es}
              onChange={e =>
                setForm({
                  ...form,
                  use: { ...form.use, es: e.target.value },
                })
              }
            />

            <input
              className={styles.input}
              placeholder="Uso (EN)"
              value={form.use.en}
              onChange={e =>
                setForm({
                  ...form,
                  use: { ...form.use, en: e.target.value },
                })
              }
            />

            {/* ORDER */}
            <input
              className={styles.input}
              type="number"
              placeholder="Orden"
              value={form.order}
              onChange={e =>
                setForm({ ...form, order: parseInt(e.target.value) })
              }
            />

            {/* STATUS */}
            <select
              className={styles.input}
              value={form.status}
              onChange={e =>
                setForm({
                  ...form,
                  status: e.target.value as "active" | "inactive",
                })
              }
            >
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
            </select>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                className={styles.buttonPrimary}
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "Guardando..." : "Guardar"}
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

// interface Torque {
//   _id?: string;
//   modelId: string;
//   torque: number;
//   tolerance: number;
//   minTorque: number;
//   maxTorque: number;
//   screwType: string;
//   use: { es: string; en: string };
//   order: number;
//   status: string;
// }

// export default function TorquesPage() {
//   const [data, setData] = useState<Torque[]>([]);
//   const [models, setModels] = useState<any[]>([]);
//   const [form, setForm] = useState<Torque>({
//     modelId: "",
//     torque: 0,
//     tolerance: 0,
//     minTorque: 0,
//     maxTorque: 0,
//     screwType: "",
//     use: { es: "", en: "" },
//     order: 1,
//     status: "active",
//   });

//   const fetchData = async () => {
//     const res = await fetch("/api/v1/torque-specs");
//     const json = await res.json();
//     setData(json.data || json);
//   };

//   const fetchModels = async () => {
//     const res = await fetch("/api/v1/models");
//     const json = await res.json();
//     setModels(json.data || json);
//   };

//   useEffect(() => {
//     fetchData();
//     fetchModels();
//   }, []);

//   // 🔥 cálculo automático
//   useEffect(() => {
//     const min = form.torque - form.tolerance;
//     const max = form.torque + form.tolerance;

//     setForm((prev) => ({
//       ...prev,
//       minTorque: parseFloat(min.toFixed(3)),
//       maxTorque: parseFloat(max.toFixed(3)),
//     }));
//   }, [form.torque, form.tolerance]);

//   const handleSave = async () => {
//     await fetch("/api/v1/torque-specs", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(form),
//     });

//     fetchData();
//   };

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Torques</h1>

//       <div className={styles.card}>
//         {/* MODEL */}
//         <select
//           className={styles.input}
//           value={form.modelId}
//           onChange={(e) =>
//             setForm({ ...form, modelId: e.target.value })
//           }
//         >
//           <option value="">Seleccionar modelo</option>
//           {models.map((m) => (
//             <option key={m._id} value={m._id}>
//               {m.name}
//             </option>
//           ))}
//         </select>

//         {/* TORQUE */}
//         <input
//           className={styles.input}
//           type="number"
//           placeholder="Torque"
//           onChange={(e) =>
//             setForm({ ...form, torque: parseFloat(e.target.value) })
//           }
//         />

//         {/* TOLERANCE */}
//         <input
//           className={styles.input}
//           type="number"
//           placeholder="Tolerancia"
//           onChange={(e) =>
//             setForm({ ...form, tolerance: parseFloat(e.target.value) })
//           }
//         />

//         {/* AUTO */}
//         <p>Min: {form.minTorque}</p>
//         <p>Max: {form.maxTorque}</p>

//         {/* SCREW TYPE */}
//         <input
//           className={styles.input}
//           placeholder="Tipo de tornillo"
//           onChange={(e) =>
//             setForm({ ...form, screwType: e.target.value })
//           }
//         />

//         {/* USE */}
//         <input
//           className={styles.input}
//           placeholder="Uso (ES)"
//           onChange={(e) =>
//             setForm({
//               ...form,
//               use: { ...form.use, es: e.target.value },
//             })
//           }
//         />

//         <input
//           className={styles.input}
//           placeholder="Uso (EN)"
//           onChange={(e) =>
//             setForm({
//               ...form,
//               use: { ...form.use, en: e.target.value },
//             })
//           }
//         />

//         {/* ORDER */}
//         <input
//           className={styles.input}
//           type="number"
//           placeholder="Orden"
//           onChange={(e) =>
//             setForm({ ...form, order: parseInt(e.target.value) })
//           }
//         />

//         {/* STATUS */}
//         <select
//           className={styles.input}
//           value={form.status}
//           onChange={(e) =>
//             setForm({ ...form, status: e.target.value })
//           }
//         >
//           <option value="active">Activo</option>
//           <option value="inactive">Inactivo</option>
//         </select>

//         <button className={styles.buttonPrimary} onClick={handleSave}>
//           Guardar
//         </button>
//       </div>

//       {/* LIST */}
//       <div className={styles.card}>
//         {data.map((item) => (
//           <div key={item._id}>
//             {item.screwType} - {item.torque} Nm
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // import CrudPage from "../CrudPage";

// // export default function TorquesPage() {
// //   return (
// //     <CrudPage
// //       title="Torques"
// //       endpoint="/api/v1/torque-specs"
// //       fields={[
// //         { key: "family", label: "Familia" },
// //         { key: "torque", label: "Torque (N·m)" },
// //         { key: "tolerance", label: "Tolerancia" },
// //         { key: "description", label: "Descripción" },
// //       ]}
// //     />
// //   );
// // }
