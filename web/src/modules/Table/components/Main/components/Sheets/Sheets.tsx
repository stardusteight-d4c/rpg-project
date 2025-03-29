"use client"

import { useState } from "react"
import { useCharacters } from "@/shared/contexts/Characters/CharactersContext"
import { Button } from "@/shared/components/ui"
import { AddressBook, IdentificationBadge, PlusCircle, UsersThree } from "@/shared/components/ui/icons"
import {
  CreateSheetModal,
  SheetModal,
} from "@/shared/components/content/modals"
import { useAuth, useSheets } from "@/shared/contexts"
import { ProfileInfo } from "@/shared/components/content/Sheet/components/ProfileInfo"

export const Sheets = () => {
  const characters = useCharacters().characters
  const { lastRequestProfileSheetsData } = useSheets()
  const { currentSession } = useAuth()
  const [openCreateSheetModal, setOpenCreateSheetModal] =
    useState<boolean>(false)
  const [activeCharacterType, setActiveCharacterType] = useState<
    "Players" | "NPCs" | "Enemies"
  >("Players")
  const sheets =
    lastRequestProfileSheetsData.get(currentSession!.id)?.items ?? []
  const [selectedSheet, setSelectedSheet] = useState<ISheet | null>(null)
  const [openSheetModal, setOpenSheetModal] = useState<boolean>(false)

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

  const typesObj = {
    player: "Players",
    npc: "NPCs",
    enemy: "Enemies",
  }

  const onSelectedSheet = (sheet: ISheet) => {
    setSelectedSheet(sheet)
    setOpenSheetModal(true)
  }


  return (
    <section>
      <CreateSheetModal
        status={openCreateSheetModal}
        onStatusChange={setOpenCreateSheetModal}
      />
      <SheetModal
        status={openSheetModal}
        onStatusChange={setOpenSheetModal}
        sheet={selectedSheet!}
      />
      <div className="sticky border-b border-border  shadow-sm shadow-black/50 z-50 top-0 p-2 w-full inset-x-0 bg-background">
        <div className="flex items-center gap-x-4">
          <Button
            action={() => {}}
            title="Table Sheets"
            bgColor="gradientBlue"
            variant="modal"
          >
            <AddressBook />
          </Button>

          <Button
            action={() => setOpenCreateSheetModal(true)}
            title="My Sheets"
            bgColor="gradientBlue"
            variant="modal"
          >
            <IdentificationBadge />
          </Button>

          <Button
            action={() => setOpenCreateSheetModal(true)}
            title="New Sheet"
            bgColor="gradientBlue"
            variant="modal"
          >
            <PlusCircle />
          </Button>
          
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
      <div className="p-2">
        {/* <div>Current table active players sheets</div> */}
        {sheets.map((sheet) => (
          <div
            onDoubleClick={() => onSelectedSheet(sheet)}
            className="border border-border hover:bg-border hover:brightness-105 p-2 rounded-xl"
          >
            <ProfileInfo character={sheet} />
          </div>
        ))}
      </div>
    </section>
  )
}
