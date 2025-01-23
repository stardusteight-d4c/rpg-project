"use client"

import { useState } from "react"
import { MapEdit, Maps, MapsDisplay } from "./components"

export const Map: React.FC = () => {
  const [map, setMap] = useState<boolean>(false)
  const [selectedMap, setSelectedMap] = useState<boolean>(false)

  const mapsDisplayProps = {
    map,
    selectedMap,
    onSelectedMap: setSelectedMap,
    onSetMap: setMap,
  }

  if (selectedMap) return <MapEdit {...mapsDisplayProps} />

  if (!map && !selectedMap) return <MapsDisplay {...mapsDisplayProps} />

  if (map) return <Maps.Scenario />
}
