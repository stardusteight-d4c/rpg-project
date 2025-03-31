"use client"

import { SheetModal } from "@/shared/components/content/modals"
import { ProfileInfo } from "@/shared/components/content/Sheet/components/ProfileInfo"
import { EmptyState } from "@/shared/components/ui"
import { AddressBook } from "@/shared/components/ui/icons"
import { useState } from "react"

export const Display: React.FC<{
  sheets: Array<ISheet>
  sheetType: SheetType
  tab: "TableSheets" | "MySheets"
  currentTab: "TableSheets" | "MySheets"
}> = ({ sheets, sheetType, tab, currentTab }) => {
  const [selectedSheet, setSelectedSheet] = useState<ISheet | undefined>(
    undefined
  )
  const [openSheetModal, setOpenSheetModal] = useState<boolean>(false)

  const onSelectSheet = (sheet: ISheet) => {
    setSelectedSheet(sheet)
    setOpenSheetModal(true)
  }

  if (currentTab != tab) return

  return (
    <div className="p-2 space-y-2">
      <SheetModal
        status={openSheetModal}
        onStatusChange={setOpenSheetModal}
        sheet={selectedSheet!}
        showSelectActive={true}
      />
      {sheets.length === 0 && (
        <EmptyState description="Not even a sheet? Looks like someone is still waiting for the call of the adventure...">
          <AddressBook />
        </EmptyState>
      )}
      {sheets.map((sheet) => (
        <div>
          {(sheet.infos.type as SheetType) === sheetType && (
            <div
              onDoubleClick={() => onSelectSheet(sheet)}
              className="border border-border hover:bg-border hover:brightness-105 p-2 rounded-xl"
            >
              <ProfileInfo character={sheet} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
