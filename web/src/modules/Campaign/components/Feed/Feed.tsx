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
import { usePosts, useToast } from "@/shared/contexts"
import { CrownSimple, Notepad } from "@/shared/components/ui/icons"

export const Feed: React.FC<{ campaign: ICampaign }> = ({ campaign }) => {
  const { getByCampaign, campaignPosts, lastRequestCampaignPostsData } =
    usePosts()
  const { addToast } = useToast()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  console.log({ lastRequestCampaignPostsData })

  useEffect(() => {
    ;(async () => {
      if (isLoading) return
      setIsLoading(true)
      getByCampaign({ campaignId: campaign.id, currentPage, pageSize: 3 })
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
  }, [campaign.id, currentPage])

  return (
    <div className="col-span-1 w-full">
      <div className="w-full">
        <div className="flex flex-col gap-y-4 ">
          <div className="flex border bg-ashes border-border rounded-xl p-4 flex-col gap-2 flex-wrap">
            <div className="grid grid-cols-2 gap-x-2">
              <div className="col-span-1 flex select-none z-20 items-center gap-x-2">
                <UserAvatar
                  name={campaign.owner.name}
                  username={campaign.owner.username}
                  avatarUrl={campaign.owner.avatarUrl}
                />
                <div className="flex flex-col">
                  <span className="block text-lg font-bold -tracking-wide">
                    {campaign.owner.name}
                  </span>
                  <span className="text-gray-400 -mt-2 block text-sm">
                    #{campaign.owner.username}
                  </span>
                </div>
              </div>
              <div className="flex select-none z-20 items-center gap-x-2">
                <GradientSVGWrapper>
                  <CrownSimple />
                </GradientSVGWrapper>
                <div className="flex flex-col">
                  <span className="block whitespace-nowrap background-gradient w-fit bg-clip-text text-transparent text-lg font-bold -tracking-wide">
                    Keeper of Arcane Lore
                  </span>
                </div>
              </div>
            </div>
          </div>
          <CreatePostInput currentPage={currentPage} />
          {campaignPosts.size === 0 ? (
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
                <div className="flex flex-col gap-y-4 rounded-3xl w-full">
                  {Array.from(campaignPosts.values()).map((post) => (
                    <Post key={post.id} post={post} />
                  ))}
                </div>
              )}
              <Pagination
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
