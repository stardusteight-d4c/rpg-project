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
import { useCharacters } from "@/shared/contexts/Characters/CharactersContext"
import { ModalWrapper } from "@/shared/components"

interface CharactersEditProps {
  playerCharacter: ICharacter
  setEditMode: (value: boolean) => void
  setSelectedCharacter: (value: ICharacter | null) => void
}

export const CharactersEdit = ({
  playerCharacter,
  setEditMode,
  setSelectedCharacter,
}: CharactersEditProps) => {
  const { updateCharacter, copyCharacters, removeCharacter } = useCharacters()
  const [activeItems, setActiveItems] = useState<
    Array<"attributes" | "skills" | "inventory" | "combat" | "backstory" | null>
  >([null])
  const [openDeleteModal, setOpenDeleteModal] = useState<"open" | "close">(
    "close"
  )

  const props = {
    actions: {
      activeItems,
      toggleItem,
    },
    infos: {
      character: playerCharacter,
      isEditMode: true,
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

  function onSave() {
    const updatedCharacter = copyCharacters.find(
      (character) => character.id === playerCharacter.id
    )
    updateCharacter(playerCharacter.id, updatedCharacter!)
    setEditMode(false)
  }

  function onDelete() {
    removeCharacter(playerCharacter.id)
    setSelectedCharacter(null)
    setEditMode(false)
  }

  return (
    <section className="relative w-full h-screen overflow-y-scroll no-scrollbar">
      {openDeleteModal === "open" && (
        <ModalWrapper
          status={openDeleteModal}
          onStatusChange={setOpenDeleteModal}
        >
          <div className="w-[500px] p-4">
            {" "}
            <h3 className="block text-3xl font-bold text-red-500">Warning!</h3>
            <div className="flex flex-col mt-4 gap-2 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="58"
                height="58"
                fill="#ef4444"
                viewBox="0 0 256 256"
              >
                <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
              </svg>
              <span className="block w-[300px] text-center text-gray-400">
                You are about to delete your character sheet "
                {playerCharacter.infos.name}". This action cannot be undone!
              </span>
              <button
                onClick={onDelete}
                className="p-2 mt-2 w-full hover:brightness-125 font-medium text-center text-lg bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}
      <div className="sticky flex items-center border-b border-border shadow-sm shadow-black/50 z-[200] top-0 p-2 w-full inset-x-0 bg-background">
        <div className="flex items-center gap-x-4">
          <div
            onClick={() => setEditMode(false)}
            className="cursor-pointer w-fit flex items-center group gap-x-2"
          >
            <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full shadow-p group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
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
          <div className="flex cursor-pointer items-center group w-fit gap-x-2">
            <button className="flex items-center justify-center text-gray-500 p-1 rounded-full  shadow-md shadow-black/50 bg-gradient-to-tr from-[#42d392] to-[#8B5CF6] duration-300 ease-in-out transition-all">
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
          <div
            onClick={() => setOpenDeleteModal("open")}
            className="cursor-pointer w-fit flex items-center group gap-x-2"
          >
            <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full shadow-p group-hover:bg-red-500 duration-300 ease-in-out transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
              </svg>
            </button>
            <span className="capitalize">Delete Character</span>
          </div>
          <div
            onClick={onSave}
            className="cursor-pointer w-fit flex items-center group gap-x-2"
          >
            <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full shadow-p group-hover:bg-green-500 duration-300 ease-in-out transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
              </svg>
            </button>
            <span>Save Changes</span>
          </div>
        </div>
      </div>
      <div className="p-2">
        <ProfileInfo {...props.infos} />
        <Attributes {...props.infos} {...props.actions} />
        <Skills {...props.infos} {...props.actions} />
        <Combat {...props.infos} {...props.actions} />
        <Inventory {...props.infos} {...props.actions} />
        <Backstory {...props.infos} {...props.actions} />
      </div>
    </section>
  )
}
