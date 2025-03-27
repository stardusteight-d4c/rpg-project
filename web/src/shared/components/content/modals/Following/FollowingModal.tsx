"use client"

import React, { useEffect, useState } from "react"
import {
  EmptyState,
  Loader,
  ModalWrapper,
  Pagination,
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
  const [currentPage, setCurrentPage] = useState(1)
  const [paginationData, setPaginationData] = useState<{
    lastPage: number
    pageSize: number
    totalItems: number | undefined
  }>({
    lastPage: 1,
    pageSize: 5,
    totalItems: undefined,
  })
  const followings = user.following ?? []
  const startIndex = (currentPage - 1) * paginationData.pageSize
  const endIndex = startIndex + paginationData.pageSize
  const paginationFollowings = followings.slice(startIndex, endIndex)

  useEffect(() => {
    ;(async () => {
      if (isLoadingList) return
      const { lastPage } = paginationData
      if (currentPage <= lastPage) {
        setIsLoadingList(true)
        await listFollowing({
          userId: user.id,
          currentPage,
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
      }
    })()
  }, [currentPage])

  const onUnfollow = async (userId: string) => {
    if (isLoadingUnfollow) return
    setIsLoadingUnfollow(true)
    await unfollow(userId, currentSession!.id)
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
      quantity={paginationData.totalItems ?? 0}
    >
      <div className="border-b pb-2 -mt-2 border-border shadow-md shadow-black/50  w-full z-[200] bg-background"></div>
      <div className="w-[700px] p-2">
        {followings.length === 0 && (
          <EmptyState description="Not even the most insane occultists walk alone, there's always something whispering in the dark.">
            <LinkIcon />
          </EmptyState>
        )}
        <div className="space-y-2">
          {paginationFollowings.map((following) => (
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

          {followings.length !== 0 && (
            <Pagination
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              totalPages={paginationData.lastPage}
            />
          )}
        </div>
      </div>
    </ModalWrapper>
  )
}
