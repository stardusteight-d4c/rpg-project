"use client"

import { currentSession } from "@/shared/contexts/Users/mock-data"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { CreateCampaignModal } from "./components/CreateCampaignModal"
import { useAuth } from "@/shared/contexts/Auth/AuthContext"
import { getNameInitials } from "@/shared/utils/getNameInitials"
import { ModalWrapper } from "../ModalWrapper"
import { CharactersCreate } from "@/modules/Table/components/Characters/components/CharactersCreate"

export const Navbar = () => {
  const [createSheetModal, setCreateSheetModal] = useState<boolean>(false)
  const [openCreateCampaignModal, setOpenCreateCampaignModal] =
    useState<boolean>(false)
  const { currentSession, logout } = useAuth()
  const { push } = useRouter()

  if (!currentSession) return null

  return (
    <nav className="bg-background fixed inset-x-0 top-0 z-[600] w-screen border-b py-1 border-border shadow-md shadow-black/50 ">
      <ModalWrapper
        status={createSheetModal}
        title="Create Sheet"
        onStatusChange={setCreateSheetModal}
      >
        <div className="w-[700px]">
          <CharactersCreate isModal setCreateSheetModal={setCreateSheetModal} />
        </div>
      </ModalWrapper>
      <CreateCampaignModal
        onStatusChange={setOpenCreateCampaignModal}
        status={openCreateCampaignModal}
      />
      <div className="max-w-7xl flex items-center justify-between mx-auto">
        <h1
          onClick={() => push("/feed")}
          className="font-bold text-3xl cursor-pointer select-none flex gap-y-1"
        >
          <img src="/favicon.png" alt="" className="w-[32px] h-[32px]" />
          Camp
          <span className="background-gradient bg-clip-text text-transparent">
            fire
          </span>
        </h1>
        <div className="flex items-center gap-x-4">
          <div
            // onClick={() => setSelectedCharacter && setSelectedCharacter(null)}
            className="cursor-pointer w-fit flex items-center group gap-x-2"
          >
            <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
            </button>
            <span>Search</span>
          </div>

          <div
            onClick={() => setCreateSheetModal(true)}
            className="cursor-pointer w-fit flex items-center group gap-x-2"
          >
            <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M83.19,174.4a8,8,0,0,0,11.21-1.6,52,52,0,0,1,83.2,0,8,8,0,1,0,12.8-9.6A67.88,67.88,0,0,0,163,141.51a40,40,0,1,0-53.94,0A67.88,67.88,0,0,0,81.6,163.2,8,8,0,0,0,83.19,174.4ZM112,112a24,24,0,1,1,24,24A24,24,0,0,1,112,112Zm96-88H64A16,16,0,0,0,48,40V64H32a8,8,0,0,0,0,16H48v40H32a8,8,0,0,0,0,16H48v40H32a8,8,0,0,0,0,16H48v24a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V40A16,16,0,0,0,208,24Zm0,192H64V40H208Z"></path>
              </svg>
            </button>
            <span>Create Sheet</span>
          </div>
          <div
            onClick={() => setOpenCreateCampaignModal(true)}
            className="cursor-pointer w-fit flex items-center group gap-x-2"
          >
            <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M42.76,50A8,8,0,0,0,40,56V224a8,8,0,0,0,16,0V179.77c26.79-21.16,49.87-9.75,76.45,3.41,16.4,8.11,34.06,16.85,53,16.85,13.93,0,28.54-4.75,43.82-18a8,8,0,0,0,2.76-6V56A8,8,0,0,0,218.76,50c-28,24.23-51.72,12.49-79.21-1.12C111.07,34.76,78.78,18.79,42.76,50ZM216,172.25c-26.79,21.16-49.87,9.74-76.45-3.41-25-12.35-52.81-26.13-83.55-8.4V59.79c26.79-21.16,49.87-9.75,76.45,3.4,25,12.35,52.82,26.13,83.55,8.4Z"></path>
              </svg>
            </button>
            <span>Create Campaign</span>
          </div>
          <div
            onClick={() => push("/feed")}
            className="cursor-pointer w-fit flex items-center group gap-x-2"
          >
            <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M168,128a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,128Zm-8,24H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16ZM216,40V200a32,32,0,0,1-32,32H72a32,32,0,0,1-32-32V40a8,8,0,0,1,8-8H72V24a8,8,0,0,1,16,0v8h32V24a8,8,0,0,1,16,0v8h32V24a8,8,0,0,1,16,0v8h24A8,8,0,0,1,216,40Zm-16,8H184v8a8,8,0,0,1-16,0V48H136v8a8,8,0,0,1-16,0V48H88v8a8,8,0,0,1-16,0V48H56V200a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16Z"></path>
              </svg>
            </button>
            <span>Feed</span>
          </div>
          <div
            // onClick={() => push("/feed")}
            className="cursor-pointer w-fit flex items-center group gap-x-2"
          >
            <button className="bg-ashes relative flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
              </svg>
              <div className="absolute z-50 top-[4px] right-[7px] rounded-full bg-red-500 w-2 h-2" />
              <div className="absolute z-50 animate-ping top-[4px] right-[7px] rounded-full bg-red-500 w-2 h-2" />
            </button>
            <span>Notifications</span>
          </div>
          <div
            onClick={logout}
            className="cursor-pointer w-fit flex items-center group gap-x-2"
          >
            <button className="bg-ashes group-hover:bg-red-500 relative flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 duration-300 ease-in-out transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z"></path>
              </svg>
            </button>
          </div>

          {currentSession.avatarUrl ? (
            <img
              onClick={() => push(`/profile/${currentSession.username}`)}
              src={currentSession.avatarUrl}
              alt=""
              className="w-[32px] h-[32px] cursor-pointer rounded-full object-cover"
            />
          ) : (
            <div
              onClick={() => push(`/profile/${currentSession.username}`)}
              className="bg-button w-[32px] flex items-center text-center justify-center h-[32px] rounded-full select-none cursor-pointer"
            >
              <span className="text-base font-bold">
                {getNameInitials(currentSession.name)}
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
