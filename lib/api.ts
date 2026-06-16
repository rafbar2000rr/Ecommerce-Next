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

  // En Vercel la URL pública está en VERCEL_URL (sin esquema)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  // Default para desarrollo local
  // Si no hay una URL pública configurada, devolver cadena vacía
  // para permitir fetch relativo a rutas internas (`/api/...`).
  // En servidor Next.js, fetch con URL relativa funcionará contra la misma aplicación.
  return ""
}

export async function apiCall(endpoint: string, options?: RequestInit) {
  const base = getApiUrl()
  const url = `${base}${endpoint}`

  try {
    return await fetch(url, options)
  } catch (err) {
    // Re-lanzar con contexto para facilitar debugging en logs de servidor
    throw new Error(`apiCall failed fetching ${url}: ${err}`)
  }
}
