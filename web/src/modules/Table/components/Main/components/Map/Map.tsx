import { Components } from "./components"
import { useMaps } from "@/shared/contexts"

export const Map = () => {
  const { activeMap } = useMaps()

  const getMapComponent = () => {
    if (!activeMap) return <Components.Empty isActiveMap={false} />
    switch (activeMap.type) {
      case "scenario":
        return <Components.Scenario map={activeMap} />
      case "exploration":
        return <Components.Exploration map={activeMap} />
    }
  }

  return (
    <div className="w-full h-full relative">
      <Components.Config />
      {getMapComponent()}
    </div>
  )
}
