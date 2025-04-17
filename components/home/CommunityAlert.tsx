'use client';
import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, updateDoc, doc, increment } from 'firebase/firestore';
import styles from '@/styles/home/CommunityAlert.module.css';

interface AlertProps {
  title: string;
  message: string;
  time: string;
  reports: number;
}

export default function CommunityAlert({ title, message, time, reports }: AlertProps) {
  const [reportCount, setReportCount] = useState(reports);
  const [isReporting, setIsReporting] = useState(false);

  const handleReport = async () => {
    setIsReporting(true);
    try {
      // First, save the alert if it's new
      const alertRef = collection(db, 'alerts');
      const alertDoc = await addDoc(alertRef, {
        title,
        message,
        time,
        reports: reportCount + 1,
        timestamp: serverTimestamp(),
        type: 'scam_alert'
      });

      // Update the report count
      setReportCount(prev => prev + 1);

    } catch (error) {
      console.error('Error reporting alert:', error);
    } finally {
      setIsReporting(false);
    }
  };

  return (
    <div className={styles.alertCard}>
      <div className={styles.alertHeader}>
        <span className={styles.alertBadge}>{title}</span>
        <span className={styles.alertTime}>{time}</span>
      </div>
      <p className={styles.alertMessage}>{message}</p>
      <div className={styles.alertFooter}>
        <span className={styles.alertStats}>{reportCount} reports</span>
        <button 
          onClick={handleReport}
          disabled={isReporting}
          className={styles.reportButton}
        >
          {isReporting ? 'Reporting...' : 'Report Similar'}
        </button>
      </div>
    </div>
  );
} 