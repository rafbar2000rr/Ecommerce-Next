// Botón para agregar productos al carrito.
//
// Recibe un producto como prop.
// Agrega el producto al carrito.
// Abre automáticamente el panel del carrito.
// Muestra una notificación temporal (Toast).
// Oculta la notificación después de 2 segundos.
// Debe ser Client Component porque usa estado y eventos.

"use client" // Componente cliente

import { useState } from "react"
// Hook para manejar estado local

import { useCart } from "@/features/cart/context/CartContext"
// Hook del contexto del carrito

import Toast from "@/shared/components/Toast"
// Componente de notificación temporal

export default function AddToCartButton({

  product,

}: any) {

  const {
    addToCart,
    openCart,
  } = useCart()
  // Obtiene funciones del carrito

  const [showToast, setShowToast] = useState(false)
  // Controla la visibilidad del Toast

  const handleAdd = () => {

    addToCart(product)
    // Agrega el producto al carrito

    openCart()
    // Abre el panel lateral del carrito

    setShowToast(true)
    // Muestra el Toast

    setTimeout(() => {

      setShowToast(false)
      // Oculta el Toast

    }, 2000)
    // Después de 2 segundos

  }

  return (

    <>

      <button

        onClick={handleAdd}
        // Ejecuta la lógica al hacer clic

        className="
          mt-6
          w-full
          bg-black
          text-white
          py-2
          rounded-lg
          transition
          cursor-pointer
          hover:scale-[1.02]
          hover:bg-slate-900
        "

      >

        Agregar al carrito

      </button>

      <Toast

        message="Producto añadido al carrito 🛒"
        // Texto mostrado en la notificación

        isVisible={showToast}
        // Determina si el Toast debe verse

      />

    </>

  )

}