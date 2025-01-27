"use client"

import { CombatDisplay, CombatEdit } from "./components"

interface CombatProps {
  combat: CombatItem[]
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

export const Combat = ({ isEditMode, ...props }: CombatProps) => {
  if (!isEditMode) return <CombatDisplay {...props} />
  if (isEditMode) return <CombatEdit {...props} />
}
