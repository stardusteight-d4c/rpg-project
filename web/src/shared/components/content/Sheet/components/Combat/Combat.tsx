"use client"

import { CombatDisplay, CombatEdit } from "./components"

interface CombatProps {
  character: ISheet
  activeItems: SheetItems[]
  toggleItem: (item: SheetItems) => void
  isEditMode?: boolean
}

export const Combat = ({ isEditMode, ...props }: CombatProps) => {
  if (!isEditMode) return <CombatDisplay {...props} />
  if (isEditMode) return <CombatEdit {...props} />
}
