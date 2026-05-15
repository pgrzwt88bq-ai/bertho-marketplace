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

  // Évite d'avoir /shop-api/shop-api si la variable contient déjà le chemin
  const endpoint = url.endsWith('/shop-api') ? url : `${url}/shop-api`;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // CORRECTION : Ajout des deux accolades fermantes
        query: `query { products { items { id name slug } } }`
      }),
      cache: 'no-store' // Pas de cache pour tester
    });

    if (!res.ok) {
      console.error('Vendure HTTP error:', res.status, res.statusText);
      return [];
    }

    const data = await res.json();

    // Log des erreurs spécifiques à GraphQL
    if (data.errors) {
      console.error('Vendure GraphQL error:', JSON.stringify(data.errors, null, 2));
      return [];
    }

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
          <Card key={p.id} className="p-4">{p.name}</Card>
        ))}
      </div>
    </div>
  )
}