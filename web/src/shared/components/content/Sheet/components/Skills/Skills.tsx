import { SkillsDisplay, SkillsEdit } from "./components"

interface SkillsProps {
  activeItems: SheetItems[]
  toggleItem: (item: SheetItems) => void
  sheet: ISheet
  isEditMode?: boolean
}

export const Skills = ({ isEditMode, ...props }: SkillsProps) => {
  if (!isEditMode) return <SkillsDisplay {...props} />
  if (isEditMode) return <SkillsEdit {...props} />
}
