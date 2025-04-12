import { Fragment } from "react"

import { Components } from "./components"

export const Sheet: React.FC<{
  sheet: ISheet
  actions: SheetActions
  isEdit?: boolean
  onEdit?: React.Dispatch<React.SetStateAction<ISheet>>
  showOwnerInfo?: boolean
}> = ({ sheet, actions, isEdit, onEdit, showOwnerInfo }) => {
  const props = {
    sheet,
    isEditMode: isEdit,
    onEdit,
    showOwnerInfo,
    ...actions,
  }

  return (
    <Fragment>
      <Components.ProfileInfo {...props} />
      <Components.Attributes {...props} />
      <Components.Skills {...props} />
      <Components.Combat {...props} />
      <Components.Inventory {...props} />
      <Components.Backstory {...props} />
    </Fragment>
  )
}
