"use client"

import { randomUUID } from "node:crypto"
import React, { useState } from "react"
import { CustomNumericInput, GlowingWrapper } from "@/shared/components/ui"
import { useMaps } from "@/shared/contexts"
import { Components } from "./components"

export const Edit: React.FC<{
  selectedMap: IMap
  createMode: boolean
  onSelectedMap: (value: IMap | undefined) => void
}> = ({ selectedMap, onSelectedMap, createMode }) => {
  if (!selectedMap || createMode) return
  const { updateCopyMap } = useMaps()
  const [editableData, setEditableData] = useState<IMap>({
    ...selectedMap,
    gridSize: selectedMap.gridSize ?? [20, 20],
    visibility: selectedMap.visibility ?? "default",
    active: selectedMap.active ?? false,
  })
  const [file, setFile] = useState<File | null>(null)

  const updateEditableData = (data: { key: keyof IMap; value: any }) => {
    setEditableData((prev) => ({
      ...prev,
      [data.key]: data.value,
    }))
    updateCopyMap(editableData.id ?? randomUUID(), {
      ...editableData,
      [data.key]: data.value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const tempUrl = URL.createObjectURL(file)
      setFile(file)
      setEditableData((prevData) => ({
        ...prevData,
        imageUrl: tempUrl,
      }))
      updateCopyMap(editableData.id ?? randomUUID(), {
        ...editableData,
        imageUrl: tempUrl,
      })
    }
  }

  const types = ["Exploration", "Scenario"]
  const visibilities = ["low", "default"]
  const status = [true, false]

  return (
    <section>
      <Components.Nav
        editableData={editableData}
        onFileChange={handleFileChange}
        onSelectedMap={onSelectedMap}
      />

      <div className="p-2">
        <ul className="grid grid-cols-2 gap-2 text-base">
          <li className="col-span-2 text-base relative z-[60] flex flex-col">
            <span className="text-gray-400 text-sm w-full block cursor-pointer">
              Name
            </span>
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
          <li className="col-span-1 text-base relative z-[100] flex flex-col">
            <span className="text-gray-400 text-sm w-full block cursor-pointer">
              Type
            </span>
            <GlowingWrapper inset="0">
              <div className="relative z-10 overflow-visible text-center justify-center group py-1 px-2 w-full cursor-pointer hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded bg-border/50 border border-border">
                <span className="capitalize">
                  {editableData.type ?? "Select"}
                </span>
                <ul className="left-1/2 -translate-x-1/2 bg-background rounded-2xl shadow-p border border-border top-full hidden absolute z-[900] group-hover:flex flex-col w-full no-scrollbar max-h-[200px] overflow-y-scroll gap-y-1">
                  {types.map((type, index) => (
                    <li
                      key={index}
                      onClick={() =>
                        updateEditableData({
                          key: "type",
                          value: type.toLowerCase(),
                        })
                      }
                      className="whitespace-nowrap cursor-pointer flex items-center gap-x-2 hover:brightness-125 hover:bg-border/50 p-3"
                    >
                      <div className="check cursor-pointer !ml-0 !w-fit !px-0 flex items-center gap-x-2">
                        <input
                          type="checkbox"
                          style={{ display: "none" }}
                          checked={
                            editableData.type.toLocaleLowerCase() ===
                            type.toLocaleLowerCase()
                          }
                          className="cbx2 !ml-0 !w-fit !px-0"
                        />
                        <label
                          htmlFor={type}
                          className="check !ml-0 !w-fit !px-0 pointer-events-none select-none"
                        >
                          <svg width="18px" height="18px" viewBox="0 0 18 18">
                            <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
                            <polyline points="1 9 7 14 15 4"></polyline>
                          </svg>
                        </label>
                        <span>{type}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </GlowingWrapper>
          </li>
          <li className="col-span-1 text-base relative z-[100] flex flex-col">
            <span className="text-gray-400 text-sm w-full block cursor-pointer">
              Status
            </span>
            <GlowingWrapper inset="0">
              <div className="relative z-10 overflow-visible text-center justify-center group py-1 px-2 w-full cursor-pointer hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded bg-border/50 border border-border">
                <span className="capitalize">
                  {editableData.active
                    ? "Currently Active Map"
                    : "Inactive Map"}
                </span>
                <ul className="left-1/2 -translate-x-1/2 bg-background rounded-2xl shadow-p border border-border top-full hidden absolute z-[900] group-hover:flex flex-col w-full no-scrollbar max-h-[200px] overflow-y-scroll gap-y-1">
                  {status.map((item, index) => (
                    <li
                      key={index}
                      onClick={() =>
                        updateEditableData({
                          key: "active",
                          value: item,
                        })
                      }
                      className="whitespace-nowrap cursor-pointer flex items-center gap-x-2 hover:brightness-125 hover:bg-border/50 p-3"
                    >
                      <div className="check cursor-pointer !ml-0 !w-fit !px-0 flex items-center gap-x-2">
                        <input
                          type="checkbox"
                          style={{ display: "none" }}
                          checked={editableData.active === item}
                          className="cbx2 !ml-0 !w-fit !px-0"
                        />
                        <label
                          htmlFor={String(item)}
                          className="check !ml-0 !w-fit !px-0 pointer-events-none select-none"
                        >
                          <svg width="18px" height="18px" viewBox="0 0 18 18">
                            <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
                            <polyline points="1 9 7 14 15 4"></polyline>
                          </svg>
                        </label>
                        <span>
                          {item ? "Currently Active Map" : "Inactive Map"}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </GlowingWrapper>
          </li>
        </ul>
        {editableData.type === "exploration" && (
          <ul>
            <ul className="grid mt-2 relative z-[90] grid-cols-2 gap-2 text-base">
              <li className="col-span-1 text-base relative z-[10] flex flex-col">
                <span className="text-gray-400 text-sm w-full block cursor-pointer">
                  Grid Size
                </span>
                <div className="flex items-center gap-x-2 w-fit">
                  <GlowingWrapper>
                    <CustomNumericInput
                      value={
                        editableData.gridSize ? editableData.gridSize[0] : 0
                      }
                      onChange={(value) =>
                        updateEditableData({
                          key: "gridSize",
                          value: [
                            value,
                            editableData.gridSize
                              ? editableData.gridSize[1]
                              : 0,
                          ],
                        })
                      }
                    />
                  </GlowingWrapper>
                  <div className="font-medium text-2xl">X</div>
                  <GlowingWrapper>
                    <CustomNumericInput
                      value={
                        editableData.gridSize ? editableData.gridSize[1] : 0
                      }
                      onChange={(value) =>
                        updateEditableData({
                          key: "gridSize",
                          value: [
                            editableData.gridSize
                              ? editableData.gridSize[0]
                              : 0,
                            value,
                          ],
                        })
                      }
                    />
                  </GlowingWrapper>
                </div>
              </li>
              <li className="col-span-1 text-base relative z-[60] flex flex-col">
                <span className="text-gray-400 text-sm w-full block cursor-pointer">
                  Visibility
                </span>
                <GlowingWrapper inset="0">
                  <div className="relative z-10 overflow-visible text-center justify-center group py-1 px-2 w-full cursor-pointer hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded bg-border/50 border border-border">
                    <span className="capitalize">
                      {editableData.visibility ?? "Select"}
                    </span>
                    <ul className="left-1/2 -translate-x-1/2 bg-background rounded-2xl shadow-p border border-border top-full hidden absolute z-[900] group-hover:flex flex-col w-full no-scrollbar max-h-[200px] overflow-y-scroll gap-y-1">
                      {visibilities.map((visibility, index) => (
                        <li
                          key={index}
                          onClick={() =>
                            updateEditableData({
                              key: "visibility",
                              value: visibility.toLowerCase(),
                            })
                          }
                          className="whitespace-nowrap cursor-pointer flex items-center gap-x-2 hover:brightness-125 hover:bg-border/50 p-3"
                        >
                          <div className="check cursor-pointer !ml-0 !w-fit !px-0 flex items-center gap-x-2">
                            <input
                              type="checkbox"
                              style={{ display: "none" }}
                              checked={
                                editableData.visibility?.toLocaleLowerCase() ===
                                visibility.toLocaleLowerCase()
                              }
                              className="cbx2 !ml-0 !w-fit !px-0"
                            />
                            <label
                              htmlFor={visibility}
                              className="check !ml-0 !w-fit !px-0 pointer-events-none select-none"
                            >
                              <svg
                                width="18px"
                                height="18px"
                                viewBox="0 0 18 18"
                              >
                                <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
                                <polyline points="1 9 7 14 15 4"></polyline>
                              </svg>
                            </label>
                            <span className="capitalize">{visibility}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlowingWrapper>
              </li>
            </ul>
          </ul>
        )}
        <div className="mt-4">
          {editableData.type === "exploration" ? (
            <div className="relative rounded-3xl overflow-hidden w-full">
              <div
                className="w-full min-h-[100vh] grid "
                style={{
                  gridTemplateColumns: `repeat(${
                    editableData.gridSize![0]
                  }, 1fr)`,
                  gridTemplateRows: `repeat(${editableData.gridSize![1]}, 1fr)`,
                  transformOrigin: "top left",
                  overflow: "hidden",
                }}
              >
                <div className="px-2 border border-border bg-background w-fit z-[300] shadow-sm shadow-black/50 rounded-full font-medium text-xl absolute bottom-4 right-4">
                  <span className="background-gradient bg-clip-text text-transparent whitespace-nowrap select-none cursor-default pointer-events-none">
                    {editableData.name}
                  </span>
                </div>
                <img
                  src={editableData.imageUrl}
                  alt=""
                  className="absolute z-0 w-full h-full object-fill select-none pointer-events-none"
                />
                {Array.from({ length: editableData.gridSize![0] }).map(
                  (_, rowIndex) =>
                    Array.from({ length: editableData.gridSize![1] }).map(
                      (_, colIndex) => (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          className="relative w-full border border-background z-50 aspect-square overflow-hidden h-fit mx-auto"
                        ></div>
                      )
                    )
                )}
              </div>
            </div>
          ) : (
            <div className="relative">
              <div className="px-2 border border-border bg-background w-fit z-[300] shadow-sm shadow-black/50 rounded-full font-medium text-xl absolute bottom-4 right-4">
                <span className="background-gradient bg-clip-text text-transparent whitespace-nowrap select-none cursor-default pointer-events-none">
                  {editableData.name}
                </span>
              </div>
              <img
                src={editableData.imageUrl}
                alt=""
                className="aspect-map rounded-md h-[300px] z-0 w-full object-cover select-none pointer-events-none"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
