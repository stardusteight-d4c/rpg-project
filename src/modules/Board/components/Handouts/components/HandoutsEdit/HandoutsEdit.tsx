"use client"

import { useState } from "react"
import { handoutContentTypes, handoutsTypes } from "../../data"
import Image from "next/image"
import { HandoutDisplay } from "../HandoutDisplay"
import { characters } from "../../../Characters/mock-data"
import { getHandoutIconByType } from "@/shared/utils/getHandoutIconByType"
import { GlowingWrapper } from "@/shared/components"
import { getHandoutContentTypeByCategory } from "@/shared/utils/getHandoutContentTypeByCategory"

interface HandoutsEditProps {
  handout: IHandout
  onEdit: (value: boolean) => void
}

export const HandoutsEdit = ({ handout, onEdit }: HandoutsEditProps) => {
  const [editableData, setEditableData] = useState<IHandout>({
    ...handout,
  })

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
      <div className="sticky border-b border-border  shadow-sm shadow-black/50 z-50 top-0 p-2 w-full inset-x-0 bg-background">
        <div className="flex items-center gap-x-4">
          <div
            onClick={() => onEdit(false)}
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
        </div>
      </div>

      <div className="">
        <div className="p-2">
          <h3 className="block mb-2 text-4xl font-bold background-gradient bg-clip-text text-transparent">
            Informations
          </h3>
          <ul className="grid grid-cols-2 gap-2 text-base">
            <li className="col-span-1 text-base flex flex-col">
              <span className="text-gray-400 text-sm font-medium">Type</span>
              <GlowingWrapper inset="0">
                <div className="relative z-20 overflow-visible group py-1 px-2 w-full cursor-pointer hover:brightness-125 flex items-center justify-center gap-x-1 line-clamp-1 rounded bg-border/50 border border-border">
                  <Image
                    src={getHandoutIconByType(editableData.type)!}
                    width={24}
                    height={24}
                    alt=""
                  />
                  <span>{editableData.type}</span>
                  <ul className="left-1/2 -translate-x-1/2 bg-background rounded-2xl shadow-p border border-border top-full hidden absolute z-[200] group-hover:flex flex-col w-full no-scrollbar max-h-[300px] overflow-y-scroll gap-y-1">
                    {handoutsTypes.map((handoutType, index) => (
                      <>
                        {editableData.type !== handoutType.type && (
                          <li
                            key={index}
                            onClick={() => {
                              updateEditableData({
                                key: "type",
                                value: handoutType.type,
                              })
                              updateEditableData({
                                key: "content",
                                value: { type: undefined, inputs: [] },
                              })
                            }}
                            className="whitespace-nowrap flex items-center gap-x-1 text-base hover:brightness-125 hover:bg-border/50 p-2"
                          >
                            <Image
                              src={handoutType.icon}
                              width={24}
                              height={24}
                              alt=""
                            />
                            <span>{handoutType.type}</span>
                          </li>
                        )}
                      </>
                    ))}
                  </ul>
                </div>
              </GlowingWrapper>
            </li>
            <li className="col-span-1 text-base flex-wrap flex flex-col">
              <span className="text-gray-400 text-sm font-medium">For</span>
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
            <li className="col-span-1 text-base flex flex-col">
              <span className="text-gray-400 text-sm font-medium">Name</span>
              <GlowingWrapper inset="0">
                <input
                  onChange={(e) =>
                    updateEditableData({ key: "name", value: e.target.value })
                  }
                  value={editableData.name}
                  className="py-1 px-2 w-full cursor-text hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded bg-border/50 border border-border outline-none"
                />
              </GlowingWrapper>
            </li>
            {/* type === 'newspaper' && () */}
          </ul>
          <div className="border-t border-border w-full mt-8 pt-6 space-y-2">
            <h3 className="block mb-2 text-4xl font-bold background-gradient bg-clip-text text-transparent">
              Content
            </h3>
            <ul className="grid grid-cols-2">
              <li className="col-span-1 text-base flex-wrap flex flex-col w-full">
                <span className="text-gray-400 text-sm font-medium">Type</span>
                <GlowingWrapper inset="0">
                  <div className="relative z-10 overflow-visible text-center justify-center group py-1 px-2 w-full cursor-pointer hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded bg-border/50 border border-border">
                    <span>{editableData.content.type?.name ?? "Select"}</span>
                    <ul className="left-1/2 -translate-x-1/2 bg-background rounded-2xl shadow-p border border-border top-full hidden absolute z-[900] group-hover:flex flex-col w-full no-scrollbar max-h-[200px] overflow-y-scroll gap-y-1">
                      {getHandoutContentTypeByCategory(
                        editableData.type
                      )?.types.map((item, index) => (
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
            </ul>
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-2 p-2">
          {Array.from({ length: editableData.content.type?.inputs }).map(
            (_, index) => (
              <li
                key={index}
                className="col-span-1 relative z-0 text-base flex flex-col"
              >
                <span className="text-gray-400 z-0 relative text-sm font-medium">
                  Input {index + 1}
                </span>
                <GlowingWrapper inset="0">
                  <textarea
                    value={editableData.content.inputs[index] || ""} // Mostra o valor atual
                    onChange={(e) => handleInputChange(index, e.target.value)} // Atualiza o estado
                    className="py-1 px-2 resize-none h-[100px] w-full cursor-text hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded bg-border/50 border border-border outline-none"
                  />
                </GlowingWrapper>
              </li>
            )
          )}
        </ul>
        {editableData.content.type && (
          <div className="relative z-0">
            <HandoutDisplay {...editableData} />
          </div>
        )}
      </div>
    </section>
  )
}
