"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"

interface QRScannerProps {
  onScan: (data: string) => void
}

export default function QRScanner({ onScan }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // In a real app, this would use a QR code scanning library
  const startScanner = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
    }
  }

  useEffect(() => {
    // Cleanup function to stop the camera when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [])

  const handleManualScan = () => {
    // In a real app, this would trigger the QR code processing
    onScan("example-qr-data")
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-sm aspect-square mb-4 rounded-lg overflow-hidden border-2 border-emerald-500">
        <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline></video>
        <canvas ref={canvasRef} className="hidden"></canvas>

        {/* Scanner overlay */}
        <div className="absolute inset-0 border-[40px] border-slate-900/70">
          <div className="absolute inset-0 border border-emerald-400"></div>
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-emerald-400"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-emerald-400"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-emerald-400"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-emerald-400"></div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" className="bg-slate-800 border-slate-700 hover:bg-slate-700" onClick={startScanner}>
          <Camera className="h-4 w-4 mr-2" />
          Start Camera
        </Button>
        <Button onClick={handleManualScan}>Scan Now</Button>
      </div>
    </div>
  )
}
