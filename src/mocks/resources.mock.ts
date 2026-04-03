// /mocks/resources.ts
export type Resource = {
  id: string;
  title: string;
  description: string;
  link: string;
  category: 'frontend' | 'backend' | 'devops' | 'general';
};

export const resourcesMock: Resource[] = [
  {
    id: '1',
    title: 'React Docs',
    description: 'Documentación oficial de React.',
    link: 'https://react.dev',
    category: 'frontend',
  },
  {
    id: '2',
    title: 'MDN Web Docs',
    description: 'Referencia estándar de la web.',
    link: 'https://developer.mozilla.org',
    category: 'general',
  },
  {
    id: '3',
    title: 'Node.js Docs',
    description: 'Documentación oficial de Node.js.',
    link: 'https://nodejs.org/en/docs',
    category: 'backend',
  },
];
