"use client"

import type React from "react"

import { useState } from "react"
import styles from "@/styles/social/PostInteractions.module.css"

interface PostInteractionsProps {
  postId: string
  initialLikes: number
  initialComments: number
  initialShares: number
  isLiked: boolean
  onLikeChange?: (postId: string, isLiked: boolean) => void
  onComment?: (postId: string, comment: string) => void
  onShare?: (postId: string) => void
  onReport?: (postId: string) => void
}

export default function PostInteractions({
  postId,
  initialLikes,
  initialComments,
  initialShares,
  isLiked,
  onLikeChange,
  onComment,
  onShare,
  onReport,
}: PostInteractionsProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [comments, setComments] = useState(initialComments)
  const [shares, setShares] = useState(initialShares)
  const [liked, setLiked] = useState(isLiked)
  const [showCommentInput, setShowCommentInput] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [showRedeemPopup, setShowRedeemPopup] = useState(false)

  const handleLike = () => {
    const newLikedState = !liked
    setLiked(newLikedState)
    setLikes((prev) => (newLikedState ? prev + 1 : prev - 1))

    if (onLikeChange) {
      onLikeChange(postId, newLikedState)
    }

    // Check if post reached 100 likes and show redeem popup
    if (likes === 99 && newLikedState) {
      setShowRedeemPopup(true)
    }
  }

  const handleCommentClick = () => {
    setShowCommentInput(!showCommentInput)
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()

    if (!commentText.trim()) return

    setComments((prev) => prev + 1)

    if (onComment) {
      onComment(postId, commentText)
    }

    setCommentText("")
    setShowCommentInput(false)
  }

  const handleShare = () => {
    setShares((prev) => prev + 1)

    if (onShare) {
      onShare(postId)
    }
  }

  const handleReport = () => {
    if (onReport) {
      onReport(postId)
    }
  }

  const handleRedeemCoin = () => {
    // In a real app, this would call an API to add a coin to the user's wallet
    setShowRedeemPopup(false)
  }

  return (
    <div className={styles.interactionsContainer}>
      <div className={styles.interactionButtons}>
        <button className={`${styles.interactionButton} ${liked ? styles.liked : ""}`} onClick={handleLike}>
          <span className={styles.interactionIcon}>{liked ? "❤️" : "🤍"}</span>
          <span className={styles.interactionCount}>{likes}</span>
        </button>

        <button className={styles.interactionButton} onClick={handleCommentClick}>
          <span className={styles.interactionIcon}>💬</span>
          <span className={styles.interactionCount}>{comments}</span>
        </button>

        <button className={styles.interactionButton} onClick={handleShare}>
          <span className={styles.interactionIcon}>🔄</span>
          <span className={styles.interactionCount}>{shares}</span>
        </button>

        <button className={styles.interactionButton} onClick={handleReport}>
          <span className={styles.interactionIcon}>🚨</span>
          <span className={styles.interactionLabel}>Report</span>
        </button>
      </div>

      {showCommentInput && (
        <form className={styles.commentForm} onSubmit={handleSubmitComment}>
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className={styles.commentInput}
          />
          <button type="submit" className={styles.commentButton}>
            Post
          </button>
        </form>
      )}

      {showRedeemPopup && (
        <div className={styles.redeemPopup}>
          <div className={styles.redeemContent}>
            <div className={styles.redeemIcon}>🎉</div>
            <h3>Congratulations!</h3>
            <p>Your post reached 100 likes! You've earned 1 Sakhi Coin.</p>
            <button className={styles.redeemButton} onClick={handleRedeemCoin}>
              Redeem Now
            </button>
            <button className={styles.closeButton} onClick={() => setShowRedeemPopup(false)}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
