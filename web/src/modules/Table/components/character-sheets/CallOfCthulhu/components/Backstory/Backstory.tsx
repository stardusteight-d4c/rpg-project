import { BackstoryDisplay } from "./components/BackstoryDisplay"
import { BackstoryEdit } from "./components/BackstoryEdit"

interface BackstoryProps {
  character: ICharacter
  isEditMode?: boolean
  activeItems: (
    | "attributes"
    | "skills"
    | "inventory"
    | "combat"
    | "backstory"
    | null
  )[]
  toggleItem: (
    item: "attributes" | "skills" | "inventory" | "combat" | "backstory"
  ) => void
}

export const Backstory = ({ isEditMode, ...props }: BackstoryProps) => {
  if (!isEditMode) return <BackstoryDisplay {...props} />
  if (isEditMode) return <BackstoryEdit {...props} />
}
