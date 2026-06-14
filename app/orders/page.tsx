// Página "Mis Órdenes".
//
// Obtiene las órdenes del usuario autenticado.
// Implementa paginación con scroll infinito.
// Permite filtrar por estado.
// Permite buscar por ID de orden.
// Evita órdenes duplicadas al cargar nuevas páginas.
// Muestra estados visuales, errores y mensajes vacíos.
// Permite navegar al detalle de cada orden.

"use client" // Componente cliente

import { useEffect, useRef, useState } from "react" // Hooks de React
import Link from "next/link" // Navegación entre páginas

export default function UserOrdersPage() {

  const [orders, setOrders] = useState<any[]>([])
  // Lista de órdenes cargadas

  const [page, setPage] = useState(1)
  // Página actual

  const [totalPages, setTotalPages] = useState(1)
  // Total de páginas disponibles

  const [loading, setLoading] = useState(false)
  // Estado de carga

  const [error, setError] = useState("")
  // Mensaje de error

  const [statusFilter, setStatusFilter] = useState("all")
  // Filtro por estado

  const [search, setSearch] = useState("")
  // Texto de búsqueda

  const loaderRef =
    useRef<HTMLDivElement | null>(null)
  // Referencia al elemento observado para scroll infinito

  // 🔥 RESET cuando cambian filtros
  useEffect(() => {

    setOrders([])
    // Vacía órdenes anteriores

    setPage(1)
    // Vuelve a la primera página

  }, [statusFilter, search])

  // 🔥 FETCH DE ÓRDENES
  useEffect(() => {

    const fetchOrders = async () => {

      try {

        setLoading(true)

        setError("")

        const res = await fetch(
          `/api/my-orders?page=${page}`
        )
        // Solicita una página de órdenes

        if (!res.ok) {
          throw new Error(
            "Failed to load orders"
          )
        }

        const data = await res.json()
        // Convierte respuesta a JSON

        // 🔥 Evitar duplicados
        setOrders((prev) => {

          const map = new Map()

          ;[
            ...prev,
            ...data.orders,
          ].forEach((o) => {

            map.set(
              o._id,
              o
            )
            // Usa el ID como clave única

          })

          return Array.from(
            map.values()
          )

        })

        setTotalPages(
          data.totalPages
        )
        // Guarda total de páginas

      } catch (err: any) {

        setError(err.message)

      } finally {

        setLoading(false)

      }

    }

    fetchOrders()

  }, [page, statusFilter, search])

  // 🔥 SCROLL INFINITO
  useEffect(() => {

    const observer =
      new IntersectionObserver(

        (entries) => {

          if (

            entries[0].isIntersecting &&
            page < totalPages &&
            !loading

          ) {

            setPage(
              (prev) => prev + 1
            )
            // Cargar siguiente página

          }

        },

        {
          threshold: 1,
        }

      )

    if (loaderRef.current) {

      observer.observe(
        loaderRef.current
      )

    }

    return () => observer.disconnect()
    // Limpia observer

  }, [page, totalPages, loading])

  // 🎨 Colores por estado
  const statusColor: any = {

    paid:
      "bg-green-100 text-green-700",

    shipped:
      "bg-blue-100 text-blue-700",

    delivered:
      "bg-purple-100 text-purple-700",

  }

  const formatStatus = (
    status?: string
  ) => {

    if (!status) {
      return "Unknown"
    }

    return (
      status.charAt(0).toUpperCase() +
      status.slice(1)
    )

  }

  // 🔍 FILTRADO LOCAL
  const filteredOrders =
    orders.filter((order) => {

      const matchesStatus =

        statusFilter === "all" ||

        order.status === statusFilter

      const matchesSearch =

        order._id
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

      return (
        matchesStatus &&
        matchesSearch
      )

    })

  return (

    <div className="max-w-4xl mx-auto space-y-6">

      <h1 className="text-2xl font-bold">
        My Orders
      </h1>

      {/* FILTROS */}
      <div className="flex flex-col md:flex-row gap-3">

        <input

          placeholder="Search by order ID..."

          className="
            border p-2 rounded
            w-full md:w-1/2
          "

          value={search}

          onChange={(e) =>
            setSearch(e.target.value)
          }

        />

        <select

          value={statusFilter}

          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }

          className="
            border p-2 rounded
            w-full md:w-1/2
          "

        >

          <option value="all">
            All
          </option>

          <option value="paid">
            Paid
          </option>

          <option value="shipped">
            Shipped
          </option>

          <option value="delivered">
            Delivered
          </option>

        </select>

      </div>

      {/* ERROR */}
      {error && (

        <p className="text-red-500 text-sm">
          {error}
        </p>

      )}

      {/* EMPTY STATE */}
      {!loading &&
        filteredOrders.length === 0 && (

        <div className="text-center text-gray-500 py-10">

          No orders found

        </div>

      )}

      {/* LISTA DE ÓRDENES */}
      {filteredOrders.map((order) => (

        <Link

          key={order._id}

          href={`/orders/${order._id}`}

        >

          <div
            className="
              bg-white p-4 rounded-2xl shadow
              hover:shadow-md
              transition
              cursor-pointer
            "
          >

            <div className="flex justify-between items-center mb-2">

              <p className="font-medium">

                Order #

                {order._id.slice(-6)}
                {/* Últimos 6 caracteres */}

              </p>

              <span

                className={`
                  px-2 py-1 rounded text-xs
                  ${
                    statusColor[
                      order.status
                    ] ||
                    "bg-gray-100 text-gray-700"
                  }
                `}

              >

                {formatStatus(
                  order.status
                )}

              </span>

            </div>

            <p className="text-sm text-gray-500 mb-2">

              {
                new Date(
                  order.createdAt
                ).toLocaleString()
              }

            </p>

            <div className="text-sm text-gray-600">

              {order.items
                .slice(0, 2)
                .map((item: any) => (

                <p key={item.id}>

                  {item.title}
                  {" "}x
                  {item.quantity}

                </p>

              ))}

            </div>

            <div className="flex justify-end mt-3 font-bold">

              $

              {order.total.toFixed(2)}

            </div>

          </div>

        </Link>

      ))}

      {/* SCROLL INFINITO */}
      <div

        ref={loaderRef}

        className="
          h-10
          flex
          justify-center
          items-center
        "

      >

        {loading && (

          <p className="text-gray-500">
            Loading...
          </p>

        )}

        {!loading &&
          page >= totalPages &&
          orders.length > 0 && (

          <p className="text-gray-400 text-sm">

            No more orders

          </p>

        )}

      </div>

    </div>

  )

}