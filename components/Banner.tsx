"use client"

import { useState } from "react"
import styles from "@/styles/Banner.module.css"

export default function Banner() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    // In a real app, this would toggle a class on the body or use a theme context
    document.body.classList.toggle("light-mode")
  }

  return (
    <header className={styles.banner}>
      <div className={styles.logo}>
        <span className={styles.icon}>🛡️</span>
        <h1>SakhiPay</h1>
      </div>

      <div className={styles.actions}>
        <button className={styles.themeToggle} onClick={toggleDarkMode}>
          Switch to {isDarkMode ? "Light" : "Dark"} Mode
        </button>
        <button className={styles.tryNow}>Try Now</button>
      </div>
    </header>
  )
}
