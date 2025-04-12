import { AttributesDisplay, AttributesEdit } from "./components"

export const Attributes: React.FC<{
  sheet: ISheet
  activeItems: SheetItems[]
  toggleItem: (item: SheetItems) => void
  isEditMode?: boolean
  onEdit?: React.Dispatch<React.SetStateAction<ISheet>>
}> = ({ sheet, activeItems, toggleItem, isEditMode, onEdit }) => {
  if (!isEditMode)
    return (
      <AttributesDisplay
        sheet={sheet}
        activeItems={activeItems}
        toggleItem={toggleItem}
      />
    )
  return (
    <AttributesEdit
      editableData={sheet}
      activeItems={activeItems}
      toggleItem={toggleItem}
      onEdit={onEdit!}
    />
  )
}
