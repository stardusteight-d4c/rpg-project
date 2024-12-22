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

interface CharactersEditProps {
  playerCharacter: {
    player: any
    infos: any
    attributes: any
    skills: any
    combat: any
    inventory: any
    backstory: string
  }
  setEditMode: (value: boolean) => void
}

export const CharactersEdit = ({
  playerCharacter,
  setEditMode,
}: CharactersEditProps) => {
  const [activeItems, setActiveItems] = useState<
    Array<"attributes" | "skills" | "inventory" | "combat" | "backstory" | null>
  >([null])
  const actions = {
    activeItems,
    toggleItem,
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
            <span>Update Character</span>
          </div>
          <div
            onClick={() => setEditMode(false)}
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
        <ProfileInfo
          infos={playerCharacter.infos}
          player={playerCharacter.player}
          isEditMode={true}
        />
        <Attributes
          attributes={playerCharacter.attributes}
          isEditMode={true}
          {...actions}
        />
        <Skills
          skills={playerCharacter.skills}
          isEditMode={true}
          {...actions}
        />
        <Combat
          infos={playerCharacter.infos}
          combat={playerCharacter.combat}
          isEditMode={true}
          {...actions}
        />
        <Inventory
          {...actions}
          infos={playerCharacter.infos}
          inventory={playerCharacter.inventory}
          isEditMode={true}
        />
        <Backstory
          {...actions}
          backstory={playerCharacter.backstory}
          isEditMode={true}
        />
      </div>
    </section>
  )
}
