"use client"

import { useCampaigns } from "@/shared/contexts/Campaigns/CampaignsContext"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import React, { useEffect, useState, useRef } from "react"
import { getNameInitials } from "@/shared/utils/getNameInitials"

export const Campaigns: React.FC<{ user: IUser }> = ({ user }) => {
  const { push } = useRouter()
  const { userCampaigns, getUserCampaigns } = useCampaigns()
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ;(async () => {
      await getUserCampaigns(user.id)
    })()
  }, [])

  console.log(userCampaigns)

  return (
    <div>
      <h2 className="text-3xl pointer-events-none font-bold mb-2">Campaigns</h2>
      <motion.div
        ref={sliderRef}
        className="flex w-full gap-2 cursor-grab"
        drag="x"
        dragConstraints={{
          right: 0,
          left: -((userCampaigns.length - 1) * 640),
        }}
      >
        {userCampaigns.map((campaign) => (
          <motion.div
            key={campaign.id}
            onDoubleClick={() => push(`/campaign/${campaign.id}`)}
            className="max-w-[636px] w-full relative h-[229px] rounded-xl bg-ashes"
          >
            {campaign.players.map((user, index) => (
              <div
                key={user.id}
                className="absolute flex z-50 items-center gap-x-1 w-fit top-2 right-2"
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt=""
                    style={{ marginRight: `${index * 20}px` }}
                    className="w-[42px] h-[42px] rounded-full"
                  />
                ) : (
                  <div
                    style={{ marginRight: `${index * 20}px` }}
                    className="w-[42px] h-[42px] text-2xl font-bold text-white flex items-center justify-center aspect-square object-cover select-none pointer-events-none border border-border rounded-full"
                  >
                    {getNameInitials(campaign.createdBy.name)}
                  </div>
                )}
              </div>
            ))}
            <img
              src={campaign.coverUrl}
              alt=""
              className="object-fill  pointer-events-none select-none rounded-xl w-full h-full"
            />
            <div className="px-2 border border-border bg-background w-fit z-50 shadow-sm shadow-black/50 rounded-full font-medium text-2xl absolute top-2 left-2">
              <span className="background-gradient bg-clip-text text-transparent whitespace-nowrap select-none cursor-default pointer-events-none">
                {campaign.name}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
