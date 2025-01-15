"use client"

import { useState } from "react"
import { Maps } from "./components"
import { GlowingWrapper } from "@/shared/components"

interface IMap {
  type: "Map" | "Scenario"
  name: string
}

export const Map: React.FC = () => {
  const [map, setMap] = useState<boolean>(false)
  const [selectedMap, setSelectedMap] = useState<boolean>(false)
  const [editableData, setEditableData] = useState<IMap>({
    type: "Map",
    name: "",
  })

  function updateEditableData(data: { key: keyof IMap; value: any }) {
    setEditableData((prev) => ({
      ...prev,
      [data.key]: data.value,
    }))
  }

  const types = ["Map", "Scenario"]

  if (selectedMap) {
    return (
      <section className="relative w-full h-screen overflow-y-scroll no-scrollbar">
        <div className="sticky flex items-center border-b border-border shadow-sm shadow-black/50 z-[200] top-0 p-2 w-full inset-x-0 bg-background">
          <div className="flex items-center gap-x-4">
            <div
              onClick={() => setSelectedMap(false)}
              className="cursor-pointer w-fit flex items-center group gap-x-2"
            >
              <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full shadow-p group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#FFFFFF"
                  viewBox="0 0 256 256"
                >
                  <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
                </svg>
              </button>
              <span>Back</span>
            </div>
          </div>
        </div>
        <div className="p-2">
          <h3 className="block mb-2 text-4xl font-bold background-gradient bg-clip-text text-transparent">
            Informations
          </h3>
          <ul className="grid grid-cols-2 gap-2 text-base">
            <li className="col-span-1 text-base relative z-[60] flex flex-col">
              <span className="text-gray-400 text-sm font-medium">Type</span>
              <GlowingWrapper inset="0">
                <div className="relative z-10 overflow-visible text-center justify-center group py-1 px-2 w-full cursor-pointer hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded bg-border/50 border border-border">
                  <span>{editableData.type ?? "Select"}</span>
                  <ul className="left-1/2 -translate-x-1/2 bg-background rounded-2xl shadow-p border border-border top-full hidden absolute z-[900] group-hover:flex flex-col w-full no-scrollbar max-h-[200px] overflow-y-scroll gap-y-1">
                    {types.map((type, index) => (
                      <li
                        onClick={() =>
                          updateEditableData({
                            key: "type",
                            value: type,
                          })
                        }
                        key={index}
                        className="whitespace-nowrap cursor-pointer flex items-center gap-x-2 hover:brightness-125 hover:bg-border/50 p-3"
                      >
                        {type}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlowingWrapper>
            </li>
            <li className="col-span-1 text-base relative z-[60] flex flex-col">
              <span className="text-gray-400 text-sm font-medium">Name</span>
              <GlowingWrapper inset="0">
                <input
                  onChange={(e) =>
                    updateEditableData({ key: "name", value: e.target.value })
                  }
                  placeholder={`Add a name for the ${editableData.type}`}
                  value={editableData.name}
                  className="py-1 px-2 w-full cursor-text hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded bg-border/50 border border-border outline-none"
                />
              </GlowingWrapper>
            </li>
          </ul>
        </div>
      </section>
    )
  }

  if (!map && !selectedMap)
    return (
      <section className="relative w-full h-screen overflow-y-scroll no-scrollbar">
        <div className="sticky border-b border-border  shadow-sm shadow-black/50 z-50 top-0 p-2 w-full inset-x-0 bg-background">
          <div className="flex items-center gap-x-4">
            <div className="flex cursor-pointer items-center group w-fit gap-x-2">
              <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full  shadow-md shadow-black/50 group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#FFFFFF"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path>
                </svg>
              </button>
              <span>Create Map/Scenario</span>
            </div>
          </div>
        </div>
        <div className="p-2 space-y-2">
          <div
            onClick={() => setSelectedMap(true)}
            className="cursor-pointer border border-border hover:bg-border hover:brightness-105 p-2 rounded-xl"
          >
            <div className="flex gap-x-4">
              <img
                src="/Simple-house-1.png"
                alt=""
                className="min-w-[210px] max-w-[210px] min-h-[210px] max-h-[210px] border border-border object-cover rounded-xl"
              />
              <div className="flex flex-col gap-y-4">
                <span className="block text-3xl font-bold background-gradient bg-clip-text text-transparent">
                  Casa Abandonada
                </span>
                <div className="flex flex-col gap-y-0">
                  <span className="text-gray-400">Type: Exploration</span>
                  <span className="text-gray-400">Visibility: Low</span>
                  <span className="text-gray-400">Grid: 20x20</span>
                  <span className="text-gray-400">NPCs: 3</span>
                  <span className="text-gray-400">Enemies: 2</span>
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={() => setSelectedMap(true)}
            className="cursor-pointer border border-border hover:bg-border hover:brightness-105 p-2 rounded-xl"
          >
            <div className="flex gap-x-4">
              <img
                src="https://cdn.pixabay.com/photo/2023/09/30/09/00/ai-generated-8285203_1280.jpg"
                alt=""
                className="min-w-[210px] max-w-[210px] min-h-[210px] max-h-[210px] border border-border object-cover rounded-xl"
              />
              <div className="flex flex-col gap-y-4">
                <span className="block text-3xl font-bold background-gradient bg-clip-text text-transparent">
                  Entrada da Casa Abandonada
                </span>
                <div className="flex flex-col gap-y-0">
                  <span className="text-gray-400">Type: Scenario</span>
                  <span className="text-gray-400">NPCs: 3</span>
                  <span className="text-gray-400">Enemies: 2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )

  if (map) return <Maps.Scenario />
}
