import { useMaps } from "@/shared/contexts"
import { Exploration, Scenario } from "./components"

export const Display: React.FC<{}> = ({}) => {
  const { activeMap } = useMaps()

  if (!activeMap) return

  if (activeMap.type === "scenario") return <Scenario map={activeMap} />
  if (activeMap.type === "exploration") return <Exploration map={activeMap} />
}
