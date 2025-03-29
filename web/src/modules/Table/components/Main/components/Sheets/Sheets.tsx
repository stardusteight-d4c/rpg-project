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
  const [selectedSheet, setSelectedSheet] = useState<ISheet | undefined>(
    undefined
  )
  const [openSheetModal, setOpenSheetModal] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<"TableSheets" | "MySheets">(
    "TableSheets"
  )

  const onSelectedSheet = (sheet: ISheet) => {
    setSelectedSheet(sheet)
    setOpenSheetModal(true)
  }

  return (
    <section>
      <Components.Navbar
        sheetType={sheetType}
        onSelectSheetType={setSheetType}
        selectedSheet={selectedSheet}
        onOpenSheetModal={setOpenSheetModal}
        openSheetModal={openSheetModal}
        onTabChange={setActiveTab}
      />
      <Components.Display
        onSelectSheet={onSelectedSheet}
        sheetType={sheetType}
        sheets={sheets}
      />
    </section>
  )
}
