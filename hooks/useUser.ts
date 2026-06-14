// ======================================================
// HOOK PERSONALIZADO useUser
// Obtiene el usuario autenticado desde /api/me usando
// React Query. Mantiene el resultado en caché durante
// 5 minutos para evitar peticiones innecesarias.
// ======================================================

import { useQuery } from "@tanstack/react-query" // Hook de React Query para obtener datos
import { apiCall } from "@/lib/api" // Función auxiliar para llamadas a API

export function useUser() {
  return useQuery({
    queryKey: ["me"], // Clave única para identificar esta consulta en la caché

    queryFn: async () => {
      const res = await apiCall("/api/me") // Solicita los datos del usuario autenticado

      if (!res.ok) return null // Si no está autenticado devuelve null

      return res.json() // Convierte la respuesta JSON en objeto JavaScript
    },

    // 🔥 CONFIG PRO
    staleTime: 1000 * 60 * 5, // Mantiene los datos frescos durante 5 minutos
    refetchOnWindowFocus: false, // Evita volver a consultar al regresar a la pestaña
  })
}