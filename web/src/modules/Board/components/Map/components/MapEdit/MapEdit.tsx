"use client"

import { useState } from "react"
import { CustomNumericInput, GlowingWrapper } from "@/shared/components"
import { useMaps } from "@/modules/Board/contexts/Maps/MapsContext"
import { randomUUID } from "node:crypto"

interface MapEditProps {
  selectedMap: IMap
  onSelectedMap: (value: IMap | null) => void
}

export const MapEdit = ({ selectedMap, onSelectedMap }: MapEditProps) => {
  const { updateCopyMap, copyMaps, updateMap } = useMaps()
  const [editableData, setEditableData] = useState<IMap>({
    ...selectedMap,
    grid_size: selectedMap.grid_size ?? [20, 20],
    visibility: selectedMap.visibility ?? "default",
    active: selectedMap.active ?? false,
  })
  const [file, setFile] = useState<File | null>(null)

  function updateEditableData(data: { key: keyof IMap; value: any }) {
    setEditableData((prev) => ({
      ...prev,
      [data.key]: data.value,
    }))
    updateCopyMap(editableData.id ?? randomUUID(), {
      ...editableData,
      [data.key]: data.value,
    })
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      const tempUrl = URL.createObjectURL(file)
      setFile(file)
      setEditableData((prevData) => ({
        ...prevData,
        image_url: tempUrl,
      }))
      updateCopyMap(editableData.id ?? randomUUID(), {
        ...editableData,
        image_url: tempUrl,
      })
    }
  }

  function onSave() {
    const updatedMap = copyMaps.find((map) => map.id === editableData.id)
    updateMap(editableData.id, updatedMap!)
    onSelectedMap(null)
  }

  function handleClick() {
    const fileInput = document.getElementById("file-input") as HTMLInputElement
    if (fileInput) {
      fileInput.click()
    }
  }

  const types = ["Map", "Scenario"]
  const visibilities = ["low", "default"]
  const status = [true, false]

  return (
    <section className="relative w-full h-screen overflow-y-scroll no-scrollbar">
      <div className="sticky flex items-center border-b border-border shadow-sm shadow-black/50 z-[200] top-0 p-2 w-full inset-x-0 bg-background">
        <div className="flex items-center gap-x-4">
          <div
            onClick={() => onSelectedMap(null)}
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
          <div
            onClick={handleClick}
            className="flex cursor-pointer items-center group w-fit gap-x-2"
          >
            <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full  shadow-md shadow-black/50 group-hover:bg-blue-500 duration-300 ease-in-out transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0ZM93.66,77.66,120,51.31V144a8,8,0,0,0,16,0V51.31l26.34,26.35a8,8,0,0,0,11.32-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40A8,8,0,0,0,93.66,77.66Z"></path>
              </svg>
            </button>
            <span className="capitalize">Upload {editableData.type}</span>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <div
            // onClick={() => handleDelete(editableData.id)}
            className="cursor-pointer w-fit flex items-center group gap-x-2"
          >
            <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full shadow-p group-hover:bg-red-500 duration-300 ease-in-out transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
              </svg>
            </button>
            <span className="capitalize">Delete {editableData.type}</span>
          </div>
          <div
            onClick={onSave}
            className="cursor-pointer w-fit flex items-center group gap-x-2"
          >
            <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full shadow-p group-hover:bg-green-500 duration-300 ease-in-out transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
              </svg>
            </button>
            <span>Save Changes</span>
          </div>
        </div>
      </div>
      <div className="p-2">
        <h3 className="block mb-2 text-4xl font-bold background-gradient bg-clip-text text-transparent">
          Informations
        </h3>
        <ul className="grid grid-cols-2 gap-2 text-base">
          <li className="col-span-2 text-base relative z-[60] flex flex-col">
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
          <li className="col-span-1 text-base relative z-[100] flex flex-col">
            <span className="text-gray-400 text-sm font-medium">Type</span>
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
            <span className="text-gray-400 text-sm font-medium">Status</span>
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
                          {" "}
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
        {editableData.type === "map" && (
          <ul>
            <h3 className="block mb-2 mt-4 text-4xl font-bold background-gradient bg-clip-text text-transparent">
              Config
            </h3>
            <ul className="grid relative z-[90] grid-cols-2 gap-2 text-base">
              <li className="col-span-1 text-base relative z-[10] flex flex-col">
                <span className="text-gray-400 text-sm font-medium">
                  Grid Size
                </span>
                <div className="flex items-center gap-x-2 w-fit">
                  <GlowingWrapper>
                    <CustomNumericInput
                      value={
                        editableData.grid_size ? editableData.grid_size[0] : 0
                      }
                      onChange={(value) =>
                        updateEditableData({
                          key: "grid_size",
                          value: [
                            value,
                            editableData.grid_size
                              ? editableData.grid_size[1]
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
                        editableData.grid_size ? editableData.grid_size[1] : 0
                      }
                      onChange={(value) =>
                        updateEditableData({
                          key: "grid_size",
                          value: [
                            editableData.grid_size
                              ? editableData.grid_size[0]
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
                <span className="text-gray-400 text-sm font-medium">
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
          {editableData.type === "map" ? (
            <div className="relative rounded-3xl overflow-hidden w-full">
              <div
                className="w-full min-h-[100vh] grid "
                style={{
                  gridTemplateColumns: `repeat(${
                    editableData.grid_size![0]
                  }, 1fr)`,
                  gridTemplateRows: `repeat(${
                    editableData.grid_size![1]
                  }, 1fr)`,
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
                  src={editableData.image_url}
                  alt=""
                  className="absolute z-0 w-full h-full object-fill select-none pointer-events-none"
                />
                {Array.from({ length: editableData.grid_size![0] }).map(
                  (_, rowIndex) =>
                    Array.from({ length: editableData.grid_size![1] }).map(
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
                src={editableData.image_url}
                alt=""
                className="aspect-map rounded-3xl h-screen z-0 w-full object-cover select-none pointer-events-none"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
