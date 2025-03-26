import Link from "next/link"

export const Campaigns: React.FC<{
  searchType: "campaign" | "user"
  campaigns: ICampaign[]
}> = ({ searchType, campaigns }) => {
  if (searchType !== "campaign" && campaigns.length === 0) return null

  return (
    <div className="space-y-2 mb-2">
      {campaigns.map((campaign) => (
        <Link
          href={`/campaign/${campaign.id}`}
          className="flex p-2 cursor-pointer select-none bg-ashes rounded-lg z-20 items-center gap-x-2"
        >
          <img
            src={campaign.coverUrl}
            alt=""
            referrerPolicy="no-referrer"
            className="w-[48px] aspect-square object-cover select-none pointer-events-none h-[48px] border border-border rounded-full"
          />

          <div className="flex flex-col">
            <span className="block text-lg font-bold -tracking-wide">
              {campaign.name}
            </span>
            <span className="text-gray-400 -mt-2 block text-sm">
              {campaign.owner.name}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
