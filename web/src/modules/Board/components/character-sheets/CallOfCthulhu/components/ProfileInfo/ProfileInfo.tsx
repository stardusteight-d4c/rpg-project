"use client"

import { ProfileInfoDisplay, ProfileInfoEdit } from "./components"

interface ProfileInfoProps {
  infos: {
    type: "player",
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
  showPlayerInfo?: boolean
}

export const ProfileInfo = ({ isEditMode, ...props }: ProfileInfoProps) => {
  if (!isEditMode) return <ProfileInfoDisplay {...props} />
  if (isEditMode) return <ProfileInfoEdit {...props} />
}
