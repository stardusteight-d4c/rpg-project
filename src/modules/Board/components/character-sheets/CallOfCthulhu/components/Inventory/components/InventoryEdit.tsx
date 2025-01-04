"use client"

import { GlowingWrapper } from "@/shared/components"
import { useState } from "react"

interface InventoryEditProps {
  inventory: Array<{
    id: string
    name: string
    type?: "Note Type 01" | "Note Type 02" | "Newspaper" | "Letter"
    content?: any
  }>
  infos: {
    name: string
    sex: "male" | "female"
    characterUrl: string
    occupation: string
    hitPoints: number
    magicPoints: number
    sanity: number
    inspiration: boolean
  }
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
}

export const InventoryEdit = ({
  activeItems,
  toggleItem,
  inventory,
  infos,
}: InventoryEditProps) => {
  const [editableData, setEditableData] = useState<
    {
      id: string
      name: string
      type?: "Note Type 01" | "Note Type 02" | "Newspaper" | "Letter"
      content?: any
    }[]
  >(inventory)
  const [newItemName, setNewItemName] = useState("")

  function handleEdit(data: { id: string; newValue: string }) {
    setEditableData((prevData) =>
      prevData.map((item) =>
        item.id === data.id ? { ...item, name: data.newValue } : item
      )
    )
  }

  function handleDelete(id: string) {
    setEditableData((prevData) => prevData.filter((item) => item.id !== id))
  }

  function handleAdd() {
    if (newItemName.trim() === "") return
    const newItem = { id: crypto.randomUUID(), name: newItemName }
    setEditableData((prevData) => [...prevData, newItem])
    setNewItemName("")
  }

  return (
    <div className="mb-4">
      <div
        onClick={() => toggleItem("inventory")}
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
                d="M23 5H9C7.14409 5.00199 5.36477 5.74012 4.05245 7.05245C2.74012 8.36477 2.00199 10.1441 2 12V24C2 24.5304 2.21071 25.0391 2.58579 25.4142C2.96086 25.7893 3.46957 26 4 26H28C28.5304 26 29.0391 25.7893 29.4142 25.4142C29.7893 25.0391 30 24.5304 30 24V12C29.998 10.1441 29.2599 8.36477 27.9476 7.05245C26.6352 5.74012 24.8559 5.00199 23 5ZM28 12V13H24V7.1C25.1286 7.33205 26.1427 7.94613 26.8713 8.8387C27.6 9.73128 27.9986 10.8478 28 12ZM17 17H15V13H17V17ZM14 19H18C18.2652 19 18.5196 18.8946 18.7071 18.7071C18.8946 18.5196 19 18.2652 19 18V15H22V24H10V15H13V18C13 18.2652 13.1054 18.5196 13.2929 18.7071C13.4804 18.8946 13.7348 19 14 19ZM19 13V12C19 11.7348 18.8946 11.4804 18.7071 11.2929C18.5196 11.1054 18.2652 11 18 11H14C13.7348 11 13.4804 11.1054 13.2929 11.2929C13.1054 11.4804 13 11.7348 13 12V13H10V7H22V13H19ZM8 7.1V13H4V12C4.00141 10.8478 4.40003 9.73128 5.12866 8.8387C5.8573 7.94613 6.87139 7.33205 8 7.1ZM4 15H8V24H4V15ZM28 24H24V15H28V24Z"
                fill="url(#paint0_linear_87_2)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_87_2"
                  x1="16"
                  y1="5"
                  x2="16"
                  y2="26"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#42D392" />
                  <stop offset="1" stop-color="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="background-gradient bg-clip-text text-transparent">
            Inventory
          </span>
        </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#FFFFFF"
          viewBox="0 0 256 256"
          className={`${
            activeItems.includes("inventory") ? "rotate-180" : "rotate-0"
          } transition-all duration-300 ease-in-out`}
        >
          <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
        </svg>
      </div>
      {activeItems.includes("inventory") && (
        <ul className="grid grid-cols-2 gap-2">
          {editableData.map((item) => (
            <>
              {!item.type && (
                <div className="relative">
                  <GlowingWrapper>
                    <input
                      value={item.name}
                      onChange={(e) =>
                        handleEdit({ id: item.id, newValue: e.target.value })
                      }
                      placeholder="Provide a name..."
                      key={item.id}
                      className="py-2 pl-2 pr-[40px] w-full line-clamp-1 outline-none hover:brightness-125 border border-border bg-border/50 rounded"
                    />
                    <span
                      onClick={() => handleDelete(item.id)}
                      className="absolute cursor-pointer p-1 top-1/2 -translate-y-1/2 right-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="#ef4444"
                        viewBox="0 0 256 256"
                      >
                        <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
                      </svg>
                    </span>
                  </GlowingWrapper>
                </div>
              )}
            </>
          ))}
          <div className="relative">
            <GlowingWrapper>
              <input
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Add new item..."
                className="py-2 pl-2 pr-[40px] w-full line-clamp-1 outline-none hover:brightness-125 border border-border bg-border/50 rounded"
              />
            </GlowingWrapper>
            <span
              onClick={handleAdd}
              className="absolute cursor-pointer p-1 top-1/2 -translate-y-1/2 right-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#22c55e"
                viewBox="0 0 256 256"
              >
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path>
              </svg>
            </span>
          </div>
        </ul>
      )}
    </div>
  )
}
