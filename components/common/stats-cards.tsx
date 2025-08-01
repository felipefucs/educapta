import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatCard {
  title: string
  value: string | number
  description?: string
  icon?: LucideIcon
  iconColor?: string
}

interface StatsCardsProps {
  cards: StatCard[]
}

export function StatsCards({ cards }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => {
        const IconComponent = card.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              {IconComponent && <IconComponent className={`h-4 w-4 ${card.iconColor || "text-muted-foreground"}`} />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              {card.description && <p className="text-xs text-muted-foreground">{card.description}</p>}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
