import { Button } from "@/shared/components/ui"
import { PlusCircle } from "@/shared/components/ui/icons"
import { useMaps } from "@/shared/contexts/Maps/MapsContext"
import React from "react"

export const Display: React.FC<{
  onSelectedMap: (value: IMap | undefined) => void
  onCreateMode: (value: boolean) => void
  createMode: boolean
  selectedMap: IMap | undefined
}> = ({ onSelectedMap, onCreateMode, createMode, selectedMap }) => {
  const { maps } = useMaps()

  if (createMode || !!selectedMap) return

  return (
    <div>
      <div className="sticky border-b border-border  shadow-sm shadow-black/50 z-[999] top-0 p-2 w-full inset-x-0 bg-background">
        <Button
          action={() => onCreateMode(true)}
          variant="modal"
          title="Create Map"
          bgColor="gradientBlue"
        >
          <PlusCircle />
        </Button>
      </div>

      <div
        data-is-not-view={maps.length === 0}
        className="hidden data-[is-not-view='false']:block p-2"
      >
        {maps.map((map) => (
          <div
            key={map.id}
            onClick={() => onSelectedMap(map)}
            className="cursor-pointer relative border border-border hover:bg-border hover:brightness-105 p-2 rounded-md"
          >
            <div className="flex gap-x-4 items-center">
              <img
                src={map.imageUrl}
                alt=""
                className="min-w-[110px] max-w-[110px] min-h-[110px] max-h-[110px] border border-border object-cover rounded-md"
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
                  {map.gridSize?.length === 2 && (
                    <span className="text-gray-400 bg-ashes px-2 border border-border rounded-full w-fit block">
                      {map.gridSize[0]}x{map.gridSize[1]}
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
    </div>
  )
}
