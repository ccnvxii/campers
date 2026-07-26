'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import Icon from '@/components/ui/Icon/Icon';
import styles from './Input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', placeholder, id, ...props }, ref) => {
    const inputId = id || props.name || 'input-field';
    const isError = Boolean(error);

    return (
      <div className={styles.container}>
        <div
          className={`${styles.inputWrapper} ${isError ? styles.hasError : ''}`}
        >
          {/* Floating Label під час помилки або якщо є label */}
          {label && (
            <label htmlFor={inputId} className={styles.floatingLabel}>
              {label}
            </label>
          )}

          {/* Іконка зліва (якщо це, наприклад, location) */}
          {icon && (
            <Icon
              name={icon}
              width={20}
              height={20}
              className={styles.leftIcon}
            />
          )}

          <input
            id={inputId}
            ref={ref}
            placeholder={isError ? undefined : placeholder}
            className={`${styles.input} ${icon ? styles.hasLeftIcon : ''} ${className}`}
            {...props}
          />

          {/* Знак оклику при помилці */}
          {isError && (
            <span className={styles.errorIconWrapper}>
              <Icon
                name="error"
                width={20}
                height={20}
                className={styles.errorIcon}
              />
            </span>
          )}
        </div>

        {/* Текст помилки знизу */}
        {isError && <p className={styles.errorMessage}>{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
