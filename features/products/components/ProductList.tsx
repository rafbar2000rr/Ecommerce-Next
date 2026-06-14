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

  const products = await getProducts()
  // Obtiene la lista de productos
  // Espera la respuesta antes de renderizar

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