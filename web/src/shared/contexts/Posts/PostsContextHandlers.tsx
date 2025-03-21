interface IPostsContextHandlers {
  updatePostLikes(postId: string, userId: string, isLiking: boolean): void
  updatePostComments(
    postId: string,
    comment: IComment,
    action: "add" | "edit" | "delete"
  ): void
}

export class PostsContextHandlers implements IPostsContextHandlers {
  private posts: Map<string, IPost>
  private updatePostFromLocalState: (updatedPost: IPost) => void

  constructor(
    posts: Map<string, IPost>,
    updatePostFromLocalState: (updatedPost: IPost) => void
  ) {
    this.posts = posts
    this.updatePostFromLocalState = updatePostFromLocalState
  }

  public updatePostLikes(postId: string, userId: string, isLiking: boolean) {
    const updatingPost = this.posts.get(postId)
    if (!updatingPost) throw new Error("[updatePostLikes]: Post not found")

    const updatedLikes = new Set(updatingPost.likes)
    if (isLiking) {
      updatedLikes.add(userId)
    } else {
      updatedLikes.delete(userId)
    }

    const updatedPost: IPost = {
      ...updatingPost,
      likes: Array.from(updatedLikes),
      likesCount: updatedLikes.size,
      likedByUser: isLiking,
    }

    this.updatePostFromLocalState(updatedPost)
  }

  public updatePostComments(
    postId: string,
    comment: IComment,
    action: "add" | "edit" | "delete"
  ) {
    const updatingPost = this.posts.get(postId)
    if (!updatingPost) return

    let updatedComments = [...updatingPost.comments]
    let updatedCommentsCount = updatingPost.commentsCount

    switch (action) {
      case "add":
        if (!updatedComments.some((c) => c.id === comment.id)) {
          updatedComments = [comment, ...updatedComments]
          updatedCommentsCount += 1
        }
        break
      case "edit":
        updatedComments = updatedComments.map((c) =>
          c.id === comment.id ? comment : c
        )
        break
      case "delete":
        updatedComments = updatedComments.filter((c) => c.id !== comment.id)
        updatedCommentsCount = Math.max(0, updatedCommentsCount - 1)
        break
    }

    const updatedPost: IPost = {
      ...updatingPost,
      comments: updatedComments.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
      commentsCount: updatedCommentsCount,
    }

    this.updatePostFromLocalState(updatedPost)
  }
}
