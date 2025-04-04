"use client"

import { randomUUID } from "node:crypto"
import React, { useState } from "react"
import { useMaps } from "@/shared/contexts"
import { Components } from "./components"

export const Edit: React.FC<{
  selectedMap: IMap
  createMode: boolean
  onSelectedMap: (value: IMap | undefined) => void
  Form: React.FC<{
    editableData: IMap
    updateEditableData: (data: { key: keyof IMap; value: any }) => void
  }>
}> = ({ selectedMap, onSelectedMap, createMode, Form }) => {
  if (!selectedMap || createMode) return
  const { updateCopyMap } = useMaps()
  const [editableData, setEditableData] = useState<IMap>({
    ...selectedMap,
    gridSize: selectedMap.gridSize ?? [20, 20],
    visibility: selectedMap.visibility ?? "default",
    active: selectedMap.active ?? false,
  })
  const [file, setFile] = useState<File | null>(null)

  const updateEditableData = (data: { key: keyof IMap; value: any }) => {
    setEditableData((prev) => ({
      ...prev,
      [data.key]: data.value,
    }))
    updateCopyMap(editableData.id ?? randomUUID(), {
      ...editableData,
      [data.key]: data.value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const tempUrl = URL.createObjectURL(file)
      setFile(file)
      setEditableData((prevData) => ({
        ...prevData,
        imageUrl: tempUrl,
      }))
      updateCopyMap(editableData.id ?? randomUUID(), {
        ...editableData,
        imageUrl: tempUrl,
      })
    }
  }

  return (
    <div>
      <Components.Nav
        editableData={editableData}
        onFileChange={handleFileChange}
        onSelectedMap={onSelectedMap}
      />
      <Form
        editableData={editableData}
        updateEditableData={updateEditableData}
      />
    </div>
  )
}
