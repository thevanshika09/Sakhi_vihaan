"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import SakhiRobot from "@/components/chat/SakhiRobot"
import styles from "@/styles/chat/ChatAssistant.module.css"

interface QuickReply {
  id: string
  text: string
  action: string
}

interface ChatAssistantProps {
  onClose: () => void
}

export default function ChatAssistant({ onClose }: ChatAssistantProps) {
  const [messages, setMessages] = useState<
    Array<{
      id: string
      text: string
      sender: "user" | "assistant"
      timestamp: Date
    }>
  >([
    {
      id: "welcome",
      text: "Hello! I'm your Sakhi Assistant. How can I help you today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])

  const [inputValue, setInputValue] = useState("")
  const [language, setLanguage] = useState<"english" | "hindi" | "malayalam" | "telugu">("english")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [robotMood, setRobotMood] = useState<"happy" | "thinking" | "alert" | "sad">("happy")

  const quickReplies: QuickReply[] = [
    { id: "q1", text: "How to verify UPI ID?", action: "verify_upi" },
    { id: "q2", text: "Report a scam", action: "report_scam" },
    { id: "q3", text: "Common scam types", action: "scam_types" },
    { id: "q4", text: "How to earn Sakhi Coins?", action: "earn_coins" },
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputValue.trim()) return

    const userMessage = {
      id: `msg-${Date.now()}`,
      text: inputValue,
      sender: "user" as const,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Set robot to thinking mode
    setRobotMood("thinking")

    // Check for fraud-related keywords to change robot mood
    const lowerMessage = inputValue.toLowerCase()
    let responseDelay = 1000
    let newMood: "happy" | "thinking" | "alert" | "sad" = "happy"

    if (lowerMessage.includes("scam") || lowerMessage.includes("fraud") || lowerMessage.includes("hack")) {
      newMood = "alert"
      responseDelay = 1500
    } else if (lowerMessage.includes("lost") || lowerMessage.includes("help") || lowerMessage.includes("worried")) {
      newMood = "sad"
      responseDelay = 1200
    }

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage = {
        id: `msg-${Date.now() + 1}`,
        text: getAssistantResponse(inputValue, language),
        sender: "assistant" as const,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setRobotMood(newMood)
    }, responseDelay)
  }

  const handleQuickReply = (reply: QuickReply) => {
    const userMessage = {
      id: `msg-${Date.now()}`,
      text: reply.text,
      sender: "user" as const,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Set robot to thinking mode
    setRobotMood("thinking")

    // Determine mood based on action
    let newMood: "happy" | "thinking" | "alert" | "sad" = "happy"
    if (reply.action === "report_scam" || reply.action === "scam_types") {
      newMood = "alert"
    }

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage = {
        id: `msg-${Date.now() + 1}`,
        text: getQuickReplyResponse(reply.action, language),
        sender: "assistant" as const,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setRobotMood(newMood)
    }, 1000)
  }

  const getAssistantResponse = (message: string, lang: string): string => {
    // In a real app, this would call an API to get a response
    // For now, we'll return a simple response based on the message
    const lowerMessage = message.toLowerCase()

    if (lang === "hindi") {
      return "मैं आपकी सहायता करने के लिए यहां हूं। कृपया अधिक विवरण प्रदान करें।"
    } else if (lang === "malayalam") {
      return "ഞാൻ നിങ്ങളെ സഹായിക്കാൻ ഇവിടെയുണ്ട്. കൂടുതൽ വിശദാംശങ്ങൾ നൽകുക."
    } else if (lang === "telugu") {
      return "నేను మీకు సహాయం చేయడానికి ఇక్కడ ఉన్నాను. దయచేసి మరిన్ని వివరాలను అందించండి."
    }

    if (lowerMessage.includes("upi") || lowerMessage.includes("verify")) {
      return "To verify a UPI ID, you can use our Scan feature. Go to the Scan tab, select 'UPI ID', and enter the UPI ID you want to verify. Our system will check if it's legitimate and safe to use."
    } else if (lowerMessage.includes("scam") || lowerMessage.includes("fraud")) {
      return "I'm sorry to hear you're concerned about a scam. You can report it through our Report feature. This helps protect others in our community. Would you like me to guide you through the reporting process?"
    } else if (lowerMessage.includes("coin") || lowerMessage.includes("reward")) {
      return "You can earn Sakhi Coins by reporting scams, inviting friends to join SakhiPay, and getting likes on your posts. These coins can be redeemed for various rewards in the Wallet section."
    } else {
      return "Thank you for your message. How else can I assist you with protecting your financial safety?"
    }
  }

  const getQuickReplyResponse = (action: string, lang: string): string => {
    if (lang !== "english") {
      return getAssistantResponse("", lang)
    }

    switch (action) {
      case "verify_upi":
        return "To verify a UPI ID, go to the Scan tab and select 'UPI ID'. Enter the UPI ID you want to check, and our system will verify if it belongs to a legitimate business or individual. Always verify before making payments!"
      case "report_scam":
        return "You can report a scam by going to the Report page. Fill in details about the scam, including type, description, and any contact information used by the scammer. Your report helps protect others in our community."
      case "scam_types":
        return "Common scams include: 1) Fake KYC verification messages, 2) Fraudulent investment schemes promising high returns, 3) Fake job offers requiring payment, 4) Fake customer service calls asking for OTP or banking details, and 5) Fake UPI payment requests."
      case "earn_coins":
        return "You can earn Sakhi Coins by: 1) Reporting scams (1 coin per verified report), 2) Inviting friends (5 coins per friend who joins), 3) Getting 100 likes on your posts (1 coin), and 4) Participating in community activities."
      default:
        return "I'm here to help you stay safe from financial scams. How else can I assist you today?"
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const changeLanguage = (lang: "english" | "hindi" | "malayalam" | "telugu") => {
    setLanguage(lang)

    const welcomeMessage = {
      id: `msg-${Date.now()}`,
      text: getLanguageWelcome(lang),
      sender: "assistant" as const,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, welcomeMessage])
  }

  const getLanguageWelcome = (lang: string): string => {
    switch (lang) {
      case "hindi":
        return "भाषा हिंदी में बदल दी गई है। मैं आपकी कैसे सहायता कर सकता हूँ?"
      case "malayalam":
        return "ഭാഷ മലയാളത്തിലേക്ക് മാറ്റി. എനിക്ക് നിങ്ങളെ എങ്ങനെ സഹായിക്കാൻ കഴിയും?"
      case "telugu":
        return "భాష తెలుగులోకి మార్చబడింది. నేను మీకు ఎలా సహాయం చేయగలను?"
      default:
        return "Language changed to English. How can I help you?"
    }
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <h3>Sakhi Assistant</h3>
        <div className={styles.headerActions}>
          <div className={styles.languageSelector}>
            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value as any)}
              className={styles.languageSelect}
            >
              <option value="english">English</option>
              <option value="hindi">हिंदी</option>
              <option value="malayalam">മലയാളം</option>
              <option value="telugu">తెలుగు</option>
            </select>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
      </div>

      <div className={styles.robotSection}>
        <SakhiRobot mood={robotMood} size="small" />
      </div>

      <div className={styles.chatMessages}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${message.sender === "assistant" ? styles.assistant : styles.user}`}
          >
            <div className={styles.messageContent}>
              <div className={styles.messageText}>{message.text}</div>
              <div className={styles.messageTime}>{formatTime(message.timestamp)}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.quickReplies}>
        {quickReplies.map((reply) => (
          <button key={reply.id} className={styles.quickReply} onClick={() => handleQuickReply(reply)}>
            {reply.text}
          </button>
        ))}
      </div>

      <form className={styles.chatInput} onSubmit={handleSendMessage}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          className={styles.inputField}
        />
        <button type="submit" className={styles.sendButton}>
          Send
        </button>
      </form>
    </div>
  )
}
