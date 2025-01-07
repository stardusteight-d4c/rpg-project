import { ProfileInfo } from "../../../character-sheets/CallOfCthulhu/components"

interface CharactersDisplayProps {
  characters: Array<{
    player: any
    infos: any
    attributes: any
    skills: any
    combat: any
    inventory: any
    backstory: any
  }>
  setEditMode: (value: boolean) => void
  setCreateMode: (value: boolean) => void
  setSelectedCharacter: (
    value: {
      player: any
      infos: any
      attributes: any
      skills: any
      combat: any
      inventory: any
      backstory: any
    } | null
  ) => void
  isViewNPCs: boolean
  toggleSwitch: () => void
}

export const CharactersDisplay = ({
  characters,
  setSelectedCharacter,
  setCreateMode,
  isViewNPCs,
  toggleSwitch,
}: CharactersDisplayProps) => {
  return (
    <section className="relative h-screen overflow-y-scroll no-scrollbar">
      <div className="sticky border-b border-border  shadow-sm shadow-black/50 z-50 top-0 p-2 w-full inset-x-0 bg-background">
        <div className="flex items-center gap-x-4">
          <div
            onClick={() => setCreateMode(true)}
            className="flex cursor-pointer items-center group w-fit gap-x-2"
          >
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
            <span>Create Character</span>
          </div>
          <div
            onClick={toggleSwitch}
            className="flex ml-auto cursor-pointer items-center group w-fit gap-x-2"
          >
            <span>
              {isViewNPCs ? "Change to Characters" : "Change to NPCs/Enemies"}
            </span>
            <button className="bg-ashes w-[32px] h-[32px] flex items-center justify-center text-white p-[9px] rounded-full  shadow-md shadow-black/50 group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
              <svg
                stroke="#FFFFFF"
                fill="#FFFFFF"
                stroke-width="0"
                viewBox="0 0 448 512"
                height="28"
                width="28"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M224 16c-6.7 0-10.8-2.8-15.5-6.1C201.9 5.4 194 0 176 0c-30.5 0-52 43.7-66 89.4C62.7 98.1 32 112.2 32 128c0 14.3 25 27.1 64.6 35.9c-.4 4-.6 8-.6 12.1c0 17 3.3 33.2 9.3 48l-59.9 0C38 224 32 230 32 237.4c0 1.7 .3 3.4 1 5l38.8 96.9C28.2 371.8 0 423.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7c0-58.5-28.2-110.4-71.7-143L415 242.4c.6-1.6 1-3.3 1-5c0-7.4-6-13.4-13.4-13.4l-59.9 0c6-14.8 9.3-31 9.3-48c0-4.1-.2-8.1-.6-12.1C391 155.1 416 142.3 416 128c0-15.8-30.7-29.9-78-38.6C324 43.7 302.5 0 272 0c-18 0-25.9 5.4-32.5 9.9c-4.8 3.3-8.8 6.1-15.5 6.1zm56 208l-12.4 0c-16.5 0-31.1-10.6-36.3-26.2c-2.3-7-12.2-7-14.5 0c-5.2 15.6-19.9 26.2-36.3 26.2L168 224c-22.1 0-40-17.9-40-40l0-14.4c28.2 4.1 61 6.4 96 6.4s67.8-2.3 96-6.4l0 14.4c0 22.1-17.9 40-40 40zm-88 96l16 32L176 480 128 288l64 32zm128-32L272 480 240 352l16-32 64-32z"></path>
              </svg>

            </button>
          </div>
        </div>
      </div>

      <div className="p-2 space-y-2">
        {characters.map((character) => (
          <div
            onClick={() => setSelectedCharacter(character)}
            key={character.infos.id}
            className="cursor-pointer border border-border hover:bg-border hover:brightness-105 p-2 rounded-xl"
          >
            <ProfileInfo infos={character.infos} player={character.player} />
          </div>
        ))}
      </div>
    </section>
  )
}
