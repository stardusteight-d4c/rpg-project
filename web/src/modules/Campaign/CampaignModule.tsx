"use client"

import { Navbar, Tooltip } from "@/shared/components"
import { useCampaigns } from "@/shared/contexts/Campaigns/CampaignsContext"
import { useCharacters } from "@/shared/contexts/Characters/CharactersContext"
import { useParams, useRouter } from "next/navigation"
import { convertTimestamp } from "../Table/utils/convertTimestamp"
import { countTimeago } from "@/shared/utils/countTimeago"
import { useEffect, useState } from "react"
import { useFeed } from "@/shared/contexts/Feed/FeedContext"
import { Post } from "../Feed/components/Post/Post"

export function CampaignModule() {
  const params = useParams()
  const campaignId = params.id as string
  const { push } = useRouter()
  const { getByCampaignId } = useFeed()
  const { getBy } = useCampaigns()
  const { getCharactersByType } = useCharacters()
  const [timeAgo, setTimeAgo] = useState<string>("")

  const campaign = getBy({ key: "id", value: campaignId })
  if (!campaign) return
  const posts = getByCampaignId(campaignId)

  useEffect(() => {
    if (campaign.streaming && campaign.streaming.startedAt) {
      const interval = setInterval(() => {
        setTimeAgo(countTimeago(campaign.streaming!.startedAt))
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [campaign])

  return (
    <main className="w-screen">
      <Navbar />
      <div className="max-w-7xl w-full mx-auto mt-[45px] pt-4">
        <div className="flex pb-2 select-none bg-background z-20 items-center gap-x-2">
          <img
            src={campaign.createdBy.avatarUrl}
            alt=""
            className="w-[48px] aspect-square object-cover select-none pointer-events-none h-[48px] border border-border rounded-full"
          />
          <div className="flex flex-col">
            <span className="block text-lg font-bold -tracking-wide">
              {campaign.createdBy.name}
            </span>
            <span className="text-gray-400 -mt-2 block text-sm">
              #{campaign.createdBy.username}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4">
          <div className="col-span-1 relative">
            <div className="relative">
              <img
                src={campaign.coverUrl}
                alt=""
                referrerPolicy="no-referrer"
                className="w-full object-fill rounded-3xl h-[350px]"
              />
              {campaign.status === "active" && (
                <div className="absolute top-4 left-4 flex items-center gap-x-2">
                  <span className=" bg-background border border-border cursor-pointer w-fit flex items-center gap-x-2 shadow-sm shadow-black/50 hover:bg-border duration-300 ease-in-out transition-all px-4 py-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      fill="#22c55e"
                      viewBox="0 0 256 256"
                    >
                      <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path>
                    </svg>
                    <span className="text-xl font-medium text-green-500 pr-1">
                      Watch
                    </span>
                  </span>
                  {campaign.streaming && (
                    <>
                      <span className="bg-background flex items-center gap-x-2 shadow-sm shadow-black/50 duration-300 ease-in-out transition-all p-2 rounded-full">
                        <span className="text-xl font-medium pr-1">
                          {campaign.streaming.watchers.length ?? 0} Watching
                        </span>
                      </span>
                      <span className="bg-background flex items-center gap-x-2 shadow-sm shadow-black/50 duration-300 ease-in-out transition-all p-2 rounded-full">
                        <span className="text-xl font-medium pr-1">
                          {timeAgo}
                        </span>
                      </span>
                    </>
                  )}
                </div>
              )}

              {campaign.status === "active" && (
                <div className="absolute right-[30px] top-[30px]">
                  <Tooltip text="Current playing" variant position="right">
                    <div className="rounded-full h-[18px] w-[18px] cursor-pointer bg-green-500  aspect-square" />
                    <div className="rounded-full h-[18px] w-[18px] cursor-pointer animate-ping bg-green-500 absolute top-0 aspect-square" />
                  </Tooltip>
                </div>
              )}
              {campaign.status === "recent_active" && (
                <div className="absolute right-[30px] top-[30px]">
                  <Tooltip text="Recent playing" variant position="right">
                    <div className="rounded-full h-[18px] w-[18px] cursor-pointer bg-gray-500  aspect-square" />
                  </Tooltip>
                </div>
              )}
              {campaign.status === "inactive" && (
                <div className="absolute right-[30px] top-[30px]">
                  <Tooltip text="Offline" variant position="right">
                    <div className="rounded-full h-[18px] w-[18px] cursor-pointer bg-red-500  aspect-square" />
                  </Tooltip>
                </div>
              )}
            </div>
            <span className="absolute bottom-4 left-4 bg-background flex items-center gap-x-2 shadow-sm shadow-black/50 duration-300 ease-in-out transition-all p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-68-76a12,12,0,1,1-12-12A12,12,0,0,1,140,132Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,132ZM96,172a12,12,0,1,1-12-12A12,12,0,0,1,96,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,140,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,172Z"></path>
              </svg>
              <span className="text-lg font-medium pr-1">
                Created on {convertTimestamp(campaign.createdAt)}
              </span>
            </span>
            <span className="absolute bottom-4 right-4 bg-background flex items-center gap-x-2 shadow-sm shadow-black/50 duration-300 ease-in-out transition-all p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>{" "}
              </svg>
              <span className="text-lg font-medium pr-1">
                {campaign.duration} hours
              </span>
            </span>
          </div>
          <div className="col-span-1 flex -mt-2 flex-col gap-y-2">
            <h2 className="text-5xl mt-4 font-bold background-gradient text-transparent bg-clip-text">
              {campaign.name}
            </h2>
            <span className="block text-gray-400">{campaign.description}</span>
            <span
              onClick={() =>
                push("/table/118c3962-fbbc-4dc0-8381-0f0d0a1afa38")
              }
              className="bg-background border border-border cursor-pointer w-fit flex items-center gap-x-2 shadow-sm shadow-black/50 hover:bg-border duration-300 ease-in-out transition-all px-4 py-2 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="#22c55e"
                viewBox="0 0 256 256"
              >
                <path d="M168,96v48a8,8,0,0,1-16,0V115.31l-50.34,50.35a8,8,0,0,1-11.32-11.32L140.69,104H112a8,8,0,0,1,0-16h48A8,8,0,0,1,168,96Zm64,32A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
              </svg>

              <span className="text-xl font-medium text-green-500 pr-1">
                Join the table
              </span>
            </span>
          </div>
          <div className="col-span-1 mt-4">
            <div className="flex flex-col gap-y-4 rounded-3xl w-full">
              {posts.map((post) => (
                <Post post={post} />
              ))}
            </div>
            {posts.length === 3 && (
              <span className="text-blue-500 underline mx-auto block mt-2 cursor-pointer w-fit">
                See more
              </span>
            )}
          </div>
          <div className="col-span-1 mt-4 w-full  rounded-3xl">
            <div>
              <div className="flex border bg-border border-border rounded-3xl p-4 flex-col gap-2 flex-wrap">
                {getCharactersByType().players.map((character) => (
                  <div key={character.id} className="grid grid-cols-2 gap-x-2">
                    <div className="col-span-1 flex select-none z-20 items-center gap-x-2">
                      <img
                        src={character.user.avatarUrl}
                        alt=""
                        className="w-[48px] aspect-square object-cover select-none pointer-events-none h-[48px] border border-border rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="block text-lg font-bold -tracking-wide">
                          {character.user.name}
                        </span>
                        <span className="text-gray-400 -mt-2 block text-sm">
                          #{character.user.username}
                        </span>
                      </div>
                    </div>
                    {character.user.role === "master" ? (
                      <div className="flex border-b border-border select-none z-20 items-center gap-x-2">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="min-w-[48px] bg-background p-2 select-none pointer-events-none min-h-[48px] border border-border aspect-square rounded-full"
                        >
                          <path
                            d="M28.8626 9.20037C28.4715 9.00867 28.0281 8.95119 27.601 9.03683C27.174 9.12247 26.787 9.34645 26.5001 9.67412L22.2913 14.2104L17.8163 4.17412C17.8161 4.16996 17.8161 4.16579 17.8163 4.16163C17.6563 3.81456 17.4002 3.52061 17.0783 3.31457C16.7564 3.10852 16.3822 2.99902 16.0001 2.99902C15.6179 2.99902 15.2437 3.10852 14.9218 3.31457C14.5999 3.52061 14.3438 3.81456 14.1838 4.16163C14.184 4.16579 14.184 4.16996 14.1838 4.17412L9.70882 14.2104L5.50007 9.67412C5.21128 9.34639 4.82313 9.12221 4.39493 9.03585C3.96673 8.94949 3.52203 9.00569 3.12878 9.19586C2.73553 9.38604 2.41536 9.69974 2.21718 10.089C2.01901 10.4783 1.95373 10.9218 2.03132 11.3516C2.03132 11.3654 2.03132 11.3779 2.04007 11.3916L4.87507 24.3754C4.96234 24.8326 5.20634 25.245 5.56502 25.5416C5.92371 25.8383 6.37462 26.0005 6.84007 26.0004H25.1613C25.6266 26.0002 26.0772 25.8378 26.4356 25.5412C26.794 25.2446 27.0378 24.8324 27.1251 24.3754L29.9601 11.3916C29.9601 11.3779 29.9601 11.3654 29.9688 11.3516C30.0479 10.9212 29.9822 10.4767 29.7821 10.0876C29.582 9.6984 29.2587 9.38644 28.8626 9.20037ZM25.1688 23.9604L25.1613 24.0004H6.83882L6.83132 23.9604L4.00007 11.0004L4.01757 11.0204L9.26757 16.6754C9.37999 16.7969 9.5208 16.8885 9.67738 16.9422C9.83396 16.9958 10.0014 17.0098 10.1647 16.9828C10.328 16.9557 10.482 16.8886 10.613 16.7874C10.744 16.6862 10.8478 16.5541 10.9151 16.4029L16.0001 5.00038L21.0863 16.4066C21.1536 16.5578 21.2574 16.69 21.3884 16.7912C21.5194 16.8924 21.6734 16.9595 21.8367 16.9865C22 17.0135 22.1674 16.9996 22.324 16.9459C22.4806 16.8923 22.6214 16.8006 22.7338 16.6791L27.9838 11.0241L28.0001 11.0004L25.1688 23.9604Z"
                            fill="url(#paint0_linear_109_5)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_109_5"
                              x1="16.0005"
                              y1="2.99902"
                              x2="16.0005"
                              y2="26.0004"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#42D392" />
                              <stop offset="1" stop-color="#8B5CF6" />
                            </linearGradient>
                          </defs>
                        </svg>

                        <div className="flex flex-col">
                          <span className="block whitespace-nowrap background-gradient w-fit bg-clip-text text-transparent text-lg font-bold -tracking-wide">
                            Keeper of Arcane Lore
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="col-span-1 flex select-none z-20 items-center gap-x-2">
                        <img
                          src={character.infos.characterUrl}
                          alt=""
                          className="w-[48px] aspect-square object-cover select-none pointer-events-none h-[48px] border border-border rounded-full"
                        />
                        <div className="flex flex-col">
                          <span className="block whitespace-nowrap text-lg font-bold -tracking-wide">
                            {character.infos.name}
                          </span>
                          <span className="text-gray-400 whitespace-nowrap -mt-2 block text-sm">
                            {character.infos.occupation}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="mt-[100px] w-full bg-ashes border-t border-border py-1">
        <div className="font-bold max-w-7xl w-full mx-auto text-2xl pointer-events-none select-none flex gap-2">
          <img
            src="/logo.svg"
            alt=""
            className="w-[42px] h-[42px] p-1 rounded-full shadow-sm shadow-black/50 mx-auto border border-border"
          />
        </div>
      </footer>
    </main>
  )
}
