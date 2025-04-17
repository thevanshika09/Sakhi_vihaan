import styles from "@/styles/wallet/TransactionItem.module.css"

interface TransactionItemProps {
  transaction: {
    id: string
    type: "earned" | "redemption"
    description: string
    amount: number
    timestamp: string
  }
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className={styles.transaction}>
      <div className={styles.transactionIcon}>{transaction.type === "earned" ? "🔼" : "🔽"}</div>

      <div className={styles.transactionDetails}>
        <div className={styles.transactionDescription}>{transaction.description}</div>
        <div className={styles.transactionTime}>{formatDate(transaction.timestamp)}</div>
      </div>

      <div className={`${styles.transactionAmount} ${transaction.amount > 0 ? styles.positive : styles.negative}`}>
        {transaction.amount > 0 ? "+" : ""}
        {transaction.amount}
      </div>
    </div>
  )
}
