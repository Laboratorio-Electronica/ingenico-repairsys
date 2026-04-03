---
name: ✨ Solicitud de Nueva Funcionalidad
description: Sugiere una idea o mejora para Repair Sys.
title: "[FEATURE] - "
labels: ["enhancement"]
assignees: ["KrlozMedina"]

body:
  - type: markdown
    attributes:
      value: |
        Gracias por proponer una mejora para **Repair Sys** 🚀  
        Completa la información para evaluar correctamente la funcionalidad.

  - type: textarea
    id: que-funcionalidad
    attributes:
      label: ¿Qué funcionalidad quieres?
      description: Describe la nueva funcionalidad o mejora.
      placeholder: "Agregar filtros avanzados para historial de calibraciones..."
    validations:
      required: true

  - type: dropdown
    id: alcance
    attributes:
      label: Área afectada
      options:
        - Calibración
        - Inventario
        - Auditoría
        - Usuarios
        - Reportes
        - API
        - UI/UX

  - type: dropdown
    id: prioridad
    attributes:
      label: Prioridad
      options:
        - Baja
        - Media
        - Alta
        - Crítica

  - type: textarea
    id: motivo
    attributes:
      label: ¿Por qué es necesaria?
      description: Explica el problema que resuelve o el valor que aporta.

  - type: textarea
    id: impacto
    attributes:
      label: Impacto esperado
      description: ¿A quién afecta y cómo mejora el flujo?

  - type: textarea
    id: criterios
    attributes:
      label: Criterios de aceptación
      placeholder: |
        - [ ] Funcionalidad implementada
        - [ ] Validaciones correctas
        - [ ] Integración con API
        - [ ] Pruebas realizadas

  - type: textarea
    id: notas-extra
    attributes:
      label: Notas adicionales