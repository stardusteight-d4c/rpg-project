import React, { Fragment, useState } from "react"
import {
  EditProfileModal,
  FollowersModal,
  FollowingModal,
} from "@/shared/components/content/modals"
import {
  Link,
  PencilSimpleLine,
  UserCircleMinus,
  UserCirclePlus,
  UsersThree,
} from "@/shared/components/ui/icons"
import { Button } from "@/shared/components/ui"
import { useAuth, useToast, useUsers } from "@/shared/contexts"

export const Actions: React.FC<{ user: IUser }> = ({ user }) => {
  const { currentSession } = useAuth()
  const { follow, unfollow, cachedUsers } = useUsers()
  const { addToast } = useToast()
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false)
  const [isOpenFollowingModal, setIsOpenFollowingModal] =
    useState<boolean>(false)
  const [isOpenFollowersModal, setIsOpenFollowersModal] =
    useState<boolean>(false)
  const followers = cachedUsers.get(user.username)?.followers ?? []
  const isFollowing = followers.some((follower) => follower.id === currentSession?.id);

  const onFollow = async () => {
    await follow(user.id, currentSession!.id)
      .then((updatedUser) => {
        // updatedUser && updateSession(updatedUser)
      })
      .catch((error) => {
        addToast(error.message, "error", 45)
      })
  }

  const onUnfollow = async () => {
    await unfollow(user.id, currentSession!.id)
      .then((updatedUser) => {
        // updatedUser && updateSession(updatedUser)
      })
      .catch((error) => {
        addToast(error.message, "error", 45)
      })
  }

  if (!currentSession) return

  return (
    <Fragment>
      <EditProfileModal
        status={isOpenEditModal}
        onStatusChange={setIsOpenEditModal}
        user={user}
      />
      <FollowingModal
        status={isOpenFollowingModal}
        onStatusChange={setIsOpenFollowingModal}
        user={user}
      />
      <FollowersModal
        status={isOpenFollowersModal}
        onStatusChange={setIsOpenFollowersModal}
        user={user}
      />
      <div className="absolute w-full  -top-[55px] left-[0px] flex items-center gap-x-2">
        {user.id !== currentSession.id && (
          <Fragment>
            {isFollowing ? (
              <Button
                action={onUnfollow}
                variant="textIcon"
                title="Unfollow"
                bgColor="red"
                className="p-2"
              >
                <UserCircleMinus />
              </Button>
            ) : (
              <Button
                action={onFollow}
                variant="textIcon"
                title="Follow"
                bgColor="gradientBlue"
                className="p-2"
              >
                <UserCirclePlus />
              </Button>
            )}
          </Fragment>
        )}
        <Button
          action={() => setIsOpenFollowingModal(true)}
          variant="textIcon"
          title="Following"
          bgColor="gradientBlue"
          className="p-2"
        >
          <Link />
        </Button>
        <Button
          action={() => setIsOpenFollowersModal(true)}
          variant="textIcon"
          title="Followers"
          bgColor="gradientBlue"
          className="p-2"
        >
          <UsersThree />
        </Button>
        {currentSession.id === user.id && (
          <Button
            action={() => setIsOpenEditModal(true)}
            variant="icon"
            title="Edit Profile"
            bgColor="gradientBlue"
            className="p-2"
          >
            <PencilSimpleLine />
          </Button>
        )}
      </div>
    </Fragment>
  )
}
