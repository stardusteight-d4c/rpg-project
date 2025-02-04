"use client"

import { ProfileInfoDisplay, ProfileInfoEdit } from "./components"

interface ProfileInfoProps {
  character: ICharacter
  isEditMode?: boolean
  showPlayerInfo?: boolean
}

export const ProfileInfo = ({ isEditMode, ...props }: ProfileInfoProps) => {
  if (!isEditMode) return <ProfileInfoDisplay {...props} />
  if (isEditMode) return <ProfileInfoEdit {...props} />
}
