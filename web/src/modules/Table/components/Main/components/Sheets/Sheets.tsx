"use client"

import { useState } from "react"
import { useAuth, useSheets } from "@/shared/contexts"
import { Components } from "./components"
import { useParams } from "next/navigation"

export const Sheets = () => {
  const { lastRequestProfileSheetsData, activeTableSheets } = useSheets()
  const { currentSession } = useAuth()
  const tableId = useParams().id as string
  const [sheetType, setSheetType] = useState<SheetType | "all">("all")
  const sheets =
    lastRequestProfileSheetsData.get(currentSession!.id)?.items ?? []

  const [currentTab, setCurrentTab] = useState<"TableSheets" | "MySheets">(
    "MySheets"
  )

  return (
    <section className="min-h-[100vh] max-h-[100vh] relative overflow-y-scroll no-scrollbar">
      <Components.Navbar
        sheetType={sheetType}
        onSelectSheetType={setSheetType}
        onTabChange={setCurrentTab}
        currentTab={currentTab}
      />
      <Components.Display
        sheetType={sheetType}
        sheets={activeTableSheets.get(tableId)?.sheets ?? []}
        tab="TableSheets"
        currentTab={currentTab}
      />
      <Components.Display
        sheetType={sheetType}
        sheets={sheets}
        tab="MySheets"
        currentTab={currentTab}
      />
    </section>
  )
}
