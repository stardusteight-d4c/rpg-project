import { SkillsDisplay, SkillsEdit } from "./components"

interface SkillsProps {
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
  character:  ISheet
  isEditMode?: boolean
}

export const Skills = ({ isEditMode, ...props }: SkillsProps) => {
  if (!isEditMode) return <SkillsDisplay {...props} />
  if (isEditMode) return <SkillsEdit {...props} />
}
