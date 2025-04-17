"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Banner from "@/components/layout/Banner"
import BottomNavigation from "@/components/layout/BottomNavigation"
import FloatingAssistant from "@/components/layout/FloatingAssistant"
import GroupCircle from "@/components/groups/GroupCircle"
import GroupChat from "@/components/groups/GroupChat"
import ContactSync from "@/components/groups/ContactSync"
import { mockGroups } from "@/lib/mockData"
import styles from "@/styles/Groups.module.css"

export default function Groups() {
  const [groups, setGroups] = useState(mockGroups)
  const [activeTab, setActiveTab] = useState<"public" | "private">("public")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showContactSync, setShowContactSync] = useState(false)
  const [newGroupName, setNewGroupName] = useState("")
  const [newGroupType, setNewGroupType] = useState<"public" | "private">("private")
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Mock login state
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const publicGroups = groups.filter((group) => group.type === "public")
  const privateGroups = groups.filter((group) => group.type === "private")

  useEffect(() => {
    // Reset selected group when changing tabs
    setSelectedGroup(null)
  }, [activeTab])

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newGroupName.trim()) return

    const newGroup = {
      id: `group-${Date.now()}`,
      name: newGroupName,
      type: newGroupType,
      members: 1,
      alerts: 0,
      lastActivity: new Date().toISOString(),
    }

    setGroups([...groups, newGroup])
    setNewGroupName("")
    setShowCreateModal(false)
  }

  const handleDeleteGroup = () => {
    if (!selectedGroup) return

    setGroups(groups.filter((group) => group.id !== selectedGroup))
    setSelectedGroup(null)
    setShowDeleteConfirm(false)
  }

  const handleSyncContacts = (contacts: any[]) => {
    console.log("Synced contacts:", contacts)
    setShowContactSync(false)
  }

  if (!isLoggedIn && activeTab === "private") {
    return (
      <main className={styles.main}>
        <Banner />

        <div className={styles.content}>
          <div className={styles.groupsTabs}>
            <button
              className={`${styles.tabButton} ${activeTab === "public" ? styles.active : ""}`}
              onClick={() => setActiveTab("public")}
            >
              Public Groups
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "private" ? styles.active : ""}`}
              onClick={() => setActiveTab("private")}
            >
              Private Groups
            </button>
          </div>

          <div className={styles.loginRequired}>
            <div className={styles.lockIcon}>🔒</div>
            <h2>Login Required</h2>
            <p>Please login to access private groups</p>
            <Link href="/auth/login" className={styles.loginButton}>
              Login / Sign Up
            </Link>
          </div>
        </div>

        <BottomNavigation activeTab="groups" />
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <Banner />

      <div className={styles.content}>
        <div className={styles.groupsHeader}>
          <h2>Community Groups</h2>
          <p>Join groups to stay updated and share scam alerts with others</p>
        </div>

        <div className={styles.groupsTabs}>
          <button
            className={`${styles.tabButton} ${activeTab === "public" ? styles.active : ""}`}
            onClick={() => setActiveTab("public")}
          >
            Public Groups
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "private" ? styles.active : ""}`}
            onClick={() => setActiveTab("private")}
          >
            Private Groups
          </button>
        </div>

        <div className={styles.groupsActions}>
          {activeTab === "private" && (
            <button className={styles.syncContactsButton} onClick={() => setShowContactSync(true)}>
              Sync Contacts
            </button>
          )}
          <button
            className={styles.createGroupButton}
            onClick={() => {
              if (isLoggedIn) {
                setShowCreateModal(true)
              } else {
                window.location.href = "/auth/login"
              }
            }}
          >
            Create New Group
          </button>
        </div>

        {selectedGroup ? (
          <div className={styles.groupChatContainer}>
            <div className={styles.chatHeader}>
              <button className={styles.backButton} onClick={() => setSelectedGroup(null)}>
                ← Back to Groups
              </button>
              <h3>{groups.find((g) => g.id === selectedGroup)?.name}</h3>
              {groups.find((g) => g.id === selectedGroup)?.type === "private" && (
                <button className={styles.deleteGroupButton} onClick={() => setShowDeleteConfirm(true)}>
                  Delete Group
                </button>
              )}
            </div>
            <GroupChat groupId={selectedGroup} />
          </div>
        ) : (
          <div className={styles.groupsList}>
            {activeTab === "public" ? (
              publicGroups.length > 0 ? (
                publicGroups.map((group) => (
                  <GroupCircle
                    key={group.id}
                    id={group.id}
                    name={group.name}
                    memberCount={group.members}
                    isMember={false}
                    description={`A community group with ${group.alerts} scam alerts`}
                  />
                ))
              ) : (
                <div className={styles.emptyState}>
                  <p>No public groups available</p>
                </div>
              )
            ) : privateGroups.length > 0 ? (
              privateGroups.map((group) => (
                <GroupCircle
                  key={group.id}
                  id={group.id}
                  name={group.name}
                  memberCount={group.members}
                  isMember={true}
                  description={`A private group with ${group.alerts} scam alerts`}
                />
              ))
            ) : (
              <div className={styles.emptyState}>
                <p>You haven't created or joined any private groups yet</p>
                <button className={styles.createFirstButton} onClick={() => setShowCreateModal(true)}>
                  Create Your First Group
                </button>
              </div>
            )}
          </div>
        )}

        <div className={styles.groupsInfo}>
          <div className={styles.infoCard}>
            <h3>Public Groups</h3>
            <p>Open to everyone. Join to see scam alerts posted by the community.</p>
          </div>
          <div className={styles.infoCard}>
            <h3>Private Groups</h3>
            <p>Create a group with family and friends. Get instant alerts when any member reports a scam.</p>
          </div>
        </div>
      </div>

      {showCreateModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.createGroupModal}>
            <h3>Create New Group</h3>
            <form onSubmit={handleCreateGroup}>
              <div className={styles.formGroup}>
                <label htmlFor="groupName">Group Name</label>
                <input
                  type="text"
                  id="groupName"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="Enter group name"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Group Type</label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="groupType"
                      value="public"
                      checked={newGroupType === "public"}
                      onChange={() => setNewGroupType("public")}
                    />
                    Public
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="groupType"
                      value="private"
                      checked={newGroupType === "private"}
                      onChange={() => setNewGroupType("private")}
                    />
                    Private
                  </label>
                </div>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelButton} onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
                <button type="submit" className={styles.createButton}>
                  Create Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showContactSync && <ContactSync onClose={() => setShowContactSync(false)} onSync={handleSyncContacts} />}

      {showDeleteConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.confirmModal}>
            <h3>Delete Group</h3>
            <p>Are you sure you want to delete this group? This action cannot be undone.</p>
            <div className={styles.modalActions}>
              <button className={styles.cancelButton} onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </button>
              <button className={styles.deleteButton} onClick={handleDeleteGroup}>
                Delete Group
              </button>
            </div>
          </div>
        </div>
      )}

      <FloatingAssistant />
      <BottomNavigation activeTab="groups" />
    </main>
  )
}
