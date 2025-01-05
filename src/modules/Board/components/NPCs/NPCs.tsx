export const NPCs = () => {
  return (
    <section>
      <div className="sticky border-b border-border  shadow-sm shadow-black/50 z-50 top-0 p-2 w-full inset-x-0 bg-background">
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
