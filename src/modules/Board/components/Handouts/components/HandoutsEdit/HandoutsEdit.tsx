"use client"

import { useState } from "react"
import { handoutContentTypes, handoutsTypes } from "../../data"
import Image from "next/image"
import { HandoutDisplay } from "../HandoutDisplay"
import { characters } from "../../../Characters/mock-data"

interface HandoutsEditProps {
  handout: IHandout
  onEdit: (value: boolean) => void
}

export const HandoutsEdit = ({ handout, onEdit }: HandoutsEditProps) => {
  const [editableData, setEditableData] = useState<IHandout>({
    ...handout,
  })

  function handleForCheckbox(characterId: string) {
    const findItem = editableData.for.find((item) => item.id === characterId)

    if (findItem) return true
    return false
  }

  function handleVisibilityCheckbox(characterId: string) {
    const findItem = editableData.visibility.find(
      (item) => item.id === characterId
    )

    if (findItem) return true
    return false
  }

  const handleForCheckEdit = (characterId: string, characterName: string) => {
    const findItem = editableData.for.find((item) => item.id === characterId)
    if (findItem) {
      const newFor = editableData.for.filter((item) => item.id !== characterId)
      return setEditableData({ ...editableData, for: newFor })
    }
    const editableDataForCopy = editableData.for
    editableDataForCopy.push({ id: characterId, name: characterName })
    setEditableData({ ...editableData, for: editableDataForCopy })
  }

  const handleVisibilityCheckEdit = (
    characterId: string,
    characterName: string
  ) => {
    const findItem = editableData.visibility.find(
      (item) => item.id === characterId
    )
    if (findItem) {
      const newVisibility = editableData.visibility.filter(
        (item) => item.id !== characterId
      )
      return setEditableData({ ...editableData, visibility: newVisibility })
    }
    const editableDataVisibilityCopy = editableData.visibility
    editableDataVisibilityCopy.push({ id: characterId, name: characterName })
    setEditableData({ ...editableData, visibility: editableDataVisibilityCopy })
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
          <h3 className="block mb-2 text-3xl font-bold background-gradient bg-clip-text text-transparent">
            Informations
          </h3>
          <ul className="grid grid-cols-1 gap-2  text-lg">
            <li className="col-span-1 text-lg flex-wrap flex items-center">
              <span className="font-medium min-w-[100px] max-w-[100px]">
                Type:
              </span>
              <div className="relative z-20 overflow-visible group py-1 px-2 w-fit cursor-pointer hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-sm bg-border/50 border border-dashed border-gray-400/20">
                <span>{editableData.type}</span>
                <ul className="left-1/2 -translate-x-1/2 bg-background rounded-md shadow-p border border-border top-full hidden absolute z-[200] group-hover:flex flex-col w-[150px] no-scrollbar max-h-[300px] overflow-y-scroll gap-y-1">
                  {handoutsTypes.map((handoutType, index) => (
                    <>
                      {editableData.type !== handoutType.type && (
                        <li
                          key={index}
                          className="whitespace-nowrap flex items-center gap-x-2 hover:brightness-125 hover:bg-border/50 p-2"
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
            </li>
            <li className="col-span-1 text-lg flex-wrap flex items-center">
              <span className="font-medium min-w-[100px] max-w-[100px]">
                For:
              </span>
              <div className="flex items-center gap-x-4">
                {characters.map((character: any) => (
                  <div
                    onClick={() =>
                      handleForCheckEdit(
                        character.infos.id,
                        character.infos.name
                      )
                    }
                    key={character.infos.id}
                    className="check cursor-pointer !w-fit flex items-center gap-x-1"
                  >
                    <input
                      type="checkbox"
                      id={character.infos.id}
                      style={{ display: "none" }}
                      checked={handleForCheckbox(character.infos.id)}
                      className="cbx2"
                    />
                    <label htmlFor={character.infos.id}  className="check pointer-events-none select-none">
                      <svg width="18px" height="18px" viewBox="0 0 18 18">
                        <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
                        <polyline points="1 9 7 14 15 4"></polyline>
                      </svg>
                    </label>
                    <span>{character.infos.name}</span>
                  </div>
                ))}
              </div>
            </li>
            <li className="col-span-1 text-lg flex items-center">
              <span className="font-medium min-w-[100px] max-w-[100px]">
                Visibility:
              </span>
              <div className="flex items-center gap-x-4">
                {characters.map((character: any) => (
                  <div
                    onClick={() =>
                      handleVisibilityCheckEdit(
                        character.infos.id,
                        character.infos.name
                      )
                    }
                    key={character.infos.id}
                    className="check cursor-pointer !w-fit flex items-center gap-x-1"
                  >
                    <input
                      type="checkbox"
                      id={character.infos.id + "visibility"}
                      style={{ display: "none" }}
                      checked={handleVisibilityCheckbox(character.infos.id)}
                      className="cbx2 pointer-events-none select-none"
                    />
                    <label
                      htmlFor={character.infos.id + "visibility"}
                      className="check pointer-events-none select-none"
                    >
                      <svg width="18px" height="18px" viewBox="0 0 18 18">
                        <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
                        <polyline points="1 9 7 14 15 4"></polyline>
                      </svg>
                    </label>
                    <span>{character.infos.name}</span>
                  </div>
                ))}
              </div>
            </li>
            <li className="col-span-1 text-lg flex items-center">
              <span className="font-medium min-w-[100px] max-w-[100px]">
                Name:
              </span>
              <input
                value={editableData.name}
                className="py-1 px-2 w-full cursor-pointer hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-sm bg-border/50 border border-dashed border-gray-400/20 outline-none"
              />
            </li>
            {/* type === 'newspaper' && () */}
            <div className="col-span-1 mt-8 space-y-2">
              <h3 className="block mb-2 text-3xl font-bold background-gradient bg-clip-text text-transparent">
                Content
              </h3>
              <li className="col-span-1 text-lg flex-wrap flex items-center">
                <span className="font-medium min-w-[100px] max-w-[100px]">
                  Type:
                </span>
                <div className="relative z-10 overflow-visible group py-1 px-2 w-fit cursor-pointer hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-sm bg-border/50 border border-dashed border-gray-400/20">
                  <span>{editableData.content.type}</span>
                  <ul className="left-1/2 -translate-x-1/2 bg-background rounded-md shadow-p border border-border top-full hidden absolute z-[200] group-hover:flex flex-col w-[150px] no-scrollbar max-h-[200px] overflow-y-scroll gap-y-1">
                    {handoutContentTypes.map((handoutContentType, index) => (
                      <>
                        {editableData.content.title !== handoutContentType && (
                          <li
                            key={index}
                            className="whitespace-nowrap flex items-center gap-x-2 hover:brightness-125 hover:bg-border/50 p-2"
                          >
                            <span>{handoutContentType}</span>
                          </li>
                        )}
                      </>
                    ))}
                  </ul>
                </div>
              </li>
              <li className="text-lg flex items-center">
                <span className="font-medium min-w-[100px] max-w-[100px]">
                  Title:
                </span>
                <input className="py-1 px-2 w-full cursor-pointer hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-sm bg-border/50 border border-dashed border-gray-400/20 outline-none" />
              </li>
              <li className="text-lg flex items-center">
                <span className="font-medium min-w-[100px] max-w-[100px]">
                  Article:
                </span>
                <textarea className="py-1 px-2 w-full cursor-pointer hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-sm bg-border/50 border border-dashed border-gray-400/20 outline-none" />
              </li>
            </div>
          </ul>
        </div>
        <div className="relative z-0">
          <HandoutDisplay {...editableData} />
        </div>
      </div>
    </section>
  )
}
