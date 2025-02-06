"use client"

import { useCharacters } from "@/shared/contexts/Characters/CharactersContext"
import { useUsers } from "@/shared/contexts/Users/UsersContext"

export function CampaignModule() {
  const { users } = useUsers()
  const { getCharactersByType } = useCharacters()

  return (
    <main className="w-screen">
      <nav className=" bg-background z-[100] w-screen border-b py-1 border-border shadow-sm shadow-black/50 ">
        <div className="max-w-7xl flex items-center justify-between mx-auto">
          <h1 className="font-bold text-3xl pointer-events-none select-none flex gap-2">
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
          </div>
        </div>
      </nav>
      <div className="max-w-7xl w-full mx-auto mt-8">
        <div className="flex pb-2 select-none bg-background z-20 items-center gap-x-2">
          <img
            src="https://avatars.githubusercontent.com/u/1024025?v=4"
            alt=""
            className="w-[48px] aspect-square object-cover select-none pointer-events-none h-[48px] border border-border rounded-full"
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
        <div className="grid grid-cols-2 items-center justify-center gap-x-4">
          <div className="col-span-1">
            <img
              src="https://assetsio.gnwcdn.com/call-of-cthulhu-rpg-arkham-sourcebook-artwork.png?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp"
              alt=""
              className="w-full object-fill rounded-3xl h-[350px]"
            />
            <div className="text-gray-500/80 select-none flex items-center gap-x-[2px] mt-1 w-full justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#6b7280"
                viewBox="0 0 256 256"
              >
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
              </svg>
              <span className="block">90 hours of campaign so far</span>
            </div>
          </div>
          <div className="col-span-1 flex -mt-2 flex-col gap-y-2">
            <h2 className="text-5xl mt-4 font-bold background-gradient text-transparent bg-clip-text">
              Beyond the Mountains of Madness
            </h2>
            <span className="block text-gray-400">
              "Beyond the Mountains of Madness" é uma aventura de Call of
              Cthulhu ambientada na Antártida, onde uma expedição científica
              descobre uma civilização alienígena ancestral. Ao explorar as
              ruínas, eles se deparam com horrores cósmicos e segredos que
              desafiam a sanidade humana. A trama mistura investigação e terror
              psicológico, com um clima de desespero crescente, enquanto as
              criaturas e mistérios antigos ameaçam a humanidade.
            </span>
            <span className="bg-border cursor-pointer w-fit flex items-center gap-x-2 shadow-sm shadow-black/50 hover:bg-gradient-to-tr hover:from-[#42d392] hover:to-[#8B5CF6] duration-300 ease-in-out transition-all p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M141.66,133.66l-40,40a8,8,0,0,1-11.32-11.32L116.69,136H24a8,8,0,0,1,0-16h92.69L90.34,93.66a8,8,0,0,1,11.32-11.32l40,40A8,8,0,0,1,141.66,133.66ZM200,32H136a8,8,0,0,0,0,16h56V208H136a8,8,0,0,0,0,16h64a8,8,0,0,0,8-8V40A8,8,0,0,0,200,32Z"></path>
              </svg>
              <span className="text-xl font-medium pr-1">Join the table</span>
            </span>
          </div>
          <div className="col-span-2 mt-4 w-full">
            <h2 className="text-3xl pointer-events-none font-bold mb-4">
              Players
            </h2>
            <div>
              <div className="flex flex-col gap-2 flex-wrap">
                {getCharactersByType().players.map((character) => (
                  <div className="grid grid-cols-2 w-[500px]">
                    <div className="col-span-1 flex pb-2 select-none bg-background z-20 items-center gap-x-2">
                      <img
                        src={character.user.avatar_url}
                        alt=""
                        className="w-[48px] aspect-square object-cover select-none pointer-events-none h-[48px] border border-border rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="block text-lg font-bold -tracking-wide">
                          {character.user.name}
                        </span>
                        <span className="text-gray-400 -mt-2 block text-sm">
                          #{character.user.username}
                        </span>
                      </div>
                    </div>
                    <div className="col-span-1 flex pb-2 select-none bg-background z-20 items-center gap-x-2">
                      <img
                        src={character.infos.characterUrl}
                        alt=""
                        className="w-[48px] aspect-square object-cover select-none pointer-events-none h-[48px] border border-border rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="block text-lg font-bold -tracking-wide">
                          {character.infos.name}
                        </span>
                        <span className="text-gray-400 -mt-2 block text-sm">
                          {character.infos.occupation}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
