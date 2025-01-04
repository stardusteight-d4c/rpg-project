"use client"

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react"
import ReactDOM from "react-dom"

type ModalContextType = {
  showModal: (content: ReactNode) => void
  hideModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null)
  const [position, setPosition] = useState<{
    x: number | undefined
    y: number | undefined
  }>({ x: undefined, y: undefined })
  const [mounted, setMounted] = useState<boolean>(false)

  const showModal = (content: ReactNode) => {
    setModalContent(content)
  }

  const hideModal = () => {
    setModalContent(null)
    setPosition({ x: undefined, y: undefined })
    setMounted(false)
  }

  useEffect(() => {
    if (modalContent && !mounted) {
      setPosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      })
      setMounted(true)
    }
  }, [modalContent])

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {modalContent &&
        ReactDOM.createPortal(
          <div
            style={{
              top: position.y === undefined ? "50%" : position.y,
              left: position.x === undefined ? "50%" : position.x,
            }}
            onMouseDown={(e) => {
              const offsetX = e.clientX - (position.x ?? 0)
              const offsetY = e.clientY - (position.y ?? 0)

              const handleMouseMove = (moveEvent: MouseEvent) => {
                setPosition({
                  x: moveEvent.clientX - offsetX,
                  y: moveEvent.clientY - offsetY,
                })
              }

              const handleMouseUp = () => {
                window.removeEventListener("mousemove", handleMouseMove)
                window.removeEventListener("mouseup", handleMouseUp)
              }

              window.addEventListener("mousemove", handleMouseMove)
              window.addEventListener("mouseup", handleMouseUp)
            }}
            className="select-none z-[800] max-h-[500px] w-[681px] overflow-y-hidden no-scrollbar  shadow-lg shadow-gray-600/5 md:bg-background  md:border md:border-border rounded-2xl absolute -translate-x-1/2 -translate-y-1/2"
          >
            {modalContent}
          </div>,
          document.body
        )}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider")
  }
  return context
}
