// Página de Login.
//
// Permite que el usuario ingrese su email y contraseña.
// Envía las credenciales al endpoint /api/login.
// Si el login es exitoso, actualiza el usuario en la caché de React Query.
// Finalmente redirige al Home.
// Si ocurre algún error, muestra un mensaje al usuario.

"use client" // Este componente se ejecuta en el navegador

import { useState } from "react" // Hook para manejar estado local
import { useRouter } from "next/navigation" // Navegación programática
import { useQueryClient } from "@tanstack/react-query" // Acceso a la caché global de React Query
import Link from "next/link"

export default function Page() {

  const router = useRouter() // Permite redireccionar entre páginas
  const queryClient = useQueryClient() // Cliente de React Query

  const [form, setForm] = useState({
    email: "", // Email ingresado por el usuario
    password: "", // Contraseña ingresada por el usuario
  })

  const [loading, setLoading] = useState(false) // Estado de carga
  const [error, setError] = useState("") // Mensaje de error

  const handleLogin = async () => {

    // Evita enviar el formulario vacío
    if (!form.email || !form.password) return

    setLoading(true) // Activa indicador de carga
    setError("") // Limpia errores previos

    try {

      // Envía email y password al backend
      const res = await fetch("/api/login", {
        method: "POST", // Método HTTP
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form), // Convierte el formulario a JSON
      })

      // Obtiene la respuesta del backend
      const data = await res.json()
      console.log(data)
      // Si las credenciales son incorrectas
      if (!res.ok) {

        setError(
          data.error || "Invalid credentials"
        )

        return
      }

      // Guarda el usuario autenticado en la caché de React Query
      queryClient.setQueryData(
        ["me"],
        data.user
      )

      // Redirige al Home
      router.push("/")

    } catch {

      // Error inesperado (servidor caído, red, etc.)
      setError("Something went wrong")

    } finally {

      // Siempre desactiva loading
      setLoading(false)

    }
  }

  return (

    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">

      {/* Título */}
      <h1 className="text-xl font-bold mb-4">
        Login
      </h1>

      {/* Error */}
      {error && (
        <p className="text-red-500">
          {error}
        </p>
      )}

      {/* Campo Email */}
      <input
        placeholder="Email"
        className="border p-2 w-full mb-2"
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
      />

      {/* Campo Password */}
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-4"
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value,
          })
        }
      />

      {/* Botón Login */}
      <button
        onClick={handleLogin}
        disabled={loading} // Evita múltiples clics
        className="bg-black text-white w-full p-2"
      >
        {
          loading
            ? "Logging in..."
            : "Login"
        }
      </button>
      {/* Enlace a registro */}
      <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
      <Link
        href="/register"
        className="text-blue-600 hover:underline">
    
        Sign up
      </Link>
      </p>
    </div>
  )
}