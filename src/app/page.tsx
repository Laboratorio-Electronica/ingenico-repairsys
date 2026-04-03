import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/home');
}

// import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';
// import { HomeClient } from './HomeClient';

// function parseJwt(token: string) {
//   try {
//     const base64 = token.split('.')[1];
//     const decoded = Buffer.from(base64, 'base64').toString();
//     return JSON.parse(decoded);
//   } catch {
//     return null;
//   }
// }

// export default async function HomePage() {
//   const cookieStore = await cookies();
//   const token = cookieStore.get('authToken')?.value;

//   if (!token) {
//     redirect('/login');
//   }

//   const payload = parseJwt(token!);

//   if (!payload) {
//     redirect('/login');
//   }

//   const user = {
//     name: payload.username,
//     role: payload.role,
//   };

//   return <HomeClient />;
// }

// // import { Metadata } from 'next';
// // // import HomeClient from './HomeClient';
// // import TorqueClient from './calibration/torque/TorqueClient';

// // /**
// //  * Metadata estática de la página.
// //  * - canonical: evita contenido duplicado y mejora SEO.
// //  */
// // export const metadata: Metadata = {
// //   alternates: {
// //     canonical: 'https://krlozmedina.dev',
// //   },
// // };

// // /**
// //  * Componente de página (Server Component por defecto).
// //  * Delegará la lógica y UI interactiva a HomeClient.
// //  */
// // export const Page = () => {
// //   return <HomeClient />;
// //   // return <TorqueClient />;
// // };

// // export default Page;
