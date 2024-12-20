import { ProfileInfo } from "../../../character-sheets/CallOfCthulhu/components"

interface CharactersDisplayProps {
  characters: Array<{
    player: any
    infos: any
    attributes: any
    skills: any
    combat: any
  }>
  setEditMode: (value: boolean) => void
  setSelectedCharacter: (
    value: {
      player: any
      infos: any
      attributes: any
      skills: any
      combat: any
    } | null
  ) => void
}

export const CharactersDisplay = ({
  characters,
  setEditMode,
  setSelectedCharacter,
}: CharactersDisplayProps) => {
  return (
    <section className="relative h-screen overflow-y-scroll no-scrollbar">
      <div className="sticky border-b border-border shadow-p z-50 top-0 p-2 w-full inset-x-0 bg-background">
        <div className="flex items-center gap-x-4">
          <div className="flex cursor-pointer items-center group w-fit gap-x-2">
            <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full shadow-p group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
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
            onClick={() => setEditMode(true)}
            className="flex cursor-pointer items-center group w-fit gap-x-2"
          >
            <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full shadow-p group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.69,147.32,64l24-24L216,84.69Z"></path>
              </svg>
            </button>
            <span>Update Character</span>
          </div>
        </div>
      </div>

      <div className="p-2 space-y-2">
        {characters.map((character) => (
          <div
            onClick={() => setSelectedCharacter(character)}
            key={character.infos.id}
            className="cursor-pointer border border-border hover:bg-border p-2 rounded"
          >
            <ProfileInfo infos={character.infos} player={character.player} />
          </div>
        ))}
      </div>
    </section>
  )
}
