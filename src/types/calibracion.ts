export interface Banco {
  id: number
  nombre: string
}

export interface Atornillador {
  id: number
  serie: string
  modelo: string
  bancoId: number
}

export interface ModeloEquipo {
  id: number
  nombre: string
  familia: string
}

export interface Torque {
  id: number
  familia: string
  torque: number
  tolerancia: number
  uso: string
}

export interface CalibracionRegistro {
  id: number
  fecha: string
  tecnico: string
  banco: string
  modeloEquipo: string
  familiaEquipo: string
  serieAtornillador: string
  modeloAtornillador: string
  torqueEsperado: number
  torqueAplicado: number
  tolerancia: number
  ok: boolean
  observaciones?: string
  imagenValidacion?: string | null
  imagenMedicion?: string | null
}