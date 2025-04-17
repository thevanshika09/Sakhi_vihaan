import styles from "@/styles/QuickAction.module.css"

interface QuickActionProps {
  icon: string
  title: string
  color: "indigo" | "green" | "blue" | "purple"
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
    case "qr_code_scanner":
      return "📷"
    case "account_balance":
      return "🏦"
    case "trending_up":
      return "📈"
    default:
      return "📱"
  }
}
