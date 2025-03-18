"use client"

import { useState } from "react"
import { Loader } from "@/shared/components/ui"

interface ButtonProps {
  id?: string
  title: string
  action: () => any | Promise<any>
  children?: React.ReactNode
  bgColor?: "blue" | "green" | "red" | "gradientPurple" | "gradientBlue"
  variant?: "modal" | "default" | "icon"
  disabled?: boolean
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  id,
  title,
  action,
  children,
  className,
  bgColor = "blue",
  variant = "default",
  disabled = false,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  console.log(isLoading)

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
        id={id}
        onClick={handleClick}
        disabled={isLoading || disabled}
        className={`${className} cursor-pointer disabled:cursor-not-allowed disabled:brightness-90 w-fit flex items-center group gap-x-2`}
      >
        <div
          className={`${isLoading ? bgColors.default[bgColor] : " bg-ashes "} ${
            !disabled && bgColors.onGroupHover[bgColor]
          } relative flex items-center justify-center !fill-white !text-white p-1 rounded-full shadow-md shadow-black/50 duration-300 ease-in-out transition-all`}
        >
          {isLoading ? <Loader /> : children}
        </div>
        <span>{title}</span>
      </button>
    )

  if (variant === "default")
    return (
      <button
        id={id}
        onClick={handleClick}
        disabled={isLoading || disabled}
        className={`${bgColors.default[bgColor]} ${className} p-2 w-full disabled:cursor-not-allowed disabled:brightness-90 cursor-pointer hover:brightness-125 flex items-center justify-center min-h-[45px] max-h-[45px] font-medium text-center text-lg text-white rounded-full`}
      >
        {isLoading ? <Loader /> : <span>{title}</span>}
      </button>
    )

  if (variant === "icon")
    return (
      <button
        id={id}
        onClick={handleClick}
        disabled={isLoading || disabled}
        className={`${!disabled && bgColors.onGroupHover[bgColor]} ${
          isLoading ? bgColors.default[bgColor] : " bg-ashes "
        } ${className} disabled:cursor-not-allowed !fill-white !text-white disabled:brightness-90 cursor-pointer hover:brightness-125 bg-background flex items-center justify-center p-1 rounded-full shadow-md shadow-black/50 duration-300 ease-in-out transition-all`}
      >
        {isLoading ? <Loader /> : children}
      </button>
    )
}
