// Página de detalle de producto.
//
// Recibe el ID del producto desde la URL.
// Obtiene la información completa del producto.
// Muestra imagen, título, precio y descripción.
// Permite agregar el producto al carrito.
// Es un Server Component porque no tiene "use client".

import { getProductById } from "@/features/products/services/getProductById"
// Función que obtiene un producto por su ID

import AddToCartButton from "@/features/cart/components/AddToCartButton"
// Botón para agregar productos al carrito

export default async function ProductDetail({

  params,

}: {

  params: { id: string }

}) {

  const { id } = params
  // Obtiene el parámetro dinámico de la URL

  const product = await getProductById(id)
  // Busca el producto usando su ID

  return (

    <main className="bg-white rounded-2xl shadow p-6">

      <div className="grid md:grid-cols-2 gap-10">

        {/* IMAGEN DEL PRODUCTO */}
        <div className="flex justify-center">

          <img

            src={product.image}
            // URL de la imagen

            className="h-80 object-contain"
            // Mantiene proporción sin deformar

          />

        </div>

        {/* INFORMACIÓN DEL PRODUCTO */}
        <div>

          <h1 className="text-3xl font-bold">

            {product.title}
            {/* Nombre del producto */}

          </h1>

          <p className="text-2xl text-green-600 mt-4 font-semibold">

            $
            {product.price}
            {/* Precio */}

          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">

            {product.description}
            {/* Descripción */}

          </p>

          {/* BOTÓN AGREGAR AL CARRITO */}
          <AddToCartButton
            product={product}
          />

        </div>

      </div>

    </main>

  )

}