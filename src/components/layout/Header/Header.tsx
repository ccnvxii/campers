'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  {
    return (
      <header className={styles.header}>
        <div className={styles.container}>
          {/* Логотип */}
          <Link href="/" className={styles.logo}>
            <Image
              src="/logo.svg"
              alt="TravelTrucks Logo"
              width={136}
              height={16}
              priority
            />
          </Link>
          {/* Навігація */}
          <nav className={styles.nav}>
            <Link
              href="/"
              className={usePathname() === '/' ? styles.active : ''}
            >
              Home
            </Link>
            <Link
              href="/catalog"
              className={usePathname() === '/catalog' ? styles.active : ''}
            >
              Catalog
            </Link>
          </nav>
        </div>
      </header>
    );
  }
}
