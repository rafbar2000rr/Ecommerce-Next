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
  try {
    console.log('getProducts: calling fakestoreapi')
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
    })

    if (!res.ok) {
      const body = await res.text().catch(() => "<no body>")
      const msg = `Error fetching products: ${res.status} ${res.statusText} - ${body}`
      console.error(msg)
      throw new Error(msg)
    }

    return res.json()
  } catch (err: any) {
    console.error('getProducts network/error:', err)
    throw new Error(`Error fetching products: ${err?.message || String(err)}`)
  }
}