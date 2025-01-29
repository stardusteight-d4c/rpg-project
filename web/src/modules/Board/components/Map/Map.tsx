"use client"

import { useState } from "react"
import { MapEdit, Maps, MapsDisplay } from "./components"
import { useMaps } from "../../contexts/Maps/MapsContext"

export const Map: React.FC = () => {
  const { activeMap } = useMaps()
  const [selectedMap, setSelectedMap] = useState<IMap | null>(null)
  const [config, setConfig] = useState<boolean>(false)

  const mapsDisplayProps = {
    selectedMap: selectedMap!,
    onSelectedMap: setSelectedMap,
    onConfig: setConfig,
  }

  if (!activeMap) return null

  if (!config)
    return (
      <>
        {activeMap.type === "scenario" ? (
          <Maps.Scenario map={activeMap} onConfig={setConfig} />
        ) : (
          <Maps.Exploration map={activeMap} onConfig={setConfig} />
        )}
      </>
    )

  if (selectedMap && selectedMap && config)
    return <MapEdit {...mapsDisplayProps!} />

  if (!selectedMap && config) return <MapsDisplay {...mapsDisplayProps} />
}
