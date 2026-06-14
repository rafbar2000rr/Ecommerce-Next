// Servicio para obtener todos los productos desde Fake Store API.
//
// Este servicio:
// - Hace una petición HTTP a Fake Store API.
// - Obtiene la lista completa de productos.
// - Verifica que la respuesta sea exitosa.
// - Convierte el JSON recibido a objetos JavaScript.
// - Devuelve un arreglo de productos.
//
// Normalmente se utiliza desde ProductList.
// Es una función reutilizable de la capa de servicios.
// No depende de React ni de componentes.

export async function getProducts() {

  const res = await fetch(
    "https://fakestoreapi.com/products",
    {
      cache: "no-store",
      // Fuerza una petición nueva cada vez
      // Evita que Next.js use caché
    }
  )

  if (!res.ok) {
    // Verifica si la respuesta HTTP fue exitosa

    throw new Error("Error fetching products")
    // Lanza un error si la API respondió con error
  }

  return res.json()
  // Convierte automáticamente el JSON recibido
  // en un arreglo de objetos JavaScript
}