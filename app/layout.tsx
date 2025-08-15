import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mapa de La Habana - Restaurantes, Conciertos y Bares',
  description: 'Descubre los mejores restaurantes, conciertos y bares de La Habana, Cuba con nuestro mapa interactivo.',
  keywords: 'mapa, la habana, cuba, restaurantes, conciertos, bares, lugares, geolocalización',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
