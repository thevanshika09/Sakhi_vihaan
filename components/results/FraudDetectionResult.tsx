"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import styles from "@/styles/results/FraudDetectionResult.module.css"

interface FraudDetectionResultProps {
  result: "fraud" | "safe" | "suspicious"
  details?: string
  onAction?: () => void
  actionText?: string
}

export default function FraudDetectionResult({
  result,
  details = "",
  onAction,
  actionText = result === "safe" ? "Proceed" : "Report",
}: FraudDetectionResultProps) {
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Reset state when result changes
    setShowDetails(false)
  }, [result])

  const getResultClass = () => {
    switch (result) {
      case "fraud":
        return styles.fraudResult
      case "suspicious":
        return styles.suspiciousResult
      case "safe":
        return styles.safeResult
      default:
        return ""
    }
  }

  const getResultIcon = () => {
    switch (result) {
      case "fraud":
        return "⚠️"
      case "suspicious":
        return "⚠️"
      case "safe":
        return "✅"
      default:
        return ""
    }
  }

  const getResultTitle = () => {
    switch (result) {
      case "fraud":
        return "Fraud Detected!"
      case "suspicious":
        return "Suspicious Activity"
      case "safe":
        return "Safe to proceed"
      default:
        return ""
    }
  }

  return (
    <motion.div
      className={`${styles.resultCard} ${getResultClass()}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.resultHeader}>
        <motion.div
          className={styles.resultIcon}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          {getResultIcon()}
        </motion.div>
        <h3 className={styles.resultTitle}>{getResultTitle()}</h3>
      </div>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            className={styles.resultDetails}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>{details || "No additional details available."}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.resultActions}>
        <button className={styles.detailsButton} onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "Hide Details" : "Show Details"}
        </button>
        <button className={styles.actionButton} onClick={onAction}>
          {actionText}
        </button>
      </div>
    </motion.div>
  )
}
