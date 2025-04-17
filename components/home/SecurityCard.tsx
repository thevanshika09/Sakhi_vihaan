'use client';
import { useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import styles from "@/styles/home/SecurityCard.module.css"

interface SecurityCardProps {
  title: string
  description: string
  icon: string
}

export default function SecurityCard({ title, description, icon }: SecurityCardProps) {
  useEffect(() => {
    // Save security tip to Firebase when component mounts
    const saveTip = async () => {
      try {
        const tipsRef = collection(db, 'security_tips');
        await addDoc(tipsRef, {
          title,
          description,
          icon,
          timestamp: serverTimestamp(),
          type: 'security_tip'
        });
      } catch (error) {
        console.error('Error saving security tip:', error);
      }
    };

    saveTip();
  }, [title, description, icon]);

  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>
        <span className={styles.icon}>{icon}</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  )
}

function getIcon(iconName: string): string {
  switch (iconName) {
    case "shield":
      return "🛡️"
    case "call":
      return "📞"
    case "report":
      return "🚨"
    default:
      return "ℹ️"
  }
}
