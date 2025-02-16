"use client"

import { useCharacters } from "@/shared/contexts/Characters/CharactersContext"
import { CustomNumericInput, GlowingWrapper } from "@/shared/components"
import { randomUUID } from "crypto"
import { useEffect, useState } from "react"

interface SkillsEditProps {
  activeItems: (
    | "attributes"
    | "skills"
    | "inventory"
    | "combat"
    | "backstory"
    | null
  )[]
  toggleItem: (
    item: "attributes" | "skills" | "inventory" | "combat" | "backstory"
  ) => void
  character: ICharacter
}

export const SkillsEdit = ({
  toggleItem,
  character,
  activeItems,
}: SkillsEditProps) => {
  const { updateCopyCharacter } = useCharacters()
  const [editableData, setEditableData] = useState(character.skills)

  useEffect(() => {
    setEditableData(character.skills)
  }, [character])

  const handleEdit = (name: string, field: string, value: any) => {
    const updatedSkills = editableData.map((skill) =>
      skill.name === name ? { ...skill, [field]: value } : skill
    )
    setEditableData(updatedSkills)
    updateCopyCharacter(character.id ?? randomUUID(), {
      skills: updatedSkills,
    })
  }

  return (
    <div className="mb-4">
      <div
        onClick={() => toggleItem("skills")}
        className="flex py-2 cursor-pointer items-center justify-between sticky top-[47px] z-[100] bg-background"
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
                d="M24.6977 16.1325L18.2502 13.75L15.8752 7.2975C15.7346 6.91541 15.4801 6.58566 15.1461 6.35273C14.8122 6.11981 14.4149 5.99492 14.0077 5.99492C13.6005 5.99492 13.2032 6.11981 12.8692 6.35273C12.5353 6.58566 12.2808 6.91541 12.1402 7.2975L9.7502 13.75L3.2977 16.125C2.91561 16.2656 2.58586 16.5201 2.35293 16.854C2.12001 17.188 1.99512 17.5853 1.99512 17.9925C1.99512 18.3997 2.12001 18.797 2.35293 19.131C2.58586 19.4649 2.91561 19.7194 3.2977 19.86L9.7502 22.25L12.1252 28.7025C12.2658 29.0846 12.5203 29.4143 12.8542 29.6473C13.1882 29.8802 13.5855 30.0051 13.9927 30.0051C14.3999 30.0051 14.7972 29.8802 15.1311 29.6473C15.4651 29.4143 15.7196 29.0846 15.8602 28.7025L18.2502 22.25L24.7027 19.875C25.0848 19.7344 25.4145 19.4799 25.6475 19.146C25.8804 18.812 26.0053 18.4147 26.0053 18.0075C26.0053 17.6003 25.8804 17.203 25.6475 16.869C25.4145 16.5351 25.0848 16.2806 24.7027 16.14L24.6977 16.1325ZM17.1252 20.5275C16.9895 20.5775 16.8662 20.6564 16.7639 20.7587C16.6616 20.861 16.5827 20.9843 16.5327 21.12L14.0002 27.9813L11.4727 21.125C11.4228 20.9878 11.3434 20.8633 11.2402 20.76C11.1369 20.6568 11.0124 20.5774 10.8752 20.5275L4.01895 18L10.8752 15.4725C11.0124 15.4226 11.1369 15.3432 11.2402 15.24C11.3434 15.1367 11.4228 15.0122 11.4727 14.875L14.0002 8.01875L16.5277 14.875C16.5777 15.0107 16.6566 15.134 16.7589 15.2363C16.8612 15.3386 16.9845 15.4175 17.1202 15.4675L23.9814 18L17.1252 20.5275ZM18.0002 5C18.0002 4.73478 18.1056 4.48043 18.2931 4.29289C18.4806 4.10536 18.735 4 19.0002 4H21.0002V2C21.0002 1.73478 21.1056 1.48043 21.2931 1.29289C21.4806 1.10536 21.735 1 22.0002 1C22.2654 1 22.5198 1.10536 22.7073 1.29289C22.8948 1.48043 23.0002 1.73478 23.0002 2V4H25.0002C25.2654 4 25.5198 4.10536 25.7073 4.29289C25.8948 4.48043 26.0002 4.73478 26.0002 5C26.0002 5.26522 25.8948 5.51957 25.7073 5.70711C25.5198 5.89464 25.2654 6 25.0002 6H23.0002V8C23.0002 8.26522 22.8948 8.51957 22.7073 8.70711C22.5198 8.89464 22.2654 9 22.0002 9C21.735 9 21.4806 8.89464 21.2931 8.70711C21.1056 8.51957 21.0002 8.26522 21.0002 8V6H19.0002C18.735 6 18.4806 5.89464 18.2931 5.70711C18.1056 5.51957 18.0002 5.26522 18.0002 5ZM31.0002 11C31.0002 11.2652 30.8948 11.5196 30.7073 11.7071C30.5198 11.8946 30.2654 12 30.0002 12H29.0002V13C29.0002 13.2652 28.8948 13.5196 28.7073 13.7071C28.5198 13.8946 28.2654 14 28.0002 14C27.735 14 27.4806 13.8946 27.2931 13.7071C27.1056 13.5196 27.0002 13.2652 27.0002 13V12H26.0002C25.735 12 25.4806 11.8946 25.2931 11.7071C25.1056 11.5196 25.0002 11.2652 25.0002 11C25.0002 10.7348 25.1056 10.4804 25.2931 10.2929C25.4806 10.1054 25.735 10 26.0002 10H27.0002V9C27.0002 8.73478 27.1056 8.48043 27.2931 8.29289C27.4806 8.10536 27.735 8 28.0002 8C28.2654 8 28.5198 8.10536 28.7073 8.29289C28.8948 8.48043 29.0002 8.73478 29.0002 9V10H30.0002C30.2654 10 30.5198 10.1054 30.7073 10.2929C30.8948 10.4804 31.0002 10.7348 31.0002 11Z"
                fill="url(#paint0_linear_58_8)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_58_8"
                  x1="16.4977"
                  y1="1"
                  x2="16.4977"
                  y2="30.0051"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#42D392" />
                  <stop offset="1" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="background-gradient bg-clip-text text-transparent">
            Skills
          </span>
        </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#FFFFFF"
          viewBox="0 0 256 256"
          className={`${
            activeItems.includes("skills") ? "rotate-180" : "rotate-0"
          } transition-all duration-300 ease-in-out`}
        >
          <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
        </svg>
      </div>
      {activeItems.includes("skills") && (
        <div className="grid grid-cols-3 gap-2">
          {editableData.map((skill) => (
            <div
              key={skill.name}
              className="bg-border/50 border border-border overflow-hidden rounded-md p-2"
            >
              <div className="flex justify-between">
                <span className="font-medium flex items-center gap-x-2">
                  <div className="">
                    <input
                      type="checkbox"
                      id={skill.name}
                      style={{ display: "none" }}
                      checked={skill.checked}
                      className="cbx2"
                      onChange={(event) =>
                        handleEdit(skill.name, "checked", event.target.checked)
                      }
                    />
                    <label htmlFor={skill.name} className="check">
                      <svg width="18px" height="18px" viewBox="0 0 18 18">
                        <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
                        <polyline points="1 9 7 14 15 4"></polyline>
                      </svg>
                    </label>
                  </div>
                  <div className="flex text-lg items-center gap-x-1">
                    {skill.name}
                    <span className="block text-sm font-normal text-gray-400">
                      {typeof skill.baseValue === "string"
                        ? skill.baseValue
                        : `(${skill.baseValue}%)`}
                    </span>
                  </div>
                </span>
              </div>
              <div className="flex items-center gap-x-2">
                {typeof skill.currentValue === "number" && (
                  <div className="w-full relative bg-gray-600/10 overflow-hidden rounded-full">
                    <div
                      className="h-2 font-medium background-gradient rounded-full"
                      style={{ width: `${skill.currentValue}%` }}
                    ></div>
                  </div>
                )}
                <GlowingWrapper>
                  <CustomNumericInput
                    value={skill.currentValue}
                    onChange={(value) =>
                      handleEdit(skill.name, "currentValue", value)
                    }
                  />
                </GlowingWrapper>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
