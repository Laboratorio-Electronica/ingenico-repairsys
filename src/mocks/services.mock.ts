export interface ServiceItem {
  id: number;
  name: { es: string; en: string };
  description: { es: string; en: string };
}

export const servicesData: ServiceItem[] = [
  { id: 1, name: { es: 'Desarrollo Web', en: 'Web Development' }, description: { es: 'Creación de sitios web modernos y responsivos.', en: 'Building modern and responsive websites.' } },
  { id: 2, name: { es: 'Aplicaciones Móviles', en: 'Mobile Applications' }, description: { es: 'Desarrollo de aplicaciones móviles para iOS y Android.', en: 'Developing mobile apps for iOS and Android.' } },
  { id: 3, name: { es: 'Consultoría Técnica', en: 'Technical Consulting' }, description: { es: 'Asesoramiento en tecnología y mejores prácticas.', en: 'Technology consulting and best practices guidance.' } },
  { id: 4, name: { es: 'Diseño UI/UX', en: 'UI/UX Design' }, description: { es: 'Diseño de interfaces atractivas y fáciles de usar.', en: 'Design of attractive and user-friendly interfaces.' } },
];
