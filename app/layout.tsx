// Root Layout principal de la aplicación.
//
// Es el layout raíz que envuelve todas las páginas.
// Se ejecuta una sola vez y comparte elementos globales.
// Configura React Query.
// Configura el contexto global del carrito.
// Muestra el Navbar en todas las páginas.
// Muestra el CartDrawer en todas las páginas.
// Renderiza las páginas dentro de {children}.
// Importa los estilos globales.

import { CartProvider } from "@/features/cart/context/CartContext"
// Contexto global del carrito

import Navbar from "@/shared/components/Navbar"
// Barra de navegación principal

import CartDrawer from "@/features/cart/components/CartDrawer"
// Panel lateral del carrito

import Providers from "./providers"
// 👈 Configuración global de React Query

import "./globals.css"
// Estilos globales de toda la aplicación

export default function RootLayout({

  children,

}: {

  children: React.ReactNode

}) {

  return (

    <html lang="en">
      {/* Documento HTML principal */}

      <body className="bg-gray-100">
        {/* Fondo global de la aplicación */}

        <Providers>
          {/* 👈 React Query disponible en toda la app */}

          <CartProvider>
            {/* 👈 Contexto del carrito disponible globalmente */}

            <Navbar />
            {/* Barra superior visible en todas las páginas */}

            <CartDrawer />
            {/* Panel lateral del carrito */}

            <main className="max-w-6xl mx-auto p-4">
              {/* Contenedor principal */}

              {children}
              {/* Página actual renderizada por Next.js */}

            </main>

          </CartProvider>

        </Providers>

      </body>

    </html>

  )

}