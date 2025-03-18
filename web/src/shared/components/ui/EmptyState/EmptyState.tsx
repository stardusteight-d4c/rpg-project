import React from "react"

export const EmptyState: React.FC<{
  description: string
  children: React.ReactNode
  height?: number
}> = ({ description, children, height = 230 }) => {
  return (
    <div className="w-full flex items-center justify-center">
      <div
        style={{
          height,
        }}
        className="p-8 w-full bg-ashes border-border rounded-xl flex flex-col items-center justify-center"
      >
        <div className="empty-state-icon col-span-1 !text-[#9ca3af] !fill-[#9ca3af] w-[50px] h-[50px] flex items-center justify-center bg-border/50 border border-border rounded aspect-square">
          {children}
        </div>
        <span className="text-gray-400 block mt-2 max-w-[400px] w-full text-center">
          {description}
        </span>
      </div>
    </div>
  )
}
