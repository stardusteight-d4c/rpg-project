"use client"

import React, { useEffect, useState } from "react"
import { useSheets, useToast } from "@/shared/contexts"
import { Components } from "./components"

export const Sheets: React.FC<{ user: IUser }> = ({ user }) => {
  const { lastRequestProfileSheetsData, getSheetsByUser } = useSheets()
  const { addToast } = useToast()
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const sheets = lastRequestProfileSheetsData.get(user.id)?.items ?? []
  const pageSize = 5

  useEffect(() => {
    const existingRequestCachedData = lastRequestProfileSheetsData.get(user.id)
    if (existingRequestCachedData) {
      const calculatedCurrentPage = Math.ceil(
        existingRequestCachedData.items.length / pageSize
      )
      setCurrentPage(calculatedCurrentPage)
    }
  }, [lastRequestProfileSheetsData])

  useEffect(() => {
    ;(async () => {
      if (isLoading) return
      if (currentPage <= lastPage) {
        setIsLoading(true)
        await getSheetsByUser({ ownerId: user.id, pageSize })
          .then((res) => {
            if (res) {
              setLastPage(res.totalPages)
            }
          })
          .catch((error) => addToast(error, "error", 45))
          .finally(() => {
            setIsLoading(false)
          })
      }
    })()
  }, [user, currentPage])

  const handlePagination = () => {
    if (isLoading) return null
    if (currentPage <= lastPage && sheets.length >= pageSize) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  return (
    <div>
      <Components.Heading />
      <Components.Empty sheetsLength={sheets.length} />
      <Components.Slider
        userId={user.id}
        sheets={sheets}
        isLoading={isLoading}
        onPagination={handlePagination}
      />
    </div>
  )
}
