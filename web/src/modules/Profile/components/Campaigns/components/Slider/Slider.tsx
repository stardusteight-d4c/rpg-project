"use client"

import { useRef } from "react"
import { motion, PanInfo } from "framer-motion"
import { Banner } from "./Banner"

export const Slider: React.FC<{
  campaigns: ICampaign[]
  onPagination: () => void
}> = ({ campaigns, onPagination }) => {
  const sliderRef = useRef<HTMLDivElement>(null)

  if (campaigns.length <= 0) return null

  const handleDrag = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.point.x === 0) {
      onPagination()
    }
  }

  return (
    <motion.div
      ref={sliderRef}
      className="flex w-full gap-4 cursor-grab"
      drag="x"
      dragConstraints={{
        right: 0,
        left: -((campaigns.length - 1) * 640),
      }}
      onDrag={handleDrag}
    >
      {campaigns.map((campaign) => (
        <Banner key={campaign.id} campaign={campaign} />
      ))}
    </motion.div>
  )
}
