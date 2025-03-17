"use client"

import { useEffect, useState } from "react"
import { Post, UserAvatar } from "@/shared/components/content"
import {
  CreatePostInput,
  DataFetcher,
  Pagination,
} from "@/shared/components/ui"
import { usePosts, useToast } from "@/shared/contexts"

export const Feed: React.FC<{ campaign: ICampaign }> = ({ campaign }) => {
  const { getByCampaign, campaignPosts } = usePosts()
  const { addToast } = useToast()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="min-w-[48px] bg-background p-2 select-none pointer-events-none min-h-[48px] border border-border aspect-square rounded-full"
                >
                  <path
                    d="M28.8626 9.20037C28.4715 9.00867 28.0281 8.95119 27.601 9.03683C27.174 9.12247 26.787 9.34645 26.5001 9.67412L22.2913 14.2104L17.8163 4.17412C17.8161 4.16996 17.8161 4.16579 17.8163 4.16163C17.6563 3.81456 17.4002 3.52061 17.0783 3.31457C16.7564 3.10852 16.3822 2.99902 16.0001 2.99902C15.6179 2.99902 15.2437 3.10852 14.9218 3.31457C14.5999 3.52061 14.3438 3.81456 14.1838 4.16163C14.184 4.16579 14.184 4.16996 14.1838 4.17412L9.70882 14.2104L5.50007 9.67412C5.21128 9.34639 4.82313 9.12221 4.39493 9.03585C3.96673 8.94949 3.52203 9.00569 3.12878 9.19586C2.73553 9.38604 2.41536 9.69974 2.21718 10.089C2.01901 10.4783 1.95373 10.9218 2.03132 11.3516C2.03132 11.3654 2.03132 11.3779 2.04007 11.3916L4.87507 24.3754C4.96234 24.8326 5.20634 25.245 5.56502 25.5416C5.92371 25.8383 6.37462 26.0005 6.84007 26.0004H25.1613C25.6266 26.0002 26.0772 25.8378 26.4356 25.5412C26.794 25.2446 27.0378 24.8324 27.1251 24.3754L29.9601 11.3916C29.9601 11.3779 29.9601 11.3654 29.9688 11.3516C30.0479 10.9212 29.9822 10.4767 29.7821 10.0876C29.582 9.6984 29.2587 9.38644 28.8626 9.20037ZM25.1688 23.9604L25.1613 24.0004H6.83882L6.83132 23.9604L4.00007 11.0004L4.01757 11.0204L9.26757 16.6754C9.37999 16.7969 9.5208 16.8885 9.67738 16.9422C9.83396 16.9958 10.0014 17.0098 10.1647 16.9828C10.328 16.9557 10.482 16.8886 10.613 16.7874C10.744 16.6862 10.8478 16.5541 10.9151 16.4029L16.0001 5.00038L21.0863 16.4066C21.1536 16.5578 21.2574 16.69 21.3884 16.7912C21.5194 16.8924 21.6734 16.9595 21.8367 16.9865C22 17.0135 22.1674 16.9996 22.324 16.9459C22.4806 16.8923 22.6214 16.8006 22.7338 16.6791L27.9838 11.0241L28.0001 11.0004L25.1688 23.9604Z"
                    fill="url(#paint0_linear_109_5)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_109_5"
                      x1="16.0005"
                      y1="2.99902"
                      x2="16.0005"
                      y2="26.0004"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#42D392" />
                      <stop offset="1" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </svg>
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
            <div className="w-full flex items-center justify-center">
              <div className="p-8 w-full h-[230px] border-2  border-dashed border-border rounded-xl flex flex-col items-center justify-center">
                <div className="col-span-1 w-[50px] h-[50px] flex items-center justify-center bg-border/50 border border-border rounded aspect-square">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="#9ca3af"
                    viewBox="0 0 256 256"
                  >
                    <path d="M168,128a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,128Zm-8,24H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16ZM216,40V200a32,32,0,0,1-32,32H72a32,32,0,0,1-32-32V40a8,8,0,0,1,8-8H72V24a8,8,0,0,1,16,0v8h32V24a8,8,0,0,1,16,0v8h32V24a8,8,0,0,1,16,0v8h24A8,8,0,0,1,216,40Zm-16,8H184v8a8,8,0,0,1-16,0V48H136v8a8,8,0,0,1-16,0V48H88v8a8,8,0,0,1-16,0V48H56V200a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16Z"></path>
                  </svg>
                </div>
                <span className="text-gray-400 block mt-2 w-[400px] text-center">
                  The cosmic void awaits... but so far, no echoes of sanity or
                  madness have been recorded.
                </span>
              </div>
            </div>
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
