import { UserAvatar } from "@/shared/components/content/UserAvatar"
import { Button, ModalWrapper } from "@/shared/components/ui"
import { UserCircleMinus, UserCirclePlus } from "@/shared/components/ui/icons"
import { useAuth, useToast, useUsers } from "@/shared/contexts"
import { Fragment } from "react"

export const OwnerModal: React.FC<{
  user: IUser
  status: boolean
  onStatusChange: (value: boolean) => void
}> = ({ user, status, onStatusChange }) => {
  const { currentSession } = useAuth()
  const { follow, unfollow, cachedUsers } = useUsers()
  const { addToast } = useToast()
  const followers = cachedUsers.get(user.username)?.followers ?? []
  const isFollowing = followers.some(
    (follower) => follower.id === currentSession?.id
  )

  const onFollow = async () => {
    await follow(user.id, currentSession!.id).catch((error) => {
      addToast(error.message, "error", 45)
    })
  }

  const onUnfollow = async () => {
    await unfollow(user.id, currentSession!.id).catch((error) => {
      addToast(error.message, "error", 45)
    })
  }

  return (
    <ModalWrapper onStatusChange={onStatusChange} status={status}>
      <div className="px-4 py-8 w-[500px] relative">
        <div className="flex flex-col items-center mt-4 gap-y-2 justify-center">
          <UserAvatar {...user} size={100} fontSize={42} />
          <div className="flex flex-col items-center justify-center">
            <span className="text-4xl background-gradient text-transparent bg-clip-text w-fit font-bold">
              {user.name}
            </span>
            <span className="text-gray-400 text-lg -mt-1">#{user.username}</span>
          </div>
          {user.id !== currentSession?.id && (
            <Fragment>
              {isFollowing ? (
                <Button
                  action={onUnfollow}
                  variant="textWithIcon"
                  title="Unfollow"
                  bgColor="red"
                  className="p-2 border border-border hover:!border-transparent"
                >
                  <UserCircleMinus />
                </Button>
              ) : (
                <Button
                  action={onFollow}
                  variant="textWithIcon"
                  title="Follow"
                  bgColor="gradientBlue"
                  className="p-2 border border-border hover:!border-transparent"
                >
                  <UserCirclePlus />
                </Button>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </ModalWrapper>
  )
}
