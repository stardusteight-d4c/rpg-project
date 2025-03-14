"use client"

import { useState } from "react"
import { Components } from "./components"

export const Post = ({ post }: { post: IPost }) => {
  const [openEditPostModal, setOpenEditPostModal] = useState<boolean>(false)

  return (
    <Components.Wrapper
      status={openEditPostModal}
      onStatusChange={setOpenEditPostModal}
      post={post}
    >
      <Components.Header post={post} />
      <Components.Content post={post} />
      <Components.Metrics post={post} />
      <Components.Footer
        post={post}
        openEditPostModal={openEditPostModal}
        onOpenEditPostModal={setOpenEditPostModal}
      />
    </Components.Wrapper>
  )
}
