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
        bg-gradient-to-br
        from-white
        via-slate-50
        to-slate-100
        rounded-3xl
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        p-5
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
              h-52
              sm:h-48
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
              text-base
              font-semibold
              mt-3
              line-clamp-2
              text-slate-900
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
          mt-3
          text-slate-900
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
              mt-5
              w-full
              bg-black
              text-white
              py-3
              rounded-2xl
              hover:bg-slate-900
              transition
              cursor-pointer
              hover:scale-[1.02]
              inline-flex
              items-center
              justify-center
              gap-2
            "
          >
            <span>Ver producto</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9m-9-4h4" />
            </svg>
          </button>

        </Link>
      </div>

    </div>

  )
}