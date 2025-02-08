"use client"

import { GlowingWrapper } from "@/shared/components"
import { useRouter } from "next/navigation"

export function FeedModule() {
  const { push } = useRouter()

  return (
    <main className="w-screen">
      <nav className=" bg-background fixed inset-x-0 top-0 z-[600] w-screen border-b py-1 border-border shadow-sm shadow-black/50 ">
        <div className="max-w-7xl flex items-center justify-between mx-auto">
          <h1
            onClick={() => push("/feed")}
            className="font-bold text-3xl cursor-pointer select-none flex gap-2"
          >
            <img src="/favicon.png" alt="" className="w-[32px] h-[32px]" />
            Campfire
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
              <span>Find a player</span>
            </div>
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
                  <path d="M42.76,50A8,8,0,0,0,40,56V224a8,8,0,0,0,16,0V179.77c26.79-21.16,49.87-9.75,76.45,3.41,16.4,8.11,34.06,16.85,53,16.85,13.93,0,28.54-4.75,43.82-18a8,8,0,0,0,2.76-6V56A8,8,0,0,0,218.76,50c-28,24.23-51.72,12.49-79.21-1.12C111.07,34.76,78.78,18.79,42.76,50ZM216,172.25c-26.79,21.16-49.87,9.74-76.45-3.41-25-12.35-52.81-26.13-83.55-8.4V59.79c26.79-21.16,49.87-9.75,76.45,3.4,25,12.35,52.82,26.13,83.55,8.4Z"></path>
                </svg>
              </button>
              <span>Create campaign</span>
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

            <img
              onClick={() => push("/profile/stardusteight")}
              src="https://avatars.githubusercontent.com/u/87643260?v=4"
              alt=""
              className="w-[32px] h-[32px] cursor-pointer rounded-full object-cover"
            />
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mt-[45px] w-full mx-auto flex">
        <section className="min-w-[860px] pb-[100px] space-y-4 px-4 pt-4 border-r border-border w-full min-h-screen">
          <div className="mb-[40px]">
            <div className="flex items-start gap-x-4 p-2 bottom-0 inset-x-0">
              <img
                src="https://avatars.githubusercontent.com/u/87643260?v=4"
                alt=""
                className="w-[48px] aspect-square object-cover select-none pointer-events-none h-[48px] rounded-full"
              />

              <div className="shadow-sm shadow-black/50 rounded-3xl overflow-hidden w-full">
                <GlowingWrapper
                  styles="w-full"
                  border="rounded-3xl rounded-b-none"
                  inset="0"
                >
                  <textarea
                    // onChange={(e) => handleInputChange(e)}
                    // value={newNotification}
                    placeholder="Make a post"
                    spellCheck="false"
                    className="p-2 bg-background h-[100px]  resize-none overflow-y-scroll no-scrollbar w-full cursor-text hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-3xl rounded-b-none border border-border outline-none"
                  />
                </GlowingWrapper>
                <div className="flex w-full items-center gap-x-2 px-4 py-2 bg-border">
                  <button className="bg-background flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 hover:bg-gradient-to-tr hover:from-[#42d392] hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="#FFFFFF"
                      viewBox="0 0 256 256"
                    >
                      <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z"></path>
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
                      <path d="M42.76,50A8,8,0,0,0,40,56V224a8,8,0,0,0,16,0V179.77c26.79-21.16,49.87-9.75,76.45,3.41,16.4,8.11,34.06,16.85,53,16.85,13.93,0,28.54-4.75,43.82-18a8,8,0,0,0,2.76-6V56A8,8,0,0,0,218.76,50c-28,24.23-51.72,12.49-79.21-1.12C111.07,34.76,78.78,18.79,42.76,50ZM216,172.25c-26.79,21.16-49.87,9.74-76.45-3.41-25-12.35-52.81-26.13-83.55-8.4V59.79c26.79-21.16,49.87-9.75,76.45,3.4,25,12.35,52.82,26.13,83.55,8.4Z"></path>
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
                      <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path>
                    </svg>
                  </button>
                  <button className="background-gradient ml-auto flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 hover:bg-gradient-to-tr hover:from-[#42d392] hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="#FFFFFF"
                      viewBox="0 0 256 256"
                    >
                      <path d="M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.49,29.8L102,154l41.3,84.87A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14,0-.07-40.06-82.3,48-48a8,8,0,0,0-11.31-11.31l-48,48L24.08,98.25l-.07,0,.14,0L216,40Z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex bg-background w-full border border-border overflow-hidden rounded-3xl pt-2 flex-col gap-y-1">
            <div className="flex select-none px-4 z-20 items-center gap-x-2">
              <img
                src="https://avatars.githubusercontent.com/u/1024025?v=4"
                alt=""
                className="w-[48px] aspect-square object-cover select-none pointer-events-none h-[48px] rounded-full"
              />
              <div className="flex flex-col">
                <span className="block text-lg font-bold -tracking-wide">
                  Linus Torvalds
                </span>
                <span className="text-gray-400 -mt-2 block text-sm">
                  #blackwive
                </span>
              </div>
            </div>
            <div className="px-4  mt-1 flex items-center gap-1 flex-wrap">
              <span className="text-gray-400 bg-ashes px-2 border border-border rounded-full w-fit block cursor-pointer">
                #Beyond_the_Mountains_of_Madness
              </span>
              <span className="text-gray-400 bg-ashes px-2 border border-border rounded-full w-fit block cursor-pointer">
                #stardusteight
              </span>
              <span className="text-gray-400 bg-ashes px-2 border border-border rounded-full w-fit block cursor-pointer">
                #lohvanna
              </span>
            </div>
            <span className="px-4  block">
              Obrigado, aventureiros, por mais uma sessão memorável! Nos vemos
              na próxima, e lembrem-se: o perigo espreita em cada sombra... 🌙🔮
              <br />
              <br />
              🎭📖 Como foi a sessão para vocês? Algum momento favorito?
              Comentem abaixo! 👇🔥
            </span>

            <div className="mt-2 flex items-center gap-x-2 px-4 py-2 bg-border">
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
          {/*  */}
          <div className="flex bg-background w-full border border-border overflow-hidden rounded-3xl pt-2 flex-col gap-y-1">
            <div className="flex select-none px-4 z-20 items-center gap-x-2">
              <img
                src="https://avatars.githubusercontent.com/u/87643260?v=4"
                alt=""
                className="w-[48px] aspect-square object-cover select-none pointer-events-none h-[48px] rounded-full"
              />
              <div className="flex flex-col">
                <span className="block text-lg font-bold -tracking-wide">
                  Gabriel Sena
                </span>
                <span className="text-gray-400 -mt-2 block text-sm">
                  #stardusteight
                </span>
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
                Resumo da campanha de hoje: 1 hora vendo items na lojinha de um
                comerciante local.
                <br />
                <br />
                Pelo menos Xablau Perreira tem preparo. 🤣
              </span>
            </div>

            <div className="px-4 py-2 bg-border mt-2 flex flex-col gap-y-2">
              <div className="flex items-center gap-x-2 mb-2">
                <button className="flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 bg-gradient-to-tr from-[#42d392] to-[#8B5CF6] duration-300 ease-in-out transition-all">
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
              <div>
                <div className="flex select-none z-20 items-center gap-x-2">
                  <img
                    src="https://avatars.githubusercontent.com/u/124599?v=4"
                    alt=""
                    className="w-[48px] aspect-square object-cover select-none pointer-events-none h-[48px] rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="block">
                      Você comprou 2 pães filha da put%! DOIS PÃES!!!!!
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex select-none z-20 items-start gap-x-2">
                  <img
                    src="https://avatars.githubusercontent.com/u/87643260?v=4"
                    alt=""
                    className="w-[48px] aspect-square object-cover select-none pointer-events-none h-[48px] rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="block">
                      Quando você estiver à beira da morte, vendo seus HP
                      escorrerem diante de seus olhos, o coração acelerado e a
                      insanidade tomando conta... tudo porque ignorou a fome. E
                      então, quando for tarde demais, só restará o
                      arrependimento... 😉
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="bg-background flex items-center gap-x-4 p-2 bottom-0 inset-x-0">
                <GlowingWrapper styles="w-full" border="rounded-3xl" inset="0">
                  <input
                    // onChange={(e) => handleInputChange(e)}
                    // value={newNotification}
                    placeholder="Send a comment"
                    spellCheck="false"
                    className="p-2 px-4  shadow-sm shadow-black/50 resize-none overflow-y-scroll no-scrollbar w-full cursor-text hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-3xl bg-border/50 border border-border outline-none"
                  />
                </GlowingWrapper>

                <span
                  // onClick={onSend}
                  className="flex hover:brightness-125 active:scale-95 transition-all duration-300 ease-in-out items-center  justify-center text-white p-2 rounded-full w-fit  shadow-sm shadow-black/50 cursor-pointer bg-button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#FFFFFF"
                    viewBox="0 0 256 256"
                  >
                    <path d="M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.49,29.8L102,154l41.3,84.87A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14,0-.07-40.06-82.3,48-48a8,8,0,0,0-11.31-11.31l-48,48L24.08,98.25l-.07,0,.14,0L216,40Z"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full flex flex-col gap-y-8 p-4 min-h-screen">
          <div>
            <h2 className="text-3xl pointer-events-none font-bold mb-2">
              Happening right now
            </h2>
            <div className="grid grid-cols-1 w-full gap-4">
              {[
                {
                  image:
                    "https://cdn.myportfolio.com/01576c1cae45f964574cd467d49a52b8/cb80796e-42ab-43bc-bea0-f12e2907d474_rw_1920.jpg?h=423137e847613be7260e67b60daec37e",
                  name: "Beyond the Mountains of Madness",
                },
                {
                  image:
                    "https://mir-s3-cdn-cf.behance.net/project_modules/hd/1e8c1f94180437.5e78948e881c2.jpg",
                  name: "Masks of Nyarlathotep",
                },
              ].map((item, index) => (
                <div>
                  {/* <span className="text-2xl font-medium whitespace-nowrap select-none cursor-default pointer-events-none">
                    {item.name}
                  </span> */}
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
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl pointer-events-none font-bold mb-2">
              Recently Played
            </h2>
            <div className="grid grid-cols-1 w-full gap-4">
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
                <div>
                  {/* <span className="text-2xl font-medium whitespace-nowrap select-none cursor-default pointer-events-none">
                    {item.name}
                  </span> */}
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <footer className="w-full bg-ashes border-t border-border py-1">
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
