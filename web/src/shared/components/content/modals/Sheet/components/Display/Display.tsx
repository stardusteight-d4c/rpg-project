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

export const Display: React.FC<{
  sheet: ISheet
  onEdit: (value: boolean) => void
  showSelectActive: boolean
  showOwnerInfo?: boolean
}> = ({ sheet, onEdit, showSelectActive, showOwnerInfo }) => {
  const { toggleActive, addToTable, removeFromTable } = useSheets()
  const params = useParams()
  const tableId = params.id as string
  const { currentSession } = useAuth()
  const { addToast } = useToast()
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

  const onAddToTable = async () => {
    await addToTable(sheet.id, tableId).then((res) => {
      sheet.tableId = tableId
      sheet.campaign = res.campaign
      addToast(`${sheet.infos.name} Added to Table`, "success", 45)
    })
  }

  const onRemoveFromTable = async () => {
    await removeFromTable(sheet.id, tableId).then((res) => {
      sheet.tableId = undefined
      sheet.campaign = res.campaign
      addToast(`${sheet.infos.name} Removed from Table`, "info", 45)
    })
  }

  const onToggleActiveSheetOnTable = async (value: boolean) => {
    await toggleActive(sheet.id, tableId).then(() => {
      if (value === false) {
        sheet.active = false
        addToast(
          `${sheet.infos.name} it is no longer your active sheet`,
          "info",
          45
        )
      } else {
        sheet.active = true
        addToast(
          `${sheet.infos.name} now it's your active sheet`,
          "success",
          45
        )
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
          {showSelectActive && sheet.owner?.id === currentSession?.id && (
            <Fragment>
              {Boolean(sheet.tableId) ? (
                <Fragment>
                  <Button
                    action={() => onRemoveFromTable()}
                    title="Take From Table"
                    bgColor="red"
                    variant="modal"
                  >
                    <MapTrifold />
                  </Button>
                  {sheet.active ? (
                    <Button
                      action={() => onToggleActiveSheetOnTable(false)}
                      title="Unuse Sheet"
                      bgColor="red"
                      variant="modal"
                    >
                      <UserCircleCheck />
                    </Button>
                  ) : (
                    <Button
                      action={() => onToggleActiveSheetOnTable(true)}
                      title="Use Sheet"
                      bgColor="green"
                      variant="modal"
                    >
                      <UserCircleCheck />
                    </Button>
                  )}
                </Fragment>
              ) : (
                <Button
                  action={() => onAddToTable()}
                  title="Add Sheet To Table"
                  bgColor="blue"
                  variant="modal"
                >
                  <MapTrifold />
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
