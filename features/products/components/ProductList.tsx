// Lista de productos del catálogo.
//
// Este componente:
// - Obtiene todos los productos desde el servicio getProducts().
// - Espera la respuesta del servidor.
// - Recorre el arreglo de productos.
// - Renderiza un ProductCard por cada producto.
// - Organiza las tarjetas usando CSS Grid responsive.
//
// Es un Server Component porque:
// - No usa useState.
// - No usa useEffect.
// - No tiene eventos.
// - Puede ejecutar código async directamente.
// - Obtiene datos antes de enviar el HTML al navegador.

// Se mapea el modulo ProductCard enviándole el key y el product obtenidos con la función
// getproduts() de services.

import { getProducts } from "../services/getProducts"
// Función que obtiene todos los productos

import ProductCard from "./ProductCard"
// Componente que muestra una tarjeta individual

export default async function ProductList() {
  // Componente asíncrono

  let products: any[] = []

  try {
    products = await getProducts()
  } catch (err: any) {
    console.error('ProductList error fetching products:', err)

    return (
      <div className="p-8 text-center text-red-600">
        No se pudieron cargar los productos. Intenta de nuevo más tarde.
      </div>
    )
  }

  return (

    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-6
      "
    >
      {/* Grid responsive de productos */}

      {products.map((product: any) => (
        // Recorre todos los productos

        <ProductCard

          key={product.id}
          // Identificador único para React

          product={product}
          // Envía el producto completo como prop

        />

      ))}

    </div>

  )
}