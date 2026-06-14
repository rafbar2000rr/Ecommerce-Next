// Vista completa del carrito.
//
// Muestra todos los productos agregados.
// Permite aumentar y disminuir cantidades.
// Permite eliminar productos.
// Calcula y muestra el total de la compra.
// Muestra un mensaje cuando el carrito está vacío.
// Debe ser Client Component porque utiliza el contexto del carrito
// y maneja eventos de usuario.

"use client" // Componente cliente

import { useCart } from "../context/CartContext"
// Hook para acceder al carrito global

export default function CartView() {

  const {

    cart,
    // Lista de productos

    removeFromCart,
    // Elimina un producto

    increaseQty,
    // Aumenta cantidad

    decreaseQty,
    // Disminuye cantidad

    total,
    // Total del carrito

  } = useCart()

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow
        p-6
        max-w-3xl
        mx-auto
      "
    >

      <h2
        className="
          text-2xl
          font-bold
          mb-6
        "
      >
        Your Cart
      </h2>

      {/* Mensaje si no hay productos */}
      {cart.length === 0 && (

        <p className="text-gray-500">

          Your cart is empty 🛒

        </p>

      )}

      {/* Lista de productos */}
      <div className="space-y-4">

        {cart.map((item) => (

          <div

            key={item.id}
            // Clave única para React

            className="
              flex
              items-center
              justify-between
              border-b
              pb-4
            "

          >

            {/* 🖼️ Imagen + información */}
            <div className="flex items-center gap-4">

              <img

                src={item.image}
                // Imagen del producto

                className="
                  h-16
                  w-16
                  object-contain
                "

              />

              <div>

                <p
                  className="
                    font-medium
                    line-clamp-1
                  "
                >

                  {item.title}
                  {/* Nombre */}

                </p>

                <p
                  className="
                    text-gray-500
                    text-sm
                  "
                >

                  ${item.price}
                  {/* Precio unitario */}

                </p>

              </div>

            </div>

            {/* 🔢 Controles de cantidad */}
            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <button

                onClick={() =>
                  decreaseQty(item.id)
                }
                // Reduce cantidad

                className="
                  px-2
                  py-1
                  bg-gray-200
                  rounded
                  hover:bg-gray-300
                "

              >

                -

              </button>

              <span className="font-medium">

                {item.quantity}
                {/* Cantidad actual */}

              </span>

              <button

                onClick={() =>
                  increaseQty(item.id)
                }
                // Incrementa cantidad

                className="
                  px-2
                  py-1
                  bg-gray-200
                  rounded
                  hover:bg-gray-300
                "

              >

                +

              </button>

            </div>

            {/* ❌ Eliminar producto */}
            <button

              onClick={() =>
                removeFromCart(item.id)
              }
              // Elimina completamente el producto

              className="
                text-red-500
                hover:text-red-700
                text-sm
              "

            >

              Remove

            </button>

          </div>

        ))}

      </div>

      {/* 💰 Total del carrito */}
      {cart.length > 0 && (

        <div
          className="
            mt-6
            flex
            justify-between
            items-center
            border-t
            pt-4
          "
        >

          <h3
            className="
              text-lg
              font-semibold
            "
          >

            Total

          </h3>

          <p
            className="
              text-xl
              font-bold
            "
          >

            ${total.toFixed(2)}
            {/* Total formateado con 2 decimales */}

          </p>

        </div>

      )}

    </div>

  )

}