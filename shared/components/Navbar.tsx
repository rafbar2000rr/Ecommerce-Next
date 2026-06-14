// ==========================================
// NAVBAR
// Componente de navegación principal.
// Muestra enlaces, carrito, usuario autenticado
// y permite cerrar sesión.
// ==========================================

"use client" // Indica que es un Client Component

import Link from "next/link" // Navegación entre páginas
import { useCart } from "@/features/cart/context/CartContext" // Contexto del carrito
import { useUser } from "@/hooks/useUser" // Hook para obtener usuario logueado
import { useRouter } from "next/navigation" // Navegación programática
import { useQueryClient } from "@tanstack/react-query" // Cliente global de React Query

export default function Navbar() {
  const { cart, openCart, clearCart } = useCart() // Datos y acciones del carrito
  const { data: user, isLoading } = useUser() // Usuario actual
  const router = useRouter() // Router de Next.js
  const queryClient = useQueryClient() // Cliente de caché de React Query

  const totalItems = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  ) // Calcula cantidad total de productos del carrito

  // 🔥 LOGOUT PRO
  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" }) // Elimina cookie de sesión

      queryClient.setQueryData(["me"], null) // Limpia usuario en caché

      clearCart() // Limpia carrito local y backend

      router.push("/") // Redirige al home

    } catch (error) {
      console.error("Logout error:", error) // Muestra error en consola
    }
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
      {/* Barra superior fija */}
      
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Contenedor principal */}

        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold"
        >
          MyStore
        </Link>

        <div className="flex items-center gap-6">
          {/* Menú de navegación */}

          <Link href="/">
            Home
          </Link>

          {user && (
            <Link href="/orders">
              My Orders
            </Link>
          )}
          {/* Solo visible si hay usuario */}

          {/* 🛒 Carrito */}
          <button
            onClick={openCart}
            className="relative text-2xl"
          >
            🛒

            {totalItems > 0 && (
              <span
                className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
              >
                {totalItems}
              </span>
            )}
            {/* Badge con cantidad de productos */}
          </button>

          {/* 🔐 Auth */}
          {isLoading ? (
            <span className="text-sm text-gray-400">
              ...
            </span>
          ) : !user ? (
            <Link
              href="/login"
              className="text-sm bg-black text-white px-3 py-1 rounded"
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              {/* Usuario autenticado */}

              <span className="text-sm">
                {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:underline"
              >
                Logout
              </button>
            </div>
          )}

        </div>
      </div>
    </nav>
  )
}