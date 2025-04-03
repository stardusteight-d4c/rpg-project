"use client"

import { ModalWrapper } from "@/shared/components/ui"
import React, { useState } from "react"
import { useMaps } from "@/shared/contexts"
import { Components } from "./components"

export const MapModal: React.FC<{
  status: boolean
  onStatusChange: (value: boolean) => void
}> = ({ status, onStatusChange }) => {
  const [selectedMap, setSelectedMap] = useState<IMap | undefined>(undefined)
  const [createMode, setCreateMode] = useState<boolean>(false)
  const { maps } = useMaps()

  const props = {
    createMode,
    selectedMap: selectedMap!,
    onCreateMode: setCreateMode,
    onSelectedMap: setSelectedMap,
  }

  return (
    <ModalWrapper
      title={`${createMode ? "Create Map" : "Maps"}`}
      status={status}
      onStatusChange={onStatusChange}
    >
      <Wrapper length={maps.length}>
        <Components.Display {...props} />
        <Components.Create {...props} />
        <Components.Edit {...props} />
        <Components.Empty {...props} />
      </Wrapper>
    </ModalWrapper>
  )
}

const Wrapper: React.FC<{ children: React.ReactNode; length: number }> = ({
  children,
  length,
}) => {
  const elements = React.Children.toArray(children)

  return <div className="w-[700px]">{elements.map((element) => element)}</div>
}
