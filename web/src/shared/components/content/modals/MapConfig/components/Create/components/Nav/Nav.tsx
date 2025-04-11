import { Button } from "@/shared/components/ui"
import { ArrowLeft, Check, Image } from "@/shared/components/ui/icons"
import { useMaps } from "@/shared/contexts"
import { clickElement } from "@/shared/utils"
import React, { useState } from "react"

export const Nav: React.FC<{
  onCreateMode: (value: boolean) => void
  onFileChange(e: React.ChangeEvent<HTMLInputElement>): void
  editableData: IMap
}> = ({ editableData, onFileChange, onCreateMode }) => {
  const { copyMaps, addMap } = useMaps()
  const fileInputId = "file-input-456753"

  const onSave = async () => {
    let updatedMap = copyMaps.find((map) => map.id === editableData.id)
    const isScenario = updatedMap?.type === "scenario"
    if (isScenario) {
      delete updatedMap.gridSize
      delete updatedMap.visibility
    }
    await addMap(updatedMap!)
    onCreateMode(false)
  }

  return (
    <div className="sticky border-b border-border  shadow-sm shadow-black/50 z-[999] top-0 p-2 w-full inset-x-0 bg-background">
      <input
        id={fileInputId}
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
          action={() => clickElement(fileInputId)}
          variant="modal"
          title="Upload Map"
          className="capitalize"
          bgColor="blue"
        >
          <Image />
        </Button>
        <Button
          action={onSave}
          variant="modal"
          title="Save New Map"
          className="capitalize"
          bgColor="green"
        >
          <Check />
        </Button>
      </div>
    </div>
  )
}
