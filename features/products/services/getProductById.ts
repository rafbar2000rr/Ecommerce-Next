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

// import { apiCall } from "@/lib/api"

// export async function getProductById(id: string) {
//   // Recibe el ID del producto

//   if (!id) {
//     throw new Error("Invalid product ID")
//   }

//   // Usamos la ruta proxy interna para evitar bloqueos desde Vercel/Edge
//   // Llamamos a `apiCall` para que la URL base sea correcta en server y client
//   let res

//   try {
//     res = await apiCall(`/api/proxy/products/${id}`)
//   } catch (err) {
//     // si la llamada al proxy falla por red, intentaremos llamar directamente
//     // al upstream como fallback
//     console.warn("Proxy call failed, falling back to direct fetch:", err)
//     res = await fetch(`https://fakestoreapi.com/products/${id}`, {
//       cache: "no-store",
//       headers: { Accept: "application/json" },
//     })
//   }

//   if (!res.ok) {
//     const fallback = await fetch(`https://fakestoreapi.com/products/${id}`, {
//       cache: "no-store",
//       headers: { Accept: "application/json" },
//     })

//     if (!fallback.ok) {
//       throw new Error(`HTTP error! status: ${fallback.status}`)
//     }

//     const fbText = await fallback.text()
//     if (!fbText) throw new Error("Empty response from API")
//     return JSON.parse(fbText)
//   }

//   const text = await res.text()

//   if (!text) throw new Error("Empty response from API")

//   return JSON.parse(text)
// }

import { apiCall } from "@/lib/api"

export async function getProductById(id: string) {
  if (!id) {
    throw new Error("Invalid product ID")
  }

  // Cabeceras simuladas para evitar que el firewall de Fake Store API bloquee el servidor
  const secureHeaders = {
    "Accept": "application/json",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  }

  let res

  try {
    // Si apiCall acepta un objeto de configuración/headers, pásaselo también.
    res = await apiCall(`/api/proxy/products/${id}`)
  } catch (err) {
    console.warn("Proxy call failed, falling back to direct fetch:", err)
    res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: "no-store",
      headers: secureHeaders, // <-- Agregado aquí
    })
  }

  // Si la ruta proxy falló o devolvió un error, usamos el fallback
  if (!res.ok) {
    console.log(`Proxy responded with status ${res.status}. Trying fallback with secure headers...`);
    
    const fallback = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: "no-store",
      headers: secureHeaders, // <-- Agregado aquí también
    })

    if (!fallback.ok) {
      // Ahora sabremos si sigue siendo un 403 o es otro problema
      throw new Error(`HTTP error! status: ${fallback.status}`)
    }

    const fbText = await fallback.text()
    if (!fbText) throw new Error("Empty response from API")
    return JSON.parse(fbText)
  }

  const text = await res.text()
  if (!text) throw new Error("Empty response from API")

  return JSON.parse(text)
}
