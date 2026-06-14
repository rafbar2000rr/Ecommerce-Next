// Endpoint para obtener el historial de órdenes del usuario.
//
// Verifica que el usuario esté autenticado mediante la cookie.
// Obtiene únicamente las órdenes del usuario logueado.
// Implementa paginación para no traer todas las órdenes de una vez.
// Devuelve las órdenes de la página solicitada y el total de páginas.

import { NextResponse } from "next/server" // Utilidad para crear respuestas HTTP
import { cookies } from "next/headers" // Permite leer cookies del request
import { connectDB } from "@/lib/mongodb" // Función para conectar a MongoDB
import Order from "@/models/Order" // Modelo de órdenes

export async function GET(req: Request) {
  // Endpoint GET para listar órdenes del usuario

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
    // Convierte la cookie JSON en objeto JavaScript

    await connectDB()
    // Conecta a MongoDB

    const { searchParams } = new URL(req.url)
    // Obtiene los query parameters de la URL

    const page = Number(
      searchParams.get("page") || "1"
    )
    // Página solicitada
    // Ejemplo:
    // /api/orders?page=3

    const limit = 5
    // Máximo de órdenes por página

    const skip = (page - 1) * limit
    // Cantidad de registros a saltar

    const [orders, total] = await Promise.all([

      Order.find({
        userId: user.id,
      })
        .sort({
          createdAt: -1,
        })
        // Más recientes primero

        .skip(skip)
        // Saltar registros anteriores

        .limit(limit)
        // Traer solo 5 registros

        .lean(),
        // Convierte documentos Mongoose
        // en objetos JavaScript simples

      Order.countDocuments({
        userId: user.id,
      }),
      // Cuenta cuántas órdenes existen

    ])

    return NextResponse.json({

      orders,
      // Órdenes de la página actual

      totalPages: Math.ceil(
        total / limit
      ),
      // Total de páginas

    })

  } catch (error) {

    console.error(error)
    // Mostrar error en consola

    return NextResponse.json(
      {
        error: "Error fetching orders",
      },
      {
        status: 500,
      }
    )
    // Error interno del servidor

  }
}