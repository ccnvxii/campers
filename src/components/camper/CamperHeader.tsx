'use client';

import Icon from '@/components/ui/Icon/Icon';
import styles from './CamperReviews.module.css';

export interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

interface CamperReviewsProps {
  reviews: Review[];
}

export default function CamperReviews({ reviews }: CamperReviewsProps) {
  if (!reviews || reviews.length === 0) {
    return <p className={styles.noReviews}>No reviews yet.</p>;
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Reviews</h3>

      <div className={styles.list}>
        {reviews.map((review, index) => {
          // Отримуємо першу літеру імені для аватара
          const initial = review.reviewer_name?.charAt(0).toUpperCase() || 'U';

          return (
            <div key={index} className={styles.card}>
              <div className={styles.header}>
                <div className={styles.avatar}>{initial}</div>

                <div className={styles.meta}>
                  <span className={styles.name}>{review.reviewer_name}</span>

                  {/* Генерація 5 зірочок */}
                  <div className={styles.stars}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon
                        key={i}
                        name={
                          i < review.reviewer_rating ? 'star' : 'star-empty'
                        }
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
        })}
      </div>
    </div>
  );
}
