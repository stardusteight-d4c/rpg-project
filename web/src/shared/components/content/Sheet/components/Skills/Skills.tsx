import { SkillsDisplay, SkillsEdit } from "./components"

export const Skills: React.FC<{
  sheet: ISheet
  activeItems: SheetItems[]
  toggleItem: (item: SheetItems) => void
  isEditMode?: boolean
  onEdit?: React.Dispatch<React.SetStateAction<ISheet>>
}> = ({ sheet, activeItems, toggleItem, isEditMode, onEdit }) => {
  if (!isEditMode)
    return (
      <SkillsDisplay
        sheet={sheet}
        activeItems={activeItems}
        toggleItem={toggleItem}
      />
    )
  return (
    <SkillsEdit
      editableData={sheet}
      activeItems={activeItems}
      toggleItem={toggleItem}
      onEdit={onEdit!}
    />
  )
}
