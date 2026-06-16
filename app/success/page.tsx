"use client"

import { useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useCart } from "@/features/cart/context/CartContext"

function SuccessContent() {
  const router = useRouter()
  const params = useSearchParams()
  const { clearCart } = useCart()
  const orderId = params.get("orderId")

  useEffect(() => {
    clearCart()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md">
        <div className="text-green-500 text-5xl mb-4">✔</div>
        <h1 className="text-2xl font-bold mb-2">Pago exitoso</h1>
        <p className="text-gray-500 mb-4">Tu pedido se ha realizado correctamente.</p>
        {orderId && (
          <p className="text-xs text-gray-400 mb-6">ID de orden: {orderId}</p>
        )}
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => router.push("/orders")}
            className="bg-black text-white px-6 py-2 rounded-lg cursor-pointer hover:scale-[1.02] hover:bg-slate-900 transition"
          >
            Ver mis pedidos
          </button>
          <button
            onClick={() => router.push("/")}
            className="border px-6 py-2 rounded-lg cursor-pointer hover:scale-[1.02] transition"
          >
            Seguir comprando
          </button>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  )
}