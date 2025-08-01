"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface PageHeaderProps {
  title: string
  description: string
  buttonText?: string
  onButtonClick?: () => void
  children?: React.ReactNode
}

export function PageHeader({ title, description, buttonText, onButtonClick, children }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="flex gap-2">
        {buttonText && onButtonClick && (
          <Button onClick={onButtonClick} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="mr-2 h-4 w-4" />
            {buttonText}
          </Button>
        )}
        {children}
      </div>
    </div>
  )
}
