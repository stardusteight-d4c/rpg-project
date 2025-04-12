import { BackstoryDisplay } from "./components/BackstoryDisplay"
import { BackstoryEdit } from "./components/BackstoryEdit"

export const Backstory: React.FC<{
  sheet: ISheet
  activeItems: SheetItems[]
  toggleItem: (item: SheetItems) => void
  isEditMode?: boolean
  onEdit?: React.Dispatch<React.SetStateAction<ISheet>>
}> = ({ sheet, activeItems, toggleItem, isEditMode, onEdit }) => {
  if (!isEditMode)
    return (
      <BackstoryDisplay
        sheet={sheet}
        activeItems={activeItems}
        toggleItem={toggleItem}
      />
    )
  return (
    <BackstoryEdit
      editableData={sheet}
      activeItems={activeItems}
      toggleItem={toggleItem}
      onEdit={onEdit!}
    />
  )
}
