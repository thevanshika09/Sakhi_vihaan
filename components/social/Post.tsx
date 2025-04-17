"use client"

import styles from "@/styles/social/Post.module.css"

interface PostProps {
  post: {
    id: string
    user: {
      name: string
      handle: string
      avatar: string
      isVerified: boolean
    }
    content: string
    media?: string
    timestamp: string
    likes: number
    comments: number
    shares: number
    isLiked: boolean
  }
  onLike: () => void
}

export default function Post({ post, onLike }: PostProps) {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 60) {
      return `${diffMins}m ago`
    } else if (diffHours < 24) {
      return `${diffHours}h ago`
    } else if (diffDays < 7) {
      return `${diffDays}d ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <div className={styles.post}>
      <div className={styles.postHeader}>
        <div className={styles.userAvatar}>
          <img src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
        </div>
        <div className={styles.userInfo}>
          <div className={styles.userName}>
            {post.user.name}
            {post.user.isVerified && <span className={styles.verifiedBadge}>✓</span>}
          </div>
          <div className={styles.userHandle}>{post.user.handle}</div>
        </div>
        <div className={styles.postTime}>{formatTimestamp(post.timestamp)}</div>
      </div>

      <div className={styles.postContent}>
        <p>{post.content}</p>

        {post.media && (
          <div className={styles.postMedia}>
            <img src={post.media || "/placeholder.svg"} alt="Post media" />
          </div>
        )}
      </div>

      <div className={styles.postActions}>
        <button className={`${styles.actionButton} ${post.isLiked ? styles.liked : ""}`} onClick={onLike}>
          <span className={styles.actionIcon}>{post.isLiked ? "❤️" : "🤍"}</span>
          <span className={styles.actionCount}>{post.likes}</span>
        </button>

        <button className={styles.actionButton}>
          <span className={styles.actionIcon}>💬</span>
          <span className={styles.actionCount}>{post.comments}</span>
        </button>

        <button className={styles.actionButton}>
          <span className={styles.actionIcon}>🔄</span>
          <span className={styles.actionCount}>{post.shares}</span>
        </button>

        <button className={styles.actionButton}>
          <span className={styles.actionIcon}>🚨</span>
          <span className={styles.actionLabel}>Report</span>
        </button>
      </div>
    </div>
  )
}
