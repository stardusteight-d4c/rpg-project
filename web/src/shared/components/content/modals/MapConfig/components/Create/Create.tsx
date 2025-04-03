import React, { useEffect, useState } from "react"
import { randomUUID } from "node:crypto"
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
    <Wrapper>
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
      <Components.Empty imageUrl={editableData.imageUrl} />
      <Components.Display editableData={editableData} />
    </Wrapper>
  )
}

export const Wrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const elements = React.Children.toArray(children)

  return (
    <div>
      {elements[0]}
      {elements[1]}
      <div className="p-2 pt-0">
        {elements[2]}
        {elements[3]}
      </div>
    </div>
  )
}
