export async function GET() {
  const res = await fetch('https://vendure-king.onrender.com/shop-api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'vendure-token': 'bertho-token'
    },
    body: JSON.stringify({
      query: `{ products(options: { take: 10 }) { totalItems items { id name slug variants { priceWithTax { amount currencyCode }`
    }),
    cache: 'no-store'
  });

  const data = await res.json();
  return Response.json(data);
}