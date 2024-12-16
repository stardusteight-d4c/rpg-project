'use client'

import React, { Dispatch, SetStateAction, useRef } from "react"
import ReactDOM from "react-dom"
import { Zoom } from "react-awesome-reveal"

interface ModalWrapperProps {
  status: "open" | "close"
  onStatusChange: Dispatch<SetStateAction<"close" | "open">>
  children: React.ReactNode
}

export const ModalWrapper = ({
  status,
  children,
  onStatusChange,
}: ModalWrapperProps) => {
  if (status === "close") return null

  const modalContentRef = useRef<HTMLDivElement | null>(null)

  // Função que fecha o modal apenas se o clique for fora do conteúdo
  const handleBackgroundClick = (e: React.MouseEvent) => {
    // Se o clique for dentro do conteúdo do modal, não faz nada
    if (modalContentRef.current && modalContentRef.current.contains(e.target as Node)) {
      return
    }
    // Caso contrário, fecha o modal
    onStatusChange("close")
  }

  return ReactDOM.createPortal(
    <div className="w-screen h-screen inset-0 !z-[1000] fixed" onClick={handleBackgroundClick}>
      <div className="relative w-screen h-screen">
        <div className="transform backdrop-blur-sm fixed z-[600] inset-0 w-screen h-screen" />
        <Zoom className="!z-[950] !relative" duration={300}>
          <div className="w-screen h-screen relative z-[950]">
            <div
              ref={modalContentRef} // Referência ao conteúdo do modal
              className="w-fit z-[900] md:bg-background shadow-p md:border md:border-border rounded absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#cccccc80"
                viewBox="0 0 256 256"
                onClick={() => onStatusChange("close")}
                className="absolute right-2 top-2 cursor-pointer rounded-full"
              >
                <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
              </svg>
              {children}
            </div>
          </div>
        </Zoom>
      </div>
    </div>,
    document.body
  )
}
