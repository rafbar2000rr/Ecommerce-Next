// ======================================================
// MODELO USER (USUARIOS)
// Define la estructura de los usuarios que se guardarán
// en MongoDB. Incluye validaciones, seguridad para la
// contraseña y control de roles.
// ======================================================

import mongoose from "mongoose" // Librería ODM para MongoDB

// ======================================================
// ESQUEMA DEL USUARIO
// ======================================================
const UserSchema = new mongoose.Schema(
  {
    // 👤 Nombre del usuario
    name: {
      type: String, // Debe ser texto
      required: true, // Campo obligatorio
      trim: true, // Elimina espacios al inicio y final
      minlength: 2, // Mínimo 2 caracteres
    },

    // 📧 Correo electrónico
    email: {
      type: String, // Debe ser texto
      required: true, // Campo obligatorio
      unique: true, // No puede repetirse
      lowercase: true, // Convierte automáticamente a minúsculas
      trim: true, // Elimina espacios extra
      match: [
        /^\S+@\S+\.\S+$/, // Expresión regular para validar email
        "Invalid email format",
      ],
    },

    // 🔐 Contraseña encriptada
    password: {
      type: String, // Debe ser texto
      required: true, // Campo obligatorio
      minlength: 6, // Mínimo 6 caracteres
      select: false, // No se devuelve en consultas normales
    },

    // 🛡️ Rol del usuario
    role: {
      type: String, // Debe ser texto
      enum: ["user", "admin"], // Solo permite estos valores
      default: "user", // Por defecto será usuario normal
    },
  },

  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
  }
)

// ======================================================
// EXPORTAR MODELO
//
// Si ya existe el modelo User lo reutiliza.
// Si no existe lo crea.
//
// Evita errores durante Hot Reload en Next.js.
// ======================================================
export default mongoose.models.User ||
  mongoose.model("User", UserSchema)