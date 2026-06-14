// Endpoint de registro de usuarios.
//
// Recibe nombre, email y contraseña.
// Valida los datos usando Zod.
// Normaliza el email.
// Verifica que el email no exista.
// Encripta la contraseña con bcrypt.
// Crea el usuario en MongoDB.
// Devuelve los datos públicos del usuario creado.

import { NextResponse } from "next/server" // Utilidad para crear respuestas HTTP
import { connectDB } from "@/lib/mongodb" // Función para conectar a MongoDB
import User from "@/models/User" // Modelo de usuario
import bcrypt from "bcryptjs" // Librería para encriptar contraseñas
import { registerSchema } from "@/lib/validators/auth" // Schema Zod para validar registro

export async function POST(req: Request) {
  // Endpoint POST para registrar usuario

  try {

    const body = await req.json()
    // Obtiene los datos enviados por el frontend

    // 🔥 Validación profesional con Zod
    const parsed = registerSchema.safeParse(body)

    if (!parsed.success) {

      return NextResponse.json(
        {
          error: parsed.error.flatten(),
          // Devuelve los errores de validación
        },
        {
          status: 400,
        }
      )

    }

    let {
      name,
      email,
      password,
    } = parsed.data
    // Obtiene datos ya validados

    // 🧼 Normaliza el email
    email = email
      .toLowerCase() // Convierte a minúsculas
      .trim() // Elimina espacios

    await connectDB()
    // Conecta a MongoDB

    // 🔁 Verifica si el email ya existe
    const exists = await User.findOne({
      email,
    })

    if (exists) {

      return NextResponse.json(
        {
          error: "Email already registered",
        },
        {
          status: 400,
        }
      )

    }

    // 🔐 Genera hash seguro de la contraseña
    const hashed = await bcrypt.hash(
      password,
      10
    )
    // 10 = salt rounds

    const user = await User.create({

      name,
      // Nombre del usuario

      email,
      // Email normalizado

      password: hashed,
      // Contraseña encriptada

    })

    // 🚫 Nunca devolver password
    return NextResponse.json(

      {

        id: user._id,
        // ID generado por MongoDB

        name: user.name,
        // Nombre

        email: user.email,
        // Email

      },

      {
        status: 201,
      }

    )

  } catch (err) {

    console.error(err)
    // Mostrar error en consola

    return NextResponse.json(
      {
        error: "Server error",
      },
      {
        status: 500,
      }
    )

  }
}