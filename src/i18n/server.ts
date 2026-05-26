import { getLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export async function getRouteLocale(): Promise<string> {
  const loc = await getLocale();
  return hasLocale(routing.locales, loc) ? loc : routing.defaultLocale;
}