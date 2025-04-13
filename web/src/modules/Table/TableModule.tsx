"use client"

import { useParams } from "next/navigation"
import React, { Fragment, useEffect, useState } from "react"
import { useAuth, useCampaigns, useSheets } from "@/shared/contexts"
import { Components } from "./components"
import { DataFetcher } from "@/shared/components/ui"

export function TableModule() {
  const tableId = useParams().id as string
  const [active, setActive] = useState<MenuItem>("map")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { getActivePlayerSheet, listSheets } = useSheets()
  const { currentSession } = useAuth()
  const { getByTableId } = useCampaigns()

  if (!currentSession) return

  useEffect(() => {
    ;(async () => {
      if (tableId && currentSession) {
        await Promise.all([
          getByTableId(tableId, currentSession.id),
          getActivePlayerSheet(currentSession.id, tableId),
          listSheets({ tableId, visibility: true }),
        ]).then(() => {
          setIsLoading(false)
        })
      }
    })()
  }, [])

  return (
    <Wrapper>
      {isLoading ? (
        <div className="min-h-screen w-screen bg-background flex flex-col items-center justify-center text-center p-4">
          <div className="relative mt-[100px]">
            <DataFetcher />
          </div>
          <p className="text-sm">The stars are no longer aligned...</p>
          <p className="text-sm">but something is coming anyway.</p>
        </div>
      ) : (
        <Fragment>
          <Components.Rolls />
          <Components.Menu active={active} onActive={setActive} />
          <Components.Main active={active} />
          <Components.SheetsBar />
        </Fragment>
      )}
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
