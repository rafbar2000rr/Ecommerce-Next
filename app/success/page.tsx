// Página de éxito de compra.
//
// Se muestra después de completar una compra.
// Limpia el carrito automáticamente.
// Obtiene opcionalmente el ID de la orden desde la URL.
// Permite navegar a la lista de órdenes.
// Permite volver al catálogo para seguir comprando.

"use client" // Componente cliente

import { useEffect } from "react" // Hook para efectos secundarios
import {
  useRouter,
  useSearchParams,
} from "next/navigation" // Navegación y lectura de query params

import { useCart } from "@/features/cart/context/CartContext"
// Contexto global del carrito

export default function SuccessPage() {

  const router = useRouter()
  // Permite navegar entre páginas

  const params = useSearchParams()
  // Permite leer parámetros de la URL

  const { clearCart } = useCart()
  // Función para vaciar el carrito

  const orderId =
    params.get("orderId")
  // 👈 Obtiene el orderId si existe

  useEffect(() => {

    // 🔥 Limpiar carrito al llegar aquí

    clearCart()

  }, [])
  // Se ejecuta una sola vez al montar el componente

  return (

    <div
      className="
        flex flex-col
        items-center
        justify-center
        h-screen
        bg-gray-100
        text-center
      "
    >

      <div
        className="
          bg-white
          p-8
          rounded-2xl
          shadow-lg
          max-w-md
        "
      >

        {/* Ícono de éxito */}
        <div className="text-green-500 text-5xl mb-4">

          ✔

        </div>

        {/* Título */}
        <h1 className="text-2xl font-bold mb-2">

          Payment successful

        </h1>

        {/* Mensaje */}
        <p className="text-gray-500 mb-4">

          Your order has been placed successfully.

        </p>

        {/* 🧾 Order ID opcional */}
        {orderId && (

          <p className="text-xs text-gray-400 mb-6">

            Order ID: {orderId}

          </p>

        )}

        {/* Botones */}
        <div className="flex gap-3 justify-center">

          <button

            onClick={() =>
              router.push("/orders")
            }
            // Ir a historial de órdenes

            className="
              bg-black
              text-white
              px-6 py-2
              rounded-lg
            "

          >

            View Orders

          </button>

          <button

            onClick={() =>
              router.push("/")
            }
            // Volver al catálogo

            className="
              border
              px-6 py-2
              rounded-lg
            "

          >

            Continue Shopping

          </button>

        </div>

      </div>

    </div>

  )

}