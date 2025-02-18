"use client"

import { useState } from "react"
import { ProfileInfo } from "../../../character-sheets/CallOfCthulhu/components"
import { currentSession } from "@/shared/contexts/Users/mock-data"
import { useCharacters } from "@/shared/contexts/Characters/CharactersContext"

interface CharactersDisplayProps {
  characters: Array<ISheet>
  setEditMode: (value: boolean) => void
  setCreateMode: (value: boolean) => void
  setSelectedCharacter: (value: ISheet | null) => void
}

export const CharactersDisplay = ({
  characters,
  setSelectedCharacter,
  setCreateMode,
}: CharactersDisplayProps) => {
  const { updateCopyCharacter } = useCharacters()
  const [activeCharacterType, setActiveCharacterType] = useState<
    "Players" | "NPCs" | "Enemies"
  >("Players")

  const countVisibility = (characters: ISheet[], type: CharacterType) => {
    return characters.reduce(
      (acc, character) => {
        if (character.infos.type === type) {
          if (character.infos.visibility) {
            acc.visible++
          } else {
            acc.invisible++
          }
          acc.total++
        }
        return acc
      },
      { invisible: 0, visible: 0, total: 0 }
    )
  }

  const players = countVisibility(characters, "player")
  const npcs = countVisibility(characters, "npc")
  const enemies = countVisibility(characters, "enemy")

  console.log(players, npcs, enemies)

  const typesObj = {
    player: "Players",
    npc: "NPCs",
    enemy: "Enemies",
  }

  return (
    <section className="relative w-full h-screen overflow-y-scroll no-scrollbar">
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

      {activeCharacterType === "Players" &&
        currentSession.role === "player" &&
        players.visible === 0 && (
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <div className="col-span-1 mx-auto cursor-pointer w-[50px] h-[50px] hover:brightness-150 flex items-center justify-center border border-border bg-border/50 rounded aspect-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M198.24,62.63l15.68-17.25a8,8,0,0,0-11.84-10.76L186.4,51.86A95.95,95.95,0,0,0,57.76,193.37L42.08,210.62a8,8,0,1,0,11.84,10.76L69.6,204.14A95.95,95.95,0,0,0,198.24,62.63ZM48,128A80,80,0,0,1,175.6,63.75l-107,117.73A79.63,79.63,0,0,1,48,128Zm80,80a79.55,79.55,0,0,1-47.6-15.75l107-117.73A79.95,79.95,0,0,1,128,208Z"></path>
              </svg>
            </div>
            <span className="text-gray-400 block mt-2 w-[400px] text-center">
              If a dragon roars on the mountain and there are no heroes to hear
              it, did it make a sound? Better create some characters and find
              out.
            </span>
          </div>
        )}

      {activeCharacterType === "Players" &&
        currentSession.role === "master" &&
        players.total === 0 && (
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <div className="col-span-1 mx-auto cursor-pointer w-[50px] h-[50px] hover:brightness-150 flex items-center justify-center border border-border bg-border/50 rounded aspect-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M198.24,62.63l15.68-17.25a8,8,0,0,0-11.84-10.76L186.4,51.86A95.95,95.95,0,0,0,57.76,193.37L42.08,210.62a8,8,0,1,0,11.84,10.76L69.6,204.14A95.95,95.95,0,0,0,198.24,62.63ZM48,128A80,80,0,0,1,175.6,63.75l-107,117.73A79.63,79.63,0,0,1,48,128Zm80,80a79.55,79.55,0,0,1-47.6-15.75l107-117.73A79.95,79.95,0,0,1,128,208Z"></path>
              </svg>
            </div>
            <span className="text-gray-400 block mt-2 w-[400px] text-center">
              If a dragon roars on the mountain and there are no heroes to hear
              it, does it even count? Time to invite some friends and find out!
            </span>
          </div>
        )}

      {activeCharacterType === "NPCs" &&
        currentSession.role === "master" &&
        npcs.total === 0 && (
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <div className="col-span-1 mx-auto cursor-pointer w-[50px] h-[50px] hover:brightness-150 flex items-center justify-center border border-border bg-border/50 rounded aspect-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M198.24,62.63l15.68-17.25a8,8,0,0,0-11.84-10.76L186.4,51.86A95.95,95.95,0,0,0,57.76,193.37L42.08,210.62a8,8,0,1,0,11.84,10.76L69.6,204.14A95.95,95.95,0,0,0,198.24,62.63ZM48,128A80,80,0,0,1,175.6,63.75l-107,117.73A79.63,79.63,0,0,1,48,128Zm80,80a79.55,79.55,0,0,1-47.6-15.75l107-117.73A79.95,79.95,0,0,1,128,208Z"></path>
              </svg>
            </div>
            <span className="text-gray-400 block mt-2 w-[400px] text-center">
              A village with no villagers, a kingdom with no ruler... it's
              eerily quiet. Maybe it's time to bring some NPCs to life?
            </span>
          </div>
        )}

      {activeCharacterType === "NPCs" &&
        currentSession.role === "player" &&
        npcs.visible === 0 && (
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <div className="col-span-1 mx-auto cursor-pointer w-[50px] h-[50px] hover:brightness-150 flex items-center justify-center border border-border bg-border/50 rounded aspect-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M198.24,62.63l15.68-17.25a8,8,0,0,0-11.84-10.76L186.4,51.86A95.95,95.95,0,0,0,57.76,193.37L42.08,210.62a8,8,0,1,0,11.84,10.76L69.6,204.14A95.95,95.95,0,0,0,198.24,62.63ZM48,128A80,80,0,0,1,175.6,63.75l-107,117.73A79.63,79.63,0,0,1,48,128Zm80,80a79.55,79.55,0,0,1-47.6-15.75l107-117.73A79.95,79.95,0,0,1,128,208Z"></path>
              </svg>
            </div>
            <span className="text-gray-400 block mt-2 w-[400px] text-center">
              The kingdom is empty, the tavern is deserted... it's so quiet it's
              kind of scary. Did the Master forget to create the NPCs, or are we
              supposed to rule this place?
            </span>
          </div>
        )}

      {activeCharacterType === "Enemies" &&
        currentSession.role === "master" &&
        enemies.total === 0 && (
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <div className="col-span-1 mx-auto cursor-pointer w-[50px] h-[50px] hover:brightness-150 flex items-center justify-center border border-border bg-border/50 rounded aspect-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M198.24,62.63l15.68-17.25a8,8,0,0,0-11.84-10.76L186.4,51.86A95.95,95.95,0,0,0,57.76,193.37L42.08,210.62a8,8,0,1,0,11.84,10.76L69.6,204.14A95.95,95.95,0,0,0,198.24,62.63ZM48,128A80,80,0,0,1,175.6,63.75l-107,117.73A79.63,79.63,0,0,1,48,128Zm80,80a79.55,79.55,0,0,1-47.6-15.75l107-117.73A79.95,79.95,0,0,1,128,208Z"></path>
              </svg>
            </div>
            <span className="text-gray-400 block mt-2 w-[400px] text-center">
              No monsters, no villains, not even a pesky goblin in sight. The
              heroes might get bored... better create some enemies to spice
              things up!
            </span>
          </div>
        )}

      {activeCharacterType === "Enemies" &&
        currentSession.role === "player" &&
        enemies.visible === 0 && (
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <div className="col-span-1 mx-auto cursor-pointer w-[50px] h-[50px] hover:brightness-150 flex items-center justify-center border border-border bg-border/50 rounded aspect-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M198.24,62.63l15.68-17.25a8,8,0,0,0-11.84-10.76L186.4,51.86A95.95,95.95,0,0,0,57.76,193.37L42.08,210.62a8,8,0,1,0,11.84,10.76L69.6,204.14A95.95,95.95,0,0,0,198.24,62.63ZM48,128A80,80,0,0,1,175.6,63.75l-107,117.73A79.63,79.63,0,0,1,48,128Zm80,80a79.55,79.55,0,0,1-47.6-15.75l107-117.73A79.95,79.95,0,0,1,128,208Z"></path>
              </svg>
            </div>
            <span className="text-gray-400 block mt-2 w-[400px] text-center">
              Where are the goblins? The dragons? Does the Master think the
              greatest enemy is ourselves?
            </span>
          </div>
        )}

      {characters.length > 0 && (
        <div className="p-2 space-y-2">
          {characters.map((character) => (
            <div
              className={`${
                currentSession.role !== "master" &&
                character.infos.type !== "player" &&
                !character.infos.visibility &&
                " hidden invisible sr-only "
              }`}
            >
              {typesObj[character.infos.type as "player" | "npc" | "enemy"] ===
                activeCharacterType && (
                <div
                  onClick={() => {
                    updateCopyCharacter(character.id, character)
                    setSelectedCharacter(character)
                  }}
                  key={character.id}
                  className="cursor-pointer border border-border hover:bg-border hover:brightness-105 p-2 rounded-xl"
                >
                  <ProfileInfo character={character} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
