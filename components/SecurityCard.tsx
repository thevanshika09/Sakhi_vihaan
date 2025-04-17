import styles from "@/styles/SecurityCard.module.css"

interface SecurityCardProps {
  title: string
  description: string
  icon: string
}

export default function SecurityCard({ title, description, icon }: SecurityCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>
        <span className={styles.icon}>{icon}</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  )
}
