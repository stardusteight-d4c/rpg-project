"use client"

import { useState } from "react"
import { ModalWrapper } from "@/shared/components"
import { CombatDisplay } from "./components"

interface CombatProps {
  combat: Array<IWeapon | IGun | IExplosive>
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
}
