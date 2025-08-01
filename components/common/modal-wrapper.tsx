import type React from "react"

interface ModalWrapperProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function ModalWrapper({ isOpen, onClose, children }: ModalWrapperProps) {
  if (!isOpen) return null

  return <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">{children}</div>
}
