"use client"

import React, { Dispatch, SetStateAction, useRef } from "react"
import ReactDOM from "react-dom"
import { Fade, Zoom } from "react-awesome-reveal"

interface ModalWrapperProps {
  status: "open" | "close"
  onStatusChange: (status: "close" | "open") => void
  children: React.ReactNode
  showCloseIcon?: boolean
}

export const ModalWrapper = ({
  status,
  children,
  onStatusChange,
  showCloseIcon = true,
}: ModalWrapperProps) => {
  if (status === "close") return null

  const modalContentRef = useRef<HTMLDivElement | null>(null)

  // Função que fecha o modal apenas se o clique for fora do conteúdo
  const handleBackgroundClick = (e: React.MouseEvent) => {
    // Se o clique for dentro do conteúdo do modal, não faz nada
    if (
      modalContentRef.current &&
      modalContentRef.current.contains(e.target as Node)
    ) {
      return
    }
    // Caso contrário, fecha o modal
    onStatusChange("close")
  }

  return ReactDOM.createPortal(
    <div
      className="w-screen h-screen inset-0 !z-[1000] fixed"
      onClick={(e) => {
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
              ref={modalContentRef} // Referência ao conteúdo do modal
              className="z-[900] max-h-[500px] w-fit overflow-y-scroll no-scrollbar  md:bg-background shadow-md shadow-black/50 md:border md:border-border rounded-3xl absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
            >
              {showCloseIcon && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="42"
                  height="42"
                  fill="#cccccc80"
                  viewBox="0 0 256 256"
                  onClick={(e) => {
                    onStatusChange("close")
                    e.stopPropagation()
                  }}
                  className="absolute z-[951] right-4 top-4 bg-background p-1 rounded-full cursor-pointer"
                >
                  <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                </svg>
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
