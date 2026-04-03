export interface SkillCategory {
  id: number
  title: {
    es: string
    en: string
  }
  items: string[]
}

export const skillsCategoriesData: SkillCategory[] = [
  {
    id: 1,
    title: { es: 'Lenguajes de Programación', en: 'Programming Languages' },
    items: ['JavaScript', 'TypeScript', 'Python', 'Java']
  },
  {
    id: 2,
    title: { es: 'Tecnologías', en: 'Technologies' },
    items: ['React', 'Node.js', 'Express', 'MongoDB', 'Docker']
  },
  {
    id: 3,
    title: { es: 'Habilidades Blandas', en: 'Soft Skills' },
    items: [
      'Comunicación efectiva',
      'Trabajo en equipo',
      'Resolución de problemas',
      'Adaptabilidad'
    ]
  }
]
