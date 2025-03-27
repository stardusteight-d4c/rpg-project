import { EmptyState, Loader } from "@/shared/components/ui"
import { UsersThree } from "@/shared/components/ui/icons"
import React from "react"

export const Empty: React.FC<{ length: number; isLoading: boolean }> = ({
  length,
  isLoading,
}) => {
  if (length !== 0) return null

  return (
    <EmptyState description="The void responds with silence... but one day, the first adept will hear its call.">
      {isLoading ? <Loader /> : <UsersThree />}
    </EmptyState>
  )
}
