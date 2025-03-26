import Link from "next/link"
import { UserAvatar } from "@/shared/components/content"

export const Users: React.FC<{
  searchType: "campaign" | "user"
  users: IUser[]
}> = ({ searchType, users }) => {
  if (searchType !== "user" && users.length === 0) return null

  return (
    <div className="space-y-2 mb-2">
      {users.map((user) => (
        <Link
          key={user.id}
          href={`/profile/${user.username}`}
          className="flex p-2 cursor-pointer select-none border border-border bg-ashes rounded-lg z-20 items-center gap-x-2"
        >
          <UserAvatar
            name={user.name}
            username={user.username}
            avatarUrl={user.avatarUrl}
          />
          <div className="flex flex-col">
            <span className="block text-lg font-bold -tracking-wide">
              {user.name}
            </span>
            <span className="text-gray-400 -mt-2 block text-sm">
              #{user.username}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
