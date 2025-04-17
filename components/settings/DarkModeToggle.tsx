"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import styles from "@/styles/settings/DarkModeToggle.module.css"

interface DarkModeToggleProps {
  initialTheme?: "light" | "dark"
}

export default function DarkModeToggle({ initialTheme = "dark" }: DarkModeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">(initialTheme)

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    if (savedTheme) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    } else {
      // If no saved theme, use system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      const systemTheme = prefersDark ? "dark" : "light"
      setTheme(systemTheme)
      applyTheme(systemTheme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    applyTheme(newTheme)
  }

  const applyTheme = (theme: "light" | "dark") => {
    if (theme === "dark") {
      document.body.classList.remove("light-mode")
    } else {
      document.body.classList.add("light-mode")
    }
  }

  return (
    <motion.button
      className={`${styles.toggleButton} ${theme === "dark" ? styles.dark : styles.light}`}
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className={styles.toggleTrack}>
        <motion.div
          className={styles.toggleThumb}
          layout
          animate={{
            x: theme === "dark" ? 0 : 22,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {theme === "dark" ? <span className={styles.moonIcon}>🌙</span> : <span className={styles.sunIcon}>☀️</span>}
        </motion.div>
      </div>
      <span className={styles.toggleLabel}>{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
    </motion.button>
  )
}
