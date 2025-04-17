"use client"

import { useState } from "react"
import Link from "next/link"
import Banner from "@/components/layout/Banner"
import BottomNavigation from "@/components/layout/BottomNavigation"
import FloatingAssistant from "@/components/layout/FloatingAssistant"
import Post from "@/components/social/Post"
import CreatePostModal from "@/components/social/CreatePostModal"
import { mockPosts } from "@/lib/mockData"
import styles from "@/styles/Social.module.css"

export default function Social() {
  const [posts, setPosts] = useState(mockPosts)
  const [filter, setFilter] = useState<"newest" | "mostLiked">("newest")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleCreatePost = (postData: { text: string; media?: string }) => {
    // Check if user is logged in
    if (!isLoggedIn) {
      // Redirect to login or show login modal
      return
    }

    // Create new post
    const newPost = {
      id: `post-${Date.now()}`,
      user: {
        name: "You",
        handle: "@you",
        avatar: "/placeholder.svg?height=40&width=40",
        isVerified: false,
      },
      content: postData.text,
      media: postData.media,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
    }

    setPosts([newPost, ...posts])
    setShowCreateModal(false)
  }

  const handleLikePost = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked,
          }
        }
        return post
      }),
    )
  }

  const filteredPosts = [...posts].sort((a, b) => {
    if (filter === "newest") {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    } else {
      return b.likes - a.likes
    }
  })

  return (
    <main className={styles.main}>
      <Banner />

      <div className={styles.content}>
        <div className={styles.socialHeader}>
          <h2>Sakhi Social</h2>
          <p>Stay updated with the latest scam alerts from the community</p>
        </div>

        <div className={styles.socialActions}>
          <button
            className={styles.createPostButton}
            onClick={() => {
              if (isLoggedIn) {
                setShowCreateModal(true)
              } else {
                // Redirect to login
                window.location.href = "/auth/login"
              }
            }}
          >
            <span className={styles.icon}>✏️</span>
            Create Post
          </button>

          <div className={styles.filterOptions}>
            <button
              className={`${styles.filterButton} ${filter === "newest" ? styles.active : ""}`}
              onClick={() => setFilter("newest")}
            >
              Newest
            </button>
            <button
              className={`${styles.filterButton} ${filter === "mostLiked" ? styles.active : ""}`}
              onClick={() => setFilter("mostLiked")}
            >
              Most Liked
            </button>
          </div>
        </div>

        <div className={styles.postsList}>
          {filteredPosts.map((post) => (
            <Post key={post.id} post={post} onLike={() => handleLikePost(post.id)} />
          ))}
        </div>

        {!isLoggedIn && (
          <div className={styles.loginPrompt}>
            <p>Sign in to post and interact with the community</p>
            <Link href="/auth/login" className={styles.loginButton}>
              Login / Sign Up
            </Link>
          </div>
        )}
      </div>

      {showCreateModal && <CreatePostModal onClose={() => setShowCreateModal(false)} onSubmit={handleCreatePost} />}

      <FloatingAssistant />
      <BottomNavigation activeTab="social" />
    </main>
  )
}
