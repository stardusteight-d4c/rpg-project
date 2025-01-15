"use client"

import { useState } from "react"
import { Maps } from "./components"

export const Map: React.FC = () => {
  const [map, setMap] = useState<boolean>(false)

  if (!map)
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
          <div className="cursor-pointer border border-border hover:bg-border hover:brightness-105 p-2 rounded-xl">
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
        </div>
      </section>
    )

  if (map) return <Maps.Exploration />
}
