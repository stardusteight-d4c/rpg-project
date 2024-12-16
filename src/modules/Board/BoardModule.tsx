"use client"

import Image from "next/image"
import { useParams } from "next/navigation"
import { Board } from "./components"
import { useState } from "react"
import { DraggableItem } from "./components/Map/Map"

export function BoardModule() {
  const [active, setActive] = useState<
    "map" | "roll" | "character_sheet" | "characters"
  >("map")

  return (
    <main className="max-h-screen overflow-hidden">
      <div className="w-full flex">
        <Board.Chat />
        <div className="w-fit p-2 border-x border-border">
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
                    ? " background-gradient fill-background "
                    : " fill-white "
                } rounded p-1`}
              >
                <path d="M249.94,120.24l-27.05-6.76a95.86,95.86,0,0,0-80.37-80.37l-6.76-27a8,8,0,0,0-15.52,0l-6.76,27.05a95.86,95.86,0,0,0-80.37,80.37l-27,6.76a8,8,0,0,0,0,15.52l27.05,6.76a95.86,95.86,0,0,0,80.37,80.37l6.76,27.05a8,8,0,0,0,15.52,0l6.76-27.05a95.86,95.86,0,0,0,80.37-80.37l27.05-6.76a8,8,0,0,0,0-15.52Zm-95.49,22.9L139.31,128l15.14-15.14L215,128Zm-52.9,0L41,128l60.57-15.14L116.69,128ZM205.77,109.2,158.6,97.4,146.8,50.23A79.88,79.88,0,0,1,205.77,109.2Zm-62.63-7.65L128,116.69l-15.14-15.14L128,41ZM109.2,50.23,97.4,97.4,50.23,109.2A79.88,79.88,0,0,1,109.2,50.23Zm-59,96.57L97.4,158.6l11.8,47.17A79.88,79.88,0,0,1,50.23,146.8Zm62.63,7.65L128,139.31l15.14,15.14L128,215Zm33.94,51.32,11.8-47.17,47.17-11.8A79.88,79.88,0,0,1,146.8,205.77Z"></path>
              </svg>
            </span>
            <span onClick={() => setActive("roll")} className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="#fafafa"
                viewBox="0 0 256 256"
                className={`${
                  active === "roll"
                    ? " background-gradient fill-background "
                    : " fill-white "
                } rounded p-1`}
              >
                <path d="M192,32H64A32,32,0,0,0,32,64V192a32,32,0,0,0,32,32H192a32,32,0,0,0,32-32V64A32,32,0,0,0,192,32Zm16,160a16,16,0,0,1-16,16H64a16,16,0,0,1-16-16V64A16,16,0,0,1,64,48H192a16,16,0,0,1,16,16ZM104,92A12,12,0,1,1,92,80,12,12,0,0,1,104,92Zm72,0a12,12,0,1,1-12-12A12,12,0,0,1,176,92Zm-72,72a12,12,0,1,1-12-12A12,12,0,0,1,104,164Zm36-36a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm36,36a12,12,0,1,1-12-12A12,12,0,0,1,176,164Z"></path>
              </svg>
            </span>
            <span
              onClick={() => setActive("character_sheet")}
              className="cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="#000000"
                viewBox="0 0 256 256"
                className={`${
                  active === "character_sheet"
                    ? " background-gradient fill-background "
                    : " fill-white "
                } rounded p-1`}
              >
                <path d="M83.19,174.4a8,8,0,0,0,11.21-1.6,52,52,0,0,1,83.2,0,8,8,0,1,0,12.8-9.6A67.88,67.88,0,0,0,163,141.51a40,40,0,1,0-53.94,0A67.88,67.88,0,0,0,81.6,163.2,8,8,0,0,0,83.19,174.4ZM112,112a24,24,0,1,1,24,24A24,24,0,0,1,112,112Zm96-88H64A16,16,0,0,0,48,40V64H32a8,8,0,0,0,0,16H48v40H32a8,8,0,0,0,0,16H48v40H32a8,8,0,0,0,0,16H48v24a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V40A16,16,0,0,0,208,24Zm0,192H64V40H208Z"></path>
              </svg>
            </span>
            <span
              onClick={() => setActive("characters")}
              className="cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="#000000"
                viewBox="0 0 256 256"
                className={`${
                  active === "characters"
                    ? " background-gradient fill-background "
                    : " fill-white "
                } rounded p-1`}
              >
                <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path>
              </svg>
            </span>
          </div>
        </div>
        <div className="max-w-[50vw] w-full relative h-screen">
          {active === "map" && <Board.Map />}
          {active === "roll" && <Board.Roll />}
          {active === "character_sheet" && <Board.CallOfCthulhu />}
        </div>
        <div className="w-[26vw] h-screen border-l border-border">
          <Board.Cam />
          <div>
            <span className="block text-xl p-2">Characters</span>
            <div className="flex items-center gap-x-2 flex-wrap px-2">
              <div className="w-[48px] h-[48px] rounded overflow-hidden">
                <DraggableItem
                  id="1"
                  imgUrl="https://imgcdn.stablediffusionweb.com/2024/10/24/23cb7d83-7cac-43f6-8ac8-84c9cd8475a6.jpg"
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
