import { Post } from "@/shared/components/content"

export const View: React.FC<{
  posts: { firstColumn: IPost[]; secondColumn: IPost[] }
  isEmpty: boolean
}> = ({ posts, isEmpty }) => {
  if (isEmpty) return

  return (
    <div className="flex items-start justify-start rounded-xl w-full gap-4">
      <div className="flex flex-col gap-4">
        {posts.firstColumn.map((post) => (
          <div
            key={post.id}
            className="max-w-[632px] h-fit min-w-[632px] w-full relative rounded-xl"
          >
            <Post post={post} />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {posts.secondColumn.map((post) => (
          <div
            key={post.id}
            className="max-w-[632px] h-fit min-w-[632px] w-full relative rounded-xl"
          >
            <Post post={post} />
          </div>
        ))}
      </div>
    </div>
  )
}
