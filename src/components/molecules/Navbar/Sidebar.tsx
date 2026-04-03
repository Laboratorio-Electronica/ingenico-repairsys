'use client';

import { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { MenuLinks } from './MenuLinks';
import styles from './Navbar.module.scss';
import { Button } from '@/components/atom/Button/Button';
import SettingsButton from '@/components/organisms/settings/SettingsButton';

interface SidebarProps {
  lang: 'es' | 'en';
  links?: {
    path: string;
    title: {
      es: string;
      en: string;
    };
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({ lang, links = [] }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => setIsExpanded(prev => !prev);

  

  const sidebarClass = `${styles.sidebar} ${
    isExpanded ? styles['sidebar--expanded'] : ''
  }`;

  const ToggleIcon = isExpanded ? FiChevronLeft : FiChevronRight;

  return (
    <aside className={sidebarClass}>

      {/* <div className={styles.sidebar__logo}>
        <img src="/logo.png" alt="Calibrap" />
      </div> */}

      {/* NAV */}
      <div className={styles['sidebar__top-section']}>
        <MenuLinks onlyIcons={!isExpanded} />
      </div>

      {/* WORKSTATION */}
      {/* <div className={isExpanded ? styles.sidebar__workstation : ''}>
        {isExpanded && (
          <>
            <strong>{workstation || 'Sin estación'}</strong>
            <span>Activa</span>
          </>
        )}
      </div> */}

      {/* TOGGLE */}
      <Button
        onClick={toggleSidebar}
        className={styles.sidebar__toggle}
      >
        <ToggleIcon />
      </Button>
    </aside>
  );
};

export default Sidebar;

// 'use client';

// import { useState } from 'react';
// import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
// import { MenuLinks } from './MenuLinks';
// import styles from './Navbar.module.scss';
// import { Button } from '@/components/atom/Button/Button';

// interface SidebarProps {
//   lang: 'es' | 'en';
// }

// const sidebarTexts = {
//   expand: {
//     es: 'Expandir barra lateral',
//     en: 'Expand sidebar',
//   },
//   collapse: {
//     es: 'Colapsar barra lateral',
//     en: 'Collapse sidebar',
//   },
//   aside: {
//     es: 'Barra lateral de navegación',
//     en: 'Navigation sidebar'
//   }
// };

// /**
//  * `Sidebar` component
//  *
//  * Renders a collapsible sidebar containing navigation links.
//  * Includes a toggle button to expand/collapse the sidebar.
//  *
//  * @param lang - Language code for rendering localized text.
//  */
// export const Sidebar: React.FC<SidebarProps> = ({ lang  }) => {
//   const [isExpanded, setIsExpanded] = useState(true);

//   const toggleSidebar = () => setIsExpanded(prev => !prev);

//   const sidebarClass = `${styles.sidebar} ${isExpanded ? styles['sidebar--expanded'] : ''}`;
//   const toggleLabel = isExpanded ? sidebarTexts.collapse[lang] : sidebarTexts.expand[lang];
//   const ToggleIcon = isExpanded ? FiChevronLeft : FiChevronRight;

//   return (
//     <aside className={sidebarClass} aria-label={sidebarTexts.aside[lang]}>
//       {/* Navigation links */}
//       <div className={styles['sidebar__top-section']}>
//         <MenuLinks onlyIcons={!isExpanded} />
//       </div>

//       {/* Toggle sidebar */}
//       <Button
//         onClick={toggleSidebar}
//         aria-label={toggleLabel}
//         title={toggleLabel}
//         className={styles.sidebar__toggle}
//       >
//         <ToggleIcon />
//       </Button>
//     </aside>
//   );
// };

// export default Sidebar;