"use client"

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react"
import { posts as postsMock } from "./mock-data"

interface FeedState {
  posts: IPost[]
}

const defaultState: FeedState = {
  posts: [],
}

const FeedContext = createContext<FeedState>(defaultState)

export const FeedProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<IPost[]>(postsMock)
 
  return (
    <FeedContext.Provider
      value={{
        posts,
      }}
    >
      {children}
    </FeedContext.Provider>
  )
}

export const useFeed = () => {
  const context = useContext(FeedContext)
  if (!context) {
    throw new Error("useFeed must be used within a FeedProvider")
  }
  return context
}
