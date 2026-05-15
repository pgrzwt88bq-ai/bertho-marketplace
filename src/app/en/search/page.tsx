import { Card } from "@/components/ui/card"

export const metadata = {
  title: "Search | Bertho Marketplace",
  description: "Browse our products"
};

async function getProducts() {
  const url = process.env.NEXT_PUBLIC_VENDURE_URL;
  
  if (!url) {
    console.error('NEXT_PUBLIC_VENDURE_URL is not set');
    return [];
  }

  try {
    const res = await fetch(`${url}/shop-api`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query { products { items { id name slug }`
      }),
      cache: 'no-store' // Important : pas de cache pour tester
    });

    if (!res.ok) {
      console.error('Vendure error:', res.status);
      return [];
    }

    const data = await res.json();
    return data.data?.products?.items || [];
  } catch (e) {
    console.error('Fetch error:', e);
    return [];
  }
}

export default async function SearchPage() {
  const products = await getProducts();

  if (products.length === 0) {
    return <div className="text-center py-12">Aucun produit trouvé</div>
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((p: any) => (
          <Card key={p.id}>{p.name}</Card>
        ))}
      </div>
    </div>
  )
}