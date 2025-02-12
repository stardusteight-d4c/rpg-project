"use client"

import { Navbar } from "@/shared/components"
import { useUsers } from "@/shared/contexts/Users/UsersContext"
import { useParams, useRouter } from "next/navigation"

export function ProfileModule() {
  const params = useParams()
  const username = params.username as string
  const { push } = useRouter()
  const { getByUsername } = useUsers()

  const user = getByUsername(username)

  if (!user) return null

  return (
    <main className="w-screen relative">
      <Navbar />

      <img
        src={user.coverImage}
        alt=""
        className="pointer-events-none h-[372px] select-none w-screen overflow-hidden object-fill"
      />

      <div className="max-w-7xl h-[150px] z-[500] mx-auto relative">
        <div className="absolute -top-[55px] left-[200px] flex items-center cursor-pointer gap-x-2">
          <span className="bg-background shadow-sm shadow-black/50 hover:bg-gradient-to-tr hover:from-[#42d392] hover:to-[#8B5CF6] duration-300 ease-in-out transition-all p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#FFFFFF"
              viewBox="0 0 256 256"
            >
              <path d="M168,56a8,8,0,0,1,8-8h16V32a8,8,0,0,1,16,0V48h16a8,8,0,0,1,0,16H208V80a8,8,0,0,1-16,0V64H176A8,8,0,0,1,168,56Zm62.56,54.68a103.92,103.92,0,1,1-85.24-85.24,8,8,0,0,1-2.64,15.78A88.07,88.07,0,0,0,40,128a87.62,87.62,0,0,0,22.24,58.41A79.66,79.66,0,0,1,98.3,157.66a48,48,0,1,1,59.4,0,79.66,79.66,0,0,1,36.06,28.75A87.62,87.62,0,0,0,216,128a88.85,88.85,0,0,0-1.22-14.68,8,8,0,1,1,15.78-2.64ZM128,152a32,32,0,1,0-32-32A32,32,0,0,0,128,152Zm0,64a87.57,87.57,0,0,0,53.92-18.5,64,64,0,0,0-107.84,0A87.57,87.57,0,0,0,128,216Z"></path>
            </svg>
          </span>
          <span className="bg-background flex items-center gap-x-2 shadow-sm shadow-black/50 hover:bg-gradient-to-tr hover:from-[#42d392] hover:to-[#8B5CF6] duration-300 ease-in-out transition-all p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#FFFFFF"
              viewBox="0 0 256 256"
            >
              <path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"></path>
            </svg>
            <span className="text-xl font-medium pr-1">Friends</span>
          </span>
          <div className="w-[688px] rounded-full shadow-sm shadow-black/50 mx-auto relative bg-background h-[15px]">
            <div
              className="h-full rounded-full background-gradient"
              style={{ width: `${(user.exp!.current / user.exp!.nextLevel) * 100}%` }}
            ></div>
            <span className="absolute z-[150] text-sm top-[-2px] left-1/2 -translate-x-1/2">
              {user.exp?.current}/{user.exp?.nextLevel} to Next Level
            </span>
          </div>
        </div>
        <div className="absolute -top-[55px] right-[40px] flex items-center gap-x-2">
          <span className="bg-background cursor-pointer shadow-sm shadow-black/50 hover:bg-gradient-to-tr hover:from-[#42d392] hover:to-[#8B5CF6] duration-300 ease-in-out transition-all p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#FFFFFF"
              viewBox="0 0 256 256"
            >
              <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
            </svg>
          </span>
          <span className="bg-background cursor-pointer shadow-sm shadow-black/50 hover:bg-gradient-to-tr hover:from-[#42d392] hover:to-[#8B5CF6] duration-300 ease-in-out transition-all p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#FFFFFF"
              viewBox="0 0 256 256"
            >
              <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z"></path>
            </svg>
          </span>
          <span className="bg-background cursor-pointer shadow-sm shadow-black/50 hover:bg-gradient-to-tr hover:from-[#42d392] hover:to-[#8B5CF6] duration-300 ease-in-out transition-all p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#FFFFFF"
              viewBox="0 0 256 256"
            >
              <path d="M104,140a12,12,0,1,1-12-12A12,12,0,0,1,104,140Zm60-12a12,12,0,1,0,12,12A12,12,0,0,0,164,128Zm74.45,64.9-67,29.71a16.17,16.17,0,0,1-21.71-9.1l-8.11-22q-6.72.45-13.63.46t-13.63-.46l-8.11,22a16.18,16.18,0,0,1-21.71,9.1l-67-29.71a15.93,15.93,0,0,1-9.06-18.51L38,58A16.07,16.07,0,0,1,51,46.14l36.06-5.93a16.22,16.22,0,0,1,18.26,11.88l3.26,12.84Q118.11,64,128,64t19.4.93l3.26-12.84a16.21,16.21,0,0,1,18.26-11.88L205,46.14A16.07,16.07,0,0,1,218,58l29.53,116.38A15.93,15.93,0,0,1,238.45,192.9ZM232,178.28,202.47,62s0,0-.08,0L166.33,56a.17.17,0,0,0-.17,0l-2.83,11.14c5,.94,10,2.06,14.83,3.42A8,8,0,0,1,176,86.31a8.09,8.09,0,0,1-2.16-.3A172.25,172.25,0,0,0,128,80a172.25,172.25,0,0,0-45.84,6,8,8,0,1,1-4.32-15.4c4.82-1.36,9.78-2.48,14.82-3.42L89.83,56s0,0-.12,0h0L53.61,61.93a.17.17,0,0,0-.09,0L24,178.33,91,208a.23.23,0,0,0,.22,0L98,189.72a173.2,173.2,0,0,1-20.14-4.32A8,8,0,0,1,82.16,170,171.85,171.85,0,0,0,128,176a171.85,171.85,0,0,0,45.84-6,8,8,0,0,1,4.32,15.41A173.2,173.2,0,0,1,158,189.72L164.75,208a.22.22,0,0,0,.21,0Z"></path>
            </svg>
          </span>
        </div>
        <div className="w-full z-50 relative">
          <div className="w-[150px] h-[150px] rounded-full object-cover absolute left-[40px] top-[-75px]">
            <img
              src={user.avatarUrl}
              alt=""
              className="w-[150px] pointer-events-none select-none h-[150px] rounded-full object-cover"
            />
            <div className="bg-background pointer-events-none select-none text-lg font-bold shadow-sm shadow-black/50 absolute bottom-[10px] right-[0px] w-[32px] h-[32px] rounded-full flex items-center justify-center">
              {user.exp?.level}
            </div>
          </div>
          <div className="absolute text-sm right-[40px] top-[4px]">
            <div className="text-gray-500/80 select-none flex items-center gap-x-[2px] mt-1 w-full justify-end">
              <span className="text-xs block">
                Member since {user.memberSince}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#6b7280"
                viewBox="0 0 256 256"
              >
                <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-68-76a12,12,0,1,1-12-12A12,12,0,0,1,140,132Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,132ZM96,172a12,12,0,1,1-12-12A12,12,0,0,1,96,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,140,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,172Z"></path>
              </svg>
            </div>
            <div className="text-gray-500/80 select-none flex items-center gap-x-[2px] mt-1 w-full justify-end">
              <span className="text-xs block">
                {user.hoursPlayed} hours played
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#6b7280"
                viewBox="0 0 256 256"
              >
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
              </svg>
            </div>
            <div className="text-gray-500/80 select-none flex items-center gap-x-[2px] mt-1 w-full justify-end">
              <span className="text-xs block">
                Keeper of Arcane Lore of {user.koalCampaigns} campaigns
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#6b7280"
                viewBox="0 0 256 256"
              >
                <path d="M230.9,73.6A15.85,15.85,0,0,0,212,77.39l-33.67,36.29-35.8-80.29a1,1,0,0,1,0-.1,16,16,0,0,0-29.06,0,1,1,0,0,1,0,.1l-35.8,80.29L44,77.39A16,16,0,0,0,16.25,90.81c0,.11,0,.21.07.32L39,195a16,16,0,0,0,15.72,13H201.29A16,16,0,0,0,217,195L239.68,91.13c0-.11,0-.21.07-.32A15.85,15.85,0,0,0,230.9,73.6ZM201.35,191.68l-.06.32H54.71l-.06-.32L32,88l.14.16,42,45.24a8,8,0,0,0,13.18-2.18L128,40l40.69,91.25a8,8,0,0,0,13.18,2.18l42-45.24L224,88Z"></path>
              </svg>
            </div>
            <div className="text-gray-500/80 select-none flex items-center gap-x-[2px] mt-1 w-full justify-end">
              <span className="text-xs block">
                Playing in {user.playingCampaigns} campaigns
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#6b7280"
                viewBox="0 0 256 256"
              >
                <path d="M42.76,50A8,8,0,0,0,40,56V224a8,8,0,0,0,16,0V179.77c26.79-21.16,49.87-9.75,76.45,3.41,16.4,8.11,34.06,16.85,53,16.85,13.93,0,28.54-4.75,43.82-18a8,8,0,0,0,2.76-6V56A8,8,0,0,0,218.76,50c-28,24.23-51.72,12.49-79.21-1.12C111.07,34.76,78.78,18.79,42.76,50ZM216,172.25c-26.79,21.16-49.87,9.74-76.45-3.41-25-12.35-52.81-26.13-83.55-8.4V59.79c26.79-21.16,49.87-9.75,76.45,3.4,25,12.35,52.82,26.13,83.55,8.4Z"></path>
              </svg>
            </div>
          </div>

          <div className="absolute left-[200px]">
            <h2 className="text-5xl leading-[70px] pointer-events-none -mt-2 font-bold background-gradient text-transparent bg-clip-text">
              #{user.username}
            </h2>
          </div>
        </div>
      </div>
      <div className="z-[500] max-w-7xl -mt-4 flex flex-col gap-y-10 w-full mx-auto">
        <div>
          <h2 className="text-3xl pointer-events-none font-bold mb-2">
            Sheets
          </h2>
          <div className="flex items-center flex-wrap w-full gap-2">
            {[
              "https://imgcdn.stablediffusionweb.com/2024/10/24/23cb7d83-7cac-43f6-8ac8-84c9cd8475a6.jpg",
              "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/302654499/original/5b4c73a54ca1d9a773ce0b63c79b2156a1d86891/create-ai-art-for-your-character-design-or-any-other-project.png",
              "https://images.nightcafe.studio/jobs/Sw1lrSQg22aRIzYVXhDO/Sw1lrSQg22aRIzYVXhDO--1--ljjvv.jpg",
            ].map((item, index) => (
              <div key={index} className="col-span-1">
                <img
                  src={item}
                  alt=""
                  className="rounded-full w-[48px] h-[48px] cursor-pointer overflow-hidden aspect-square"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl pointer-events-none font-bold mb-2">
            Campaigns
          </h2>
          <div className="grid grid-cols-3 w-full gap-4">
            {[
              {
                image:
                  "https://assetsio.gnwcdn.com/call-of-cthulhu-rpg-arkham-sourcebook-artwork.png?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp",
                name: "Beyond the Mountains of Madness",
              },
              {
                image:
                  "https://assetsio.gnwcdn.com/call-of-cthulhu-masks-of-nyarlathotep-artwork.jpeg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp",
                name: "Horror on the Orient Express",
              },
              {
                image:
                  "https://www.chaosium.com/product_images/uploaded_images/screen-shot-2024-09-26-at-10.09.58-am.png",
                name: "Masks of Nyarlathotep",
              },
            ].map((item, index) => (
              <div
                key={index}
                onClick={() =>
                  push("/campaign/c84df9de-5834-43ef-a526-d838a77e75dc")
                }
                className="col-span-1 cursor-pointer relative h-[200px] rounded-3xl bg-ashes"
              >
                <img
                  src={item.image}
                  alt=""
                  className="object-fill rounded-3xl w-full h-full"
                />
                <div className="px-2 border border-border bg-background w-fit z-50 shadow-sm shadow-black/50 rounded-full font-medium text-xl absolute top-2 left-2">
                  <span className="background-gradient bg-clip-text text-transparent whitespace-nowrap select-none cursor-default pointer-events-none">
                    {item.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-3xl pointer-events-none font-bold mb-2">
            Latest Posts
          </h2>
          <div className="grid grid-cols-2 items-center flex-wrap w-full gap-4">
            {Array.from({ length: 2 }).map((item, index) => (
              <div className="col-span-1 flex relative bg-background w-full border border-border overflow-hidden rounded-3xl pt-2 flex-col gap-y-1">
                <div className="flex select-none px-4 z-20 items-center gap-x-2">
                  <img
                    src="https://avatars.githubusercontent.com/u/87643260?v=4"
                    alt=""
                    className="w-[48px] aspect-square object-cover select-none pointer-events-none h-[48px] rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="block whitespace-nowrap text-lg font-bold -tracking-wide">
                      Gabriel Sena
                    </span>
                    <span className="text-gray-400 -mt-2 block text-sm">
                      #stardusteight
                    </span>
                  </div>
                  <div className="ml-auto text-gray-500/80 select-none flex items-center gap-x-[2px] mt-1 w-full justify-end">
                    <span className="text-xs block">10 hours ago</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#6b7280"
                      viewBox="0 0 256 256"
                    >
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
                    </svg>
                  </div>
                </div>
                <div className="px-4  mt-1 flex items-center gap-1 flex-wrap">
                  <span className="text-gray-400 bg-ashes px-2 border border-border rounded-full w-fit block cursor-pointer">
                    #Beyond_the_Mountains_of_Madness
                  </span>
                  <span className="text-gray-400 bg-ashes px-2 border border-border rounded-full w-fit block cursor-pointer">
                    #blackwive
                  </span>
                  <span className="text-gray-400 bg-ashes px-2 border border-border rounded-full w-fit block cursor-pointer">
                    #lohvanna
                  </span>
                </div>
                <div className="px-4">
                  <span className="block">
                    Resumo da campanha de hoje: 1 hora vendo items na lojinha de
                    um comerciante local.
                    <br />
                    <br />
                    Pelo menos Xablau Perreira tem preparo. 🤣
                  </span>
                </div>

                <div className="px-4 py-2 bg-border mt-2 flex flex-col gap-y-2">
                  <div className="flex items-center gap-x-2 mb-2">
                    <button className="bg-background flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 hover:bg-gradient-to-tr hover:from-[#42d392] hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="#FFFFFF"
                        viewBox="0 0 256 256"
                      >
                        <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path>
                      </svg>
                    </button>
                    <button className="bg-background flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 hover:bg-gradient-to-tr hover:from-[#42d392] hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="#FFFFFF"
                        viewBox="0 0 256 256"
                      >
                        <path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z"></path>
                      </svg>
                    </button>
                    <button className="bg-background flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 hover:bg-gradient-to-tr hover:from-[#42d392] hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="#FFFFFF"
                        viewBox="0 0 256 256"
                      >
                        <path d="M237.66,106.35l-80-80A8,8,0,0,0,144,32V72.35c-25.94,2.22-54.59,14.92-78.16,34.91-28.38,24.08-46.05,55.11-49.76,87.37a12,12,0,0,0,20.68,9.58h0c11-11.71,50.14-48.74,107.24-52V192a8,8,0,0,0,13.66,5.65l80-80A8,8,0,0,0,237.66,106.35ZM160,172.69V144a8,8,0,0,0-8-8c-28.08,0-55.43,7.33-81.29,21.8a196.17,196.17,0,0,0-36.57,26.52c5.8-23.84,20.42-46.51,42.05-64.86C99.41,99.77,127.75,88,152,88a8,8,0,0,0,8-8V51.32L220.69,112Z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className="mt-[100px] w-full bg-ashes border-t border-border py-1">
        <div className="font-bold max-w-7xl w-full mx-auto text-2xl pointer-events-none select-none flex gap-2">
          <img
            src="/logo.svg"
            alt=""
            className="w-[42px] h-[42px] p-1 rounded-full shadow-sm shadow-black/50 mx-auto border border-border"
          />
        </div>
      </footer>
    </main>
  )
}
