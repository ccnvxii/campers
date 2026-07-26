import type { Metadata } from 'next';
import './globals.css';
import styles from './RootLayout.module.css';
import Header from '@/components/layout/Header/Header';
import Providers from './providers';
import Loader from '@/components/Loader/Loader';

export const metadata: Metadata = {
  title: 'TravelTrucks - Camper Rental',
  description: 'Rent the best campers for your journey',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background text-text-color-main antialiased">
      <body className={`${styles.layout} ${styles.main}`}>
        <Providers>
          <Header />
          <main className={styles.main}>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
