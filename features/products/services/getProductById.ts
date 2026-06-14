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

import { apiCall } from "@/lib/api"

export async function getProductById(id: string) {
  // Recibe el ID del producto

  if (!id) {
    throw new Error("Invalid product ID")
  }

  // Usamos la ruta proxy interna para evitar bloqueos desde Vercel/Edge
  // Llamamos a `apiCall` para que la URL base sea correcta en server y client
  const res = await apiCall(`/api/proxy/products/${id}`)

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`)
  }

  const text = await res.text()

  if (!text) throw new Error("Empty response from API")

  return JSON.parse(text)
}