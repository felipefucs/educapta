import type React from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import type { ButtonProps } from "@/components/ui/button"

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean
  children: React.ReactNode
}

export function LoadingButton({ loading = false, children, disabled, ...props }: LoadingButtonProps) {
  return (
    <Button disabled={loading || disabled} {...props}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
}
