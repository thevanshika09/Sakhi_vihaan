"use client"

import type React from "react"

import { useState } from "react"
import Banner from "@/components/layout/Banner"
import BottomNavigation from "@/components/layout/BottomNavigation"
import FloatingAssistant from "@/components/layout/FloatingAssistant"
import { mockVerifiedSellers } from "@/lib/mockData"
import styles from "@/styles/Verification.module.css"

export default function Verification() {
  const [verifiedSellers, setVerifiedSellers] = useState(mockVerifiedSellers)
  const [showApplyForm, setShowApplyForm] = useState(false)
  const [formData, setFormData] = useState({
    businessName: "",
    idType: "",
    idNumber: "",
    gstNumber: "",
    businessType: "",
    contactNumber: "",
    email: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Mock login state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
        setShowApplyForm(false)
        setFormData({
          businessName: "",
          idType: "",
          idNumber: "",
          gstNumber: "",
          businessType: "",
          contactNumber: "",
          email: "",
        })
      }, 3000)
    }, 1500)
  }

  if (!isLoggedIn) {
    return (
      <main className={styles.main}>
        <Banner />

        <div className={styles.loginRequired}>
          <div className={styles.lockIcon}>🔒</div>
          <h2>Login Required</h2>
          <p>Please login to access the verification system</p>
          <a href="/auth/login" className={styles.loginButton}>
            Login / Sign Up
          </a>
        </div>

        <BottomNavigation activeTab={null} />
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <Banner />

      <div className={styles.content}>
        <div className={styles.verificationHeader}>
          <h2>Sakhi Stamp Verification</h2>
          <p>Get verified to build trust with your customers</p>
        </div>

        {!showApplyForm && !isSubmitted && (
          <div className={styles.verificationInfo}>
            <div className={styles.infoCard}>
              <div className={styles.stampIcon}>✅</div>
              <h3>What is Sakhi Stamp?</h3>
              <p>
                Sakhi Stamp is a verification badge that helps users identify legitimate businesses. Verified sellers
                get a badge next to their name, increasing trust and credibility.
              </p>
              <button className={styles.applyButton} onClick={() => setShowApplyForm(true)}>
                Apply for Verification
              </button>
            </div>

            <div className={styles.benefitsList}>
              <h3>Benefits of Verification</h3>
              <ul>
                <li>Increased trust from customers</li>
                <li>Higher visibility in the community</li>
                <li>"Verified" badge on all your posts</li>
                <li>Priority customer support</li>
                <li>Access to business analytics</li>
              </ul>
            </div>
          </div>
        )}

        {showApplyForm && !isSubmitted && (
          <form className={styles.verificationForm} onSubmit={handleSubmit}>
            <h3>Verification Application</h3>

            <div className={styles.formGroup}>
              <label htmlFor="businessName">Business Name</label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="idType">ID Type</label>
                <select id="idType" name="idType" value={formData.idType} onChange={handleChange} required>
                  <option value="">Select ID Type</option>
                  <option value="aadhar">Aadhar Card</option>
                  <option value="pan">PAN Card</option>
                  <option value="voter">Voter ID</option>
                  <option value="passport">Passport</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="idNumber">ID Number</label>
                <input
                  type="text"
                  id="idNumber"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="gstNumber">GST Number (Optional)</label>
              <input type="text" id="gstNumber" name="gstNumber" value={formData.gstNumber} onChange={handleChange} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="businessType">Business Type</label>
              <select
                id="businessType"
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                required
              >
                <option value="">Select Business Type</option>
                <option value="retail">Retail</option>
                <option value="service">Service</option>
                <option value="food">Food & Beverage</option>
                <option value="tech">Technology</option>
                <option value="finance">Financial Services</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="contactNumber">Contact Number</label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            <div className={styles.formActions}>
              <button type="button" className={styles.cancelButton} onClick={() => setShowApplyForm(false)}>
                Cancel
              </button>
              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        )}

        {isSubmitted && (
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✅</div>
            <h3>Application Submitted!</h3>
            <p>
              Thank you for applying for Sakhi Stamp verification. Our team will review your application and get back to
              you within 2-3 business days.
            </p>
          </div>
        )}

        <div className={styles.verifiedSellers}>
          <h3>Verified Sellers</h3>

          {verifiedSellers.length > 0 ? (
            <div className={styles.sellersList}>
              {verifiedSellers.map((seller) => (
                <div key={seller.id} className={styles.sellerCard}>
                  <div className={styles.sellerInfo}>
                    <div className={styles.sellerNameWithBadge}>
                      <h4>{seller.name}</h4>
                      <span className={styles.verifiedBadge}>✓</span>
                    </div>
                    <p className={styles.sellerType}>{seller.type}</p>
                  </div>
                  <div className={styles.sellerStats}>
                    <span>Verified since: {new Date(seller.verifiedSince).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>No verified sellers yet</p>
            </div>
          )}
        </div>
      </div>

      <FloatingAssistant />
      <BottomNavigation activeTab={null} />
    </main>
  )
}
