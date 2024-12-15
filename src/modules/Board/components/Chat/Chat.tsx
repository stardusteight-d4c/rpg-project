"use client"

import { useEffect, useRef, useState } from "react"
import { Roll, Sender } from "./components"

export const Chat = () => {
  const chatRef = useRef<HTMLDivElement>(null)
  const [showButton, setShowButton] = useState(false)

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
        chatRef.current.scrollHeight
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
      className="max-w-[20vw] w-full !relative  h-screen overflow-y-scroll no-scrollbar"
    >
      <div className="flex flex-col gap-y-2">
        <Sender />
        <div className="space-y-4 p-2">
          <Roll action="Stealth" values={[25, 12, 5]} result={50} />
          <Roll action="Stealth" values={[30, 15, 6]} result={2} />
          <Roll action="Stealth" values={[50, 25, 10]} result={45} />
          <Roll action="Spot Hidden" values={[42, 16, 6]} result={45} />
          <Roll action="Spot Hidden" values={[42, 16, 6]} result={45} />
          <Roll action="Spot Hidden" values={[42, 16, 6]} result={45} />
          <Roll action="Spot Hidden" values={[42, 16, 6]} result={45} />
        </div>
      </div>
      {/* {showButton && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-5 left-2 bg-blue-500 text-white px-4 py-2 rounded shadow-lg"
        >
          Scroll to Bottom
        </button>
      )} */}
    </section>
  )
}
