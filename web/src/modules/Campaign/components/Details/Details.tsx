"use client"

import Link from "next/link"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { Tooltip } from "@/shared/components/ui"
import { useAuth } from "@/shared/contexts"
import { convertTimestamp, countTimeago } from "@/shared/utils"
import { useEffect, useRef, useState } from "react"

export const Details: React.FC<{ campaign: ICampaign }> = ({ campaign }) => {
  const { currentSession } = useAuth()
  const [timeAgo, setTimeAgo] = useState<string>("")
  const [expanded, setExpanded] = useState(false)
  const [isClamped, setIsClamped] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (campaign?.streaming && campaign?.streaming.startedAt) {
      const interval = setInterval(() => {
        setTimeAgo(countTimeago(campaign.streaming!.startedAt))
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [campaign])

  useEffect(() => {
    if (contentRef.current) {
      const isOverflowing =
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      setIsClamped(isOverflowing)
    }
  }, [campaign?.description])

  return (
    <div className="col-span-1 flex w-full flex-col items-start">
      <div className="relative w-full">
        <img
          src={campaign.coverUrl}
          alt={`${campaign.coverUrl}/cover-url`}
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
                  <span className="text-xl font-medium pr-1">{timeAgo}</span>
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
          <Link
            href={`/table/${campaign.tableId}`}
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
          </Link>
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
  )
}
