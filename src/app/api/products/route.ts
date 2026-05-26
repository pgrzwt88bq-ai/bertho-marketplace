export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const res = await fetch(process.env.VENDURE_SHOP_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'vendure-token': process.env.VENDURE_CHANNEL_TOKEN!
      },
      body: JSON.stringify({
        query: `{
          products(options: { take: 10 }) {
            totalItems
            items {
              id
              name
              slug
              variants {
                id
                priceWithTax
                currencyCode
              }
            }
          }
        }`
      }),
      cache: 'no-store'
    });

    const data = await res.json();
    
    if (data.errors) {
      return Response.json({ error: data.errors }, { status: 500 })
    }
    
    return Response.json(data.data.products.items);
    
  } catch (e) {
    return Response.json({ error: "Fetch failed", details: String(e) }, { status: 500 })
  }
}