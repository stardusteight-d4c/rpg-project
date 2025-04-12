import React, { Fragment, useState } from "react"

import { Sheet } from "@/shared/components/content"
import { Button, ModalWrapper } from "@/shared/components/ui"
import { Check, Sparkle } from "@/shared/components/ui/icons"
import { useToast, useAuth, useSheets } from "@/shared/contexts"

import { AutoGenerateSheetHandler } from "./AutoGenerateSheetHandler"
import { initialData } from "./initialData"

export const CreateSheetModal: React.FC<{
  status: boolean
  onStatusChange: (value: boolean) => void
}> = ({ status, onStatusChange }) => {
  const { add } = useSheets()
  const { addToast } = useToast()
  const { currentSession } = useAuth()

  const [activeItems, setActiveItems] = useState<SheetItems[]>([])
  const [editableData, setEditableData] = useState<ISheet>({
    ...initialData,
    owner: currentSession,
    id: crypto.randomUUID(),
  } as ISheet)

  async function onCreate() {
    return add(editableData)
      .then(() => {
        addToast("The sheet has been created!", "success", 45)
      })
      .catch((error) => {
        addToast(error.message, "error")
      })
      .finally(() => {
        onStatusChange(false)
        setEditableData({
          ...initialData,
          owner: currentSession,
          id: crypto.randomUUID(),
        } as ISheet)
      })
  }

  const autoGenerate = async () => {
    const generator = new AutoGenerateSheetHandler(editableData)
    const generatedSheet = generator.autoGenerate()
    setEditableData(generatedSheet)
  }

  const toggleItem = (item: SheetItems) => {
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
      <Wrapper>
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

        <Sheet
          actions={{ activeItems, toggleItem }}
          sheet={editableData}
          onEdit={setEditableData}
          isEdit
        />
      </Wrapper>
    </ModalWrapper>
  )
}

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const elements = React.Children.toArray(children)

  return (
    <Fragment>
      <div className="py-2 px-4 sticky z-[200] border-b border-border shadow-sm shadow-black/50 top-0 w-full inset-x-0 bg-background">
        <div className="flex items-center gap-x-4">
          {elements[0]}
          {elements[1]}
        </div>
      </div>
      <div className="p-2 w-[700px]">{elements[2]}</div>
    </Fragment>
  )
}
