interface InventoryDisplayProps {
  inventory: Array<{
    id: string
    name: string
  }>
  infos: {
    name: string
    sex: "male" | "female"
    characterUrl: string
    occupation: string
    hitPoints: number
    magicPoints: number
    sanity: number
    inspiration: boolean
  }
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

export const InventoryDisplay = ({
  activeItems,
  toggleItem,
  inventory,
  infos,
}: InventoryDisplayProps) => {
  return (
    <div className="mb-4 rounded border border-border">
      <div
        onClick={() => toggleItem("inventory")}
        className="flex p-2 cursor-pointer items-center justify-between sticky top-[49px] z-[100] shadow-sm shadow-black/50 bg-[#0e0e0e]"
      >
        <h3 className="text-2xl flex items-center gap-x-2 font-semibold">
          <span className="p-2 rounded">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23 5H9C7.14409 5.00199 5.36477 5.74012 4.05245 7.05245C2.74012 8.36477 2.00199 10.1441 2 12V24C2 24.5304 2.21071 25.0391 2.58579 25.4142C2.96086 25.7893 3.46957 26 4 26H28C28.5304 26 29.0391 25.7893 29.4142 25.4142C29.7893 25.0391 30 24.5304 30 24V12C29.998 10.1441 29.2599 8.36477 27.9476 7.05245C26.6352 5.74012 24.8559 5.00199 23 5ZM28 12V13H24V7.1C25.1286 7.33205 26.1427 7.94613 26.8713 8.8387C27.6 9.73128 27.9986 10.8478 28 12ZM17 17H15V13H17V17ZM14 19H18C18.2652 19 18.5196 18.8946 18.7071 18.7071C18.8946 18.5196 19 18.2652 19 18V15H22V24H10V15H13V18C13 18.2652 13.1054 18.5196 13.2929 18.7071C13.4804 18.8946 13.7348 19 14 19ZM19 13V12C19 11.7348 18.8946 11.4804 18.7071 11.2929C18.5196 11.1054 18.2652 11 18 11H14C13.7348 11 13.4804 11.1054 13.2929 11.2929C13.1054 11.4804 13 11.7348 13 12V13H10V7H22V13H19ZM8 7.1V13H4V12C4.00141 10.8478 4.40003 9.73128 5.12866 8.8387C5.8573 7.94613 6.87139 7.33205 8 7.1ZM4 15H8V24H4V15ZM28 24H24V15H28V24Z"
                fill="url(#paint0_linear_87_2)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_87_2"
                  x1="16"
                  y1="5"
                  x2="16"
                  y2="26"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#42D392" />
                  <stop offset="1" stop-color="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="background-gradient bg-clip-text text-transparent">
            Inventory
          </span>
        </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#cccccc80"
          viewBox="0 0 256 256"
          className={`${
            activeItems.includes("inventory") ? "rotate-180" : "rotate-0"
          } transition-all duration-300 ease-in-out`}
        >
          <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
        </svg>
      </div>
      {activeItems.includes("inventory") && (
        <>
          {inventory.length === 0 ? (
            <div className="p-8 flex flex-col items-center justify-center">
              <div className="col-span-1 cursor-pointer w-[50px] h-[50px] hover:brightness-150 flex items-center justify-center border border-border bg-border/50 rounded aspect-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#FFFFFF"
                  viewBox="0 0 256 256"
                >
                  <path d="M198.24,62.63l15.68-17.25a8,8,0,0,0-11.84-10.76L186.4,51.86A95.95,95.95,0,0,0,57.76,193.37L42.08,210.62a8,8,0,1,0,11.84,10.76L69.6,204.14A95.95,95.95,0,0,0,198.24,62.63ZM48,128A80,80,0,0,1,175.6,63.75l-107,117.73A79.63,79.63,0,0,1,48,128Zm80,80a79.55,79.55,0,0,1-47.6-15.75l107-117.73A79.95,79.95,0,0,1,128,208Z"></path>
                </svg>
              </div>
              <span className="text-gray-400 mt-2 w-[400px] text-center">
                {infos.name} rummage through your inventory, but find only the
                weight of nothing.
              </span>
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-2 p-2">
              {inventory.map((item) => (
                <li
                  key={item.id}
                  className="p-2 w-full line-clamp-1 rounded-sm bg-border/50 border border-dashed border-gray-400/20"
                >
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}
