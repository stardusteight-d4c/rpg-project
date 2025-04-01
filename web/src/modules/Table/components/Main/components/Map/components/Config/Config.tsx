"use client"

import { Fragment, useState } from "react"
import { Button } from "@/shared/components/ui"
import { Gear } from "@/shared/components/ui/icons"
import { MapConfigModal } from "@/shared/components/content/modals"

export const Config = () => {
  const [openConfig, setOpenConfig] = useState(false)

  // Exibir apenas para o DM
  if (false) return

  return (
    <Fragment>
      <MapConfigModal onStatusChange={setOpenConfig} status={openConfig} />
      <div className="absolute right-2 top-2 z-50">
        <Button
          action={() => setOpenConfig(true)}
          title="Config"
          bgColor="gradientBlue"
          variant="icon"
          className="!w-[32px] !h-[32px]"
        >
          <Gear />
        </Button>
      </div>
    </Fragment>
  )
}
