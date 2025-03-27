"use client"

import React, { Fragment, useEffect, useState } from "react"
import { ModalWrapper } from "@/shared/components/ui"
import { useUsers, useToast } from "@/shared/contexts"
import { Components } from "./components"

export const FollowingModal: React.FC<{
  status: boolean
  onStatusChange: (value: boolean) => void
  user: IUser
}> = ({ status, onStatusChange, user }) => {
  const { addToast } = useToast()
  const { listFollowing } = useUsers()
  const [isLoading, setIsLoading] = useState<boolean>(false)
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
      if (isLoading) return
      const { lastPage } = paginationData
      if (currentPage <= lastPage) {
        setIsLoading(true)
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
          .finally(() => setIsLoading(false))
      }
    })()
  }, [currentPage])

  return (
    <ModalWrapper
      title="Following"
      status={status}
      onStatusChange={onStatusChange}
      quantity={user.totalFollowing}
    >
      <Wrapper>
        <Components.Empty
          length={paginationFollowings.length}
          isLoading={isLoading}
        />
        <Components.View following={paginationFollowings} user={user} />
        <Components.Pagination
          length={paginationFollowings.length}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={paginationData.lastPage}
          className="mt-2"
        />
      </Wrapper>
    </ModalWrapper>
  )
}

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Fragment>
      <div className="border-b pb-2 -mt-2 border-border shadow-md shadow-black/50  w-full z-[200] bg-background"></div>
      <div className="w-[700px] p-2">{children}</div>
    </Fragment>
  )
}
