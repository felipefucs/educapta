import { Badge } from "@/components/ui/badge"
import type { LucideIcon } from "lucide-react"

interface StatusConfig {
  label: string
  variant: "default" | "secondary" | "destructive" | "outline"
  icon?: LucideIcon
  color?: string
}

interface StatusBadgeProps {
  status: string
  config: Record<string, StatusConfig>
}

export function StatusBadge({ status, config }: StatusBadgeProps) {
  const statusInfo = config[status]
  if (!statusInfo) return null

  const IconComponent = statusInfo.icon

  return (
    <div className={`flex items-center gap-2 ${statusInfo.color || ""}`}>
      {IconComponent && <IconComponent className="h-4 w-4" />}
      <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
    </div>
  )
}
