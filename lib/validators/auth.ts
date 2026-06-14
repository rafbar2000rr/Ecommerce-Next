// ======================================================
// ESQUEMAS DE VALIDACIÓN CON ZOD
// Define las reglas para validar los datos de registro
// y login antes de procesarlos en el backend.
// ======================================================

import { z } from "zod" // Librería para validación de datos

// ======================================================
// VALIDACIÓN DEL FORMULARIO DE REGISTRO
// ======================================================
export const registerSchema = z.object({
  name: z // Campo name
    .string() // Debe ser un texto
    .min(2, "Name must be at least 2 characters"), // Mínimo 2 caracteres

  email: z // Campo email
    .string() // Debe ser un texto
    .email("Invalid email format"), // Debe tener formato válido de email

  password: z // Campo password
    .string() // Debe ser un texto
    .min(6, "Password must be at least 6 characters") // Mínimo 6 caracteres
    .regex(/[A-Z]/, "Must include 1 uppercase letter") // Debe contener una mayúscula
    .regex(/[0-9]/, "Must include 1 number"), // Debe contener un número
})

// ======================================================
// VALIDACIÓN DEL FORMULARIO DE LOGIN
// ======================================================
export const loginSchema = z.object({
  email: z
    .string() // Debe ser texto
    .email("Invalid email"), // Debe tener formato de email válido

  password: z
    .string() // Debe ser texto
    .min(1, "Password required"), // No puede estar vacío
})