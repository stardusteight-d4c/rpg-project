"use client"

import { useState } from "react"
import { handoutContentTypes, handoutsTypes } from "../../data"
import { HandoutDisplay } from "../HandoutDisplay"
import { characters } from "../../../Characters/mock-data"
import { GlowingWrapper } from "@/shared/components"

interface HandoutsCreateProps {
  onCreate: (value: boolean) => void
}

export const HandoutsCreate = ({ onCreate }: HandoutsCreateProps) => {
  const [editableData, setEditableData] = useState<IHandout>({
    id: "",
    name: "",
    for: [],
    visibility: [],
    upload: undefined,
    content: {
      type: {
        name: "Letter Type 01",
        inputs: 1,
      },
      inputs: [],
    },
  })
  const [file, setFile] = useState<File | null>(null)

  function updateEditableData(data: { key: keyof IHandout; value: any }) {
    setEditableData((prev) => ({
      ...prev,
      [data.key]: data.value,
    }))
  }

  function handleCheckbox(data: {
    type: "for" | "visibility"
    characterId: string
  }): boolean {
    return editableData[data.type].some((item) => item.id === data.characterId)
  }

  const handleClick = () => {
    const fileInput = document.getElementById("file-input") as HTMLInputElement
    if (fileInput) {
      fileInput.click()
    }
  }

  function handleCheckEdit(data: {
    type: "for" | "visibility"
    characterId: string
    characterName: string
  }) {
    const itemExists = editableData[data.type].some(
      (item) => item.id === data.characterId
    )

    if (itemExists) {
      const updatedData = editableData[data.type].filter(
        (item) => item.id !== data.characterId
      )
      setEditableData({ ...editableData, [data.type]: updatedData })
    } else {
      const updatedData = [
        ...editableData[data.type],
        { id: data.characterId, name: data.characterName },
      ]
      setEditableData({ ...editableData, [data.type]: updatedData })
    }
  }

  function handleDelete(handoutId: string) {
    onCreate(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const tempUrl = URL.createObjectURL(file)
      setFile(file)
      setEditableData((prevData) => ({
        ...prevData,
        upload: tempUrl,
      }))
    }
  }

  const handleInputChange = (index: number, value: string) => {
    setEditableData((prev) => {
      const updatedInputs = [...prev.content.inputs]
      updatedInputs[index] = value

      return {
        ...prev,
        content: {
          ...prev.content,
          inputs: updatedInputs,
        },
      }
    })
  }

  return (
    <section className="relative h-screen overflow-y-scroll no-scrollbar">
      <div className="sticky border-b border-border  shadow-sm shadow-black/50 z-[200] top-0 p-2 w-full inset-x-0 bg-background">
        <div className="flex items-center gap-x-4">
          <div
            onClick={() => onCreate(false)}
            className="cursor-pointer w-fit flex items-center group gap-x-2"
          >
            <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
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
          {!editableData.upload ? (
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
              <span>Upload Handout</span>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div
              onClick={() => updateEditableData({ key: "upload", value: null })}
              className="flex cursor-pointer items-center group w-fit gap-x-2"
            >
              <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full  shadow-md shadow-black/50 group-hover:bg-red-500 duration-300 ease-in-out transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#FFFFFF"
                  viewBox="0 0 256 256"
                >
                  <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-42.34-82.34L139.31,152l18.35,18.34a8,8,0,0,1-11.32,11.32L128,163.31l-18.34,18.35a8,8,0,0,1-11.32-11.32L116.69,152,98.34,133.66a8,8,0,0,1,11.32-11.32L128,140.69l18.34-18.35a8,8,0,0,1,11.32,11.32Z"></path>
                </svg>
              </button>
              <span>Remove Upload</span>
            </div>
          )}
          <div
            onClick={() => onCreate(false)}
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
            <span>Create</span>
          </div>
        </div>
      </div>

      <div className="p-2">
        <div className="">
          <h3 className="block mb-2 text-4xl font-bold background-gradient bg-clip-text text-transparent">
            Informations
          </h3>
          <ul className="grid grid-cols-2 gap-2 text-base">
            {!editableData.upload && (
              <li className="col-span-1 text-base relative z-[60] flex flex-col">
                <span className="text-gray-400 text-sm font-medium">Type</span>
                <GlowingWrapper inset="0">
                  <div className="relative z-10 overflow-visible text-center justify-center group py-1 px-2 w-full cursor-pointer hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded bg-border/50 border border-border">
                    <span>{editableData.content.type?.name ?? "Select"}</span>
                    <ul className="left-1/2 -translate-x-1/2 bg-background rounded-2xl shadow-p border border-border top-full hidden absolute z-[900] group-hover:flex flex-col w-full no-scrollbar max-h-[200px] overflow-y-scroll gap-y-1">
                      {handoutContentTypes.map((item, index) => (
                        <li
                          onClick={() =>
                            updateEditableData({
                              key: "content",
                              value: { ...editableData.content, type: item },
                            })
                          }
                          key={index}
                          className="whitespace-nowrap cursor-pointer flex items-center gap-x-2 hover:brightness-125 hover:bg-border/50 p-3"
                        >
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlowingWrapper>
              </li>
            )}
            <li
              className={`${
                editableData.upload ? " col-span-2 " : " col-span-1 "
              } col-span-1 text-base flex flex-col`}
            >
              <span className="text-gray-400 text-sm font-medium">Name</span>
              <GlowingWrapper inset="0">
                <input
                  onChange={(e) =>
                    updateEditableData({ key: "name", value: e.target.value })
                  }
                  placeholder="Add a name for the handout"
                  value={editableData.name}
                  className="py-1 px-2 w-full cursor-text hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded bg-border/50 border border-border outline-none"
                />
              </GlowingWrapper>
            </li>
            <li className="col-span-1 text-base relative z-50 flex-wrap flex flex-col">
              <span className="text-gray-400 text-sm font-medium">For</span>
              <GlowingWrapper inset="0">
                <div className="group w-full h-fit z-0 relative">
                  <button className="relative z-10 overflow-visible py-1 px-2 w-full cursor-pointer hover:brightness-125 flex items-center justify-center gap-x-2 line-clamp-1 rounded bg-border/50 border border-border">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="#9ca3af"
                      viewBox="0 0 256 256"
                    >
                      <path d="M256,136a8,8,0,0,1-8,8H232v16a8,8,0,0,1-16,0V144H200a8,8,0,0,1,0-16h16V112a8,8,0,0,1,16,0v16h16A8,8,0,0,1,256,136Zm-57.87,58.85a8,8,0,0,1-12.26,10.3C165.75,181.19,138.09,168,108,168s-57.75,13.19-77.87,37.15a8,8,0,0,1-12.25-10.3c14.94-17.78,33.52-30.41,54.17-37.17a68,68,0,1,1,71.9,0C164.6,164.44,183.18,177.07,198.13,194.85ZM108,152a52,52,0,1,0-52-52A52.06,52.06,0,0,0,108,152Z"></path>
                    </svg>
                    <span>Select</span>
                  </button>
                  <ul className="left-1/2 -translate-x-1/2 bg-background rounded-2xl shadow-p border border-border top-full hidden absolute z-[500] group-hover:flex flex-col w-full no-scrollbar max-h-[300px] overflow-y-scroll gap-y-1">
                    {characters.map((character: any) => (
                      <li
                        onClick={() =>
                          handleCheckEdit({
                            type: "for",
                            characterId: character.infos.id,
                            characterName: character.infos.name,
                          })
                        }
                        className="whitespace-nowrap cursor-pointer flex items-center gap-x-2 hover:brightness-125 hover:bg-border/50 p-3"
                      >
                        <div
                          key={character.infos.id}
                          className="check cursor-pointer !ml-0 !w-fit !px-0 flex items-center gap-x-2"
                        >
                          <input
                            type="checkbox"
                            id={character.infos.id}
                            style={{ display: "none" }}
                            checked={handleCheckbox({
                              type: "for",
                              characterId: character.infos.id,
                            })}
                            className="cbx2 !ml-0 !w-fit !px-0"
                          />
                          <label
                            htmlFor={character.infos.id}
                            className="check !ml-0 !w-fit !px-0 pointer-events-none select-none"
                          >
                            <svg width="18px" height="18px" viewBox="0 0 18 18">
                              <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
                              <polyline points="1 9 7 14 15 4"></polyline>
                            </svg>
                          </label>
                          <span>{character.infos.name}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlowingWrapper>
            </li>

            <li className="col-span-1 text-base flex-wrap flex flex-col">
              <span className="text-gray-400 text-sm font-medium">
                Visibility
              </span>
              <GlowingWrapper inset="0">
                <div className="group w-full h-fit relative">
                  <button className="relative z-10 overflow-visible py-1 px-2 w-full cursor-pointer hover:brightness-125 flex items-center justify-center gap-x-2 line-clamp-1 rounded bg-border/50 border border-border">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="#9ca3af"
                      viewBox="0 0 256 256"
                    >
                      <path d="M256,136a8,8,0,0,1-8,8H232v16a8,8,0,0,1-16,0V144H200a8,8,0,0,1,0-16h16V112a8,8,0,0,1,16,0v16h16A8,8,0,0,1,256,136Zm-57.87,58.85a8,8,0,0,1-12.26,10.3C165.75,181.19,138.09,168,108,168s-57.75,13.19-77.87,37.15a8,8,0,0,1-12.25-10.3c14.94-17.78,33.52-30.41,54.17-37.17a68,68,0,1,1,71.9,0C164.6,164.44,183.18,177.07,198.13,194.85ZM108,152a52,52,0,1,0-52-52A52.06,52.06,0,0,0,108,152Z"></path>
                    </svg>
                    <span>Select</span>
                  </button>
                  <ul className="left-1/2 -translate-x-1/2 bg-background rounded-2xl shadow-p border border-border top-full hidden absolute z-[200] group-hover:flex flex-col w-full no-scrollbar max-h-[300px] overflow-y-scroll gap-y-1">
                    {characters.map((character: any) => (
                      <li
                        onClick={() =>
                          handleCheckEdit({
                            type: "visibility",
                            characterId: character.infos.id,
                            characterName: character.infos.name,
                          })
                        }
                        className="whitespace-nowrap cursor-pointer flex items-center gap-x-2 hover:brightness-125 hover:bg-border/50 p-3"
                      >
                        <div
                          key={character.infos.id}
                          className="check cursor-pointer !ml-0 !w-fit !px-0 flex items-center gap-x-2"
                        >
                          <input
                            type="checkbox"
                            id={character.infos.id}
                            style={{ display: "none" }}
                            checked={handleCheckbox({
                              type: "visibility",
                              characterId: character.infos.id,
                            })}
                            className="cbx2 !ml-0 !w-fit !px-0"
                          />
                          <label
                            htmlFor={character.infos.id}
                            className="check !ml-0 !w-fit !px-0 pointer-events-none select-none"
                          >
                            <svg width="18px" height="18px" viewBox="0 0 18 18">
                              <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
                              <polyline points="1 9 7 14 15 4"></polyline>
                            </svg>
                          </label>
                          <span>{character.infos.name}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlowingWrapper>
            </li>
          </ul>
        </div>
        <div className="border-t border-border w-full mt-8 pt-6">
          <h3 className="block mb-2 text-4xl font-bold background-gradient bg-clip-text text-transparent">
            Content
          </h3>
        </div>
        {editableData.upload ? (
          <img
            src={editableData.upload}
            width={1000}
            height={1000}
            alt=""
            className="select-none w-[681px] mx-auto pointer-events-none"
          />
        ) : (
          <>
            <ul className="grid grid-cols-2 gap-2">
              {Array.from({ length: editableData.content.type?.inputs }).map(
                (_, index) => (
                  <li
                    key={index}
                    className="col-span-1 relative -z-0 text-base flex flex-col"
                  >
                    <span className="text-gray-400 z-0 relative text-sm font-medium">
                      Input {index + 1}
                    </span>
                    <GlowingWrapper inset="0">
                      <textarea
                        value={editableData.content.inputs[index] || ""}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                        placeholder="Enter content"
                        className="py-1 px-2 resize-none overflow-y-scroll no-scrollbar h-[100px] w-full cursor-text hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded bg-border/50 border border-border outline-none"
                      />
                    </GlowingWrapper>
                  </li>
                )
              )}
            </ul>
            {editableData.content.type && (
              <div className="relative z-0 mx-auto w-fit">
                <HandoutDisplay {...editableData} />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
