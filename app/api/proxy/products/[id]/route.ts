import { NextResponse } from "next/server"

export async function GET(_req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params

  if (!id) {
    return NextResponse.json({ error: "Missing product id" }, { status: 400 })
  }

  const url = `https://fakestoreapi.com/products/${id}`

  try {
    const res = await fetch(url, {
      // no-store for fresh data
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; Vercel)",
      },
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream error: ${res.status}` },
        { status: res.status }
      )
    }

    const data = await res.json()

    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: "Proxy fetch failed" }, { status: 502 })
  }
}
