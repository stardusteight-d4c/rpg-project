import { EmptyState } from "@/shared/components/ui"
import { Bell } from "@/shared/components/ui/icons"
import React from "react"

export const Empty: React.FC<{ length: number }> = ({ length }) => {
  if (length !== 0) return
  
  return (
    <EmptyState description="No notifications... just the impenetrable silence of emptiness.">
      <Bell />
    </EmptyState>
  )
}
