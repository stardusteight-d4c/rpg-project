import React, { Fragment, useState } from "react"

import { Sheet } from "@/shared/components/content/Sheet"
import { Button } from "@/shared/components/ui"
import { useSheets, useToast } from "@/shared/contexts"
import { DeleteContentModal } from "@/shared/components/content/modals"
import { ArrowLeft, Check, Trash } from "@/shared/components/ui/icons"

export const Edit: React.FC<{
  sheet: ISheet
  onEdit: (value: boolean) => void
  onStatusChange: (value: boolean) => void
}> = ({ sheet, onEdit, onStatusChange }) => {
  const { addToast } = useToast()
  const { update, remove } = useSheets()

  const [activeItems, setActiveItems] = useState<SheetItems[]>([])
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [editableData, setEditableData] = useState<ISheet>(sheet)

  const toggleItem = (item: SheetItems) => {
    setActiveItems((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item)
      } else {
        return [...prev, item]
      }
    })
  }

  const onSave = async () => {
    return update(editableData)
      .then(() => {
        addToast("The sheet has been updated!", "success", 45)
      })
      .catch((error) => {
        addToast(error.message, "error", 45)
      })
      .finally(() => {
        onStatusChange(false)
      })
  }

  const onDelete = async () => {
    return remove(editableData.id)
      .then(() => {
        addToast("The sheet has been deleted!", "success", 45)
      })
      .catch((error) => {
        addToast(error.message, "error", 45)
      })
      .finally(() => {
        onStatusChange(false)
      })
  }

  return (
    <Fragment>
      <DeleteContentModal
        status={openDeleteModal}
        onStatusChange={setOpenDeleteModal}
        text={`You are about to delete your character sheet (${editableData.infos.name}). This action cannot be undone!`}
        action={onDelete}
      />
      <Wrapper>
        <Button
          title="Back"
          action={() => onEdit(false)}
          bgColor="gradientBlue"
          variant="modal"
        >
          <ArrowLeft />
        </Button>
        <Button
          title="Delete Sheet"
          action={() => setOpenDeleteModal(true)}
          bgColor="red"
          variant="modal"
        >
          <Trash />
        </Button>
        <Button
          title="Save Changes"
          action={onSave}
          bgColor="green"
          variant="modal"
        >
          <Check />
        </Button>
        <Sheet
          actions={{ toggleItem, activeItems }}
          isEdit={true}
          sheet={editableData}
          onEdit={setEditableData}
        />
      </Wrapper>
    </Fragment>
  )
}

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const elements = React.Children.toArray(children)

  return (
    <Fragment>
      <div className="px-4 py-2 sticky flex items-center border-b border-border shadow-sm shadow-black/50 z-[200] top-0 w-full inset-x-0 bg-background">
        <div className="flex items-center gap-x-4">
          {elements[0]}
          {elements[1]}
          {elements[2]}
        </div>
      </div>
      <div className="w-[700px] p-2">{elements[3]}</div>
    </Fragment>
  )
}
