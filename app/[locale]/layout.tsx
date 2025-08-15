import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  if (!locales.includes(locale as any)) notFound();

  return {
    title: locale === 'es' ? 'Mapa de La Habana - Restaurantes, Conciertos y Bares' : 'Havana Map - Restaurants, Concerts and Bars',
    description: locale === 'es' 
      ? 'Descubre los mejores restaurantes, conciertos y bares de La Habana, Cuba con nuestro mapa interactivo.'
      : 'Discover the best restaurants, concerts and bars in Havana, Cuba with our interactive map.',
    keywords: locale === 'es' 
      ? 'mapa, la habana, cuba, restaurantes, conciertos, bares, lugares, geolocalización'
      : 'map, havana, cuba, restaurants, concerts, bars, places, geolocation',
  };
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) notFound();

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
