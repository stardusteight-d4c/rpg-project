"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Banner } from "./Banner"

export const Slider: React.FC<{ campaigns: ICampaign[] }> = ({ campaigns }) => {
  const sliderRef = useRef<HTMLDivElement>(null)

  if (campaigns.length <= 0) return

  return (
    <motion.div
      ref={sliderRef}
      className="flex w-full gap-4 cursor-grab"
      drag="x"
      dragConstraints={{
        right: 0,
        left: -((campaigns.length - 1) * 640),
      }}
    >
      {campaigns.map((campaign) => (
        <Banner key={campaign.id} campaign={campaign} />
      ))}
    </motion.div>
  )
}
