"use client"

import { useState } from "react"
import { HandoutDisplay } from "../HandoutDisplay"

interface HandoutsEditProps {
  handout: {
    id: string
    name: string
    type: "Note Type 01" | "Note Type 02" | "Newspaper" | "Letter"
    content: any
  }
  onEdit: (value: boolean) => void
}

export const HandoutsEdit = ({ handout, onEdit }: HandoutsEditProps) => {
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
            Handout Informations
          </h3>
          <ul className="grid grid-cols-1 gap-2  text-lg">
            <li className="col-span-1 text-lg flex-wrap flex items-center">
              <span className="font-medium min-w-[100px] max-w-[100px]">
                Type:
              </span>
              <span className="py-1 px-2 w-fit cursor-pointer hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-sm bg-border/50 border border-dashed border-gray-400/20">
                Newspaper
              </span>
            </li>
            <li className="col-span-1 text-lg flex-wrap flex items-center">
              <span className="font-medium min-w-[100px] max-w-[100px]">
                For:
              </span>
              <div className="flex items-center gap-x-2">
                <span className="py-1 px-2 w-fit cursor-pointer hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-sm bg-border/50 border border-dashed border-gray-400/20">
                  Henry Farawel
                </span>
                <span className="py-1 px-2 w-fit cursor-pointer hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-sm bg-border/50 border border-dashed border-gray-400/20">
                  Lizabeth White
                </span>
              </div>
            </li>
            <li className="col-span-1 text-lg flex items-center">
              <span className="font-medium min-w-[100px] max-w-[100px]">
                Visibility:
              </span>
              <div className="flex items-center gap-x-2">
                <span className="py-1 px-2 w-fit cursor-pointer hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-sm bg-border/50 border border-dashed border-gray-400/20">
                  All
                </span>
              </div>
              {/* 'todos' | 'lista de personagens' | 'invisivel' */}
            </li>
            <li className="col-span-1 text-lg flex items-center">
              <span className="font-medium min-w-[100px] max-w-[100px]">
                Name:
              </span>
              <input className="py-1 px-2 w-full cursor-pointer hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-sm bg-border/50 border border-dashed border-gray-400/20 outline-none" />
            </li>
            {/* type === 'newspaper' && () */}
            <div className="col-span-1 mt-8 space-y-2">
              <h3 className="block mb-2 text-3xl font-bold background-gradient bg-clip-text text-transparent">
                Handout Content
              </h3>
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

        <HandoutDisplay {...handout} />
      </div>
    </section>
  )
}
