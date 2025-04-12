import { ProfileInfoDisplay, ProfileInfoEdit } from "./components"

export const ProfileInfo: React.FC<{
  sheet: ISheet
  isEditMode?: boolean
  onEdit?: React.Dispatch<React.SetStateAction<ISheet>>
  showOwnerInfo?: boolean
}> = ({ sheet, isEditMode, onEdit, showOwnerInfo }) => {
  if (!isEditMode)
    return <ProfileInfoDisplay sheet={sheet} showOwnerInfo={showOwnerInfo} />
  return <ProfileInfoEdit editableData={sheet} onEdit={onEdit!} />
}
