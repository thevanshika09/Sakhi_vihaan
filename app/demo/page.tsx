"use client"

import { useState } from "react"
import Banner from "@/components/layout/Banner"
import BottomNavigation from "@/components/layout/BottomNavigation"
import FraudDetectionResult from "@/components/results/FraudDetectionResult"
import GroupCircle from "@/components/groups/GroupCircle"
import DarkModeToggle from "@/components/settings/DarkModeToggle"
import ThreeJsBackground from "@/components/animations/ThreeJsBackground"
import styles from "@/styles/demo/DemoPage.module.css"

export default function DemoPage() {
  const [resultType, setResultType] = useState<"fraud" | "safe" | "suspicious">("safe")

  const handleResultChange = (type: "fraud" | "safe" | "suspicious") => {
    setResultType(type)
  }

  const mockGroups = [
    {
      id: "group1",
      name: "Family Safety Circle",
      memberCount: 8,
      isMember: true,
      description: "Share safety tips and scam alerts with family members",
    },
    {
      id: "group2",
      name: "Office Colleagues",
      memberCount: 12,
      isMember: false,
      description: "Stay updated on financial safety with your colleagues",
    },
    {
      id: "group3",
      name: "Neighborhood Watch",
      memberCount: 24,
      isMember: true,
      description: "Local community scam alerts and safety discussions",
    },
  ]

  return (
    <main className={styles.main}>
      <Banner />
      <ThreeJsBackground />

      <div className={styles.content}>
        <h1 className={styles.pageTitle}>Demo Page</h1>
        <p className={styles.pageDescription}>This page demonstrates the new UI components and features</p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Fraud Detection Results</h2>
          <div className={styles.resultButtons}>
            <button
              className={`${styles.resultButton} ${resultType === "safe" ? styles.activeButton : ""}`}
              onClick={() => handleResultChange("safe")}
            >
              Safe Result
            </button>
            <button
              className={`${styles.resultButton} ${resultType === "suspicious" ? styles.activeButton : ""}`}
              onClick={() => handleResultChange("suspicious")}
            >
              Suspicious Result
            </button>
            <button
              className={`${styles.resultButton} ${resultType === "fraud" ? styles.activeButton : ""}`}
              onClick={() => handleResultChange("fraud")}
            >
              Fraud Result
            </button>
          </div>

          <FraudDetectionResult
            result={resultType}
            details={
              resultType === "fraud"
                ? "This appears to be a fraudulent UPI ID linked to multiple scam reports. Do not proceed with any payment."
                : resultType === "suspicious"
                  ? "This UPI ID has some unusual patterns. Verify the recipient through other means before proceeding."
                  : "This UPI ID belongs to a verified merchant and appears to be legitimate."
            }
            onAction={() => console.log(`Action clicked for ${resultType} result`)}
          />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Group Circles</h2>
          <div className={styles.groupsList}>
            {mockGroups.map((group) => (
              <GroupCircle
                key={group.id}
                id={group.id}
                name={group.name}
                memberCount={group.memberCount}
                isMember={group.isMember}
                description={group.description}
              />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Dark Mode Toggle</h2>
          <div className={styles.toggleContainer}>
            <DarkModeToggle />
          </div>
        </section>
      </div>

      <BottomNavigation activeTab="home" />
    </main>
  )
}
