"use client"

import styles from "@/styles/scan/ScanResult.module.css"

interface ScanResultProps {
  result: {
    status: "safe" | "warning" | "danger"
    message: string
    details: string
    confidence: number
  }
  scanType: "qr" | "upi" | "phone" | "url" | "message"
  inputValue: string
  onScanAgain: () => void
}

export default function ScanResult({ result, scanType, inputValue, onScanAgain }: ScanResultProps) {
  return (
    <div className={`${styles.resultContainer} ${styles[result.status]}`}>
      <div className={styles.resultHeader}>
        <div className={styles.resultIcon}>
          {result.status === "safe" && "✅"}
          {result.status === "warning" && "⚠️"}
          {result.status === "danger" && "❌"}
        </div>

        <div className={styles.resultTitle}>
          {result.status === "safe" && "Safe to Proceed"}
          {result.status === "warning" && "Proceed with Caution"}
          {result.status === "danger" && "Potential Fraud Detected"}
        </div>
      </div>

      <div className={styles.resultMessage}>{result.message}</div>

      <div className={styles.resultDetails}>
        <div className={styles.detailsCard}>
          <div className={styles.detailsHeader}>Scan Details</div>

          <div className={styles.detailsContent}>
            <div className={styles.detailRow}>
              <div className={styles.detailLabel}>Type:</div>
              <div className={styles.detailValue}>
                {scanType === "qr" && "QR Code"}
                {scanType === "upi" && "UPI ID"}
                {scanType === "phone" && "Phone Number"}
                {scanType === "url" && "URL"}
                {scanType === "message" && "Message"}
              </div>
            </div>

            {inputValue && (
              <div className={styles.detailRow}>
                <div className={styles.detailLabel}>Value:</div>
                <div className={styles.detailValue}>
                  {inputValue.length > 30 ? inputValue.substring(0, 30) + "..." : inputValue}
                </div>
              </div>
            )}

            <div className={styles.detailRow}>
              <div className={styles.detailLabel}>Analysis:</div>
              <div className={styles.detailValue}>{result.details}</div>
            </div>

            <div className={styles.detailRow}>
              <div className={styles.detailLabel}>AI Confidence:</div>
              <div className={styles.detailValue}>{result.confidence}%</div>
            </div>

            <div className={styles.detailRow}>
              <div className={styles.detailLabel}>Scan Time:</div>
              <div className={styles.detailValue}>{new Date().toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.resultActions}>
        <button className={styles.shareButton} onClick={() => alert("Sharing functionality would be implemented here")}>
          Share Result
        </button>

        <button className={styles.scanAgainButton} onClick={onScanAgain}>
          Scan Again
        </button>
      </div>

      {result.status === "danger" && (
        <div className={styles.reportSection}>
          <p>Help the community by reporting this scam</p>
          <a href="/report" className={styles.reportButton}>
            Report Scam
          </a>
        </div>
      )}
    </div>
  )
}
