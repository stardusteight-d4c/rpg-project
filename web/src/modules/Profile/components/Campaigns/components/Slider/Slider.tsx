"use client"

import { useRef } from "react"
import { motion, PanInfo } from "framer-motion"
import { Banner } from "./Banner"
import { EmptyState, Loader } from "@/shared/components/ui"

export const Slider: React.FC<{
  campaigns: ICampaign[]
  onPagination: () => void
  isLoading: boolean
}> = ({ campaigns, onPagination, isLoading }) => {
  const sliderRef = useRef<HTMLDivElement>(null)

  if (campaigns.length === 0) return null

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
      className="flex w-full relative gap-4 cursor-grab"
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
      {isLoading && (
        <div className="max-w-[636px] min-w-[636px] rounded-xl">
          <EmptyState
            height={229}
            description="The stars conspire... or maybe it's just loading more data. Let's wait and find out."
          >
            <Loader />
          </EmptyState>
        </div>
      )}
    </motion.div>
  )
}
