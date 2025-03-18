import React, { useEffect, useState } from "react"
import { Post } from "@/shared/components/content"
import { DataFetcher, EmptyState, Heading } from "@/shared/components/ui"
import { usePosts, useToast } from "@/shared/contexts"
import { Notepad } from "@/shared/components/ui/icons"

export const Posts: React.FC<{ user: IUser }> = ({ user }) => {
  const { getByUser, lastRequestProfilePostsData } = usePosts()
  const { addToast } = useToast()
  const [userPostsI, setUserPostsI] = useState<IPost[]>([])
  const [userPostsII, setUserPostsII] = useState<IPost[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [lastPage, setLastPage] = useState<number>(10)
  const [request, setRequest] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [mounted, setMounted] = useState<boolean>(false)

  function getUniqueFilteredPosts(posts: IPost[], isEvenIndex: boolean) {
    const uniquePosts = new Map(
      posts
        .filter((_, index) => (index % 2 === 0) === isEvenIndex)
        .map((post) => [post.id, post])
    )
    return Array.from(uniquePosts.values())
  }

  useEffect(() => {
    const cachedPostsRequestData = lastRequestProfilePostsData.get(user.id)

    if (cachedPostsRequestData) {
      setUserPostsI(getUniqueFilteredPosts(cachedPostsRequestData.items, true))
      setUserPostsII(
        getUniqueFilteredPosts(cachedPostsRequestData.items, false)
      )
    }

    setMounted(true)
  }, [lastRequestProfilePostsData])

  useEffect(() => {
    ;(async () => {
      if (loading || !mounted) return null

      setLoading(true)
      getByUser({
        ownerId: user.id,
        currentPage: 1,
        pageSize: 4 * currentPage,
      })
        .then((postsPagination) => {
          setLastPage(postsPagination.totalPages)
        })
        .catch((error) => addToast(error.message, "error"))
        .finally(() => setLoading(false))
    })()
  }, [request])

  window.onscroll = () => {
    if (
      Math.ceil(window.innerHeight + window.scrollY) >=
      Math.ceil(document.body.offsetHeight)
    ) {
      if (!loading && mounted && currentPage < lastPage) {
        setCurrentPage((prev) => prev + 1)
        setRequest((prev) => !prev)
      }
    }
  }

  const isEmptyStateRendering =
    !loading &&
    (lastRequestProfilePostsData.get(user.id) === undefined ||
      lastRequestProfilePostsData.get(user.id)?.items.length === 0)

  return (
    <div>
      <Heading title="Posts" className="mb-2">
        <Notepad />
      </Heading>
      {isEmptyStateRendering ? (
        <EmptyState description="In the beginning, there was chaos. Now there's just this blank space.">
          <Notepad />
        </EmptyState>
      ) : (
        <div>
          <div className="flex items-start justify-start rounded-xl w-full gap-4">
            <div className="flex flex-col gap-4">
              {userPostsI.map((post) => (
                <div
                  key={post.id}
                  className="max-w-[632px] h-fit min-w-[632px] w-full relative rounded-xl"
                >
                  <Post post={post} />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              {userPostsII.map((post) => (
                <div
                  key={post.id}
                  className="max-w-[632px] h-fit min-w-[632px] w-full relative rounded-xl"
                >
                  <Post post={post} />
                </div>
              ))}
            </div>
          </div>
          {loading && (
            <div className="flex mt-44 items-center justify-center w-full">
              <DataFetcher />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
