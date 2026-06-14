// Función auxiliar para construir URLs de API
// Usa la variable de entorno NEXT_PUBLIC_API_URL en Vercel
// En desarrollo local, usa la URL actual del navegador

export function getApiUrl() {
  if (typeof window !== "undefined") {
    // En el navegador, usa window.location
    return window.location.origin
  }

  // En el servidor, usa la variable de entorno
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL
  }

  // Fallback a NEXT_PUBLIC_BASE_URL si existe
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL
  }

  // Default para desarrollo local
  return "http://localhost:3000"
}

export async function apiCall(endpoint: string, options?: RequestInit) {
  const url = `${getApiUrl()}${endpoint}`
  return fetch(url, options)
}
