import { useAuth } from "@/shared/contexts"
import { DragEvent } from "react"

export const DraggableItem: React.FC<{
  sheetId: string
  characterUrl: string
  ownerId: string
  setIsItemDragging?: (isDragging: boolean) => void
}> = ({ sheetId, characterUrl, ownerId, setIsItemDragging }) => {
  const { currentSession } = useAuth()

  const handleDragging = (isDragging: boolean) => {
    setIsItemDragging && setIsItemDragging(isDragging)
  }

  if (!sheetId || !currentSession) return null

  const handleDragEnd = () => handleDragging(false)
  const isOwner = currentSession.id === ownerId

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    if (!isOwner) return null
    e.dataTransfer.setData("id", sheetId)
    e.dataTransfer.setData("characterUrl", characterUrl)
    e.dataTransfer.setData("ownerId", ownerId)
    e.dataTransfer.setData("isOwner", isOwner.toString())

    handleDragging(true)
  }

  return (
    <img
      onMouseEnter={() => handleDragging(true)}
      onMouseLeave={() => handleDragging(false)}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      draggable={isOwner}
      src={characterUrl}
      className={`${
        isOwner
          ? " z-[60] cursor-grab "
          : " pointer-events-none select-none !cursor-default z-[50] "
      } w-full relative aspect-square rounded-full !pointer-events-auto object-cover h-full m-auto flex items-center justify-center`}
    />
  )
}
