"use client"

import { Board } from "./components"
import React, { useState } from "react"

export function BoardModule() {
  const [active, setActive] = useState<MenuItem>("map")

  return (
    <BoardModuleWrapper>
      <Board.Actions />
      <Board.Menu active={active} onActive={setActive} />
      <Board.ActiveSection active={active} />
      <Board.CharactersBar />
    </BoardModuleWrapper>
  )
}

const BoardModuleWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <main className="max-h-screen relative no-scrollbar overflow-hidden">
      <div className="w-full flex">{children}</div>
    </main>
  )
}
