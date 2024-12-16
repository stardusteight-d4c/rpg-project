interface CombatProps {
  activeItems: (
    | "attributes"
    | "skills"
    | "inventory"
    | "combat"
    | "backstory"
    | null
  )[]
  toggleItem: (
    item: "attributes" | "skills" | "inventory" | "combat" | "backstory"
  ) => void
}

export const Combat = ({ activeItems, toggleItem }: CombatProps) => {
  return (
    <div className="mb-4 rounded border border-border">
      <div
        onClick={() => toggleItem("combat")}
        className="flex cursor-pointer p-2 items-center justify-between bg-border"
      >
        <h3 className="text-2xl flex items-center gap-x-2 font-semibold">
          <span className="bg-border border border-border p-2 rounded">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 2H15C13.1441 2.00199 11.3648 2.74012 10.0524 4.05245C8.74012 5.36477 8.00199 7.14409 8 9H7C5.93913 9 4.92172 9.42143 4.17157 10.1716C3.42143 10.9217 3 11.9391 3 13V16.6488C3.00089 17.103 3.15553 17.5436 3.43875 17.8988C3.46289 17.929 3.48877 17.9578 3.51625 17.985L8 22.4175V27C8 27.5304 8.21071 28.0391 8.58579 28.4142C8.96086 28.7893 9.46957 29 10 29H24C24.5304 29 25.0391 28.7893 25.4142 28.4142C25.7893 28.0391 26 27.5304 26 27V22.14L27.9225 15.4087C27.9739 15.2304 27.9999 15.0456 28 14.86V9C27.998 7.14409 27.2599 5.36477 25.9476 4.05245C24.6352 2.74012 22.8559 2.00199 21 2ZM26 14.86L24.0387 21.725C24.0129 21.8144 23.9998 21.907 24 22V27H10V22C9.99994 21.8677 9.97362 21.7366 9.92255 21.6146C9.87148 21.4925 9.79669 21.3817 9.7025 21.2887L5 16.64V13C5 12.4696 5.21071 11.9609 5.58579 11.5858C5.96086 11.2107 6.46957 11 7 11H8V13C8 13.2652 8.10536 13.5196 8.29289 13.7071C8.48043 13.8946 8.73478 14 9 14C9.26522 14 9.51957 13.8946 9.70711 13.7071C9.89464 13.5196 10 13.2652 10 13V9C10 7.67392 10.5268 6.40215 11.4645 5.46447C12.4021 4.52678 13.6739 4 15 4H21C22.3261 4 23.5979 4.52678 24.5355 5.46447C25.4732 6.40215 26 7.67392 26 9V14.86ZM21.4475 20.895L19.2362 22L21.4475 23.105C21.6849 23.2237 21.8654 23.4318 21.9493 23.6836C22.0332 23.9353 22.0137 24.2101 21.895 24.4475C21.7763 24.6849 21.5682 24.8654 21.3164 24.9493C21.0647 25.0332 20.7899 25.0137 20.5525 24.895L17 23.1175L13.4475 24.895C13.33 24.9538 13.202 24.9888 13.0709 24.9981C12.9399 25.0074 12.8082 24.9908 12.6836 24.9493C12.5589 24.9077 12.4436 24.842 12.3444 24.7559C12.2451 24.6698 12.1638 24.565 12.105 24.4475C12.0462 24.33 12.0112 24.202 12.0019 24.0709C11.9926 23.9399 12.0092 23.8082 12.0507 23.6836C12.0923 23.5589 12.158 23.4437 12.2441 23.3444C12.3302 23.2451 12.435 23.1638 12.5525 23.105L14.7638 22L12.5525 20.895C12.435 20.8362 12.3302 20.7549 12.2441 20.6556C12.158 20.5563 12.0923 20.4411 12.0507 20.3164C12.0092 20.1918 11.9926 20.0601 12.0019 19.9291C12.0112 19.798 12.0462 19.67 12.105 19.5525C12.1638 19.435 12.2451 19.3302 12.3444 19.2441C12.4436 19.158 12.5589 19.0923 12.6836 19.0507C12.9353 18.9668 13.2101 18.9863 13.4475 19.105L17 20.8825L20.5525 19.105C20.67 19.0462 20.798 19.0112 20.9291 19.0019C21.0601 18.9926 21.1918 19.0092 21.3164 19.0507C21.4411 19.0923 21.5563 19.158 21.6556 19.2441C21.7549 19.3302 21.8362 19.435 21.895 19.5525C21.9538 19.67 21.9888 19.798 21.9981 19.9291C22.0074 20.0601 21.9908 20.1918 21.9493 20.3164C21.9077 20.4411 21.842 20.5563 21.7559 20.6556C21.6698 20.7549 21.565 20.8362 21.4475 20.895Z"
                fill="url(#paint0_linear_44_5)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_44_5"
                  x1="15.5"
                  y1="2"
                  x2="15.5"
                  y2="29"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#42D392" />
                  <stop offset="1" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="background-gradient bg-clip-text text-transparent">
            Combat
          </span>
        </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#cccccc80"
          viewBox="0 0 256 256"
          className={`${
            activeItems.includes("combat") ? "rotate-180" : "rotate-0"
          } transition-all duration-300 ease-in-out`}
        >
          <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
        </svg>
      </div>
      {/* {activeItems.includes("inventory") && (
          <ul className="list-disc flex flex-col gap-y-2 p-2">
            <li className="bg-gradient-to-tr from-border to-transparent rounded-full block w-fit px-2">
              Revólver
            </li>
            <li className="bg-gradient-to-tr from-border to-transparent rounded-full block w-fit px-2">
              Lanterna
            </li>
            <li className="bg-gradient-to-tr from-border to-transparent rounded-full block w-fit px-2">
              Kit de primeiros socorros
            </li>
          </ul>
        )} */}
    </div>
  )
}
