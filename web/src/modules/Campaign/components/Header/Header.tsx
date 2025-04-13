"use client"

import { Fragment, useState } from "react"
import { UserAvatar } from "@/shared/components/content"
import { EditCampaignModal } from "@/shared/components/content/modals"
import { useAuth } from "@/shared/contexts"
import { Button } from "@/shared/components/ui"
import {
  ArrowCircleUpRight,
  PencilSimpleLine,
} from "@/shared/components/ui/icons"

export const Header: React.FC<{ campaign: ICampaign }> = ({ campaign }) => {
  const { currentSession } = useAuth()
  const [openEditCampaignModal, setOpenEditCampaignModal] =
    useState<boolean>(false)

  return (
    <div className="flex pb-2 select-none bg-background z-20 items-center gap-x-2">
      <EditCampaignModal
        onStatusChange={setOpenEditCampaignModal}
        status={openEditCampaignModal}
        campaign={campaign}
      />
      <UserAvatar
        name={campaign.owner.name}
        username={campaign.owner.username}
        avatarUrl={campaign.owner.avatarUrl}
      />
      <div className="flex flex-col">
        <span className="block text-lg font-bold -tracking-wide">
          {campaign.owner.name}
        </span>
        <span className="text-gray-400 -mt-2 block text-sm">
          #{campaign.owner.username}
        </span>
      </div>
      {currentSession?.id === campaign.owner.id && (
        <div className="ml-auto w-fit flex items-center gap-x-4">
          {/* <Button
            action={() => setOpenEditCampaignModal(true)}
            title="Invite Players"
            bgColor="gradientPurple"
            variant="modal"
          >
            <ArrowCircleUpRight />
          </Button> */}
          <Button
            action={() => setOpenEditCampaignModal(true)}
            title="Edit Campaign"
            bgColor="gradientBlue"
            variant="modal"
          >
            <PencilSimpleLine />
          </Button>
        </div>
      )}
    </div>
  )
}
