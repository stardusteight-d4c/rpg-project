"use client"

import { useEffect, useState } from "react"
import { AudioPlayer } from "./components/AudioPlayer"

export const Sounds = () => {
  const [sounds, setSounds] = useState<Sound[]>([])

  useEffect(() => {
    ;(async () => {
      await fetch("/sounds.json")
        .then((res) => res.json())
        .then((data: Sound[]) => {
          setSounds(data)
        })
        .catch((error) => console.log(error))
    })()
  }, [])

  if (sounds.length === 0) return null

  return (
    <section className="relative w-full h-screen overflow-y-scroll no-scrollbar">
      <div className="px-2 pt-2 border-b border-border pb-2 z-[100] bg-background">
        <AudioPlayer sound={sounds[0]} />
        <div className="rounded-lg flex items-center gap-x-1 text-gray-400 border border-border mt-2 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="#9ca3af"
            viewBox="0 0 256 256"
          >
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z"></path>
          </svg>
          <span>
            The player above is the player of the match, that is, all players
            hear him.
          </span>
        </div>
      </div>
      <div className="p-2 grid grid-cols-2 gap-2">
        {sounds.map((sound, index) => (
          <AudioPlayer sound={sound} key={index} />
        ))}
        {sounds.map((sound, index) => (
          <AudioPlayer sound={sound} key={index} />
        ))}
      </div>
    </section>
  )
}
