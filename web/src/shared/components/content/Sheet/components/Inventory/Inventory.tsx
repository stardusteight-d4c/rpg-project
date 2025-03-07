import { InventoryDisplay } from "./components/InventoryDisplay"
import { InventoryEdit } from "./components/InventoryEdit"

interface InventoryProps {
  character: ISheet
  activeItems: SheetItems[]
  toggleItem: (item: SheetItems) => void
  isEditMode?: boolean
}

export const Inventory = ({ isEditMode, ...props }: InventoryProps) => {
  if (!isEditMode) return <InventoryDisplay {...props} />
  if (isEditMode) return <InventoryEdit {...props} />
}
