"use client"

import { useState } from "react"
import { ProfileInfo } from "../../../character-sheets/CallOfCthulhu/components"

interface CharactersDisplayProps {
  characters: Array<{
    type: "player" | "npc" | "enemy"
    player: any
    infos: any
    attributes: any
    skills: any
    combat: any
    inventory: any
    backstory: any
  }>
  setEditMode: (value: boolean) => void
  setCreateMode: (value: boolean) => void
  setSelectedCharacter: (
    value: {
      type: "player" | "npc" | "enemy"
      player: any
      infos: any
      attributes: any
      skills: any
      combat: any
      inventory: any
      backstory: any
    } | null
  ) => void
}

export const CharactersDisplay = ({
  characters,
  setSelectedCharacter,
  setCreateMode,
}: CharactersDisplayProps) => {
  const [activeCharacterType, setActiveCharacterType] = useState<
    "Players" | "NPCs" | "Enemies"
  >("Players")

  const typesObj = {
    player: "Players",
    npc: "NPCs",
    enemy: "Enemies",
  }

  return (
    <section className="relative h-screen overflow-y-scroll no-scrollbar">
      <div className="sticky border-b border-border  shadow-sm shadow-black/50 z-50 top-0 p-2 w-full inset-x-0 bg-background">
        <div className="flex items-center gap-x-4">
          <div
            onClick={() => setCreateMode(true)}
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
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path>
              </svg>
            </button>
            <span>Create Character</span>
          </div>
          <div className="flex group items-center gap-x-2 w-fit cursor-pointer">
            <button className="bg-ashes relative flex items-center justify-center text-white p-1 rounded-full  shadow-md shadow-black/50 group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M32,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H40A8,8,0,0,1,32,64Zm8,72h72a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16Zm88,48H40a8,8,0,0,0,0,16h88a8,8,0,0,0,0-16Zm109.66,13.66a8,8,0,0,1-11.32,0L206,177.36A40,40,0,1,1,217.36,166l20.3,20.3A8,8,0,0,1,237.66,197.66ZM184,168a24,24,0,1,0-24-24A24,24,0,0,0,184,168Z"></path>
              </svg>
              <ul className="left-0 bg-background rounded-2xl shadow-p border border-border top-full hidden absolute z-[200] group-hover:flex flex-col min-w-[110px] no-scrollbar max-h-[300px] overflow-y-scroll gap-y-1">
                {["Players", "NPCs", "Enemies"].map((type, index) => (
                  <>
                    {type !== activeCharacterType && (
                      <li
                        key={index}
                        className="whitespace-nowrap cursor-pointer flex items-center gap-x-2 hover:brightness-125 hover:bg-border/50 p-3"
                        onClick={() =>
                          setActiveCharacterType(
                            type as "Players" | "NPCs" | "Enemies"
                          )
                        }
                      >
                        {type}
                      </li>
                    )}
                  </>
                ))}
              </ul>
            </button>
            <span>{activeCharacterType}</span>
          </div>
        </div>
      </div>

      <div className="p-2 space-y-2">
        {characters.map((character) => (
          <>
            {typesObj[character.type] === activeCharacterType && (
              <div
                onClick={() => setSelectedCharacter(character)}
                key={character.infos.id}
                className="cursor-pointer border border-border hover:bg-border hover:brightness-105 p-2 rounded-xl"
              >
                <ProfileInfo
                  infos={character.infos}
                  player={character.player}
                />
              </div>
            )}
          </>
        ))}
      </div>
    </section>
  )
}
