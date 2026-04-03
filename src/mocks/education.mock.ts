export interface EducationItem {
  id: number
  url: string
  alt: string
  logo: string
  titulo: string
  title: string
}

export const educationData: EducationItem[] = [
  {
    id: 1,
    url: 'https://www.udistrital.edu.co/inicio',
    alt: 'UD',
    logo: 'https://i.imgur.com/Hkn5iBH.png',
    titulo: 'Ingeniero en Control y Automatización',
    title: 'Control and Automation Engineer'
  },
  {
    id: 2,
    url: 'https://app.aluracursos.com/',
    alt: 'Alura Latam',
    logo: 'https://i.imgur.com/DSl3dDo.png',
    titulo: 'Desarrollador BackEnd',
    title: 'BackEnd Developer'
  },
  {
    id: 3,
    url: 'https://www.udistrital.edu.co/inicio',
    alt: 'UD',
    logo: 'https://i.imgur.com/Hkn5iBH.png',
    titulo: 'Tecnólogo en Electrónica',
    title: 'Electronic Technologist'
  }
]
