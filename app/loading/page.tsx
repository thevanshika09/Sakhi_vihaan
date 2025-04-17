"use client"

import { useEffect } from "react"
import SakhiRobotLoader from "@/components/loading/SakhiRobotLoader"

export default function LoadingPage() {
  // Prevent scrolling while loading screen is active
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  return <SakhiRobotLoader />
}
