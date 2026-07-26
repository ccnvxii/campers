'use client';

import Image from 'next/image';
import type { CamperListItem } from '@/types/camper';
import Icon from '@/components/ui/Icon/Icon';
import Button from '@/components/ui/Button/Button';
import styles from './CamperCard.module.css';

interface CamperCardProps {
  camper: CamperListItem;
}

export default function CamperCard({ camper }: CamperCardProps) {
  return (
    <div className={styles.card}>
      {/* Картинка кемпера */}
      <div className={styles.imageWrapper}>
        <Image
          src={camper.coverImage}
          alt={camper.name}
          fill
          sizes="290px"
          className={styles.image}
        />
      </div>

      {/* Інформація */}
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>{camper.name}</h2>
          <span className={styles.price}>€{camper.price}</span>
        </div>

        <div className={styles.subHeader}>
          <span className={styles.rating}>
            <Icon name="star" width={16} height={16} />
            {camper.rating}({camper.totalReviews} Reviews)
          </span>
          <span className={styles.location}>
            <Icon name="map" width={16} height={16} />
            {camper.location}
          </span>
        </div>

        <p className={styles.description}>
          {camper.description ||
            'The pictures shown here are example vehicles of the respective...'}
        </p>

        {/* Бейджі з характеристиками */}
        <div className={styles.badges}>
          <span className={styles.badge}>
            <Icon name="petrol" width={20} height={20} />
            {camper.engine}
          </span>
          <span className={styles.badge}>
            <Icon name="utomatic" width={20} height={20} />
            {camper.transmission}
          </span>
          <span className={styles.badge}>
            <Icon name="alcove" width={20} height={20} />
            {camper.form}
          </span>
        </div>

        <div className={styles.buttonWrapper}>
          <Button href={`/catalog/${camper.id}`} className={styles.showMoreBtn}>
            Show more
          </Button>
        </div>
      </div>
    </div>
  );
}
