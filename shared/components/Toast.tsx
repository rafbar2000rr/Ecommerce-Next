// ==========================================
// TOAST
// Componente de notificación temporal.
// Muestra un mensaje flotante en la esquina
// superior derecha con animación de entrada
// y salida.
// ==========================================

"use client" // Indica que es un Client Component

type Props = {
  message: string // Texto que mostrará el toast
  isVisible: boolean // Controla si el toast se ve o no
}

export default function Toast({
  message,
  isVisible,
}: Props) {
  return (
    <div
      className={`fixed top-5 right-5 z-50
      transform transition-all duration-300
      ${
        isVisible
          ? "translate-y-0 opacity-100" // Visible
          : "-translate-y-5 opacity-0" // Oculto
      }`}
    >
      {/* Contenedor flotante */}

      <div
        className="
          bg-black        // Fondo negro
          text-white      // Texto blanco
          px-4 py-2       // Padding horizontal y vertical
          rounded-lg      // Bordes redondeados
          shadow-lg       // Sombra
        "
      >
        {message}
        {/* Mensaje recibido por props */}
      </div>
    </div>
  )
}