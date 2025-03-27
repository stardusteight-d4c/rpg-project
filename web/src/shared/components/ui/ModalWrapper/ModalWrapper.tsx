"use client"

import ReactDOM from "react-dom"
import React, { useEffect, useRef } from "react"
import { Fade, Zoom } from "react-awesome-reveal"

interface ModalWrapperProps {
  status: boolean
  onStatusChange: (status: boolean) => void
  children: React.ReactNode
  showCloseIcon?: boolean
  title?: string
  id?: string
  quantity?: number
}

export const ModalWrapper = ({
  status,
  children,
  onStatusChange,
  showCloseIcon = true,
  title,
  id,
  quantity,
}: ModalWrapperProps) => {
  if (status === false) {
    document.body.style.overflow = ""
    return null
  }

  useEffect(() => {
    document.body.style.overflow = "hidden"
  })

  const modalContentRef = useRef<HTMLDivElement | null>(null)

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (
      modalContentRef.current &&
      modalContentRef.current.contains(e.target as Node)
    ) {
      return
    }
    onStatusChange(false)
  }

  return ReactDOM.createPortal(
    <div
      id={id}
      className="w-screen h-screen inset-0 !z-[1000] fixed"
      onClick={(e) => {
        document.body.style.overflow = ""
        handleBackgroundClick(e)
        e.stopPropagation()
      }}
    >
      <div className="relative w-screen h-screen">
        <Fade
          duration={500}
          className="transform backdrop-blur-sm fixed !z-[600] inset-0 w-screen h-screen"
        >
          <div className="w-full h-full" />
        </Fade>
        <Zoom className="!z-[950] !relative" duration={300}>
          <div className="w-screen h-screen relative z-[950]">
            <div
              ref={modalContentRef}
              className="z-[900] max-h-[500px] w-fit overflow-y-scroll no-scrollbar  md:bg-background shadow-md shadow-black/50 md:border md:border-border rounded-xl absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
            >
              {showCloseIcon && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="38"
                  height="38"
                  fill="#cccccc80"
                  viewBox="0 0 256 256"
                  onClick={(e) => {
                    document.body.style.overflow = ""
                    onStatusChange(false)
                    e.stopPropagation()
                  }}
                  className="absolute z-[951] right-4 top-4 rounded-full cursor-pointer"
                >
                  <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                </svg>
              )}
              {title && (
                <div className="flex items-center gap-x-1">
                  <h3 className="block text-3xl font-bold p-4 pr-0">{title}</h3>
                  {!isNaN(quantity!) && (
                    <div className="bg-border flex items-center justify-center w-fit aspect-square h-[32px] p-2  rounded-full">
                      <span className="text-lg font-bold background-gradient text-transparent bg-clip-text w-fit block">
                        {quantity}
                      </span>
                    </div>
                  )}
                </div>
              )}
              {children}
            </div>
          </div>
        </Zoom>
      </div>
    </div>,
    document.body
  )
}
