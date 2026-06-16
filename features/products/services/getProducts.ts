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

// Servicio para obtener todos los productos desde Fake Store API.

export async function getProducts() {
  try {
    const res = await fetch(
      "https://fakestoreapi.com/products",
      {
        next: {
          revalidate: 300, // Revalida cada 5 minutos
        },
        headers: {
          Accept: "application/json",
        },
      }
    )

    if (!res.ok) {
      throw new Error(
        `Error fetching products: ${res.status} ${res.statusText}`
      )
    }

    return await res.json()
  } catch (err: any) {
    console.error("getProducts error:", err)

    throw new Error(
      `Error fetching products: ${err?.message || String(err)}`
    )
  }
}