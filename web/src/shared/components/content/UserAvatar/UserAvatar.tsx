import { getNameInitials } from "@/shared/utils"
import Link from "next/link"

export const UserAvatar: React.FC<{
  name: string
  username: string
  avatarUrl: string | undefined
  size?: number
  fontSize?: number
  bgColor?: "background" | "button"
  cursor?: "pointer" | "default"
}> = ({
  name,
  username,
  avatarUrl,
  size = 48,
  fontSize = 24,
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
        className="aspect-square object-cover rounded-full"
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
          bgColor === "background" ? " bg-background " : " bg-button "
        } font-bold text-white flex items-center justify-center aspect-square border border-border rounded-full`}
      >
        {getNameInitials(name)}
      </div>
    </Link>
  )
}
