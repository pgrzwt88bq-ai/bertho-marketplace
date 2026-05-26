import { unstable_noStore as noStore } from 'next/cache';
import { query } from './api';
import { GetActiveChannelQuery, GetAvailableCountriesQuery, GetTopCollectionsQuery } from './queries';

export async function getActiveChannelCached() {
    noStore();
    const result = await query(GetActiveChannelQuery);
    return result.data.activeChannel;
}

export async function getAvailableCountriesCached(locale: string) {
    noStore();
    const result = await query(GetAvailableCountriesQuery, undefined, { languageCode: locale });
    return result.data.availableCountries || [];
}

export async function getTopCollections(locale: string) {
    noStore();
    const result = await query(GetTopCollectionsQuery, undefined, { languageCode: locale });
    return result.data.collections.items;
}