import { InventoryDisplay } from "./components/InventoryDisplay"
import { InventoryEdit } from "./components/InventoryEdit"

export const Inventory: React.FC<{
  sheet: ISheet
  activeItems: SheetItems[]
  toggleItem: (item: SheetItems) => void
  isEditMode?: boolean
  onEdit?: React.Dispatch<React.SetStateAction<ISheet>>
}> = ({ sheet, activeItems, toggleItem, isEditMode, onEdit }) => {
  if (!isEditMode)
    return (
      <InventoryDisplay
        sheet={sheet}
        activeItems={activeItems}
        toggleItem={toggleItem}
      />
    )
  return (
    <InventoryEdit
      editableData={sheet}
      activeItems={activeItems}
      toggleItem={toggleItem}
      onEdit={onEdit!}
    />
  )
}
