export async function GET() {
    const res = await fetch("https://server.linearhub.com/api/products")
    const data = await res.json()
    return new Response(JSON.stringify(data))
}