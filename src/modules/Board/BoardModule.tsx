"use client"

import Image from "next/image"
import { useParams } from "next/navigation"
import { Board } from "./components"
import { useState } from "react"
import { DraggableItem } from "./components/Map/Map"

export function BoardModule() {
  const [active, setActive] = useState<"map" | "cam">("map")

  return (
    <main className="max-h-screen overflow-hidden">
      <div className="w-full flex">
        <Board.Chat />
        <div className="w-fit p-2 border-l border-border">
          {" "}
          <div className="bg-background  flex flex-col items-center gap-y-4">
            <span onClick={() => setActive("map")} className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill=""
                viewBox="0 0 256 256"
                className={`${
                  active === "map"
                    ? " background-gradient fill-black "
                    : " fill-white "
                } rounded p-1`}
              >
                <path d="M249.94,120.24l-27.05-6.76a95.86,95.86,0,0,0-80.37-80.37l-6.76-27a8,8,0,0,0-15.52,0l-6.76,27.05a95.86,95.86,0,0,0-80.37,80.37l-27,6.76a8,8,0,0,0,0,15.52l27.05,6.76a95.86,95.86,0,0,0,80.37,80.37l6.76,27.05a8,8,0,0,0,15.52,0l6.76-27.05a95.86,95.86,0,0,0,80.37-80.37l27.05-6.76a8,8,0,0,0,0-15.52Zm-95.49,22.9L139.31,128l15.14-15.14L215,128Zm-52.9,0L41,128l60.57-15.14L116.69,128ZM205.77,109.2,158.6,97.4,146.8,50.23A79.88,79.88,0,0,1,205.77,109.2Zm-62.63-7.65L128,116.69l-15.14-15.14L128,41ZM109.2,50.23,97.4,97.4,50.23,109.2A79.88,79.88,0,0,1,109.2,50.23Zm-59,96.57L97.4,158.6l11.8,47.17A79.88,79.88,0,0,1,50.23,146.8Zm62.63,7.65L128,139.31l15.14,15.14L128,215Zm33.94,51.32,11.8-47.17,47.17-11.8A79.88,79.88,0,0,1,146.8,205.77Z"></path>
              </svg>
            </span>
            {/* <span onClick={() => setActive("cam")} className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill=""
                viewBox="0 0 256 256"
                className={`${
                  active === "cam"
                    ? " background-gradient fill-black "
                    : " fill-white "
                } rounded-xl p-1`}
              >
                <path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"></path>
              </svg>
            </span> */}
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="#fafafa"
                viewBox="0 0 256 256"
                className="p-1 cursor-pointer"
              >
                <path d="M192,32H64A32,32,0,0,0,32,64V192a32,32,0,0,0,32,32H192a32,32,0,0,0,32-32V64A32,32,0,0,0,192,32Zm16,160a16,16,0,0,1-16,16H64a16,16,0,0,1-16-16V64A16,16,0,0,1,64,48H192a16,16,0,0,1,16,16ZM104,92A12,12,0,1,1,92,80,12,12,0,0,1,104,92Zm72,0a12,12,0,1,1-12-12A12,12,0,0,1,176,92Zm-72,72a12,12,0,1,1-12-12A12,12,0,0,1,104,164Zm36-36a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm36,36a12,12,0,1,1-12-12A12,12,0,0,1,176,164Z"></path>
              </svg>
            </span>
          </div>
        </div>
        <div className="w-[50vw] relative h-screen">
         <Board.Map />
        </div>
        <div className="w-[26vw] h-screen">
          <Board.Cam />
          <div>
            <span className="block text-xl p-2">Characters</span>
            <div className="flex items-center gap-x-2 flex-wrap px-2 pb-4 border-b border-border">
              <div className="w-[48px] h-[48px] rounded overflow-hidden">
                <DraggableItem
                  id="1"
                  imgUrl="https://avatars.githubusercontent.com/u/87643260?v=4"
                  type="box"
                />
              </div>
              <div className="w-[48px] h-[48px] rounded overflow-hidden">
                <DraggableItem
                  id="2"
                  imgUrl="https://64.media.tumblr.com/df0ecf3bbaa492ab7aeea44d999d5ff4/421c9b12ba7d144e-09/s1280x1920/5fa6f0032208a9b302ccccccf581d80f3141770c.jpg"
                  type="box"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
