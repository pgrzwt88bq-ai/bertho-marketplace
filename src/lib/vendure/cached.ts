import { unstable_noStore as noStore } from 'next/cache';
import { query } from './api';
import { GetActiveChannelQuery, GetAvailableCountriesQuery, GetTopCollectionsQuery } from './queries';

/**
 * Get the active channel.
 * Désactivé le cache pour débloquer le build. 
 * Tu pourras remettre du cache plus tard avec unstable_cache.
 */
export async function getActiveChannelCached() {
    noStore(); // Pas de cache = pas de crash

    const result = await query(GetActiveChannelQuery);
    return result.data.activeChannel;
}

/**
 * Get available countries.
 * Country names are translatable, so locale is required.
 */
export async function getAvailableCountriesCached(locale: string) {
    noStore(); // Pas de cache = pas de crash

    const result = await query(GetAvailableCountriesQuery, undefined, { languageCode: locale });
    return result.data.availableCountries || [];
}

/**
 * Get top-level collections.
 * Collection names are translatable, so locale is required.
 */
export async function getTopCollections(locale: string) {
    noStore(); // Pas de cache = pas de crash

    const result = await query(GetTopCollectionsQuery, undefined, { languageCode: locale });
    return result.data.collections.items;
}