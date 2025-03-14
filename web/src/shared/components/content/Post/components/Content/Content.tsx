import { Fragment } from "react"

export const Content: React.FC<{ post: IPost }> = ({ post }) => {
  return (
    <Fragment>
      <span className="block whitespace-pre-wrap overflow-hidden p-4">
        {post.content}
      </span>
      {post.image && (
        <div className="px-4">
          <img
            src={post.image}
            alt=""
            className="w-fit max-h-[600px] h-fit mb-4 border border-border rounded-xl bg-button overflow-hidden object-contain"
          />
        </div>
      )}
    </Fragment>
  )
}
