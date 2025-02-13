"use client"

import { useRouter } from "next/navigation"
import { CampaignModule } from "../Campaign"
import { Footer } from "@/shared/components"

export function HomeModule() {
  const { push } = useRouter()

  return (
    <main>
      <nav className="bg-background fixed inset-x-0 top-0 z-[600] w-screen border-b py-1 border-border shadow-sm shadow-black/50 ">
        <div className="max-w-7xl flex items-center justify-between mx-auto">
          <h1 className="font-bold text-3xl cursor-pointer select-none flex gap-y-1">
            <img src="/favicon.png" alt="" className="w-[32px] h-[32px]" />
            Camp
            <span className="background-gradient bg-clip-text text-transparent">
              fire
            </span>
          </h1>
          <div className="flex items-center gap-x-4">
            <div
              onClick={() => push("/auth/signin")}
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
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z"></path>
                </svg>
              </button>
              <span>Sign in</span>
            </div>
            <div
              onClick={() => push("/auth/signup")}
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
                  <path d="M168,56a8,8,0,0,1,8-8h16V32a8,8,0,0,1,16,0V48h16a8,8,0,0,1,0,16H208V80a8,8,0,0,1-16,0V64H176A8,8,0,0,1,168,56Zm62.56,54.68a103.92,103.92,0,1,1-85.24-85.24,8,8,0,0,1-2.64,15.78A88.07,88.07,0,0,0,40,128a87.62,87.62,0,0,0,22.24,58.41A79.66,79.66,0,0,1,98.3,157.66a48,48,0,1,1,59.4,0,79.66,79.66,0,0,1,36.06,28.75A87.62,87.62,0,0,0,216,128a88.85,88.85,0,0,0-1.22-14.68,8,8,0,1,1,15.78-2.64ZM128,152a32,32,0,1,0-32-32A32,32,0,0,0,128,152Zm0,64a87.57,87.57,0,0,0,53.92-18.5,64,64,0,0,0-107.84,0A87.57,87.57,0,0,0,128,216Z"></path>
                </svg>
              </button>
              <span>Sign up</span>
            </div>
          </div>
        </div>
      </nav>
      <section className="max-w-7xl w-full mx-auto pt-[45px]">
        <div className="relative">
          <div className="flex w-fit items-center pt-10 justify-center mx-auto">
            <h1 className="font-bold text-[50px] flex items-center justify-centercursor-pointer select-none">
              <img src="/favicon.png" alt="" className="w-[52px] h-[52px]" />
              Camp
              <span className="background-gradient bg-clip-text text-transparent">
                fire
              </span>
            </h1>
          </div>
          <div className="mb-10 border-t border-border pt-2 mt-2 w-fit mx-auto flex flex-col items-center justify-center gap-y-1">
            <h2 className="mx-auto font-medium text-center text-4xl">
              Create, play and share epic stories!
            </h2>
            <span className="mx-auto block w-[400px] text-gray-400 text-xl text-center">
              Create campaigns, customize sheets and connect with your friends.
            </span>
            <button
            onClick={() => push("/auth/signup")}
            className="p-2 font-medium capitalize w-[150px] mt-2 text-center text-lg background-gradient text-white rounded-full">
              <span className="text-xl font-bold">Sign up</span>
            </button>
          </div>
          <img
            src="/Captura de tela 2025-02-12 160124.png"
            alt=""
            className="w-[950px] mx-auto rounded-3xl border border-border object-cover"
          />
        </div>
      </section>
      <section className="max-w-7xl items-center w-full mx-auto my-[150px]">
        <div className="flex text-center mx-auto -mt-2 flex-col gap-y-2">
          <h2 className="text-5xl mt-4 font-bold background-gradient text-transparent bg-clip-text">
            Play, Watch and Connect: <br />
            The RPG Beyond the Table
          </h2>
          <span className="block text-gray-400 w-[500px] mx-auto">
            With intuitive tools and a publishing system, Campfire turns each
            session into an immersive and collaborative experience. Light your
            flame, share epic stories, and find new allies for your journeys!
          </span>
        </div>
        <div className="mt-10 flex flex-row gap-8 mx-auto w-[1000px] items-center">
          <img
            src="/Component 3.png"
            className="col-span-1 w-[610px] border border-border rounded-2xl object-cover bg-border"
          />
          <div className="col-span-1 w-fit flex flex-col gap-y-4">
            <div className="flex items-center gap-x-4">
              <div className="bg-border rounded-full w-fit">
                <div
                  style={{
                    background: "linear-gradient(to right, #42d392, #8B5CF6)",
                    WebkitMaskImage: `url('/weapons/sword.svg')`,
                    WebkitMaskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskImage: `url('/weapons/sword.svg'`,
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                  }}
                  className="relative z-20 w-[42px] h-[42px] scale-125"
                ></div>
              </div>
              <div>
                <span className="background-gradient bg-clip-text text-transparent text-4xl font-medium">
                  Interactive tables
                </span>
                <span className="w-[300px] block text-gray-400">
                  Create campaigns with customizable sheets, dice rolls and
                  intuitive tools.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-x-4">
              <div className="bg-border rounded-full w-fit">
                <div
                  style={{
                    background: "linear-gradient(to right, #42d392, #8B5CF6)",
                    WebkitMaskImage: `url('/weapons/kriegsbeil.svg')`,
                    WebkitMaskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskImage: `url('/weapons/kriegsbeil.svg'`,
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                  }}
                  className="relative z-20 w-[42px] h-[42px] scale-125"
                ></div>
              </div>
              <div>
                <span className="background-gradient bg-clip-text text-transparent text-4xl font-medium">
                  Session streaming
                </span>
                <span className="w-[300px] block text-gray-400">
                  Watch and follow other players' epic adventures.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-x-4">
              <div className="bg-border rounded-full w-fit">
                <div
                  style={{
                    background: "linear-gradient(to right, #42d392, #8B5CF6)",
                    WebkitMaskImage: `url('/weapons/kompositbogen.svg')`,
                    WebkitMaskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskImage: `url('/weapons/kompositbogen.svg'`,
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                  }}
                  className="relative z-20 w-[42px] h-[42px] scale-125"
                ></div>
              </div>
              <div>
                <span className="background-gradient bg-clip-text text-transparent text-4xl font-medium">
                 Social network
                </span>
                <span className="w-[300px] block text-gray-400">
                  Share stories, chronicles and epic moments with the community.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-x-4">
              <div className="bg-border rounded-full w-fit">
                <div
                  style={{
                    background: "linear-gradient(to right, #42d392, #8B5CF6)",
                    WebkitMaskImage: `url('/weapons/basiliskanzunge.svg')`,
                    WebkitMaskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskImage: `url('/weapons/basiliskanzunge.svg'`,
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                  }}
                  className="relative z-20 w-[42px] h-[42px] scale-125"
                ></div>
              </div>
              <div>
                <span className="background-gradient bg-clip-text text-transparent text-4xl font-medium">
                  Player matchmaking
                </span>
                <span className="w-[300px] block text-gray-400">
                  Find groups and new allies for your campaigns.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
