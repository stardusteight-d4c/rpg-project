import React, { Fragment, useState } from "react"
import { useAuth, useSheets, useToast } from "@/shared/contexts"
import { Sheet } from "@/shared/components/content/Sheet"
import {
  MapTrifold,
  PencilSimpleLine,
  UserCircleCheck,
} from "@/shared/components/ui/icons"
import { Button } from "@/shared/components/ui"
import { useParams } from "next/navigation"

export const DisplaySheet: React.FC<{
  sheet: ISheet
  onEdit: (value: boolean) => void
  showSelectActive: boolean
  showOwnerInfo?: boolean
}> = ({ sheet, onEdit, showSelectActive, showOwnerInfo }) => {
  const { toggleSheetInCampaign } = useSheets()
  const params = useParams()
  const tableId = params.id as string
  const { currentSession } = useAuth()
  const [activeSheet, setActiveSheet] = useState(sheet.tableId)
  const [activeItems, setActiveItems] = useState<SheetItems[]>([])
  const { addToast } = useToast()
  const sheetInTable = true

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
    await toggleSheetInCampaign(sheetId, tableId).then(() => {
      if (activeSheet === tableId) {
        setActiveSheet(undefined)
        addToast(
          `${sheet.infos.name} it is no longer your active sheet`,
          "info",
          45
        )
      } else {
        addToast(
          `${sheet.infos.name} now it's your active sheet`,
          "success",
          45
        )
        setActiveSheet(tableId)
      }
    })
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
            <Fragment>
              {sheet.infos.type !== "player" && (
                <Fragment>
                  {sheetInTable ? (
                    <Button
                      action={() => {}}
                      title="On The Table"
                      bgColor="green"
                      variant="modal"
                      active={true}
                    >
                      <MapTrifold />
                    </Button>
                  ) : (
                    <Button
                      action={() => {}}
                      title="Add Sheet To Table"
                      bgColor="blue"
                      variant="modal"
                      active={sheetInTable}
                    >
                      <MapTrifold />
                    </Button>
                  )}
                </Fragment>
              )}
              {sheetInTable && (
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
            </Fragment>
          )}
        </div>
      </div>
      <div className="w-[700px] p-2">
        <Sheet
          actions={{ toggleItem, activeItems }}
          sheet={sheet}
          isEdit={false}
          showOwnerInfo={showOwnerInfo}
        />
      </div>
    </Fragment>
  )
}
