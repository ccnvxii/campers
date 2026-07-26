'use client';

import { use } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { fetchCamperById, fetchCamperReviews } from '@/services/api';
import Icon from '@/components/ui/Icon/Icon';
import CamperReviewList from '@/components/camper/CamperReviewList/CamperReviewList';
import BookingForm from '@/components/camper/BookingForm/BookingForm';
import styles from './CamperDetails.module.css';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CamperDetailsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const {
    data: camper,
    isLoading: isCamperLoading,
    isError: isCamperError,
  } = useQuery({
    queryKey: ['camper', id],
    queryFn: () => fetchCamperById(id),
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ['camper-reviews', id],
    queryFn: () => fetchCamperReviews(id),
    enabled: Boolean(id),
  });

  if (isCamperLoading) {
    return null; 
  }

  if (isCamperError || !camper) {
    return (
      <div className={styles.errorContainer}>
        <h2>Camper not found</h2>
        <p>Could not load camper details. Please try again later.</p>
      </div>
    );
  }

  const mainImageSrc =
    camper.coverImage ||
    camper.gallery?.[0]?.original ||
    camper.gallery?.[0]?.thumb;

  return (
    <div className={styles.container}>
      <div className={styles.topGrid}>
        {mainImageSrc && (
          <div className={styles.mainImageWrapper}>
            <Image
              src={mainImageSrc}
              alt={camper.name || 'Camper image'}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className={styles.image}
            />
          </div>
        )}

        <div className={styles.mainInfo}>
          <div className={styles.headerBlock}>
            <h1 className={styles.title}>{camper.name}</h1>
            <div className={styles.subHeader}>
              <span className={styles.rating}>
                <Icon name="star" width={16} height={16} />
                {camper.rating} ({camper.totalReviews} Reviews)
              </span>
              <span className={styles.location}>
                <Icon name="map" width={16} height={16} />
                {camper.location}
              </span>
            </div>
            <p className={styles.price}>€{camper.price}</p>
          </div>

          <p className={styles.description}>{camper.description}</p>
        </div>
      </div>

      <div className={styles.middleGrid}>
        <div className={styles.gallery}>
          {camper.gallery?.map((item, index) => {
            const thumbSrc = item.thumb || item.original;
            if (!thumbSrc) return null;

            return (
              <div key={item.id || index} className={styles.thumbWrapper}>
                <Image
                  src={thumbSrc}
                  alt={`${camper.name} photo ${index + 1}`}
                  fill
                  sizes="150px"
                  className={styles.image}
                />
              </div>
            );
          })}
        </div>

        <div className={styles.detailsCard}>
          <h2 className={styles.sectionTitle}>Vehicle details</h2>

          <div className={styles.badges}>
            {camper.transmission && (
              <span className={styles.badge}>
                <Icon name="utomatic" width={20} height={20} />
                {camper.transmission}
              </span>
            )}
            {camper.amenities?.includes('ac') && (
              <span className={styles.badge}>AC</span>
            )}
            {camper.engine && (
              <span className={styles.badge}>
                <Icon name="petrol" width={20} height={20} />
                {camper.engine}
              </span>
            )}
            {camper.amenities?.includes('kitchen') && (
              <span className={styles.badge}>Kitchen</span>
            )}
            {camper.amenities?.includes('radio') && (
              <span className={styles.badge}>Radio</span>
            )}
            {camper.form && (
              <span className={styles.badge}>
                <Icon name="alcove" width={20} height={20} />
                {camper.form}
              </span>
            )}
          </div>

          <div className={styles.specsTable}>
            <div className={styles.specRow}>
              <span>Form</span>
              <span className={styles.specValue}>{camper.form}</span>
            </div>
            <div className={styles.specRow}>
              <span>Length</span>
              <span className={styles.specValue}>{camper.length}</span>
            </div>
            <div className={styles.specRow}>
              <span>Width</span>
              <span className={styles.specValue}>{camper.width}</span>
            </div>
            <div className={styles.specRow}>
              <span>Height</span>
              <span className={styles.specValue}>{camper.height}</span>
            </div>
            <div className={styles.specRow}>
              <span>Tank</span>
              <span className={styles.specValue}>{camper.tank}</span>
            </div>
            <div className={styles.specRow}>
              <span>Consumption</span>
              <span className={styles.specValue}>{camper.consumption}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomGrid}>
        <div className={styles.leftColumn}>
          <CamperReviewList reviews={reviews} />
        </div>

        <div className={styles.rightColumn}>
          <BookingForm camperName={camper.name} />
        </div>
      </div>
    </div>
  );
}
