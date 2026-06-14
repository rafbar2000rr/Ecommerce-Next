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

      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <h2 className="text-2xl font-bold">Productos</h2>
        <span className="text-sm text-slate-500">Explora nuestra colección</span>
      </div>

      <ProductList />
      {/* Lista de productos */}

    </main>

  )

}