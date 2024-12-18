"use client"

import React from "react"
import { Fade } from "react-awesome-reveal"

interface TooltipProps {
  children: React.ReactNode
  text: string
}

export const Tooltip = ({ children, text }: TooltipProps) => {
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
