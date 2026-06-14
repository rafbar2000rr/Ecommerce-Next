// Tarjeta individual de producto.
//
// Muestra:
// - Imagen del producto.
// - Título.
// - Precio.
// - Botón para ver el detalle.
//
// Tanto la imagen como el título son clickeables.
// El botón también lleva al detalle del producto.
// Utiliza Link de Next.js para navegación rápida sin recargar la página.
// Debe ser Client Component porque usa componentes interactivos
// y navegación del lado del cliente.

"use client" // Componente cliente

import Link from "next/link"
// Componente de Next.js para navegación interna

export default function ProductCard({ product }: any) {
  // Recibe un producto por props

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        hover:shadow-lg
        hover:-translate-y-1
        transition-all
        duration-300
        p-4
        flex
        flex-col
        h-full
      "
    >
      {/* Tarjeta visual del producto */}

      {/* Imagen + título clickeables */}
      <Link href={`/products/${product.id}`}>
        {/* Navega al detalle del producto */}

        <div className="cursor-pointer">

          {/* Contenedor de la imagen */}
          <div
            className="
              h-48
              flex
              items-center
              justify-center
              overflow-hidden
            "
          >

            <img
              src={product.image}
              // URL de la imagen

              className="
                h-full
                object-contain
                hover:scale-105
                transition-transform
                duration-300
              "
              // Efecto zoom al pasar el mouse
            />

          </div>

          {/* Título */}
          <h2
            className="
              text-sm
              font-medium
              mt-3
              line-clamp-2
            "
          >

            {product.title}
            {/* Nombre del producto */}

          </h2>

        </div>

      </Link>

      {/* Precio */}
      <p
        className="
          text-lg
          font-bold
          mt-2
        "
      >

        ${product.price}
        {/* Precio del producto */}

      </p>

      <div className="mt-auto">
        {/* Botón para ir al detalle */}
        <Link href={`/products/${product.id}`}>
          {/* Navega al detalle */}

          <button
            className="
              mt-4
              w-full
              bg-black
              text-white
              py-3
              rounded-lg
              hover:bg-gray-800
              transition
            "
          >

            View product

          </button>

        </Link>
      </div>

    </div>

  )
}