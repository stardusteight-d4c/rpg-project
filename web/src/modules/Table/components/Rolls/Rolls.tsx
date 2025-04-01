"use client"

import React, { useEffect, useRef, useState } from "react"
import { useTableRolls } from "@/shared/contexts"
import { Components } from "./components"

export const Rolls = () => {
  const { rolls } = useTableRolls()

  return (
    <Wrapper>
      <Components.Empty length={rolls.length} />
      <Components.Display rolls={rolls} />

      <Components.Dice />
    </Wrapper>
  )
}

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <section className="w-full min-w-[20vw] max-w-[20vw] min-h-[100vh] max-h-[100vh] relative overflow-y-scroll no-scrollbar">
      {children}
    </section>
  )
}
