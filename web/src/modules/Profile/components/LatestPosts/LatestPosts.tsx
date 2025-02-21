import { usePosts } from "@/shared/contexts/Posts/PostsContext"
import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Post } from "@/modules/Feed/components/Post/Post"
import { div } from "framer-motion/client"

export const LatestPosts: React.FC<{ user: IUser }> = ({ user }) => {
  const { getByUser } = usePosts()
  const [userPosts, setUserPosts] = useState<IPost[]>([])
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ;(async () => {
      getByUser({ ownerId: user.id }).then((posts) => {
        setUserPosts(posts.items)
      })
    })()
  }, [])

  return (
    <div>
      <h2 className="text-3xl pointer-events-none font-bold mb-2">
        Latest Posts
      </h2>
      {userPosts.length === 0 ? (
        <div className="w-full flex items-center justify-center">
          <div className="p-8 w-full border-2 h-[230px] border-dashed border-border rounded-xl flex flex-col items-center justify-center">
            <div className="col-span-1 w-[50px] h-[50px] flex items-center justify-center bg-border/50 border border-border rounded aspect-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#9ca3af"
                viewBox="0 0 256 256"
              >
                <path d="M42.76,50A8,8,0,0,0,40,56V224a8,8,0,0,0,16,0V179.77c26.79-21.16,49.87-9.75,76.45,3.41,16.4,8.11,34.06,16.85,53,16.85,13.93,0,28.54-4.75,43.82-18a8,8,0,0,0,2.76-6V56A8,8,0,0,0,218.76,50c-28,24.23-51.72,12.49-79.21-1.12C111.07,34.76,78.78,18.79,42.76,50ZM216,172.25c-26.79,21.16-49.87,9.74-76.45-3.41-25-12.35-52.81-26.13-83.55-8.4V59.79c26.79-21.16,49.87-9.75,76.45,3.4,25,12.35,52.82,26.13,83.55,8.4Z"></path>
              </svg>
            </div>
            <span className="text-gray-400 block mt-2 w-[400px] text-center">
              The Ancient Whispers talk about great narrators… do you know any?
              Or do you just fear what hides in the shadows?
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-start w-full gap-4">
          {userPosts.map((post, index) => (
              <div key={post.id} className="max-w-[636px] min-w-[636px] w-full relative">
                <Post post={post} />
              </div>
          ))}
        </div>
      )}
    </div>
    // <div>
    //   <h2 className="text-3xl pointer-events-none font-bold mb-2">
    //     Latest Posts
    //   </h2>
    //   <div className="grid grid-cols-2 items-center flex-wrap w-full gap-4">
    //     {userPosts.map((post) => (
    //       <Post key={post.id} post={post} />
    //     ))}
    //   </div>
    // </div>
  )
}
