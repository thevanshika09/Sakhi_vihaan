"use client"

import { useState } from "react"
import Banner from "@/components/layout/Banner"
import BottomNavigation from "@/components/layout/BottomNavigation"
import FloatingAssistant from "@/components/layout/FloatingAssistant"
import { mockReferrals } from "@/lib/mockData"
import styles from "@/styles/Referral.module.css"

export default function Referral() {
  const [referrals, setReferrals] = useState(mockReferrals)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Mock login state
  const [showShareOptions, setShowShareOptions] = useState(false)

  // Mock referral code
  const referralCode = "SAKHI2024"
  const referralLink = `https://sakhipay.com/r/${referralCode}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink)
    alert("Referral link copied to clipboard!")
  }

  const handleShare = (platform: string) => {
    // Mock share functionality
    alert(`Sharing to ${platform}...`)
    setShowShareOptions(false)
  }

  if (!isLoggedIn) {
    return (
      <main className={styles.main}>
        <Banner />

        <div className={styles.loginRequired}>
          <div className={styles.lockIcon}>🔒</div>
          <h2>Login Required</h2>
          <p>Please login to access the referral program</p>
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
        <div className={styles.referralHeader}>
          <h2>Invite Friends & Earn</h2>
          <p>Get 5 Sakhi Coins for each friend who joins and completes their first scan</p>
        </div>

        <div className={styles.referralCard}>
          <div className={styles.referralStats}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{referrals.length}</span>
              <span className={styles.statLabel}>Invites Sent</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{referrals.filter((r) => r.status === "joined").length}</span>
              <span className={styles.statLabel}>Joined</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{referrals.filter((r) => r.status === "completed").length * 5}</span>
              <span className={styles.statLabel}>Coins Earned</span>
            </div>
          </div>

          <div className={styles.referralCode}>
            <p>Your Referral Code</p>
            <div className={styles.codeDisplay}>
              <span>{referralCode}</span>
              <button className={styles.copyButton} onClick={handleCopyLink}>
                Copy
              </button>
            </div>
          </div>

          <div className={styles.shareOptions}>
            <button className={styles.shareButton} onClick={() => setShowShareOptions(!showShareOptions)}>
              Invite Friends
            </button>

            {showShareOptions && (
              <div className={styles.shareMenu}>
                <button className={styles.shareOption} onClick={() => handleShare("WhatsApp")}>
                  <span className={styles.shareIcon}>📱</span>
                  WhatsApp
                </button>
                <button className={styles.shareOption} onClick={() => handleShare("SMS")}>
                  <span className={styles.shareIcon}>✉️</span>
                  SMS
                </button>
                <button className={styles.shareOption} onClick={() => handleShare("Email")}>
                  <span className={styles.shareIcon}>📧</span>
                  Email
                </button>
                <button className={styles.shareOption} onClick={() => handleShare("Copy")}>
                  <span className={styles.shareIcon}>📋</span>
                  Copy Link
                </button>
              </div>
            )}
          </div>
        </div>

        <div className={styles.referralHistory}>
          <h3>Referral History</h3>

          <div className={styles.referralTable}>
            <div className={styles.tableHeader}>
              <div className={styles.tableCell}>Name</div>
              <div className={styles.tableCell}>Date</div>
              <div className={styles.tableCell}>Status</div>
              <div className={styles.tableCell}>Coins</div>
            </div>

            {referrals.length > 0 ? (
              <div className={styles.tableBody}>
                {referrals.map((referral) => (
                  <div key={referral.id} className={styles.tableRow}>
                    <div className={styles.tableCell}>{referral.name}</div>
                    <div className={styles.tableCell}>{new Date(referral.date).toLocaleDateString()}</div>
                    <div className={`${styles.tableCell} ${styles[referral.status]}`}>
                      {referral.status === "pending" && "Pending"}
                      {referral.status === "joined" && "Joined"}
                      {referral.status === "completed" && "Completed"}
                    </div>
                    <div className={styles.tableCell}>{referral.status === "completed" ? "+5" : "0"}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p>No referrals yet. Start inviting friends!</p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.referralFaq}>
          <h3>How It Works</h3>
          <div className={styles.faqItem}>
            <h4>1. Invite Friends</h4>
            <p>Share your unique referral code with friends and family</p>
          </div>
          <div className={styles.faqItem}>
            <h4>2. They Join SakhiPay</h4>
            <p>When they sign up using your code, you'll see them in your referral list</p>
          </div>
          <div className={styles.faqItem}>
            <h4>3. Earn Rewards</h4>
            <p>Get 5 Sakhi Coins when they complete their first scan</p>
          </div>
        </div>
      </div>

      <FloatingAssistant />
      <BottomNavigation activeTab={null} />
    </main>
  )
}
