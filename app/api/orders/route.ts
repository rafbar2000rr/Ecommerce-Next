// Endpoint de Órdenes.
//
// POST:
// - Crea una nueva orden de compra.
// - Verifica que el usuario esté autenticado.
// - Valida los datos recibidos.
// - Calcula el total en el servidor.
// - Guarda la orden en MongoDB.
//
// GET:
// - Devuelve todas las órdenes.
// - Solo puede ser usado por administradores.
// - Implementa paginación.
// - Devuelve órdenes y total de páginas.

import { NextResponse } from "next/server" // Utilidad para respuestas HTTP
import { connectDB } from "@/lib/mongodb" // Conexión a MongoDB
import Order from "@/models/Order" // Modelo de órdenes
import { cookies } from "next/headers" // Lectura de cookies
import mongoose from "mongoose" // Utilidades de MongoDB/Mongoose

// 🛒 CREATE ORDER
export async function POST(req: Request) {
  // Endpoint para crear una orden

  try {

    const cookieStore = await cookies()
    // Obtiene las cookies

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
    // Convierte la cookie a objeto JS

    const body = await req.json()
    // Obtiene el body enviado por el frontend

    // 🔥 Validación de datos obligatorios
    if (

      !body.items?.length ||

      !body.customer?.name ||

      !body.customer?.email ||

      !body.customer?.address

    ) {

      return NextResponse.json(
        { error: "Missing required data" },
        { status: 400 }
      )
      // Datos incompletos

    }

    await connectDB()
    // Conecta a MongoDB

    // 🔥 Normaliza los productos recibidos
    const items = body.items.map((item: any) => ({

      id: item.id,
      // ID del producto

      title: item.title,
      // Nombre

      price: item.price,
      // Precio unitario

      quantity: item.quantity,
      // Cantidad comprada

      image: item.image,
      // Imagen

    }))

    // 🔥 Calcula el total en el backend
    const total = items.reduce(

      (acc: number, item: any) =>

        acc + item.price * item.quantity,

      0

    )

    const order = await Order.create({

      customer: {

        name: body.customer.name,
        // Nombre del cliente

        email: body.customer.email,
        // Email

        address: body.customer.address,
        // Dirección

      },

      items,
      // Productos

      total,
      // Total calculado por el servidor

      userId: new mongoose.Types.ObjectId(
        user.id
      ),
      // Convierte string → ObjectId

      status: "paid",
      // Estado inicial

    })

    return NextResponse.json(
      order,
      { status: 201 }
    )
    // Orden creada correctamente

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Error creating order" },
      { status: 500 }
    )

  }
}

// 🔒 GET ORDERS (ADMIN ONLY + PAGINACIÓN)
export async function GET(req: Request) {
  // Endpoint para listar todas las órdenes

  try {

    const cookieStore = await cookies()
    // Obtiene cookies

    const userCookie = cookieStore.get("user")
    // Busca cookie de sesión

    if (!userCookie) {

      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
      // No autenticado

    }

    const user = JSON.parse(userCookie.value)
    // Convierte cookie a objeto

    if (user.role !== "admin") {

      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      )
      // Solo administradores

    }

    await connectDB()
    // Conecta a MongoDB

    // 🔥 Obtiene parámetros de la URL
    const { searchParams } = new URL(req.url)

    const page = Number(
      searchParams.get("page") || "1"
    )
    // Página solicitada

    const limit = 10
    // Órdenes por página

    const skip = (page - 1) * limit
    // Cantidad a saltar

    const [orders, total] = await Promise.all([

      Order.find()

        .sort({
          createdAt: -1,
        })
        // Más recientes primero

        .skip(skip)
        // Saltar registros

        .limit(limit)
        // Limitar resultados

        .lean(),
        // Objetos JS simples

      Order.countDocuments(),
      // Cuenta total de órdenes

    ])

    return NextResponse.json({

      orders,
      // Lista de órdenes

      totalPages: Math.ceil(
        total / limit
      ),
      // Total de páginas

    })

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Error fetching orders" },
      { status: 500 }
    )

  }
}