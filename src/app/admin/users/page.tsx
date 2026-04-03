'use client'

import { useEffect, useState } from "react";
import styles from "../page.module.scss";
import { Role } from "@/shared/auth/role.enum";

/* 🔥 ROLES */
// enum Role {
//   ADMIN = "admin",
//   TECHNICIAN = "technician",
//   USER = "user",
// }

interface User {
  id?: string;
  username: string;
  email: string;
  role: Role;
  password?: string; // solo para crear
}

const emptyForm: User = {
  username: "",
  email: "",
  role: Role.VIEWER,
  password: "",
};

export default function UsersPage() {
  const [data, setData] = useState<User[]>([]);
  const [form, setForm] = useState<User>(emptyForm);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);

  const roleOptions = Object.values(Role);

  const fetchData = async () => {
    const res = await fetch("/api/v1/users");
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

  const openEdit = (item: User) => {
    setEditing(item);
    setForm({ ...item, password: "" }); // 🔥 no mostrar password
    setOpen(true);
  };

  const handleSave = async () => {
    if (!form.email || !form.role) {
      alert("Campos obligatorios");
      return;
    }

    const method = form.id ? "PUT" : "POST";

    // 🔥 evitar enviar password vacío en edición
    const payload = { ...form };
    if (editing && !payload.password) {
      delete payload.password;
    }

    await fetch(`/api/v1/users${form.id ? `/${form.id}` : ""}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar usuario?")) return;

    await fetch(`/api/v1/users/${id}`, {
      method: "DELETE",
    });

    fetchData();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Usuarios</h1>

      <div className={styles.card}>
        <button className={styles.buttonPrimary} onClick={openCreate}>
          + Crear Usuario
        </button>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map(item => (
                <tr key={item.id}>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>

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
            <h2>{editing ? "Editar Usuario" : "Crear Usuario"}</h2>

            <input
              className={styles.input}
              placeholder="Username"
              value={form.username}
              onChange={e =>
                setForm({ ...form, username: e.target.value })
              }
            />

            <input
              className={styles.input}
              placeholder="Email"
              value={form.email}
              onChange={e =>
                setForm({ ...form, email: e.target.value })
              }
            />

            {/* 🔥 password solo en create o si se quiere cambiar */}
            <input
              className={styles.input}
              type="password"
              placeholder={
                editing
                  ? "Nueva contraseña (opcional)"
                  : "Contraseña"
              }
              value={form.password || ""}
              onChange={e =>
                setForm({ ...form, password: e.target.value })
              }
            />

            {/* ROLE */}
            <select
              className={styles.input}
              value={form.role}
              onChange={e =>
                setForm({
                  ...form,
                  role: e.target.value as Role,
                })
              }
            >
              {roleOptions.map(role => (
                <option key={role} value={role}>
                  {role}
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

// export default function UsersPage() {
//   return (
//     <CrudPage
//       title="Usuarios"
//       endpoint="/api/v1/users"
//       fields={[
//         { key: "username", label: "Usuario" },
//         { key: "name", label: "Nombre" },
//         { key: "role", label: "Rol" },
//       ]}
//     />
//   );
// }

// // 'use client'

// // import { useEffect, useState } from "react";

// // export default function UsersPage() {
// //   const [users, setUsers] = useState<any[]>([]);
// //   const [form, setForm] = useState({
// //     username: "",
// //     password: "",
// //     name: "",
// //     role: "tecnico",
// //   });

// //   useEffect(() => {
// //     fetchUsers();
// //   }, []);

// //   const fetchUsers = async () => {
// //     const res = await fetch("/api/v1/users");
// //     const data = await res.json();
// //     setUsers(data);
// //   };

// //   const createUser = async () => {
// //     await fetch("/api/v1/users", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify(form),
// //     });

// //     fetchUsers();
// //   };

// //   return (
// //     <div style={{ padding: "2rem" }}>
// //       <h1>Usuarios</h1>

// //       <div>
// //         <input placeholder="username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
// //         <input placeholder="password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
// //         <input placeholder="name" onChange={(e) => setForm({ ...form, name: e.target.value })} />

// //         <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
// //           <option value="tecnico">Técnico</option>
// //           <option value="admin">Admin</option>
// //         </select>

// //         <button onClick={createUser}>Crear</button>
// //       </div>

// //       <ul>
// //         {users.map((u) => (
// //           <li key={u.id}>
// //             {u.name} - {u.role}
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }