// Contexto global del carrito.
//
// Centraliza toda la lógica del carrito.
// Permite compartir el carrito entre todos los componentes.
// Soporta usuarios invitados (guest) y usuarios logueados.
// Sincroniza el carrito con localStorage.
// Sincroniza el carrito con el backend.
// Fusiona carrito guest + carrito del servidor al iniciar sesión.
// Calcula automáticamente el total.
// Controla la apertura y cierre del CartDrawer.
// Expone funciones para agregar, eliminar y modificar productos.
// Debe ser Client Component porque usa estado, efectos y localStorage.

"use client" // Componente cliente

import {
  createContext, // Crea el contexto global
  useContext, // Consume el contexto
  useEffect, // Ejecuta efectos secundarios
  useState, // Maneja estado
} from "react"

import { useUser } from "@/hooks/useUser"
// Hook para obtener el usuario logueado

import { apiCall } from "@/lib/api"
// Función auxiliar para llamadas a API

// Tipo de producto
type Product = {

  id: number // Id del producto

  title: string // Nombre

  price: number // Precio

  image: string // Imagen

}

// Producto + cantidad
type CartItem = Product & {

  quantity: number

}

// Contrato del contexto
type CartContextType = {

  cart: CartItem[]
  // Productos del carrito

  addToCart: (product: Product) => void
  // Agrega producto

  removeFromCart: (id: number) => void
  // Elimina producto

  increaseQty: (id: number) => void
  // Incrementa cantidad

  decreaseQty: (id: number) => void
  // Reduce cantidad

  total: number
  // Total del carrito

  isOpen: boolean
  // Estado del drawer

  openCart: () => void
  // Abre drawer

  closeCart: () => void
  // Cierra drawer

  clearCart: () => void
  // Vacía carrito

}

// Contexto global
const CartContext =
  createContext<CartContextType | null>(null)

export function CartProvider({

  children,

}: {

  children: React.ReactNode

}) {

  const { data: user } = useUser()
  // Usuario actual

  const [cart, setCart] =
    useState<CartItem[]>([])
  // Productos del carrito

  const [isOpen, setIsOpen] =
    useState(false)
  // Estado del drawer

  const [isInitialized, setIsInitialized] =
    useState(false)
  // Evita sincronizaciones prematuras

  const cartKey =
    user
      ? `cart-${user.id}`
      : "cart-guest"
  // Clave para localStorage

  const openCart = () => setIsOpen(true)
  // Abre drawer

  const closeCart = () => setIsOpen(false)
  // Cierra drawer

  const [prevUser, setPrevUser] =
    useState<any>(null)
  // Guarda usuario anterior

  // ====================================
  // 🔥 LOAD + MERGE
  // ====================================

  useEffect(() => {

    const loadCart = async () => {

      const guestRaw =
        localStorage.getItem("cart-guest")
      // Lee carrito invitado

      const guestCart =
        guestRaw
          ? JSON.parse(guestRaw)
          : []
      // Convierte JSON a arreglo

      // LOGIN detectado
      if (user && !prevUser) {

        let serverCart: CartItem[] = []

        try {

          const res =
            await apiCall("/api/cart")
          // Obtiene carrito del backend

          if (res.ok) {

            serverCart =
              await res.json()

          }

        } catch {}

        // Fusionar guest + backend
        const map =
          new Map<number, CartItem>()

        ;[
          ...guestCart,
          ...serverCart,
        ].forEach((item) => {

          if (map.has(item.id)) {

            map.set(item.id, {

              ...item,

              quantity:
                map.get(item.id)!
                  .quantity +
                item.quantity,

            })

          } else {

            map.set(item.id, item)

          }

        })

        const merged =
          Array.from(map.values())
        // Carrito fusionado

        setCart(merged)

        // Guardar carrito fusionado
        await apiCall("/api/cart", {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            items: merged,
          }),

        })

        // Eliminar guest
        localStorage.removeItem(
          "cart-guest"
        )

      }

      // Usuario ya logueado
      else if (user) {

        try {

          const res =
            await apiCall("/api/cart")

          if (res.ok) {

            const data =
              await res.json()

            setCart(data)

          }

        } catch {}

      }

      // Usuario invitado
      else {

        setCart(guestCart)

      }

      setPrevUser(user)
      // Guarda usuario actual

      setIsInitialized(true)
      // Marca inicialización terminada

    }

    loadCart()

  }, [user])

  // ====================================
  // 🔥 SINCRONIZACIÓN
  // ====================================

  useEffect(() => {

    if (!isInitialized)
      return
    // Espera inicialización

    // LOCAL STORAGE
    if (cart.length === 0) {

      localStorage.removeItem(
        cartKey
      )

    } else {

      localStorage.setItem(
        cartKey,
        JSON.stringify(cart)
      )

    }

    // BACKEND
    if (user) {

      const timeout =
        setTimeout(async () => {

          try {

            await apiCall("/api/cart", {

              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                items: cart,
              }),

            })

          } catch (err) {

            console.error(
              "Sync cart failed",
              err
            )

          }

        }, 400)
      // Debounce de 400 ms

      return () =>
        clearTimeout(timeout)
      // Limpia timeout anterior

    }

  }, [
    cart,
    cartKey,
    user,
    isInitialized,
  ])

  // ====================================
  // 🛒 AGREGAR PRODUCTO
  // ====================================

  const addToCart = (
    product: Product
  ) => {

    setCart((prev) => {

      const exists =
        prev.find(
          (i) =>
            i.id === product.id
        )

      if (exists) {

        return prev.map((i) =>

          i.id === product.id

            ? {
                ...i,
                quantity:
                  i.quantity + 1,
              }

            : i

        )

      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ]

    })

    setIsOpen(true)
    // Abre drawer automáticamente

  }

  // ====================================
  // ❌ ELIMINAR PRODUCTO
  // ====================================

  const removeFromCart = (
    id: number
  ) => {

    setCart((prev) =>

      prev.filter(
        (i) => i.id !== id
      )

    )

  }

  // ====================================
  // ➕ AUMENTAR CANTIDAD
  // ====================================

  const increaseQty = (
    id: number
  ) => {

    setCart((prev) =>

      prev.map((i) =>

        i.id === id

          ? {
              ...i,
              quantity:
                i.quantity + 1,
            }

          : i

      )

    )

  }

  // ====================================
  // ➖ REDUCIR CANTIDAD
  // ====================================

  const decreaseQty = (
    id: number
  ) => {

    setCart((prev) =>

      prev

        .map((i) =>

          i.id === id

            ? {
                ...i,
                quantity:
                  i.quantity - 1,
              }

            : i

        )

        .filter(
          (i) => i.quantity > 0
        )
      // Elimina productos en 0

    )

  }

  // ====================================
  // 🧹 LIMPIAR CARRITO
  // ====================================

  const clearCart = () => {

    setCart([])
    // Vacía estado

    localStorage.removeItem(
      cartKey
    )
    // Elimina almacenamiento local

    setIsOpen(false)
    // Cierra drawer

    if (user) {

      apiCall("/api/cart", {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          items: [],
        }),

      })

    }

  }

  // ====================================
  // 💰 TOTAL
  // ====================================

  const total = cart.reduce(

    (acc, item) =>

      acc +
      item.price *
      item.quantity,

    0

  )
  // Suma todos los subtotales

  return (

    <CartContext.Provider

      value={{

        cart,

        addToCart,

        removeFromCart,

        increaseQty,

        decreaseQty,

        total,

        isOpen,

        openCart,

        closeCart,

        clearCart,

      }}

    >

      {children}

    </CartContext.Provider>

  )

}

// Hook personalizado
export function useCart() {

  const context =
    useContext(CartContext)

  if (!context)

    throw new Error(
      "useCart must be used within CartProvider"
    )

  return context

}