import { GradientSVGWrapper, Loader } from "@/shared/components/ui"
import { ChatCircleDots, Fire } from "@/shared/components/ui/icons"
import { useAuth, usePosts, useToast } from "@/shared/contexts"
import { useState } from "react"

export const Actions: React.FC<{
  post: IPost
  showComments: boolean
  onShowComments: (value: boolean) => void
  openEditPostModal: boolean
  onOpenEditPostModal: (value: boolean) => void
}> = ({
  post,
  showComments,
  onShowComments,
  openEditPostModal,
  onOpenEditPostModal,
}) => {
  const { like, unlike } = usePosts()
  const { addToast } = useToast()
  const { currentSession } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)

  const onLike = async () => {
    if (loading) return
    setLoading(true)
    await like(post.id, currentSession!.id)
      .catch((error) => {
        addToast(error.message, "error", 45)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const onUnlike = async () => {
    if (loading) return
    setLoading(true)
    await unlike(post.id, currentSession!.id)
      .catch((error) => {
        addToast(error.message, "error", 45)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  if (!currentSession) return null

  return (
    <div className="px-4 flex items-center gap-x-2">
      {post.likes.includes(currentSession.id) ? (
        <button
          onClick={onUnlike}
          disabled={loading}
          className="bg-background disabled:cursor-not-allowed disabled:brightness-95 flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 hover:bg-button duration-300 ease-in-out transition-all"
        >
          {loading ? (
            <Loader />
          ) : (
            <GradientSVGWrapper>
              <Fire />
            </GradientSVGWrapper>
          )}
        </button>
      ) : (
        <button
          onClick={onLike}
          disabled={loading}
          className="bg-background disabled:cursor-not-allowed disabled:brightness-95 flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 hover:bg-button duration-300 ease-in-out transition-all"
        >
          {loading ? <Loader /> : <Fire />}
        </button>
      )}
      <button
        onClick={() => onShowComments(!showComments)}
        className={`${
          showComments
            ? " bg-gradient-to-tr from-[#42d392] to-[#8B5CF6] "
            : " bg-background hover:bg-button "
        }  flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50  duration-300 ease-in-out transition-all`}
      >
        <ChatCircleDots />
      </button>

      {currentSession?.id !== post.owner.id && (
        <button className="bg-background flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 hover:bg-button duration-300 ease-in-out transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#FFFFFF"
            viewBox="0 0 256 256"
          >
            <path d="M237.66,106.35l-80-80A8,8,0,0,0,144,32V72.35c-25.94,2.22-54.59,14.92-78.16,34.91-28.38,24.08-46.05,55.11-49.76,87.37a12,12,0,0,0,20.68,9.58h0c11-11.71,50.14-48.74,107.24-52V192a8,8,0,0,0,13.66,5.65l80-80A8,8,0,0,0,237.66,106.35ZM160,172.69V144a8,8,0,0,0-8-8c-28.08,0-55.43,7.33-81.29,21.8a196.17,196.17,0,0,0-36.57,26.52c5.8-23.84,20.42-46.51,42.05-64.86C99.41,99.77,127.75,88,152,88a8,8,0,0,0,8-8V51.32L220.69,112Z"></path>
          </svg>
        </button>
      )}
      {currentSession?.id === post.owner.id && (
        <div className="flex items-center gap-x-2 ml-auto">
          <button
            onClick={() => onOpenEditPostModal(true)}
            className={`${
              openEditPostModal ? " background-gradient " : " bg-background "
            } flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 hover:bg-button duration-300 ease-in-out transition-all `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#FFFFFF"
              viewBox="0 0 256 256"
            >
              <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM136,75.31,152.69,92,68,176.69,51.31,160ZM48,208V179.31L76.69,208Zm48-3.31L79.32,188,164,103.31,180.69,120Zm96-96L147.32,64l24-24L216,84.69Z"></path>
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
