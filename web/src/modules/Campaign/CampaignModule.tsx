"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { Footer, Navbar } from "@/shared/components/layout"
import { countTimeago, convertTimestamp, getNameInitials } from "@/shared/utils"
import { EditCampaignModal } from "@/shared/components/content/modals"
import { CreatePostInput } from "@/shared/components/content/Post/components/CreatePostInput/CreatePostInput"
import { usePosts, useToast, useAuth, useCampaigns } from "@/shared/contexts"
import { DataFetcher, Tooltip } from "@/shared/components/ui"
import { Post, UserAvatar } from "@/shared/components/content"
import { Pagination } from "./components/Pagination"

export function CampaignModule() {
  const { push } = useRouter()
  const { getByCampaign, campaignPosts } = usePosts()
  const { currentSession } = useAuth()
  const campaignId = useParams().id as string
  const { getById, remove, campaign } = useCampaigns()
  const { addToast } = useToast()
  const [timeAgo, setTimeAgo] = useState<string>("")
  const [isClamped, setIsClamped] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [openEditCampaignModal, setOpenEditCampaignModal] =
    useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      await getById(campaignId)
    })()
  }, [campaignId])

  useEffect(() => {
    ;(async () => {
      getByCampaign({ campaignId, currentPage, pageSize: 3 }).then(
        (postsPagination) => {
          setTotalPages(postsPagination.totalPages)
        }
      )
    })()
  }, [campaignId, currentPage])

  useEffect(() => {
    if (contentRef.current) {
      const isOverflowing =
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      setIsClamped(isOverflowing)
    }
  }, [campaign?.description])

  useEffect(() => {
    if (campaign?.streaming && campaign?.streaming.startedAt) {
      const interval = setInterval(() => {
        setTimeAgo(countTimeago(campaign.streaming!.startedAt))
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [campaign])

  if (!campaign) return

  const onDelete = async () => {
    remove(campaign.id)
      .then(() => {
        addToast("The campaign has been deleted!", "success", 45)
      })
      .catch((error) => {
        addToast(error.message, "error", 45)
      })
      .finally(() => {
        push(`/profile/${currentSession?.username}`)
        setOpenDeleteModal(false)
        setOpenEditCampaignModal(false)
      })
  }

  return (
    <main className="w-screen">
      <EditCampaignModal
        onStatusChange={setOpenEditCampaignModal}
        status={openEditCampaignModal}
        campaign={campaign}
      />
      <Navbar />
      <div className="max-w-7xl mb-[200px] min-h-screen w-full mx-auto mt-[45px] pt-4">
        <div className="flex pb-2 select-none bg-background z-20 items-center gap-x-2">
          <UserAvatar
            name={campaign.owner.name}
            username={campaign.owner.username}
            avatarUrl={campaign.owner.avatarUrl}
          />
          <div className="flex flex-col">
            <span className="block text-lg font-bold -tracking-wide">
              {campaign.owner.name}
            </span>
            <span className="text-gray-400 -mt-2 block text-sm">
              #{campaign.owner.username}
            </span>
          </div>
          {currentSession?.id === campaign.owner.id && (
            <div
              onClick={() => setOpenEditCampaignModal(true)}
              className="cursor-pointer ml-auto w-fit flex items-center group gap-x-2"
            >
              <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#FFFFFF"
                  viewBox="0 0 256 256"
                >
                  <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.69,147.32,64l24-24L216,84.69Z"></path>
                </svg>
              </button>
              <span>Edit Campaign</span>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 w-full gap-x-4">
          <div className="col-span-1 flex w-full flex-col items-start">
            <div className="relative w-full">
              <img
                src={campaign.coverUrl}
                alt=""
                referrerPolicy="no-referrer"
                className="w-full object-fill rounded-xl h-[350px]"
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
              {/* <span className="absolute bottom-4 right-4 bg-background flex items-center gap-x-2 shadow-sm shadow-black/50 duration-300 ease-in-out transition-all p-2 rounded-full">
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
              </span> */}
              {campaign.players.find(
                (player) => player.id === currentSession?.id
              ) && (
                <span
                  onClick={() => push(`/table/${campaign.tableId}`)}
                  className="hover:bg-green-500 absolute bottom-4 right-4 cursor-pointer w-fit flex items-center gap-x-2 shadow-sm shadow-black/50 bg-background duration-300 ease-in-out transition-all px-4 py-2 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="#FFFFFF"
                    viewBox="0 0 256 256"
                  >
                    <path d="M168,96v48a8,8,0,0,1-16,0V115.31l-50.34,50.35a8,8,0,0,1-11.32-11.32L140.69,104H112a8,8,0,0,1,0-16h48A8,8,0,0,1,168,96Zm64,32A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                  </svg>

                  <span className="text-xl font-medium text-white pr-1">
                    Join the table
                  </span>
                </span>
              )}
            </div>
            <div className="flex -mt-2 flex-col gap-y-2">
              <h2 className="text-5xl w-fit mt-4 font-bold background-gradient text-transparent bg-clip-text">
                {campaign.name}
              </h2>
              <div
                ref={contentRef}
                className={`text-gray-400 space-y-4 ${
                  expanded ? "" : "line-clamp-[10] overflow-hidden"
                }`}
              >
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {campaign.description}
                </ReactMarkdown>
              </div>

              {isClamped && (
                <span
                  className="text-blue-500 hover:underline mx-auto block mt-2 cursor-pointer w-fit"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? "See less" : "See more"}
                </span>
              )}
            </div>
          </div>
          <div className="col-span-1 w-full">
            <div className="w-full">
              <div className="flex flex-col gap-y-4 ">
                <div className="flex border bg-ashes border-border rounded-xl p-4 flex-col gap-2 flex-wrap">
                  <div className="grid grid-cols-2 gap-x-2">
                    <div className="col-span-1 flex select-none z-20 items-center gap-x-2">
                      <UserAvatar
                        name={campaign.owner.name}
                        username={campaign.owner.username}
                        avatarUrl={campaign.owner.avatarUrl}
                      />
                      <div className="flex flex-col">
                        <span className="block text-lg font-bold -tracking-wide">
                          {campaign.owner.name}
                        </span>
                        <span className="text-gray-400 -mt-2 block text-sm">
                          #{campaign.owner.username}
                        </span>
                      </div>
                    </div>
                    <div className="flex select-none z-20 items-center gap-x-2">
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
                            <stop stopColor="#42D392" />
                            <stop offset="1" stopColor="#8B5CF6" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="flex flex-col">
                        <span className="block whitespace-nowrap background-gradient w-fit bg-clip-text text-transparent text-lg font-bold -tracking-wide">
                          Keeper of Arcane Lore
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* {getCharactersByType().players.map((character) => (
                  <div key={character.id} className="grid grid-cols-2 gap-x-2">
                  <div className="col-span-1 flex select-none z-20 items-center gap-x-2">
                  <img
                  src={character.owner.avatarUrl}
                        alt=""
                        className="w-[48px] aspect-square object-cover select-none pointer-events-none h-[48px] border border-border rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="block text-lg font-bold -tracking-wide">
                          {character.owner.name}
                        </span>
                        <span className="text-gray-400 -mt-2 block text-sm">
                          #{character.owner.username}
                        </span>
                      </div>
                    </div>
                    {character.owner.role === "master" ? (
                      <></>
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
                ))} */}
                </div>
                <CreatePostInput currentPage={currentPage} />
                {campaignPosts.size === 0 ? (
                  <div className="w-full flex items-center justify-center">
                    <div className="p-8 w-full h-[230px] border-2  border-dashed border-border rounded-xl flex flex-col items-center justify-center">
                      <div className="col-span-1 w-[50px] h-[50px] flex items-center justify-center bg-border/50 border border-border rounded aspect-square">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          fill="#9ca3af"
                          viewBox="0 0 256 256"
                        >
                          <path d="M168,128a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,128Zm-8,24H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16ZM216,40V200a32,32,0,0,1-32,32H72a32,32,0,0,1-32-32V40a8,8,0,0,1,8-8H72V24a8,8,0,0,1,16,0v8h32V24a8,8,0,0,1,16,0v8h32V24a8,8,0,0,1,16,0v8h24A8,8,0,0,1,216,40Zm-16,8H184v8a8,8,0,0,1-16,0V48H136v8a8,8,0,0,1-16,0V48H88v8a8,8,0,0,1-16,0V48H56V200a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16Z"></path>
                        </svg>
                      </div>
                      <span className="text-gray-400 block mt-2 w-[400px] text-center">
                        The cosmic void awaits... but so far, no echoes of
                        sanity or madness have been recorded.
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>
                    {loading ? (
                      <div className="flex flex-col items-center justify-center mt-[150px] py-8">
                        <DataFetcher />
                      </div>
                    ) : (
                      <div className="flex flex-col gap-y-4 rounded-3xl w-full">
                        {Array.from(campaignPosts.values()).map((post) => (
                          <Post post={post} />
                        ))}
                      </div>
                    )}
                    <Pagination
                      totalPages={totalPages}
                      currentPage={currentPage}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
