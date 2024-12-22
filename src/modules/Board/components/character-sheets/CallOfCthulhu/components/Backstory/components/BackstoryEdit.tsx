"use client"

import { useEffect, useRef, useState } from "react"
import ReactMarkdown from "react-markdown"

interface BackstoryEditProps {
  backstory: string
  activeItems: (
    | "attributes"
    | "skills"
    | "inventory"
    | "combat"
    | "backstory"
    | null
  )[]
  toggleItem: (
    item: "attributes" | "skills" | "inventory" | "combat" | "backstory"
  ) => void
}

export const BackstoryEdit = ({
  activeItems,
  toggleItem,
  backstory,
}: BackstoryEditProps) => {
  const [currentBackstory, setCurrentBackstory] = useState(backstory)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [view, setView] = useState<"editor" | "markdown" | "tutorial">("editor")

  useEffect(() => {
    if (activeItems && !isMounted) {
      adjustHeight()
      setIsMounted(false)
    }
  }, [activeItems])

  function adjustHeight() {
    const textarea = textareaRef.current

    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    adjustHeight()
    setCurrentBackstory(e.target.value)
  }

const test = `# Headers
              We can add various levels of headers to our R Markdown document by using the hash symbol (#). Here is the syntax:

              # Header 1 (main title)
              ## Header 2 (section)
              ### Header 3 (subsection)

When rendered, the above headers will look as follows:
W`

  return (
    <div className="mb-4 rounded border border-border">
      <div
        onClick={() => toggleItem("backstory")}
        className="flex p-2 cursor-pointer items-center justify-between sticky top-[49px] z-[100] shadow-sm shadow-black/50 bg-[#0e0e0e]"
      >
        <h3 className="text-2xl flex items-center gap-x-2 font-semibold">
          <span className="p-2 rounded">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28.9562 24.3187L24.8075 4.59366C24.7538 4.33572 24.6497 4.09091 24.5012 3.87331C24.3526 3.65572 24.1626 3.46962 23.9419 3.3257C23.7212 3.18179 23.4742 3.0829 23.2152 3.03471C22.9562 2.98652 22.6902 2.98999 22.4325 3.04491L16.5812 4.30241C16.0637 4.41574 15.6118 4.72883 15.3239 5.17359C15.036 5.61836 14.9353 6.15881 15.0437 6.67741L19.1925 26.4024C19.285 26.8524 19.5295 27.2569 19.8851 27.5478C20.2407 27.8388 20.6856 27.9984 21.145 27.9999C21.287 27.9997 21.4286 27.9846 21.5675 27.9549L27.4188 26.6974C27.9369 26.5838 28.3893 26.2701 28.6772 25.8246C28.9652 25.379 29.0655 24.8378 28.9562 24.3187ZM17 6.26866C17 6.26116 17 6.25741 17 6.25741L22.85 5.00741L23.2663 6.99116L17.4163 8.24991L17 6.26866ZM17.8275 10.2024L23.68 8.94616L24.0975 10.9337L18.25 12.1912L17.8275 10.2024ZM18.6575 14.1487L24.51 12.8912L26.1725 20.7962L20.32 22.0537L18.6575 14.1487ZM27 24.7424L21.15 25.9924L20.7337 24.0087L26.5837 22.7499L27 24.7312C27 24.7387 27 24.7424 27 24.7424ZM13 3.99991H7C6.46957 3.99991 5.96086 4.21063 5.58579 4.5857C5.21071 4.96077 5 5.46948 5 5.99991V25.9999C5 26.5303 5.21071 27.0391 5.58579 27.4141C5.96086 27.7892 6.46957 27.9999 7 27.9999H13C13.5304 27.9999 14.0391 27.7892 14.4142 27.4141C14.7893 27.0391 15 26.5303 15 25.9999V5.99991C15 5.46948 14.7893 4.96077 14.4142 4.5857C14.0391 4.21063 13.5304 3.99991 13 3.99991ZM7 5.99991H13V7.99991H7V5.99991ZM7 9.99991H13V21.9999H7V9.99991ZM13 25.9999H7V23.9999H13V25.9999Z"
                fill="url(#paint0_linear_59_11)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_59_11"
                  x1="16.9997"
                  y1="3.00098"
                  x2="16.9997"
                  y2="27.9999"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#42D392" />
                  <stop offset="1" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="background-gradient bg-clip-text text-transparent">
            Backstory
          </span>
        </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#cccccc80"
          viewBox="0 0 256 256"
          className={`${
            activeItems.includes("backstory") ? "rotate-180" : "rotate-0"
          } transition-all duration-300 ease-in-out`}
        >
          <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
        </svg>
      </div>
      {activeItems.includes("backstory") && (
        <div className="h-fit w-full">
          <div className="sticky flex items-center justify-between top-[113px] z-[100] w-full bg-border border-b border-border shadow-sm shadow-black/50">
            <div className="flex items-center gap-x-2">
              <span
                onClick={() => setView("markdown")}
                className="block p-2 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="#FFFFFF"
                  viewBox="0 0 256 256"
                >
                  <path d="M228,175a8,8,0,0,1-10.92-3l-19-33.2A123.23,123.23,0,0,1,162,155.46l5.87,35.22a8,8,0,0,1-6.58,9.21A8.4,8.4,0,0,1,160,200a8,8,0,0,1-7.88-6.69l-5.77-34.58a133.06,133.06,0,0,1-36.68,0l-5.77,34.58A8,8,0,0,1,96,200a8.4,8.4,0,0,1-1.32-.11,8,8,0,0,1-6.58-9.21L94,155.46a123.23,123.23,0,0,1-36.06-16.69L39,172A8,8,0,1,1,25.06,164l20-35a153.47,153.47,0,0,1-19.3-20A8,8,0,1,1,38.22,99c16.6,20.54,45.64,45,89.78,45s73.18-24.49,89.78-45A8,8,0,1,1,230.22,109a153.47,153.47,0,0,1-19.3,20l20,35A8,8,0,0,1,228,175Z"></path>
                </svg>
              </span>
              <span
                onClick={() => setView("editor")}
                className="block p-2 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="#FFFFFF"
                  viewBox="0 0 256 256"
                >
                  <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path>
                </svg>
              </span>
            </div>
            <span
              onClick={() => setView("tutorial")}
              className=" text-sm text-gray-400 flex items-center gap-x-2 p-2 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="#9ca3af"
                viewBox="0 0 256 256"
              >
                <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
              </svg>
              <span>How to write in Markdown?</span>
            </span>
          </div>
          {view === "markdown" && (
            <div className="p-2 space-y-4 text-base">
              <ReactMarkdown>{currentBackstory}</ReactMarkdown>
            </div>
          )}
          {view === "editor" && (
            <textarea
              ref={textareaRef}
              spellCheck="false"
              className="w-full min-h-[400px] p-2 border-none rounded bg-background resize-none outline-none"
              value={currentBackstory}
              onChange={handleInputChange}
            ></textarea>
          )}
          {view === "tutorial" && (
            <ReactMarkdown>
              {test}
            </ReactMarkdown>
          )}
        </div>
      )}
    </div>
  )
}
