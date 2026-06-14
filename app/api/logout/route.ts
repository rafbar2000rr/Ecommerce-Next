// Endpoint de Logout.
//
// Elimina la cookie de sesión del usuario.
// Después de ejecutar este endpoint,
// el usuario deja de estar autenticado.

import { NextResponse } from "next/server" // Utilidad para crear respuestas HTTP

export async function POST() {
  // Endpoint POST para cerrar sesión

  const res = NextResponse.json({
    success: true,
  })
  // Crea una respuesta exitosa

  res.cookies.set(

    "user", // Nombre de la cookie

    "", // Valor vacío

    {
      maxAge: 0,
      // 🔥 La cookie expira inmediatamente

      path: "/",
      // La eliminación aplica a toda la aplicación
    }

  )

  return res
  // Devuelve la respuesta con la cookie eliminada
}