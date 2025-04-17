"use client"

import type React from "react"

import { useState } from "react"
import styles from "@/styles/social/CreatePostModal.module.css"

interface CreatePostModalProps {
  onClose: () => void
  onSubmit: (postData: { text: string; media?: string }) => void
}

export default function CreatePostModal({ onClose, onSubmit }: CreatePostModalProps) {
  const [postText, setPostText] = useState("")
  const [mediaFile, setMediaFile] = useState<File | null>(null)
  const [mediaPreview, setMediaPreview] = useState<string | null>(null)

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setMediaFile(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setMediaPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    if (!postText.trim()) return

    onSubmit({
      text: postText,
      media: mediaPreview || undefined,
    })
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3>Create Post</h3>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.modalContent}>
          <textarea
            className={styles.postInput}
            placeholder="Share a scam alert or safety tip..."
            value={postText}
            onChange={handleTextChange}
          />

          {mediaPreview && (
            <div className={styles.mediaPreview}>
              <img src={mediaPreview || "/placeholder.svg"} alt="Media preview" />
              <button
                className={styles.removeMediaButton}
                onClick={() => {
                  setMediaFile(null)
                  setMediaPreview(null)
                }}
              >
                ×
              </button>
            </div>
          )}

          <div className={styles.postActions}>
            <div className={styles.mediaButtons}>
              <label className={styles.mediaButton}>
                <span className={styles.mediaIcon}>🖼️</span>
                <span>Photo</span>
                <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
              </label>

              <button className={styles.mediaButton}>
                <span className={styles.mediaIcon}>📊</span>
                <span>Poll</span>
              </button>

              <button className={styles.mediaButton}>
                <span className={styles.mediaIcon}>🔗</span>
                <span>Link</span>
              </button>
            </div>

            <button className={styles.postButton} onClick={handleSubmit} disabled={!postText.trim()}>
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
