export interface ExperienceItem {
  id: number
  company: string
  role: {
    es: string
    en: string
  }
  duration: string
  description: {
    es: string
    en: string
  }
}

export const experienceData: ExperienceItem[] = [
  {
    id: 1,
    company: 'Tech Solutions Inc.',
    role: {
      es: 'Desarrollador Frontend',
      en: 'Frontend Developer'
    },
    duration: 'Jan 2020 - Present',
    description: {
      es: 'Desarrollo y mantenimiento de interfaces usando React y TypeScript.',
      en: 'Developed and maintained user interfaces using React and TypeScript.'
    }
  },
  {
    id: 2,
    company: 'Web Innovators',
    role: {
      es: 'Desarrollador Junior',
      en: 'Junior Developer'
    },
    duration: 'Jun 2018 - Dec 2019',
    description: {
      es: 'Construcción de sitios web responsivos con HTML, CSS y JavaScript.',
      en: 'Built responsive websites using HTML, CSS, and JavaScript.'
    }
  }
]
