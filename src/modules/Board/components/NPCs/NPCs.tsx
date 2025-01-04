export const NPCs = () => {
  return (
    <section>
      <div className="p-2">
        <div className="flex">
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
            <div className="text-sm text-gray-400 block">
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
      </div>
    </section>
  )
}
