"use client"

import { ReactNode, useEffect } from "react"
import VanillaTilt from "vanilla-tilt"

interface Props {
  elementId: string
  max: number
  children: ReactNode
}

export const Tilt = ({ elementId, max, children }: Props) => {
  useEffect(() => {
    const tilt = document.getElementById(elementId)!
    VanillaTilt.init(tilt, {
      glare: true,
      "max-glare": 0.2,
      scale: 1,
      max,
      speed: 1,
      transition: true,
      reverse: true,
    })
  }, [])

  return <>{children}</>
}
