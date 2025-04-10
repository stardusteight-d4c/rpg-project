import { useMaps } from "@/shared/contexts"
import { Exploration, Scenario } from "./components"

export const Display = () => {
  const { activeMap } = useMaps()

  console.log(activeMap)

  if (!activeMap) return

  if (activeMap.type === "scenario") return <Scenario map={activeMap} />
  if (activeMap.type === "exploration") return <Exploration map={activeMap} />
}
