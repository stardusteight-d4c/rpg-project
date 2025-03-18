"use client"

import React from "react"
import ReactDOMServer from "react-dom/server"
import { GradientSVGWrapper } from "../GradientSVGWrapper"

export const Heading: React.FC<{
  title: string
  children: React.ReactNode
  className?: string
}> = ({ title, children, className }) => {
  return (
    <h3
      className={`${className} text-2xl flex items-center gap-x-2 font-semibold`}
    >
      <GradientSVGWrapper size={32}>{children}</GradientSVGWrapper>
      <span className="background-gradient block w-fit bg-clip-text text-transparent">
        {title}
      </span>
    </h3>
  )
}
