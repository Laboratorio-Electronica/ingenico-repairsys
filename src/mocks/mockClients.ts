// /lib/mockClients.ts
export const CLIENTS_MOCK = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: { es: `Cliente ${i + 1}`, en: `Client ${i + 1}` },
  logo: `/assets/logos/client-${(i % 5) + 1}.png`,
  description: {
    es: `Descripción del Cliente ${i + 1} en español.`,
    en: `Description of Client ${i + 1} in English.`,
  },
}));
