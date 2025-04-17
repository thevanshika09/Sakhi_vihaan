"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Scan, Shield } from "lucide-react"

export default function FloatingActionButton() {
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false)

  const handleScanClick = () => {
    router.push("/scan")
  }

  return (
    <div className="fixed bottom-20 right-4 flex flex-col-reverse items-center gap-2">
      {isExpanded && (
        <div className="flex flex-col gap-2 mb-2 animate-fade-in">
          <Button
            size="icon"
            className="h-12 w-12 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-lg"
            onClick={handleScanClick}
          >
            <Scan className="h-6 w-6" />
          </Button>
        </div>
      )}

      <Button
        size="icon"
        className="h-14 w-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Shield className="h-7 w-7" />
      </Button>
    </div>
  )
}
