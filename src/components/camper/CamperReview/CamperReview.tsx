'use client';

import Icon from '@/components/ui/Icon/Icon';
import styles from './CamperReview.module.css';

export interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

interface CamperReviewProps {
  review: Review;
}

export default function CamperReview({ review }: CamperReviewProps) {
  const initial = review.reviewer_name?.charAt(0).toUpperCase() || 'U';

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar}>{initial}</div>

        <div className={styles.meta}>
          <span className={styles.name}>{review.reviewer_name}</span>

          <div className={styles.stars}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Icon
                key={i}
                name={i < review.reviewer_rating ? 'star' : 'star-empty'}
                width={16}
                height={16}
              />
            ))}
          </div>
        </div>
      </div>

      <p className={styles.comment}>{review.comment}</p>
    </div>
  );
}
