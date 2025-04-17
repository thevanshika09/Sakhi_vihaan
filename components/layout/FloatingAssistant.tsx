"use client"

import { useState } from "react"
import ChatAssistant from "@/components/chat/ChatAssistant"
import SakhiRobot from "@/components/chat/SakhiRobot"
import styles from "@/styles/layout/FloatingAssistant.module.css"

export default function FloatingAssistant() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [scanResult, setScanResult] = useState<null | {
    status: "safe" | "suspicious" | "scam"
    message: string
    emoji: string
  }>(null)
  const [showChat, setShowChat] = useState(false)
  const [robotMood, setRobotMood] = useState<"happy" | "thinking" | "alert" | "sad">("happy")

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
    // Reset result when closing
    if (isExpanded) {
      setScanResult(null)
      setInputValue("")
      setShowChat(false)
    }
  }

  const handleScan = () => {
    if (!inputValue.trim()) return

    // Set robot to thinking mode during scan
    setRobotMood("thinking")

    // Mock scan logic - in a real app this would call an API
    setTimeout(() => {
      const randomResult = Math.random()
      if (randomResult > 0.7) {
        setScanResult({
          status: "scam",
          message: "Scam Alert! This appears to be fraudulent.",
          emoji: "😨",
        })
        setRobotMood("alert")
      } else if (randomResult > 0.4) {
        setScanResult({
          status: "suspicious",
          message: "Suspicious! Proceed with caution.",
          emoji: "🤔",
        })
        setRobotMood("alert")
      } else {
        setScanResult({
          status: "safe",
          message: "Safe! This appears to be legitimate.",
          emoji: "😊",
        })
        setRobotMood("happy")
      }
    }, 1500)
  }

  const getButtonColor = () => {
    if (!scanResult) return styles.assistantButton

    switch (scanResult.status) {
      case "safe":
        return `${styles.assistantButton} ${styles.safeButton}`
      case "suspicious":
        return `${styles.assistantButton} ${styles.warningButton}`
      case "scam":
        return `${styles.assistantButton} ${styles.dangerButton}`
      default:
        return styles.assistantButton
    }
  }

  return (
    <div className={styles.assistantContainer}>
      {isExpanded && !showChat && (
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h3>Sakhi Assistant</h3>
            <div className={styles.headerActions}>
              <button className={styles.chatButton} onClick={() => setShowChat(true)}>
                Chat
              </button>
              <button className={styles.closeButton} onClick={toggleExpand}>
                ×
              </button>
            </div>
          </div>

          <div className={styles.robotSection}>
            <SakhiRobot mood={robotMood} size="small" />
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

      {isExpanded && showChat && <ChatAssistant onClose={() => setShowChat(false)} />}

      <button className={getButtonColor()} onClick={toggleExpand}>
        <SakhiRobot mood={robotMood} size="small" animate={false} className={styles.buttonRobot} />
      </button>
    </div>
  )
}
