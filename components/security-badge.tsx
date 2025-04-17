import { CheckCircle, AlertTriangle, XCircle } from "lucide-react"

interface SecurityBadgeProps {
  status: "safe" | "warning" | "danger"
  className?: string
}

export default function SecurityBadge({ status, className }: SecurityBadgeProps) {
  const getBadgeContent = () => {
    switch (status) {
      case "safe":
        return {
          icon: <CheckCircle className="h-5 w-5" />,
          color: "text-emerald-500 bg-emerald-500/10",
        }
      case "warning":
        return {
          icon: <AlertTriangle className="h-5 w-5" />,
          color: "text-amber-500 bg-amber-500/10",
        }
      case "danger":
        return {
          icon: <XCircle className="h-5 w-5" />,
          color: "text-red-500 bg-red-500/10",
        }
      default:
        return {
          icon: <CheckCircle className="h-5 w-5" />,
          color: "text-emerald-500 bg-emerald-500/10",
        }
    }
  }

  const { icon, color } = getBadgeContent()

  return <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color} ${className}`}>{icon}</div>
}
