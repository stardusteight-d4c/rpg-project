import { Fragment, useState } from "react"
import { DeleteContentModal } from "@/shared/components/content/modals"
import { Sheet } from "@/shared/components/content/Sheet"
import { useCharacters, useSheets, useToast } from "@/shared/contexts"
import { Button } from "@/shared/components/ui"
import { ArrowLeft, Check, Trash } from "@/shared/components/ui/icons"

export const EditSheet: React.FC<{
  sheet: ISheet
  onEdit: (value: boolean) => void
  onStatusChange: (value: boolean) => void
}> = ({ sheet, onEdit, onStatusChange }) => {
  const { addToast } = useToast()
  const { update, remove } = useSheets()
  const { updateCharacter, copyCharacters, removeCharacter } = useCharacters()
  const [activeItems, setActiveItems] = useState<SheetItems[]>([])
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

  function toggleItem(item: SheetItems) {
    setActiveItems((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item)
      } else {
        return [...prev, item]
      }
    })
  }

  async function onSave() {
    const updatedCharacter = copyCharacters.find(
      (character) => character.id === sheet.id
    )
    await update(updatedCharacter!)
      .then(() => {
        addToast("The sheet has been updated!", "success", 45)
      })
      .catch((error) => {
        addToast(error.message, "error", 45)
      })
      .finally(() => {
        updateCharacter(sheet.id, updatedCharacter!)
        onStatusChange(false)
      })
  }

  async function onDelete() {
    await remove(sheet.id)
      .then(() => {
        addToast("The sheet has been deleted!", "success", 45)
      })
      .catch((error) => {
        addToast(error.message, "error", 45)
      })
      .finally(() => {
        removeCharacter(sheet.id)
        onStatusChange(false)
      })
  }

  return (
    <Fragment>
      <DeleteContentModal
        status={openDeleteModal}
        onStatusChange={setOpenDeleteModal}
        text={`You are about to delete your character sheet (${sheet.infos.name}). This action cannot be undone!`}
        action={onDelete}
      />
      <div className="px-4 py-2 sticky flex items-center border-b border-border shadow-sm shadow-black/50 z-[200] top-0 w-full inset-x-0 bg-background">
        <div className="flex items-center gap-x-4">
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
        </div>
      </div>
      <div className="w-[700px] p-2">
        <Sheet
          actions={{ toggleItem, activeItems }}
          data={sheet}
          isEdit={true}
        />
      </div>
    </Fragment>
  )
}
