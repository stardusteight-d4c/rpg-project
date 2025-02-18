"use client"

import { useRouter } from "next/navigation"

export const Campaigns = () => {
  const { push } = useRouter()

  return (
    <div>
        <h2 className="text-3xl pointer-events-none font-bold mb-2">
        Campaigns
      </h2>
      <div className="grid grid-cols-3 w-full gap-4">
        {[].map((item: any, index) => (
          <div
            key={index}
            onClick={() =>
              push("/campaign/c84df9de-5834-43ef-a526-d838a77e75dc")
            }
            className="col-span-1 cursor-pointer relative h-[200px] rounded-3xl bg-ashes"
          >
            <img
              src={item.image}
              alt=""
              className="object-fill rounded-3xl w-full h-full"
            />
            <div className="px-2 border border-border bg-background w-fit z-50 shadow-sm shadow-black/50 rounded-full font-medium text-xl absolute top-2 left-2">
              <span className="background-gradient bg-clip-text text-transparent whitespace-nowrap select-none cursor-default pointer-events-none">
                {item.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
