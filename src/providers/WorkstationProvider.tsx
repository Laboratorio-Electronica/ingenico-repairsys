'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { WorkstationModal } from './WorkstationModal';

interface Workstation {
  id: string;
  name: string;
  code: string;
}

interface WorkstationContextProps {
  workstation: Workstation | null;
  setWorkstation: (w: Workstation) => void;
  clearWorkstation: () => void;
}

const WorkstationContext = createContext<WorkstationContextProps | null>(null);

const PUBLIC_ROUTES = ['/login', '/unauthorized'];

export const WorkstationProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const [workstation, setWorkstation] = useState<Workstation | null>(null);
  const [loading, setLoading] = useState(true);

  const isPublicRoute = PUBLIC_ROUTES.some(route =>
    pathname.startsWith(route)
  );

  // 🔹 Leer cookie
  useEffect(() => {
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('workstation='));

    if (cookie) {
      try {
        const value = JSON.parse(cookie.split('=')[1]);
        setWorkstation(value);
      } catch {}
    }

    setLoading(false);
  }, []);

  // 🔥 LIMPIAR WORKSTATION (abre modal automáticamente)
  const clearWorkstation = () => {
    document.cookie = 'workstation=; path=/; max-age=0';
    setWorkstation(null);
  };

  if (loading) return null;

  return (
    <WorkstationContext.Provider
      value={{ workstation, setWorkstation, clearWorkstation }}
    >
      {/* 🔒 Bloqueo global */}
      {!workstation && !isPublicRoute && (
        <WorkstationModal onSuccess={setWorkstation} />
      )}

      {children}
    </WorkstationContext.Provider>
  );
};

export const useWorkstation = () => {
  const context = useContext(WorkstationContext);
  if (!context) {
    throw new Error('useWorkstation must be used within WorkstationProvider');
  }
  return context;
};

// 'use client';

// import { createContext, useContext, useEffect, useState } from 'react';
// import { usePathname } from 'next/navigation';
// import { WorkstationModal } from './WorkstationModal';
// // import { WorkstationModal } from '@/components/WorkstationModal';

// const WorkstationContext = createContext<any>(null);

// const PUBLIC_ROUTES = ['/login', '/unauthorized'];

// export const WorkstationProvider = ({ children }: any) => {
//   const pathname = usePathname();

//   const [workstation, setWorkstation] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

//   useEffect(() => {
//     const cookie = document.cookie
//       .split('; ')
//       .find(row => row.startsWith('workstation='));

//     if (cookie) {
//       try {
//         const value = JSON.parse(cookie.split('=')[1]);
//         setWorkstation(value);
//       } catch {}
//     }

//     setLoading(false);
//   }, []);

//   if (loading) return null;

//   return (
//     <WorkstationContext.Provider value={{ workstation, setWorkstation }}>
      
//       {/* 🔥 SOLO bloquear rutas privadas */}
//       {!workstation && !isPublicRoute && (
//         <WorkstationModal onSuccess={setWorkstation} />
//       )}

//       {children}
//     </WorkstationContext.Provider>
//   );
// };

// export const useWorkstation = () => useContext(WorkstationContext);
