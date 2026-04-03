import Link from 'next/link';
import styles from './not-found.module.scss';
import { ButtonLink } from '@/components/atom/ButtonLink/ButtonLink';

export default function NotFound() {
  return (
    <div className={styles['not-found__container']}>

      <div className={styles['not-found__code']}>
        404
      </div>

      <h1 className={styles['not-found__title']}>
        Página no encontrada
      </h1>

      <p className={styles['not-found__message']}>
        La página que estás buscando no existe o fue movida.
      </p>

      <div className={styles['not-found__actions']}>
        <ButtonLink href="/" className="button button--primary">
          Ir al inicio
        </ButtonLink>

        <ButtonLink variant='secondary' href="/login" className="button button--secondary">
          Ir al login
        </ButtonLink>
      </div>

      {/* <div className={styles['not-found__image']}>
        <img src="/404.svg" alt="Not found" />
      </div> */}

    </div>
  );
}

// /**
//  * ==================================================
//  * 🚫 404 - Not Found Page
//  * --------------------------------------------------
//  * Página personalizada para rutas inexistentes.
//  *
//  * Responsabilidades:
//  * - Renderizar mensaje 404 estilizado
//  * - Usar StatusTemplate como layout base
//  * - Ofrecer navegación de regreso al home
//  *
//  * No contiene:
//  * - Lógica de datos
//  * - Fetch
//  * - Estado
//  *
//  * SEO:
//  * - Next.js maneja automáticamente el status 404
//  *   cuando este archivo se llama not-found.tsx
//  * ==================================================
//  */

// import React from 'react';
// import Link from 'next/link';
// import StatusTemplate from '@/components/templates/StatusTemplate/StatusTemplate';
// import styles from './not-found.module.scss';

// const NotFound: React.FC = () => {
//   return (
//     <StatusTemplate status="notFound" withBackground>
      
//       {/* Código visual tipo "<404/>" */}
//       <h1 className={styles["not-found__title"]}>
//         {"<404/>"}
//       </h1>

//       {/* Simulación de etiqueta <p> */}
//       <div className={styles["not-found__paragraph"]}>
//         <span className={styles["not-found__sign"]}>&lt;</span>
//         <span className={styles["not-found__tag"]}>p</span>
//         <span className={styles["not-found__sign"]}>&gt;</span>
//       </div>

//       <p className={styles["not-found__text"]}>
//         Page not found!!
//       </p>

//       <div className={styles["not-found__paragraph"]}>
//         <span className={styles["not-found__sign"]}>&lt;/</span>
//         <span className={styles["not-found__tag"]}>p</span>
//         <span className={styles["not-found__sign"]}>&gt;</span>
//       </div>

//       {/* Simulación de etiqueta <Link> */}
//       <div className={styles["not-found__paragraph"]}>
//         <span className={styles["not-found__sign"]}>&lt;</span>
//         <span className={styles["not-found__tag"]}>Link</span>
//         <span className={styles["not-found__ref"]}>href</span>=
//         <span className={styles["not-found__tag"]}>{'{'}</span>

//         <Link
//           className={styles["not-found__link"]}
//           href="/"
//         >
//           /
//         </Link>

//         <span className={styles["not-found__tag"]}>{'}'}</span>
//         <span className={styles["not-found__sign"]}>&gt;</span>
//       </div>

//       <p className={styles["not-found__text"]}>
//         <Link
//           className={styles["not-found__link"]}
//           href="/"
//         >
//           Return to home
//         </Link>
//       </p>

//       <div className={styles["not-found__paragraph"]}>
//         <span className={styles["not-found__sign"]}>&lt;/</span>
//         <span className={styles["not-found__tag"]}>Link</span>
//         <span className={styles["not-found__sign"]}>&gt;</span>
//       </div>

//     </StatusTemplate>
//   );
// };

// export default NotFound;