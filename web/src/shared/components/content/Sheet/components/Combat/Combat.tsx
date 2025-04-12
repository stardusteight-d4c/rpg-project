import { CombatDisplay, CombatEdit } from "./components"

export const Combat: React.FC<{
  sheet: ISheet
  activeItems: SheetItems[]
  toggleItem: (item: SheetItems) => void
  isEditMode?: boolean
  onEdit?: React.Dispatch<React.SetStateAction<ISheet>>
}> = ({ sheet, activeItems, toggleItem, isEditMode, onEdit }) => {
  if (!isEditMode)
    return (
      <CombatDisplay
        sheet={sheet}
        activeItems={activeItems}
        toggleItem={toggleItem}
      />
    )
    return (
      <CombatEdit
        editableData={sheet}
        activeItems={activeItems}
        toggleItem={toggleItem}
        onEdit={onEdit!}
      />
    )
}
