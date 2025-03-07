"use client"

import { useState } from "react"
import { ModalWrapper } from "@/shared/components/ui"
import { DisplaySheet, EditSheet } from "./components"

export const SheetModal: React.FC<{
  status: boolean
  onStatusChange: (value: boolean) => void
  sheet: ISheet
}> = ({ status, onStatusChange, sheet }) => {
  const [editSheet, setEditSheet] = useState<boolean>(false)

  if (!sheet) return null

  const handleSheetMode = () => {
    if (!editSheet) return <DisplaySheet sheet={sheet} onEdit={setEditSheet} />
    return (
      <EditSheet
        sheet={sheet}
        onEdit={setEditSheet}
        onStatusChange={onStatusChange}
      />
    )
  }

  const title = editSheet
    ? `Editing ${sheet.infos.name}'s Sheet`
    : `${sheet.infos.name}'s Sheet`

  return (
    <ModalWrapper title={title} status={status} onStatusChange={onStatusChange}>
      {handleSheetMode()}
    </ModalWrapper>
  )
}
