"use client"

import type React from "react"

import { useState } from "react"
import Banner from "@/components/layout/Banner"
import BottomNavigation from "@/components/layout/BottomNavigation"
import FloatingAssistant from "@/components/layout/FloatingAssistant"
import styles from "@/styles/Report.module.css"

export default function Report() {
  const [formData, setFormData] = useState({
    scamType: "",
    description: "",
    contactInfo: "",
    screenshot: null as File | null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Mock login state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, screenshot: e.target.files![0] }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          scamType: "",
          description: "",
          contactInfo: "",
          screenshot: null,
        })
      }, 3000)
    }, 1500)
  }

  return (
    <main className={styles.main}>
      <Banner />

      <div className={styles.content}>
        <div className={styles.reportHeader}>
          <h2>Report a Scam</h2>
          <p>Help the community by reporting scams you've encountered</p>
        </div>

        {isSubmitted ? (
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✅</div>
            <h3>Thank You for Reporting!</h3>
            <p>Your report has been submitted successfully. Our team will review it shortly.</p>
            <p className={styles.coinReward}>+1 Sakhi Coin added to your wallet</p>
          </div>
        ) : (
          <form className={styles.reportForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="scamType">Scam Type</label>
              <select id="scamType" name="scamType" value={formData.scamType} onChange={handleChange} required>
                <option value="">Select Scam Type</option>
                <option value="phishing">Phishing</option>
                <option value="fake_upi">Fake UPI ID</option>
                <option value="fake_qr">Fake QR Code</option>
                <option value="fake_call">Fake Bank/KYC Call</option>
                <option value="investment">Fake Investment Scheme</option>
                <option value="job">Fake Job Offer</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the scam in detail. What happened? How did they approach you?"
                rows={5}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="contactInfo">Contact Information (Optional)</label>
              <input
                type="text"
                id="contactInfo"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                placeholder="Phone number, UPI ID, or website used by scammer"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="screenshot">Upload Screenshot (Optional)</label>
              <div className={styles.fileUpload}>
                <input type="file" id="screenshot" name="screenshot" onChange={handleFileChange} accept="image/*" />
                <div className={styles.uploadLabel}>
                  {formData.screenshot ? formData.screenshot.name : "Choose file..."}
                </div>
              </div>
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </button>
            </div>

            <div className={styles.formNote}>
              <p>
                By submitting this report, you're helping protect others from similar scams. Your report may be shared
                anonymously with the community.
              </p>
            </div>
          </form>
        )}

        <div className={styles.viewAlertsSection}>
          <h3>Recent Scam Alerts</h3>
          <p>View alerts posted by the community</p>
          <a href="/social" className={styles.viewAlertsButton}>
            View All Alerts
          </a>
        </div>
      </div>

      <FloatingAssistant />
      <BottomNavigation activeTab={null} />
    </main>
  )
}
