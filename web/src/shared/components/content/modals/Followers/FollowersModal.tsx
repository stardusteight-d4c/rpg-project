"use client"

import React, { Fragment, useEffect, useState } from "react"
import { ModalWrapper } from "@/shared/components/ui"
import { useToast, useUsers } from "@/shared/contexts"
import { Components } from "./components"

export const FollowersModal: React.FC<{
  status: boolean
  onStatusChange: (value: boolean) => void
  user: IUser
}> = ({ status, onStatusChange, user }) => {
  const { addToast } = useToast()
  const { listFollowers } = useUsers()
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
  const followers = user.followers ?? []
  const startIndex = (currentPage - 1) * paginationData.pageSize
  const endIndex = startIndex + paginationData.pageSize
  const paginationFollowers = followers.slice(startIndex, endIndex)

  useEffect(() => {
    ;(async () => {
      if (isLoading) return
      const { lastPage } = paginationData
      if (currentPage <= lastPage) {
        setIsLoading(true)
        await listFollowers({
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
      title="Followers"
      status={status}
      onStatusChange={onStatusChange}
      quantity={user.totalFollowers}
    >
      <Wrapper>
        <Components.Empty
          length={paginationFollowers.length}
          isLoading={isLoading}
        />
        <Components.View followers={paginationFollowers} />
        <Components.Pagination
          length={paginationFollowers.length}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={paginationData.lastPage}
          className="mt-2"
        />
      </Wrapper>
    </ModalWrapper>
  )
}

export const Wrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Fragment>
      <div className="border-b pb-2 -mt-2 border-border shadow-md shadow-black/50  w-full z-[200] bg-background"></div>
      <div className="w-[700px] p-2">{children}</div>
    </Fragment>
  )
}
