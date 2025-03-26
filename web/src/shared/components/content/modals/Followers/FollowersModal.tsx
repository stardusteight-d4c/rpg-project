"use client"

import React, { useEffect, useState } from "react"
import { UserAvatar } from "@/shared/components/content"
import { EmptyState, Loader, ModalWrapper } from "@/shared/components/ui"
import { useToast, useUsers } from "@/shared/contexts"
import { UsersThree } from "@/shared/components/ui/icons"
import Link from "next/link"
import { convertTimestamp } from "@/shared/utils"

export const FollowersModal: React.FC<{
  status: boolean
  onStatusChange: (value: boolean) => void
  user: IUser
}> = ({ status, onStatusChange, user }) => {
  const { addToast } = useToast()
  const { listFollowers } = useUsers()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [paginationData, setPaginationData] = useState<{
    currentPage: number
    lastPage: undefined | number
    pageSize: number
    totalItems: number | undefined
  }>({
    currentPage: 1,
    lastPage: undefined,
    pageSize: 1,
    totalItems: undefined,
  })
  const followers = user.followers ?? []

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      await listFollowers({
        userId: user.id,
        currentPage: paginationData.currentPage,
        pageSize: paginationData.pageSize,
      })
        .then((res) => {
          setPaginationData((prev) => ({
            ...prev,
            lastPage: res.totalPages,
            totalItems: res.totalItems,
          }))
        })
        .catch((error) => {
          addToast(error.message, "error", 45)
        })
        .finally(() => setIsLoading(false))
    })()
  }, [paginationData.currentPage])

  return (
    <ModalWrapper
      title="Followers"
      status={status}
      onStatusChange={onStatusChange}
    >
      <div className="border-b pb-2 -mt-2 border-border shadow-md shadow-black/50  w-full z-[200] bg-background"></div>
      <div className="w-[700px] p-2">
        {followers.length === 0 && (
          <EmptyState description="The void responds with silence... but one day, the first adept will hear its call.">
            {isLoading ? <Loader /> : <UsersThree />}
          </EmptyState>
        )}
        <div className="space-y-2">
          {followers.map((follower) => (
            <Link
              href={`/profile/${follower.username}`}
              key={follower.id}
              className="flex bg-ashes p-2 cursor-pointer select-none border border-border rounded-lg z-20 items-center gap-x-2"
            >
              <UserAvatar
                name={follower.name}
                username={follower.username}
                avatarUrl={follower.avatarUrl}
              />
              <div className="flex flex-col">
                <span className="block  whitespace-nowrap text-lg font-bold -tracking-wide">
                  {follower.name}
                </span>
                <span className="text-gray-400 whitespace-nowrap -mt-2 block text-sm">
                  #{follower.username}
                </span>
              </div>
              <div className="ml-auto text-sm flex flex-col text-gray-400">
                {convertTimestamp(follower.createdAt)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </ModalWrapper>
  )
}
