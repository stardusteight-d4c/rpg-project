"use client"

import { Components } from "./components"
import React, { useState } from "react"

export function TableModule() {
  const [active, setActive] = useState<MenuItem>("map")

  return (
    <Wrapper>
      <Components.Actions />
      <Components.Menu active={active} onActive={setActive} />
      <Components.Main active={active} />
      <Components.Sheets />
    </Wrapper>
  )
}

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="max-h-screen relative no-scrollbar overflow-hidden">
      <div className="w-full flex">{children}</div>
    </main>
  )
}
