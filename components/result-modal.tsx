"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CheckCircle, AlertTriangle, XCircle, Share2 } from "lucide-react"

interface ResultModalProps {
  isOpen: boolean
  onClose: () => void
  scanType: "qr" | "upi" | "link" | "message"
  result: "safe" | "warning" | "danger"
}

export default function ResultModal({ isOpen, onClose, scanType, result }: ResultModalProps) {
  const getResultDetails = () => {
    switch (result) {
      case "safe":
        return {
          icon: <CheckCircle className="h-16 w-16 text-emerald-500 mb-4" />,
          title: "Safe to Proceed",
          description: "Our AI assistant has verified this and found it to be safe.",
          color: "bg-emerald-500",
          textColor: "text-emerald-500",
          borderColor: "border-emerald-500",
          actionButton: "Proceed Safely",
        }
      case "warning":
        return {
          icon: <AlertTriangle className="h-16 w-16 text-amber-500 mb-4" />,
          title: "Proceed with Caution",
          description: "This might be suspicious. We recommend additional verification.",
          color: "bg-amber-500",
          textColor: "text-amber-500",
          borderColor: "border-amber-500",
          actionButton: "Verify Again",
        }
      case "danger":
        return {
          icon: <XCircle className="h-16 w-16 text-red-500 mb-4" />,
          title: "Potential Fraud Detected",
          description: "This appears to be fraudulent. We recommend not proceeding.",
          color: "bg-red-500",
          textColor: "text-red-500",
          borderColor: "border-red-500",
          actionButton: "Report Fraud",
        }
      default:
        return {
          icon: <CheckCircle className="h-16 w-16 text-emerald-500 mb-4" />,
          title: "Safe to Proceed",
          description: "Our AI assistant has verified this and found it to be safe.",
          color: "bg-emerald-500",
          textColor: "text-emerald-500",
          borderColor: "border-emerald-500",
          actionButton: "Proceed Safely",
        }
    }
  }

  const details = getResultDetails()

  const getScanTypeText = () => {
    switch (scanType) {
      case "qr":
        return "QR Code"
      case "upi":
        return "UPI ID"
      case "link":
        return "Link"
      case "message":
        return "Message"
      default:
        return "Item"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-md">
        <DialogHeader className="flex flex-col items-center text-center">
          {details.icon}
          <DialogTitle className={`text-2xl font-bold ${details.textColor}`}>{details.title}</DialogTitle>
          <DialogDescription className="text-slate-300">{details.description}</DialogDescription>
        </DialogHeader>

        <div className={`p-4 rounded-lg border ${details.borderColor} bg-opacity-10 ${details.color} bg-opacity-10`}>
          <h4 className="font-medium mb-2">Scan Details:</h4>
          <p className="text-sm text-slate-300">Type: {getScanTypeText()}</p>
          <p className="text-sm text-slate-300">Date: {new Date().toLocaleString()}</p>
          <p className="text-sm text-slate-300">
            AI Confidence: {result === "safe" ? "High (98%)" : result === "warning" ? "Medium (65%)" : "High (95%)"}
          </p>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            className="flex-1 border-slate-700 bg-slate-800 hover:bg-slate-700"
            onClick={onClose}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share Result
          </Button>
          <Button
            className={`flex-1 ${
              result === "safe"
                ? "bg-emerald-600 hover:bg-emerald-700"
                : result === "warning"
                  ? "bg-amber-600 hover:bg-amber-700"
                  : "bg-red-600 hover:bg-red-700"
            }`}
            onClick={onClose}
          >
            {details.actionButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
