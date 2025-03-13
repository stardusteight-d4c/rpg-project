"use client"

import { ChangeEvent, useRef, useState } from "react"
import { timeago } from "@/shared/utils"
import { useAuth, usePosts, useToast } from "@/shared/contexts"
import { DeleteContentModal } from "@/shared/components/content/modals"
import { UserAvatar } from "@/shared/components/content"
import { Button, ModalWrapper } from "@/shared/components/ui"
import { Check, Trash } from "@/shared/components/ui/icons"

export const EditCommentModal: React.FC<{
  status: boolean
  onStatusChange: (value: boolean) => void
  comment: IComment
}> = ({ status, onStatusChange, comment }) => {
  const { currentSession } = useAuth()
  const { updateComment, deleteComment } = usePosts()
  const { addToast } = useToast()
  const commentRef = useRef<HTMLInputElement>(null)
  const [editableComment, setEditableComment] = useState<IComment>(comment)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false)

  const handleEditableComment = (e: ChangeEvent<HTMLInputElement>) => {
    setEditableComment((prev) => ({ ...prev, content: e.target.value }))
  }

  async function onDelete() {
    if (isLoadingDelete) return null
    setIsLoadingDelete(true)
    await deleteComment(comment)
      .then(() => {
        addToast("Comment has been deleted!", "success", 45)
      })
      .catch((error) => {
        addToast(error.message, "error", 45)
      })
      .finally(() => {
        setIsLoadingDelete(false)
        onStatusChange(false)
      })
  }

  async function onEdit() {
    await updateComment({
      ...editableComment,
      content: editableComment.content.trim(),
    })
      .then(() => {
        addToast("Comment has been updated!", "success", 45)
      })
      .catch((error) => {
        addToast(error.message, "error", 45)
      })
      .finally(() => {
        onStatusChange(false)
      })
  }
  if (!currentSession) return null

  return (
    <ModalWrapper
      title="Editing Comment"
      status={status}
      onStatusChange={onStatusChange}
    >
      <DeleteContentModal
        action={onDelete}
        status={openDeleteModal}
        onStatusChange={setOpenDeleteModal}
        text="You are about to delete this comment. This action cannot be undone!"
      />
      <div className="py-2 px-4 sticky z-[200] border-b border-border shadow-md shadow-black/50 top-0 w-full inset-x-0 bg-background">
        <div className="flex items-center gap-x-4">
          <Button
            action={() => setOpenDeleteModal(true)}
            title="Delete Comment"
            bgColor="red"
            variant="modal"
          >
            <Trash />
          </Button>
          <Button
            action={onEdit}
            title="Save Changes"
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
                name={comment.owner.name}
                username={comment.owner.username}
                avatarUrl={comment.owner.avatarUrl}
              />
              <div className="flex flex-col">
                <span className="block whitespace-nowrap text-lg font-bold -tracking-wide">
                  {comment.owner.name}
                </span>
                <span className="text-gray-400 -mt-2 block text-sm">
                  #{comment.owner.username}
                </span>
              </div>
              <div className="ml-auto text-gray-500/80 select-none flex items-center gap-x-[2px] mt-1 w-full justify-end">
                <span className="text-xs block">
                  {timeago(comment.createdAt)}
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
            <div className="flex flex-col mt-2 h-full w-full">
              <input
                onChange={(e) => handleEditableComment(e)}
                value={editableComment.content}
                spellCheck="false"
                ref={commentRef}
                className="p-2 px-4 w-full cursor-text hover:brightness-125 flex items-center gap-x-1 rounded-full bg-border/50 border border-border outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  )
}
