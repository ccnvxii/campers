import styles from './page.module.css';
import { Metadata } from 'next';
import Button from '@/components/ui/Button/Button';

export const metadata: Metadata = {
  title: 'TravelTrucks - Camper Rental',
  description: 'Rent the best campers for your journey',
};

export default function Home() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Campers of your dreams</h1>
          <p className={styles.description}>
            You can find everything you want in our catalog
          </p>
        </div>
        <Button href="/catalog" variant="primary">
          View Now
        </Button>
      </div>
    </section>
  );
}
