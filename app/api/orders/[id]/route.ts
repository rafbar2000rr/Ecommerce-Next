// Endpoint para obtener una orden específica.
//
// Verifica que el usuario esté autenticado.
// Obtiene el ID de la orden desde la URL.
// Busca la orden en MongoDB.
// Verifica que la orden exista.
// Permite acceso solamente al dueño de la orden o a un administrador.
// Devuelve los datos completos de la orden.

import { NextResponse } from "next/server" // Utilidad para crear respuestas HTTP
import { connectDB } from "@/lib/mongodb" // Función para conectar a MongoDB
import Order from "@/models/Order" // Modelo de órdenes
import { cookies } from "next/headers" // Permite acceder a cookies

export async function GET(
  req: Request, // Request recibido
  context: {
    params: Promise<{
      id: string
    }>
  }
) {

  try {

    const { id } = await context.params
    // 🔥 Obtiene el parámetro dinámico de la URL
    // Ejemplo:
    // /api/orders/123
    // id = "123"

    const cookieStore = await cookies()
    // Obtiene las cookies

    const userCookie = cookieStore.get("user")
    // Busca la cookie de sesión

    if (!userCookie) {

      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      )
      // Usuario no autenticado

    }

    const user = JSON.parse(userCookie.value)
    // Convierte la cookie a objeto JavaScript

    await connectDB()
    // Conecta a MongoDB

    const order = await Order
      .findById(id)
      .lean()
    // Busca la orden por ID
    // lean() devuelve un objeto JS simple

    if (!order) {

      return NextResponse.json(
        {
          error: "Not found",
        },
        {
          status: 404,
        }
      )
      // La orden no existe

    }

    // 🔒 Seguridad:
    // Solo puede acceder:
    // 1. El dueño de la orden
    // 2. Un administrador

    if (

      user.role !== "admin" &&

      order.userId.toString() !== user.id

    ) {

      return NextResponse.json(
        {
          error: "Forbidden",
        },
        {
          status: 403,
        }
      )
      // Usuario sin permiso

    }

    return NextResponse.json(order)
    // Devuelve la orden

  } catch (error) {

    console.error(error)
    // Mostrar error en consola

    return NextResponse.json(
      {
        error: "Error fetching order",
      },
      {
        status: 500,
      }
    )
    // Error interno del servidor

  }
}