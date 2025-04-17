import styles from "@/styles/RecentActivity.module.css"

interface RecentActivityProps {
  title: string
  time: string
  status: "safe" | "warning" | "danger"
}

export default function RecentActivity({ title, time, status }: RecentActivityProps) {
  return (
    <div className={styles.activity}>
      <div className={`${styles.statusBadge} ${styles[status]}`}>{getStatusIcon(status)}</div>
      <div className={styles.details}>
        <div className={styles.title}>{title}</div>
        <div className={styles.time}>{time}</div>
      </div>
    </div>
  )
}

function getStatusIcon(status: string): string {
  switch (status) {
    case "safe":
      return "✅"
    case "warning":
      return "⚠️"
    case "danger":
      return "❌"
    default:
      return "❓"
  }
}
