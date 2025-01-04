"use client"

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react"
import ReactDOM from "react-dom"

type ModalData = {
  id: string
  content: ReactNode
  position: { x: number; y: number }
  zIndex: number
}

type ModalContextType = {
  showModal: (id: string, content: ReactNode) => void
  hideModal: (id: string) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<ModalData[]>([])
  const [maxZIndex, setMaxZIndex] = useState(850)
  const showModal = (id: string, content: ReactNode) => {
    setModals((prevModals) => {
      // Verifica se o modal já existe
      if (prevModals.some((modal) => modal.id === id)) return prevModals

      // Adiciona o novo modal
      return [
        ...prevModals,
        {
          id,
          content,
          position: {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
          },
          zIndex: maxZIndex, // Define zIndex inicial
        },
      ]
    })

    // Incrementa o controle do maior z-index
    setMaxZIndex((prev) => prev + 1)
  }

  const hideModal = (id: string) => {
    setModals((prevModals) => prevModals.filter((modal) => modal.id !== id))
  }

  const updatePosition = (id: string, x: number, y: number) => {
    setModals((prevModals) =>
      prevModals.map((modal) =>
        modal.id === id ? { ...modal, position: { x, y } } : modal
      )
    )
  }

  const bringToFront = (id: string) => {
    setModals((prevModals) =>
      prevModals.map((modal) =>
        modal.id === id ? { ...modal, zIndex: maxZIndex } : modal
      )
    )
    setMaxZIndex((prev) => prev + 1) // Incrementa o controle de z-index
  }

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {modals.map((modal) =>
        ReactDOM.createPortal(
          <div
            key={modal.id}
            style={{
              top: modal.position.y,
              left: modal.position.x,
              zIndex: modal.zIndex,
              transform: "translate(-50%, -50%)",
              position: "absolute",
            }}
            onMouseDown={() => bringToFront(modal.id)}
            onMouseDownCapture={(e) => {
              const offsetX = e.clientX - modal.position.x
              const offsetY = e.clientY - modal.position.y

              const handleMouseMove = (moveEvent: MouseEvent) => {
                updatePosition(
                  modal.id,
                  moveEvent.clientX - offsetX,
                  moveEvent.clientY - offsetY
                )
              }

              const handleMouseUp = () => {
                window.removeEventListener("mousemove", handleMouseMove)
                window.removeEventListener("mouseup", handleMouseUp)
              }

              window.addEventListener("mousemove", handleMouseMove)
              window.addEventListener("mouseup", handleMouseUp)
            }}
            className="select-none !scale-[.7] z-[800] max-h-[500px] w-[681px] overflow-y-hidden no-scrollbar shadow-md shadow-black/50 md:bg-background md:border md:border-border rounded-2xl"
          >
            {modal.content}
          </div>,
          document.body
        )
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
