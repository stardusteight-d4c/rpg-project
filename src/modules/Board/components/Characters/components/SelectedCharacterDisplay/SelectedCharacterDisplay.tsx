"use client"

import { Dispatch, SetStateAction, useState } from "react"
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
  } | null
  setSelectedCharacter: (
    value: {
      player: any
      infos: any
      attributes: any
      skills: any
    } | null
  ) => void
}

export const SelectedCharacterDisplay = ({
  selectedCharacter,
  setSelectedCharacter,
}: SelectedCharacterDisplayProps) => {
  if (!selectedCharacter) return null

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
    <section className="p-2 h-screen overflow-y-scroll no-scrollbar">
      <div
        onClick={() => setSelectedCharacter(null)}
        className="flex mb-2 cursor-pointer items-center group w-fit gap-x-2"
      >
        <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full shadow-p group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#FAFAFA"
            viewBox="0 0 256 256"
          >
            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
          </svg>
        </button>
        <span>Back</span>
      </div>
      <ProfileInfo
        infos={selectedCharacter.infos}
        player={selectedCharacter.player}
      />
      <Attributes attributes={selectedCharacter.attributes} {...actions} />
      <Skills skills={selectedCharacter.skills} {...actions} />
      <Combat {...actions} />
      <Inventory {...actions} />
      <Backstory {...actions} />
    </section>
  )
}
