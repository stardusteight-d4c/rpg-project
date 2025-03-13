import { useEffect, useState } from "react"
import { Button, ModalWrapper } from "@/shared/components/ui"
import { Sheet } from "@/shared/components/content"
import { useToast, useAuth, useSheets, useCharacters } from "@/shared/contexts"
import { AutoGenerateSheetHandler } from "./AutoGenerateSheetHandler"
import { initialData as mockInitialData } from "./initialData"
import { Check, Sparkle } from "@/shared/components/ui/icons"

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
    const generator = new AutoGenerateSheetHandler(copyCharacters)
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
            <Sparkle />
          </Button>
          <Button
            action={onCreate}
            title="Save New Character"
            bgColor="green"
            variant="modal"
          >
            <Check />
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
