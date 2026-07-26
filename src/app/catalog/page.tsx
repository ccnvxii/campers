'use client';

import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCampers } from '@/services/api';
import type { CamperQueryParams } from '@/types/filter';
import CamperFilters from '@/components/catalog/CamperFilters/CamperFilters';
import CamperList from '@/components/catalog/CamperList/CamperList';
import Button from '@/components/ui/Button/Button';
import styles from './catalog.module.css';

export default function CatalogPage() {
  // 1. Тимчасові фільтри
  const [draftFilters, setDraftFilters] = useState<CamperQueryParams>({
    location: '',
  });

  // 2. Активні фільтри (для API)
  const [activeFilters, setActiveFilters] = useState<CamperQueryParams>({});

  // 3. useInfiniteQuery керує накопиченням сторінок
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['campers', activeFilters],
    queryFn: ({ pageParam = 1 }) =>
      fetchCampers({
        ...activeFilters,
        page: pageParam,
        perPage: 4,
      }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      // Якщо поточна сторінка менша за загальну кількість сторінок — повертаємо наступну
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  // Об'єднуємо всі кемпери з завантажених сторінок в один плоский масив
  const allCampers = data?.pages.flatMap(page => page.campers) ?? [];

  // Хендлер натискання "Search"
  const handleSearch = () => {
    setActiveFilters({ ...draftFilters });
  };

  // Хендлер "Clear filters"
  const handleReset = () => {
    const resetState: CamperQueryParams = { location: '' };
    setDraftFilters(resetState);
    setActiveFilters(resetState);
  };

  return (
    <div className={styles.container}>
      {/* Фільтри */}
      <CamperFilters
        filters={draftFilters}
        onChange={setDraftFilters}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      {/* Основний вміст */}
      <main className={styles.mainContent}>
        {isLoading ? (
          <p className={styles.statusText}>Loading campers...</p>
        ) : isError ? (
          <p className={styles.statusText}>
            Error loading campers. Please try again.
          </p>
        ) : (
          <>
            <CamperList campers={allCampers} />

            {hasNextPage && (
              <div className={styles.loadMoreWrapper}>
                <Button
                  onClick={() => fetchNextPage()}
                  variant="secondary"
                  className={styles.loadMoreBtn}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? 'Loading...' : 'Load more'}
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
