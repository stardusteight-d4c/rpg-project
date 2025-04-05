import React, { Fragment } from "react"
import { Components } from "./components"

export const Sheet: React.FC<{
  sheet: ISheet
  actions: SheetActions
  isEdit?: boolean
  showOwnerInfo?: boolean
}> = ({ sheet, actions, isEdit, showOwnerInfo }) => {
  const props = {
    sheet,
    isEditMode: isEdit,
    ...actions,
  }

  return (
    <Fragment>
      <Components.ProfileInfo {...props} showOwnerInfo={showOwnerInfo} />
      <Components.Attributes {...props} />
      <Components.Skills {...props} />
      <Components.Combat {...props} />
      <Components.Inventory {...props} />
      <Components.Backstory {...props} />
    </Fragment>
  )
}
