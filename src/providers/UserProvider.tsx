'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface User {
  isAuth: boolean;
  userId: string; // 🔥 CAMBIO
  username: string;
  role: string;
}

interface UserContextProps {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/v1/auth', {
        credentials: 'include', // ✅ FIX
        cache: 'no-store',      // ✅ FIX
      });

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data = await res.json();

      if (data?.isAuth) {
        setUser(data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();

    const handleRefresh = () => fetchUser();
    window.addEventListener('refreshUser', handleRefresh);

    return () => {
      window.removeEventListener('refreshUser', handleRefresh);
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        refreshUser: fetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }

  return context;
};

// 'use client';

// import { createContext, useContext, useEffect, useState } from 'react';

// interface User {
//   isAuth: boolean;
//   username: string;
//   role: string;
// }

// interface UserContextProps {
//   user: User | null;
//   loading: boolean;
//   refreshUser: () => Promise<void>;
// }

// const UserContext = createContext<UserContextProps | null>(null);

// export const UserProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   const fetchUser = async () => {
//     try {
//       const res = await fetch('/api/v1/auth', {
//         credentials: 'include', // ✅ FIX
//         cache: 'no-store',      // ✅ FIX
//       });

//       if (!res.ok) {
//         setUser(null);
//         return;
//       }

//       const data = await res.json();

//       if (data?.isAuth) {
//         setUser(data);
//       } else {
//         setUser(null);
//       }
//     } catch {
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUser();

//     const handleRefresh = () => fetchUser();
//     window.addEventListener('refreshUser', handleRefresh);

//     return () => {
//       window.removeEventListener('refreshUser', handleRefresh);
//     };
//   }, []);

//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         loading,
//         refreshUser: fetchUser,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const context = useContext(UserContext);

//   if (!context) {
//     throw new Error('useUser must be used within UserProvider');
//   }

//   return context;
// };

// // 'use client';

// // import { createContext, useContext, useEffect, useState } from 'react';

// // interface User {
// //   isAuth: boolean;
// //   username: string;
// //   role: string;
// // }

// // interface UserContextProps {
// //   user: User | null;
// //   loading: boolean;
// //   refreshUser: () => Promise<void>;
// // }

// // const UserContext = createContext<UserContextProps | null>(null);

// // export const UserProvider = ({ children }: { children: React.ReactNode }) => {
// //   const [user, setUser] = useState<User | null>(null);
// //   const [loading, setLoading] = useState(true);

// //   const fetchUser = async () => {
// //     try {
// //       const res = await fetch('/api/v1/auth');
// //       const data = await res.json();

// //       if (data?.isAuth) {
// //         setUser(data);
// //       } else {
// //         setUser(null);
// //       }
// //     } catch {
// //       setUser(null);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchUser();

// //     // 🔥 ESCUCHAR EVENTO GLOBAL
// //     const handleRefresh = () => fetchUser();

// //     window.addEventListener('refreshUser', handleRefresh);

// //     return () => {
// //       window.removeEventListener('refreshUser', handleRefresh);
// //     };
// //   }, []);

// //   return (
// //     <UserContext.Provider
// //       value={{
// //         user,
// //         loading,
// //         refreshUser: fetchUser,
// //       }}
// //     >
// //       {children}
// //     </UserContext.Provider>
// //   );
// // };

// // export const useUser = () => {
// //   const context = useContext(UserContext);

// //   if (!context) {
// //     throw new Error('useUser must be used within UserProvider');
// //   }

// //   return context;
// // };
