"use client"

import { useRouter } from "next/navigation"
import { Home, Scan, Shield, Settings } from "lucide-react"

interface BottomNavigationProps {
  activePage?: "home" | "scan" | "security" | "settings"
}

export default function BottomNavigation({ activePage = "home" }: BottomNavigationProps) {
  const router = useRouter()

  const navigateTo = (path: string) => {
    router.push(path)
  }

  return (
    <div className="h-16 bg-slate-900 border-t border-slate-800 flex items-center justify-around">
      <button
        onClick={() => navigateTo("/")}
        className={`flex flex-col items-center justify-center w-1/4 h-full ${
          activePage === "home" ? "text-emerald-400" : "text-slate-400"
        }`}
      >
        <Home className="h-6 w-6" />
        <span className="text-xs mt-1">Home</span>
      </button>
      <button
        onClick={() => navigateTo("/scan")}
        className={`flex flex-col items-center justify-center w-1/4 h-full ${
          activePage === "scan" ? "text-emerald-400" : "text-slate-400"
        }`}
      >
        <Scan className="h-6 w-6" />
        <span className="text-xs mt-1">Scan</span>
      </button>
      <button
        onClick={() => navigateTo("/security")}
        className={`flex flex-col items-center justify-center w-1/4 h-full ${
          activePage === "security" ? "text-emerald-400" : "text-slate-400"
        }`}
      >
        <Shield className="h-6 w-6" />
        <span className="text-xs mt-1">Security</span>
      </button>
      <button
        onClick={() => navigateTo("/settings")}
        className={`flex flex-col items-center justify-center w-1/4 h-full ${
          activePage === "settings" ? "text-emerald-400" : "text-slate-400"
        }`}
      >
        <Settings className="h-6 w-6" />
        <span className="text-xs mt-1">Settings</span>
      </button>
    </div>
  )
}
