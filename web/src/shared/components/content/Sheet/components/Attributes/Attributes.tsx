import { AttributesDisplay, AttributesEdit } from "./components"

interface AttributesProps {
  activeItems: SheetItems[]
  toggleItem: (item: SheetItems) => void
  isEditMode?: boolean
  character: ISheet
}

export const Attributes = ({ isEditMode, ...props }: AttributesProps) => {
  if (!isEditMode) return <AttributesDisplay {...props} />
  if (isEditMode) return <AttributesEdit {...props} />
}
