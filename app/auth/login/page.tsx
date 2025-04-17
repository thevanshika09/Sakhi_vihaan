"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import styles from "@/styles/auth/Auth.module.css"
import { useAuth } from '@/lib/context/AuthContext'

export default function Login() {
  const router = useRouter()
  const { signInWithEmail, signInWithGoogle, signInWithGithub } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await signInWithEmail(email, password)
      router.push("/scan")
    } catch (err: any) {
      setError(err.message || "Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: "google" | "github") => {
    setError("")
    setIsLoading(true)

    try {
      if (provider === "google") {
        await signInWithGoogle()
      } else {
        await signInWithGithub()
      }
      router.push("/scan")
    } catch (err: any) {
      setError(err.message || `Failed to login with ${provider}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Log in to your SakhiPay account</p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className={styles.divider}>
          <span>or continue with</span>
        </div>

        <div className={styles.socialButtons}>
          <button
            type="button"
            className={styles.googleButton}
            onClick={() => handleSocialLogin("google")}
            disabled={isLoading}
          >
            <img src="/google-icon.svg" alt="Google" />
            Google
          </button>
          <button
            type="button"
            className={styles.githubButton}
            onClick={() => handleSocialLogin("github")}
            disabled={isLoading}
          >
            <img src="/github-icon.svg" alt="GitHub" />
            GitHub
          </button>
        </div>

        <p className={styles.switchAuth}>
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className={styles.link}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
