self.addEventListener('fetch', (event) => {
  const { request } = event;

  // ❗ SOLO requests válidos
  if (
    request.method !== 'GET' ||
    !request.url.startsWith('http')
  ) {
    return;
  }

  // 🔥 CRÍTICO: NO interceptar navegación (HTML)
  if (request.mode === 'navigate') {
    return;
  }

  const url = new URL(request.url);

  // 🚫 NO interceptar API
  if (url.pathname.startsWith('/api')) {
    return;
  }

  // ================================
  // SOLO assets (cache)
  // ================================
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/icons') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js')
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;

        return fetch(request).then((res) => {
          if (!res || res.status !== 200 || res.type !== 'basic') {
            return res;
          }

          const clone = res.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clone);
          });

          return res;
        });
      })
    );
  }
});

// const CACHE_NAME = 'repairsys-v1';

// const STATIC_ASSETS = [
//   '/',
//   '/manifest.json',
//   '/icons/icon-192.png',
//   '/icons/icon-512.png',
// ];

// /* ================================
//   INSTALL
// ================================ */
// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll(STATIC_ASSETS);
//     })
//   );

//   self.skipWaiting();
// });

// /* ================================
//   ACTIVATE
// ================================ */
// self.addEventListener('activate', (event) => {
//   event.waitUntil(
//     caches.keys().then((keys) =>
//       Promise.all(
//         keys.map((key) => {
//           if (key !== CACHE_NAME) {
//             return caches.delete(key);
//           }
//         })
//       )
//     )
//   );

//   self.clients.claim();
// });

// /* ================================
//   FETCH
// ================================ */
// self.addEventListener('fetch', (event) => {
//   const { request } = event;

//   // ✅ FILTRO CRÍTICO (evita error chrome-extension)
//   if (
//     request.method !== 'GET' ||
//     !request.url.startsWith('http')
//   ) {
//     return;
//   }

//   // ================================
//   // API → network first
//   // ================================
//   if (request.url.includes('/api/')) {
//     event.respondWith(
//       fetch(request)
//         .then((res) => {
//           const clone = res.clone();

//           caches.open(CACHE_NAME).then((cache) => {
//             cache.put(request, clone);
//           });

//           return res;
//         })
//         .catch(() => caches.match(request))
//     );
//     return;
//   }

//   // ================================
//   // ASSETS → cache first
//   // ================================
//   event.respondWith(
//     caches.match(request).then((cached) => {
//       if (cached) return cached;

//       return fetch(request).then((res) => {
//         // ❗ solo cachear respuestas válidas
//         if (!res || res.status !== 200 || res.type !== 'basic') {
//           return res;
//         }

//         const clone = res.clone();

//         caches.open(CACHE_NAME).then((cache) => {
//           cache.put(request, clone);
//         });

//         return res;
//       });
//     })
//   );
// });

// // const CACHE_NAME = 'repairsys-v1';

// // const STATIC_ASSETS = [
// //   '/',
// //   '/manifest.json',
// //   '/icons/icon-192.png',
// //   '/icons/icon-512.png',
// // ];

// // /* ================================
// //   INSTALL
// // ================================ */
// // self.addEventListener('install', (event) => {
// //   event.waitUntil(
// //     caches.open(CACHE_NAME).then((cache) => {
// //       return cache.addAll(STATIC_ASSETS);
// //     })
// //   );

// //   self.skipWaiting();
// // });

// // /* ================================
// //   ACTIVATE
// // ================================ */
// // self.addEventListener('activate', (event) => {
// //   event.waitUntil(
// //     caches.keys().then((keys) =>
// //       Promise.all(
// //         keys.map((key) => {
// //           if (key !== CACHE_NAME) {
// //             return caches.delete(key);
// //           }
// //         })
// //       )
// //     )
// //   );

// //   self.clients.claim();
// // });

// // /* ================================
// //   FETCH (cache-first para assets)
// // ================================ */
// // self.addEventListener('fetch', (event) => {
// //   const { request } = event;

// //   // Solo GET
// //   if (request.method !== 'GET') return;

// //   // API → network first
// //   if (request.url.includes('/api/')) {
// //     event.respondWith(
// //       fetch(request)
// //         .then((res) => {
// //           const clone = res.clone();
// //           caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
// //           return res;
// //         })
// //         .catch(() => caches.match(request))
// //     );
// //     return;
// //   }

// //   // Assets → cache first
// //   event.respondWith(
// //     caches.match(request).then((cached) => {
// //       return (
// //         cached ||
// //         fetch(request).then((res) => {
// //           const clone = res.clone();
// //           caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
// //           return res;
// //         })
// //       );
// //     })
// //   );
// // });

// // // self.addEventListener('install', (event) => {
// // //   self.skipWaiting();
// // // });

// // // self.addEventListener('activate', (event) => {
// // //   self.clients.claim();
// // // });

// // // self.addEventListener('fetch', (event) => {
// // //   // luego puedes agregar cache
// // // });

// // // // self.addEventListener("install", (event) => {
// // // //   console.log("SW instalado");
// // // // });

// // // // self.addEventListener("fetch", (event) => {
// // // //   // básico, sin cache aún
// // // // });