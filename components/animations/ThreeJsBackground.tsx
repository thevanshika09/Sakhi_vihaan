"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useSpring, animated } from "@react-spring/three"
import styles from "@/styles/animations/ThreeJsBackground.module.css"

function FloatingParticle({ position, color, speed = 1, size = 0.2 }) {
  const mesh = useRef(null)
  const [spring, api] = useSpring(() => ({
    position: position,
    config: { mass: 1, tension: 20, friction: 15 },
  }))

  useEffect(() => {
    // Random movement
    const interval = setInterval(() => {
      api.start({
        position: [position[0] + (Math.random() - 0.5) * 0.5, position[1] + (Math.random() - 0.5) * 0.5, position[2]],
      })
    }, 2000 / speed)

    return () => clearInterval(interval)
  }, [position, api, speed])

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01 * speed
      mesh.current.rotation.y += 0.01 * speed
    }
  })

  return (
    <animated.mesh ref={mesh} position={spring.position}>
      <dodecahedronGeometry args={[size, 0]} />
      <meshStandardMaterial color={color} wireframe />
    </animated.mesh>
  )
}

function Particles({ count = 15 }) {
  const colors = ["#10b981", "#6366f1", "#f59e0b", "#ef4444"]

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <FloatingParticle
          key={i}
          position={[(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5, (Math.random() - 5) * 2]}
          color={colors[Math.floor(Math.random() * colors.length)]}
          speed={Math.random() * 2 + 0.5}
          size={Math.random() * 0.2 + 0.1}
        />
      ))}
    </>
  )
}

export default function ThreeJsBackground() {
  return (
    <div className={styles.backgroundContainer}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} />
        <Particles />
      </Canvas>
    </div>
  )
}
