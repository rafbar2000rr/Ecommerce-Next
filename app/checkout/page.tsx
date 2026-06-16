// Página de Checkout.
//
// Muestra el formulario de envío.
// Muestra el resumen de la compra.
// Valida los datos ingresados.
// Envía la orden al backend.
// Limpia el carrito después de una compra exitosa.
// Redirige a la página de éxito.

"use client" // Este componente se ejecuta en el navegador

import { useCart } from "@/features/cart/context/CartContext" // Hook para acceder al carrito
import { useState } from "react" // Hook para estado local
import { useRouter } from "next/navigation" // Navegación programática
import { useMutation, useQueryClient } from "@tanstack/react-query" // React Query
import { apiCall } from "@/lib/api" // Función auxiliar para llamadas a API

export default function CheckoutPage() {

  const {
    cart,
    total,
    clearCart,
  } = useCart()
  // Obtiene productos, total y función para vaciar carrito

  const router = useRouter()
  // Permite navegar a otras páginas

  const queryClient = useQueryClient()
  // Permite invalidar cachés de React Query

  const [form, setForm] = useState({

    name: "",
    // Nombre completo

    email: "",
    // Correo

    address: "",
    // Dirección de envío

  })

  const [error, setError] = useState("")
  // Mensaje de error mostrado al usuario

  const handleChange = (e: any) => {

    const {
      name,
      value,
    } = e.target
    // Obtiene nombre y valor del input

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Actualiza el campo correspondiente

    setError("")
    // Limpia errores al escribir

  }

  // 🔥 MUTATION
  const mutation = useMutation({

    mutationFn: async (orderData: any) => {

      const res = await apiCall(

        "/api/orders",

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(orderData),
        }

      )
      // Envía la orden al backend

      const data = await res.json()
      // Obtiene respuesta

      if (res.status === 401) {

        throw new Error("UNAUTHORIZED")
        // Usuario no autenticado

      }

      if (!res.ok) {

        throw new Error(
          data.error ||
          "Checkout failed"
        )
        // Otro error del servidor

      }

      return data
      // Devuelve la orden creada

    },

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["orders"],
      })
      // Actualiza caché de órdenes

      clearCart()
      // Vacía el carrito

      router.push("/success")
      // Redirige a página de éxito

    },

  })

  // 🔐 Submit del checkout
  const handleSubmit = () => {

    // Validación del formulario
    if (
      !form.name ||
      !form.email ||
      !form.address
    ) {

      setError("Por favor completa todos los campos")
      return

    }

    // Validación del carrito
    if (cart.length === 0) {

      setError("Tu carrito está vacío")
      return

    }

    mutation.mutate(

      {

        customer: form,
        // Datos del cliente

        items: cart,
        // Productos

        total,
        // Total actual

      },

      {

        onError: (err: any) => {

          if (
            err.message ===
            "UNAUTHORIZED"
          ) {

            router.push("/login")
            // Redirige al login

            return

          }

          setError(err.message)
          // Muestra error

        },

      }

    )

  }

  return (

    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
      {/* Layout de dos columnas */}

      {/* FORMULARIO */}
      <div className="bg-white p-6 rounded-2xl shadow">

        <h2 className="text-xl font-bold mb-4">
          Información de envío
        </h2>

        {/* Error */}
        {error && (

          <p className="text-red-500 text-sm mb-3">
            {error}
          </p>

        )}

        <input

          name="name"

          value={form.name}
          // Input controlado

          placeholder="Nombre completo"

          className="w-full border p-2 rounded mb-3"

          onChange={handleChange}

        />

        <input

          name="email"

          type="email"

          value={form.email}
          // Input controlado

          placeholder="Correo electrónico"

          className="w-full border p-2 rounded mb-3"

          onChange={handleChange}

        />

        <input

          name="address"

          value={form.address}
          // Input controlado

          placeholder="Dirección"

          className="w-full border p-2 rounded mb-3"

          onChange={handleChange}

        />

        <button

          onClick={handleSubmit}

          disabled={mutation.isPending}
          // Deshabilitado durante la petición

          className={`w-full py-3 rounded-lg mt-4 disabled:opacity-50 font-semibold transition-all duration-300 flex items-center justify-center gap-2
            ${mutation.isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800 hover:scale-[1.02] cursor-pointer"
            }`}

        >

          {
            mutation.isPending
              ? "Procesando..."
                : "Realizar pedido"
          }

        </button>

      </div>

      {/* RESUMEN */}
      <div className="bg-white p-6 rounded-2xl shadow">

        <h2 className="text-xl font-bold mb-4">
          Order summary
        </h2>

        {cart.map((item) => (

          <div
            key={item.id}
            className="flex justify-between text-sm"
          >

            <span>
              {item.title} x{item.quantity}
            </span>

            <span>
              $
              {
                (
                  item.price *
                  item.quantity
                ).toFixed(2)
              }
            </span>

          </div>

        ))}

        <div className="border-t mt-4 pt-4 flex justify-between font-bold">

          <span>Total</span>

          <span>
            ${total.toFixed(2)}
          </span>

        </div>

      </div>

    </div>

  )
}