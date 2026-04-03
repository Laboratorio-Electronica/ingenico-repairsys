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