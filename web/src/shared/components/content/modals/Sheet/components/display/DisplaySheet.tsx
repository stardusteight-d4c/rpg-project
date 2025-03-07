import React, { Fragment, useState } from "react"
import { useAuth } from "@/shared/contexts"
import { Sheet } from "@/shared/components/content/Sheet"

export const DisplaySheet: React.FC<{
  sheet: ISheet
  onEdit: (value: boolean) => void
}> = ({ sheet, onEdit }) => {
  const { currentSession } = useAuth()
  const [activeItems, setActiveItems] = useState<SheetItems[]>([])

  const toggleItem = (item: SheetItems) => {
    setActiveItems((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item)
      } else {
        return [...prev, item]
      }
    })
  }

  return (
    <Fragment>
      <div className="px-4 py-2 sticky z-[200] border-b border-border  shadow-sm shadow-black/50 top-0 w-full inset-x-0 bg-background">
        <div className="flex items-center gap-x-4">
          {sheet.owner?.id === currentSession?.id && (
            <div
              onClick={() => onEdit(true)}
              className="flex cursor-pointer items-center group w-fit gap-x-2"
            >
              <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full  shadow-md shadow-black/50 group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#FFFFFF"
                  viewBox="0 0 256 256"
                >
                  <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.69,147.32,64l24-24L216,84.69Z"></path>
                </svg>
              </button>
              <span>Edit Sheet</span>
            </div>
          )}
        </div>
      </div>
      <div className="w-[700px] p-2">
        <Sheet
          actions={{ toggleItem, activeItems }}
          data={sheet}
          isEdit={false}
        />
      </div>
    </Fragment>
  )
}
