interface NPCsProps {
  isViewNPCs: boolean
  toggleSwitch: () => void
}

export const NPCs = ({ isViewNPCs, toggleSwitch }: NPCsProps) => {
  return (
    <section>
      <div className="sticky border-b border-border shadow-sm shadow-black/50 z-50 top-0 p-2 w-full inset-x-0 bg-background">
        <div className="flex items-center gap-x-4">
          <div className="flex cursor-pointer items-center group w-fit gap-x-2">
            <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full  shadow-md shadow-black/50 group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path>
              </svg>
            </button>
            <span>Create NPC/Enemy</span>
          </div>

          <div
            onClick={toggleSwitch}
            className="flex ml-auto cursor-pointer items-center group w-fit gap-x-2"
          >
            <span>
              {" "}
              {isViewNPCs ? "Change to Characters" : "Change to NPCs/Enimies"}
            </span>
            <button className="bg-ashes w-[32px] h-[32px] flex items-center justify-center text-white p-2 rounded-full  shadow-md shadow-black/50 group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
              <svg
                width="28"
                height="28"
                viewBox="0 0 16 16"
                fill="FFFFFF"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 7H3.42188C4.19375 8.76562 5.95 10 8 10C10.05 10 11.8062 8.76562 12.5781 7H13C13.275 7 13.5 6.775 13.5 6.5V3.5C13.5 3.225 13.275 3 13 3H12.5781C11.8062 1.23438 10.05 0 8 0C5.95 0 4.19375 1.23438 3.42188 3H3C2.725 3 2.5 3.225 2.5 3.5V6.5C2.5 6.775 2.725 7 3 7ZM4.25 4.25C4.25 3.55937 4.92188 3 5.75 3H10.25C11.0781 3 11.75 3.55937 11.75 4.25V5C11.75 6.65625 10.4062 8 8.75 8H7.25C5.59375 8 4.25 6.65625 4.25 5V4.25ZM6.5 6.5L6.875 5.375L8 5L6.875 4.625L6.5 3.5L6.125 4.625L5 5L6.125 5.375L6.5 6.5ZM11.2375 10.0437C10.3031 10.6469 9.19375 11 8 11C6.80625 11 5.69688 10.6469 4.7625 10.0437C2.65313 10.2656 1 12.0312 1 14.2V14.5C1 15.3281 1.67188 16 2.5 16H5V14C5 13.4469 5.44687 13 6 13H10C10.5531 13 11 13.4469 11 14V16H13.5C14.3281 16 15 15.3281 15 14.5V14.2C15 12.0312 13.3469 10.2656 11.2375 10.0437ZM9.5 14C9.225 14 9 14.225 9 14.5C9 14.775 9.225 15 9.5 15C9.775 15 10 14.775 10 14.5C10 14.225 9.775 14 9.5 14ZM6.5 14C6.225 14 6 14.225 6 14.5V16H7V14.5C7 14.225 6.775 14 6.5 14Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="p-2 space-y-2">
        <div className="flex cursor-pointer border border-border hover:bg-border hover:brightness-105 p-2 rounded-xl">
          <div className="relative w-fit h-fit">
            <img
              src="/characters/01.jpg"
              alt="Imagem do Personagem"
              className="min-w-[210px] max-w-[210px] min-h-[210px] max-h-[210px] border border-border object-cover rounded-xl"
            />
          </div>
          <div className="w-full pl-4">
            <div className="flex items-center gap-x-2">
              <span className="block text-3xl font-bold background-gradient bg-clip-text text-transparent">
                Charlotte Newton
              </span>
              <div>
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#3b82f6"
                  viewBox="0 0 256 256"
                  className="bg-ashes p-1 rounded-full"
                >
                  <path d="M216,32H168a8,8,0,0,0,0,16h28.69L154.62,90.07a80,80,0,1,0,11.31,11.31L208,59.32V88a8,8,0,0,0,16,0V40A8,8,0,0,0,216,32ZM149.24,197.29a64,64,0,1,1,0-90.53A64.1,64.1,0,0,1,149.24,197.29Z"></path>
                </svg> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#ec4899"
                  viewBox="0 0 256 256"
                  className="bg-ashes p-1 rounded-full"
                >
                  <path d="M208,96a80,80,0,1,0-88,79.6V200H88a8,8,0,0,0,0,16h32v24a8,8,0,0,0,16,0V216h32a8,8,0,0,0,0-16H136V175.6A80.11,80.11,0,0,0,208,96ZM64,96a64,64,0,1,1,64,64A64.07,64.07,0,0,1,64,96Z"></path>
                </svg>
              </div>
            </div>
            <span className="text-base my-2 font-medium text-gray-400 block">
              Huntress
            </span>
            <div className="text-sm text-gray-400 block !line-clamp-6">
              Charlotte is a master of duality, blending intellect and instinct
              in a seamless dance of investigation and survival. By day, she is
              a relentless journalist, uncovering truths buried beneath layers
              of lies and deception. Armed with a sharp wit and an investigative
              mind, her pen is a weapon as potent as any blade. By night, she
              transforms into "The Huntress," a shadowy figure who stalks the
              underbelly of society, solving cases the law deems unsolvable.
            </div>
          </div>
        </div>
        <div className="flex cursor-pointer border border-border hover:bg-border hover:brightness-105 p-2 rounded-xl">
          <div className="relative w-fit h-fit">
            <img
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/907bcc38-88f0-4bd7-998d-7bf2117fa6de/di0pgvo-0cc24cb7-0771-420b-b994-75c872d1a24b.jpg/v1/fill/w_350,h_350,q_70,strp/the_nameless_beast_of_the_abyss_lake_v2_by_gekkou25_di0pgvo-350t.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiJcL2ZcLzkwN2JjYzM4LTg4ZjAtNGJkNy05OThkLTdiZjIxMTdmYTZkZVwvZGkwcGd2by0wY2MyNGNiNy0wNzcxLTQyMGItYjk5NC03NWM4NzJkMWEyNGIuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.-AFdrmEJ6iXNCrYtPflkC6FDi9WlQIAGWBGRcGPuUpc"
              alt="Imagem do Personagem"
              className="min-w-[210px] max-w-[210px] min-h-[210px] max-h-[210px] border border-border object-cover rounded-xl"
            />
          </div>
          <div className="w-full pl-4">
            <div className="flex items-center gap-x-2">
              <span className="block text-3xl font-bold background-gradient bg-clip-text text-transparent">
                Dream Eater
              </span>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#FFF"
                  viewBox="0 0 256 256"
                  className="bg-ashes p-1 rounded-full"
                >
                  <path d="M208,104a80,80,0,1,0-88,79.6V232a8,8,0,0,0,16,0V183.6A80.11,80.11,0,0,0,208,104Zm-80,64a64,64,0,1,1,64-64A64.07,64.07,0,0,1,128,168Z"></path>
                </svg>

                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#ec4899"
                  viewBox="0 0 256 256"
                  className="bg-ashes p-1 rounded-full"
                >
                  <path d="M208,96a80,80,0,1,0-88,79.6V200H88a8,8,0,0,0,0,16h32v24a8,8,0,0,0,16,0V216h32a8,8,0,0,0,0-16H136V175.6A80.11,80.11,0,0,0,208,96ZM64,96a64,64,0,1,1,64,64A64.07,64.07,0,0,1,64,96Z"></path>
                </svg> */}
              </div>
            </div>
            <span className="text-base my-2 font-medium text-gray-400 block">
              The monster of the abyss
            </span>
            <div className="text-sm text-gray-400 block !line-clamp-6">
              The Dream Eater is a terrifying, ethereal creature that floats
              like a living shadow between the physical plane and nightmares.
              Its form is shrouded in a dense, pulsating mist that changes color
              from black to purple to deep blue, as if it were a fragment of the
              very void of the cosmos. According to ancient stories, the Dream
              Eater was created as a guardian of the abyss, but its insatiable
              hunger turned it into a wandering predator. It is said that those
              who can face and defeat it in their dreams can recover lost
              memories and even acquire unique abilities.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
