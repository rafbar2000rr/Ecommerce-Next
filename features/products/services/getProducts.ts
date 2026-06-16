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
      next: {
        revalidate: 300,
      },
    }
  )

  if (!res.ok) {
    throw new Error("Error fetching products")
  }

  return res.json()
}


// export async function getProducts() {
//   try {
//     console.log('getProducts: attempting internal /api/products (or fallback to external)')

//     // Try to call the internal API route via an absolute origin when available (Vercel or custom env)
//     const vercelUrl = process.env.VERCEL_URL
//     const nextPublic = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_VERCEL_URL
//     const origin = vercelUrl ? `https://${vercelUrl}` : nextPublic ? nextPublic.replace(/\/$/, '') : undefined

//     let res

//     if (origin) {
//       const apiUrl = `${origin}/api/products`
//       console.log('getProducts: calling', apiUrl)
//       res = await fetch(apiUrl)
//     } else {
//       // No origin available at build time — fetch external API with ISR caching
//       console.log('getProducts: no origin detected, calling external fakestoreapi with revalidate')
//       res = await fetch("https://fakestoreapi.com/products", { next: { revalidate: 60 } })
//     }

//     if (!res.ok) {
//       const body = await res.text().catch(() => "<no body>")
//       const msg = `Error fetching products: ${res.status} ${res.statusText} - ${body}`
//       console.error(msg)
//       throw new Error(msg)
//     }

//     return res.json()
//   } catch (err: any) {
//     console.error('getProducts network/error:', err)
//     throw new Error(`Error fetching products: ${err?.message || String(err)}`)
//   }
// }