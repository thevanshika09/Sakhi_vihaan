"use client"

import { useState } from "react"
import Link from "next/link"
import Banner from "@/components/layout/Banner"
import BottomNavigation from "@/components/layout/BottomNavigation"
import FloatingAssistant from "@/components/layout/FloatingAssistant"
import RedemptionCard from "@/components/wallet/RedemptionCard"
import TransactionItem from "@/components/wallet/TransactionItem"
import { mockTransactions, mockRedemptionOffers } from "@/lib/mockData"
import styles from "@/styles/Wallet.module.css"

export default function Wallet() {
  const [transactions, setTransactions] = useState(mockTransactions)
  const [redemptionOffers, setRedemptionOffers] = useState(mockRedemptionOffers)
  const [showRedemptionModal, setShowRedemptionModal] = useState(false)
  const [selectedOffer, setSelectedOffer] = useState<any>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Mock login state

  // Calculate total coins
  const totalCoins = transactions.reduce((sum, transaction) => sum + transaction.amount, 0)

  const handleRedeemOffer = (offer: any) => {
    if (!isLoggedIn) {
      window.location.href = "/auth/login"
      return
    }

    if (totalCoins < offer.cost) {
      alert("Not enough coins to redeem this offer")
      return
    }

    setSelectedOffer(offer)
    setShowRedemptionModal(true)
  }

  const confirmRedemption = () => {
    // Add redemption transaction
    const newTransaction = {
      id: `tx-${Date.now()}`,
      type: "redemption",
      description: `Redeemed: ${selectedOffer.title}`,
      amount: -selectedOffer.cost,
      timestamp: new Date().toISOString(),
    }

    setTransactions([newTransaction, ...transactions])
    setShowRedemptionModal(false)
    setSelectedOffer(null)
  }

  if (!isLoggedIn) {
    return (
      <main className={styles.main}>
        <Banner />

        <div className={styles.loginRequired}>
          <div className={styles.lockIcon}>🔒</div>
          <h2>Login Required</h2>
          <p>Please login to access your Sakhi Coins Wallet</p>
          <Link href="/auth/login" className={styles.loginButton}>
            Login / Sign Up
          </Link>
        </div>

        <BottomNavigation activeTab="wallet" />
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <Banner />

      <div className={styles.content}>
        <div className={styles.walletCard}>
          <div className={styles.coinBalance}>
            <div className={styles.coinIcon}>🪙</div>
            <div className={styles.balanceInfo}>
              <h2>{totalCoins}</h2>
              <p>Sakhi Coins</p>
            </div>
          </div>

          <Link href="/referral" className={styles.earnMoreButton}>
            Invite Friends & Earn More
          </Link>
        </div>

        <div className={styles.redemptionCenter}>
          <h3>Redemption Center</h3>
          <div className={styles.redemptionGrid}>
            {redemptionOffers.map((offer) => (
              <RedemptionCard
                key={offer.id}
                offer={offer}
                onRedeem={() => handleRedeemOffer(offer)}
                disabled={totalCoins < offer.cost}
              />
            ))}
          </div>
        </div>

        <div className={styles.transactionHistory}>
          <h3>Transaction History</h3>
          <div className={styles.transactionList}>
            {transactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </div>
      </div>

      {showRedemptionModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.redemptionModal}>
            <h3>Confirm Redemption</h3>
            <div className={styles.offerDetails}>
              <p className={styles.offerTitle}>{selectedOffer.title}</p>
              <p className={styles.offerCost}>{selectedOffer.cost} Sakhi Coins</p>
            </div>
            <p className={styles.confirmText}>
              Are you sure you want to redeem this offer? This action cannot be undone.
            </p>
            <div className={styles.modalActions}>
              <button className={styles.cancelButton} onClick={() => setShowRedemptionModal(false)}>
                Cancel
              </button>
              <button className={styles.confirmButton} onClick={confirmRedemption}>
                Confirm Redemption
              </button>
            </div>
          </div>
        </div>
      )}

      <FloatingAssistant />
      <BottomNavigation activeTab="wallet" />
    </main>
  )
}
