"use client"

import { useState, useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { useSpring, animated } from "@react-spring/web"
import { OrbitControls } from "@react-three/drei"
import styles from "@/styles/loading/SakhiRobotLoader.module.css"

// 3D Robot Head Component
function RobotHead() {
  const [blinking, setBlinking] = useState(false)

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinking(true)
      setTimeout(() => setBlinking(false), 200)
    }, 3000)

    return () => clearInterval(blinkInterval)
  }, [])

  return (
    <group>
      {/* Robot Head */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#10b981" wireframe />
      </mesh>

      {/* Left Eye */}
      <mesh position={[-0.5, 0.3, 1.01]} scale={blinking ? [1, 0.1, 1] : [1, 1, 1]}>
        <circleGeometry args={[0.3, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Right Eye */}
      <mesh position={[0.5, 0.3, 1.01]} scale={blinking ? [1, 0.1, 1] : [1, 1, 1]}>
        <circleGeometry args={[0.3, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Mouth */}
      <mesh position={[0, -0.5, 1.01]}>
        <boxGeometry args={[1, 0.2, 0.1]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 16]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

export default function SakhiRobotLoader() {
  const [show3D, setShow3D] = useState(false)
  const [loadingDone, setLoadingDone] = useState(false)
  const [loadingText, setLoadingText] = useState("Loading")
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isMuted, setIsMuted] = useState(true)

  // Animated dots for loading text
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prev) => {
        if (prev === "Loading...") return "Loading"
        return prev + "."
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  // Transition from 2D to 3D after delay
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShow3D(true)
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          // Auto-play was prevented
          console.log("Audio autoplay was prevented")
        })
      }
    }, 2000)

    const timer2 = setTimeout(() => {
      setLoadingDone(true)
    }, 5000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  // Spring animation for fade-out
  const fadeOut = useSpring({
    opacity: loadingDone ? 0 : 1,
    config: { duration: 1000 },
    onRest: () => {
      if (loadingDone) {
        // Redirect or remove loader after fade out
        window.location.href = "/"
      }
    },
  })

  // Toggle audio mute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  return (
    <animated.div className={styles.loaderContainer} style={fadeOut}>
      <div className={styles.content}>
        {/* 2D Robot (shown initially) */}
        <div className={`${styles.robot2D} ${show3D ? styles.hidden : ""}`}>
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="50" y="50" width="100" height="100" rx="10" fill="#10b981" />
            <circle cx="70" cy="80" r="15" fill="white" />
            <circle cx="130" cy="80" r="15" fill="white" />
            <rect x="70" y="120" width="60" height="10" rx="5" fill="white" />
            <rect x="97.5" y="30" width="5" height="20" fill="#6366f1" />
            <circle cx="100" cy="25" r="5" fill="#ef4444" />
          </svg>
        </div>

        {/* 3D Robot (shown after delay) */}
        <div className={`${styles.robot3D} ${show3D ? styles.visible : ""}`}>
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <RobotHead />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
          </Canvas>
        </div>

        {/* Loading text */}
        <div className={styles.loadingText}>{loadingText}</div>

        {/* Sound toggle button */}
        <button className={styles.soundToggle} onClick={toggleMute}>
          {isMuted ? "🔇" : "🔊"}
        </button>
      </div>

      {/* Audio element */}
      <audio ref={audioRef} loop muted={isMuted}>
        <source src="/robot-sound.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </animated.div>
  )
}
