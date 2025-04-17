"use client"

import { useState, useRef, useEffect } from "react"
import Banner from "@/components/layout/Banner"
import BottomNavigation from "@/components/layout/BottomNavigation"
import FloatingAssistant from "@/components/layout/FloatingAssistant"
import ScanResult from "@/components/scan/ScanResult"
import styles from "@/styles/Scan.module.css"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { QrScanner } from '@yudiel/react-qr-scanner'

type ScanType = "qr" | "upi" | "phone" | "url" | "message"
type ScanStatus = "idle" | "scanning" | "result"
type ResultStatus = "safe" | "warning" | "danger"

export default function Scan() {
  const [scanType, setScanType] = useState<ScanType>("qr")
  const [scanStatus, setScanStatus] = useState<ScanStatus>("idle")
  const [inputValue, setInputValue] = useState("")
  const [scanResult, setScanResult] = useState<{
    status: ResultStatus
    message: string
    details: string
    confidence: number
  } | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cameraActive, setCameraActive] = useState(false)

  // Start camera for QR scanning
  useEffect(() => {
    if (scanType === "qr" && scanStatus === "scanning" && !cameraActive) {
      startCamera()
    }

    return () => {
      if (cameraActive) {
        stopCamera()
      }
    }
  }, [scanType, scanStatus, cameraActive])

  const startCamera = async () => {
    try {
      const constraints = {
        video: { facingMode: "environment" },
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)

        // Mock QR detection after 3 seconds
        setTimeout(() => {
          if (scanStatus === "scanning") {
            handleScanComplete()
          }
        }, 3000)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      alert("Could not access camera. Please check permissions.")
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      const tracks = stream.getTracks()

      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setCameraActive(false)
    }
  }

  const handleStartScan = () => {
    if (scanType !== "qr" && !inputValue.trim()) {
      alert("Please enter a value to scan")
      return
    }

    setScanStatus("scanning")

    // For non-QR scans, simulate processing
    if (scanType !== "qr") {
      setTimeout(() => {
        handleScanComplete()
      }, 1500)
    }
  }

  const handleScanComplete = async () => {
    // Mock scan result based on scan type
    let result: ResultStatus
    const randomValue = Math.random()

    if (randomValue > 0.7) {
      result = "danger"
    } else if (randomValue > 0.4) {
      result = "warning"
    } else {
      result = "safe"
    }

    let message = ""
    let details = ""
    let confidence = 0

    switch (result) {
      case "safe":
        message = "This appears to be legitimate"
        confidence = 95 + Math.floor(Math.random() * 5)

        if (scanType === "qr") {
          details = "QR code points to a verified website"
        } else if (scanType === "upi") {
          details = "UPI ID belongs to a verified merchant"
        } else if (scanType === "phone") {
          details = "Phone number not associated with any known scams"
        } else if (scanType === "url") {
          details = "URL leads to a legitimate website"
        } else {
          details = "Message does not contain suspicious content"
        }
        break

      case "warning":
        message = "Proceed with caution"
        confidence = 65 + Math.floor(Math.random() * 15)

        if (scanType === "qr") {
          details = "QR code leads to a recently registered domain"
        } else if (scanType === "upi") {
          details = "UPI ID is valid but not frequently used"
        } else if (scanType === "phone") {
          details = "Phone number has been reported once before"
        } else if (scanType === "url") {
          details = "URL contains unusual parameters or redirects"
        } else {
          details = "Message contains some suspicious keywords"
        }
        break

      case "danger":
        message = "Potential fraud detected"
        confidence = 90 + Math.floor(Math.random() * 10)

        if (scanType === "qr") {
          details = "QR code leads to a known phishing website"
        } else if (scanType === "upi") {
          details = "UPI ID has been reported for fraud multiple times"
        } else if (scanType === "phone") {
          details = "Phone number associated with multiple scam reports"
        } else if (scanType === "url") {
          details = "URL is a known phishing site"
        } else {
          details = "Message matches known scam patterns"
        }
        break
    }

    const scanResultData = {
      status: result,
      message,
      details,
      confidence,
    }

    setScanResult(scanResultData)
    setScanStatus("result")

    if (cameraActive) {
      stopCamera()
    }

    try {
      const scanRef = collection(db, 'scans')
      await addDoc(scanRef, {
        result: scanResultData,
        timestamp: serverTimestamp(),
        status: result === "safe" ? "safe" : "danger",
        type: "qr_scan"
      })
    } catch (error) {
      console.error("Error saving scan:", error)
    }
  }

  const handleReset = () => {
    setScanStatus("idle")
    setScanResult(null)
    setInputValue("")
  }

  const handleDecode = async (result: string) => {
    setResult(result)
    setIsAnalyzing(true)
    
    // Simulate API call to analyze the QR code or UPI ID
    setTimeout(() => {
      const random = Math.random()
      if (random > 0.7) {
        setScanResult({
          status: 'scam',
          message: 'High risk! This appears to be linked to known scam patterns.',
        })
      } else if (random > 0.4) {
        setScanResult({
          status: 'suspicious',
          message: 'Exercise caution. Some unusual patterns detected.',
        })
      } else {
        setScanResult({
          status: 'safe',
          message: 'This appears to be legitimate.',
        })
      }
      setIsAnalyzing(false)
    }, 1500)
  }

  const handleError = (error: any) => {
    console.error(error)
  }

  return (
    <main className={styles.main}>
      <Banner />

      <div className={styles.content}>
        <div className={styles.scanHeader}>
          <h2>Scan & Verify</h2>
          <p>Verify before you proceed with any transaction</p>
        </div>

        {scanStatus === "idle" && (
          <>
            <div className={styles.scanTypes}>
              <button
                className={`${styles.scanTypeButton} ${scanType === "qr" ? styles.active : ""}`}
                onClick={() => setScanType("qr")}
              >
                <span className={styles.scanTypeIcon}>📷</span>
                QR Code
              </button>
              <button
                className={`${styles.scanTypeButton} ${scanType === "upi" ? styles.active : ""}`}
                onClick={() => setScanType("upi")}
              >
                <span className={styles.scanTypeIcon}>💳</span>
                UPI ID
              </button>
              <button
                className={`${styles.scanTypeButton} ${scanType === "phone" ? styles.active : ""}`}
                onClick={() => setScanType("phone")}
              >
                <span className={styles.scanTypeIcon}>📱</span>
                Phone
              </button>
              <button
                className={`${styles.scanTypeButton} ${scanType === "url" ? styles.active : ""}`}
                onClick={() => setScanType("url")}
              >
                <span className={styles.scanTypeIcon}>🔗</span>
                URL
              </button>
              <button
                className={`${styles.scanTypeButton} ${scanType === "message" ? styles.active : ""}`}
                onClick={() => setScanType("message")}
              >
                <span className={styles.scanTypeIcon}>💬</span>
                Message
              </button>
            </div>

            <div className={styles.scanInput}>
              {scanType === "qr" ? (
                <div className={styles.qrInstructions}>
                  <div className={styles.qrIcon}>📷</div>
                  <p>Click "Start Scan" to open camera and scan QR code</p>
                </div>
              ) : (
                <div className={styles.textInputContainer}>
                  <label htmlFor="scanInput">
                    {scanType === "upi" && "Enter UPI ID"}
                    {scanType === "phone" && "Enter Phone Number"}
                    {scanType === "url" && "Enter URL"}
                    {scanType === "message" && "Paste Message"}
                  </label>
                  <input
                    type="text"
                    id="scanInput"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={
                      scanType === "upi"
                        ? "example@upi"
                        : scanType === "phone"
                          ? "10-digit number"
                          : scanType === "url"
                            ? "https://example.com"
                            : "Paste suspicious message here"
                    }
                  />
                </div>
              )}

              <button className={styles.startScanButton} onClick={handleStartScan}>
                Start Scan
              </button>
            </div>
          </>
        )}

        {scanStatus === "scanning" && (
          <div className={styles.scanningContainer}>
            {scanType === "qr" ? (
              <div className={styles.cameraContainer}>
                <video ref={videoRef} className={styles.cameraFeed} autoPlay playsInline />
                <div className={styles.scanOverlay}>
                  <div className={styles.scanFrame}></div>
                </div>
                <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
              </div>
            ) : (
              <div className={styles.processingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Analyzing {scanType}...</p>
                <p className={styles.inputPreview}>
                  {inputValue.substring(0, 30)}
                  {inputValue.length > 30 ? "..." : ""}
                </p>
              </div>
            )}

            <button className={styles.cancelButton} onClick={handleReset}>
              Cancel
            </button>
          </div>
        )}

        {scanStatus === "result" && scanResult && (
          <ScanResult result={scanResult} scanType={scanType} inputValue={inputValue} onScanAgain={handleReset} />
        )}

        <div className={styles.scanTips}>
          <h3>Safety Tips</h3>
          <ul className={styles.tipsList}>
            <li>Always verify UPI IDs before making payments</li>
            <li>Don't scan QR codes from unknown sources</li>
            <li>Be cautious of messages asking for OTP or banking details</li>
            <li>Report suspicious activities to help the community</li>
          </ul>
        </div>
      </div>

      <FloatingAssistant />
      <BottomNavigation activeTab="scan" />
    </main>
  )
}
