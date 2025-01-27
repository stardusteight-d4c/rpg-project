import { InventoryDisplay } from "./components/InventoryDisplay"
import { InventoryEdit } from "./components/InventoryEdit"

interface InventoryProps {
  inventory:  Array<InventoryItem>
  infos: Infos
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
  isEditMode?: boolean
}

export const Inventory = ({ isEditMode, ...props }: InventoryProps) => {
  if (!isEditMode) return <InventoryDisplay {...props} />
  if (isEditMode) return <InventoryEdit {...props} />
}
