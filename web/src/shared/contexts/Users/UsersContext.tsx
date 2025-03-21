"use client"

import React, { createContext, useContext, ReactNode, useState } from "react"
import { MockAPI } from "@/shared/requests/MockAPI"

interface UsersState {
  cachedUsers: Map<string, IUser>
  getByUsername: (username: string) => Promise<IUser | void>
  searchByUsername: (username: string) => Promise<IUser[]>
  update: (updatedUser: Partial<IUser>) => Promise<IUser | void>
  follow(userFollowed: string, userFollowing: string): Promise<IUser | void>
  unfollow(userFollowed: string, userFollowing: string): Promise<IUser | void>
  getFollowers(userId: string): Promise<Array<IUser>>
  getFollowing(userId: string): Promise<Array<IUser>>
}

const defaultState: UsersState = {
  cachedUsers: new Map(),
  getByUsername: async () => {},
  searchByUsername: async () => [],
  update: async () => {},
  follow: async () => {},
  unfollow: async () => {},
  getFollowers: async () => [],
  getFollowing: async () => [],
}

const UsersContext = createContext<UsersState>(defaultState)

export const UsersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const api = new MockAPI().initializeRoutes()
  const [cachedUsers, setCachedUsers] = useState<Map<string, IUser>>(new Map())

  const updateCache = (users: IUser[]) => {
    setCachedUsers((prev) => {
      const newCache = new Map(prev)
      users.forEach((user) => newCache.set(user.id, user))
      return newCache
    })
  }

  const getByUsername = async (username: string) => {
    const findCachedUser = Array.from(cachedUsers.values()).find(
      (user) => user.username === username
    )
    if (findCachedUser) return findCachedUser

    return await api.user
      .list({ username })
      .then((user) => {
        if (user[0]) updateCache([user[0]])
        return user[0]
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const searchByUsername = async (username: string) => {
    return await api.user
      .list({ username, search: true })
      .then((usersFound) => {
        updateCache(usersFound)
        return usersFound
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const update = async (updatedUser: Partial<IUser>) => {
    return await api.user
      .update(updatedUser)
      .then((user) => {
        updateCache([user])
        return user
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const follow = async (userFollowed: string, userFollowing: string) => {
    return await api.user
      .follow(userFollowed, userFollowing)
      .then(({ updatedFollowedUser, updatedFollowingUser }) => {
        updateCache([updatedFollowedUser, updatedFollowingUser])
        return updatedFollowingUser
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const unfollow = async (userFollowed: string, userFollowing: string) => {
    return await api.user
      .unfollow(userFollowed, userFollowing)
      .then(({ updatedFollowedUser, updatedFollowingUser }) => {
        updateCache([updatedFollowedUser, updatedFollowingUser])
        return updatedFollowingUser
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const getFollowers = async (userId: string) => {
    return await api.user
      .followers(userId)
      .then((followersList) => {
        updateCache(followersList)
        return followersList
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const getFollowing = async (userId: string) => {
    return await api.user
      .following(userId)
      .then((followingList) => {
        updateCache(followingList)
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
        getByUsername,
        searchByUsername,
        update,
        follow,
        unfollow,
        getFollowers,
        getFollowing,
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
