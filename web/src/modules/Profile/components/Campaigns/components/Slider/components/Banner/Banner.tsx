"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { UserAvatar } from "@/shared/components/content"

export const Banner: React.FC<{ campaign: ICampaign }> = ({ campaign }) => {
  const { push } = useRouter()

  return (
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
  )
}
