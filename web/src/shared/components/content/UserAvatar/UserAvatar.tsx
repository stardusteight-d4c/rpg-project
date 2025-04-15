import { getNameInitials } from "@/shared/utils"
import Link from "next/link"

export const UserAvatar: React.FC<{
  name: string
  username: string
  avatarUrl: string | undefined
  size?: number
  border?: boolean
  fontSize?: number
  bgColor?: "background" | "border"
  cursor?: "pointer" | "default"
}> = ({
  name,
  username,
  avatarUrl,
  size = 48,
  fontSize = 24,
  border = false,
  bgColor = "background",
  cursor = "pointer",
}) => {
  return avatarUrl ? (
    <Link href={`/profile/${username}`}>
      <img
        src={avatarUrl}
        alt={`${name.toLowerCase().replace(/\s+/g, "")}/avatar`}
        referrerPolicy="no-referrer"
        style={{
          width: size,
          height: size,
          minWidth: size,
          minHeight: size,
          cursor,
        }}
        className={`${
          border && " border-[2px] border-background shadow-md shadow-black/50 "
        } aspect-square object-cover rounded-full`}
      />
    </Link>
  ) : (
    <Link href={`/profile/${username}`}>
      <div
        style={{
          width: size,
          height: size,
          cursor,
          fontSize,
        }}
        className={`${
          bgColor === "background" ? " bg-background " : " bg-border "
        } ${
          border && " border-[2px] border-background shadow-md shadow-black/50 "
        } font-bold text-white flex items-center justify-center aspect-square border border-border rounded-full`}
      >
        {getNameInitials(name)}
      </div>
    </Link>
  )
}
