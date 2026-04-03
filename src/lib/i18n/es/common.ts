export const common = {
  actions: {
    submit: "Enviar",
    cancel: 'Cancelar',
    delete: "Eliminar",
    download: 'Descargar',
    retry: 'Reintentar',
    reset: "Reiniciar",
    seeMore: "Ver más",
  },

  fields: {
    name: "Nombre",
    email: "Correo electrónico",
    subject: "Asunto",
    password: 'Contraseña',
  },

  navigation: {
    home: 'Ir al inicio',
    back: 'Regresar',
  },

  enums: {
    platforms: {
      WEB: "Web",
      MOBILE: "Mobil",
      DESKTOP: "Escritorio",
      IOT: "IoT",
      INDUSTRIAL: "Industrial",
      BACKEND: "BackEnd",
      API: "API"
    }
  },

  spinner: {
    message: 'Cargando, por favor espera...',
  },

  label: {
    logout: "Cerrar sesión"
  }
};

export type CommonLocale = typeof common;
