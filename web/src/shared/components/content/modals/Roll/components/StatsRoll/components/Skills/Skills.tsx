import { Button, GlowingWrapper } from "@/shared/components/ui"
import React, { Fragment, useState } from "react"

export const Skills: React.FC<{
  activeSheet: ISheet
  selectedType: "attributes" | "skills"
  rollDice: (selectedRoll: { value: number; name: string }) => void
}> = ({ activeSheet, selectedType, rollDice }) => {
  const [selectedSkill, setSelectedSkill] = useState<{
    name: string
    value: number
  } | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  if (selectedType !== "skills") return

  const filteredSkills = activeSheet.skills.filter((skill) =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="gap-y-1 p-2 flex flex-col">
        <h4 className="text-sm text-gray-400 block">Skills</h4>
        {selectedType === "skills" && (
          <GlowingWrapper inset="0" border="rounded-full">
            <input
              id="findSkill"
              name="findSkill"
              placeholder="Find a skill"
              spellCheck="false"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="py-1 px-2 w-full cursor-text hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-full bg-ashes border border-border outline-none"
            />
          </GlowingWrapper>
        )}
        <ul className="grid grid-cols-2 pt-1 gap-2">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              onClick={() =>
                setSelectedSkill({
                  name: skill.name,
                  value: skill.currentValue,
                })
              }
              className={`${
                selectedSkill?.name === skill.name
                  ? " bg-border brightness-125 "
                  : " bg-border/50 "
              } cursor-pointer border border-border overflow-hidden rounded-md p-2`}
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
                    <div
                      className="h-2 font-medium background-gradient rounded-full"
                      style={{ width: `${skill.currentValue}%` }}
                    ></div>
                  </div>
                )}
                <span className="w-[35px] h-[35px] rounded-full flex items-center justify-center aspect-square text-center font-medium z-10 relative bg-gray-600/10 outline-none caret-white">
                  {`${skill.currentValue}`}
                </span>
              </div>
            </div>
          ))}
        </ul>
      </div>
      {selectedSkill && (
        <Fragment>
          <div className="custom-inset-shadow z-[100] p-4 sticky bottom-0 inset-x-0 bg-background border-t border-border">
            <Button
              variant="default"
              bgColor="gradientBlue"
              title={`${selectedSkill.name} Roll`}
              action={() =>
                rollDice({
                  name: selectedSkill.name,
                  value: selectedSkill.value,
                })
              }
            />
          </div>
        </Fragment>
      )}
    </div>
  )
}
