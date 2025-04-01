import { ModalWrapper } from "@/shared/components/ui"
import { useState } from "react"
import { MapCreate } from "./components/MapCreate"
import { MapEdit } from "./components/MapEdit"
import { MapsDisplay } from "./components/MapsDisplay"

export const MapConfigModal: React.FC<{
  status: boolean
  onStatusChange: (value: boolean) => void
}> = ({ status, onStatusChange }) => {
  const [selectedMap, setSelectedMap] = useState<IMap | null>(null)
  const [createMode, setCreateMode] = useState<boolean>(false)

  const mapsDisplayProps = {
    selectedMap: selectedMap!,
    onSelectedMap: setSelectedMap,
  }

  return (
    <ModalWrapper
      title="Map Config"
      status={status}
      onStatusChange={onStatusChange}
    >
      <div className="w-[700px]">
        {!selectedMap && createMode && (
          <MapCreate onCreateMode={setCreateMode} />
        )}
        {selectedMap && !createMode && <MapEdit {...mapsDisplayProps!} />}
        {!selectedMap && !createMode && (
          <MapsDisplay onCreateMode={setCreateMode} {...mapsDisplayProps} />
        )}
      </div>
    </ModalWrapper>
  )
}
