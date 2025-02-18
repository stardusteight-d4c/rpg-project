"use client"

import { useState } from "react"
import {
  Attributes,
  Backstory,
  Combat,
  Inventory,
  ProfileInfo,
  Skills,
} from "../../../character-sheets/CallOfCthulhu/components"
import { useModal } from "@/shared/contexts/ModalContext"
import { useCharacters } from "@/shared/contexts/Characters/CharactersContext"
import { useAuth } from "@/shared/contexts/Auth/AuthContext"

interface SelectedCharacterDisplayProps {
  selectedCharacter: ISheet | null
  setSelectedCharacter?: (value: ISheet | null) => void
  setEditMode?: (value: boolean) => void
  isModal?: boolean
  hideModal?: () => void
}

export const SelectedCharacterDisplay = ({
  selectedCharacter,
  setSelectedCharacter,
  setEditMode,
  isModal,
}: SelectedCharacterDisplayProps) => {
  const { currentSession } = useAuth()
  if (!selectedCharacter) return null
  // const { getCharacterById } = useCharacters()
  // selectedCharacter = getCharacterById(selectedCharacter.id)!
  const { showModal, hideModal } = useModal()

  const [activeItems, setActiveItems] = useState<
    Array<"attributes" | "skills" | "inventory" | "combat" | "backstory" | null>
  >([null])

  const props = {
    actions: {
      activeItems,
      toggleItem,
    },
    infos: {
      character: selectedCharacter,
      isEditMode: false,
    },
  }

  function toggleItem(
    item: "attributes" | "skills" | "inventory" | "combat" | "backstory"
  ) {
    setActiveItems((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item)
      } else {
        return [...prev, item]
      }
    })
  }

  return (
    <section
      className={`${isModal ? "  " : " min-h-screen "}  w-full no-scrollbar`}
    >
      <div
        className={`${
          isModal ? " px-4 py-2 " : " p-2 "
        } sticky z-[200] border-b border-border  shadow-sm shadow-black/50 top-0 w-full inset-x-0 bg-background`}
      >
        <div className="flex items-center gap-x-4">
          {!isModal && (
            <div
              onClick={() => setSelectedCharacter && setSelectedCharacter(null)}
              className="cursor-pointer w-fit flex items-center group gap-x-2"
            >
              <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#FFFFFF"
                  viewBox="0 0 256 256"
                >
                  <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
                </svg>
              </button>
              <span>Back</span>
            </div>
          )}

          {selectedCharacter?.user?.id === currentSession?.id && (
            <div
              onClick={() => setEditMode && setEditMode(true)}
              className="flex cursor-pointer items-center group w-fit gap-x-2"
            >
              <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full  shadow-md shadow-black/50 group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#FFFFFF"
                  viewBox="0 0 256 256"
                >
                  <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.69,147.32,64l24-24L216,84.69Z"></path>
                </svg>
              </button>
              <span>Edit Character</span>
            </div>
          )}
          {/* {isModal && (
            <div
              onClick={() => hideModal(selectedCharacter?.id)}
              className="flex cursor-pointer items-center group w-fit gap-x-2"
            >
              <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full  shadow-md shadow-black/50 group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#FFFFFF"
                  viewBox="0 0 256 256"
                >
                  <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
                </svg>
              </button>
              <span>Close</span>
            </div>
          )} */}
          {/* {isModal && (
            <div className="font-medium absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
              {selectedCharacter?.infos.name}
            </div>
          )} */}
        </div>
      </div>
      <div className="p-2">
        <ProfileInfo {...props.infos} showPlayerInfo={true} />
        <Attributes {...props.infos} {...props.actions} />
        <Skills {...props.infos} {...props.actions} />
        <Combat {...props.infos} {...props.actions} />
        <Inventory {...props.infos} {...props.actions} />
        <Backstory {...props.infos} {...props.actions} />
      </div>
    </section>
  )
}
