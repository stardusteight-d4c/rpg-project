"use client"

import Link from "next/link"
import { formatText } from "@/shared/utils"

export const Metrics: React.FC<{ post: IPost }> = ({ post }) => {
  return (
    <div className="px-4 flex items-center gap-x-2">
      <span className="text-gray-400 flex items-center gap-x-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="#9ca3af"
          viewBox="0 0 256 256"
        >
          <path d="M183.89,153.34a57.6,57.6,0,0,1-46.56,46.55A8.75,8.75,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68ZM216,144a88,88,0,0,1-176,0c0-27.92,11-56.47,32.66-84.85a8,8,0,0,1,11.93-.89l24.12,23.41,22-60.41a8,8,0,0,1,12.63-3.41C165.21,36,216,84.55,216,144Zm-16,0c0-46.09-35.79-85.92-58.21-106.33L119.52,98.74a8,8,0,0,1-13.09,3L80.06,76.16C64.09,99.21,56,122,56,144a72,72,0,0,0,144,0Z"></path>
        </svg>
        {post.likesCount ?? 0} Flames
      </span>
      <span className="text-gray-400 flex items-center gap-x-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="#9ca3af"
          viewBox="0 0 256 256"
        >
          <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path>
        </svg>
        {post.commentsCount ?? 0}{" "}
        {post.commentsCount === 1 ? "Comment" : "Comments"}
      </span>
      {post.campaign && (
        <Link
          href={`/campaign/${post.campaign.id}`}
          className="cursor-pointer hover:brightness-125 bg-border block ml-auto w-fit rounded-full px-2 border border-border"
        >
          #{formatText(post.campaign.name!)}
        </Link>
      )}
    </div>
  )
}
