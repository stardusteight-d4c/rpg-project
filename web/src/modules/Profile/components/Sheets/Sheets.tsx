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
      <h3 className="text-2xl mb-2 flex items-center gap-x-2 font-semibold">
        <span>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.3988 21.8C10.5038 21.879 10.6235 21.9365 10.7508 21.9692C10.8782 22.0019 11.0107 22.0091 11.1408 21.9906C11.271 21.972 11.3962 21.9279 11.5093 21.8609C11.6224 21.7939 11.7212 21.7052 11.8 21.6C12.4055 20.7927 13.1906 20.1375 14.0931 19.6862C14.9957 19.2349 15.9909 19 17 19C18.0091 19 19.0043 19.2349 19.9069 19.6862C20.8094 20.1375 21.5945 20.7927 22.2 21.6C22.2788 21.7051 22.3775 21.7936 22.4905 21.8605C22.6035 21.9274 22.7286 21.9714 22.8586 21.99C22.9886 22.0085 23.121 22.0013 23.2482 21.9687C23.3754 21.9361 23.4949 21.8788 23.6 21.8C23.7051 21.7212 23.7936 21.6225 23.8605 21.5095C23.9274 21.3965 23.9714 21.2714 23.99 21.1414C24.0085 21.0114 24.0013 20.879 23.9687 20.7518C23.9361 20.6246 23.8788 20.5051 23.8 20.4C22.9145 19.2128 21.7337 18.2781 20.375 17.6887C21.1196 17.0089 21.6413 16.1199 21.8716 15.1382C22.1019 14.1566 22.03 13.1283 21.6654 12.1883C21.3009 11.2482 20.6606 10.4404 19.8287 9.87072C18.9967 9.30106 18.012 8.99623 17.0037 8.99623C15.9955 8.99623 15.0108 9.30106 14.1788 9.87072C13.3469 10.4404 12.7066 11.2482 12.3421 12.1883C11.9775 13.1283 11.9056 14.1566 12.1359 15.1382C12.3662 16.1199 12.8879 17.0089 13.6325 17.6887C12.271 18.277 11.0876 19.2118 10.2 20.4C10.0407 20.612 9.97221 20.8786 10.0095 21.1412C10.0467 21.4037 10.1868 21.6407 10.3988 21.8ZM14 14C14 13.4067 14.1759 12.8266 14.5056 12.3333C14.8352 11.8399 15.3038 11.4554 15.8519 11.2284C16.4001 11.0013 17.0033 10.9419 17.5853 11.0576C18.1672 11.1734 18.7018 11.4591 19.1213 11.8787C19.5409 12.2982 19.8266 12.8328 19.9424 13.4147C20.0581 13.9967 19.9987 14.5999 19.7716 15.1481C19.5446 15.6962 19.1601 16.1648 18.6667 16.4944C18.1734 16.8241 17.5933 17 17 17C16.2044 17 15.4413 16.6839 14.8787 16.1213C14.3161 15.5587 14 14.7956 14 14ZM26 3H8C7.46957 3 6.96086 3.21071 6.58579 3.58579C6.21071 3.96086 6 4.46957 6 5V8H4C3.73478 8 3.48043 8.10536 3.29289 8.29289C3.10536 8.48043 3 8.73478 3 9C3 9.26522 3.10536 9.51957 3.29289 9.70711C3.48043 9.89464 3.73478 10 4 10H6V15H4C3.73478 15 3.48043 15.1054 3.29289 15.2929C3.10536 15.4804 3 15.7348 3 16C3 16.2652 3.10536 16.5196 3.29289 16.7071C3.48043 16.8946 3.73478 17 4 17H6V22H4C3.73478 22 3.48043 22.1054 3.29289 22.2929C3.10536 22.4804 3 22.7348 3 23C3 23.2652 3.10536 23.5196 3.29289 23.7071C3.48043 23.8946 3.73478 24 4 24H6V27C6 27.5304 6.21071 28.0391 6.58579 28.4142C6.96086 28.7893 7.46957 29 8 29H26C26.5304 29 27.0391 28.7893 27.4142 28.4142C27.7893 28.0391 28 27.5304 28 27V5C28 4.46957 27.7893 3.96086 27.4142 3.58579C27.0391 3.21071 26.5304 3 26 3ZM26 27H8V5H26V27Z"
              fill="url(#paint0_linear_217_12)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_217_12"
                x1="15.5"
                y1="3"
                x2="15.5"
                y2="29"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#42D392" />
                <stop offset="1" stop-color="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
        </span>
        <span className="background-gradient bg-clip-text text-transparent">
          Sheets
        </span>
      </h3>

      {userSheets.size === 0 ? (
        <div className="w-full flex items-center justify-center">
          <div className="p-8 w-full h-[230px] bg-ashes rounded-xl flex flex-col items-center justify-center">
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
          className="flex w-full gap-4 cursor-grab"
          drag="x"
          dragConstraints={{ right: 0, left: -((userSheets.size - 1) * 640) }}
        >
          {Array.from(userSheets.values()).map((sheet) => (
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
