"use client"

import React from "react"
import ReactDOMServer from "react-dom/server"

export const GradientSVGWrapper: React.FC<{
  children: React.ReactNode
  className?: string
  size?: number
}> = ({ children, size = 24 }) => {
  const svgString = React.isValidElement(children)
    ? ReactDOMServer.renderToStaticMarkup(children)
    : ""

  return (
    <div
      style={{
        background: "linear-gradient(to right, #42D392, #8B5CF6)",
        WebkitMaskImage: `url("data:image/svg+xml,${encodeURIComponent(
          svgString
        )}")`,
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskImage: `url("data:image/svg+xml,${encodeURIComponent(svgString)}")`,
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        width: size,
        height: size,
      }}
    ></div>
  )
}
