// Página de administración de órdenes.
// Obtiene todas las órdenes desde la API,
// las muestra en una tabla,
// permite visualizar el estado mediante un tracker
// y actualizar el estado de cada orden sin recargar la página.

"use client" // Indica que este componente se ejecutará en el navegador

import { useEffect, useState } from "react" // Hooks de React
import OrderStatusTracker from "@/shared/components/OrderStatusTracker" // Componente visual para mostrar el estado del pedido
import { apiCall } from "@/lib/api" // Función auxiliar para llamadas a API

export default function AdminOrdersPage() { // Componente principal

  const [orders, setOrders] = useState<any[]>([]) // Lista de órdenes
  const [loading, setLoading] = useState(true) // Estado de carga

  // 🔥 Se ejecuta una sola vez cuando el componente se monta
  useEffect(() => {

    apiCall("/api/orders") // Solicita todas las órdenes
      .then((res) => res.json()) // Convierte la respuesta a JSON
      .then((data) => {

        setOrders(data.orders) // Guarda las órdenes en el estado
        setLoading(false) // Finaliza la carga

      })

  }, []) // Array vacío = ejecutar solo al montar

  // 🔥 Actualiza el estado de una orden
  const updateStatus = async (
    id: string, // ID de la orden
    status: string // Nuevo estado
  ) => {

    try {

      const res = await apiCall(
        `/api/orders/${id}/status`, // Endpoint para actualizar estado
        {
          method: "PATCH", // Método HTTP PATCH
          headers: {
            "Content-Type": "application/json", // Enviamos JSON
          },
          body: JSON.stringify({ status }), // Nuevo estado
        }
      )

      if (!res.ok) throw new Error("Failed") // Error si falla

      // ⚡ Actualiza la UI localmente sin volver a pedir datos al servidor
      setOrders((prev) =>

        prev.map((order) =>

          order._id === id
            ? { ...order, status } // Si coincide, actualiza el estado
            : order // Si no coincide, deja el objeto igual

        )

      )

    } catch (err) {

      console.error(err) // Muestra error en consola
      alert("Error updating status") // Muestra alerta

    }
  }

  // Mientras carga, se muestra este mensaje
  if (loading)
    return (
      <p className="p-6">
        Loading orders...
      </p>
    )

  return (

    <div className="p-6 space-y-6">
      {/* Contenedor principal */}

      <h1 className="text-2xl font-bold">
        Admin Orders
      </h1>
      {/* Título */}

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        {/* Contenedor de la tabla */}

        <table className="w-full text-sm">
          {/* Tabla de órdenes */}

          {/* HEADER */}
          <thead className="bg-gray-100 text-left">

            <tr>

              <th className="p-3">
                Customer
              </th>
              {/* Nombre del cliente */}

              <th className="p-3">
                Items
              </th>
              {/* Productos comprados */}

              <th className="p-3">
                Total
              </th>
              {/* Monto total */}

              <th className="p-3">
                Date
              </th>
              {/* Fecha de compra */}

              <th className="p-3">
                Status
              </th>
              {/* Estado del pedido */}

            </tr>

          </thead>

          {/* BODY */}
          <tbody>

            {orders.map((order) => (
              // Recorre todas las órdenes

              <tr
                key={order._id}
                className="border-t"
              >

                {/* 👤 Cliente */}
                <td className="p-3">

                  <p className="font-medium">
                    {order.customer.name}
                  </p>
                  {/* Nombre */}

                  <p className="text-gray-500 text-xs">
                    {order.customer.email}
                  </p>
                  {/* Email */}

                </td>

                {/* 📦 Productos */}
                <td className="p-3">

                  {order.items.map((item: any) => (

                    <p key={item.id}>

                      {item.title} x{item.quantity}
                      {/* Nombre y cantidad */}

                    </p>

                  ))}

                </td>

                {/* 💰 Total */}
                <td className="p-3 font-bold">

                  ${order.total.toFixed(2)}
                  {/* Formatea con 2 decimales */}

                </td>

                {/* 📅 Fecha */}
                <td className="p-3 text-gray-500">

                  {new Date(order.createdAt).toLocaleString()}
                  {/* Convierte fecha ISO a formato local */}

                </td>

                {/* 🔥 Estado editable */}
                <td className="p-3">

                  <div className="flex flex-col gap-2">
                    {/* Contenedor vertical */}

                    <OrderStatusTracker
                      status={order.status}
                    />
                    {/* Indicador visual del estado */}

                    {/* Controles del administrador */}
                    <select
                      value={order.status} // Estado actual
                      onChange={(e) =>
                        updateStatus(
                          order._id,
                          e.target.value
                        )
                      } // Actualiza al cambiar
                      className="border rounded px-2 py-1 text-xs"
                    >

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

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )
}