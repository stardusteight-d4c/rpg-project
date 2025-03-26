import { GlowingWrapper } from "@/shared/components/ui"
import React from "react"

export const Input: React.FC<{
  searchType: "campaign" | "user"
  searchTerm: string
  onSearch: (value: string) => void
}> = ({ searchType, searchTerm, onSearch }) => {
  return (
    <GlowingWrapper inset="0" border="rounded-md">
      <input
        id="name"
        name="name"
        placeholder={
          searchType === "campaign" ? "Enter a name" : "Enter a username"
        }
        spellCheck="false"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="py-1 mb-2 px-2 w-full cursor-text hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-md bg-ashes border border-border outline-none"
      />
    </GlowingWrapper>
  )
}
