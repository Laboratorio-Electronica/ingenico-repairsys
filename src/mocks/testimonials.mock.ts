export interface TestimonialItem {
  id: number;
  name: string;
  role: { es: string; en: string };
  feedback: { es: string; en: string };
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: 1,
    name: "John Doe",
    role: { es: "Cliente", en: "Client" },
    feedback: {
      es: "Trabajar con este equipo fue una experiencia increíble. ¡El proyecto superó mis expectativas!",
      en: "Working with this team was an amazing experience. The project exceeded my expectations!"
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    role: { es: "Colaboradora", en: "Collaborator" },
    feedback: {
      es: "La colaboración fue fluida y el equipo fue altamente profesional durante todo el proyecto.",
      en: "The collaboration was seamless, and the team was highly professional throughout the project."
    },
  },
  {
    id: 3,
    name: "Carlos López",
    role: { es: "Cliente", en: "Client" },
    feedback: {
      es: "Gran atención al detalle y excelente comunicación. ¡Muy recomendable!",
      en: "Great attention to detail and excellent communication. Highly recommended!"
    },
  },
];
