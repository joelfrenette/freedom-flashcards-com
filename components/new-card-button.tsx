"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

interface NewCardButtonProps {
  onClick: () => void
  className?: string
}

export function NewCardButton({ onClick, className = "" }: NewCardButtonProps) {
  return (
    <Button
      variant="default"
      size="lg"
      className={`bg-blue-600 hover:bg-blue-700 text-white font-medium ${className}`}
      onClick={onClick}
    >
      <RefreshCw className="h-5 w-5 mr-2" /> New Card
    </Button>
  )
}
