import React from "react"
import { Components } from "./components"

export function FeedModule() {
  return (
    <Wrapper>
      <Components.Navbar />
      <Components.Posts />
      <Components.Sidebar />
      <Components.Footer />
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
