import { useRolls } from "@/modules/Table/contexts/Rolls/RollsContext"
import { useState } from "react"

interface CharacterRollingProps {
  setSelectedType: (
    value: "attributes" | "status" | "skills" | "combat" | null
  ) => void
  selectedType: "attributes" | "status" | "skills" | "combat" | null
  playerCharacter: ICharacter
  mode: "system" | "character" | null
}

export const CharacterRolling = ({
  setSelectedType,
  selectedType,
  playerCharacter,
  mode,
}: CharacterRollingProps) => {
  if (mode !== "character") return null
  const { addRoll, setOpenDiceModal } = useRolls()
  const [selectedAttribute, setSelectedAttribute] = useState<{
    name: string
    value: number
  } | null>(null)
  const [selectedSkill, setSelectedSkill] = useState<{
    name: string
    value: number
  } | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<{
    name: string
    value: number
  } | null>(null)
  const status = {
    hitPoints: playerCharacter.infos.hitPoints,
    magicPoints: playerCharacter.infos.magicPoints,
    sanity: playerCharacter.infos.sanity,
  }

  const formatStatName = (stat: string) => {
    return stat
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
  }

  const rollDice = (selectedRoll: { value: number; name: string }) => {
    addRoll({
      id: crypto.randomUUID(),
      character: playerCharacter,
      character_roll: {
        name: selectedRoll.name.toLocaleLowerCase(),
        value: selectedRoll.value,
        half_value: Math.floor(selectedRoll.value / 2),
        fifth_value: Math.floor(selectedRoll.value / 5),
        rolled: Math.floor(Math.random() * 100) + 1,
      },
      createdAt: new Date().toISOString(),
    })
    setOpenDiceModal("close")
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-semibold">Character Rolling</h3>
      <div className="flex flex-col gap-y-1">
        <h4 className="text-sm text-gray-400 block">Choose a Type</h4>
        <div className="flex items-center gap-2">
          <span
            onClick={() => setSelectedType("status")}
            className={`${
              selectedType === "status"
                ? " background-gradient "
                : " bg-border "
            } hover:brightness-125 p-2 rounded-xl cursor-pointer`}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 3C13.4288 3 10.9154 3.76244 8.77759 5.1909C6.63975 6.61935 4.97351 8.64968 3.98957 11.0251C3.00563 13.4006 2.74819 16.0144 3.2498 18.5362C3.75141 21.0579 4.98953 23.3743 6.80762 25.1924C8.6257 27.0105 10.9421 28.2486 13.4638 28.7502C15.9856 29.2518 18.5995 28.9944 20.9749 28.0104C23.3503 27.0265 25.3807 25.3603 26.8091 23.2224C28.2376 21.0846 29 18.5712 29 16C28.9964 12.5533 27.6256 9.24882 25.1884 6.81163C22.7512 4.37445 19.4467 3.00364 16 3ZM9.26001 24.6875C9.98342 23.5561 10.98 22.625 12.1579 21.9801C13.3358 21.3351 14.6571 20.9971 16 20.9971C17.3429 20.9971 18.6642 21.3351 19.8421 21.9801C21.02 22.625 22.0166 23.5561 22.74 24.6875C20.8129 26.1862 18.4413 26.9999 16 26.9999C13.5587 26.9999 11.1871 26.1862 9.26001 24.6875ZM12 15C12 14.2089 12.2346 13.4355 12.6741 12.7777C13.1137 12.1199 13.7384 11.6072 14.4693 11.3045C15.2002 11.0017 16.0044 10.9225 16.7804 11.0769C17.5563 11.2312 18.269 11.6122 18.8284 12.1716C19.3878 12.731 19.7688 13.4437 19.9231 14.2196C20.0775 14.9956 19.9983 15.7998 19.6955 16.5307C19.3928 17.2616 18.8801 17.8864 18.2223 18.3259C17.5645 18.7654 16.7911 19 16 19C14.9391 19 13.9217 18.5786 13.1716 17.8284C12.4214 17.0783 12 16.0609 12 15ZM24.22 23.3013C23.1047 21.6851 21.5365 20.4348 19.7125 19.7075C20.6923 18.9358 21.4072 17.878 21.7579 16.6811C22.1086 15.4843 22.0776 14.2079 21.6693 13.0294C21.2609 11.851 20.4955 10.8291 19.4794 10.1059C18.4634 9.38262 17.2472 8.99397 16 8.99397C14.7528 8.99397 13.5366 9.38262 12.5206 10.1059C11.5045 10.8291 10.7391 11.851 10.3307 13.0294C9.92238 14.2079 9.8914 15.4843 10.2421 16.6811C10.5928 17.878 11.3077 18.9358 12.2875 19.7075C10.4635 20.4348 8.89529 21.6851 7.78001 23.3013C6.37072 21.7165 5.4496 19.7581 5.12756 17.6619C4.80553 15.5657 5.09631 13.4211 5.9649 11.4864C6.83349 9.55163 8.24285 7.90922 10.0233 6.75692C11.8037 5.60462 13.8792 4.99156 16 4.99156C18.1208 4.99156 20.1963 5.60462 21.9768 6.75692C23.7572 7.90922 25.1665 9.55163 26.0351 11.4864C26.9037 13.4211 27.1945 15.5657 26.8724 17.6619C26.5504 19.7581 25.6293 21.7165 24.22 23.3013Z"
                fill={`${
                  selectedType === "status"
                    ? "#FFFFFF"
                    : "url(#paint0_linear_69_2)"
                }`}
              />
              <defs>
                <linearGradient
                  id="paint0_linear_69_2"
                  x1="16"
                  y1="3"
                  x2="16"
                  y2="29"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#42D392" />
                  <stop offset="1" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          {/*  */}
          <span
            onClick={() => setSelectedType("attributes")}
            className={`${
              selectedType === "attributes"
                ? " background-gradient "
                : " bg-border "
            } hover:brightness-125 p-2 rounded-xl cursor-pointer`}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29 26C29 26.2652 28.8946 26.5196 28.7071 26.7071C28.5196 26.8946 28.2652 27 28 27H4C3.73478 27 3.48043 26.8946 3.29289 26.7071C3.10536 26.5196 3 26.2652 3 26V6C3 5.73478 3.10536 5.48043 3.29289 5.29289C3.48043 5.10536 3.73478 5 4 5C4.26522 5 4.51957 5.10536 4.70711 5.29289C4.89464 5.48043 5 5.73478 5 6V17.7962L11.3413 12.25C11.5138 12.0989 11.733 12.0118 11.9622 12.0031C12.1914 11.9945 12.4166 12.0649 12.6 12.2025L19.9513 17.7162L27.3412 11.25C27.4381 11.1541 27.5536 11.079 27.6806 11.0293C27.8076 10.9797 27.9434 10.9565 28.0796 10.9613C28.2159 10.9661 28.3497 10.9986 28.4729 11.057C28.5961 11.1154 28.7061 11.1983 28.7961 11.3008C28.8861 11.4032 28.9541 11.523 28.9961 11.6527C29.0381 11.7824 29.0532 11.9193 29.0403 12.055C29.0274 12.1908 28.987 12.3224 28.9213 12.4419C28.8557 12.5615 28.7664 12.6663 28.6588 12.75L20.6588 19.75C20.4862 19.9011 20.267 19.9882 20.0378 19.9969C19.8086 20.0055 19.5834 19.9351 19.4 19.7975L12.0487 14.2863L5 20.4538V25H28C28.2652 25 28.5196 25.1054 28.7071 25.2929C28.8946 25.4804 29 25.7348 29 26Z"
                fill={`${
                  selectedType === "attributes"
                    ? "#FFFFFF"
                    : "url(#paint0_linear_43_2)"
                }`}
              />
              <defs>
                <linearGradient
                  id="paint0_linear_43_2"
                  x1="16.0224"
                  y1="5"
                  x2="16.0224"
                  y2="27"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#42D392" />
                  <stop offset="1" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>{" "}
          </span>
          <span
            onClick={() => setSelectedType("skills")}
            className={`${
              selectedType === "skills"
                ? " background-gradient "
                : " bg-border "
            } hover:brightness-125 p-2 rounded-xl cursor-pointer`}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.6977 16.1325L18.2502 13.75L15.8752 7.2975C15.7346 6.91541 15.4801 6.58566 15.1461 6.35273C14.8122 6.11981 14.4149 5.99492 14.0077 5.99492C13.6005 5.99492 13.2032 6.11981 12.8692 6.35273C12.5353 6.58566 12.2808 6.91541 12.1402 7.2975L9.7502 13.75L3.2977 16.125C2.91561 16.2656 2.58586 16.5201 2.35293 16.854C2.12001 17.188 1.99512 17.5853 1.99512 17.9925C1.99512 18.3997 2.12001 18.797 2.35293 19.131C2.58586 19.4649 2.91561 19.7194 3.2977 19.86L9.7502 22.25L12.1252 28.7025C12.2658 29.0846 12.5203 29.4143 12.8542 29.6473C13.1882 29.8802 13.5855 30.0051 13.9927 30.0051C14.3999 30.0051 14.7972 29.8802 15.1311 29.6473C15.4651 29.4143 15.7196 29.0846 15.8602 28.7025L18.2502 22.25L24.7027 19.875C25.0848 19.7344 25.4145 19.4799 25.6475 19.146C25.8804 18.812 26.0053 18.4147 26.0053 18.0075C26.0053 17.6003 25.8804 17.203 25.6475 16.869C25.4145 16.5351 25.0848 16.2806 24.7027 16.14L24.6977 16.1325ZM17.1252 20.5275C16.9895 20.5775 16.8662 20.6564 16.7639 20.7587C16.6616 20.861 16.5827 20.9843 16.5327 21.12L14.0002 27.9813L11.4727 21.125C11.4228 20.9878 11.3434 20.8633 11.2402 20.76C11.1369 20.6568 11.0124 20.5774 10.8752 20.5275L4.01895 18L10.8752 15.4725C11.0124 15.4226 11.1369 15.3432 11.2402 15.24C11.3434 15.1367 11.4228 15.0122 11.4727 14.875L14.0002 8.01875L16.5277 14.875C16.5777 15.0107 16.6566 15.134 16.7589 15.2363C16.8612 15.3386 16.9845 15.4175 17.1202 15.4675L23.9814 18L17.1252 20.5275ZM18.0002 5C18.0002 4.73478 18.1056 4.48043 18.2931 4.29289C18.4806 4.10536 18.735 4 19.0002 4H21.0002V2C21.0002 1.73478 21.1056 1.48043 21.2931 1.29289C21.4806 1.10536 21.735 1 22.0002 1C22.2654 1 22.5198 1.10536 22.7073 1.29289C22.8948 1.48043 23.0002 1.73478 23.0002 2V4H25.0002C25.2654 4 25.5198 4.10536 25.7073 4.29289C25.8948 4.48043 26.0002 4.73478 26.0002 5C26.0002 5.26522 25.8948 5.51957 25.7073 5.70711C25.5198 5.89464 25.2654 6 25.0002 6H23.0002V8C23.0002 8.26522 22.8948 8.51957 22.7073 8.70711C22.5198 8.89464 22.2654 9 22.0002 9C21.735 9 21.4806 8.89464 21.2931 8.70711C21.1056 8.51957 21.0002 8.26522 21.0002 8V6H19.0002C18.735 6 18.4806 5.89464 18.2931 5.70711C18.1056 5.51957 18.0002 5.26522 18.0002 5ZM31.0002 11C31.0002 11.2652 30.8948 11.5196 30.7073 11.7071C30.5198 11.8946 30.2654 12 30.0002 12H29.0002V13C29.0002 13.2652 28.8948 13.5196 28.7073 13.7071C28.5198 13.8946 28.2654 14 28.0002 14C27.735 14 27.4806 13.8946 27.2931 13.7071C27.1056 13.5196 27.0002 13.2652 27.0002 13V12H26.0002C25.735 12 25.4806 11.8946 25.2931 11.7071C25.1056 11.5196 25.0002 11.2652 25.0002 11C25.0002 10.7348 25.1056 10.4804 25.2931 10.2929C25.4806 10.1054 25.735 10 26.0002 10H27.0002V9C27.0002 8.73478 27.1056 8.48043 27.2931 8.29289C27.4806 8.10536 27.735 8 28.0002 8C28.2654 8 28.5198 8.10536 28.7073 8.29289C28.8948 8.48043 29.0002 8.73478 29.0002 9V10H30.0002C30.2654 10 30.5198 10.1054 30.7073 10.2929C30.8948 10.4804 31.0002 10.7348 31.0002 11Z"
                fill={`${
                  selectedType === "skills"
                    ? "#FFFFFF"
                    : "url(#paint0_linear_58_8)"
                }`}
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
        </div>
      </div>

      {selectedType === "status" && (
        <div className="flex flex-col gap-4">
          <div className="gap-y-1 flex flex-col">
            <h4 className="text-sm text-gray-400 block">Status</h4>
            <ul className="grid grid-cols-2 gap-2">
              {Object.entries(status).map(([key, value]) => (
                <div
                  onClick={() => setSelectedStatus({ name: key, value })}
                  key={key}
                  className={`${
                    selectedStatus?.name === key
                      ? " bg-border brightness-125 "
                      : " bg-border/50 "
                  } ${
                    key === "sanity" ? " col-span-2 " : " col-span-1 "
                  } cursor-pointer border border-border overflow-hidden rounded`}
                >
                  <div className="flex justify-between items-center px-2 pt-2">
                    <span className="font-medium capitalize text-lg">
                      {formatStatName(key)}
                    </span>
                    <span className="bg-gray-600/10 w-[35px] h-[35px] rounded-full flex items-center justify-center aspect-square text-center font-medium z-10 relative bg-ashes outline-none caret-white">
                      {value}
                    </span>
                  </div>
                  <div className="w-full bg-gray-600/10">
                    <div
                      style={{ width: `${value}%` }}
                      className="w-full background-gradient h-[4px] mt-2"
                    />
                  </div>
                </div>
              ))}
            </ul>
          </div>
          {selectedStatus && (
            <button
              className="p-2 -mb-2 hover:brightness-125 font-medium capitalize w-full text-center text-lg background-gradient text-white rounded-xl border-border border"
              onClick={() =>
                rollDice({
                  name: formatStatName(selectedStatus.name),
                  value: selectedStatus.value,
                })
              }
            >
              {formatStatName(selectedStatus.name)} Roll
            </button>
          )}
        </div>
      )}

      {selectedType === "attributes" && (
        <div className="flex flex-col gap-4">
          <div className="gap-y-1 flex flex-col">
            <h4 className="text-sm text-gray-400 block">Attributes</h4>
            <ul className="grid grid-cols-2 gap-2">
              {Object.entries(playerCharacter.attributes).map(
                ([attribute, value]) => (
                  <div
                    onClick={() =>
                      setSelectedAttribute({ name: attribute, value })
                    }
                    key={attribute}
                    className={`${
                      selectedAttribute?.name === attribute
                        ? " bg-border brightness-125 "
                        : " bg-border/50 "
                    } ${
                      attribute === "luck" ? " col-span-2 " : " col-span-1 "
                    } cursor-pointer border border-border overflow-hidden rounded`}
                  >
                    <div className="flex justify-between items-center px-2 pt-2">
                      <span className="font-medium capitalize text-lg">
                        {attribute}
                      </span>
                      <span className="bg-gray-600/10 w-[35px] h-[35px] rounded-full flex items-center justify-center aspect-square text-center font-medium z-10 relative bg-ashes outline-none caret-white">
                        {value}
                      </span>
                    </div>
                    <div className="w-full bg-gray-600/10">
                      <div
                        style={{ width: `${value}%` }}
                        className="w-full background-gradient h-[4px] mt-2"
                      />
                    </div>
                  </div>
                )
              )}
            </ul>
          </div>
          {selectedAttribute && (
            <button
              className="p-2 -mb-2 font-medium capitalize w-full text-center text-lg background-gradient text-white rounded-xl"
              onClick={() =>
                rollDice({
                  name: selectedAttribute.name,
                  value: selectedAttribute.value,
                })
              }
            >
              {selectedAttribute.name} Roll
            </button>
          )}
        </div>
      )}

      {selectedType === "skills" && (
        <div className="flex flex-col gap-4">
          <div className="gap-y-1 flex flex-col">
            <h4 className="text-sm text-gray-400 block">Skills</h4>
            <ul className="grid grid-cols-2 gap-2">
              {playerCharacter.skills.map((skill, index) => (
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
            <button
              className="p-2 -mb-2 font-medium hover:brightness-125 capitalize w-full text-center text-lg background-gradient text-white rounded-xl"
              onClick={() =>
                rollDice({
                  name: selectedSkill.name,
                  value: selectedSkill.value,
                })
              }
            >
              {selectedSkill.name} Roll
            </button>
          )}
        </div>
      )}
    </div>
  )
}
