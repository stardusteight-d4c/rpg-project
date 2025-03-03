export class PostsContextHandlers {
  private posts: IPost[]
  private updatePostState: (updatedPost: IPost) => void

  constructor(posts: IPost[], updatePostState: (updatedPost: IPost) => void) {
    this.posts = posts
    this.updatePostState = updatePostState
  }

  updatePostLikes(postId: string, userId: string, isLiking: boolean) {
    const updatingPost = this.posts.find((p) => p.id === postId)
    if (!updatingPost) throw new Error("[updatePostLikes]: Post not found")

    const updatedPost: IPost = {
      ...updatingPost,
      likes: isLiking
        ? [...updatingPost.likes, userId]
        : updatingPost.likes.filter((id) => id !== userId),
      likesCount: updatingPost.likesCount + (isLiking ? 1 : -1),
      likedByUser: isLiking,
    }

    this.updatePostState(updatedPost)
  }

  updatePostComments(
    postId: string,
    comment: IComment,
    action: "add" | "edit" | "delete"
  ) {
    const updatingPost = this.posts.find((p) => p.id === postId)
    if (!updatingPost) throw new Error("[updatePostComments]: Post not found")

    let updatedComments = updatingPost.comments
    let updatedCommentsCount = updatingPost.commentsCount

    switch (action) {
      case "add":
        updatedComments = [comment, ...updatedComments]
        updatedCommentsCount += 1
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
      comments: updatedComments,
      commentsCount: updatedCommentsCount,
    }

    this.updatePostState(updatedPost)
  }
}
