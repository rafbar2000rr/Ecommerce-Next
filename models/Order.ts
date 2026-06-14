// ======================================================
// MODELO ORDER (PEDIDOS)
// Define la estructura de los pedidos que se guardarán
// en MongoDB. Cada pedido pertenece a un usuario,
// contiene datos del cliente, productos comprados,
// total de la compra y estado del pedido.
// ======================================================

import mongoose from "mongoose" // Librería ODM para MongoDB

// ======================================================
// SUBDOCUMENTO ITEM DEL PEDIDO
// Representa cada producto comprado
// ======================================================
const OrderItemSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true }, // ID del producto
    title: { type: String, required: true }, // Nombre del producto
    price: { type: Number, required: true }, // Precio unitario
    quantity: { type: Number, required: true }, // Cantidad comprada
    image: { type: String, required: true }, // URL de la imagen del producto
  },
  {
    _id: false, // Evita crear un _id para cada item del pedido
  }
)

// ======================================================
// SUBDOCUMENTO CUSTOMER
// Datos del cliente al momento de comprar
// ======================================================
const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Nombre del cliente
    email: { type: String, required: true }, // Correo del cliente
    address: { type: String, required: true }, // Dirección de envío
  },
  {
    _id: false, // Evita crear un _id para customer
  }
)

// ======================================================
// ESQUEMA PRINCIPAL DEL PEDIDO
// ======================================================
const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Referencia a un ObjectId
      ref: "User", // Relación con la colección User
      required: true, // Obligatorio
    },

    customer: {
      type: CustomerSchema, // Información del cliente
      required: true,
    },

    items: {
      type: [OrderItemSchema], // Array de productos comprados
      required: true,
    },

    total: {
      type: Number, // Total de la compra
      required: true,
    },

    status: {
      type: String, // Estado actual del pedido
      enum: [
        "pending",
        "paid",
        "shipped",
        "cancelled",
      ], // Valores permitidos
      default: "pending", // Estado inicial
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
  }
)

// ======================================================
// EXPORTAR MODELO
//
// Si el modelo ya existe lo reutiliza.
// Si no existe lo crea.
//
// Evita errores durante Hot Reload en Next.js.
// ======================================================
export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema)