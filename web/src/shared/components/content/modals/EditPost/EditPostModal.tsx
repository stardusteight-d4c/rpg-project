"use client"

import { ChangeEvent, useEffect, useRef, useState } from "react"
import { usePosts, useToast } from "@/shared/contexts"
import { timeago } from "@/shared/utils"
import { DeleteContentModal } from "@/shared/components/content/modals"
import { UserAvatar } from "@/shared/components/content"
import { Button, GlowingWrapper, ModalWrapper } from "@/shared/components/ui"
import { Check, FileX, Image, Trash } from "@/shared/components/ui/icons"

export const EditPostModal: React.FC<{
  onStatusChange: (value: boolean) => void
  status: boolean
  post: IPost
}> = ({ onStatusChange, status, post }) => {
  const { update, remove } = usePosts()
  const [loading, setLoading] = useState<boolean>(false)
  const { addToast } = useToast()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [postData, setPostData] = useState<IPost>(post)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [imageFile, setImageFile] = useState<File | undefined>(undefined)

  useEffect(() => {
    adjustHeight()
  }, [])

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    adjustHeight()
    setPostData((prev) => ({ ...prev, content: e.target.value }))
  }

  const handlePostData = (field: string, value: any) => {
    setPostData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const tempUrl = URL.createObjectURL(file)
      setImageFile(file)
      handlePostData("image", tempUrl)
      // URL.revokeObjectURL(tempUrl)
    }
  }

  const handleClick = () => {
    const fileInput = document.getElementById(
      `file-input-post-${post.id}`
    ) as HTMLInputElement
    if (fileInput) {
      fileInput.click()
    }
  }

  function adjustHeight() {
    const textarea = textareaRef.current

    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  function onRemovePostImage() {
    setImageFile(undefined)
    handlePostData("image", undefined)
  }

  async function onEdit() {
    if (loading) return null
    setLoading(true)
    await update(postData)
      .then(() => {
        addToast("The post has been updated!", "success", 45)
      })
      .catch((error) => {
        addToast(error.message, "error", 45)
      })
      .finally(() => {
        setPostData(postData)
        onStatusChange(false)
        setLoading(false)
      })
  }

  async function onDelete() {
    if (loading) return null
    setLoading(true)
    await remove(postData.id)
      .then(() => {
        addToast("The post has been deleted!", "success", 45)
      })
      .catch((error) => {
        addToast(error.message, "error", 45)
      })
      .finally(() => {
        setPostData(postData)
        onStatusChange(false)
        setLoading(false)
      })
  }

  return (
    <ModalWrapper
      title="Editing Post"
      onStatusChange={onStatusChange}
      status={status}
    >
      <DeleteContentModal
        status={openDeleteModal}
        onStatusChange={setOpenDeleteModal}
        action={onDelete}
        text="You are about to delete this post. This action cannot be undone!"
      />
      <div className="py-2 px-4 sticky z-[200] border-b border-border shadow-md shadow-black/50 top-0 w-full inset-x-0 bg-background">
        <input
          id={`file-input-post-${post.id}`}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="flex items-center gap-x-4">
          <Button
            action={handleClick}
            title="Upload a Image"
            bgColor="blue"
            variant="modal"
          >
            <Image />
          </Button>
          {postData.image && (
            <Button
              action={onRemovePostImage}
              title="Remove Image"
              bgColor="red"
              variant="modal"
            >
              <FileX />
            </Button>
          )}
          <Button
            title="Delete Post"
            action={() => setOpenDeleteModal(true)}
            bgColor="red"
            variant="modal"
          >
            <Trash />
          </Button>
          <Button
            title="Save Changes"
            action={onEdit}
            bgColor="green"
            variant="modal"
          >
            <Check />
          </Button>
        </div>
      </div>
      <div className="w-[700px] p-2">
        <div className="p-4 border-border border rounded-xl">
          <div>
            <div className="flex select-none z-20 items-center gap-x-2">
              <UserAvatar
                name={post.owner.name}
                username={post.owner.username}
                avatarUrl={post.owner.avatarUrl}
              />
              <div className="flex flex-col">
                <span className="block whitespace-nowrap text-lg font-bold -tracking-wide">
                  {postData.owner.name}
                </span>
                <span className="text-gray-400 -mt-2 block text-sm">
                  #{postData.owner.username}
                </span>
              </div>
              <div className="ml-auto text-gray-500/80 select-none flex items-center gap-x-[2px] mt-1 w-full justify-end">
                <span className="text-xs block">
                  {timeago(postData.createdAt)}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#6b7280"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="py-4">
            <GlowingWrapper inset="0">
              <textarea
                onChange={(e) => handleInputChange(e)}
                value={postData.content}
                spellCheck="false"
                ref={textareaRef}
                className="block border-border rounded-md p-2 relative z-[50] antialiased border bg-background h-fit resize-none overflow-y-hidden no-scrollbar w-full cursor-text outline-none"
              />
            </GlowingWrapper>
          </div>

          {postData.image && (
            <img
              src={postData.image}
              alt={`${postData.image}/url`}
              className="w-fit max-h-[600px] h-fit mb-4 border border-border rounded-xl bg-button overflow-hidden object-contain"
            />
          )}
        </div>
      </div>
    </ModalWrapper>
  )
}
