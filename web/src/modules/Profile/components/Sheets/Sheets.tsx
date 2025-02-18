"use client"

import { SelectedCharacterDisplay } from "@/modules/Table/components/Characters/components"
import { CharactersCreate } from "@/modules/Table/components/Characters/components/CharactersCreate"
import { ModalWrapper } from "@/shared/components"
import { useAuth } from "@/shared/contexts/Auth/AuthContext"
import { useModal } from "@/shared/contexts/ModalContext"
import { useSheets } from "@/shared/contexts/Sheets/SheetsContext"
import React, { useEffect, useState } from "react"

export const Sheets: React.FC<{ user: IUser }> = ({ user }) => {
  const { showModal, hideModal } = useModal()
  const { userSheets, getUserSheets } = useSheets()
  const [openModal, setOpenModal] = useState<"open" | "close">("close")

  useEffect(() => {
    ;(async () => {
      await getUserSheets(user.id)
    })()
  }, [])

  console.log(userSheets);
  

  return (
    <div className="mt-10">
      <ModalWrapper
        showCloseIcon={false}
        status={openModal}
        onStatusChange={setOpenModal}
      >
        <CharactersCreate isModal />
      </ModalWrapper>
      <h2 className="text-4xl w-fit pointer-events-none font-bold mb-2 background-gradient text-transparent bg-clip-text">
        Sheets
      </h2>
      <div className="grid grid-cols-12 w-full gap-2">
        {userSheets.map((sheet, index) => (
          <div key={index} className="col-span-1">
            <img
              onClick={() =>
                showModal(
                  sheet.id,
                  <SelectedCharacterDisplay
                    selectedCharacter={sheet}
                    isModal={true}
                  />
                )
              }
              src={sheet.infos.characterUrl}
              alt=""
              className="rounded-full w-full h-[99px] cursor-pointer overflow-hidden aspect-square"
            />
          </div>
        ))}
        <div
          onClick={() => setOpenModal("open")}
          className="col-span-1 cursor-pointer hover:brightness-150 flex items-center justify-center h-[99px] bg-border/80 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="52"
            height="52"
            fill="#9ca3af"
            viewBox="0 0 256 256"
          >
            <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
          </svg>
        </div>
      </div>
    </div>
  )
}
