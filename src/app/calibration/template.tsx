'use client';

import { ReactNode } from 'react';
import AppLayout from '@/components/templates/AppLayout/AppLayout';

interface Props {
  children: ReactNode;
}

const Template: React.FC<Props> = ({
  children
}) => {
  return (
    <AppLayout>
      {children}
    </AppLayout>
  );
}

export default Template;

// 'use client';

// import { ReactNode } from 'react';
// import { usePathname } from 'next/navigation';

// // import MainLayout from '@/components/templates/MainLayout/MainLayout';
// import StatusNotice from '@/components/organisms/Notice/StatusNotice';

// import { NoticeType, ROUTES_LIST } from '@/lib/config';
// import { useTranslation } from '@/hooks/useTranslation';
// import AuthLayout from '@/components/templates/AppLayout/AppLayout';

// /**
//  * =========================================================
//  * Tipos auxiliares
//  * =========================================================
//  */

// /**
//  * Representa un texto multilingüe básico.
//  */
// type LocaleText = {
//   es: string;
//   en: string;
// };

// /**
//  * Estructura base de un enlace de navegación.
//  */
// type NavLink = {
//   title: LocaleText;
//   path: string;
// };

// /**
//  * =========================================================
//  * Utilidad para crear enlaces multilingües
//  * ---------------------------------------------------------
//  * Centraliza la creación de objetos NavLink
//  * evitando repetición manual de estructura.
//  * =========================================================
//  */
// const createNavLink = (es: string, en: string, path: string): NavLink => ({
//   title: { es, en },
//   path,
// });

// /**
//  * =========================================================
//  * Enlaces específicos de la sección Projects
//  * =========================================================
//  */
// const NAV_LINKS_PROJECT: NavLink[] = [
//   createNavLink("Servicios", "Services", "/projects/services"),
//   createNavLink("Testimonios", "Testimonials", "/projects/testimonials"),
//   createNavLink("Casos de éxito", "Success Stories", "/projects/case-studies"),
// ];

// /**
//  * =========================================================
//  * Template (Projects Layout Wrapper)
//  * ---------------------------------------------------------
//  * Plantilla específica para páginas dentro de la sección
//  * de proyectos.
//  *
//  * Responsabilidades:
//  * - Determinar la ruta actual.
//  * - Resolver idioma activo.
//  * - Construir navegación con estado activo.
//  * - Determinar si la ruta requiere permisos.
//  * - Renderizar avisos (StatusNotice) definidos por la ruta.
//  * - Delegar estructura principal a MainLayout.
//  *
//  * Arquitectura:
//  * - ROUTES_LIST → fuente de verdad de rutas.
//  * - StatusNotice → renderizado dinámico por metadata.
//  * - MainLayout → layout estructural reutilizable.
//  * =========================================================
//  */
// export default function Template({ children }: { children: ReactNode }) {

//   /**
//    * Ruta actual desde el router de Next.js.
//    */
//   const path = usePathname();

//   /**
//    * Idioma activo del sistema.
//    */
//   const { language } = useTranslation();

//   /**
//    * Busca configuración de la ruta actual
//    * dentro del listado global.
//    */
//   const currentRoute = ROUTES_LIST.find(route => route.path === path);

//   /**
//    * Genera navegación con bandera isActive
//    * comparando contra la ruta actual.
//    */
//   const linksWithActive = NAV_LINKS_PROJECT.map(link => ({
//     ...link,
//     isActive: link.path === path,
//   }));

//   return (
//     <AuthLayout
//       lang={language}
//       links={linksWithActive}
//       // isAdmin={currentRoute?.isProtected ?? false}
//     >

//       {/* Renderiza avisos definidos por la ruta */}
//       {currentRoute?.notice?.map((notice, index) => (
//         <StatusNotice
//           key={index}
//           type={notice as NoticeType}
//         />
//       ))}

//       {/* Contenido principal de la página */}
//       {children}

//     </AuthLayout>
//   );
// }