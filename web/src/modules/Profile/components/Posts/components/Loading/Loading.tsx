import { DataFetcher } from "@/shared/components/ui"
import React from "react"

export const Loading: React.FC<{
  isLoading: boolean
}> = ({ isLoading }) => {
  if (!isLoading) return

  return (
    <div className="flex mt-44 items-center justify-center w-full">
      <DataFetcher />
    </div>
  )
}
