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
  attributes: Attributes
  isEditMode?: boolean
}

export const Attributes = ({ isEditMode, ...props }: AttributesProps) => {
  if (!isEditMode) return <AttributesDisplay {...props} />
  if (isEditMode) return <AttributesEdit {...props} />
}
