// ==========================================
// MIDDLEWARE
// Se ejecuta antes de que una petición llegue
// a una página o ruta de Next.js.
//
// En este caso protege las rutas /admin,
// permitiendo el acceso únicamente a usuarios
// autenticados con rol "admin".
// ==========================================

import { NextResponse } from "next/server" // Permite continuar o redirigir solicitudes
import type { NextRequest } from "next/server" // Tipo para las solicitudes de Next.js

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get("user") // Obtiene la cookie del usuario

  // Verifica si la ruta comienza con /admin
  if (req.nextUrl.pathname.startsWith("/admin")) {

    // Si no existe cookie, redirige al login
    if (!cookie) {
      return NextResponse.redirect(
        new URL("/login", req.url)
      )
    }

    const user = JSON.parse(cookie.value) // Convierte la cookie a objeto

    // Si existe usuario pero no es admin
    if (user.role !== "admin") {
      return NextResponse.redirect(
        new URL("/", req.url)
      )
    }
  }

  // Permite continuar normalmente
  return NextResponse.next()
}