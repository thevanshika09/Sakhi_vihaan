"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import SakhiRobot from "@/components/chat/SakhiRobot"
import styles from "@/styles/loading/LoadingPage.module.css"

export default function Loading() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [robotMood, setRobotMood] = useState<"happy" | "thinking">("happy")

  // Prevent scrolling while loading screen is active
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  // Progress bar animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            router.push("/")
          }, 500)
          return 100
        }
        return prev + 1
      })
    }, 30)

    return () => clearInterval(interval)
  }, [router])

  // Change robot mood occasionally
  useEffect(() => {
    const thinkingInterval = setInterval(() => {
      setRobotMood("thinking")
      setTimeout(() => setRobotMood("happy"), 1000)
    }, 3000)

    return () => clearInterval(thinkingInterval)
  }, [])

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        <div className={styles.robotContainer}>
          <SakhiRobot mood={robotMood} size="large" />
        </div>

        <div className={styles.loadingInfo}>
          <h1 className={styles.loadingTitle}>SakhiPay</h1>
          <p className={styles.loadingSubtitle}>Your Financial Safety Partner</p>

          <div className={styles.progressContainer}>
            <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
          </div>

          <div className={styles.loadingText}>
            <span>Loading</span>
            <span className={styles.dot1}>.</span>
            <span className={styles.dot2}>.</span>
            <span className={styles.dot3}>.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
