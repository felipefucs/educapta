"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { removeAuthToken } from "@/lib/auth"

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    removeAuthToken()
    router.push("/login")
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full justify-start">
      <LogOut className="mr-2 h-4 w-4" />
      Sair
    </Button>
  )
}
