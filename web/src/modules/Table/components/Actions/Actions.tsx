"use client"

import { useEffect, useRef, useState } from "react"
import { CharacterRoll, Sender, SystemRoll } from "./components"
import { ModalWrapper } from "@/shared/components/ui/ModalWrapper/ModalWrapper"
import { Dice } from "../Dice"
import { useRolls } from "../../../../shared/contexts/Rolls/RollsContext"
import { convertTimestamp } from "../../../../shared/utils/convertTimestamp"

export const Actions = () => {
  const { rolls, openDiceModal, setOpenDiceModal } = useRolls()
  const chatRef = useRef<HTMLDivElement>(null)
  const [showButton, setShowButton] = useState(false)
  const [mounted, setMounted] = useState<boolean>(false)

  const diceRollSound = new Audio("/rolling-dice-2-102706.mp3")
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
  }, [rolls])

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [])

  const handleScroll = () => {
    if (chatRef.current) {
      const isAtBottom =
        chatRef.current.scrollTop + chatRef.current.clientHeight >=
        chatRef.current.scrollHeight - 100
      setShowButton(!isAtBottom)
    }
  }

  useEffect(() => {
    const chat = chatRef.current
    if (chat) chat.addEventListener("scroll", handleScroll)
    return () => {
      if (chat) chat.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section
      ref={chatRef}
      className="w-full min-w-[20vw] max-w-[20vw] overflow-x-hidden box-content !relative  h-screen overflow-y-scroll no-scrollbar"
    >
      {openDiceModal === true && (
        <ModalWrapper status={openDiceModal} onStatusChange={setOpenDiceModal}>
          <div>
            <Dice />
          </div>
        </ModalWrapper>
      )}

      {rolls.map((roll) => (
        <div key={roll.id} className="space-y-2">
          {roll.characterRoll && (
            <div className="flex flex-col p-2">
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

      {/*  */}
      {showButton && (
        <button
          onClick={scrollToBottom}
          className="sticky z-40 bottom-4 left-1/2 -translate-x-1/2 bg-ashes text-white p-1 rounded-full  shadow-md shadow-black/50"
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
      <div className="h-[100px] bg-background flex items-center justify-center w-[20vw] border-t border-border">
        <span
          className={`${
            openDiceModal === true ? " rotate-90 " : " hover:rotate-90 "
          }  transition-all transform duration-500 ease-in-out cursor-pointer group bg-ashes p-2 rounded-full  shadow-md shadow-black/50`}
          onClick={() => setOpenDiceModal(true)}
        >
          <svg
            width="52"
            height="52"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M47.1128 11.7944L27.6128 0.436632C27.1234 0.150691 26.5668 0 26 0C25.4332 0 24.8766 0.150691 24.3872 0.436632L4.88719 11.7954C3.87461 12.3844 3.25 13.4823 3.25 14.6716V37.3292C3.25 38.5185 3.87461 39.6154 4.88719 40.2054L24.3872 51.5632C24.8766 51.8492 25.4332 51.9998 26 51.9998C26.5668 51.9998 27.1234 51.8492 27.6128 51.5632L47.1128 40.2054C48.1254 39.6154 48.75 38.5175 48.75 37.3292V14.6716C48.75 13.4823 48.1254 12.3844 47.1128 11.7944ZM26 5.85194L35.618 17.8749H16.382L26 5.85194ZM15.9067 21.1249H36.0923L26 37.5242L15.9067 21.1249ZM22.8414 38.5926L8.92937 36.8539L13.4418 23.3176L22.8414 38.5926ZM38.5582 23.3166L43.0706 36.8529L29.1586 38.5926L38.5582 23.3166ZM39.2864 17.2544L29.9274 5.55741L43.9441 13.7616L39.2864 17.2544ZM12.7136 17.2544L8.01734 13.7322L22.0878 5.53608L12.7136 17.2544ZM11.0876 20.0961L6.50406 33.8476L6.52133 16.6714L11.0876 20.0961ZM24.375 42.059V47.7901L11.9234 40.503L24.375 42.059ZM40.1781 40.4898L27.625 47.8196V42.059L40.1781 40.4898ZM40.9124 20.0961L45.498 16.6572L45.4807 33.7999L40.9124 20.0961ZM26.0142 48.7499H26.0315L26.0223 48.755L26.0142 48.7499Z"
              className={`${
                openDiceModal === true
                  ? " fill-[url(#paint-hover)] "
                  : " group-hover:fill-[url(#paint-hover)] fill-[url(#paint-default)] "
              }  transition-colors transform duration-1000 ease-in-out`}
            />
            <defs>
              <linearGradient
                id="paint-default"
                x1="26"
                y1="0"
                x2="26"
                y2="52"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FFFFFF" />
                <stop offset="1" stopColor="#FFFFFF" />
              </linearGradient>
              <linearGradient
                id="paint-hover"
                x1="26"
                y1="0"
                x2="26"
                y2="52"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#12D9C1" />
                <stop offset="1" stopColor="#EC7FFF" />
              </linearGradient>
            </defs>
          </svg>
        </span>
      </div>
    </section>
  )
}
