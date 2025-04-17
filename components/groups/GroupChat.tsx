"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import styles from "@/styles/groups/GroupChat.module.css"

interface Message {
  id: string
  sender: string
  text: string
  timestamp: Date
  isCurrentUser: boolean
}

interface GroupChatProps {
  groupId: string
}

export default function GroupChat({ groupId }: GroupChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load mock messages for the selected group
    const mockMessages: Message[] = [
      {
        id: "msg1",
        sender: "Priya Sharma",
        text: "Hello everyone! I just received a suspicious message claiming to be from SBI Bank.",
        timestamp: new Date(Date.now() - 3600000 * 2),
        isCurrentUser: false,
      },
      {
        id: "msg2",
        sender: "Rahul Verma",
        text: "What did the message say? Was it asking for OTP or account details?",
        timestamp: new Date(Date.now() - 3600000),
        isCurrentUser: false,
      },
      {
        id: "msg3",
        sender: "You",
        text: "I got a similar message yesterday. It's definitely a scam. They're asking for OTP to 'verify your account'.",
        timestamp: new Date(Date.now() - 1800000),
        isCurrentUser: true,
      },
      {
        id: "msg4",
        sender: "Priya Sharma",
        text: "Yes, exactly! They asked for my OTP saying my account will be blocked otherwise.",
        timestamp: new Date(Date.now() - 900000),
        isCurrentUser: false,
      },
    ]

    setMessages(mockMessages)
  }, [groupId])

  useEffect(() => {
    // Scroll to bottom when messages change
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: "You",
      text: newMessage,
      timestamp: new Date(),
      isCurrentUser: true,
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messageList}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.messageItem} ${message.isCurrentUser ? styles.outgoing : styles.incoming}`}
          >
            {!message.isCurrentUser && <div className={styles.messageSender}>{message.sender}</div>}
            <div className={styles.messageContent}>
              <div className={styles.messageText}>{message.text}</div>
              <div className={styles.messageTime}>{formatTime(message.timestamp)}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className={styles.messageForm} onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className={styles.messageInput}
        />
        <button type="submit" className={styles.sendButton}>
          Send
        </button>
      </form>
    </div>
  )
}
