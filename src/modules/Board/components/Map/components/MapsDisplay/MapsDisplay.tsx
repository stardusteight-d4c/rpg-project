import { useState } from "react"
import { maps } from "../../mock-data"
import { Tooltip } from "@/shared/components"

interface MapsDisplayProps {
  selectedMap: boolean
  onSelectedMap: (value: IMap) => void
}

export const MapsDisplay = ({
  onSelectedMap,
  selectedMap,
}: MapsDisplayProps) => {
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
        {maps.map((map, index) => (
          <div
            key={map.id}
            onClick={() => onSelectedMap(map)}
            className="cursor-pointer border border-border hover:bg-border hover:brightness-105 p-2 rounded-xl"
          >
            <div className="flex gap-x-4 items-center">
              <img
                src={map.image_url}
                alt=""
                className="min-w-[110px] max-w-[110px] min-h-[110px] max-h-[110px] border border-border object-cover rounded-xl"
              />
              <div className="flex flex-col gap-y-2">
                <span className="block text-3xl font-bold background-gradient bg-clip-text text-transparent">
                  {map.name}
                </span>

                <div className="flex gap-2">
                  <span className="capitalize text-gray-400 bg-ashes px-2 border border-border rounded-full w-fit block">
                    {map.type}
                  </span>
                  {map.visibility && (
                    <span className="capitalize text-gray-400 bg-ashes px-2 border border-border rounded-full w-fit block">
                      Visibility {map.visibility}
                    </span>
                  )}
                  {map.grid_size?.length === 2 && (
                    <span className="text-gray-400 bg-ashes px-2 border border-border rounded-full w-fit block">
                      {map.grid_size[0]}x{map.grid_size[1]}
                    </span>
                  )}
                </div>
                {map.active ? (
                  <div className="flex items-center gap-x-2">
                    <div className="bg-green-400 rounded-full w-3 h-3" />{" "}
                    <span className="font-normal !text-gray-400 !text-base">
                      Currently Active Map
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-x-2">
                    <div className="bg-red-400 rounded-full w-3 h-3" />{" "}
                    <span className="font-normal !text-gray-400 !text-base">
                      Inactive Map
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
