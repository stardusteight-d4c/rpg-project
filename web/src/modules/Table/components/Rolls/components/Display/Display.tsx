import { convertTimestamp } from "@/shared/utils"
import { SystemRoll, Sender, CharacterRoll } from "./components/"
import React, { useEffect, useRef, useState } from "react"

export const Display: React.FC<{ rolls: IRoll[] }> = ({ rolls }) => {
  const [showButton, setShowButton] = useState(false)
  const [mounted, setMounted] = useState<boolean>(false)
  const diceRollSound = new Audio("/rolling-dice.mp3")
  const chatRef = useRef<HTMLDivElement>(null)
  diceRollSound.preload = "auto"
  diceRollSound.volume = 1.0

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (rolls.length > 0 && mounted) {
      diceRollSound.currentTime = 0
      diceRollSound.play()
      if (chatRef.current) {
        chatRef.current.scrollTo({
          top: chatRef.current.scrollHeight,
          behavior: "smooth",
        })
      }
    }
  }, [rolls.length])

  useEffect(() => {
    scrollToBottom()
  }, [rolls.length])

  useEffect(() => {
    const chat = chatRef.current
    if (chat) chat.addEventListener("scroll", handleScroll)
    return () => {
      if (chat) chat.removeEventListener("scroll", handleScroll)
    }
  })

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }

  const handleScroll = () => {
    if (chatRef.current) {
      const isAtBottom =
        chatRef.current.scrollTop + chatRef.current.clientHeight >=
        chatRef.current.scrollHeight - 100
      setShowButton(!isAtBottom)
    }
  }

  if (rolls.length === 0) return

  return (
    <div
      ref={chatRef}
      className="min-h-[100vh] max-h-[100vh] h-screen overflow-y-scroll no-scrollbar pb-[100px]"
    >
      {rolls.map((roll) => (
        <div key={roll.id} className="space-y-2">
          {roll.characterRoll && (
            <div className="flex flex-col  p-2">
              <Sender
                name={roll.character.infos.name}
                characterUrl={roll.character.infos.characterUrl}
              />
              <div className="space-y-4">
                <CharacterRoll {...roll.characterRoll} />
              </div>
              <div className="text-gray-500/80 select-none flex items-center gap-x-[2px] mt-1 w-full justify-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#6b7280"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
                </svg>
                <span className="text-xs block max-h-[16px]">
                  {convertTimestamp(roll.createdAt)}
                </span>
              </div>
            </div>
          )}
          {roll.systemRoll && (
            <div className="flex flex-col p-2">
              <Sender
                name={roll.character.infos.name}
                characterUrl={roll.character.infos.characterUrl}
              />
              <div className="space-y-4">
                <SystemRoll {...roll.systemRoll} />
              </div>
              <div className="text-gray-500/80 select-none flex items-center gap-x-[2px] mt-1 w-full justify-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#6b7280"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
                </svg>
                <span className="text-xs block max-h-[16px]">
                  {convertTimestamp(roll.createdAt)}
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
      {showButton && (
        <button
          onClick={scrollToBottom}
          className="absolute z-40 bottom-[110px] left-1/2 -translate-x-1/2 bg-ashes text-white p-1 rounded-full border border-border shadow-md shadow-black/60"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#FFFFFF"
            viewBox="0 0 256 256"
          >
            <path d="M205.66,149.66l-72,72a8,8,0,0,1-11.32,0l-72-72a8,8,0,0,1,11.32-11.32L120,196.69V40a8,8,0,0,1,16,0V196.69l58.34-58.35a8,8,0,0,1,11.32,11.32Z"></path>
          </svg>
        </button>
      )}
    </div>
  )
}
