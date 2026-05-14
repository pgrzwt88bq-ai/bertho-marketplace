import type {Metadata} from 'next';
import {getTranslations, getRouteLocale} from 'next-intl/server';
import {Card, CardContent} from "@/components/ui/card";
import {SITE_NAME} from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'Products'});

    return {
        title: `${t('title')} | ${SITE_NAME}`,
        description: t('description'),
        openGraph: {
            title: `${t('title')} | ${SITE_NAME}`,
            description: t('description'),
        },
        alternates: {
            languages: {
                'en': '/en/products',
                'fr': '/fr/products',
            },
        },
    };
}

async function ProductsList() {
    const res = await fetch(`/api/products`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        return <div className="text-center py-12">Erreur de chargement des produits</div>;
    }

    const data = await res.json();
    const products = data.products?.items || [];

    if (products.length === 0) {
        return <div className="text-center py-12">Aucun produit trouvé</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p: any) => (
                <Card key={p.id} className="overflow-hidden">
                    <CardContent className="pt-6 space-y-3">
                        <h3 className="font-semibold text-lg">{p.name}</h3>
                        <p className="text-2xl font-bold text-primary">
                            {p.variants[0].priceWithTax.toLocaleString()} {p.variants[0].currencyCode}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default async function ProductsPage() {
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'Products'});

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
                <p className="text-muted-foreground text-lg">
                    {t('subtitle')}
                </p>
            </div>

            <ProductsList />
        </div>
    );
}