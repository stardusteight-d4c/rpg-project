"use client"

import { ProfileInfoDisplay, ProfileInfoEdit } from "./components"

interface ProfileInfoProps {
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
  player: {
    id: string
    name: string
    username: string
    avatarUrl: string
  }
  isEditMode?: boolean
}

export const ProfileInfo = ({
  infos,
  player,
  isEditMode,
}: ProfileInfoProps) => {
  if (!isEditMode) return <ProfileInfoDisplay infos={infos} player={player} />
  if (isEditMode) return <ProfileInfoEdit infos={infos} player={player} />
}
