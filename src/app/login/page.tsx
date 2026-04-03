'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import { useUser } from "@/providers/UserProvider";

export default function LoginPage() {
  const router = useRouter();
  const { refreshUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Email inválido");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/v1/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        // 🔥 evitar filtrar mensajes internos
        setError("Credenciales inválidas");
        return;
      }

      await refreshUser();
      // router.refresh();
      router.push("/");

    } catch (err) {
      console.error(err);
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Iniciar sesión</h1>

        <form onSubmit={onSubmit} className={styles.form} noValidate>
          
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!error}
          />

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={!!error}
          />

          {error && (
            <p className={styles.error} role="alert" aria-live="assertive">
              {error}
            </p>
          )}

          <button
            className={styles.button}
            type="submit"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </main>
  );
}

// 'use client'

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import styles from "./page.module.scss";
// import { useUser } from "@/providers/UserProvider";

// export default function LoginPage() {
//   const router = useRouter();
//   const { refreshUser } = useUser(); // 🔥 clave

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const onSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     if (!email || !password) {
//       setError("Todos los campos son obligatorios");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await fetch("/api/v1/auth", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include", // 🔥 importante para cookies
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Error en login");
//       }

//       // 🔥 1. actualizar contexto inmediatamente
//       await refreshUser();

//       // 🔥 2. forzar re-render con cookies nuevas
//       router.refresh();

//       // 🔥 3. redirigir
//       router.push("/home");

//     } catch (err: any) {
//       console.error(err);
//       setError(err.message || "Error en login");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.card}>
//         <h1 className={styles.title}>Iniciar sesión</h1>

//         <form onSubmit={onSubmit} className={styles.form}>
//           <input
//             className={styles.input}
//             type="text"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <input
//             className={styles.input}
//             type="password"
//             placeholder="Contraseña"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           {error && <p className={styles.error}>{error}</p>}

//           <button
//             className={styles.button}
//             type="submit"
//             disabled={loading}
//           >
//             {loading ? "Ingresando..." : "Ingresar"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }