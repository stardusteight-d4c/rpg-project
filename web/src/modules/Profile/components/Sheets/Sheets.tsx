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

  const handleSelectedCharacterDisplayModal = (value: "open" | "close") => {
    if (value === "close") {
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
          status={"open"}
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
    </div>
  )
}
