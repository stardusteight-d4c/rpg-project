"use client"

import { UserAvatar } from "@/shared/components/content"
import { EmptyState, Heading } from "@/shared/components/ui"
import { MapPinArea } from "@/shared/components/ui/icons"
import { useCampaigns } from "@/shared/contexts/Campaigns/CampaignsContext"
import { getNameInitials } from "@/shared/utils/getNameInitials"
import { useRouter } from "next/navigation"

export const Sidebar = () => {
  const { userCampaigns } = useCampaigns()
  const { push } = useRouter()

  // const campaigns = getAllBy({ key: "status", value: "active" })

  return (
    <section className="w-full mb-4 flex flex-col gap-y-8 pl-4 mt-4 ">
      <div className="pt-4 sticky top-[66px] h-fit border border-border rounded-xl">
        <div className="text-2xl shadow-sm shadow-black/50 border-b border-border px-4 pb-4 pointer-events-none">
          <Heading title="Investigators on the field!">
            <MapPinArea />
          </Heading>
        </div>
        <div className="flex max-h-[450px] no-scrollbar overflow-y-scroll pb-4 px-4 pt-4 flex-col w-full gap-y-4">
          {userCampaigns.length === 0 && (
            <EmptyState
              description="The wind blows through the abandoned ruins... It seems no one is playing now."
              height={348}
            >
              <MapPinArea />
            </EmptyState>
          )}

          {userCampaigns.map((campaign, index) => (
            <div>
              <div
                key={index}
                onClick={() => push(`/campaign/${campaign.id}`)}
                className="cursor-pointer relative h-[200px] rounded-3xl bg-ashes"
              >
                <div className="rounded-full h-[12px] w-[12px] bg-green-500 absolute right-[20px] top-[20px] aspect-square" />
                <div className="rounded-full h-[12px] w-[12px] animate-ping bg-green-500 absolute right-[20px] top-[20px] aspect-square" />
                <span className="absolute bottom-2 left-2 bg-background flex items-center gap-x-2 shadow-sm shadow-black/50 duration-300 ease-in-out transition-all p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#22c55e"
                    viewBox="0 0 256 256"
                  >
                    <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path>
                  </svg>
                  <span className="text-base text-green-500 font-medium pr-1">
                    Watch
                  </span>
                </span>
                <span className="absolute bottom-2 right-2 bg-background flex items-center gap-x-2 shadow-sm shadow-black/50 duration-300 ease-in-out transition-all p-2 rounded-full">
                  <span className="text-base font-medium pr-1">
                    {campaign.streaming?.watchers.length ?? 0} Watching
                  </span>
                </span>
                {campaign.players.map((user, index) => (
                  <div
                    key={user.id}
                    className="absolute flex items-center gap-x-1 inset-x-0 w-full top-2 left-2"
                  >
                    <UserAvatar
                      name={campaign.owner.name}
                      username={campaign.owner.username}
                      avatarUrl={campaign.owner.avatarUrl}
                      size={32}
                      fontSize={18}
                    />
                  </div>
                ))}
                <img
                  src={campaign.coverUrl}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="object-fill rounded-xl w-full h-full"
                />
              </div>
              <span className="text-lg background-gradient bg-clip-text text-transparent font-medium whitespace-nowrap select-none cursor-default pointer-events-none">
                {campaign.name}
              </span>
            </div>
          ))}
          {/* <span className="text-blue-500 underline mx-auto block cursor-pointer w-fit">
            See more
          </span> */}
        </div>
      </div>
    </section>
  )
}
