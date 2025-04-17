"use client"

import { useState } from "react"
import styles from "@/styles/groups/ContactSync.module.css"

interface ContactSyncProps {
  onClose: () => void
  onSync: (contacts: any[]) => void
}

export default function ContactSync({ onClose, onSync }: ContactSyncProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [permissionGranted, setPermissionGranted] = useState(false)

  const mockContacts = [
    { id: "c1", name: "Priya Sharma", phone: "+91 98765 43210" },
    { id: "c2", name: "Rahul Verma", phone: "+91 87654 32109" },
    { id: "c3", name: "Amit Kumar", phone: "+91 76543 21098" },
    { id: "c4", name: "Neha Singh", phone: "+91 65432 10987" },
    { id: "c5", name: "Vikram Patel", phone: "+91 54321 09876" },
  ]

  const [selectedContacts, setSelectedContacts] = useState<string[]>([])

  const handleRequestPermission = () => {
    setIsLoading(true)

    // Simulate permission request
    setTimeout(() => {
      setPermissionGranted(true)
      setIsLoading(false)
    }, 1500)
  }

  const handleToggleContact = (contactId: string) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter((id) => id !== contactId))
    } else {
      setSelectedContacts([...selectedContacts, contactId])
    }
  }

  const handleSyncContacts = () => {
    const contactsToSync = mockContacts.filter((contact) => selectedContacts.includes(contact.id))
    onSync(contactsToSync)
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.syncModal}>
        <div className={styles.modalHeader}>
          <h3>Sync Contacts</h3>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        {!permissionGranted ? (
          <div className={styles.permissionRequest}>
            <div className={styles.permissionIcon}>📱</div>
            <h4>Contact Access Required</h4>
            <p>
              To create groups with your contacts, SakhiPay needs permission to access your contacts. Your contacts will
              only be used for creating groups and will not be stored on our servers.
            </p>
            <button className={styles.permissionButton} onClick={handleRequestPermission} disabled={isLoading}>
              {isLoading ? "Requesting..." : "Allow Contact Access"}
            </button>
          </div>
        ) : (
          <>
            <div className={styles.contactsList}>
              {mockContacts.map((contact) => (
                <div key={contact.id} className={styles.contactItem}>
                  <label className={styles.contactCheckbox}>
                    <input
                      type="checkbox"
                      checked={selectedContacts.includes(contact.id)}
                      onChange={() => handleToggleContact(contact.id)}
                    />
                    <div className={styles.contactInfo}>
                      <div className={styles.contactName}>{contact.name}</div>
                      <div className={styles.contactPhone}>{contact.phone}</div>
                    </div>
                  </label>
                </div>
              ))}
            </div>

            <div className={styles.syncActions}>
              <button className={styles.cancelButton} onClick={onClose}>
                Cancel
              </button>
              <button
                className={styles.syncButton}
                onClick={handleSyncContacts}
                disabled={selectedContacts.length === 0}
              >
                Sync {selectedContacts.length} Contacts
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
