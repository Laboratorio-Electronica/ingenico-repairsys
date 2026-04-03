type Segment = {
  x1: number
  y1: number
  x2: number
  y2: number
}

type SegmentMap = Record<string, Segment>
type SegmentState = Record<string, boolean>
type DigitMap = Record<string, number>

export function decodeSevenSegmentAdvanced(
  imageData: ImageData,
  x: number,
  y: number,
  ancho: number,
  alto: number
): number | null {

  const segmentos: SegmentMap = {
    a: { x1: 0.2, y1: 0.1, x2: 0.8, y2: 0.2 },
    b: { x1: 0.8, y1: 0.2, x2: 0.9, y2: 0.5 },
    c: { x1: 0.8, y1: 0.5, x2: 0.9, y2: 0.8 },
    d: { x1: 0.2, y1: 0.8, x2: 0.8, y2: 0.9 },
    e: { x1: 0.1, y1: 0.5, x2: 0.2, y2: 0.8 },
    f: { x1: 0.1, y1: 0.2, x2: 0.2, y2: 0.5 },
    g: { x1: 0.2, y1: 0.45, x2: 0.8, y2: 0.55 }
  }

  const estado: SegmentState = {}

  for (const seg in segmentos) {
    const s = segmentos[seg]

    const sx = Math.floor(x + ancho * s.x1)
    const sy = Math.floor(y + alto * s.y1)
    const sw = Math.max(1, Math.floor(ancho * (s.x2 - s.x1)))
    const sh = Math.max(1, Math.floor(alto * (s.y2 - s.y1)))

    let suma = 0
    let count = 0

    for (let py = sy; py < sy + sh; py++) {
      for (let px = sx; px < sx + sw; px++) {
        const idx = (py * imageData.width + px) * 4

        if (idx >= 0 && idx < imageData.data.length) {
          suma += imageData.data[idx]
          count++
        }
      }
    }

    const brillo = count > 0 ? suma / count : 255
    estado[seg] = brillo < 128
  }

  const digitos: DigitMap = {
    "a,b,c,d,e,f": 0,
    "b,c": 1,
    "a,b,d,e,g": 2,
    "a,b,c,d,g": 3,
    "b,c,f,g": 4,
    "a,c,d,f,g": 5,
    "a,c,d,e,f,g": 6,
    "a,b,c": 7,
    "a,b,c,d,e,f,g": 8,
    "a,b,c,d,f,g": 9
  }

  const activos: string[] = []

  for (const seg in estado) {
    if (estado[seg]) activos.push(seg)
  }

  activos.sort()

  const clave = activos.join(",")

  return digitos[clave] !== undefined ? digitos[clave] : null
}

// export function decodeSevenSegment(activeSegments: string[]) {

//   const digits: Record<string, number> = {

//     'a,b,c,d,e,f': 0,
//     'b,c': 1,
//     'a,b,d,e,g': 2,
//     'a,b,c,d,g': 3,
//     'b,c,f,g': 4,
//     'a,c,d,f,g': 5,
//     'a,c,d,e,f,g': 6,
//     'a,b,c': 7,
//     'a,b,c,d,e,f,g': 8,
//     'a,b,c,d,f,g': 9
//   }

//   const key = activeSegments.sort().join(',')

//   return digits[key] ?? null
// }