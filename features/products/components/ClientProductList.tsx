"use client"

import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"

export default function ClientProductList() {
  const [products, setProducts] = useState<any[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    fetch("https://fakestoreapi.com/products")
      .then(async (res) => {
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
        const data = await res.json()
        if (mounted) setProducts(data)
      })
      .catch((err) => {
        if (mounted) setError(String(err?.message || err))
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  if (loading) return <div className="p-8 text-center">Cargando productos...</div>
  if (error)
    return (
      <div className="p-8 text-center text-red-600">
        No se pudieron cargar los productos (cliente). {error}
      </div>
    )

  if (!products || products.length === 0)
    return <div className="p-8 text-center">No hay productos disponibles.</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
