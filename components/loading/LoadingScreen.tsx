"use client"

import { useEffect, useState } from "react"
import styles from "@/styles/loading/LoadingScreen.module.css"

interface LoadingScreenProps {
  onFinish?: () => void
  duration?: number
}

export default function LoadingScreen({ onFinish, duration = 2000 }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          if (onFinish) {
            setTimeout(onFinish, 300) // Small delay after reaching 100%
          }
          return 100
        }
        return prev + 2
      })
    }, duration / 50) // Divide duration into 50 steps

    return () => clearInterval(interval)
  }, [duration, onFinish])

  return (
    <div className={styles.loadingScreen}>
      <div className={styles.logoContainer}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🛡️</span>
          <span className={styles.logoText}>SakhiPay</span>
        </div>

        <div className={styles.progressContainer}>
          <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
        </div>

        <p className={styles.loadingText}>Protecting your financial safety...</p>
      </div>
    </div>
  )
}
