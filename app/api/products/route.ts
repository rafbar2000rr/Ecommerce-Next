// import { NextResponse } from "next/server"

// export async function GET() {
//   const url = "https://fakestoreapi.com/products"

//   try {
//     const res = await fetch(url, { next: { revalidate: 300 } })

//     const text = await res.text().catch(() => "<no body>")

//     if (!res.ok) {
//       console.error("/api/products proxy error:", res.status, res.statusText)
//       return new NextResponse(text, {
//         status: res.status,
//         headers: { "content-type": "text/plain" },
//       })
//     }

//     const data = JSON.parse(text)

//     return NextResponse.json(data, {
//       status: 200,
//       headers: {
//         "cache-control": "public, s-maxage=300, stale-while-revalidate=299",
//       },
//     })
//   } catch (err) {
//     console.error("/api/products network error:", err)
//     return NextResponse.json({ error: "Error fetching products" }, { status: 502 })
//   }
// }

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Hola desde /api/products",
  });
}