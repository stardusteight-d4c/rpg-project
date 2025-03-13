"use client"

import { useState } from "react"

interface ButtonProps {
  title: string
  action: () => any | Promise<any>
  children?: React.ReactNode
  bgColor?: "blue" | "green" | "red" | "gradientPurple" | "gradientBlue"
  variant?: "modal" | "default"
}

export const Button: React.FC<ButtonProps> = ({
  title,
  action,
  children,
  bgColor = "blue",
  variant = "default",
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    if (isLoading) return
    setIsLoading(true)
    try {
      await action()
    } finally {
      setIsLoading(false)
    }
  }

  const bgColors: {
    default: Record<NonNullable<ButtonProps["bgColor"]>, string>
    onGroupHover: Record<NonNullable<ButtonProps["bgColor"]>, string>
    onHover: Record<NonNullable<ButtonProps["bgColor"]>, string>
  } = {
    default: {
      blue: "bg-blue-500",
      green: "bg-green-500",
      red: "bg-red-500",
      gradientBlue: "bg-gradient-to-tr from-[#42d392] to-[#8B5CF6]",
      gradientPurple: "bg-gradient-to-tr from-violet-600 to-pink-500",
    },
    onGroupHover: {
      blue: "group-hover:bg-blue-500",
      green: "group-hover:bg-green-500",
      red: "group-hover:bg-red-500",
      gradientBlue:
        "group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6]",
      gradientPurple:
        "group-hover:bg-gradient-to-tr group-hover:from-violet-600 group-hover:to-pink-500",
    },
    onHover: {
      blue: "hover:bg-blue-500",
      green: "hover:bg-green-500",
      red: "hover:bg-red-500",
      gradientBlue:
        "hover:bg-gradient-to-tr hover:from-[#42d392] hover:to-[#8B5CF6]",
      gradientPurple:
        "hover:bg-gradient-to-tr hover:from-violet-600 hover:to-pink-500",
    },
  }

  if (variant === "modal")
    return (
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="cursor-pointer disabled:cursor-not-allowed disabled:brightness-90 w-fit flex items-center group gap-x-2"
      >
        <div
          className={`${isLoading ? bgColors.default[bgColor] : " bg-ashes "} ${
            bgColors.onGroupHover[bgColor]
          } relative flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 duration-300 ease-in-out transition-all`}
        >
          {isLoading ? <Loader /> : children}
        </div>
        <span>{title}</span>
      </button>
    )

  if (variant === "default")
    return (
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`${bgColors.default[bgColor]} p-2 w-full disabled:cursor-not-allowed disabled:brightness-90 cursor-pointer hover:brightness-125 flex items-center justify-center min-h-[45px] max-h-[45px] font-medium text-center text-lg text-white rounded-full`}
      >
        {isLoading ? <Loader /> : <span>{title}</span>}
      </button>
    )
}

const Loader = () => {
  return (
    <div className="w-fit mx-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="#FFFFFF"
        className="animate-spin"
        viewBox="0 0 256 256"
      >
        <path d="M136,32V64a8,8,0,0,1-16,0V32a8,8,0,0,1,16,0Zm88,88H192a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16Zm-45.09,47.6a8,8,0,0,0-11.31,11.31l22.62,22.63a8,8,0,0,0,11.32-11.32ZM128,184a8,8,0,0,0-8,8v32a8,8,0,0,0,16,0V192A8,8,0,0,0,128,184ZM77.09,167.6,54.46,190.22a8,8,0,0,0,11.32,11.32L88.4,178.91A8,8,0,0,0,77.09,167.6ZM72,128a8,8,0,0,0-8-8H32a8,8,0,0,0,0,16H64A8,8,0,0,0,72,128ZM65.78,54.46A8,8,0,0,0,54.46,65.78L77.09,88.4A8,8,0,0,0,88.4,77.09Z"></path>
      </svg>
    </div>
  )
}
