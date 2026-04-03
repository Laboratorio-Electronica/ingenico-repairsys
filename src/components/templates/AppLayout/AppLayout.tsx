'use client';

import React, { ReactNode } from 'react';
import styles from './AppLayout.module.scss';
import Sidebar from '@/components/molecules/Navbar/Sidebar';
import Header from '@/components/organisms/Headers/Header';
import SettingsButton from '@/components/organisms/settings/SettingsButton';
import { NoticeType, ROUTES_LIST } from '@/lib/config';
import { usePathname } from 'next/navigation';
import StatusNotice from '@/components/organisms/Notice/StatusNotice';
import { useTranslation } from '@/hooks/useTranslation';

interface Props {
  children: ReactNode;
}

const AppLayout: React.FC<Props> = ({
  children,
}) => {
  const path = usePathname();
  const { language } = useTranslation();

  const currentRoute = ROUTES_LIST.find(route => route.path === path);

  return (
    <div className={styles.layout}>

      {/* HEADER FULL WIDTH */}
      <Header/>

      {/* MAIN AREA */}
      <div className={styles.layout__main}>
        <Sidebar lang={language} />

        <section className={styles.layout__page}>
          {children}
        </section>
      </div>

      <SettingsButton isFloating />

      {currentRoute?.notice?.map((notice, index) => (
            <StatusNotice
              key={index}
              type={notice as NoticeType}
            />
          ))}

    </div>
  );
};

export default AppLayout;
