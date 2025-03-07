import React, { Fragment } from "react"
import { Components } from "./components"

export const Sheet: React.FC<{
  data: ISheet
  actions: SheetActions
  isEdit?: boolean
}> = ({ data, actions, isEdit }) => {
  const props = {
    character: data,
    isEditMode: isEdit,
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
