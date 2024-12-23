"use client"

import {
  CustomNumericInput,
  DonutChart,
  GlowingWrapper,
} from "@/shared/components"
import { useState } from "react"

interface ProfileInfoProps {
  infos: {
    name: string
    sex: "male" | "female"
    characterUrl: string
    occupation: string
    hitPoints: number
    magicPoints: number
    sanity: number
    inspiration: boolean
  }
  player: {
    id: string
    name: string
    username: string
    avatarUrl: string
  }
  isEditMode?: boolean
}

export const ProfileInfoEdit = ({ infos, player }: ProfileInfoProps) => {
  const [editableData, setEditableData] = useState({
    ...infos,
    characterFile: null,
  })

  const handleEdit = (field: string, value: any) => {
    setEditableData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const tempUrl = URL.createObjectURL(file)

      handleEdit("characterUrl", tempUrl)
      handleEdit("characterFile", file)

      // URL.revokeObjectURL(tempUrl)
    }
  }

  const handleClick = () => {
    const fileInput = document.getElementById("file-input") as HTMLInputElement
    if (fileInput) {
      fileInput.click()
    }
  }

  return (
    <div className="flex">
      <div className="relative rounded w-fit">
        <div className="w-fit h-fit relative">
          <GlowingWrapper>
            {editableData.characterUrl.length > 0 ? (
              <img
                onClick={() => handleClick()}
                src={editableData.characterUrl}
                alt="Imagem do Personagem"
                className="min-w-[210px] max-w-[210px] min-h-[210px] max-h-[210px] cursor-pointer overflow-hidden border border-border object-cover rounded"
              />
            ) : (
              <div
                onClick={() => handleClick()}
                className="min-w-[210px] opacity-50 bg-ashes cursor-pointer flex items-center justify-center flex-col max-w-[210px] min-h-[210px] max-h-[210px] border border-border object-cover rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="42"
                  height="42"
                  fill="#FFFFFF"
                  viewBox="0 0 256 256"
                >
                  <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z"></path>
                </svg>
              </div>
            )}
          </GlowingWrapper>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="flex absolute bottom-2 left-2 items-center group w-fit gap-x-2">
            <GlowingWrapper>
              <button
                onClick={() =>
                  handleEdit("inspiration", !editableData.inspiration)
                }
                className="bg-ashes flex cursor-pointer transition-all duration-300 ease-in-out active:scale-95 items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50"
              >
                {editableData.inspiration ? (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M29.2862 14.3558L23.6612 19.2096L25.3749 26.4683C25.4695 26.8623 25.4451 27.2756 25.305 27.6558C25.1648 28.036 24.9151 28.3661 24.5873 28.6045C24.2596 28.8429 23.8686 28.9787 23.4637 28.995C23.0588 29.0112 22.6582 28.9071 22.3124 28.6958L15.9999 24.8108L9.68367 28.6958C9.33796 28.9059 8.9378 29.009 8.5336 28.9922C8.12939 28.9753 7.7392 28.8393 7.41217 28.6011C7.08514 28.363 6.83589 28.0334 6.6958 27.6538C6.55571 27.2743 6.53105 26.8618 6.62492 26.4683L8.34492 19.2096L2.71992 14.3558C2.41404 14.0914 2.19283 13.7428 2.0839 13.3535C1.97497 12.9641 1.98316 12.5513 2.10744 12.1666C2.23172 11.7819 2.46659 11.4424 2.78271 11.1903C3.09883 10.9383 3.48219 10.785 3.88492 10.7496L11.2599 10.1546L14.1049 3.26955C14.2589 2.89432 14.521 2.57336 14.8579 2.34748C15.1948 2.12159 15.5912 2.00098 15.9968 2.00098C16.4024 2.00098 16.7988 2.12159 17.1357 2.34748C17.4726 2.57336 17.7347 2.89432 17.8887 3.26955L20.7324 10.1546L28.1074 10.7496C28.511 10.7837 28.8954 10.9361 29.2127 11.1878C29.53 11.4395 29.7659 11.7792 29.891 12.1644C30.016 12.5495 30.0246 12.9631 29.9157 13.3531C29.8068 13.7432 29.5852 14.0924 29.2787 14.3571L29.2862 14.3558Z"
                      fill="url(#paint0_linear_85_8)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_85_8"
                        x1="15.9997"
                        y1="2.00098"
                        x2="15.9997"
                        y2="28.9966"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#42D392" />
                        <stop offset="1" stopColor="#8B5CF6" />
                      </linearGradient>
                    </defs>
                  </svg>
                ) : (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M29.8976 12.1573C29.7726 11.773 29.5366 11.4342 29.2194 11.1838C28.9022 10.9333 28.5179 10.7823 28.1151 10.7498L20.7401 10.1548L17.8926 3.26858C17.7386 2.89335 17.4765 2.57239 17.1396 2.3465C16.8027 2.12061 16.4063 2 16.0007 2C15.5951 2 15.1987 2.12061 14.8618 2.3465C14.5249 2.57239 14.2628 2.89335 14.1088 3.26858L11.2638 10.1536L3.88508 10.7498C3.48156 10.784 3.09707 10.9364 2.7798 11.1881C2.46253 11.4398 2.22659 11.7795 2.10153 12.1646C1.97648 12.5498 1.96787 12.9633 2.07679 13.3534C2.18571 13.7434 2.40731 14.0927 2.71383 14.3573L8.33883 19.2111L6.62508 26.4686C6.52924 26.8629 6.55271 27.2767 6.69251 27.6577C6.83231 28.0386 7.08214 28.3694 7.41028 28.608C7.73843 28.8467 8.13009 28.9825 8.53555 28.9982C8.94102 29.0139 9.34199 28.9087 9.68758 28.6961L16.0001 24.8111L22.3163 28.6961C22.662 28.9062 23.0622 29.0093 23.4664 28.9925C23.8706 28.9756 24.2608 28.8395 24.5878 28.6014C24.9149 28.3632 25.1641 28.0336 25.3042 27.6541C25.4443 27.2746 25.469 26.8621 25.3751 26.4686L23.6551 19.2098L29.2801 14.3561C29.5891 14.0919 29.8127 13.7419 29.9226 13.3504C30.0326 12.959 30.0238 12.5438 29.8976 12.1573ZM27.9801 12.8411L21.8926 18.0911C21.7538 18.2107 21.6505 18.3662 21.5941 18.5406C21.5376 18.715 21.5302 18.9015 21.5726 19.0798L23.4326 26.9298C23.4374 26.9406 23.4379 26.9529 23.4339 26.9641C23.43 26.9752 23.4219 26.9844 23.4113 26.9898C23.3888 27.0073 23.3826 27.0036 23.3638 26.9898L16.5238 22.7836C16.3663 22.6867 16.185 22.6354 16.0001 22.6354C15.8152 22.6354 15.6339 22.6867 15.4763 22.7836L8.63633 26.9923C8.61758 27.0036 8.61258 27.0073 8.58883 26.9923C8.57828 26.9869 8.5702 26.9777 8.56625 26.9666C8.56229 26.9554 8.56277 26.9431 8.56758 26.9323L10.4276 19.0823C10.47 18.904 10.4625 18.7175 10.4061 18.5431C10.3497 18.3687 10.2464 18.2132 10.1076 18.0936L4.02008 12.8436C4.00508 12.8311 3.99133 12.8198 4.00383 12.7811C4.01633 12.7423 4.02633 12.7473 4.04508 12.7448L12.0351 12.0998C12.2183 12.0841 12.3937 12.0181 12.5419 11.9092C12.6901 11.8003 12.8054 11.6526 12.8751 11.4823L15.9526 4.03108C15.9626 4.00983 15.9663 3.99983 15.9963 3.99983C16.0263 3.99983 16.0301 4.00983 16.0401 4.03108L19.1251 11.4823C19.1954 11.6526 19.3114 11.8002 19.4603 11.9087C19.6092 12.0172 19.7852 12.0825 19.9688 12.0973L27.9588 12.7423C27.9776 12.7423 27.9888 12.7423 28.0001 12.7786C28.0113 12.8148 28.0001 12.8286 27.9801 12.8411Z"
                      fill="#CCC"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_82_5"
                        x1="16.0001"
                        y1="2"
                        x2="16.0001"
                        y2="28.9997"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#42D392" />
                        <stop offset="1" stopColor="#8B5CF6" />
                      </linearGradient>
                    </defs>
                  </svg>
                )}
              </button>
            </GlowingWrapper>
          </div>
        </div>
      </div>
      <div className="w-full px-4">
        <div className="flex items-center gap-x-2">
          <GlowingWrapper inset="0">
            <input
              value={editableData.name}
              placeholder="Name"
              className="block w-[400px] placeholder:text-gray-400 placeholder:bg-background text-3xl outline-none caret-white font-bold background-gradient bg-clip-text text-transparent"
              onChange={(e) => handleEdit("name", e.target.value)}
            />
          </GlowingWrapper>
          <GlowingWrapper>
            {editableData.sex === "male" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#3b82f6"
                viewBox="0 0 256 256"
                className="bg-ashes p-1 rounded-full cursor-pointer active:scale-95 duration-300 ease-in-out transition-all"
                onClick={() => handleEdit("sex", "female")}
              >
                <path d="M216,32H168a8,8,0,0,0,0,16h28.69L154.62,90.07a80,80,0,1,0,11.31,11.31L208,59.32V88a8,8,0,0,0,16,0V40A8,8,0,0,0,216,32ZM149.24,197.29a64,64,0,1,1,0-90.53A64.1,64.1,0,0,1,149.24,197.29Z"></path>
              </svg>
            )}
            {editableData.sex === "female" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#ec4899"
                viewBox="0 0 256 256"
                className="bg-ashes p-1 rounded-full cursor-pointer active:scale-95 duration-300 ease-in-out transition-all"
                onClick={() => handleEdit("sex", "male")}
              >
                <path d="M208,96a80,80,0,1,0-88,79.6V200H88a8,8,0,0,0,0,16h32v24a8,8,0,0,0,16,0V216h32a8,8,0,0,0,0-16H136V175.6A80.11,80.11,0,0,0,208,96ZM64,96a64,64,0,1,1,64,64A64.07,64.07,0,0,1,64,96Z"></path>
              </svg>
            )}
          </GlowingWrapper>
        </div>
        <span className="flex w-full items-center text-sm text-gray-400">
          <GlowingWrapper inset="0">
            <input
              value={editableData.occupation}
              placeholder="Occupation"
              onChange={(e) => handleEdit("occupation", e.target.value)}
              className="text-sm min-w-[407px] placeholder:text-gray-400 bg-background outline-none text-gray-400 block"
            />
          </GlowingWrapper>
        </span>
        <div className="mt-2">
          <div className="mt-2 flex w-full items-center gap-4">
            <div className="w-full space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-medium whitespace-nowrap">
                  Hit Points
                </span>
                <GlowingWrapper>
                  <CustomNumericInput
                    value={editableData.hitPoints}
                    onChange={(value) => handleEdit("hitPoints", value)}
                  />
                </GlowingWrapper>
              </div>
              <div className="w-full bg-ashes/80 overflow-hidden h-3 rounded-full">
                <div
                  className="h-full rounded-full bg-gradient-to-tr from-red-600 to-red-400"
                  style={{ width: `${editableData.hitPoints}%` }}
                ></div>
              </div>
            </div>
            <div className="w-full space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-medium">Magic Points</span>
                <GlowingWrapper>
                  <CustomNumericInput
                    value={editableData.magicPoints}
                    onChange={(value) => handleEdit("magicPoints", value)}
                  />
                </GlowingWrapper>
              </div>
              <div className="w-full bg-ashes/80 overflow-hidden h-3 rounded-full">
                <div
                  className="h-full rounded-full bg-gradient-to-tr from-blue-600 to-blue-400"
                  style={{ width: `${editableData.magicPoints}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="w-fit relative text-lg mt-4 mx-auto">
            <span className="font-medium absolute top-1/2 -translate-y-1/2 -left-[60px]">
              Sanity
            </span>
            <div className="relative">
              <svg
                width="38"
                height="38"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
              >
                <path
                  d="M31 15.4995C30.9986 14.1749 30.6223 12.8778 29.9144 11.7582C29.2065 10.6387 28.196 9.74243 27 9.17326V8.99951C26.9988 7.71104 26.5829 6.45716 25.8138 5.4234C25.0447 4.38965 23.9632 3.63094 22.7294 3.25955C21.4957 2.88815 20.1751 2.92379 18.9631 3.36119C17.7512 3.7986 16.7122 4.61453 16 5.68826C15.2877 4.61453 14.2488 3.7986 13.0368 3.36119C11.8248 2.92379 10.5043 2.88815 9.27048 3.25955C8.03669 3.63094 6.95523 4.38965 6.18612 5.4234C5.41702 6.45716 5.00111 7.71104 4.99996 8.99951V9.17326C3.80288 9.74087 2.79146 10.6365 2.08322 11.7562C1.37499 12.8758 0.999023 14.1734 0.999023 15.4983C0.999023 16.8231 1.37499 18.1207 2.08322 19.2404C2.79146 20.36 3.80288 21.2557 4.99996 21.8233V21.9995C5.00111 23.288 5.41702 24.5419 6.18612 25.5756C6.95523 26.6094 8.03669 27.3681 9.27048 27.7395C10.5043 28.1109 11.8248 28.0752 13.0368 27.6378C14.2488 27.2004 15.2877 26.3845 16 25.3108C16.7122 26.3845 17.7512 27.2004 18.9631 27.6378C20.1751 28.0752 21.4957 28.1109 22.7294 27.7395C23.9632 27.3681 25.0447 26.6094 25.8138 25.5756C26.5829 24.5419 26.9988 23.288 27 21.9995V21.8233C28.1958 21.2545 29.2062 20.3587 29.9141 19.2396C30.622 18.1205 30.9985 16.8237 31 15.4995ZM11 25.9995C10.0136 25.9994 9.06216 25.6348 8.32824 24.9759C7.59433 24.317 7.12974 23.4101 7.02371 22.4295C7.34709 22.4756 7.67331 22.499 7.99996 22.4995H8.99996C9.26518 22.4995 9.51953 22.3942 9.70707 22.2066C9.8946 22.0191 9.99996 21.7647 9.99996 21.4995C9.99996 21.2343 9.8946 20.9799 9.70707 20.7924C9.51953 20.6049 9.26518 20.4995 8.99996 20.4995H7.99996C6.81941 20.5009 5.67645 20.0845 4.77343 19.3241C3.87042 18.5636 3.2656 17.5082 3.06606 16.3446C2.86652 15.1811 3.08513 13.9844 3.68318 12.9666C4.28123 11.9487 5.22016 11.1753 6.33371 10.7833C6.52855 10.7143 6.69723 10.5866 6.81654 10.4178C6.93585 10.2491 6.99993 10.0475 6.99996 9.84076V8.99951C6.99996 7.93865 7.42139 6.92123 8.17153 6.17108C8.92168 5.42094 9.93909 4.99951 11 4.99951C12.0608 4.99951 13.0782 5.42094 13.8284 6.17108C14.5785 6.92123 15 7.93865 15 8.99951V17.532C13.9019 16.5444 12.4769 15.9984 11 15.9995C10.7347 15.9995 10.4804 16.1049 10.2929 16.2924C10.1053 16.4799 9.99996 16.7343 9.99996 16.9995C9.99996 17.2647 10.1053 17.5191 10.2929 17.7066C10.4804 17.8942 10.7347 17.9995 11 17.9995C12.0608 17.9995 13.0782 18.4209 13.8284 19.1711C14.5785 19.9212 15 20.9386 15 21.9995C15 23.0604 14.5785 24.0778 13.8284 24.8279C13.0782 25.5781 12.0608 25.9995 11 25.9995ZM24 20.4995H23C22.7347 20.4995 22.4804 20.6049 22.2929 20.7924C22.1053 20.9799 22 21.2343 22 21.4995C22 21.7647 22.1053 22.0191 22.2929 22.2066C22.4804 22.3942 22.7347 22.4995 23 22.4995H24C24.3266 22.499 24.6528 22.4756 24.9762 22.4295C24.8931 23.1978 24.5893 23.9257 24.1013 24.525C23.6134 25.1243 22.9623 25.5694 22.2268 25.8065C21.4913 26.0437 20.7028 26.0627 19.9567 25.8612C19.2106 25.6598 18.5388 25.2465 18.0226 24.6714C17.5064 24.0963 17.1679 23.3839 17.0479 22.6205C16.9279 21.857 17.0317 21.0752 17.3466 20.3694C17.6615 19.6637 18.1742 19.0643 18.8225 18.6437C19.4709 18.2232 20.2271 17.9994 21 17.9995C21.2652 17.9995 21.5195 17.8942 21.7071 17.7066C21.8946 17.5191 22 17.2647 22 16.9995C22 16.7343 21.8946 16.4799 21.7071 16.2924C21.5195 16.1049 21.2652 15.9995 21 15.9995C19.523 15.9984 18.0981 16.5444 17 17.532V8.99951C17 7.93865 17.4214 6.92123 18.1715 6.17108C18.9217 5.42094 19.9391 4.99951 21 4.99951C22.0608 4.99951 23.0782 5.42094 23.8284 6.17108C24.5785 6.92123 25 7.93865 25 8.99951V9.84076C25 10.0475 25.0641 10.2491 25.1834 10.4178C25.3027 10.5866 25.4714 10.7143 25.6662 10.7833C26.7798 11.1753 27.7187 11.9487 28.3167 12.9666C28.9148 13.9844 29.1334 15.1811 28.9339 16.3446C28.7343 17.5082 28.1295 18.5636 27.2265 19.3241C26.3235 20.0845 25.1805 20.5009 24 20.4995ZM26 13.9995C26 14.2647 25.8946 14.5191 25.7071 14.7066C25.5195 14.8942 25.2652 14.9995 25 14.9995H24.5C23.3065 14.9995 22.1619 14.5254 21.318 13.6815C20.4741 12.8376 20 11.693 20 10.4995V9.99951C20 9.7343 20.1053 9.47994 20.2929 9.29241C20.4804 9.10487 20.7347 8.99951 21 8.99951C21.2652 8.99951 21.5195 9.10487 21.7071 9.29241C21.8946 9.47994 22 9.7343 22 9.99951V10.4995C22 11.1626 22.2634 11.7984 22.7322 12.2673C23.201 12.7361 23.8369 12.9995 24.5 12.9995H25C25.2652 12.9995 25.5195 13.1049 25.7071 13.2924C25.8946 13.4799 26 13.7343 26 13.9995ZM7.49996 14.9995H6.99996C6.73474 14.9995 6.48039 14.8942 6.29285 14.7066C6.10532 14.5191 5.99996 14.2647 5.99996 13.9995C5.99996 13.7343 6.10532 13.4799 6.29285 13.2924C6.48039 13.1049 6.73474 12.9995 6.99996 12.9995H7.49996C8.163 12.9995 8.79889 12.7361 9.26773 12.2673C9.73657 11.7984 9.99996 11.1626 9.99996 10.4995V9.99951C9.99996 9.7343 10.1053 9.47994 10.2929 9.29241C10.4804 9.10487 10.7347 8.99951 11 8.99951C11.2652 8.99951 11.5195 9.10487 11.7071 9.29241C11.8946 9.47994 12 9.7343 12 9.99951V10.4995C12 11.693 11.5259 12.8376 10.6819 13.6815C9.83803 14.5254 8.69344 14.9995 7.49996 14.9995Z"
                  fill="url(#paint0_linear_45_8)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_45_8"
                    x1="15.9995"
                    y1="3.00488"
                    x2="15.9995"
                    y2="27.9941"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#42D392" />
                    <stop offset="1" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
              <DonutChart
                percentage={editableData.sanity}
                size={80}
                strokeWidth={10}
              />
            </div>
            <span className="font-medium absolute top-1/2 -translate-y-1/2 -right-[50px]">
              <GlowingWrapper>
                <CustomNumericInput
                  value={editableData.sanity}
                  onChange={(value) => handleEdit("sanity", value)}
                />
              </GlowingWrapper>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
