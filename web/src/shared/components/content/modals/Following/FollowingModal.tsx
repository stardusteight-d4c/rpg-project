"use client"

import React, { useEffect, useState } from "react"
import {
  EmptyState,
  Loader,
  ModalWrapper,
  Tooltip,
} from "@/shared/components/ui"
import { UserAvatar } from "@/shared/components/content"
import { useUsers, useToast, useAuth } from "@/shared/contexts"
import { Link as LinkIcon, UserCircleMinus } from "@/shared/components/ui/icons"
import { convertTimestamp } from "@/shared/utils"
import { useRouter } from "next/navigation"

export const FollowingModal: React.FC<{
  status: boolean
  onStatusChange: (value: boolean) => void
  user: IUser
}> = ({ status, onStatusChange, user }) => {
  const { push } = useRouter()
  const { addToast } = useToast()
  const { listFollowing, unfollow } = useUsers()
  const { currentSession } = useAuth()
  const [isLoadingList, setIsLoadingList] = useState<boolean>(false)
  const [isLoadingUnfollow, setIsLoadingUnfollow] = useState<boolean>(false)
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
  const followings = user.following ?? []

  useEffect(() => {
    ;(async () => {
      setIsLoadingList(true)
      await listFollowing({
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
        .finally(() => setIsLoadingList(false))
    })()
  }, [paginationData.currentPage])

  const onUnfollow = async (userId: string) => {
    setIsLoadingUnfollow(true)
    await unfollow(userId, currentSession!.id)
      .then((updatedUser) => {
        // updatedUser && updateSession(updatedUser)
      })
      .catch((error) => {
        addToast(error.message, "error", 45)
      })
      .finally(() => setIsLoadingUnfollow(false))
  }

  return (
    <ModalWrapper
      title="Following"
      status={status}
      onStatusChange={onStatusChange}
    >
      <div className="border-b pb-2 -mt-2 border-border shadow-md shadow-black/50  w-full z-[200] bg-background"></div>
      <div className="w-[700px] p-2">
        {followings.length === 0 && (
          <EmptyState description="Not even the most insane occultists walk alone, there's always something whispering in the dark.">
            {isLoadingList ? <Loader /> : <LinkIcon />}
          </EmptyState>
        )}
        <div className="space-y-2">
          {followings.map((following) => (
            <div
              key={following.id}
              onClick={(e) => {
                const target = e.target as HTMLElement
                if (target.closest("button")) {
                  e.preventDefault()
                } else {
                  push(`/profile/${following.username}`)
                }
              }}
              className="flex w-full p-2 bg-ashes cursor-pointer select-none border border-border rounded-lg z-20 items-center gap-x-2"
            >
              <UserAvatar
                name={following.name}
                username={following.username}
                avatarUrl={following.avatarUrl}
              />
              <div className="flex flex-col">
                <span className="block  whitespace-nowrap text-lg font-bold -tracking-wide">
                  {following.name}
                </span>
                <span className="text-gray-400 whitespace-nowrap -mt-2 block text-sm">
                  #{following.username}
                </span>
              </div>
              <div className="ml-auto text-sm flex flex-col text-gray-400">
                {convertTimestamp(following.createdAt)}
              </div>
              {currentSession?.id === user.id && (
                <Tooltip text="Unfollow" variant position="left">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onUnfollow(following.id)
                    }}
                    disabled={isLoadingUnfollow}
                    className="bg-red-500 w-[36px] h-[36px] !fill-white text-white disabled:cursor-not-allowed disabled:brightness-90 hover:brightness-110 flex items-center cursor-pointer duration-300 ease-in-out transition-all p-1 rounded-full"
                  >
                    {isLoadingUnfollow ? <Loader /> : <UserCircleMinus />}
                  </button>
                </Tooltip>
              )}
            </div>
          ))}
        </div>
      </div>
    </ModalWrapper>
  )
}
