import styles from "@/styles/home/QuickAction.module.css"

interface QuickActionProps {
  icon: string
  title: string
  color: "green" | "purple" | "blue" | "orange"
}

export default function QuickAction({ icon, title, color }: QuickActionProps) {
  return (
    <div className={`${styles.card} ${styles[color]}`}>
      <div className={styles.iconContainer}>
        <span className={styles.icon}>{getIcon(icon)}</span>
      </div>
      <span className={styles.title}>{title}</span>
    </div>
  )
}

function getIcon(iconName: string): string {
  switch (iconName) {
    case "qr_code":
      return "📷"
    case "account_balance":
      return "🏦"
    case "forum":
      return "👥"
    case "wallet":
      return "💰"
    default:
      return "📱"
  }
}
