"use client"

import React, { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { getNameInitials } from "@/shared/utils"
import { useCampaigns } from "@/shared/contexts"

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
      <h3 className="text-2xl mb-2 flex items-center gap-x-2 font-semibold">
        <span>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.345 6.24984C5.23742 6.34309 5.15099 6.45824 5.09149 6.58758C5.032 6.71692 5.0008 6.85748 5 6.99984V27.9998C5 28.2651 5.10536 28.5194 5.29289 28.707C5.48043 28.8945 5.73478 28.9998 6 28.9998C6.26522 28.9998 6.51957 28.8945 6.70711 28.707C6.89464 28.5194 7 28.2651 7 27.9998V22.4711C10.3488 19.8261 13.2337 21.2523 16.5562 22.8973C18.6062 23.9111 20.8137 25.0036 23.1812 25.0036C24.9225 25.0036 26.7488 24.4098 28.6588 22.7536C28.7663 22.6603 28.8528 22.5452 28.9123 22.4159C28.9718 22.2865 29.0029 22.146 29.0037 22.0036V6.99984C29.0033 6.8079 28.9476 6.62015 28.8433 6.45899C28.7391 6.29784 28.5906 6.1701 28.4157 6.09102C28.2408 6.01194 28.0469 5.98486 27.857 6.01303C27.6672 6.04119 27.4894 6.1234 27.345 6.24984C23.845 9.27859 20.88 7.81109 17.4438 6.10984C13.8838 4.34484 9.8475 2.34859 5.345 6.24984ZM27 21.5311C23.6512 24.1761 20.7663 22.7486 17.4438 21.1048C14.3188 19.5611 10.8425 17.8386 7 20.0548V7.47359C10.3488 4.82859 13.2337 6.25484 16.5562 7.89859C19.6812 9.44234 23.1588 11.1648 27 8.94859V21.5311Z"
              fill="url(#paint0_linear_217_15)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_217_15"
                x1="17.0019"
                y1="4.00098"
                x2="17.0019"
                y2="28.9998"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#42D392" />
                <stop offset="1" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
        </span>
        <span className="background-gradient bg-clip-text text-transparent">
          Campaigns
        </span>
      </h3>
      {userCampaigns.length === 0 ? (
        <div className="w-full flex items-center justify-center">
          <div className="p-8 w-full h-[230px] bg-ashes rounded-xl flex flex-col items-center justify-center">
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
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={`${user.name}/${user.username}/avatarUrl`}
                      referrerPolicy="no-referrer"
                      style={{ marginRight: `${index * 20}px` }}
                      className="w-[42px] object-cover h-[42px] rounded-full"
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
