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

      <section className="mb-8 rounded-3xl bg-gradient-to-r from-fuchsia-500 via-violet-600 to-cyan-500 p-8 text-white shadow-2xl">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-white/80 mb-3">
            Bienvenido a MiTienda
          </p>
          {/* Encabezado promocional retirado a petición del usuario */}
          <p className="mt-4 text-white/80 max-w-2xl">
            Compra artículos seleccionados con envío rápido y una experiencia moderna pensada para que encuentres lo que más te gusta.
          </p>
        </div>
      </section>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <h2 className="text-2xl font-bold">Productos</h2>
        <span className="text-sm text-slate-500">Explora nuestra colección</span>
      </div>

      <ProductList />
      {/* Lista de productos */}

    </main>

  )

}