"use client"

import { useState } from "react"
import { useAuth, useSheets } from "@/shared/contexts"
import { Components } from "./components"

export const Sheets = () => {
  const { lastRequestProfileSheetsData } = useSheets()
  const { currentSession } = useAuth()
  const [sheetType, setSheetType] = useState<SheetType>("player")
  const sheets =
    lastRequestProfileSheetsData.get(currentSession!.id)?.items ?? []

  const [currentTab, setCurrentTab] = useState<"TableSheets" | "MySheets">(
    "TableSheets"
  )

  return (
    <section>
      <Components.Navbar
        sheetType={sheetType}
        onSelectSheetType={setSheetType}
        onTabChange={setCurrentTab}
        currentTab={currentTab}
      />
      <Components.Display
        sheetType={sheetType}
        sheets={[]} 
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
