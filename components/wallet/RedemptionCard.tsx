"use client"

import styles from "@/styles/wallet/RedemptionCard.module.css"

interface RedemptionCardProps {
  offer: {
    id: string
    title: string
    description: string
    cost: number
    image: string
  }
  onRedeem: () => void
  disabled: boolean
}

export default function RedemptionCard({ offer, onRedeem, disabled }: RedemptionCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <img src={offer.image || "/placeholder.svg"} alt={offer.title} />
      </div>

      <div className={styles.cardContent}>
        <h4 className={styles.cardTitle}>{offer.title}</h4>
        <p className={styles.cardDescription}>{offer.description}</p>

        <div className={styles.cardFooter}>
          <div className={styles.coinCost}>
            <span className={styles.coinIcon}>🪙</span>
            <span>{offer.cost}</span>
          </div>

          <button className={styles.redeemButton} onClick={onRedeem} disabled={disabled}>
            {disabled ? "Not Enough Coins" : "Redeem"}
          </button>
        </div>
      </div>
    </div>
  )
}
