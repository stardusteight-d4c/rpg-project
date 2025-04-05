"use client"

import { randomUUID } from "crypto"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  CustomNumericInput,
  GlowingWrapper,
  GradientSVGWrapper,
} from "@/shared/components/ui"
import { useCharacters } from "@/shared/contexts"
import { ChartLineUp } from "@/shared/components/ui/icons"

interface SkillsEditProps {
  activeItems: SheetItems[]
  toggleItem: (item: SheetItems) => void
  sheet: ISheet
}

export const SkillsEdit = ({
  toggleItem,
  sheet,
  activeItems,
}: SkillsEditProps) => {
  const { updateCopyCharacter } = useCharacters()
  const [editableData, setEditableData] = useState(sheet.skills)

  useEffect(() => {
    setEditableData(sheet.skills)
    updateCopyCharacter(sheet.id ?? randomUUID(), {
      skills: sheet.skills,
    })
  }, [sheet])

  const handleEdit = (name: string, field: string, value: any) => {
    const updatedSkills = editableData.map((skill) =>
      skill.name === name ? { ...skill, [field]: value } : skill
    )
    setEditableData(updatedSkills)
    updateCopyCharacter(sheet.id ?? randomUUID(), {
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
          <GradientSVGWrapper size={32}>
            <ChartLineUp />
          </GradientSVGWrapper>
          <span className="background-gradient bg-clip-text text-transparent">
            Skills
          </span>
        </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#cccccc80"
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
                    <motion.div
                      className="h-2 font-medium background-gradient rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${skill.currentValue}%`,
                      }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    />
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
