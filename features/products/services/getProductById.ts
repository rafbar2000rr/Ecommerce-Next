// Servicio para obtener un producto específico desde Fake Store API.
//
// Este servicio:
// - Recibe un ID de producto.
// - Valida que el ID exista.
// - Hace una petición HTTP a Fake Store API.
// - Verifica que la respuesta sea exitosa.
// - Verifica que la API haya devuelto contenido.
// - Convierte el texto JSON en un objeto JavaScript.
// - Devuelve el producto encontrado.
//
// Se suele usar desde un Server Component como ProductDetail.
// No usa React ni hooks; es una función de servicio reutilizable.

export async function getProductById(id: string) {
  // Recibe el ID del producto

  if (!id) {
    // Verifica que exista un ID válido

    throw new Error("Invalid product ID")
    // Lanza un error si no se recibió ID
  }

  const url = `https://fakestoreapi.com/products/${id}`

  const res = await fetch(url, {
    cache: "no-store",
    // Agregamos headers mínimos para evitar bloqueos por User-Agent
    headers: {
      Accept: "application/json",
      "User-Agent": "Mozilla/5.0 (compatible; Next.js)",
    },
  })

  if (!res.ok) {
    // Verifica si la respuesta fue exitosa

    // Si recibimos 403, intentamos un fallback vía un proxy público
    if (res.status === 403) {
      try {
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
        const proxyRes = await fetch(proxyUrl, { cache: "no-store" })
        if (proxyRes.ok) {
          const proxyText = await proxyRes.text()
          if (!proxyText) throw new Error("Empty response from proxy")
          return JSON.parse(proxyText)
        }
      } catch {
        // si el proxy falla, seguimos y lanzamos el error original abajo
      }
    }

    throw new Error(`HTTP error! status: ${res.status}`)
    // Muestra el código HTTP recibido
  }

  // 👇 Obtener respuesta como texto
  const text = await res.text()//La única razón de convertir a text 
  // es poder hacer la comprobación explícita de contenido vacío
  //  antes de parsear.Si no necesitas esa validación explícita,
  //  puedes simplificarlo a return await res.json().

  if (!text) {
    // Verifica que la API haya devuelto contenido

    throw new Error("Empty response from API")
  }

  return JSON.parse(text)
  // Convierte el texto JSON en objeto JavaScript
}