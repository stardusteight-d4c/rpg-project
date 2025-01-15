import { useModal } from "@/shared/contexts/ModalContext"
import { SelectedCharacterDisplay } from "../../../Characters/components"
import { DragEvent } from "react"

interface DraggableItemProps {
  id: string
  imgUrl: string
  type: string
  setIsItemDragging?: (isDragging: boolean) => void
  player?: boolean
  character?: {
    player: any
    infos: any
    attributes: any
    skills: any
    combat: any
    inventory: Array<{
      id: string
      name: string
      for?: Array<{
        id: string
        name: string
      }>
      visibility?: Array<{
        id: string
        name: string
      }>
      content?: {
        type: {
          name: string
          inputs: number
        }
        inputs: Array<string>
      }
    }>
    backstory: string
  }
}

export const DraggableItem: React.FC<DraggableItemProps> = ({
  id,
  imgUrl,
  type,
  setIsItemDragging,
  player,
  character,
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
      onClick={() =>
        character &&
        showModal(
          id,
          <SelectedCharacterDisplay
            selectedCharacter={character!}
            isModal={true}
          />
        )
      }
      className={`${
        player ? " z-[60] " : " z-[0] "
      } w-full relative select-none object-cover h-full cursor-grab m-auto flex items-center justify-center`}
    />
  )
}
