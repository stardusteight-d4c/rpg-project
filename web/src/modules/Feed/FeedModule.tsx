import React from "react"
import { Feed } from "./components"

export function FeedModule() {
  return (
    <Wrapper>
      <Feed.Navbar />
      <Feed.Posts />
      <Feed.Sidebar />
      <Feed.Footer />
    </Wrapper>
  )
}

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const elements = React.Children.toArray(children)

  return (
    <main className="w-screen">
      {elements[0]}
      <div className="max-w-7xl mt-[45px] w-full mx-auto flex">
        {elements[1]}
        {elements[2]}
      </div>
      {elements[3]}
    </main>
  )
}
