import { Button, EmptyState, ModalWrapper } from "@/shared/components/ui"
import { Fragment, useEffect, useState } from "react"
import { MapCreate } from "./components/MapCreate"
import { MapEdit } from "./components/MapEdit"
import { MapsDisplay } from "./components/MapsDisplay"
import { useMaps } from "@/shared/contexts"
import {
  ArrowLeft,
  CompassRose,
  PlusCircle,
} from "@/shared/components/ui/icons"
import { randomUUID } from "node:crypto"

export const MapModal: React.FC<{
  status: boolean
  onStatusChange: (value: boolean) => void
}> = ({ status, onStatusChange }) => {
  const [selectedMap, setSelectedMap] = useState<IMap | null>(null)
  const [createMode, setCreateMode] = useState<boolean>(false)
  const { maps } = useMaps()
  const { updateCopyMap, copyMaps, addMap } = useMaps()
  const [editableData, setEditableData] = useState<IMap>({
    id: crypto.randomUUID(),
    active: false,
    imageUrl: "",
    name: "",
    type: "scenario",
    gridSize: [20, 20],
    visibility: "default",
  })
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    updateCopyMap(editableData.id, editableData)
  }, [editableData])

  function updateEditableData(data: { key: keyof IMap; value: any }) {
    setEditableData((prev) => ({
      ...prev,
      gridSize: editableData.gridSize ?? [20, 20],
      [data.key]: data.value,
    }))
    updateCopyMap(editableData.id ?? randomUUID(), {
      ...editableData,
      gridSize: editableData.gridSize ?? [20, 20],
      [data.key]: data.value,
    })
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      const tempUrl = URL.createObjectURL(file)
      console.log(editableData)

      setFile(file)
      setEditableData((prevData) => ({
        ...prevData,
        gridSize: prevData.gridSize ?? [20, 20],
        imageUrl: tempUrl,
      }))
      updateCopyMap(editableData.id ?? randomUUID(), {
        ...editableData,
        gridSize: editableData.gridSize ?? [20, 20],
        imageUrl: tempUrl,
      })
    }
  }

  function onSave() {
    const updatedMap = copyMaps.find((map) => map.id === editableData.id)
    addMap(updatedMap!)
    setCreateMode(false)
  }

  function handleClick() {
    const fileInput = document.getElementById("file-input") as HTMLInputElement
    if (fileInput) {
      fileInput.click()
    }
  }

  const mapsDisplayProps = {
    selectedMap: selectedMap!,
    onSelectedMap: setSelectedMap,
  }

  return (
    <ModalWrapper
      title={`${createMode ? "Create Map" : "Maps"}`}
      status={status}
      onStatusChange={onStatusChange}
    >
      <div className="sticky border-b border-border  shadow-sm shadow-black/50 z-[999] top-0 p-2 w-full inset-x-0 bg-background">
        <div className="flex items-center gap-x-4">
          {createMode && (
            <Button
              action={() => setCreateMode(false)}
              variant="modal"
              title="Back"
              bgColor="gradientBlue"
            >
              <ArrowLeft />
            </Button>
          )}
          {!createMode && (
            <Button
              action={() => setCreateMode(true)}
              variant="modal"
              title="Create Map"
              bgColor="gradientBlue"
            >
              <PlusCircle />
            </Button>
          )}
          {createMode && (
            <Fragment>
              <div
                onClick={handleClick}
                className="flex cursor-pointer items-center group w-fit gap-x-2"
              >
                <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full  shadow-md shadow-black/50 group-hover:bg-blue-500 duration-300 ease-in-out transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#FFFFFF"
                    viewBox="0 0 256 256"
                  >
                    <path d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0ZM93.66,77.66,120,51.31V144a8,8,0,0,0,16,0V51.31l26.34,26.35a8,8,0,0,0,11.32-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40A8,8,0,0,0,93.66,77.66Z"></path>
                  </svg>
                </button>
                <span className="capitalize">Upload {editableData.type}</span>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
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
                <span className="capitalize">Save New {editableData.type}</span>
              </div>
            </Fragment>
          )}
        </div>
      </div>
      <div className="w-[700px] p-2">
        {maps.length === 0 && !createMode && (
          <EmptyState description="The boundaries of reality have not been defined. What lurks beyond the darkness remains a mystery.">
            <CompassRose />
          </EmptyState>
        )}
        {!selectedMap && createMode && (
          <MapCreate
            updateEditableData={updateEditableData}
            editableData={editableData}
          />
        )}
        {maps.length !== 0 && (
          <Fragment>
            {selectedMap && !createMode && <MapEdit {...mapsDisplayProps!} />}
            {!selectedMap && !createMode && (
              <MapsDisplay onCreateMode={setCreateMode} {...mapsDisplayProps} />
            )}
          </Fragment>
        )}
      </div>
    </ModalWrapper>
  )
}
