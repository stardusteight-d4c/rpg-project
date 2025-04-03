import { useEffect, useState } from "react"
import { randomUUID } from "node:crypto"
import { EmptyState } from "@/shared/components/ui"
import { Image } from "@/shared/components/ui/icons"
import { useMaps } from "@/shared/contexts"
import { Components } from "./components"

export const Create: React.FC<{
  createMode: boolean
  onCreateMode: (value: boolean) => void
}> = ({ createMode, onCreateMode }) => {
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

  console.log(editableData)

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
    onCreateMode(false)
  }

  function handleClick() {
    const fileInput = document.getElementById("file-input") as HTMLInputElement
    if (fileInput) {
      fileInput.click()
    }
  }

  if (!createMode) return

  return (
    <div>
      <Components.Nav
        editableData={editableData}
        handleClick={handleClick}
        onFileChange={handleFileChange}
        onCreateMode={onCreateMode}
        onSave={onSave}
      />
      <Components.Form
        editableData={editableData}
        updateEditableData={updateEditableData}
      />

      <div className="p-2 pt-0">
        <Components.Empty imageUrl={editableData.imageUrl} />
        {editableData.imageUrl && (
          <div className="">
            {editableData.type === "exploration" ? (
              <div className="relative rounded-md overflow-hidden w-full">
                <div
                  className="w-full min-h-[100vh] grid "
                  style={{
                    gridTemplateColumns: `repeat(${
                      editableData.gridSize![0]
                    }, 1fr)`,
                    gridTemplateRows: `repeat(${
                      editableData.gridSize![1]
                    }, 1fr)`,
                    transformOrigin: "top left",
                    overflow: "hidden",
                  }}
                >
                  <div className="px-2 border border-border bg-background w-fit z-[300] shadow-sm shadow-black/50 rounded-full font-medium text-xl absolute bottom-4 right-4">
                    <span className="background-gradient bg-clip-text text-transparent whitespace-nowrap select-none cursor-default pointer-events-none">
                      {editableData.name}
                    </span>
                  </div>

                  <img
                    src={editableData.imageUrl}
                    alt=""
                    className="absolute z-0 w-full h-full object-fill select-none pointer-events-none"
                  />
                  {Array.from({ length: editableData.gridSize![0] }).map(
                    (_, rowIndex) =>
                      Array.from({ length: editableData.gridSize![1] }).map(
                        (_, colIndex) => (
                          <div
                            key={`${rowIndex}-${colIndex}`}
                            className="relative w-full border-[0.1px] border-l-0 border-t-0 border-background z-50 aspect-square overflow-hidden h-fit mx-auto"
                          ></div>
                        )
                      )
                  )}
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="px-2 border border-border bg-background w-fit z-[300] shadow-sm shadow-black/50 rounded-full font-medium text-xl absolute bottom-4 right-4">
                  <span className="background-gradient bg-clip-text text-transparent whitespace-nowrap select-none cursor-default pointer-events-none">
                    {editableData.name}
                  </span>
                </div>

                <img
                  src={editableData.imageUrl}
                  alt=""
                  className="aspect-map rounded-md h-[300px] z-0 w-full object-cover select-none pointer-events-none"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
