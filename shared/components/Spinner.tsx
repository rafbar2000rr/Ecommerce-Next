// ==========================================
// SPINNER
// Componente de carga (loading spinner).
// Muestra una animación giratoria para
// indicar que una operación está en curso.
// ==========================================

export default function Spinner() {
  return (
    <div
      className="
        w-5 h-5                     // Ancho y alto de 20px
        border-2                    // Borde de 2px
        border-white                // Color del borde: blanco
        border-t-transparent        // Parte superior transparente
        rounded-full                // Forma circular
        animate-spin                // Animación de giro infinita
      "
    />
  )
}