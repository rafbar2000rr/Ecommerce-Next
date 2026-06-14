// ==========================================
// ORDER TRACKING
// Componente visual que muestra el progreso
// de una orden mediante una barra de avance.
// Resalta los pasos completados según el
// estado actual (paid → shipped → delivered).
// ==========================================

export default function OrderTracking({
  status,
}: {
  status: string // Estado actual de la orden
}) {
  const steps = ["paid", "shipped", "delivered"] // Flujo de estados posibles

  const currentStep = steps.indexOf(status) // Obtiene la posición del estado actual

  return (
    <div className="mb-8">
      {/* Contenedor principal */}

      {/* Steps */}
      <div className="flex justify-between items-center relative">
        {/* Contenedor de los pasos */}

        {steps.map((step, index) => (
          <div
            key={step}
            className="flex-1 text-center"
          >
            {/* Cada paso del proceso */}

            {/* Circle */}
            <div
              className={`mx-auto w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold
              ${
                index <= currentStep
                  ? "bg-green-500 text-white" // Paso completado o actual
                  : "bg-gray-200 text-gray-500" // Paso pendiente
              }`}
            >
              {index + 1}
              {/* Número del paso */}
            </div>

            {/* Label */}
            <p className="text-xs mt-2 capitalize">
              {step}
            </p>
            {/* Nombre del estado */}
          </div>
        ))}

        {/* Progress line */}
        <div
          className="absolute top-4 left-0 w-full h-1 bg-gray-200 -z-10"
        />
        {/* Línea gris de fondo */}

        <div
          className="absolute top-4 left-0 h-1 bg-green-500 -z-10 transition-all duration-500"
          style={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
            // Calcula porcentaje completado:
            // paid = 0%
            // shipped = 50%
            // delivered = 100%
          }}
        />
        {/* Barra verde de progreso */}
      </div>
    </div>
  )
}