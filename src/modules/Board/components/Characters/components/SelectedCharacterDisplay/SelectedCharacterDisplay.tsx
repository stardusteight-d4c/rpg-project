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

interface SelectedCharacterDisplayProps {
  selectedCharacter: {
    player: any
    infos: any
    attributes: any
    skills: any
    combat: any
    inventory: Array<{
      id: string
      name: string
    }>
    backstory: string
  } | null
  setSelectedCharacter: (
    value: {
      player: any
      infos: any
      attributes: any
      skills: any
      combat: any
      inventory: Array<{
        id: string
        name: string
      }>
      backstory: string
    } | null
  ) => void
  setEditMode: (value: boolean) => void
}

export const SelectedCharacterDisplay = ({
  selectedCharacter,
  setSelectedCharacter,
  setEditMode,
}: SelectedCharacterDisplayProps) => {
  if (!selectedCharacter) return null

  const [activeItems, setActiveItems] = useState<
    Array<"attributes" | "skills" | "inventory" | "combat" | "backstory" | null>
  >([null])
  const actions = {
    activeItems,
    toggleItem,
  }
  const currentSession = {
    id: "alsmdlsamdslamds",
    name: "Gabriel Sena",
    username: "#stardusteight",
    avatarUrl: "https://avatars.githubusercontent.com/u/87643260?v=4",
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
    <section className="relative h-screen overflow-y-scroll no-scrollbar">
      <div className="sticky z-[200] border-b border-border  shadow-sm shadow-black/50 top-0 p-2 w-full inset-x-0 bg-background">
        <div className="flex items-center gap-x-4">
          <div
            onClick={() => setSelectedCharacter(null)}
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
          {selectedCharacter.player.id === currentSession.id && (
            <div
              onClick={() => setEditMode(true)}
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
              <span>Update Character</span>
            </div>
          )}
        </div>
      </div>
      <div className="p-2">
        <ProfileInfo
          infos={selectedCharacter.infos}
          player={selectedCharacter.player}
        />
        <Attributes attributes={selectedCharacter.attributes} {...actions} />
        <Skills skills={selectedCharacter.skills} {...actions} />
        <Combat
          {...actions}
          infos={selectedCharacter.infos}
          combat={selectedCharacter.combat}
        />
        <Inventory
          {...actions}
          infos={selectedCharacter.infos}
          inventory={selectedCharacter.inventory}
        />
        <Backstory {...actions} backstory={selectedCharacter.backstory} />
      </div>
    </section>
  )
}
