"use client"

import { useState } from "react"
import { MapEdit, Maps, MapsDisplay } from "./components"
import { maps } from "./mock-data"

export const Map: React.FC = () => {
  const [selectedMap, setSelectedMap] = useState<IMap | null>(null)
  const [config, setConfig] = useState<boolean>(false)

  const activeMap = maps.filter((map) => map.active === true)[0]

  const mapsDisplayProps = {
    selectedMap: selectedMap!,
    onSelectedMap: setSelectedMap,
    onConfig: setConfig,
  }

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
