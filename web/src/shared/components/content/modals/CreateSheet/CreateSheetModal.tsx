import { useEffect, useState } from "react"
import { Button, ModalWrapper } from "@/shared/components/ui"
import { Sheet } from "@/shared/components/content"
import { useToast, useAuth, useSheets, useCharacters } from "@/shared/contexts"
import { AutoGenerateSheet } from "./AutoGenerateSheet"
import { initialData as mockInitialData } from "./initialData"

export const CreateSheetModal: React.FC<{
  status: boolean
  onStatusChange: (value: boolean) => void
}> = ({ status, onStatusChange }) => {
  const { add } = useSheets()
  const { addToast } = useToast()
  const { currentSession } = useAuth()
  const { updateCopyCharacter, copyCharacters } = useCharacters()
  const [initialData, setInitialData] = useState<any>({
    ...mockInitialData,
    owner: currentSession,
    id: crypto.randomUUID(),
  })
  const [activeItems, setActiveItems] = useState<SheetItems[]>([])

  useEffect(() => {
    updateCopyCharacter(initialData.id, {
      ...initialData,
      owner: currentSession,
    })
  }, [])

  async function onCreate() {
    const findCharacter = copyCharacters.find(
      (character) => character.id === initialData.id
    )
    if (!findCharacter) return null
    await add(findCharacter)
      .then(() => {
        addToast("The sheet has been created!", "success", 45)
      })
      .catch((error) => {
        addToast(error.message, "error")
      })
      .finally(() => {
        onStatusChange(false)
      })
  }

  function autoGenerate() {
    const generator = new AutoGenerateSheet(copyCharacters)
    const generatedSheet = generator.autoGenerate(initialData)
    setInitialData(generatedSheet)
  }

  function toggleItem(item: SheetItems) {
    setActiveItems((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item)
      } else {
        return [...prev, item]
      }
    })
  }

  return (
    <ModalWrapper
      title="Create Sheet"
      status={status}
      onStatusChange={onStatusChange}
    >
      <div className="py-2 px-4 sticky z-[200] border-b border-border shadow-sm shadow-black/50 top-0 w-full inset-x-0 bg-background">
        <div className="flex items-center gap-x-4">
          <Button
            action={autoGenerate}
            title="Auto Generate"
            bgColor="gradientPurple"
            variant="modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#FFFFFF"
              viewBox="0 0 256 256"
            >
              <path d="M197.58,129.06,146,110l-19-51.62a15.92,15.92,0,0,0-29.88,0L78,110l-51.62,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0L146,178l51.62-19a15.92,15.92,0,0,0,0-29.88ZM137,164.22a8,8,0,0,0-4.74,4.74L112,223.85,91.78,169A8,8,0,0,0,87,164.22L32.15,144,87,123.78A8,8,0,0,0,91.78,119L112,64.15,132.22,119a8,8,0,0,0,4.74,4.74L191.85,144ZM144,40a8,8,0,0,1,8-8h16V16a8,8,0,0,1,16,0V32h16a8,8,0,0,1,0,16H184V64a8,8,0,0,1-16,0V48H152A8,8,0,0,1,144,40ZM248,88a8,8,0,0,1-8,8h-8v8a8,8,0,0,1-16,0V96h-8a8,8,0,0,1,0-16h8V72a8,8,0,0,1,16,0v8h8A8,8,0,0,1,248,88Z"></path>
            </svg>
          </Button>
          <Button
            action={onCreate}
            title="Save New Character"
            bgColor="green"
            variant="modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#FFFFFF"
              viewBox="0 0 256 256"
            >
              <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
            </svg>
          </Button>
        </div>
      </div>
      <div className="p-2 w-[700px]">
        <Sheet
          actions={{ activeItems, toggleItem }}
          data={initialData}
          isEdit
        />
      </div>
    </ModalWrapper>
  )
}
