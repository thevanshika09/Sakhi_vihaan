import Link from "next/link"
import styles from "@/styles/layout/BottomNavigation.module.css"

interface BottomNavigationProps {
  activeTab: "home" | "search" | "scan" | "alerts" | "history" | "social" | "wallet" | null
}

export default function BottomNavigation({ activeTab }: BottomNavigationProps) {
  return (
    <nav className={styles.navigation}>
      <Link href="/" className={`${styles.navItem} ${activeTab === "home" ? styles.active : ""}`}>
        <span className={styles.icon}>🏠</span>
        <span className={styles.label}>Home</span>
      </Link>

      <Link href="/social" className={`${styles.navItem} ${activeTab === "social" ? styles.active : ""}`}>
        <span className={styles.icon}>👥</span>
        <span className={styles.label}>Social</span>
      </Link>

      <Link
        href="/scan"
        className={`${styles.navItem} ${styles.scanItem} ${activeTab === "scan" ? styles.active : ""}`}
      >
        <div className={styles.scanButton}>
          <span className={styles.icon}>📷</span>
        </div>
        <span className={styles.label}>Scan</span>
      </Link>

      <Link href="/wallet" className={`${styles.navItem} ${activeTab === "wallet" ? styles.active : ""}`}>
        <span className={styles.icon}>💰</span>
        <span className={styles.label}>Wallet</span>
      </Link>

      <Link href="/report" className={`${styles.navItem} ${activeTab === "alerts" ? styles.active : ""}`}>
        <span className={styles.icon}>🔔</span>
        <span className={styles.label}>Report</span>
      </Link>
    </nav>
  )
}
