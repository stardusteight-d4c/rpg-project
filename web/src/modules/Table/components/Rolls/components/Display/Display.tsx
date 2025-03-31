import { convertTimestamp } from "@/shared/utils"
import { SystemRoll, Sender, CharacterRoll } from "./components/"
import React, { RefObject } from "react"

export const Display: React.FC<{
  rolls: IRoll[]
  chatRef: RefObject<HTMLDivElement | null>
}> = ({ rolls, chatRef }) => {
  if (rolls.length === 0) return

  return (
    <div
      ref={chatRef}
      className="min-h-[100vh] max-h-[100vh] h-screen overflow-y-scroll no-scrollbar pb-[100px]"
    >
      {rolls.map((roll) => (
        <div key={roll.id} className="space-y-2">
          {roll.characterRoll && (
            <div className="flex flex-col  p-2">
              <Sender
                name={roll.character.infos.name}
                characterUrl={roll.character.infos.characterUrl}
              />
              <div className="space-y-4">
                <CharacterRoll {...roll.characterRoll} />
              </div>
              <div className="text-gray-500/80 select-none flex items-center gap-x-[2px] mt-1 w-full justify-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#6b7280"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
                </svg>
                <span className="text-xs block max-h-[16px]">
                  {convertTimestamp(roll.createdAt)}
                </span>
              </div>
            </div>
          )}
          {roll.systemRoll && (
            <div className="flex flex-col p-2">
              <Sender
                name={roll.character.infos.name}
                characterUrl={roll.character.infos.characterUrl}
              />
              <div className="space-y-4">
                <SystemRoll {...roll.systemRoll} />
              </div>
              <div className="text-gray-500/80 select-none flex items-center gap-x-[2px] mt-1 w-full justify-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#6b7280"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
                </svg>
                <span className="text-xs block max-h-[16px]">
                  {convertTimestamp(roll.createdAt)}
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
