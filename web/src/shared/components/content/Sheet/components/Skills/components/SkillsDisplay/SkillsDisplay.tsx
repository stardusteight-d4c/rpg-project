"use client"

import { GradientSVGWrapper } from "@/shared/components/ui"
import { ChartLineUp } from "@/shared/components/ui/icons"
import { motion } from "framer-motion"

interface SkillsDisplayProps {
  activeItems: SheetItems[]
  toggleItem: (item: SheetItems) => void
  sheet: ISheet
}

export const SkillsDisplay = ({
  toggleItem,
  sheet,
  activeItems,
}: SkillsDisplayProps) => {
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
          {sheet.skills.map((skill) => (
            <div
              key={skill.name}
              className="bg-border/50 border border-border overflow-hidden rounded-md p-2"
            >
              <span className="font-medium flex items-center gap-x-2">
                <div className="pointer-events-none select-none">
                  <input
                    type="checkbox"
                    id={skill.name}
                    style={{ display: "none" }}
                    checked={skill.checked}
                    className="cbx2"
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
              <div className="flex items-center gap-x-2">
                {typeof skill.currentValue === "number" && (
                  <div className="w-full relative bg-gray-600/10 overflow-hidden rounded-full">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${skill.currentValue}%`,
                      }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                      className="h-2 font-medium background-gradient rounded-full"
                    />
                  </div>
                )}
                <span className="w-[35px] h-[35px] rounded-full flex items-center justify-center aspect-square text-center font-medium z-10 relative bg-gray-600/10 outline-none caret-white">
                  {`${skill.currentValue}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
