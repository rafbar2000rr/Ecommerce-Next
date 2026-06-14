// Providers globales de la aplicación.
//
// Este componente configura React Query.
// Crea una única instancia de QueryClient.
// Hace que React Query esté disponible en toda la aplicación.
// Envuelve todos los componentes hijos.
// Debe ser un Client Component porque usa useState.

"use client" // Componente cliente

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
// Herramientas principales de React Query

import { useState } from "react"
// Hook para mantener una única instancia

export default function Providers({

  children,

}: {

  children: React.ReactNode

}) {

  const [queryClient] = useState(
    () => new QueryClient()
  )
  // Crea una única instancia de QueryClient
  // Solo se ejecuta una vez al montar el componente

  return (

    <QueryClientProvider
      client={queryClient}
    >
      {/* Hace disponible React Query a toda la aplicación */}

      {children}
      {/* Componentes hijos */}

    </QueryClientProvider>

  )

}