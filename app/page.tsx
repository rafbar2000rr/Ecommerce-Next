// Página principal (Home) del e-commerce.
//
// Se muestra cuando el usuario visita "/".
// Muestra el título de la sección de productos.
// Renderiza la lista de productos.
// Es un Server Component porque no utiliza hooks de React.
// ProductList será el encargado de obtener y mostrar los productos.

//Primero aparece el titulo Productos y debajo se muestran los productos 
// llamando al modulo ProductList.  

import React from "react" // Importa React (opcional en Next.js 13+)

import ProductList from "@/features/products/components/ProductList"
// Componente que muestra todos los productos

export default function Home() {

  return (

    <main className="p-6">
      {/* Contenedor principal con padding */}

      <section className="mb-8 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-8 text-white shadow-2xl">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400 mb-3">
            Welcome to MyStore
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Discover curated products for every moment.
          </h1>
          <p className="mt-4 text-slate-300 max-w-2xl">
            Shop the latest items with fast shipping, handcrafted layouts, and a modern shopping experience designed to help you find what you love.
          </p>
        </div>
      </section>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Products</h2>
        <span className="text-sm text-slate-500">Browse our collection</span>
      </div>

      <ProductList />
      {/* Lista de productos */}

    </main>

  )

}