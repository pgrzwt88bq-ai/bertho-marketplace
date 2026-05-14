export async function GET() {
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
              priceWithTax {
                amount
                currencyCode
              }
            }
          }
        }
      }`
    }),
    cache: 'no-store'
  });

  const data = await res.json();
  return Response.json(data);
}