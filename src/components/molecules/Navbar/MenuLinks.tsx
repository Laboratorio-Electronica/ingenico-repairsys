'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './Navbar.module.scss';
import { useVerifyProfileQuery } from '@/infrastructure/auth/auth.api';
import { navItems } from '@/lib/config';
import { useLanguage } from '@/hooks/useLanguage';
import { MenuProps, NavItem } from '@/lib/types/navigation';
import clsx from 'clsx';

/* ==================================================
  MenuLinks (FINAL)
================================================== */

export const MenuLinks: React.FC<MenuProps> = ({
  links = [],
  isPhone = false,
  onlyIcons = false,
}) => {
  const { language } = useLanguage();
  const pathname = usePathname();

  // 🔐 Auth → define menú principal
  const { data } = useVerifyProfileQuery(null, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  const NAV_ITEMS = navItems(
    data?.isAuth ?? false,
    data?.role
  ) as NavItem[];

  const containerClass = isPhone
    ? styles['menu__container--phone']
    : styles['menu__container'];

  return (
    <nav className={containerClass} aria-label="Main navigation">

      {/* ===== MAIN NAV ===== */}
      {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
        // ✅ FIX CLAVE → soporta subrutas
        const isActive = pathname.startsWith(path);

        return (
          <Link
            key={path}
            href={path}
            className={clsx(
              styles.menu__item,
              isActive && styles['menu__item--active']
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon className={styles.menu__icon} aria-hidden />
            {!onlyIcons && (
              <span className={styles.menu__label}>
                {label[language]}
              </span>
            )}
          </Link>
        );
      })}

      {/* ===== SUB NAV (Template links) ===== */}
      {links.length > 0 && (
        <div className={styles.menu__links}>
          {links.map(({ path, title }) => {
            const isActive = pathname.startsWith(path);

            return (
              <Link
                key={path}
                href={path}
                className={clsx(
                  styles.menu__item,
                  isActive && styles['menu__item--active']
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {!onlyIcons && (
                  <span className={styles.menu__label}>
                    {title[language]}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}

    </nav>
  );
};

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// import styles from './Navbar.module.scss';
// import { useVerifyProfileQuery } from '@/infrastructure/auth/auth.api';
// import { navItems } from '@/lib/config';
// import { useLanguage } from '@/hooks/useLanguage';
// import { MenuProps, NavItem } from '@/lib/types/navigation';
// import clsx from 'clsx';

// /* ==================================================
//   🧭 NAVBAR - MenuLinks Component
//   --------------------------------------------------
//   Navegación principal reutilizable.

//   Características:
//   - Detecta ruta activa
//   - Adapta menú según autenticación
//   - Soporta layout móvil
//   - Soporta modo solo iconos
//   - Internacionalización integrada
// ================================================== */

// const ACTIVE_STYLE = { color: 'var(--color-button-hover)' };

// /**
//  * Hook: useActivePath
//  * Obtiene el segmento base del path actual.
//  * Ejemplo:
//  *   /dashboard/settings → /dashboard
//  */
// const useActivePath = (): string => {
//   const pathname = usePathname();
//   return `/${pathname.split('/')[1]}`;
// };

// /**
//  * Hook: useNavItems
//  * Retorna los ítems del menú según estado de autenticación.
//  */
// const useNavItems = (): NavItem[] => {
//   const { data } = useVerifyProfileQuery(null, {
//     refetchOnMountOrArgChange: true,
//     refetchOnFocus: true
//   });

//   return navItems(
//     data?.isAuth ?? false,
//     data?.role
//   ) as NavItem[];

// };

// /**
//  * MenuLinks Component
//  *
//  * Props:
//  * - links: enlaces secundarios
//  * - isPhone: layout móvil
//  * - onlyIcons: renderiza solo iconos
//  */
// export const MenuLinks: React.FC<MenuProps> = ({
//   links = [],
//   isPhone = false,
//   onlyIcons = false,
// }) => {
//   const { language } = useLanguage();
//   const pathname = usePathname();
//   const basePath = useActivePath();
//   const NAV_ITEMS = useNavItems();

//   const containerClass = isPhone
//     ? styles['menu__container--phone']
//     : styles['menu__container'];

//   return (
//     <nav className={containerClass} aria-label="Main navigation">
//       {/* {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
//         // const isActive = path === basePath;
//         const isActive = pathname.startsWith(path);

//         return (
//           <Link
//             key={path}
//             href={path}
//             // style={isActive ? ACTIVE_STYLE : {}}
//             className={clsx(
//               styles.menu__item,
//               isActive && styles['menu__item--active']
//             )}
//             aria-current={isActive ? 'page' : undefined}
//           >
//             <Icon className={styles['icon']} aria-hidden />
//             {!onlyIcons && label[language]}
//           </Link>
//         );
//       })} */}
//       {/* const pathname = usePathname(); */}

//       {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
//         const isActive = pathname.startsWith(path);

//         return (
//           <Link
//             key={path}
//             href={path}
//             className={clsx(
//               styles.menu__item,
//               isActive && styles['menu__item--active']
//             )}
//           >
//             <Icon className={styles['icon']} />
//             {!onlyIcons && label[language]}
//           </Link>
//         );
//       })}

//       {links.length > 0 && (
//         <div className={styles['menu__container--links']}>
//           {links.map(({ path, title }) => {
//             const isActive = path === pathname;

//             return (
//               <Link
//                 key={path}
//                 href={path}
//                 style={isActive ? ACTIVE_STYLE : {}}
//                 aria-current={isActive ? 'page' : undefined}
//               >
//                 {title[language]}
//               </Link>
//             );
//           })}
//         </div>
//       )}
//     </nav>
//   );
// };