// Endpoint para actualizar el estado de una orden.
//
// Solo los administradores pueden usar este endpoint.
// Verifica autenticación mediante cookie.
// Verifica que el usuario tenga rol "admin".
// Valida que el nuevo estado sea permitido.
// Actualiza la orden en MongoDB.
// Devuelve la orden actualizada.

import { NextResponse } from "next/server" // Utilidad para crear respuestas HTTP
import { connectDB } from "@/lib/mongodb" // Función para conectar a MongoDB
import Order from "@/models/Order" // Modelo de órdenes
import { cookies } from "next/headers" // Permite acceder a las cookies

export async function PATCH(
  req: Request, // Request recibido
  { params }: { params: { id: string } } // Parámetros dinámicos de la URL
) {

  try {

    const cookieStore = await cookies()
    // Obtiene todas las cookies

    const userCookie = cookieStore.get("user")
    // Busca la cookie de sesión

    if (!userCookie) {

      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
      // Usuario no autenticado

    }

    const user = JSON.parse(userCookie.value)
    // Convierte la cookie a objeto JavaScript

    if (user.role !== "admin") {

      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      )
      // Usuario autenticado pero sin permisos

    }

    const { status } = await req.json()
    // Obtiene el nuevo estado enviado por el frontend

    // 🔥 Lista de estados permitidos
    const allowed = [
      "paid",
      "shipped",
      "delivered",
    ]

    if (!allowed.includes(status)) {

      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      )
      // Estado inválido

    }

    await connectDB()
    // Conecta a MongoDB

    const updated = await Order.findByIdAndUpdate(

      params.id,
      // ID de la orden obtenido desde la URL

      {
        status,
      },
      // Nuevo estado

      {
        new: true,
      }
      // Devuelve el documento actualizado

    )

    return NextResponse.json(updated)
    // Devuelve la orden actualizada

  } catch (error) {

    console.error(error)
    // Mostrar error en consola

    return NextResponse.json(
      {
        error: "Error updating status",
      },
      {
        status: 500,
      }
    )
    // Error interno del servidor

  }
}