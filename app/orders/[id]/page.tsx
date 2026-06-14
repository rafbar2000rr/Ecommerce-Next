// Página de detalle de una orden.
//
// Obtiene el ID de la orden desde la URL.
// Consulta la orden en el backend.
// Actualiza automáticamente la información cada 5 segundos.
// Muestra el estado actual de la orden.
// Muestra los productos comprados.
// Muestra el total y los datos del cliente.

"use client" // Componente cliente

import { useEffect, useState } from "react" // Hooks de React
import { useParams } from "next/navigation" // Obtiene parámetros de la URL
import OrderTracking from "@/shared/components/OrderTracking" // Componente visual de seguimiento

export default function OrderDetailPage() {

  const params = useParams()
  // Obtiene los parámetros dinámicos de la URL

  const id = params.id as string
  // Extrae el id de la orden

  const [order, setOrder] = useState<any>(null)
  // Estado que almacenará la orden

  useEffect(() => {

    if (!id) return
    // Si aún no existe el id, salir

    const fetchOrder = () => {

      fetch(`/api/orders/${id}`)
      // Solicita la orden al backend

        .then((res) => res.json())
        // Convierte la respuesta a JSON

        .then(setOrder)
        // Guarda la orden en el estado

    }

    fetchOrder()
    // 👈 Primera carga

    const interval = setInterval(

      fetchOrder,

      5000

    )
    // 🔁 Actualiza cada 5 segundos

    return () => clearInterval(interval)
    // Limpia el intervalo al desmontar

  }, [id])

  if (!order) {

    return (

      <div className="flex justify-center mt-20">

        <p className="text-gray-500">
          Cargando orden...
        </p>

      </div>

    )

  }

  // 🎨 Colores según estado
  const statusColor: any = {

    paid:
      "bg-green-100 text-green-700",
    // Pagado

    shipped:
      "bg-blue-100 text-blue-700",
    // Enviado

    delivered:
      "bg-purple-100 text-purple-700",
    // Entregado

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
    // Convierte:
    // paid -> Paid

  }

  return (

    <div className="max-w-4xl mx-auto space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <h1 className="text-2xl font-bold">

          Order #

          {order._id.slice(-6)}
          {/* Últimos 6 caracteres del ID */}

        </h1>

        <span

          className={`
            px-3 py-1 rounded
            text-sm font-medium
            ${
              statusColor[order.status] ||
              "bg-gray-100 text-gray-700"
            }
          `}

        >

          {formatStatus(order.status)}

        </span>

      </div>

      {/* 📦 TRACKING */}
      <OrderTracking
        status={order.status}
      />
      {/* Barra visual de seguimiento */}

      {/* CARD PRINCIPAL */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-4">

        {order.items.map((item: any) => (

          <div

            key={item.id}

            className="
              flex items-center gap-4
              border-b pb-4
              last:border-none
            "

          >

            <img

              src={
                item.image ||
                "/placeholder.png"
              }

              className="
                w-16 h-16
                object-contain
              "

              alt={item.title}

            />
            {/* Imagen del producto */}

            <div className="flex-1">

              <p className="font-medium">
                {item.title}
              </p>

              <p className="text-sm text-gray-500">

                  Cantidad:
                  {" "}
                  {item.quantity}

                </p>

            </div>

            <p className="font-bold">

              $

              {(
                item.price *
                item.quantity
              ).toFixed(2)}

            </p>

          </div>

        ))}

        {/* TOTAL */}
        <div
          className="
            flex justify-between
            pt-4 border-t
            text-lg font-bold
          "
        >

          <span>Total</span>

          <span>

            $

            {order.total?.toFixed(2)}

          </span>

        </div>

      </div>

      {/* FOOTER */}
      <div className="text-sm text-gray-500 space-y-1">

        <p>

          📅

          {" "}

          {new Date(
            order.createdAt
          ).toLocaleString()}

        </p>

        {order.customer && (

          <>

            <p>
              👤 {order.customer.name}
            </p>

            <p>
              📧 {order.customer.email}
            </p>

          </>

        )}

      </div>

    </div>

  )

}