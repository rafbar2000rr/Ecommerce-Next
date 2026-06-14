// Página de registro de usuarios.
//
// Permite crear una nueva cuenta.
// Controla los campos del formulario.
// Muestra errores de validación.
// Envía los datos al backend.
// Inicia sesión automáticamente después del registro.
// Redirige al usuario al Home.

//Aparece el título "Create account" y un formulario con campos para nombre, email y contraseña.
//El validador de datos Zod los valida antes de enviarlos al backend, mostrando errores debajo 
// de cada campo si no cumplen las reglas (nombre mínimo 2 caracteres, email con formato válido, 
//Si hay errores de validación (nombre muy corto, email inválido, contraseña débil), se muestran
// debajo de cada campo.
//Si ocurre un error general (email ya registrado, servidor caído, etc.), se muestra un mensaje 
// de error general. 
//Si el registro es exitoso, se envía el email y la contraseña al backend api/login, 
// donde se inicia sesión automáticamente y se redirige al Home.

"use client" // Componente cliente

import { useState } from "react" // Hook para manejar estado
import { useRouter } from "next/navigation" // Navegación programática

export default function RegisterPage() {

  const router = useRouter()
  // Permite redireccionar al usuario

  const [form, setForm] = useState({

    name: "",
    // Nombre completo

    email: "",
    // Correo electrónico

    password: "",
    // Contraseña

  })

  const [errors, setErrors] = useState<any>({})
  // Almacena errores de validación

  const [loading, setLoading] = useState(false)
  // Indica si el formulario se está enviando

  const handleChange = (e: any) => {

    const {
      name,
      value,
    } = e.target
    // Obtiene nombre y valor del input

    setForm({

      ...form,

      [name]: value,

    })
    // Actualiza el campo modificado

    // 🔥 Limpia error en tiempo real
    setErrors((prev: any) => ({

      ...prev,

      [name]: null,

    }))

  }

  const handleSubmit = async (e: any) => {

    e.preventDefault()
    // Evita recargar la página

    setLoading(true)
    // Activa estado de carga

    setErrors({})
    // Limpia errores anteriores

    const res = await fetch(

      "/api/register",

      {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(form),

      }

    )
    // Envía datos al backend

    const data = await res.json()
    // Convierte respuesta a JSON

    if (!res.ok) {

      // 🔥 Errores provenientes de Zod
      if (data.error?.fieldErrors) {

        setErrors(
          data.error.fieldErrors
        )

      } else {

        setErrors({
          general: data.error,
        })

      }

      setLoading(false)

      return

    }

    // 🔐 Login automático

    await fetch(

      "/api/login",

      {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          email: form.email,

          password: form.password,

        }),

      }

    )
    // Crea cookie de sesión

    router.push("/")
    // Redirige al Home

  }

  return (

    <form

      onSubmit={handleSubmit}

      className="
        max-w-md mx-auto mt-20
        bg-white p-6
        rounded-xl shadow
        space-y-4
      "

    >

      <h2 className="text-xl font-bold">

        Create account

      </h2>

      {/* ❗ ERROR GENERAL */}
      {errors.general && (

        <p className="text-red-500 text-sm">

          {errors.general}

        </p>

      )}

      {/* NAME */}
      <div>

        <input

          name="name"

          placeholder="Full name"

          value={form.name}

          onChange={handleChange}

          className={`

            w-full border p-2 rounded

            ${
              errors.name
                ? "border-red-500"
                : ""
            }

          `}

        />

        {errors.name && (

          <p className="text-red-500 text-xs mt-1">

            {errors.name[0]}
            {/* Primer error de validación */}

          </p>

        )}

      </div>

      {/* EMAIL */}
      <div>

        <input

          name="email"

          type="email"

          placeholder="Email"

          value={form.email}

          onChange={handleChange}

          className={`

            w-full border p-2 rounded

            ${
              errors.email
                ? "border-red-500"
                : ""
            }

          `}

        />

        {errors.email && (

          <p className="text-red-500 text-xs mt-1">

            {errors.email[0]}

          </p>

        )}

      </div>

      {/* PASSWORD */}
      <div>

        <input

          name="password"

          type="password"

          placeholder="Password"

          value={form.password}

          onChange={handleChange}

          className={`

            w-full border p-2 rounded

            ${
              errors.password
                ? "border-red-500"
                : ""
            }

          `}

        />

        {errors.password && (

          <p className="text-red-500 text-xs mt-1">

            {errors.password[0]}

          </p>

        )}

      </div>

      {/* BOTÓN */}
      <button

        disabled={loading}

        className="
          w-full
          bg-black
          text-white
          py-2
          rounded
          disabled:opacity-50
        "

      >

        {

          loading
            ? "Creating..."
            : "Sign up"

        }

      </button>

    </form>

  )

}