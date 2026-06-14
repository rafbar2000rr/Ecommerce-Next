// ======================================================
// MODELO CART (CARRITO DE COMPRAS)
// Define la estructura de los carritos que se guardarán
// en MongoDB. Cada usuario tiene un único carrito y
// dentro del carrito existe una lista de productos.
// ======================================================

// models/Cart.ts

import mongoose from "mongoose" // Librería para crear esquemas y modelos MongoDB

// ======================================================
// SUBDOCUMENTO ITEM DEL CARRITO
// Representa un producto dentro del carrito
// ======================================================
const CartItemSchema = new mongoose.Schema({
  productId: Number, // ID del producto (FakeStore API)
  title: String, // Nombre del producto
  price: Number, // Precio unitario
  image: String, // URL de la imagen
  quantity: Number, // Cantidad agregada al carrito
})

// ======================================================
// ESQUEMA PRINCIPAL DEL CARRITO
// Cada usuario tiene un único documento Cart
// ======================================================
const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // ID del usuario propietario del carrito
      required: true, // Campo obligatorio
      unique: true, // Solo puede existir un carrito por usuario
    },

    items: [CartItemSchema], // Array de productos del carrito
  },

  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
  }
)

// ======================================================
// EXPORTAR MODELO
//
// mongoose.models.Cart:
// reutiliza el modelo si ya existe
//
// mongoose.model(...):
// lo crea si todavía no existe
//
// Esto evita errores durante Hot Reload en Next.js
// ======================================================
export default mongoose.models.Cart ||
  mongoose.model("Cart", CartSchema)