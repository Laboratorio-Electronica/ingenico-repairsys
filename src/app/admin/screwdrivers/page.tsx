'use client'

import { useEffect, useMemo, useState } from "react";
import styles from "../page.module.scss";
import { ScrewdriverListDTO } from "@/infrastructure/screwdriver/screwdriver.list.dto";

interface Screwdriver {
  id?: string;
  serialNumber: string;
  model: string;
  brand: string;
  workstationId: string;
}

interface Workstation {
  id: string;
  name: string;
}

const emptyForm: Screwdriver = {
  serialNumber: "",
  model: "",
  brand: "",
  workstationId: "",
};

export default function ScrewdriversPage() {
  const [data, setData] = useState<ScrewdriverListDTO[]>([]);
  const [workstations, setWorkstations] = useState<Workstation[]>([]);
  const [form, setForm] = useState<Screwdriver>(emptyForm);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Screwdriver | null>(null);

  // 🔗 map para mostrar nombre en tabla
  const wsMap = useMemo(() => {
    const map: Record<string, string> = {};
    workstations.forEach(w => (map[w.id] = w.name));
    return map;
  }, [workstations]);

  const fetchData = async () => {
    const res = await fetch("/api/v1/screwdrivers");
    const json = await res.json();
    setData(Array.isArray(json) ? json : json.data || []);
  };

  const fetchWorkstations = async () => {
    const res = await fetch("/api/v1/workstations");
    const json = await res.json();
    setWorkstations(Array.isArray(json) ? json : json.data || []);
  };

  useEffect(() => {
    fetchData();
    fetchWorkstations();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const openEdit = (item: any) => {
    setEditing(item);
    setForm(item);
    setOpen(true);
  };

  const handleSave = async () => {
    if (!form.serialNumber || !form.model || !form.workstationId) {
      alert("Campos obligatorios");
      return;
    }

    const method = form.id ? "PUT" : "POST";

    await fetch(`/api/v1/screwdrivers${form.id ? `/${form.id}` : ""}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar atornillador?")) return;

    await fetch(`/api/v1/screwdrivers/${id}`, {
      method: "DELETE",
    });

    fetchData();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Atornilladores</h1>

      <div className={styles.card}>
        <button className={styles.buttonPrimary} onClick={openCreate}>
          + Crear Atornillador
        </button>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Serie</th>
              <th>Modelo</th>
              <th>Marca</th>
              <th>Workstation</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map(item => (
                <tr key={item.id}>
                  <td>{item.serialNumber}</td>
                  <td>{item.model}</td>
                  <td>{item.brand}</td>
                  <td>{item.workstationId.code}</td>

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
                <td colSpan={5} style={{ textAlign: "center" }}>
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
            <h2>{editing ? "Editar" : "Crear"} Atornillador</h2>

            <input
              className={styles.input}
              placeholder="Serie (ATN-002)"
              value={form.serialNumber}
              onChange={e =>
                setForm({ ...form, serialNumber: e.target.value })
              }
            />

            <input
              className={styles.input}
              placeholder="Modelo (BLG-5000)"
              value={form.model}
              onChange={e =>
                setForm({ ...form, model: e.target.value })
              }
            />

            <input
              className={styles.input}
              placeholder="Marca (Killews)"
              value={form.brand}
              onChange={e =>
                setForm({ ...form, brand: e.target.value })
              }
            />

            {/* 🔥 SELECT RELACIÓN */}
            <select
              className={styles.input}
              value={form.workstationId}
              onChange={e =>
                setForm({ ...form, workstationId: e.target.value })
              }
            >
              <option value="">Seleccionar workstation</option>

              {workstations.map(ws => (
                <option key={ws.id} value={ws.id}>
                  {ws.name}
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

// export default function ScrewdriversPage() {
//   return (
//     <CrudPage
//       title="Atornilladores"
//       endpoint="/api/v1/screwdrivers"
//       fields={[
//         { key: "serial", label: "Serie" },
//         { key: "model", label: "Modelo" },
//         { key: "workstationId", label: "Workstation ID" },
//       ]}
//     />
//   );
// }

// // 'use client'

// // import { useEffect, useState } from "react";

// // export default function ScrewdriversPage() {
// //   const [list, setList] = useState<any[]>([]);
// //   const [form, setForm] = useState({
// //     serial: "",
// //     model: "",
// //     workstationId: "",
// //   });

// //   const fetchData = async () => {
// //     const res = await fetch("/api/v1/screwdrivers");
// //     const data = await res.json();
// //     setList(data);
// //   };

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const create = async () => {
// //     await fetch("/api/v1/screwdrivers", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify(form),
// //     });

// //     fetchData();
// //   };

// //   return (
// //     <div style={{ padding: "2rem" }}>
// //       <h1>Atornilladores</h1>

// //       <input placeholder="Serie" onChange={(e) => setForm({ ...form, serial: e.target.value })} />
// //       <input placeholder="Modelo" onChange={(e) => setForm({ ...form, model: e.target.value })} />
// //       <input placeholder="Workstation ID" onChange={(e) => setForm({ ...form, workstationId: e.target.value })} />

// //       <button onClick={create}>Crear</button>

// //       <ul>
// //         {list.map((item) => (
// //           <li key={item.id}>
// //             {item.serial} - {item.model}
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }