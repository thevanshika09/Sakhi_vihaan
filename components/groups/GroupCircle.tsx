"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import styles from "@/styles/groups/GroupCircle.module.css"

interface GroupCircleProps {
  id: string
  name: string
  memberCount: number
  isMember: boolean
  description?: string
  imageUrl?: string
}

export default function GroupCircle({
  id,
  name,
  memberCount,
  isMember,
  description = "",
  imageUrl = "",
}: GroupCircleProps) {
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteSent, setInviteSent] = useState(false)

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the invite
    console.log(`Sending invite to ${inviteEmail} for group ${id}`)
    setInviteSent(true)

    // Reset after 3 seconds
    setTimeout(() => {
      setInviteSent(false)
      setInviteEmail("")
      setShowInviteModal(false)
    }, 3000)
  }

  return (
    <>
      <motion.div className={styles.groupCircle} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
        <div className={styles.groupImage}>
          {imageUrl ? (
            <img src={imageUrl || "/placeholder.svg"} alt={name} />
          ) : (
            <div className={styles.groupInitial}>{name.charAt(0)}</div>
          )}
        </div>

        <div className={styles.groupInfo}>
          <h3 className={styles.groupName}>{name}</h3>
          <p className={styles.groupMeta}>
            {memberCount} {memberCount === 1 ? "member" : "members"}
          </p>
          {description && <p className={styles.groupDescription}>{description}</p>}
        </div>

        <div className={styles.groupAction}>
          {isMember ? (
            <div className={styles.memberStatus}>
              <span className={styles.statusBadge}>✓</span>
              You're already in this Circle
            </div>
          ) : (
            <button className={styles.joinButton} onClick={() => setShowInviteModal(true)}>
              Request to Join
            </button>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {showInviteModal && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.modal}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <button className={styles.closeButton} onClick={() => setShowInviteModal(false)}>
                ×
              </button>

              <h3 className={styles.modalTitle}>Join {name}</h3>

              {!inviteSent ? (
                <>
                  <p className={styles.modalDescription}>
                    Enter your email to request to join this circle or send an invite link to a friend.
                  </p>

                  <form onSubmit={handleSendInvite} className={styles.inviteForm}>
                    <input
                      type="email"
                      placeholder="Email address"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      required
                      className={styles.inviteInput}
                    />
                    <button type="submit" className={styles.sendButton}>
                      Send Invite Link
                    </button>
                  </form>
                </>
              ) : (
                <div className={styles.successMessage}>
                  <div className={styles.successIcon}>✓</div>
                  <p>Invite sent successfully!</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
