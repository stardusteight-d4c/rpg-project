import { BackstoryDisplay } from "./components/BackstoryDisplay"
import { BackstoryEdit } from "./components/BackstoryEdit"

interface BackstoryProps {
  character: ISheet
  isEditMode?: boolean
  activeItems: SheetItems[]
  toggleItem: (item: SheetItems) => void
}

export const Backstory = ({ isEditMode, ...props }: BackstoryProps) => {
  if (!isEditMode) return <BackstoryDisplay {...props} />
  if (isEditMode) return <BackstoryEdit {...props} />
}
