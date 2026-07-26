'use client';

import type { CamperQueryParams } from '@/types/filter';
import type { VehicleForm, EngineType, TransmissionType } from '@/types/camper';
import Button from '@/components/ui/Button/Button';
import Icon from '@/components/ui/Icon/Icon';
import styles from './CamperFilters.module.css';

interface CamperFiltersProps {
  filters: CamperQueryParams;
  onChange: (newFilters: CamperQueryParams) => void;
  onSearch: () => void;
  onReset: () => void;
}

const FORMS: { label: string; value: VehicleForm }[] = [
  { label: 'Alcove', value: 'alcove' },
  { label: 'Panel Van', value: 'panel_van' },
  { label: 'Integrated', value: 'integrated' },
  { label: 'Semi Integrated', value: 'semi_integrated' },
];

const ENGINES: { label: string; value: EngineType }[] = [
  { label: 'Diesel', value: 'diesel' },
  { label: 'Petrol', value: 'petrol' },
  { label: 'Hybrid', value: 'hybrid' },
  { label: 'Electric', value: 'electric' },
];

const TRANSMISSIONS: { label: string; value: TransmissionType }[] = [
  { label: 'Automatic', value: 'automatic' },
  { label: 'Manual', value: 'manual' },
];

export default function CamperFilters({
  filters,
  onChange,
  onSearch,
  onReset,
}: CamperFiltersProps) {
  return (
    <aside className={styles.sidebar}>
      {/* Location */}
      <div className={styles.locationGroup}>
        <label className={styles.label}>Location</label>
        <div className={styles.inputWrapper}>
          <Icon
            name="map"
            width={18}
            height={18}
            className={styles.locationIcon}
          />
          <input
            type="text"
            placeholder="Kyiv"
            value={filters.location || ''}
            onChange={e => onChange({ ...filters, location: e.target.value })}
            className={styles.input}
          />
        </div>
      </div>

      <h2 className={styles.mainTitle}>Filters</h2>

      {/* Camper Form */}
      <div className={styles.filterSection}>
        <h3 className={styles.sectionTitle}>Camper form</h3>
        <div className={styles.radioList}>
          {FORMS.map(item => (
            <label key={item.value} className={styles.radioOption}>
              <input
                type="radio"
                name="camperForm"
                checked={filters.form === item.value}
                onChange={() => onChange({ ...filters, form: item.value })}
                className={styles.radioInput}
              />
              <span className={styles.radioText}>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Engine */}
      <div className={styles.filterSection}>
        <h3 className={styles.sectionTitle}>Engine</h3>
        <div className={styles.radioList}>
          {ENGINES.map(item => (
            <label key={item.value} className={styles.radioOption}>
              <input
                type="radio"
                name="engine"
                checked={filters.engine === item.value}
                onChange={() => onChange({ ...filters, engine: item.value })}
                className={styles.radioInput}
              />
              <span className={styles.radioText}>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Transmission */}
      <div className={styles.filterSection}>
        <h3 className={styles.sectionTitle}>Transmission</h3>
        <div className={styles.radioList}>
          {TRANSMISSIONS.map(item => (
            <label key={item.value} className={styles.radioOption}>
              <input
                type="radio"
                name="transmission"
                checked={filters.transmission === item.value}
                onChange={() =>
                  onChange({ ...filters, transmission: item.value })
                }
                className={styles.radioInput}
              />
              <span className={styles.radioText}>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className={styles.actions}>
        <Button
          onClick={onSearch}
          variant="primary"
          className={styles.searchBtn}
        >
          Search
        </Button>
        <button type="button" onClick={onReset} className={styles.clearBtn}>
          <Icon name="close" width={16} height={16} />
          Clear filters
        </button>
      </div>
    </aside>
  );
}
