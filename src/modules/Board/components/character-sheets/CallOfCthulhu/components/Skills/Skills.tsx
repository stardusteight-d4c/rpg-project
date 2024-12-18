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
  skills: {
    name: string
    baseValue: number | string
    currentValue: number
    checked: boolean
  }[]
  isEditMode?: boolean
}

export const Skills = ({
  isEditMode,
  activeItems,
  toggleItem,
  skills,
}: SkillsProps) => {
  if (!isEditMode)
    return <SkillsDisplay {...{ activeItems, toggleItem, skills }} />

  if (isEditMode) return <SkillsEdit {...{ activeItems, toggleItem, skills }} />
}
