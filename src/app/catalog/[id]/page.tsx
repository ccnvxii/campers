'use client';

import { use } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { fetchCamperById } from '@/services/api';
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
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['camper', id],
    queryFn: () => fetchCamperById(id),
  });

  if (isLoading) {
    return null; // Глобальний Loader перехопить стан завантаження
  }

  if (isError || !camper) {
    return (
      <div className={styles.errorContainer}>
        <h2>Camper not found</h2>
        <p>Could not load camper details. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* 1. Верхня сітка: Головне фото та основна інформація */}
      <div className={styles.topGrid}>
        {/* Головна обкладинка */}
        <div className={styles.mainImageWrapper}>
          <Image
            src={camper.coverImage}
            alt={camper.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className={styles.image}
          />
        </div>

        {/* Заголовок, рейтинг, ціна та опис */}
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

      {/* 2. Середня сітка: Маленька галерея та деталі авто */}
      <div className={styles.middleGrid}>
        {/* Галерея зображень */}
        <div className={styles.gallery}>
          {camper.gallery?.map((item, index) => (
            <div key={item.id || index} className={styles.thumbWrapper}>
              <Image
                src={item.thumb || item.original}
                alt={`${camper.name} photo ${index + 1}`}
                fill
                sizes="150px"
                className={styles.image}
              />
            </div>
          ))}
        </div>

        {/* Специфікація Vehicle details */}
        <div className={styles.detailsCard}>
          <h2 className={styles.sectionTitle}>Vehicle details</h2>

          {/* Бейджі з оснащенням */}
          <div className={styles.badges}>
            <span className={styles.badge}>
              <Icon name="utomatic" width={20} height={20} />
              {camper.transmission}
            </span>
            {camper.amenities?.includes('ac') && (
              <span className={styles.badge}>AC</span>
            )}
            <span className={styles.badge}>
              <Icon name="petrol" width={20} height={20} />
              {camper.engine}
            </span>
            {camper.amenities?.includes('kitchen') && (
              <span className={styles.badge}>Kitchen</span>
            )}
            {camper.amenities?.includes('radio') && (
              <span className={styles.badge}>Radio</span>
            )}
            <span className={styles.badge}>
              <Icon name="alcove" width={20} height={20} />
              {camper.form}
            </span>
          </div>

          {/* Таблиця характеристик */}
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

      {/* 3. Нижня сітка: Відгуки та Форма бронювання */}
      <div className={styles.bottomGrid}>
        <div className={styles.leftColumn}>
          <CamperReviewList reviews={camper.reviews || []} />
        </div>

        <div className={styles.rightColumn}>
          <BookingForm camperName={camper.name} />
        </div>
      </div>
    </div>
  );
}
