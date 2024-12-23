"use client"

import React, { useState } from "react"
import { Fade } from "react-awesome-reveal"

interface TooltipProps {
  children: React.ReactNode
  text: string
  position?: "top" | "bottom" | "left" | "right"
  variant?: boolean
}

export const Tooltip = ({
  children,
  text,
  variant,
  position,
}: TooltipProps) => {
  if (variant) {
    return (
      <TooltipVariant position={position} children={children} text={text} />
    )
  }

  return (
    <div className="relative group">
      <div className="z-10 cursor-default relative">{children}</div>
      <div className="hidden group-hover:block">
        <Fade duration={300}>
          <div className="bg-ashes cursor-default z-0 rounded-full py-1 pl-9 pr-2 text-gray-400 whitespace-nowrap left-0 top-0  absolute">
            {text}
          </div>
        </Fade>
      </div>
    </div>
  )
}

interface TooltipVariantProps {
  text: string
  position?: "top" | "bottom" | "left" | "right"
  children: React.ReactNode
}

const TooltipVariant: React.FC<TooltipVariantProps> = ({
  text,
  position = "top",
  children,
}) => {
  const [visible, setVisible] = useState(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full  top-1/2 -translate-y-1/2 ml-2",
  }

  const handleMouseEnter = () => {
    const id = setTimeout(() => {
      setVisible(true)
    }, 1500) 

    setTimeoutId(id)
  }

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId) 
    }
    setVisible(false)
  }

  return (
    <div
      className="relative w-fit h-fit"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {visible && (
        <>
          <div
            className={`opacityAnimation -ml-0 absolute shadow-sm shadow-black/50 font-medium z-[100] rounded-full overflow-hidden ${positionClasses[position]} w-max px-4 py-1 text-white bg-background border border-border transition-all duration-200`}
           
         >
            {text}
          </div>
        </>
      )}
    </div>
  )
}
