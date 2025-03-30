"use client"

import { useAuth, useSheets } from "@/shared/contexts"
import { Components } from "./components"
import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export function TableModule() {
  const [active, setActive] = useState<MenuItem>("map")
  const { getActivePlayerSheet } = useSheets()
  const tableId = useParams().id as string
  const { currentSession } = useAuth()

  useEffect(() => {
    ;(async () => {
      if (tableId && currentSession) {
        await getActivePlayerSheet(currentSession.id, tableId)
      }
    })()
  }, [])

  return (
    <Wrapper>
      <Components.Actions />
      <Components.Menu active={active} onActive={setActive} />
      <Components.Main active={active} />
      <Components.Sheets />
    </Wrapper>
  )
}

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="max-h-screen relative no-scrollbar overflow-hidden">
      <div className="w-full flex">{children}</div>
    </main>
  )
}
