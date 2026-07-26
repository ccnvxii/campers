'use client';

import Image from 'next/image';
import Button from '@/components/ui/Button/Button';
import Icon from '@/components/ui/Icon/Icon';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  onReset: () => void;
}

export default function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className={styles.wrapper}>
      {/* Ілюстрація з лупою та кемпером */}
      <div className={styles.imageWrapper}>
        <Image
          src="/images/no-found.webp"
          alt="No campers found"
          width={400}
          height={200}
          priority
        />
      </div>

      <h2 className={styles.title}>No campers found</h2>

      <p className={styles.subtitle}>
        We couldn`t find any campers that match your filters.
        <br />
        Try adjusting your search or clearing some filters.
      </p>

      {/* Кнопки під текстом */}
      <div className={styles.actions}>
        <button type="button" onClick={onReset} className={styles.clearBtn}>
          <Icon name="close" width={16} height={16} />
          Clear filters
        </button>

        <Button
          onClick={onReset}
          variant="primary"
          className={styles.viewAllBtn}
        >
          View all campers
        </Button>
      </div>
    </div>
  );
}
