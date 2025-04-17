"use client"

import { useState } from "react"
import styles from "@/styles/FloatingAssistant.module.css"

export default function FloatingAssistant() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [scanResult, setScanResult] = useState<null | {
    status: "safe" | "suspicious" | "scam"
    message: string
    emoji: string
  }>(null)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
    // Reset result when closing
    if (isExpanded) {
      setScanResult(null)
    }
  }

  const handleScan = () => {
    if (!inputValue.trim()) return

    // Mock scan logic - in a real app this would call an API
    const randomResult = Math.random()
    if (randomResult > 0.7) {
      setScanResult({
        status: "scam",
        message: "Scam Alert! This appears to be fraudulent.",
        emoji: "😨",
      })
    } else if (randomResult > 0.4) {
      setScanResult({
        status: "suspicious",
        message: "Suspicious! Proceed with caution.",
        emoji: "🤔",
      })
    } else {
      setScanResult({
        status: "safe",
        message: "Safe! This appears to be legitimate.",
        emoji: "😊",
      })
    }
  }

  return (
    <div className={styles.assistantContainer}>
      {isExpanded && (
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h3>Sakhi Assistant</h3>
            <button className={styles.closeButton} onClick={toggleExpand}>
              ×
            </button>
          </div>

          <div className={styles.modalContent}>
            <p>Paste QR/phone/URL/message to scan:</p>
            <textarea
              className={styles.input}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Paste content here..."
            />

            <button className={styles.scanButton} onClick={handleScan}>
              Scan for Scam
            </button>

            {scanResult && (
              <div className={`${styles.result} ${styles[scanResult.status]}`}>
                <div className={styles.resultEmoji}>{scanResult.emoji}</div>
                <div className={styles.resultStatus}>{scanResult.status.toUpperCase()}</div>
                <p className={styles.resultMessage}>{scanResult.message}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <button className={styles.assistantButton} onClick={toggleExpand}>
        <span className={styles.assistantIcon}>🛡️</span>
      </button>
    </div>
  )
}
