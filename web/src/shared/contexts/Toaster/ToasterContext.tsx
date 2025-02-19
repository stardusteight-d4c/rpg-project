"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type ToastType = "success" | "error" | "info"

interface Toast {
  id: number
  message: string
  type: ToastType
  duration: number
}

interface ToastContextType {
  addToast: (
    message: string,
    type?: ToastType,
    position?: number,
    duration?: number
  ) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [position, setPosition] = useState<number>(0)

  const addToast = (
    message: string,
    type: ToastType = "info",
    position: number = 0,
    duration: number = 5000
  ) => {
    const id = Date.now()
    setPosition(position)
    setToasts((prev) => [...prev, { id, message, type, duration }])
    setTimeout(() => removeToast(id), duration)
  }

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div
        className={`top-[${position}px] fixed right-4 flex flex-col gap-2 z-[9999]`}
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="relative w-[300px] mt-4 min-w-[300px] max-w-[300px] bg-ashes p-4 overflow-hidden rounded-2xl shadow-md shadow-black/50 text-white transition-all duration-500 translate-x-10 opacity-0 animate-slide-in"
          >
            <div
              onClick={() => removeToast(toast.id)}
              className="absolute cursor-pointer p-[2px] right-2 top-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="#9ca3af"
                viewBox="0 0 256 256"
              >
                <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
              </svg>
            </div>
            <div className="">
              {toast.type === "success" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#22c55e"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"></path>
                </svg>
              )}
              {toast.type === "error" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#ef4444"
                  viewBox="0 0 256 256"
                >
                  <path d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM222.93,203.8a8.5,8.5,0,0,1-7.48,4.2H40.55a8.5,8.5,0,0,1-7.48-4.2,7.59,7.59,0,0,1,0-7.72L120.52,44.21a8.75,8.75,0,0,1,15,0l87.45,151.87A7.59,7.59,0,0,1,222.93,203.8ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z"></path>
                </svg>
              )}
              {toast.type === "info" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#3b82f6"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z"></path>
                </svg>
              )}
              {toast.message}
            </div>
            <div
              className="absolute bottom-0 left-0 h-1"
              style={{
                backgroundColor: `${
                  (toast.type === "success" && "#22c55e") ||
                  (toast.type === "error" && "#ef4444") ||
                  (toast.type === "info" && "#3b82f6")
                }`,
                width: "100%",
                animation: `progress ${toast.duration}ms linear forwards`,
              }}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
