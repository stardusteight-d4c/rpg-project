"use client"

import { Components } from "./components"
import { useAuth, useMaps } from "@/shared/contexts"

export const Map = () => {
  const { activeMap } = useMaps()
  const { currentSession } = useAuth()

  if (!currentSession) return

  return (
    <div className="w-full h-full relative">
      <Components.Config />
      <Components.Display />
      <Components.Empty isActiveMap={!!activeMap} />
    </div>
  )
}

