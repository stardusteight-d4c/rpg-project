import React, { Fragment, useState } from "react"
import { Button } from "@/shared/components/ui"
import { ArrowLeft, Check, Image, Trash } from "@/shared/components/ui/icons"
import { DeleteContentModal } from "@/shared/components/content/modals/DeleteContent"
import { useMaps } from "@/shared/contexts"
import { clickElement } from "@/shared/utils"

export const Nav: React.FC<{
  editableData: IMap
  onSelectedMap: (value: IMap | undefined) => void
  onFileChange(e: React.ChangeEvent<HTMLInputElement>): void
}> = ({ onFileChange, onSelectedMap, editableData }) => {
  const { deleteMap, copyMaps, updateMap } = useMaps()
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const fileInputId = "file-input-357951"

  const onDelete = async () => {
    deleteMap(editableData.id)
    onSelectedMap(undefined)
  }

  const onUpdate = async () => {
    const updatedMap = copyMaps.find((map) => map.id === editableData.id)
    updateMap(editableData.id, updatedMap!)
    onSelectedMap(undefined)
  }

  return (
    <Fragment>
      <DeleteContentModal
        status={openDeleteModal}
        onStatusChange={setOpenDeleteModal}
        action={onDelete}
        text={`You are about to delete your "{selectedMap.name}". This action cannot be undone!`}
      />
      <input
        id={fileInputId}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />
      <div className="sticky flex items-center border-b border-border shadow-sm shadow-black/50 z-[200] top-0 p-2 w-full inset-x-0 bg-background">
        <div className="flex items-center gap-x-4">
          <Button
            action={() => onSelectedMap(undefined)}
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
            action={() => setOpenDeleteModal(true)}
            variant="modal"
            title="Delete"
            className="capitalize"
            bgColor="red"
          >
            <Trash />
          </Button>
          <Button
            action={onUpdate}
            variant="modal"
            title="Save Changes"
            className="capitalize"
            bgColor="green"
          >
            <Check />
          </Button>
        </div>
      </div>
    </Fragment>
  )
}
