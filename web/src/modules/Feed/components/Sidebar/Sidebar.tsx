"use client"

import { useUsers } from "@/shared/contexts/Users/UsersContext"
import { useRouter } from "next/navigation"

export const Sidebar = () => {
  const { users } = useUsers()
  const { push } = useRouter()

  return (
    <section className="w-full pb-[100px] flex flex-col gap-y-8 pl-4 mt-4 min-h-screen relative">
      <div className="p-4 bg-border border border-border rounded-3xl">
        <h2 className="text-2xl tracking-wide pointer-events-none font-bold mb-4">
          Happening right now
        </h2>
        <div className="flex flex-col w-full gap-4">
          {[
            {
              image:
                "https://cdn.myportfolio.com/01576c1cae45f964574cd467d49a52b8/cb80796e-42ab-43bc-bea0-f12e2907d474_rw_1920.jpg?h=423137e847613be7260e67b60daec37e",
              name: "Beyond the Mountains of Madness",
              watching: 12,
            },
            {
              image:
                "https://mir-s3-cdn-cf.behance.net/project_modules/hd/1e8c1f94180437.5e78948e881c2.jpg",
              name: "Masks of Nyarlathotep",
              watching: 6,
            },
            {
              image:
                "https://assetsio.gnwcdn.com/call-of-cthulhu-masks-of-nyarlathotep-artwork.jpeg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp",
              name: "Horror on the Orient Express",
              watching: 8,
            },
          ].map((item, index) => (
            <div>
              <div
                key={index}
                onClick={() =>
                  push("/campaign/c84df9de-5834-43ef-a526-d838a77e75dc")
                }
                className="cursor-pointer relative h-[200px] rounded-3xl bg-ashes"
              >
                <div className="rounded-full h-[12px] w-[12px] bg-green-500 absolute right-[20px] top-[20px] aspect-square" />
                <div className="rounded-full h-[12px] w-[12px] animate-ping bg-green-500 absolute right-[20px] top-[20px] aspect-square" />
                <span className="absolute bottom-2 left-2 bg-background flex items-center gap-x-2 shadow-sm shadow-black/50 duration-300 ease-in-out transition-all p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#22c55e"
                    viewBox="0 0 256 256"
                  >
                    <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path>
                  </svg>
                  <span className="text-base text-green-500 font-medium pr-1">
                    Watch
                  </span>
                </span>
                <span className="absolute bottom-2 right-2 bg-background flex items-center gap-x-2 shadow-sm shadow-black/50 duration-300 ease-in-out transition-all p-2 rounded-full">
                  <span className="text-base font-medium pr-1">
                    {item.watching} Watching
                  </span>
                </span>
                {users.map((user, index) => (
                  <div
                    key={user.id}
                    className="absolute flex items-center gap-x-1 inset-x-0 w-full top-2 left-2"
                  >
                    <img
                      src={user.avatarUrl}
                      alt=""
                      style={{ marginLeft: `${index * 20}px` }}
                      className="w-[32px] h-[32px] rounded-full"
                    />
                  </div>
                ))}
                <img
                  src={item.image}
                  alt=""
                  className="object-fill rounded-3xl w-full h-full"
                />
              </div>
              <span className="text-lg background-gradient bg-clip-text text-transparent font-medium whitespace-nowrap select-none cursor-default pointer-events-none">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
