"use client"

import { ProfileInfoDisplay, ProfileInfoEdit } from "./components"

export const ProfileInfo: React.FC<{
  sheet: ISheet
  isEditMode?: boolean
  showOwnerInfo?: boolean
}> = ({ isEditMode, ...props }) => {
  if (!isEditMode) return <ProfileInfoDisplay {...props} />
  if (isEditMode) return <ProfileInfoEdit {...props} />
}
