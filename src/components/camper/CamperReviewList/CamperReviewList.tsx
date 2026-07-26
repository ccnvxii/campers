'use client';

import CamperReview, { Review } from '../CamperReview/CamperReview';
import styles from './CamperReviewList.module.css';

interface CamperReviewListProps {
  reviews: Review[];
}

export default function CamperReviewList({ reviews }: CamperReviewListProps) {
  if (!reviews || reviews.length === 0) {
    return <p className={styles.noReviews}>No reviews yet.</p>;
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Reviews</h3>

      <div className={styles.list}>
        {reviews.map((review, index) => (
          <CamperReview key={index} review={review} />
        ))}
      </div>
    </div>
  );
}
