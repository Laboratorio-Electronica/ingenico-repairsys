export interface ICalibration {

  id?: string

  technicianId: string

  bankId: string
  screwdriverId: string

  equipmentModelId: string

  expectedTorque: number
  appliedTorque: number
  tolerance: number

  status: 'OK' | 'NOK'

  validationImage?: string
  measurementImage?: string

  observations?: string

  createdAt?: Date
}