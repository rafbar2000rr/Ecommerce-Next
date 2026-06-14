// ==========================================
// ORDER STATUS TRACKER
// Componente visual que muestra el progreso
// de una orden (paid → shipped → delivered).
// Resalta el paso actual y los ya completados.
// ==========================================

"use client" // Indica que es un Client Component

type Props = {
  status: string // Estado actual de la orden
}

const steps = ["paid", "shipped", "delivered"] // Flujo de estados permitidos

export default function OrderStatusTracker({ status }: Props) {
  const currentIndex = steps.indexOf(status) // Obtiene la posición del estado actual

  return (
    <div className="flex items-center justify-between w-full max-w-md">
      {/* Contenedor principal del tracker */}

      {steps.map((step, index) => {
        const isCompleted = index < currentIndex // Paso ya completado
        const isActive = index === currentIndex // Paso actual

        return (
          <div
            key={step}
            className="flex-1 flex flex-col items-center relative"
          >
            {/* Contenedor de cada paso */}

            {/* LINEA */}
            {index !== steps.length - 1 && (
              <div
                className={`absolute top-4 left-1/2 w-full h-1
                ${
                  index < currentIndex
                    ? "bg-green-500" // Línea completada
                    : "bg-gray-300" // Línea pendiente
                }`}
              />
            )}

            {/* CIRCULO */}
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full z-10
              ${
                isCompleted
                  ? "bg-green-500 text-white" // Paso completado
                  : isActive
                  ? "bg-blue-500 text-white" // Paso actual
                  : "bg-gray-300 text-gray-600" // Paso pendiente
              }`}
            >
              {isCompleted
                ? "✓" // Muestra check si ya pasó
                : index + 1 // Muestra número del paso
              }
            </div>

            {/* LABEL */}
            <p className="text-xs mt-2 capitalize">
              {step}
            </p>
            {/* Nombre del estado */}
          </div>
        )
      })}
    </div>
  )
}