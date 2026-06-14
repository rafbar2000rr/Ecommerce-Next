// Panel lateral del carrito (Cart Drawer).
//
// Se muestra desde el lado derecho de la pantalla.
// Permite visualizar los productos agregados.
// Permite aumentar o disminuir cantidades.
// Permite eliminar productos.
// Muestra el total de la compra.
// Permite navegar al checkout.
// Incluye un overlay oscuro para cerrar el panel.
// Debe ser Client Component porque usa hooks y eventos.

"use client" // Componente cliente

import { useCart } from "../context/CartContext"
// Hook del contexto global del carrito

import { useRouter } from "next/navigation"
// Hook para navegación programática

export default function CartDrawer() {

  const {

    cart,
    // Productos del carrito

    isOpen,
    // Indica si el drawer está abierto

    closeCart,
    // Cierra el drawer

    increaseQty,
    // Incrementa cantidad

    decreaseQty,
    // Reduce cantidad

    removeFromCart,
    // Elimina producto

    total,
    // Total acumulado

  } = useCart()

  const router = useRouter()
  // Navegación programática

  // ✅ Solo navega al checkout
  const handleCheckout = () => {

    closeCart()
    // Cierra el drawer

    setTimeout(() => {

      router.push("/checkout")
      // Navega al checkout

    }, 200)
    // Espera animación de cierre

  }

  return (

    <>

      {/* 🌫️ OVERLAY */}
      <div

        onClick={closeCart}
        // Cierra drawer al hacer clic fuera

        className={`
          fixed inset-0
          bg-black/40
          z-[9998]
          transition-opacity
          duration-300

          ${
            isOpen
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }
        `}

      />

      {/* 🛒 DRAWER */}
      <div

        className={`
          fixed
          top-0
          right-0
          h-full
          w-80
          bg-white
          shadow-xl
          z-[9999]

          transform
          transition-transform
          duration-500
          ease-in-out

          ${
            isOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}

      >

        <div className="p-4 flex flex-col h-full">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">

            <h2 className="text-xl font-bold">

              Carrito

            </h2>

            <button

              onClick={closeCart}
              // Cierra el drawer

              className="
                text-xl
                hover:scale-110
                transition
              "

            >

              ✕

            </button>

          </div>

          {/* ITEMS */}
          <div className="flex-1 overflow-y-auto space-y-4">

            {cart.length === 0 && (

              <p className="text-gray-500">

                Tu carrito está vacío

              </p>

            )}

            {cart.map((item) => (

              <div

                key={item.id}
                // Clave única

                className="
                  border-b
                  pb-2
                  flex
                  gap-3
                "

              >

                <img

                  src={item.image}
                  // Imagen del producto

                  className="
                    h-12
                    w-12
                    object-contain
                  "

                />

                <div className="flex-1">

                  <p className="text-sm line-clamp-2">

                    {item.title}
                    {/* Nombre */}

                  </p>

                  <p className="text-sm font-bold">

                    ${item.price}
                    {/* Precio */}

                  </p>

                  <div className="flex items-center gap-2 mt-2">

                    <button

                      onClick={() =>
                        decreaseQty(item.id)
                      }
                      // Reduce cantidad

                    >

                      -

                    </button>

                    <span>

                      {item.quantity}

                    </span>

                    <button

                      onClick={() =>
                        increaseQty(item.id)
                      }
                      // Incrementa cantidad

                    >

                      +

                    </button>

                  </div>

                </div>

                <button

                  onClick={() =>
                    removeFromCart(item.id)
                  }
                  // Elimina producto

                  className="
                    text-red-500
                    text-xs
                  "

                >

                  Eliminar

                </button>

              </div>

            ))}

          </div>

          {/* FOOTER */}
          <div className="border-t pt-4">

            <p className="font-bold mb-2">

              Total:
              {" "}
              ${total.toFixed(2)}

            </p>

            <button

              onClick={handleCheckout}

              disabled={
                cart.length === 0
              }
              // Deshabilita si no hay productos

              className={`
                w-full
                py-3
                rounded-xl
                font-semibold
                transition

                ${
                  cart.length === 0

                    ? "bg-gray-400 cursor-not-allowed"

                    : "bg-black text-white hover:bg-gray-800 hover:scale-[1.02]"
                }
              `}

            >

              Finalizar compra

            </button>

          </div>

        </div>

      </div>

    </>

  )

}