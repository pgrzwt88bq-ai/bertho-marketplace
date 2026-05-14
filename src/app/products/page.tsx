import {Card, CardContent} from "@/components/ui/card";

export const revalidate = 60;

export const metadata = {
  title: "Products | Bertho Marketplace",
  description: "Browse our products available in XOF. Fast delivery and secure payment."
};

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products`, {
    next: { revalidate: 60 },
    cache: 'force-cache'
  });

  if (!res.ok) return [];
  const data = await res.json();
  return data.products?.items || [];
}

export default async function ProductsPage() {
  const products = await getProducts();

  if (products.length === 0) {
    return <div className="text-center py-12">Aucun produit trouvé</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Products</h1>
        <p className="text-muted-foreground text-lg">
          Discover our selection available now
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p: any) => (
          <Card key={p.id} className="overflow-hidden">
            <CardContent className="pt-6 space-y-3">
              <h3 className="font-semibold text-lg">{p.name}</h3>
              <p className="text-2xl font-bold text-primary">
                {p.variants[0]?.priceWithTax?.toLocaleString()?? 'N/A'} {p.variants[0]?.currencyCode?? ''}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}