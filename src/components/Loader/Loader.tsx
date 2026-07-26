'use client';

import styles from './Loader.module.css';

export default function LoaderComponent() {
  return (
    <div className={styles.overlay}>
      <div className={styles.loaderContainer}>
        <div className={styles.spinner} />

        <div className={styles.textContainer}>
          <h2 className={styles.title}>Loading trucks...</h2>
          <p className={styles.text}>
            Please wait while we fetch the best travel trucks for you
          </p>
        </div>
      </div>
    </div>
  );
}
