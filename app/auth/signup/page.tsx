"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from '@/styles/auth/Auth.module.css'
import { useAuth } from '@/lib/context/AuthContext'

export default function Signup() {
  const router = useRouter()
  const { signUpWithEmail, signInWithGoogle, signInWithGithub } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)

    try {
      await signUpWithEmail(email, password)
      router.push('/scan')
    } catch (err: any) {
      setError(err.message || 'Failed to create account')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialSignup = async (provider: 'google' | 'github') => {
    setError('')
    setIsLoading(true)

    try {
      if (provider === 'google') {
        await signInWithGoogle()
      } else {
        await signInWithGithub()
      }
      router.push('/scan')
    } catch (err: any) {
      setError(err.message || `Failed to sign up with ${provider}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <div className={styles.authHeader}>
            <h2>Create Your Account</h2>
            <p>Join SakhiPay to stay protected from online fraud</p>
          </div>

          <div className={styles.socialAuth}>
            <button onClick={() => handleSocialSignup('google')}>Sign up with Google</button>
            <button onClick={() => handleSocialSignup('github')}>Sign up with GitHub</button>
          </div>

          <div className={styles.authDivider}>
            <span>OR</span>
          </div>

          <form className={styles.authForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {error && <p className={styles.errorMessage}>{error}</p>}

            <div className={styles.termsCheckbox}>
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I agree to the <Link href="/terms-privacy">Terms of Service</Link> and{" "}
                <Link href="/terms-privacy">Privacy Policy</Link>
              </label>
            </div>

            <button type="submit" className={styles.primaryButton}>
              Create Account
            </button>
          </form>

          <p className={styles.authFooter}>
            Already have an account? <Link href="/auth/login">Login</Link>
          </p>
        </div>
      </div>

      <BottomNavigation activeTab={null} />
    </main>
  )
}
