"use client"

import { useEffect, useRef, useState } from "react"

interface CustomNumericInputProps {
  value: number
  onChange: (value: number) => void
}

export const CustomNumericInput: React.FC<CustomNumericInputProps> = ({
  value,
  onChange,
}) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [clickType, setClickType] = useState<"up" | "down" | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    if (inputValue === "") {
      onChange(0)
      return
    }

    const newValue = parseInt(inputValue, 10)
    if (!isNaN(newValue)) {
      onChange(Math.max(0, Math.min(100, newValue)))
    }
  }

  useEffect(() => {
    if (clickType) {
      intervalRef.current = setInterval(() => {
        const newValue =
          clickType === "up" ? Math.min(100, value + 1) : Math.max(0, value - 1)
        onChange(newValue)
      }, 100)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [clickType, onChange])

  useEffect(() => {
    const handleMouseUp = () => setClickType(null)

    window.addEventListener("mouseup", handleMouseUp)
    return () => window.removeEventListener("mouseup", handleMouseUp)
  }, [])

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        className="w-[28px] font-medium z-10 relative pl-1 h-[30px] rounded-l bg-border outline-none caret-white"
      />
      <div className="w-[30px] h-[30px] bg-border rounded-r">
        <svg
          onClick={() => onChange(Math.min(100, value + 1))}
          onMouseDown={() => setClickType("up")}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#FAFAFA"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="w-full h-[50%] cursor-pointer border-b border-border"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
        <svg
          onClick={() => onChange(Math.max(0, value - 1))}
          onMouseDown={() => setClickType("down")}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#FAFAFA"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="w-full h-[50%] cursor-pointer rotate-180"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
      </div>
    </div>
  )
}
