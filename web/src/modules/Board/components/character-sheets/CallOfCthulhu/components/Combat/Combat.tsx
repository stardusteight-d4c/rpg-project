"use client"

import { CombatDisplay, CombatEdit } from "./components"

interface CombatProps {
  combat: CombatItem[]
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

export const Combat = ({ isEditMode, ...props }: CombatProps) => {
  if (!isEditMode) return <CombatDisplay {...props} />
  if (isEditMode) return <CombatEdit {...props} />
}
