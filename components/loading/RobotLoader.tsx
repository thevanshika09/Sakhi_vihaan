'use client';

import { useEffect, useState } from 'react';
import styles from '@/styles/loading/RobotLoader.module.css';

export default function RobotLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={styles.loaderContainer}>
      <div className={styles.robot}>
        <div className={styles.antenna}></div>
        <div className={styles.head}>
          <div className={styles.eyes}>
            <div className={styles.eye}></div>
            <div className={styles.eye}></div>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.chest}>
            <div className={styles.heart}></div>
          </div>
          <div className={styles.arms}>
            <div className={styles.arm}></div>
            <div className={styles.arm}></div>
          </div>
        </div>
        <div className={styles.message}>
          <span>Initializing Sakhi</span>
          <div className={styles.dots}>
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        </div>
      </div>
    </div>
  );
} 