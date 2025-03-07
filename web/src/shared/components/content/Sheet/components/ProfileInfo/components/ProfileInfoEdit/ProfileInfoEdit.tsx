"use client"

import { randomUUID } from "node:crypto"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  CustomNumericInput,
  DonutChart,
  GlowingWrapper,
  Tooltip,
} from "@/shared/components/ui"
import {
  handleCharacterTooltipText,
  handleCharacterVisibilityTooltipText,
} from "@/shared/utils"
import { useCharacters } from "@/shared/contexts"

export const ProfileInfoEdit: React.FC<{ character: ISheet }> = ({
  character,
}) => {
  const { updateCopyCharacter } = useCharacters()

  const [editableData, setEditableData] = useState({
    ...character.infos,
    type: character.infos.type ?? "player",
    characterFile: null,
  })

  useEffect(() => {
    setEditableData({
      ...character.infos,
      type: character.infos.type ?? "player",
      characterFile: null,
    })
    updateCopyCharacter(character.id ?? randomUUID(), {
      infos: character.infos,
    })
  }, [character])

  const handleEdit = (field: string, value: any) => {
    setEditableData((prev) => ({ ...prev, [field]: value }))
    updateCopyCharacter(character.id ?? randomUUID(), {
      infos: { ...editableData, [field]: value },
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const tempUrl = URL.createObjectURL(file)

      handleEdit("characterUrl", tempUrl)
      handleEdit("characterFile", file)
      updateCopyCharacter(character.id, {
        infos: { ...editableData, characterUrl: tempUrl },
      })
      // URL.revokeObjectURL(tempUrl)
    }
  }

  function handleType() {
    if (editableData.type === "npc") return "enemy"
    if (editableData.type === "enemy") return "player"
    if (editableData.type === "player") return "npc"
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
          <GlowingWrapper border="rounded-xl">
            {editableData.characterUrl.length > 0 ? (
              <img
                onClick={() => handleClick()}
                src={editableData.characterUrl}
                alt="Imagem do Personagem"
                className="min-w-[210px] max-w-[210px] min-h-[210px] max-h-[210px] cursor-pointer overflow-hidden border border-border object-cover rounded-xl"
              />
            ) : (
              <div
                onClick={() => handleClick()}
                className="min-w-[210px] opacity-50 bg-gray-600/10 cursor-pointer flex items-center justify-center flex-col max-w-[210px] min-h-[210px] max-h-[210px] border border-border object-cover rounded-xl"
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

          <div className="flex absolute top-2 z-40 left-2 items-center w-fit gap-x-2">
            <Tooltip
              text={
                handleCharacterTooltipText(
                  editableData.type as "player" | "npc" | "enemy"
                )!
              }
            >
              <button
                onClick={() => handleEdit("type", handleType())}
                className="bg-background flex cursor-pointer items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50"
              >
                {editableData.type === "player" && (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 100C120.627 100 137.5 83.1246 137.5 62.5C137.5 41.8754 120.627 25 100 25C79.373 25 62.5 41.8754 62.5 62.5C62.5 83.1246 79.373 100 100 100ZM100 118.75C75.157 118.75 25 131.407 25 156.25V175H175V156.25C175 131.407 124.843 118.75 100 118.75Z"
                      fill="white"
                    />
                  </svg>
                )}
                {editableData.type === "npc" && (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M169.531 27.1881C167.857 26.038 165.926 25.3149 163.908 25.0821C161.89 24.8492 159.846 25.1136 157.953 25.8522C146.992 30.1178 124.859 37.2741 100 37.2741C75.1406 37.2741 53 30.1178 42.0234 25.8522C40.1296 25.117 38.085 24.8545 36.0669 25.0875C34.0487 25.3204 32.1177 26.0417 30.4411 27.1889C28.7645 28.3362 27.3928 29.8748 26.4447 31.6715C25.4966 33.4683 25.0007 35.4691 25 37.5006V81.071C25 109.071 32.5391 135.485 46.2344 155.43C60.4219 176.102 79.5156 187.462 100 187.462C120.484 187.462 139.578 176.079 153.766 155.43C167.461 135.501 175 109.087 175 81.0866V37.5006C174.996 35.4665 174.496 33.4639 173.543 31.6668C172.59 29.8697 171.213 28.3324 169.531 27.1881ZM60.9375 104.165C59.8321 105.408 58.2781 106.161 56.6174 106.258C54.9566 106.356 53.3252 105.79 52.082 104.684C50.8388 103.579 50.0857 102.025 49.9882 100.364C49.8908 98.7034 50.4571 97.072 51.5625 95.8288C56.0547 90.8444 64.2031 87.5006 71.875 87.5006C79.5469 87.5006 87.6953 90.8444 92.1875 95.8288C93.2929 97.072 93.8592 98.7034 93.7618 100.364C93.6643 102.025 92.9112 103.579 91.668 104.684C91.0524 105.232 90.335 105.652 89.5569 105.922C88.7787 106.193 87.9549 106.307 87.1326 106.258C85.4719 106.161 83.9179 105.408 82.8125 104.165C80.7187 101.821 75.8984 100.001 71.875 100.001C67.8516 100.001 63 101.829 60.9375 104.165ZM131.633 141.555C127.753 146.158 122.915 149.858 117.457 152.397C111.998 154.935 106.051 156.25 100.031 156.25C94.0115 156.25 88.0643 154.935 82.6058 152.397C77.1473 149.858 72.3091 146.158 68.4297 141.555C67.8377 140.942 67.3773 140.215 67.0768 139.417C66.7764 138.62 66.6421 137.769 66.6824 136.918C66.7227 136.067 66.9366 135.233 67.311 134.468C67.6854 133.702 68.2124 133.021 68.8596 132.467C69.5068 131.912 70.2605 131.496 71.0745 131.244C71.8884 130.992 72.7453 130.908 73.5926 130.999C74.4399 131.09 75.2597 131.354 76.0015 131.773C76.7433 132.192 77.3915 132.759 77.9063 133.438C80.6113 136.668 83.9914 139.265 87.8087 141.047C91.6259 142.829 95.7873 143.752 100 143.752C104.213 143.752 108.374 142.829 112.191 141.047C116.009 139.265 119.389 136.668 122.094 133.438C123.17 132.177 124.703 131.396 126.356 131.265C128.009 131.135 129.645 131.666 130.906 132.743C132.167 133.819 132.949 135.352 133.079 137.005C133.209 138.658 132.678 140.295 131.602 141.555H131.633ZM147.922 104.688C147.31 105.236 146.596 105.657 145.821 105.929C145.046 106.201 144.226 106.317 143.406 106.271C142.586 106.226 141.783 106.019 141.043 105.663C140.303 105.307 139.641 104.808 139.094 104.196C137 101.852 132.18 100.032 128.156 100.032C124.133 100.032 119.281 101.86 117.219 104.196C116.669 104.814 116.004 105.317 115.26 105.677C114.516 106.038 113.708 106.248 112.883 106.296C112.058 106.344 111.231 106.23 110.45 105.958C109.669 105.687 108.95 105.265 108.332 104.715C107.714 104.166 107.211 103.5 106.851 102.756C106.49 102.013 106.28 101.205 106.232 100.38C106.184 99.5545 106.298 98.7279 106.57 97.947C106.841 97.1662 107.263 96.4464 107.812 95.8288C112.273 90.8444 120.422 87.5006 128.125 87.5006C135.828 87.5006 143.945 90.8444 148.438 95.8288C148.988 96.4428 149.412 97.1599 149.685 97.9386C149.957 98.7173 150.073 99.5422 150.025 100.366C149.977 101.189 149.767 101.995 149.406 102.737C149.045 103.479 148.54 104.142 147.922 104.688Z"
                      fill="white"
                    />
                  </svg>
                )}
                {editableData.type === "enemy" && (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M42.4915 100.023C42.6032 122.118 47.9536 139.799 52.2344 152.204C33.4223 124.122 12.0708 73.3542 47.0708 43.8074C30.4458 42.1238 10.9872 53.8839 9.65669 71.6249H9.58248C9.16529 77.114 10.5903 83.2484 14.1708 89.6456C6.37232 111.242 5.98872 135.042 19.3754 169.294C26.8676 188.453 47.0528 193.787 66.5442 190.364C80.7419 187.864 93.9622 181.51 102.987 167.023C118.674 141.835 126.421 125.844 142.749 114.125C160.923 106.399 180.85 112.855 191.14 122.896C188.219 100.415 163.641 79.3371 144.083 100.723C127.94 103.715 117.12 107.566 98.879 120.736C106.555 105.596 120.882 87.5671 129.789 76.8242C142.95 60.571 169.966 54.6288 183.9 58.0328C171.404 40.3218 133.932 34.7554 125.457 62.9273C109.047 70.4519 88.3876 86.6968 74.7114 103.16C79.2348 82.5558 87.6723 57.1503 95.9407 42.5324C109.154 28.2538 128.663 28.4964 140.715 32.1558C129.425 13.9542 93.3544 4.76517 86.6157 37.2312C69.7758 50.1531 52.5344 76.3367 42.4922 100.023L42.4915 100.023Z"
                      fill="white"
                    />
                  </svg>
                )}
              </button>
            </Tooltip>
          </div>

          <div className="flex absolute top-2 z-40 right-2 items-center w-fit gap-x-2">
            <Tooltip
              text={handleCharacterVisibilityTooltipText(
                editableData.visibility!
              )}
            >
              <button
                onClick={() =>
                  handleEdit("visibility", !editableData.visibility)
                }
                className="bg-background flex cursor-pointer items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50"
              >
                {editableData.visibility ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="#22c55e"
                    viewBox="0 0 256 256"
                  >
                    <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="#ef4444"
                    viewBox="0 0 256 256"
                  >
                    <path d="M53.92,34.62A8,8,0,1,0,42.08,45.38L61.32,66.55C25,88.84,9.38,123.2,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208a127.11,127.11,0,0,0,52.07-10.83l22,24.21a8,8,0,1,0,11.84-10.76Zm47.33,75.84,41.67,45.85a32,32,0,0,1-41.67-45.85ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.16,133.16,0,0,1,25,128c4.69-8.79,19.66-33.39,47.35-49.38l18,19.75a48,48,0,0,0,63.66,70l14.73,16.2A112,112,0,0,1,128,192Zm6-95.43a8,8,0,0,1,3-15.72,48.16,48.16,0,0,1,38.77,42.64,8,8,0,0,1-7.22,8.71,6.39,6.39,0,0,1-.75,0,8,8,0,0,1-8-7.26A32.09,32.09,0,0,0,134,96.57Zm113.28,34.69c-.42.94-10.55,23.37-33.36,43.8a8,8,0,1,1-10.67-11.92A132.77,132.77,0,0,0,231.05,128a133.15,133.15,0,0,0-23.12-30.77C185.67,75.19,158.78,64,128,64a118.37,118.37,0,0,0-19.36,1.57A8,8,0,1,1,106,49.79,134,134,0,0,1,128,48c34.88,0,66.57,13.26,91.66,38.35,18.83,18.83,27.3,37.62,27.65,38.41A8,8,0,0,1,247.31,131.26Z"></path>
                  </svg>
                )}
              </button>
            </Tooltip>
          </div>

          {editableData.type === "player" && (
            <div className="flex absolute bottom-2 left-2 items-center group w-fit gap-x-2">
              <GlowingWrapper>
                <button
                  onClick={() =>
                    handleEdit("inspiration", !editableData.inspiration)
                  }
                  className="bg-background flex cursor-pointer transition-all duration-300 ease-in-out active:scale-95 items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50"
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
          )}
        </div>
      </div>
      <div className="w-full pl-4">
        <div className="flex justify-between items-center gap-x-2">
          <GlowingWrapper>
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
                className="bg-gray-600/10 p-1 rounded-full cursor-pointer active:scale-95 duration-300 ease-in-out transition-all"
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
                className="bg-gray-600/10 p-1 rounded-full cursor-pointer active:scale-95 duration-300 ease-in-out transition-all"
                onClick={() => handleEdit("sex", "neuter")}
              >
                <path d="M208,96a80,80,0,1,0-88,79.6V200H88a8,8,0,0,0,0,16h32v24a8,8,0,0,0,16,0V216h32a8,8,0,0,0,0-16H136V175.6A80.11,80.11,0,0,0,208,96ZM64,96a64,64,0,1,1,64,64A64.07,64.07,0,0,1,64,96Z"></path>
              </svg>
            )}
            {editableData.sex === "neuter" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#CCCCCC"
                viewBox="0 0 256 256"
                className="bg-gray-600/10 p-1 rounded-full cursor-pointer active:scale-95 duration-300 ease-in-out transition-all"
                onClick={() => handleEdit("sex", "male")}
              >
                <path d="M208,104a80,80,0,1,0-88,79.6V232a8,8,0,0,0,16,0V183.6A80.11,80.11,0,0,0,208,104Zm-80,64a64,64,0,1,1,64-64A64.07,64.07,0,0,1,128,168Z"></path>
              </svg>
            )}
          </GlowingWrapper>
        </div>
        <span className="flex w-full mt-2 items-center text-sm text-gray-400">
          <GlowingWrapper>
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
              <div className="w-full bg-gray-600/10 overflow-hidden h-3 rounded-full">
                <motion.div
                  key={editableData.magicPoints}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${
                      (editableData.hitPoints / editableData.maxHitPoints) * 100
                    }%`,
                  }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="h-full rounded-full bg-gradient-to-tr from-red-600 to-red-400"
                />
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
              <div className="w-full bg-gray-600/10 overflow-hidden h-3 rounded-full">
                <motion.div
                  key={editableData.magicPoints}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${
                      (editableData.magicPoints / editableData.maxMagicPoints) *
                      100
                    }%`,
                  }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="h-full rounded-full bg-gradient-to-tr from-blue-600 to-blue-400"
                />
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
                percentage={
                  editableData.maxSanity === 0
                    ? 0
                    : (editableData.sanity / editableData.maxSanity) * 100
                }
                size={80}
                strokeWidth={10}
                maxSanity={character.infos.maxSanity}
                sanity={character.infos.sanity}
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
