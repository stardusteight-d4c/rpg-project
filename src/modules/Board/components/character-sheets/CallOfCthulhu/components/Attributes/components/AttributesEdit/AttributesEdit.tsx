import { CustomNumericInput, GlowingWrapper } from "@/shared/components"
import { useState } from "react"

interface AttributesEditProps {
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
  attributes: {
    strength: number
    dexterity: number
    intelligence: number
    power: number
    constitution: number
    appearance: number
    size: number
    education: number
  }
}

export const AttributesEdit = ({
  activeItems,
  attributes,
  toggleItem,
}: AttributesEditProps) => {
  const [editableData, setEditableData] = useState({
    ...attributes,
  })

  const handleEdit = (field: string, value: any) => {
    setEditableData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="my-4 rounded border border-border">
      <div
        onClick={() => toggleItem("attributes")}
        className="flex p-2 cursor-pointer items-center justify-between sticky top-[49px] z-[100] shadow-sm shadow-black/50 bg-[#0e0e0e]"
      >
        <h3 className="text-2xl flex items-center gap-x-2 font-semibold">
          <span className="p-2 rounded">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29 26C29 26.2652 28.8946 26.5196 28.7071 26.7071C28.5196 26.8946 28.2652 27 28 27H4C3.73478 27 3.48043 26.8946 3.29289 26.7071C3.10536 26.5196 3 26.2652 3 26V6C3 5.73478 3.10536 5.48043 3.29289 5.29289C3.48043 5.10536 3.73478 5 4 5C4.26522 5 4.51957 5.10536 4.70711 5.29289C4.89464 5.48043 5 5.73478 5 6V17.7962L11.3413 12.25C11.5138 12.0989 11.733 12.0118 11.9622 12.0031C12.1914 11.9945 12.4166 12.0649 12.6 12.2025L19.9513 17.7162L27.3412 11.25C27.4381 11.1541 27.5536 11.079 27.6806 11.0293C27.8076 10.9797 27.9434 10.9565 28.0796 10.9613C28.2159 10.9661 28.3497 10.9986 28.4729 11.057C28.5961 11.1154 28.7061 11.1983 28.7961 11.3008C28.8861 11.4032 28.9541 11.523 28.9961 11.6527C29.0381 11.7824 29.0532 11.9193 29.0403 12.055C29.0274 12.1908 28.987 12.3224 28.9213 12.4419C28.8557 12.5615 28.7664 12.6663 28.6588 12.75L20.6588 19.75C20.4862 19.9011 20.267 19.9882 20.0378 19.9969C19.8086 20.0055 19.5834 19.9351 19.4 19.7975L12.0487 14.2863L5 20.4538V25H28C28.2652 25 28.5196 25.1054 28.7071 25.2929C28.8946 25.4804 29 25.7348 29 26Z"
                fill="url(#paint0_linear_43_2)"
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
          <span className="background-gradient bg-clip-text text-transparent">
            Attributes
          </span>
        </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#cccccc80"
          viewBox="0 0 256 256"
          className={`${
            activeItems.includes("attributes") ? "rotate-180" : "rotate-0"
          } transition-all duration-300 ease-in-out`}
        >
          <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
        </svg>
      </div>
      {activeItems.includes("attributes") && (
        <div className="grid grid-cols-3 gap-2 p-2">
          {Object.entries(editableData).map(([attribute, value]) => (
            <div
              key={attribute}
              className="bg-border/50 border border-border overflow-hidden rounded"
            >
              <div className="flex justify-between items-center px-4 pt-2">
                <span className="font-medium capitalize text-lg">
                  {attribute}
                </span>
                <GlowingWrapper>
                  <CustomNumericInput
                    value={value}
                    onChange={(value) => handleEdit(attribute, value)}
                  />
                </GlowingWrapper>
              </div>
              <div
                style={{ width: `${value}%` }}
                className="w-full background-gradient h-[4px] mt-2"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
