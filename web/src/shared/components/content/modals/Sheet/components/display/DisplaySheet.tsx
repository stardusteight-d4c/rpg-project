import React, { Fragment, useState } from "react"
import { useAuth, useSheets } from "@/shared/contexts"
import { Sheet } from "@/shared/components/content/Sheet"
import { PencilSimpleLine, UserCircleCheck } from "@/shared/components/ui/icons"
import { Button } from "@/shared/components/ui"
import { useParams } from "next/navigation"

export const DisplaySheet: React.FC<{
  sheet: ISheet
  onEdit: (value: boolean) => void
  showSelectActive: boolean
}> = ({ sheet, onEdit, showSelectActive }) => {
  const { toggleSheetInCampaign } = useSheets()
  const params = useParams()
  const tableId = params.id as string
  const { currentSession } = useAuth()
  const [activeSheet, setActiveSheet] = useState(sheet.tableId)
  const [activeItems, setActiveItems] = useState<SheetItems[]>([])

  const toggleItem = (item: SheetItems) => {
    setActiveItems((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item)
      } else {
        return [...prev, item]
      }
    })
  }

  const onToggleSheetInCampaign = async (sheetId: string, tableId: string) => {
    await toggleSheetInCampaign(sheetId, tableId)
    if (activeSheet === tableId) {
      setActiveSheet(undefined)
    } else {
      setActiveSheet(tableId)
    }
  }

  return (
    <Fragment>
      <div className="px-4 py-2 sticky z-[200] border-b border-border  shadow-sm shadow-black/50 top-0 w-full inset-x-0 bg-background">
        <div className="flex items-center gap-x-4">
          {sheet.owner?.id === currentSession?.id && (
            <Button
              action={() => onEdit(true)}
              title="Edit Sheet"
              bgColor="gradientBlue"
              variant="modal"
            >
              <PencilSimpleLine />
            </Button>
          )}
          {showSelectActive && (
            <Button
              action={() => onToggleSheetInCampaign(sheet.id, tableId)}
              title={activeSheet === tableId ? "Active Sheet" : "Use Sheet"}
              bgColor="green"
              variant="modal"
              active={activeSheet === tableId}
            >
              <UserCircleCheck />
            </Button>
          )}
        </div>
      </div>
      <div className="w-[700px] p-2">
        <Sheet
          actions={{ toggleItem, activeItems }}
          data={sheet}
          isEdit={false}
        />
      </div>
    </Fragment>
  )
}
