"use client"

import { useState } from "react"
import { CombatModalDisplay } from "./components"

interface CombatDisplayProps {
  character: ISheet
  activeItems: SheetItems[]
  toggleItem: (item: SheetItems) => void
}

export const CombatDisplay = ({
  activeItems,
  toggleItem,
  character,
}: CombatDisplayProps) => {
  const [selectedWeapon, setSelectedWeapon] = useState<CombatItem | null>(null)

  function handleOnStatusChange(status: boolean) {
    if (status === true) return
    if (status === false) setSelectedWeapon(null)
    return
  }

  return (
    <div className="mb-4">
      {selectedWeapon && (
        <CombatModalDisplay
          selectedWeapon={selectedWeapon}
          handleOnStatusChange={handleOnStatusChange}
        />
      )}
      <div
        onClick={() => toggleItem("combat")}
        className="flex py-2 cursor-pointer items-center justify-between sticky top-[49px] z-[100] bg-background"
      >
        <h3 className="text-2xl flex items-center gap-x-2 font-semibold">
          <span>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.9998 4H18.9998C18.8466 3.99998 18.6955 4.03514 18.5581 4.10276C18.4207 4.17038 18.3007 4.26865 18.2073 4.39L10.2073 14.7913L8.99976 13.5863C8.81401 13.4003 8.59343 13.2528 8.35064 13.1521C8.10784 13.0515 7.84759 12.9997 7.58476 12.9997C7.32193 12.9997 7.06167 13.0515 6.81888 13.1521C6.57608 13.2528 6.3555 13.4003 6.16976 13.5863L4.58351 15.1737C4.39774 15.3595 4.25038 15.58 4.14984 15.8227C4.04931 16.0653 3.99756 16.3254 3.99756 16.5881C3.99756 16.8508 4.04931 17.1109 4.14984 17.3536C4.25038 17.5963 4.39774 17.8168 4.58351 18.0025L7.08351 20.5025L3.58351 24.0025C3.39774 24.1882 3.25038 24.4087 3.14984 24.6514C3.04931 24.8941 2.99756 25.1542 2.99756 25.4169C2.99756 25.6796 3.04931 25.9397 3.14984 26.1823C3.25038 26.425 3.39774 26.6455 3.58351 26.8312L5.16976 28.4163C5.54479 28.791 6.0533 29.0016 6.58351 29.0016C7.11371 29.0016 7.62222 28.791 7.99726 28.4163L11.4973 24.9163L13.9973 27.4163C14.183 27.6022 14.4036 27.7497 14.6464 27.8504C14.8892 27.951 15.1494 28.0028 15.4123 28.0028C15.6751 28.0028 15.9353 27.951 16.1781 27.8504C16.4209 27.7497 16.6415 27.6022 16.8273 27.4163L18.4135 25.8288C18.5993 25.643 18.7466 25.4225 18.8472 25.1798C18.9477 24.9372 18.9995 24.6771 18.9995 24.4144C18.9995 24.1517 18.9477 23.8916 18.8472 23.6489C18.7466 23.4062 18.5993 23.1857 18.4135 23L17.2085 21.795L27.6098 13.795C27.7314 13.7013 27.8299 13.5809 27.8975 13.443C27.9652 13.3052 28.0002 13.1536 27.9998 13V5C27.9998 4.73478 27.8944 4.48043 27.7069 4.29289C27.5193 4.10536 27.265 4 26.9998 4ZM6.58601 27L4.99976 25.415L8.49976 21.915L10.0848 23.5L6.58601 27ZM15.4123 26L5.99976 16.5888L7.58726 15L16.9998 24.4137L15.4123 26ZM25.9998 12.5075L15.7823 20.3675L14.4148 19L20.7073 12.7075C20.8947 12.5199 21 12.2654 20.9999 12.0002C20.9998 11.7349 20.8943 11.4806 20.7066 11.2931C20.519 11.1057 20.2646 11.0004 19.9993 11.0005C19.7341 11.0006 19.4797 11.1061 19.2923 11.2937L12.9998 17.585L11.6335 16.2175L19.4923 6H25.9998V12.5075Z"
                fill="url(#paint0_linear_78_2)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_78_2"
                  x1="15.4987"
                  y1="4"
                  x2="15.4987"
                  y2="29.0016"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#42D392" />
                  <stop offset="1" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="background-gradient bg-clip-text text-transparent">
            Combat
          </span>
        </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#FFFFFF"
          viewBox="0 0 256 256"
          className={`${
            activeItems.includes("combat") ? "rotate-180" : "rotate-0"
          } transition-all duration-300 ease-in-out`}
        >
          <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
        </svg>
      </div>
      {activeItems.includes("combat") && (
        <div>
          {character.combat && character.combat.length > 1 ? (
            <div className="flex flex-wrap gap-2">
              {character.combat.map((weapon, index) => (
                <div key={index} className="col-span-1">
                  {weapon.name === "Unarmed" ? (
                    <div
                      key={index}
                      onClick={() => setSelectedWeapon(weapon)}
                      className="w-[60px] h-[60px] cursor-pointer hover:brightness-150 flex items-center justify-center bg-border/50 border border-border rounded aspect-square"
                    >
                      <img src={weapon.iconUrl} className="w-full" />
                    </div>
                  ) : (
                    <div
                      key={index}
                      onClick={() => setSelectedWeapon(weapon)}
                      className="w-[60px] h-[60px] cursor-pointer p-1 hover:brightness-150 flex items-center justify-center bg-border/50 border border-border rounded aspect-square"
                    >
                      <img src={weapon.iconUrl} className="w-full" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 flex flex-col items-center justify-center">
              {character.combat.map((weapon, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedWeapon(weapon)}
                  className="col-span-1 cursor-pointer w-[50px] h-[50px] hover:brightness-150 flex items-center justify-center bg-border/50 border border-border rounded aspect-square"
                >
                  <img src={weapon.iconUrl} className="w-full" />
                </div>
              ))}
              <span className="text-gray-400 block mt-2 w-[400px] text-center">
                The enemies arm themselves, while {character.infos.name}{" "}
                empty-handed... gazes into the abyss of his preparation.
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
