import { Fragment, useState } from "react"
import { DeleteContentModal } from "../../../DeleteContent"
import { Sheet } from "@/shared/components/content/Sheet"
import { useCharacters, useSheets, useToast } from "@/shared/contexts"

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

  function onSave() {
    const updatedCharacter = copyCharacters.find(
      (character) => character.id === sheet.id
    )
    update(updatedCharacter!)
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

  function onDelete() {
    remove(sheet.id)
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
        isLoading={false}
      />
      <div className="px-4 py-2 sticky flex items-center border-b border-border shadow-sm shadow-black/50 z-[200] top-0 w-full inset-x-0 bg-background">
        <div className="flex items-center gap-x-4">
          <div
            onClick={() => onEdit(false)}
            className="cursor-pointer w-fit flex items-center group gap-x-2"
          >
            <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full shadow-p group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
              </svg>
            </button>
            <span>Back</span>
          </div>
          <div
            onClick={() => setOpenDeleteModal(true)}
            className="cursor-pointer w-fit flex items-center group gap-x-2"
          >
            <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full shadow-p group-hover:bg-red-500 duration-300 ease-in-out transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
              </svg>
            </button>
            <span className="capitalize">Delete Character</span>
          </div>
          <div
            onClick={onSave}
            className="cursor-pointer w-fit flex items-center group gap-x-2"
          >
            <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full shadow-p group-hover:bg-green-500 duration-300 ease-in-out transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
              </svg>
            </button>
            <span>Save Changes</span>
          </div>
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
