import React, { useEffect, useState } from "react"
import { usePosts, useToast } from "@/shared/contexts"
import { Components } from "./components"

export const Posts: React.FC<{ user: IUser }> = ({ user }) => {
  const { getByUser, lastRequestProfilePostsData } = usePosts()
  const { addToast } = useToast()
  const [posts, setPosts] = useState<{
    firstColumn: IPost[]
    secondColumn: IPost[]
  }>({ firstColumn: [], secondColumn: [] })
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [lastPage, setLastPage] = useState<number>(1)
  const [request, setRequest] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState<boolean>(false)

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
      setPosts({
        firstColumn: getUniqueFilteredPosts(cachedPostsRequestData.items, true),
        secondColumn: getUniqueFilteredPosts(
          cachedPostsRequestData.items,
          false
        ),
      })
    }

    setIsMounted(true)
  }, [lastRequestProfilePostsData])

  useEffect(() => {
    ;(async () => {
      if (isLoading || !isMounted) return null

      setIsLoading(true)
      getByUser({
        ownerId: user.id,
        currentPage: 1,
        pageSize: 4 * currentPage,
      })
        .then((postsPagination) => {
          setLastPage(postsPagination.totalPages)
        })
        .catch((error) => addToast(error.message, "error"))
        .finally(() => setIsLoading(false))
    })()
  }, [request])

  window.onscroll = () => {
    if (
      Math.ceil(window.innerHeight + window.scrollY) >=
      Math.ceil(document.body.offsetHeight)
    ) {
      if (!isLoading && isMounted && currentPage < lastPage) {
        setCurrentPage((prev) => prev + 1)
        setRequest((prev) => !prev)
      }
    }
  }

  const isEmpty =
    !isLoading &&
    (lastRequestProfilePostsData.get(user.id) === undefined ||
      lastRequestProfilePostsData.get(user.id)?.items.length === 0)

  return (
    <div>
      <Components.Heading />
      <Components.Empty isEmpty={isEmpty} />
      <Components.View isEmpty={isEmpty} posts={posts} />
      <Components.Loading isLoading={isLoading} />
    </div>
  )
}
