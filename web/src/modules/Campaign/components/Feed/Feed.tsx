"use client"

import { useEffect, useState } from "react"
import { Post, UserAvatar } from "@/shared/components/content"
import {
  CreatePostInput,
  DataFetcher,
  EmptyState,
  GradientSVGWrapper,
  Pagination,
} from "@/shared/components/ui"
import { usePosts, useSheets, useToast } from "@/shared/contexts"
import { CrownSimple, Notepad } from "@/shared/components/ui/icons"
import { SheetModal } from "@/shared/components/content/modals"

export const Feed: React.FC<{ campaign: ICampaign }> = ({ campaign }) => {
  const { getByCampaign, lastRequestCampaignPostsData } = usePosts()
  const { addToast } = useToast()
  const { tableSheets } = useSheets()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [posts, setPosts] = useState<IPost[]>([])
  const [selectedSheet, setSelectedSheet] = useState<ISheet | null>(null)

  const sheets = tableSheets.get(campaign.tableId)?.sheets ?? []
  const sheetsOwnersId = sheets.map((sheet) => sheet.owner.id)
  const playersWithoutActiveSheet = campaign.players.find(
    (player) => !sheetsOwnersId.includes(player.id)
  )

  console.log('playersWithoutActiveSheet', playersWithoutActiveSheet);
  

  const handleOpenSheetModal = (value: boolean) => {
    if (!value) {
      setSelectedSheet(null)
    }
  }

  useEffect(() => {
    const existingPostCampaignRequestData = lastRequestCampaignPostsData.get(
      campaign.id
    )
    if (existingPostCampaignRequestData) {
      const itemsPerPage = 4
      const startIndex = (currentPage - 1) * itemsPerPage
      const minRequiredItems = currentPage * itemsPerPage - (itemsPerPage - 1)
      if (existingPostCampaignRequestData.items.length >= minRequiredItems) {
        const paginatedItems = existingPostCampaignRequestData.items.slice(
          startIndex,
          startIndex + itemsPerPage
        )
        setTotalPages(existingPostCampaignRequestData.totalPages)
        setPosts(paginatedItems)
        return
      } else {
        ;(async () => {
          if (isLoading) return
          setIsLoading(true)
          await getByCampaign({
            campaignId: campaign.id,
            currentPage,
            pageSize: 4,
          })
            .then((postsPagination) => {
              setTotalPages(postsPagination.totalPages)
            })
            .catch((error) => {
              addToast(error, "error", 45)
            })
            .finally(() => {
              setIsLoading(false)
            })
        })()
      }
    }
  }, [campaign.id, lastRequestCampaignPostsData, currentPage])

  return (
    <div className="col-span-1 w-full">
      <SheetModal
        status={selectedSheet ? true : false}
        onStatusChange={handleOpenSheetModal}
        sheet={selectedSheet!}
      />

      <div className="w-full">
        <div className="flex flex-col gap-y-4 ">
          {sheets.length !== 0 && (
            <div className="flex border bg-ashes border-border rounded-xl p-4 flex-col gap-4 flex-wrap">
              {sheets.map((sheet) => (
                <div className="grid grid-cols-2 gap-x-2">
                  <div className="col-span-1 flex select-none z-20 items-center gap-x-2">
                    <UserAvatar
                      name={sheet.owner.name}
                      username={sheet.owner.username}
                      avatarUrl={sheet.owner.avatarUrl}
                    />
                    <div className="flex flex-col">
                      <span className="flex items-center gap-x-2 text-lg font-bold -tracking-wide">
                        {sheet.owner.name}{" "}
                        <GradientSVGWrapper size={18}>
                          <CrownSimple />
                        </GradientSVGWrapper>
                      </span>
                      <span className="text-gray-400 -mt-2 block text-sm">
                        #{sheet.owner.username}
                      </span>
                    </div>
                  </div>
                  <div
                    onClick={() => setSelectedSheet(sheet)}
                    className="flex cursor-pointer w-fit z-20 items-center gap-x-2"
                  >
                    <img
                      src={sheet.infos.characterUrl}
                      referrerPolicy="no-referrer"
                      className="aspect-square w-[48px] h-[48px] object-cover rounded-full"
                    />

                    <div className="flex flex-col">
                      <span className="block whitespace-nowrap background-gradient w-fit bg-clip-text text-transparent text-lg font-bold -tracking-wide">
                        {sheet.infos.name}
                      </span>
                      <span className="text-gray-400 -mt-2 block text-sm">
                        {sheet.infos.occupation}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <CreatePostInput currentPage={currentPage} />
          {posts.length === 0 ? (
            <EmptyState description="The cosmic void awaits... but so far, no echoes of sanity or madness have been recorded.">
              <Notepad />
            </EmptyState>
          ) : (
            <div>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center mt-[150px] py-8">
                  <DataFetcher />
                </div>
              ) : (
                <div className="flex flex-col gap-y-4 mb-4 rounded-3xl w-full">
                  {posts.map((post) => (
                    <Post key={post.id} post={post} />
                  ))}
                </div>
              )}
              <Pagination
                length={posts.length}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
