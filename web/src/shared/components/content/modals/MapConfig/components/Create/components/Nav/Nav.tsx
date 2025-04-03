import { Button } from "@/shared/components/ui"
import { ArrowLeft, Check, Image } from "@/shared/components/ui/icons"
import React from "react"

export const Nav: React.FC<{
  onCreateMode: (value: boolean) => void
  onFileChange(e: React.ChangeEvent<HTMLInputElement>): void
  handleClick(): void
  onSave(): void
  editableData: IMap
}> = ({ handleClick, editableData, onFileChange, onCreateMode, onSave }) => {
  return (
    <div className="sticky border-b border-border  shadow-sm shadow-black/50 z-[999] top-0 p-2 w-full inset-x-0 bg-background">
      <input
        id="file-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />
      <div className="flex items-center gap-x-4">
        <Button
          action={() => onCreateMode(false)}
          variant="modal"
          title="Back"
          className="capitalize"
          bgColor="gradientBlue"
        >
          <ArrowLeft />
        </Button>
        <Button
          action={handleClick}
          variant="modal"
          title={`Upload ${editableData.type}`}
          className="capitalize"
          bgColor="blue"
        >
          <Image />
        </Button>
        <Button
          action={onSave}
          variant="modal"
          title={`Save ${editableData.type}`}
          className="capitalize"
          bgColor="green"
        >
          <Check />
        </Button>
      </div>
    </div>
  )
}
