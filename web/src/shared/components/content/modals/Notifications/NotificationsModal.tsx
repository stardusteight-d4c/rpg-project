import React, { PropsWithChildren, useEffect, useState } from "react"
import { ModalWrapper } from "@/shared/components/ui"
import { useAuth, useNotifications, useToast } from "@/shared/contexts"
import { Components } from "./components"

export const NotificationsModal: React.FC<{
  status: boolean
  onStatusChange: (value: boolean) => void
}> = ({ status, onStatusChange }) => {
  const { currentSession } = useAuth()
  const { addToast } = useToast()
  const { notify, listNotifications } = useNotifications()
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [paginationData, setPaginationData] = useState<{
    lastPage: number
    pageSize: number
    totalItems: number | undefined
  }>({
    lastPage: 10,
    pageSize: 5,
    totalItems: undefined,
  })
  const cachedNotify = notify.get(currentSession!.id) ?? {
    notifications: [],
    viewed: true
  }
  const startIndex = (currentPage - 1) * paginationData.pageSize
  const endIndex = startIndex + paginationData.pageSize
  const paginationNotifications = cachedNotify!.notifications.slice(
    startIndex,
    endIndex
  )

  console.log({notify});
  

  useEffect(() => {
    ;(async () => {
      if (isLoading) return
      const { lastPage } = paginationData
      if (!currentSession) return
      if (currentPage <= lastPage) {
        setIsLoading(true)
        await listNotifications({
          recipientId: currentSession.id,
          currentPage,
          pageSize: paginationData.pageSize,
          navbar: false,
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
      title="Notifications"
      status={status}
      onStatusChange={onStatusChange}
    >
      <Wrapper>
        <Components.Empty length={paginationNotifications.length} />
        <Components.View
          notifications={Array.from(paginationNotifications.values())}
        />
        <Components.Pagination
          length={paginationNotifications.length}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={paginationData.lastPage}
          className="mt-2"
        />
      </Wrapper>
    </ModalWrapper>
  )
}

export const Wrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-[700px]">
      <div className="border-b pb-2 -mt-2 border-border shadow-md shadow-black/50  w-full z-[200] bg-background"></div>
      <div className="p-2 w-[700px]">{children}</div>
    </div>
  )
}
