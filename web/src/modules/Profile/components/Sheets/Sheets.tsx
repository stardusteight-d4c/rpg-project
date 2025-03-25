"use client"

import React, { useEffect } from "react"
import { useSheets } from "@/shared/contexts"
import { Components } from "./components"

export const Sheets: React.FC<{ user: IUser }> = ({ user }) => {
  const { userSheets, getUserSheets } = useSheets()

  useEffect(() => {
    ;(async () => {
      await getUserSheets(user.id)
    })()
  }, [user.id])

  return (
    <div>
      <Components.Heading />
      <Components.Empty sheetsLength={userSheets.size} />
      <Components.Slider sheets={Array.from(userSheets.values())} />
    </div>
  )
}
