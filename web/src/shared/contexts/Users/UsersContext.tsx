"use client"

import React, { createContext, useContext, ReactNode, useState } from "react"
import { MockAPI } from "@/shared/requests/MockAPI"

interface UsersState {
  cachedUsers: Map<string, IUser>
  update: (updatedUser: Partial<IUser>) => Promise<IUser>
  follow(followedUserId: string, followingUserId: string): Promise<void>
  unfollow(followedUserId: string, followingUserId: string): Promise<void>
  findByUsername: (username: string) => Promise<IUser>
  listByUsername: (username: string) => Promise<IUser[]>
  listFollowers(
    queryParams: FollowQueryParams
  ): Promise<ListResponseDTO<Follow>>
  listFollowing(
    queryParams: FollowQueryParams
  ): Promise<ListResponseDTO<Follow>>
}

const UsersContext = createContext<UsersState | undefined>(undefined)

export const UsersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const api = new MockAPI().initializeRoutes()
  const [cachedUsers, setCachedUsers] = useState<Map<string, IUser>>(new Map())

  const updateCachedUsers = (users: IUser[]) => {
    setCachedUsers((prev) => {
      const newCache = new Map(prev)
      users.forEach((updatedUser) => {
        const existingUser = newCache.get(updatedUser.username)
        if (existingUser) {
          newCache.set(updatedUser.username, {
            ...existingUser,
            ...updatedUser,
          })
        } else {
          newCache.set(updatedUser.username, updatedUser)
        }
      })
      return newCache
    })
  }

  const findByUsername = async (username: string) => {
    const findCachedUser = Array.from(cachedUsers.values()).find(
      (user) => user.username === username
    )
    if (findCachedUser) return findCachedUser
    return api.user
      .list({ username })
      .then((user) => {
        if (user[0]) updateCachedUsers([user[0]])
        return user[0]
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const listByUsername = async (username: string) => {
    return await api.user
      .list({ username, search: true })
      .then((usersFound) => {
        updateCachedUsers(usersFound)
        return usersFound
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const update = async (updatedUser: Partial<IUser>) => {
    return api.user
      .update(updatedUser)
      .then((user) => {
        updateCachedUsers([user])
        return user
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const follow = async (followedUserId: string, followingUserId: string) => {
    return api.user
      .follow(followedUserId, followingUserId)
      .then(({ followed, following }) => {
        const followedUser = cachedUsers.get(followed.username)
        const followingUser = cachedUsers.get(following.username)
        if (followedUser) {
          setCachedUsers((prev) => {
            const updateCache = new Map(prev)
            updateCache.set(followedUser.username, {
              ...followedUser,
              totalFollowers: followedUser.totalFollowers! + 1,
              followers: followedUser.followers
                ? [following, ...followedUser.followers]
                : [following],
            })
            return updateCache
          })
        }
        if (followingUser) {
          setCachedUsers((prev) => {
            const updateCache = new Map(prev)
            updateCache.set(followingUser.username, {
              ...followingUser,
              totalFollowing: followingUser.totalFollowing! + 1,
              following: followingUser.following
                ? [followed, ...followingUser.following]
                : [followed],
            })
            return updateCache
          })
        }
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const unfollow = async (followedUserId: string, followingUserId: string) => {
    return api.user
      .unfollow(followedUserId, followingUserId)
      .then(() => {
        setCachedUsers((prev) => {
          const updateCache = new Map(prev)
          const followedUser = updateCache
            .values()
            .find((user) => user.id === followedUserId)
          const followingUser = updateCache
            .values()
            .find((user) => user.id === followingUserId)
          if (followedUser) {
            updateCache.set(followedUser.username, {
              ...followedUser,
              totalFollowers:
                followedUser.totalFollowers !== 0
                  ? followedUser.totalFollowers! - 1
                  : 0,
              followers: followedUser.followers?.filter(
                (f) => f.id !== followingUserId
              ),
            })
          }
          if (followingUser) {
            updateCache.set(followingUser.username, {
              ...followingUser,
              totalFollowing:
                followingUser.totalFollowing !== 0
                  ? followingUser.totalFollowing! - 1
                  : 0,
              following: followingUser.following?.filter(
                (f) => f.id !== followedUserId
              ),
            })
          }
          return updateCache
        })
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const listFollowers = async (queryParams: FollowQueryParams) => {
    const { userId } = queryParams
    if (!userId) throw new Error("[listFollowers] userId is required.")
    return api.user
      .followers(queryParams)
      .then((followersList) => {
        const existingCachedUser = cachedUsers
          .values()
          .find((user) => user.id === userId)
        if (existingCachedUser) {
          setCachedUsers((prev) => {
            const updateCache = new Map(prev)
            const followersMap = new Map(
              existingCachedUser.followers?.map((follower) => [
                follower.id,
                follower,
              ]) ?? []
            )
            followersList.items.forEach((newFollower) => {
              followersMap.set(newFollower.id, newFollower)
            })
            const uniqueFollowers = Array.from(followersMap.values())
            updateCache.set(existingCachedUser.username, {
              ...existingCachedUser,
              followers: uniqueFollowers,
              totalFollowers: followersList.totalItems,
            })
            return updateCache
          })
        }
        return followersList
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const listFollowing = async (queryParams: FollowQueryParams) => {
    const { userId } = queryParams
    if (!userId) throw new Error("[listFollowing] userId is required.")
    return api.user
      .following(queryParams)
      .then((followingList) => {
        const existingCachedUser = cachedUsers
          .values()
          .find((user) => user.id === userId)
        if (existingCachedUser) {
          setCachedUsers((prev) => {
            const updateCache = new Map(prev)
            const followingMap = new Map(
              existingCachedUser.following?.map((following) => [
                following.id,
                following,
              ]) ?? []
            )
            followingList.items.forEach((newFollowing) => {
              followingMap.set(newFollowing.id, newFollowing)
            })
            const uniqueFollowing = Array.from(followingMap.values())
            updateCache.set(existingCachedUser.username, {
              ...existingCachedUser,
              totalFollowing: followingList.totalItems,
              following: uniqueFollowing,
            })
            return updateCache
          })
        }
        return followingList
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  return (
    <UsersContext.Provider
      value={{
        cachedUsers,
        findByUsername,
        update,
        follow,
        unfollow,
        listByUsername,
        listFollowers,
        listFollowing,
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}

export const useUsers = () => {
  const context = useContext(UsersContext)
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider")
  }
  return context
}
