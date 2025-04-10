import React from "react"
import { useMaps } from "@/shared/contexts/Maps/MapsContext"
import { Components } from "./components"

export const Display: React.FC<{
  onSelectedMap: (value: IMap | undefined) => void
  onCreateMode: (value: boolean) => void
  createMode: boolean
  selectedMap: IMap | undefined
}> = ({ onSelectedMap, onCreateMode, createMode, selectedMap }) => {
  const { maps } = useMaps()

  if (createMode || !!selectedMap) return

  return (
    <Wrapper length={maps.size}>
      <Components.Nav onCreateMode={onCreateMode} />
      <Components.Maps
        maps={Array.from(maps.values())}
        onSelectedMap={onSelectedMap}
      />
    </Wrapper>
  )
}

const Wrapper: React.FC<{ children: React.ReactNode; length: number }> = ({
  children,
  length,
}) => {
  const elements = React.Children.toArray(children)
  return (
    <div>
      {elements[0]}
      <div
        data-is-not-view={length === 0}
        className="hidden data-[is-not-view='false']:block p-2 space-y-2"
      >
        {elements[1]}
      </div>
    </div>
  )
}
