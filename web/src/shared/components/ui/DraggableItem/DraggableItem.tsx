import { useModal } from "@/shared/contexts/Modal/ModalContext"
import { DragEvent } from "react"

interface DraggableItemProps {
  id: string
  imgUrl: string
  type: string
  setIsItemDragging?: (isDragging: boolean) => void
  player?: boolean
  sheet?: ISheet
}

export const DraggableItem: React.FC<DraggableItemProps> = ({
  id,
  imgUrl,
  type,
  setIsItemDragging,
  player,
  sheet,
}) => {
  const { showModal, hideModal } = useModal()
  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("id", id)
    e.dataTransfer.setData("imgUrl", imgUrl)
    e.dataTransfer.setData("type", type)
    setIsItemDragging && setIsItemDragging(true)
  }

  const handleDragEnd = () => setIsItemDragging && setIsItemDragging(false)
  if (imgUrl.length === 0) return null
  return (
    <img
      draggable
      onMouseEnter={() => setIsItemDragging && setIsItemDragging(true)}
      onMouseLeave={() => setIsItemDragging && setIsItemDragging(false)}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      src={imgUrl}
      alt={type}
      // onClick={() =>
      //   character &&
      //   showModal(
      //     id,
      //     <SelectedCharacterDisplay
      //       selectedCharacter={character!}
      //       isModal={true}
      //     />
      //   )
      // }
      className={`${
        player ? " z-[60] " : " z-[0] "
      } w-full relative aspect-square rounded-full !pointer-events-auto select-none object-cover h-full cursor-grab m-auto flex items-center justify-center`}
    />
  )
}
