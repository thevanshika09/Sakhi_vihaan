"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import NavbarDropdown from "@/components/layout/NavbarDropdown"
import styles from "@/styles/layout/Banner.module.css"

export default function Banner() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    setIsDarkMode(savedTheme === 'dark' || (!savedTheme && prefersDark))
    document.documentElement.setAttribute('data-theme', 
      savedTheme || (prefersDark ? 'dark' : 'light')
    )
  }, [])

  const toggleDarkMode = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light'
    setIsDarkMode(!isDarkMode)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const featuresItems = [
    { label: "Scan QR Code", href: "/scan", icon: "🔍" },
    { label: "Verify UPI", href: "/scan?type=upi", icon: "💳" },
    { label: "Report Scam", href: "/report", icon: "🚨" },
    { label: "Sakhi Stamp", href: "/verification", icon: "✅" },
  ]

  const communityItems = [
    { label: "Social Feed", href: "/social", icon: "👥" },
    { label: "Groups", href: "/groups", icon: "👪" },
    { label: "Referrals", href: "/referral", icon: "🎁" },
  ]

  const accountItems = [
    { label: "Profile", href: "/profile", icon: "👤" },
    { label: "Wallet", href: "/wallet", icon: "💰" },
    { label: "Settings", href: "/settings", icon: "⚙️" },
    { label: "Terms & Privacy", href: "/terms-privacy", icon: "📜" },
    { label: "Logout", href: "/auth/logout", icon: "🚪" },
  ]

  return (
    <header className={styles.banner}>
      <div className={styles.logo}>
        <Link href="/">
          <div className={styles.logoContent}>
            <span className={styles.icon}>🛡️</span>
            <h1>SakhiPay</h1>
          </div>
        </Link>
      </div>

      <button className={styles.menuButton} onClick={toggleMenu} aria-label="Toggle menu">
        <span className={styles.menuIcon}>{isMenuOpen ? "✕" : "☰"}</span>
      </button>

      <nav className={`${styles.navigation} ${isMenuOpen ? styles.isOpen : ''}`}>
        <Link href="/" className={styles.navLink}>
          Home
        </Link>
        <NavbarDropdown label="Features" items={featuresItems} />
        <NavbarDropdown label="Community" items={communityItems} />
        <Link href="/scan" className={styles.navLink}>
          Scan
        </Link>
      </nav>

      <div className={`${styles.actions} ${isMenuOpen ? styles.isOpen : ''}`}>
        <button 
          className={styles.themeToggle} 
          onClick={toggleDarkMode} 
          aria-label="Toggle theme"
          title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>
        <NavbarDropdown label="Account" items={accountItems} />
      </div>
    </header>
  )
}
