"use client"

import { useState } from "react"

import { ModalWrapper } from "@/shared/components/ui"
import { Display, Edit } from "./components"

export const SheetModal: React.FC<{
  sheet: ISheet
  status: boolean
  onStatusChange: (value: boolean) => void
  showOwnerInfo?: boolean
  showSelectActive?: boolean
}> = ({
  sheet,
  status,
  onStatusChange,
  showOwnerInfo,
  showSelectActive = false,
}) => {
  const [editSheet, setEditSheet] = useState<boolean>(false)

  if (!sheet) return null

  const handleOnStatusChange = (value: boolean) => {
    if (!value) {
      onStatusChange(false)
      setEditSheet(false)
    } else {
      onStatusChange(true)
    }
  }

  const getSheetComponent = () => {
    if (!editSheet)
      return (
        <Display
          sheet={sheet}
          onEdit={setEditSheet}
          showSelectActive={showSelectActive}
          showOwnerInfo={showOwnerInfo}
        />
      )
    return (
      <Edit
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
    <ModalWrapper title={title} status={status} onStatusChange={handleOnStatusChange}>
      {getSheetComponent()}
    </ModalWrapper>
  )
}
