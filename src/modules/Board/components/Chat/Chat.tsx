"use client"

import { GlowingWrapper } from "@/shared/components"
import { Sender } from "../Actions/components"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { useEffect, useRef, useState } from "react"

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
        chatRef.current.scrollHeight - 120
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
    <section className="w-full relative h-screen overflow-hidden">
      <div
        ref={chatRef}
        className="p-2 pb-[108px] relative z-[50] space-y-8 no-scrollbar h-screen overflow-y-scroll"
      >
        <div className="flex flex-col">
          <Sender
            characterUrl="https://imgcdn.stablediffusionweb.com/2024/10/24/23cb7d83-7cac-43f6-8ac8-84c9cd8475a6.jpg"
            name="Erwin Farwell"
          />
          <div className="space-y-4 markdown-context w-full bg-border/50 rounded-3xl border border-border px-4 pb-2">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {`Agnes não acompanhou Clarence e Walter na noite de bebedeira. Diz que ficou estudando na cabana. Reforça que foi visitar Walter, mas ele nao deixou ela entrar porque a mãe estava doente. Ela revela que a mãe de Walter morreu faz 10 anos. 

Relata que teve sonhos estranhos no vale de miskatonic, mas depois que foi embora, os sonhos pararam. Diz que era como se ela estivesse sendo enterrada no sonho, como se ela estivesse debaixo da terra.*

Diz que escutava a voz de sua mãe, que cada um escutava uma voz diferente. 

Disse que no sonho a voz de sua mãe a chamava para casa, a chamava para ficar com ela novamente.

*Será que a sensação tem algo a ver com a caverna sagrada?`}
            </ReactMarkdown>
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
            <span className="text-xs block max-h-[16px]">2025-01-01 14:57</span>
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <Sender
            characterUrl="https://imgcdn.stablediffusionweb.com/2024/10/24/23cb7d83-7cac-43f6-8ac8-84c9cd8475a6.jpg"
            name="Erwin Farwell"
          />
          <div className="space-y-4 markdown-context w-full bg-border/50 rounded-3xl border border-border px-4 pb-2">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {`Agnes não acompanhou Clarence e Walter na noite de bebedeira. Diz que ficou estudando na cabana. Reforça que foi visitar Walter, mas ele nao deixou ela entrar porque a mãe estava doente. Ela revela que a mãe de Walter morreu faz 10 anos. 

Relata que teve sonhos estranhos no vale de miskatonic, mas depois que foi embora, os sonhos pararam. Diz que era como se ela estivesse sendo enterrada no sonho, como se ela estivesse debaixo da terra.*

Diz que escutava a voz de sua mãe, que cada um escutava uma voz diferente. 

Disse que no sonho a voz de sua mãe a chamava para casa, a chamava para ficar com ela novamente.

*Será que a sensação tem algo a ver com a caverna sagrada?`}
            </ReactMarkdown>
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
            <span className="text-xs block max-h-[16px]">2025-01-01 14:58</span>
          </div>
        </div>
      </div>
      {showButton && (
        <button
          onClick={scrollToBottom}
          className="sticky z-[200] bottom-[116px] left-1/2 -translate-x-1/2 w-fit bg-ashes text-white p-1 rounded-full  shadow-md shadow-black/50"
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
      <div className="h-[100px] bg-background z-[200] flex items-center gap-x-4 p-2 pr-4 bottom-0 inset-x-0 border-t border-border absolute">
        <GlowingWrapper styles="w-full" border="rounded-3xl" inset="0">
          <textarea
            name=""
            id=""
            placeholder="Send a message..."
            spellCheck="false"
            className="p-2 px-4 resize-none overflow-y-scroll no-scrollbar h-[84px] w-full cursor-text hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-3xl shadow-p bg-border/50 border border-border outline-none"
          ></textarea>
        </GlowingWrapper>

        <span className="flex hover:brightness-125 active:scale-95 transition-all duration-300 ease-in-out items-center  justify-center text-white p-2 rounded-full w-fit  shadow-md shadow-black/50 cursor-pointer bg-gradient-to-tr from-[#42d392] to-[#8B5CF6]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#FFFFFF"
            viewBox="0 0 256 256"
          >
            <path d="M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.49,29.8L102,154l41.3,84.87A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14,0-.07-40.06-82.3,48-48a8,8,0,0,0-11.31-11.31l-48,48L24.08,98.25l-.07,0,.14,0L216,40Z"></path>
          </svg>
        </span>
      </div>
    </section>
  )
}
