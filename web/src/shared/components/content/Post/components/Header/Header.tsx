import { timeago } from "@/shared/utils"
import { UserAvatar } from "@/shared/components/content/UserAvatar"

export const Header: React.FC<{ post: IPost }> = ({ post }) => {
  return (
    <div className="flex px-4 z-20 items-center gap-x-2">
      <div className="flex items-center gap-x-2">
        <UserAvatar
          name={post.owner.name}
          username={post.owner.username}
          avatarUrl={post.owner.avatarUrl}
        />

        <div className="flex flex-col">
          <span className="block whitespace-nowrap text-lg font-bold -tracking-wide">
            {post.owner.name}
          </span>
          <span className="text-gray-400 -mt-2 block text-sm">
            #{post.owner.username}
          </span>
        </div>
      </div>
     
      <div className="ml-auto text-gray-500/80 select-none flex items-center gap-x-[2px] mt-1 w-full justify-end">
        <span className="text-xs block">{timeago(post.createdAt)}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#6b7280"
          viewBox="0 0 256 256"
        >
          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
        </svg>
      </div>
    </div>
  )
}
