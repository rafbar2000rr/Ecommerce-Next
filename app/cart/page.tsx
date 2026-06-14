// Página del carrito de compras.
//
// Muestra el título de la página.
// Renderiza el componente CartView,
// que contiene toda la lógica y la interfaz
// del carrito de compras.

import CartView from "@/features/cart/components/CartView"
// Componente encargado de mostrar y gestionar el carrito

export default function CartPage() {
  // Componente de página de Next.js

  return (

    <main className="p-6">
      {/* Contenedor principal con padding */}

      <h1 className="text-2xl font-bold mb-4">
        Carrito de compras
      </h1>
      {/* Título de la página */}

      <CartView />
      {/* Componente que muestra los productos del carrito */}

    </main>

  )
}