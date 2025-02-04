"use client"

import { Table } from "./components"
import React, { useState } from "react"

export function TableModule() {
  const [active, setActive] = useState<MenuItem>("map")

  return (
    <TableModuleWrapper>
      <Table.Actions />
      <Table.Menu active={active} onActive={setActive} />
      <Table.ActiveSection active={active} />
      <Table.CharactersBar />
    </TableModuleWrapper>
  )
}

const TableModuleWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <main className="max-h-screen relative no-scrollbar overflow-hidden">
      <div className="w-full flex">{children}</div>
    </main>
  )
}
