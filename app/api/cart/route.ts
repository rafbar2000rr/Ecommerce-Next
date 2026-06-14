// Endpoint de carrito de compras.
//
// GET:
// - Obtiene el carrito del usuario autenticado.
// - Lee el userId desde una cookie.
// - Busca el carrito en MongoDB.
// - Normaliza la estructura de los productos.
// - Devuelve los items al frontend.
//
// POST:
// - Guarda o actualiza el carrito.
// - Lee los productos enviados por el frontend.
// - Convierte los datos al formato del modelo Cart.
// - Guarda los cambios en MongoDB.

import { NextResponse } from "next/server" // Utilidad para crear respuestas HTTP en Next.js
import { cookies } from "next/headers" // Permite leer cookies en el servidor
import { connectDB } from "@/lib/mongodb" // Función para conectar a MongoDB
import Cart from "@/models/Cart" // Modelo de carrito de Mongoose

export async function GET() {
  // Endpoint GET: obtener carrito

  try {

    const cookieStore = await cookies() // Obtiene todas las cookies
    const userCookie = cookieStore.get("user") // Busca la cookie "user"

    if (!userCookie) {
      // Si el usuario no está logueado

      return NextResponse.json([], { status: 200 })
      // Devuelve carrito vacío
    }

    const { id } = JSON.parse(userCookie.value)
    // Extrae el id del usuario desde la cookie

    await connectDB()
    // Conecta a MongoDB

    const cart = await Cart.findOne({
      userId: id,
    })
    // Busca el carrito de ese usuario

    // 🔥 Convierte el formato de MongoDB
    // al formato que usa el frontend

    const items =

      cart?.items.map((item: any) => ({

        id: item.productId, // Renombra productId → id
        title: item.title, // Nombre del producto
        price: item.price, // Precio
        image: item.image, // Imagen
        quantity: item.quantity, // Cantidad

      })) || []
      // Si no existe carrito devuelve []

    return NextResponse.json(items)
    // Envía los productos al frontend

  } catch (error) {

    console.error(error)
    // Muestra error en consola

    return NextResponse.json(
      [],
      { status: 500 }
    )
    // Error interno del servidor

  }
}

export async function POST(req: Request) {
  // Endpoint POST: guardar carrito

  try {

    const cookieStore = await cookies()
    // Obtiene cookies

    const userCookie = cookieStore.get("user")
    // Busca cookie del usuario

    if (!userCookie) {

      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
      // Usuario no autenticado

    }

    const { id } = JSON.parse(userCookie.value)
    // Obtiene userId desde la cookie

    const { items } = await req.json()
    // Obtiene items enviados por el frontend

    await connectDB()
    // Conecta a MongoDB

    // 🔥 Convierte el formato del frontend
    // al formato del modelo Cart

    const mappedItems = items.map((item: any) => ({

      productId: item.id,
      // El frontend usa "id"
      // MongoDB usa "productId"

      title: item.title,
      // Nombre del producto

      price: item.price,
      // Precio

      image: item.image,
      // URL de imagen

      quantity: item.quantity,
      // Cantidad

    }))

    await Cart.findOneAndUpdate(

      { userId: id },
      // Busca carrito por usuario

      {
        items: mappedItems,
      },
      // Reemplaza los items

      {
        upsert: true,
        // Si no existe lo crea

        new: true,
        // Devuelve el documento actualizado
      }

    )

    return NextResponse.json({
      success: true,
    })
    // Respuesta exitosa

  } catch (error) {

    console.error(error)
    // Muestra error en consola

    return NextResponse.json(
      {
        error: "Cart save error",
      },
      {
        status: 500,
      }
    )
    // Error interno del servidor

  }
}