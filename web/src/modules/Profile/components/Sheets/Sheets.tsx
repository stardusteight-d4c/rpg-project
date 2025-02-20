"use client"

import { ProfileInfo } from "@/modules/Table/components/character-sheets/CallOfCthulhu/components"
import {
  CharactersEdit,
  SelectedCharacterDisplay,
} from "@/modules/Table/components/Characters/components"
import { ModalWrapper } from "@/shared/components"
import { useSheets } from "@/shared/contexts/Sheets/SheetsContext"
import { motion } from "framer-motion"
import React, { useEffect, useState, useRef } from "react"

export const Sheets: React.FC<{ user: IUser }> = ({ user }) => {
  const { userSheets, getUserSheets } = useSheets()
  const [editMode, setEditMode] = useState<boolean>(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const [selectedCharacter, setSelectedCharacter] = useState<ISheet | null>(
    null
  )

  const handleSelectedCharacterDisplayModal = (value: boolean) => {
    if (value === false) {
      setSelectedCharacter(null)
    }
    return
  }

  useEffect(() => {
    ;(async () => {
      await getUserSheets(user.id)
    })()
  }, [])

  return (
    <div>
      {selectedCharacter && (
        <ModalWrapper
          status={true}
          onStatusChange={handleSelectedCharacterDisplayModal}
        >
          <div className="w-[700px]">
            {editMode ? (
              <div>
                <h3 className="block text-3xl font-bold p-4">
                  Editing {selectedCharacter.infos.name}'s Sheet
                </h3>
                <CharactersEdit
                  isModal={true}
                  setEditMode={setEditMode}
                  playerCharacter={selectedCharacter!}
                  setSelectedCharacter={setSelectedCharacter}
                />
              </div>
            ) : (
              <div>
                <h3 className="block text-3xl font-bold p-4">
                  {selectedCharacter.infos.name}'s Sheet
                </h3>
                <SelectedCharacterDisplay
                  setEditMode={setEditMode}
                  selectedCharacter={selectedCharacter}
                  isModal={true}
                />
              </div>
            )}
          </div>
        </ModalWrapper>
      )}
      <h2 className="text-3xl pointer-events-none font-bold mb-2">Sheets</h2>

      {userSheets.length === 0 ? (
        <div className="w-full flex items-center justify-center">
          <div className="p-8 w-full border-2 h-[230px] border-dashed border-border rounded-xl flex flex-col items-center justify-center">
            <div className="col-span-1 w-[50px] h-[50px] flex items-center justify-center bg-border/50 border border-border rounded aspect-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#9ca3af"
                viewBox="0 0 256 256"
              >
                <path d="M83.19,174.4a8,8,0,0,0,11.21-1.6,52,52,0,0,1,83.2,0,8,8,0,1,0,12.8-9.6A67.88,67.88,0,0,0,163,141.51a40,40,0,1,0-53.94,0A67.88,67.88,0,0,0,81.6,163.2,8,8,0,0,0,83.19,174.4ZM112,112a24,24,0,1,1,24,24A24,24,0,0,1,112,112Zm96-88H64A16,16,0,0,0,48,40V64H32a8,8,0,0,0,0,16H48v40H32a8,8,0,0,0,0,16H48v40H32a8,8,0,0,0,0,16H48v24a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V40A16,16,0,0,0,208,24Zm0,192H64V40H208Z"></path>
              </svg>
            </div>
            <span className="text-gray-400 block mt-2 w-[400px] text-center">
              Not even a sheet? Looks like someone is still waiting for the call
              of the adventure...
            </span>
          </div>
        </div>
      ) : (
        <motion.div
          ref={sliderRef}
          className="flex w-full gap-2 cursor-grab"
          drag="x"
          dragConstraints={{ right: 0, left: -((userSheets.length - 1) * 640) }}
        >
          {userSheets.map((sheet) => (
            <motion.div
              key={sheet.id}
              onDoubleClick={() => setSelectedCharacter(sheet)}
              className="max-w-[636px] select-none min-w-[636px] border border-border hover:bg-border hover:brightness-105 p-2 rounded-xl"
            >
              <ProfileInfo character={sheet} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
