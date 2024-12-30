import { InventoryDisplay } from "./components/InventoryDisplay"
import { InventoryEdit } from "./components/InventoryEdit"

interface InventoryProps {
  inventory: Array<{
    id: string
    name: string 
    for?: Array<{
      id: string
      name: string
    }>
    visibility?: Array<{
      id: string
      name: string
    }>
    content?: {
      type: {
        name: string
        inputs: number
      }
      inputs: Array<string>
    }
  }>
  infos: {
    name: string
    sex: "male" | "female"
    characterUrl: string
    occupation: string
    hitPoints: number
    magicPoints: number
    sanity: number
    inspiration: boolean
  }
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
