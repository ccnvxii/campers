'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import Icon, { IconName } from '@/components/ui/Icon/Icon';
import styles from './Input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: IconName;
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
          {label && (
            <label htmlFor={inputId} className={styles.floatingLabel}>
              {label}
            </label>
          )}

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

        {isError && <p className={styles.errorMessage}>{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
