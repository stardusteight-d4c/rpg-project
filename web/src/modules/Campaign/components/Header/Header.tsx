"use client"

import { useState } from "react"
import { UserAvatar } from "@/shared/components/content"
import { EditCampaignModal } from "@/shared/components/content/modals"
import { useAuth } from "@/shared/contexts"

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
        <div
          onClick={() => setOpenEditCampaignModal(true)}
          className="cursor-pointer ml-auto w-fit flex items-center group gap-x-2"
        >
          <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#FFFFFF"
              viewBox="0 0 256 256"
            >
              <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.69,147.32,64l24-24L216,84.69Z"></path>
            </svg>
          </button>
          <span>Edit Campaign</span>
        </div>
      )}
    </div>
  )
}
