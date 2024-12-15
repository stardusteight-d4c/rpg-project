"use client"

import Image from "next/image"
import { useParams } from "next/navigation"
import { Board } from "./components"

export function BoardModule() {
  const params = useParams()
  return (
    <main className="max-h-screen overflow-hidden">
      <div className="w-full flex">
        <div className="w-[4vw] border-r border-border">Menu</div>
        <Board.Chat />
        <div className="w-[50vw] border-x border-border h-screen">
          <Image
            src="/Simple-house-1.png"
            alt=""
            width={1000}
            height={1000}
            className="w-full h-full object-fill select-none pointer-events-none"
          />
        </div>
        <div className="p-2 w-[21vw] h-screen">
          <div className="grid items-center justify-center gap-2 grid-cols-4">
            <img
              src="https://avatars.githubusercontent.com/u/87643260?v=4"
              alt=""
              className="col-span-1 w-full rounded-full h-full"
            />
            <img
              src="https://avatars.githubusercontent.com/u/87643260?v=4"
              alt=""
              className="col-span-1 w-full rounded-full h-full"
            />
            <img
              src="https://avatars.githubusercontent.com/u/87643260?v=4"
              alt=""
              className="col-span-1 w-full rounded-full h-full"
            />
            <img
              src="https://avatars.githubusercontent.com/u/87643260?v=4"
              alt=""
              className="col-span-1 w-full rounded-full h-full"
            />
            <img
              src="https://avatars.githubusercontent.com/u/87643260?v=4"
              alt=""
              className="col-span-1 w-full rounded-full h-full"
            />
            <img
              src="https://avatars.githubusercontent.com/u/87643260?v=4"
              alt=""
              className="col-span-1 w-full rounded-full h-full"
            />
          </div>
        </div>
      </div>
    </main>
  )
}
