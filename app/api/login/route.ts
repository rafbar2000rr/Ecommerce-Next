// Endpoint de Login.
//
// Recibe email y password.
// Valida credenciales.
// Crea cookie de sesión.
// Devuelve el usuario autenticado.

import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import User from "@/models/User"
import { connectDB } from "@/lib/mongodb"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    const normalizedEmail = email
      .toLowerCase()
      .trim()

    await connectDB()

    const user = await User
      .findOne({
        email: normalizedEmail,
      })
      .select("+password")

    if (!user || !user.password) {
      return NextResponse.json(
        {
          error: "Invalid credentials",
        },
        {
          status: 401,
        }
      )
    }

    const isValid = await bcrypt.compare(
      password,
      user.password
    )

    if (!isValid) {
      return NextResponse.json(
        {
          error: "Invalid credentials",
        },
        {
          status: 401,
        }
      )
    }

    // 🔥 Datos públicos del usuario
    const userData = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    }

    // 🔥 Respuesta que recibirá el frontend
    const res = NextResponse.json({
      success: true,
      user: userData,
    })

    // 🔥 Cookie de sesión
    res.cookies.set(
      "user",
      JSON.stringify(userData),
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60,
      }
    )

    return res

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      {
        error: "Login error",
      },
      {
        status: 500,
      }
    )
  }
}