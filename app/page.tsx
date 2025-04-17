'use client';

import { useState, useEffect } from 'react';
import Banner from '@/components/layout/Banner';
import FloatingAssistant from '@/components/layout/FloatingAssistant';
import RobotLoader from '@/components/loading/RobotLoader';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <RobotLoader />;
  }

  return (
    <main className={styles.main}>
      <Banner />
      
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>
          <span className={styles.brandName}>SakhiPay</span> - Your Financial Safety Partner
        </h1>
        <h2 className={styles.tagline}>Koi bhi scam kare, pehle Sakhi kare scan</h2>
        <p className={styles.subtitle}>Your AI assistant to protect against online fraud and financial scams</p>
        
        <div className={styles.heroButtons}>
          <Link href="/scan" className={styles.primaryButton}>
            Scan Now
          </Link>
          <Link href="/community" className={styles.secondaryButton}>
            Join Community
          </Link>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={`${styles.statCard} ${styles.animateCard}`} style={{ animationDelay: '0.1s' }}>
          <div className={styles.statValue}>500,000+</div>
          <div className={styles.statLabel}>Scams Detected</div>
        </div>
        <div className={`${styles.statCard} ${styles.animateCard}`} style={{ animationDelay: '0.2s' }}>
          <div className={styles.statValue}>₹25Cr+</div>
          <div className={styles.statLabel}>Money Saved</div>
        </div>
        <div className={`${styles.statCard} ${styles.animateCard}`} style={{ animationDelay: '0.3s' }}>
          <div className={styles.statValue}>100,000+</div>
          <div className={styles.statLabel}>Active Users</div>
        </div>
        <div className={`${styles.statCard} ${styles.animateCard}`} style={{ animationDelay: '0.4s' }}>
          <div className={styles.statValue}>4.9/5</div>
          <div className={styles.statLabel}>User Rating</div>
        </div>
      </div>

      <section className={styles.features}>
        <div className={styles.sectionHeader}>
          <h2>Quick Actions</h2>
          <p>Protect yourself with these tools</p>
        </div>
        
        <div className={styles.featureGrid}>
          <Link href="/scan" className={`${styles.featureCard} ${styles.animateCard}`} style={{ animationDelay: '0.5s' }}>
            <div className={styles.featureIcon}>🔍</div>
            <h3>Scan QR</h3>
            <p>Verify payment QR codes instantly</p>
          </Link>
          
          <Link href="/verify" className={`${styles.featureCard} ${styles.animateCard}`} style={{ animationDelay: '0.6s' }}>
            <div className={styles.featureIcon}>💳</div>
            <h3>Verify UPI</h3>
            <p>Check UPI ID legitimacy</p>
          </Link>
          
          <Link href="/report" className={`${styles.featureCard} ${styles.animateCard}`} style={{ animationDelay: '0.7s' }}>
            <div className={styles.featureIcon}>🚨</div>
            <h3>Report Scam</h3>
            <p>Help protect the community</p>
          </Link>
          
          <Link href="/community" className={`${styles.featureCard} ${styles.animateCard}`} style={{ animationDelay: '0.8s' }}>
            <div className={styles.featureIcon}>👥</div>
            <h3>Community</h3>
            <p>Join discussions and share experiences</p>
          </Link>
        </div>
      </section>

      <section className={`${styles.highlights} ${styles.animateSection}`}>
        <div className={styles.sectionHeader}>
          <h2>Why Choose SakhiPay?</h2>
          <p>Your trusted companion in the digital payment ecosystem</p>
        </div>

        <div className={styles.highlightGrid}>
          <div className={`${styles.highlightCard} ${styles.animateCard}`} style={{ animationDelay: '0.9s' }}>
            <div className={styles.highlightIcon}>🤖</div>
            <h3>AI-Powered</h3>
            <p>Advanced algorithms to detect fraudulent patterns</p>
          </div>

          <div className={`${styles.highlightCard} ${styles.animateCard}`} style={{ animationDelay: '1s' }}>
            <div className={styles.highlightIcon}>⚡</div>
            <h3>Real-time</h3>
            <p>Instant verification and alerts</p>
          </div>

          <div className={`${styles.highlightCard} ${styles.animateCard}`} style={{ animationDelay: '1.1s' }}>
            <div className={styles.highlightIcon}>🛡️</div>
            <h3>Secure</h3>
            <p>Bank-grade security for your transactions</p>
          </div>

          <div className={`${styles.highlightCard} ${styles.animateCard}`} style={{ animationDelay: '1.2s' }}>
            <div className={styles.highlightIcon}>🤝</div>
            <h3>Community</h3>
            <p>Crowdsourced fraud detection network</p>
          </div>
        </div>
      </section>

      <FloatingAssistant />
    </main>
  );
}
