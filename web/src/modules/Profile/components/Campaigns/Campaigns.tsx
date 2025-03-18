"use client"

import React, { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { getNameInitials } from "@/shared/utils"
import { useCampaigns } from "@/shared/contexts"
import { UserAvatar } from "@/shared/components/content"
import { EmptyState, Heading } from "@/shared/components/ui"
import { Flag } from "@/shared/components/ui/icons"

export const Campaigns: React.FC<{ user: IUser }> = ({ user }) => {
  const { push } = useRouter()
  const { userCampaigns, getUserCampaigns } = useCampaigns()
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ;(async () => {
      await getUserCampaigns(user.id)
    })()
  }, [])

  return (
    <div>
      <Heading title="Campaigns" className="mb-2">
        <Flag />
      </Heading>
      {userCampaigns.length === 0 ? (
        <EmptyState description="The Ancient Whispers talk about great narrators… do you know any? Or do you just fear what hides in the shadows?">
          <Flag />
        </EmptyState>
      ) : (
        <motion.div
          ref={sliderRef}
          className="flex w-full gap-4 cursor-grab"
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
              className="max-w-[636px] min-w-[636px] w-full relative h-[229px] rounded-xl bg-ashes"
            >
              {campaign.players.map((user, index) => (
                <div
                  key={user.id}
                  className="absolute flex z-50 items-center gap-x-1 w-fit top-2 right-2"
                >
                  <div style={{ marginRight: `${index * 20}px` }}>
                    <UserAvatar
                      name={user.name}
                      username={user.username}
                      avatarUrl={user.avatarUrl}
                    />
                  </div>
                </div>
              ))}
              <img
                src={campaign.coverUrl}
                alt={`${campaign.name}/coverUrl`}
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
      )}
    </div>
  )
}
