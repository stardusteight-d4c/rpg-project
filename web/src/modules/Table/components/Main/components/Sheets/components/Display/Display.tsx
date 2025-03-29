"use client"

import { ProfileInfo } from "@/shared/components/content/Sheet/components/ProfileInfo"

export const Display: React.FC<{
  sheets: Array<ISheet>
  sheetType: SheetType
  onSelectSheet: (value: ISheet) => void
}> = ({ sheets, sheetType, onSelectSheet }) => {

  return (
    <div className="p-2 space-y-2">
      {sheets.map((sheet) => (
        <div>
          {sheet.infos.type as SheetType === sheetType && (
            <div
              onDoubleClick={() => onSelectSheet(sheet)}
              className="border border-border hover:bg-border hover:brightness-105 p-2 rounded-xl"
            >
              <ProfileInfo character={sheet} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
