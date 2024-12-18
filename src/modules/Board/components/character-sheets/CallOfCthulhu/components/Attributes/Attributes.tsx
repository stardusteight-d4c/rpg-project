import { AttributesDisplay, AttributesEdit } from "./components"

interface AttributesProps {
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
  attributes: {
    strength: number
    dexterity: number
    intelligence: number
    power: number
    constitution: number
    appearance: number
    size: number
    education: number
  }
  isEditMode?: boolean
}

export const Attributes = ({
  activeItems,
  toggleItem,
  attributes,
  isEditMode,
}: AttributesProps) => {
  if (!isEditMode)
    return <AttributesDisplay {...{ activeItems, toggleItem, attributes }} />

  if (isEditMode) return <AttributesEdit {...{ activeItems, toggleItem, attributes }} />
}
