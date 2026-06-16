import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  if (!id) {
    return NextResponse.json(
      { error: "Missing product id" },
      { status: 400 }
    )
  }

  const url = `https://fakestoreapi.com/products/${id}`

  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
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
    return NextResponse.json(
      { error: "Proxy fetch failed" },
      { status: 502 }
    )
  }
}