import styles from "@/styles/BottomNavigation.module.css"

interface BottomNavigationProps {
  activeTab: "home" | "search" | "scan" | "alerts" | "history"
}

export default function BottomNavigation({ activeTab }: BottomNavigationProps) {
  return (
    <nav className={styles.navigation}>
      <div className={`${styles.navItem} ${activeTab === "home" ? styles.active : ""}`}>
        <span className={styles.icon}>🏠</span>
        <span className={styles.label}>Home</span>
      </div>

      <div className={`${styles.navItem} ${activeTab === "search" ? styles.active : ""}`}>
        <span className={styles.icon}>🔍</span>
        <span className={styles.label}>Search</span>
      </div>

      <div className={`${styles.navItem} ${styles.scanItem} ${activeTab === "scan" ? styles.active : ""}`}>
        <div className={styles.scanButton}>
          <span className={styles.icon}>📷</span>
        </div>
        <span className={styles.label}>Scan</span>
      </div>

      <div className={`${styles.navItem} ${activeTab === "alerts" ? styles.active : ""}`}>
        <span className={styles.icon}>🔔</span>
        <span className={styles.label}>Alerts</span>
      </div>

      <div className={`${styles.navItem} ${activeTab === "history" ? styles.active : ""}`}>
        <span className={styles.icon}>📜</span>
        <span className={styles.label}>History</span>
      </div>
    </nav>
  )
}
