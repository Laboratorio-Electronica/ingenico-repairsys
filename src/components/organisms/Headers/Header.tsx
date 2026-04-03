'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from './Header.module.scss';
import Logo from '@/components/atom/Logo/Logo';
import {
  FiChevronDown,
  FiUser,
  FiLogOut,
  FiSettings,
  FiRefreshCw
} from 'react-icons/fi';
import { useWorkstation } from '@/providers/WorkstationProvider';
import { useUser } from '@/providers/UserProvider';

interface User {
  isAuth: boolean;
  username: string;
  role: string;
}

const Header: React.FC = () => {
  const { workstation, clearWorkstation } = useWorkstation();

  // const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 🔥 traer usuario desde API
  // useEffect(() => {
  //   fetch('/api/v1/auth')
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data?.isAuth) setUser(data);
  //     })
  //     .catch(() => setUser(null));
  // }, []);

  // const { loading } = useUser();

  // if (loading) return null;
  const { user } = useUser();

  // cerrar dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const today = new Date().toLocaleDateString('es-CO', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  // const handleLogout = () => {
  //   document.cookie = 'authToken=; path=/; max-age=0';
  //   window.location.href = '/login';
  // };
  const handleLogout = async () => {
  try {
    await fetch('/api/v1/auth', {
      method: 'DELETE',
    });

    // 🔥 limpiar estado global
    window.dispatchEvent(new Event('refreshUser'));

    // 🔥 opcional: limpiar workstation también
    document.cookie = 'workstation=; path=/; max-age=0';

    // redirigir
    window.location.href = '/login';

  } catch (error) {
    console.error('Error al cerrar sesión', error);
  }
};

  return (
    <header className={styles.header}>

      {/* LOGO */}
      <div className={styles.header__left}>
        <Logo inHeader />
      </div>

      {/* WORKSTATION */}
      <div className={styles.header__workstation}>
        <div className={styles.workstationInfo}>
          <small>{workstation?.code || '--'}</small>
          <strong>{workstation?.name || 'Sin estación'}</strong>
        </div>

        <button
          className={styles.changeBtn}
          onClick={clearWorkstation}
          title="Cambiar estación"
        >
          <FiRefreshCw />
        </button>
      </div>

      {/* USER */}
      <div className={styles.header__user} ref={menuRef}>
        
        <div
          className={styles.trigger}
          onClick={() => setOpen(!open)}
        >
          <FiUser />

          <div className={styles.userInfo}>
            <span>{user?.username || 'Usuario'}</span>
            <small>{user?.role || ''} • {today}</small>
          </div>

          <FiChevronDown />
        </div>

        {/* MENU */}
        {open && (
          <div className={styles.menu}>

            <div className={styles.menu__header}>
              <strong>{user?.username}</strong>
              <small>{user?.role}</small>
            </div>

            <button onClick={clearWorkstation}>
              <FiRefreshCw />
              Cambiar estación
            </button>

            {/* <button>
              <FiSettings />
              Cambiar contraseña
            </button> */}

            <hr />

            <button
              onClick={handleLogout}
              className={styles.logout}
            >
              <FiLogOut />
              Cerrar sesión
            </button>

          </div>
        )}
      </div>

    </header>
  );
};

export default Header;

// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import styles from './Header.module.scss';
// import Logo from '@/components/atom/Logo/Logo';
// import {
//   FiChevronDown,
//   FiUser,
//   FiLogOut,
//   FiSettings,
//   FiRefreshCw
// } from 'react-icons/fi';
// import { useWorkstation } from '@/providers/WorkstationProvider';

// const Header: React.FC = () => {
//   const { workstation, clearWorkstation } = useWorkstation();

//   const [open, setOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement>(null);

//   // 🔒 cerrar menú al hacer click fuera
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
//         setOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const today = new Date().toLocaleDateString('es-CO', {
//     weekday: 'short',
//     day: 'numeric',
//     month: 'short',
//   });

//   const handleLogout = () => {
//     document.cookie = 'authToken=; path=/; max-age=0';
//     window.location.href = '/login';
//   };

//   return (
//     <header className={styles.header}>

//       {/* LOGO */}
//       <div className={styles.header__left}>
//         <Logo inHeader />
//       </div>

//       {/* WORKSTATION */}
//       <div className={styles.header__workstation}>
//         <div className={styles.workstationInfo}>
//           <small>{workstation?.code || '--'}</small>
//           <strong>{workstation?.name || 'Sin estación'}</strong>
//         </div>

//         <button
//           className={styles.changeBtn}
//           onClick={clearWorkstation}
//           title="Cambiar estación"
//         >
//           <FiRefreshCw />
//         </button>
//       </div>

//       {/* USER */}
//       <div className={styles.header__user} ref={menuRef}>
//         <div
//           className={styles.trigger}
//           onClick={() => setOpen(!open)}
//         >
//           <FiUser />

//           <div className={styles.userInfo}>
//             <span>Carlos Técnico</span>
//             <small>{today}</small>
//           </div>

//           <FiChevronDown />
//         </div>

//         {open && (
//           <div className={styles.menu}>

//             <div className={styles.menu__header}>
//               <strong>Carlos Técnico</strong>
//               <small>{today}</small>
//             </div>

//             <button onClick={clearWorkstation}>
//               <FiRefreshCw />
//               Cambiar estación
//             </button>

//             <button>
//               <FiSettings />
//               Cambiar contraseña
//             </button>

//             <hr />

//             <button
//               onClick={handleLogout}
//               className={styles.logout}
//             >
//               <FiLogOut />
//               Cerrar sesión
//             </button>

//           </div>
//         )}
//       </div>

//     </header>
//   );
// };

// export default Header;

// // 'use client';

// // import React from 'react';
// // import styles from './Header.module.scss';
// // import Logo from '@/components/atom/Logo/Logo';
// // import { FiChevronDown, FiUser, FiRefreshCw } from 'react-icons/fi';
// // import { useWorkstation } from '@/providers/WorkstationProvider';

// // const Header: React.FC = () => {
// //   const { workstation, clearWorkstation } = useWorkstation();

// //   const today = new Date().toLocaleDateString('es-CO', {
// //     weekday: 'long',
// //     day: 'numeric',
// //     month: 'short',
// //     year: 'numeric',
// //   });

// //   return (
// //     <header className={styles.header}>

// //       {/* LOGO */}
// //       <div className={styles.header__left}>
// //         <Logo inHeader />
// //       </div>

// //       {/* WORKSTATION */}
// //       <div className={styles.header__workstation}>
// //         <div>
// //           <small>{workstation?.code}</small>
// //           <strong>{workstation?.name}</strong>
// //         </div>

// //         {/* 🔥 BOTÓN CAMBIAR */}
// //         <button
// //           className={styles.changeBtn}
// //           onClick={clearWorkstation}
// //           title="Cambiar estación"
// //         >
// //           <FiRefreshCw />
// //         </button>
// //       </div>

// //       {/* USER */}
// //       <div className={styles.header__user}>
// //         <div className={styles.info}>
// //           <span>Carlos Técnico</span>
// //           <small>{today}</small>
// //         </div>

// //         <FiUser />
// //         <FiChevronDown />
// //       </div>

// //     </header>
// //   );
// // };

// // export default Header;

// // // 'use client';

// // // import React from 'react';
// // // import styles from './Header.module.scss';
// // // import Logo from '@/components/atom/Logo/Logo';
// // // import { FiChevronDown, FiUser } from 'react-icons/fi';
// // // import { useWorkstation } from '@/providers/WorkstationProvider';

// // // const Header: React.FC = () => {
// // //   const { workstation, clearWorkstation } = useWorkstation();

// // //   return (
// // //     <header className={styles.header}>

// // //       {/* LEFT */}
// // //       <div className={styles.header__left}>
// // //         <Logo inHeader />
// // //       </div>

// // //       {/* CENTER (CLICKABLE) */}
// // //       <div
// // //         className={styles.header__workstation}
// // //         onClick={clearWorkstation}
// // //         title="Cambiar estación"
// // //       >
// // //         <small>{workstation?.code || '--'}</small>
// // //         <strong>{workstation?.name || 'Seleccionar estación'}</strong>
// // //       </div>

// // //       {/* RIGHT */}
// // //       <div className={styles.header__user}>
// // //         <FiUser />
// // //         <span>Carlos Técnico</span>
// // //         <FiChevronDown />
// // //       </div>

// // //     </header>
// // //   );
// // // };

// // // export default Header;

// // // // 'use client';

// // // // import React from 'react';
// // // // import styles from './Header.module.scss';
// // // // import Logo from '@/components/atom/Logo/Logo';
// // // // import { FiChevronDown, FiUser } from 'react-icons/fi';
// // // // import { useWorkstation } from '@/providers/WorkstationProvider';

// // // // const Header: React.FC = () => {
// // // //   const { workstation } = useWorkstation();

// // // //   return (
// // // //     <header className={styles.header}>

// // // //       {/* LEFT → LOGO */}
// // // //       <div className={styles.header__left}>
// // // //         <Logo inHeader />
// // // //       </div>

// // // //       {/* CENTER → WORKSTATION */}
// // // //       <div className={styles.header__workstation}>
// // // //         <small>{workstation?.code || '--'}</small>
// // // //         <strong>{workstation?.name || 'Sin estación'}</strong>
// // // //       </div>

// // // //       {/* RIGHT → USER */}
// // // //       <div className={styles.header__user}>
// // // //         <FiUser />
// // // //         <span>Carlos Técnico</span>
// // // //         <FiChevronDown />
// // // //       </div>

// // // //     </header>
// // // //   );
// // // // };

// // // // export default Header;

// // // // // 'use client';

// // // // // import React, { useEffect, useState } from 'react';
// // // // // import styles from './Header.module.scss';
// // // // // import Logo from '@/components/atom/Logo/Logo';
// // // // // import { FiChevronDown, FiUser } from 'react-icons/fi';

// // // // // const Header: React.FC = () => {
// // // // //   const [codeWorkstation, setCodeWorkstation] = useState<string | null>(null);
// // // // //   const [workstation, setWorkstation] = useState<string | null>(null);

// // // // //   // 👉 Leer cookie workstation
// // // // //   useEffect(() => {
// // // // //     const match = document.cookie
// // // // //       .split('; ')
// // // // //       .find(row => row.startsWith('workstation='));

// // // // //     if (match) {
// // // // //       setCodeWorkstation(JSON.parse(match.split('=')[1]).code);
// // // // //       setWorkstation(JSON.parse(match.split('=')[1]).name);
// // // // //     }
// // // // //   }, []);

// // // // //   return (
// // // // //     <header className={styles.header}>

// // // // //       {/* LEFT → LOGO */}
// // // // //       <div className={styles.header__left}>
// // // // //         <Logo inHeader />
// // // // //       </div>

// // // // //       {/* CENTER → WORKSTATION */}
// // // // //       <div className={styles.header__workstation}>
// // // // //         <small>{codeWorkstation}</small>
// // // // //         <strong>{workstation || 'Sin estación'}</strong>
// // // // //       </div>

// // // // //       {/* RIGHT → USER */}
// // // // //       <div className={styles.header__user}>
// // // // //         <FiUser />
// // // // //         <span>Carlos Tecnico</span>
// // // // //         <FiChevronDown />
// // // // //       </div>

// // // // //     </header>
// // // // //   );
// // // // // };

// // // // // export default Header;