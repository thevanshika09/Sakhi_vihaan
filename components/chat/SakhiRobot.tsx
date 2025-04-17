"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import styles from "@/styles/chat/SakhiRobot.module.css"

interface SakhiRobotProps {
  mood?: "happy" | "thinking" | "alert" | "sad"
  size?: "small" | "medium" | "large"
  animate?: boolean
  className?: string
}

export default function SakhiRobot({
  mood = "happy",
  size = "medium",
  animate = true,
  className = "",
}: SakhiRobotProps) {
  const [blinking, setBlinking] = useState(false)
  const [waving, setWaving] = useState(false)

  // Blinking animation
  useEffect(() => {
    if (!animate) return

    const blinkInterval = setInterval(
      () => {
        setBlinking(true)
        setTimeout(() => setBlinking(false), 200)
      },
      Math.random() * 3000 + 2000,
    ) // Random blink between 2-5 seconds

    return () => clearInterval(blinkInterval)
  }, [animate])

  // Occasional waving
  useEffect(() => {
    if (!animate) return

    const waveInterval = setInterval(
      () => {
        setWaving(true)
        setTimeout(() => setWaving(false), 1500)
      },
      Math.random() * 10000 + 15000,
    ) // Random wave between 15-25 seconds

    return () => clearInterval(waveInterval)
  }, [animate])

  // Get eye color based on mood
  const getEyeColor = () => {
    switch (mood) {
      case "happy":
        return "#10b9ff"
      case "thinking":
        return "#6366f1"
      case "alert":
        return "#f59e0b"
      case "sad":
        return "#ef4444"
      default:
        return "#10b9ff"
    }
  }

  // Get mouth based on mood
  const getMouth = () => {
    switch (mood) {
      case "happy":
        return (
          <motion.path
            d="M 30 35 Q 50 45 70 35"
            stroke={getEyeColor()}
            strokeWidth="4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
        )
      case "thinking":
        return (
          <motion.path
            d="M 30 40 L 70 40"
            stroke={getEyeColor()}
            strokeWidth="4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
        )
      case "alert":
        return (
          <motion.path
            d="M 30 40 Q 50 35 70 40"
            stroke={getEyeColor()}
            strokeWidth="4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
        )
      case "sad":
        return (
          <motion.path
            d="M 30 45 Q 50 35 70 45"
            stroke={getEyeColor()}
            strokeWidth="4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
        )
      default:
        return (
          <motion.path
            d="M 30 35 Q 50 45 70 35"
            stroke={getEyeColor()}
            strokeWidth="4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
        )
    }
  }

  return (
    <div className={`${styles.robotContainer} ${styles[size]} ${className}`}>
      {/* Robot Body */}
      <div className={styles.robotBody}>
        {/* Robot Head */}
        <div className={styles.robotHead}>
          <div className={styles.robotFace}>
            <svg width="100" height="60" viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
              {/* Left Eye */}
              <motion.ellipse
                cx="30"
                cy="25"
                rx="12"
                ry={blinking ? "1" : "12"}
                fill="black"
                stroke={getEyeColor()}
                strokeWidth="3"
                animate={{
                  ry: blinking ? 1 : 12,
                  opacity: blinking ? 0.7 : 1,
                }}
                transition={{ duration: 0.1 }}
              />

              {/* Right Eye */}
              <motion.ellipse
                cx="70"
                cy="25"
                rx="12"
                ry={blinking ? "1" : "12"}
                fill="black"
                stroke={getEyeColor()}
                strokeWidth="3"
                animate={{
                  ry: blinking ? 1 : 12,
                  opacity: blinking ? 0.7 : 1,
                }}
                transition={{ duration: 0.1 }}
              />

              {/* Mouth */}
              {getMouth()}
            </svg>
          </div>
        </div>

        {/* Robot Arm */}
        <motion.div
          className={styles.robotArm}
          animate={{
            rotate: waving ? [0, 15, -5, 15, 0] : 0,
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        />

        {/* Robot Name */}
        <div className={styles.robotName}>SakhiPay</div>
      </div>
    </div>
  )
}
