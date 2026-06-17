// // Página de detalle de producto.
// //
// // Recibe el ID del producto desde la URL.
// // Obtiene la información completa del producto.
// // Muestra imagen, título, precio y descripción.
// // Permite agregar el producto al carrito.
// // Es un Server Component porque no tiene "use client".

// import { getProductById } from "@/features/products/services/getProductById"
// // Función que obtiene un producto por su ID

// import AddToCartButton from "@/features/cart/components/AddToCartButton"
// // Botón para agregar productos al carrito

// export default async function ProductDetail({

//   params,

// }: {

//   params: Promise<{ id: string }>

// }) {

//   const { id } = await params
//   // Obtiene el parámetro dinámico de la URL

//   const product = await getProductById(id)
//   // Busca el producto usando su ID

//   return (

//     <main className="bg-white rounded-2xl shadow p-6">

//       <div className="grid md:grid-cols-2 gap-10">

//         {/* IMAGEN DEL PRODUCTO */}
//         <div className="flex justify-center">

//           <img

//             src={product.image}
//             // URL de la imagen

//             className="h-80 object-contain"
//             // Mantiene proporción sin deformar

//           />

//         </div>

//         {/* INFORMACIÓN DEL PRODUCTO */}
//         <div>

//           <h1 className="text-3xl font-bold">

//             {product.title}
//             {/* Nombre del producto */}

//           </h1>

//           <p className="text-sm text-gray-500">Precio</p>
//           <p className="text-2xl text-green-600 mt-1 font-semibold">

//             $
//             {product.price}

//           </p>

//           <p className="mt-4 text-gray-600 leading-relaxed">

//             {product.description}
//             {/* Descripción */}

//           </p>

//           {/* BOTÓN AGREGAR AL CARRITO */}
//           <AddToCartButton
//             product={product}
//           />

//         </div>

//       </div>

//     </main>

//   )

// }


"use client" // <-- Esto cambia las reglas del juego

import { useEffect, useState } from "react"
import AddToCartButton from "@/features/cart/components/AddToCartButton"

interface Product {
  id: number
  title: string
  price: number
  description: string
  image: string
}

export default function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function loadProduct() {
      try {
        const { id } = await params
        // La petición se hace desde el navegador del usuario directamente a la API
        const res = await fetch(`https://fakestoreapi.com/products/${id}`)
        
        if (!res.ok) throw new Error("API Error")
        
        const data = await res.json()
        setProduct(data)
      } catch (err) {
        console.error(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
  }, [params])

  if (loading) return <div className="p-6 text-center text-gray-500">Cargando producto...</div>
  if (error || !product) return <div className="p-6 text-center text-red-500">Error al cargar el detalle del producto.</div>

  return (
    <main className="bg-white rounded-2xl shadow p-6">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="flex justify-center">
          <img src={product.image} className="h-80 object-contain" alt={product.title} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-sm text-gray-500 mt-2">Precio</p>
          <p className="text-2xl text-green-600 mt-1 font-semibold">${product.price}</p>
          <p className="mt-4 text-gray-600 leading-relaxed">{product.description}</p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </main>
  )
}
