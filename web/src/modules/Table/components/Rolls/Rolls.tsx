"use client"

import React, { useEffect, useRef, useState } from "react"
import { useTableRolls } from "@/shared/contexts"
import { Components } from "./components"

export const Rolls = () => {
  const { rolls } = useTableRolls()
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
  }, [chatRef])

  return (
    <Wrapper>
      <Components.Empty length={rolls.length} />
      <Components.Display rolls={rolls} chatRef={chatRef} />
      <Components.ToBottom
        showButton={showButton}
        scrollToBottom={scrollToBottom}
      />
      <Components.Dice />
    </Wrapper>
  )
}

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <section className="w-full min-w-[20vw] max-w-[20vw] min-h-[100vh] max-h-[100vh] relative overflow-y-scroll no-scrollbar">
      {children}
    </section>
  )
}
