"use client"

import { Fragment, useState } from "react"
import { Button } from "@/shared/components/ui"
import { Gear } from "@/shared/components/ui/icons"
import { MapModal } from "@/shared/components/content/modals"
import { useAuth, useCampaigns } from "@/shared/contexts"

export const Config = () => {
  const [openConfig, setOpenConfig] = useState(false)
  const { isMaster } = useCampaigns()

  if (!isMaster) return

  return (
    <Fragment>
      <MapModal onStatusChange={setOpenConfig} status={openConfig} />
      <div className="absolute right-2 top-2 z-50">
        <Button
          action={() => setOpenConfig(true)}
          title="Config"
          bgColor="gradientBlue"
          variant="icon"
          className="!w-[32px] !h-[32px] hover:-rotate-45 transition-all duration-300 ease-in-out"
        >
          <Gear />
        </Button>
      </div>
    </Fragment>
  )
}
