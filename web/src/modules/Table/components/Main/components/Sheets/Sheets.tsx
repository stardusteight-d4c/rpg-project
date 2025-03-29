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
  const [currentTab, setCurrentTab] = useState<"TableSheets" | "MySheets">(
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
        onTabChange={setCurrentTab}
        currentTab={currentTab}
      />

      {currentTab === "TableSheets" && "All Players and DM Active Sheets"}

      {currentTab === "MySheets" && (
        <Components.Display
          onSelectSheet={onSelectedSheet}
          sheetType={sheetType}
          sheets={sheets}
        />
      )}
    </section>
  )
}
