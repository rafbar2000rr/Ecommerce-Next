// Endpoint para obtener el usuario autenticado.
//
// Lee la cookie "user".
// Si no existe, devuelve null.
// Si existe, devuelve los datos almacenados
// dentro de la cookie.
//
// Este endpoint suele usarse para saber
// quién está logueado actualmente.

import { NextResponse } from "next/server" // Utilidad para crear respuestas HTTP
import { cookies } from "next/headers" // Permite acceder a las cookies del request

export async function GET() {
  // Endpoint GET para obtener el usuario actual

  const cookieStore = await cookies()
  // Obtiene todas las cookies disponibles

  const userCookie = cookieStore.get("user")
  // Busca la cookie llamada "user"

  if (!userCookie) {
    // Si no existe la cookie

    return NextResponse.json(null)
    // Devuelve null indicando que no hay usuario autenticado

  }

  return NextResponse.json(

    JSON.parse(userCookie.value)

    // Convierte el texto JSON almacenado
    // en la cookie a un objeto JavaScript
    // y lo devuelve al frontend

  )
}