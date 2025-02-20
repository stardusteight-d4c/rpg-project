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

  return (
    <div>
      <h2 className="text-3xl pointer-events-none font-bold mb-2">Campaigns</h2>
      {userCampaigns.length === 0 ? (
        <div className="w-full flex items-center justify-center">
          <div className="p-8 w-full border-2 h-[230px] border-dashed border-border rounded-xl flex flex-col items-center justify-center">
            <div className="col-span-1 w-[50px] h-[50px] flex items-center justify-center bg-border/50 border border-border rounded aspect-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#9ca3af"
                viewBox="0 0 256 256"
              >
                <path d="M42.76,50A8,8,0,0,0,40,56V224a8,8,0,0,0,16,0V179.77c26.79-21.16,49.87-9.75,76.45,3.41,16.4,8.11,34.06,16.85,53,16.85,13.93,0,28.54-4.75,43.82-18a8,8,0,0,0,2.76-6V56A8,8,0,0,0,218.76,50c-28,24.23-51.72,12.49-79.21-1.12C111.07,34.76,78.78,18.79,42.76,50ZM216,172.25c-26.79,21.16-49.87,9.74-76.45-3.41-25-12.35-52.81-26.13-83.55-8.4V59.79c26.79-21.16,49.87-9.75,76.45,3.4,25,12.35,52.82,26.13,83.55,8.4Z"></path>
              </svg>
            </div>
            <span className="text-gray-400 block mt-2 w-[400px] text-center">
              The Ancient Whispers talk about great narrators… do you know any?
              Or do you just fear what hides in the shadows?
            </span>
          </div>
        </div>
      ) : (
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
                      className="w-[42px] h-[42px] text-2xl font-bold bg-background text-white flex items-center justify-center aspect-square object-cover select-none pointer-events-none border border-border rounded-full"
                    >
                      {getNameInitials(campaign.owner.name)}
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
      )}
    </div>
  )
}
