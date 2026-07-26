'use client';

import type { CamperListItem } from '@/types/camper';
import CamperCard from '../CamperCard/CamperCard';
import EmptyState from '../EmptyState/EmptyState';
import styles from './CamperList.module.css';

interface CamperListProps {
  campers: CamperListItem[];
  onResetFilters?: () => void;
}

export default function CamperList({
  campers,
  onResetFilters,
}: CamperListProps) {
  if (!campers || campers.length === 0) {
    return <EmptyState onReset={onResetFilters || (() => {})} />;
  }

  return (
    <div className={styles.list}>
      {campers.map(camper => (
        <CamperCard key={camper.id} camper={camper} />
      ))}
    </div>
  );
}
