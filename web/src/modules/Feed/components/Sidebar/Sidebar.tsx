"use client"

import { useCampaigns } from "@/shared/contexts/Campaigns/CampaignsContext"
import { getNameInitials } from "@/shared/utils/getNameInitials"
import { useRouter } from "next/navigation"

export const Sidebar = () => {
  const { userCampaigns } = useCampaigns()
  const { push } = useRouter()

  // const campaigns = getAllBy({ key: "status", value: "active" })

  return (
    <section className="w-full mb-4 flex flex-col gap-y-8 pl-4 mt-4 ">
      <div className="pt-4 sticky top-[66px] h-fit border border-border rounded-xl">
        <h2 className="text-2xl shadow-sm shadow-black/50 border-b border-border px-4 pb-4 pointer-events-none">
          <h3 className="text-2xl flex items-center gap-x-2 font-semibold">
            <span>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 10C14 9.60444 14.1173 9.21776 14.3371 8.88886C14.5568 8.55996 14.8692 8.30362 15.2346 8.15224C15.6001 8.00087 16.0022 7.96126 16.3902 8.03843C16.7781 8.1156 17.1345 8.30608 17.4142 8.58579C17.6939 8.86549 17.8844 9.22186 17.9616 9.60982C18.0387 9.99778 17.9991 10.3999 17.8478 10.7654C17.6964 11.1308 17.44 11.4432 17.1111 11.6629C16.7822 11.8827 16.3956 12 16 12C15.4696 12 14.9609 11.7893 14.5858 11.4142C14.2107 11.0391 14 10.5304 14 10ZM8 10C8 7.87827 8.84285 5.84344 10.3431 4.34315C11.8434 2.84285 13.8783 2 16 2C18.1217 2 20.1566 2.84285 21.6569 4.34315C23.1571 5.84344 24 7.87827 24 10C24 17.4938 16.8025 21.6925 16.5 21.8687C16.3489 21.9551 16.1778 22.0006 16.0037 22.0006C15.8297 22.0006 15.6586 21.9551 15.5075 21.8687C15.1975 21.6925 8 17.5 8 10ZM10 10C10 15.275 14.48 18.7763 16 19.8125C17.5187 18.7775 22 15.275 22 10C22 8.4087 21.3679 6.88258 20.2426 5.75736C19.1174 4.63214 17.5913 4 16 4C14.4087 4 12.8826 4.63214 11.7574 5.75736C10.6321 6.88258 10 8.4087 10 10ZM25.3463 18.4538C25.1001 18.3724 24.832 18.3899 24.5985 18.5024C24.365 18.6149 24.1843 18.8137 24.0945 19.0568C24.0047 19.3 24.0128 19.5685 24.1171 19.8058C24.2215 20.0431 24.4139 20.2306 24.6537 20.3288C26.7175 21.0925 28 22.115 28 23C28 24.67 23.435 27 16 27C8.565 27 4 24.67 4 23C4 22.115 5.2825 21.0925 7.34625 20.33C7.58614 20.2318 7.77853 20.0443 7.88286 19.807C7.98719 19.5697 7.99531 19.3012 7.90551 19.0581C7.8157 18.8149 7.63499 18.6161 7.40147 18.5036C7.16795 18.3911 6.89987 18.3737 6.65375 18.455C3.6525 19.5612 2 21.1762 2 23C2 26.8975 9.21375 29 16 29C22.7863 29 30 26.8975 30 23C30 21.1762 28.3475 19.5613 25.3463 18.4538Z"
                  fill="url(#paint0_linear_229_15)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_229_15"
                    x1="16"
                    y1="2"
                    x2="16"
                    y2="29"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#42D392" />
                    <stop offset="1" stop-color="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="background-gradient w-fit bg-clip-text text-transparent">
              Investigators on the field!
            </span>
          </h3>
        </h2>
        <div className="flex max-h-[450px] no-scrollbar overflow-y-scroll pb-4 px-4 pt-4 flex-col w-full gap-y-4">
          {userCampaigns.length === 0 && (
            <div className="w-full flex items-center justify-center">
              <div className="p-8 w-full h-[348px] bg-ashes rounded-xl flex flex-col items-center justify-center">
                <div className="col-span-1 w-[50px] h-[50px] flex items-center justify-center bg-border/50 border border-border rounded aspect-square">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="#9ca3af"
                    viewBox="0 0 256 256"
                  >
                    <path d="M112,80a16,16,0,1,1,16,16A16,16,0,0,1,112,80ZM64,80a64,64,0,0,1,128,0c0,59.95-57.58,93.54-60,94.95a8,8,0,0,1-7.94,0C121.58,173.54,64,140,64,80Zm16,0c0,42.2,35.84,70.21,48,78.5,12.15-8.28,48-36.3,48-78.5a48,48,0,0,0-96,0Zm122.77,67.63a8,8,0,0,0-5.54,15C213.74,168.74,224,176.92,224,184c0,13.36-36.52,32-96,32s-96-18.64-96-32c0-7.08,10.26-15.26,26.77-21.36a8,8,0,0,0-5.54-15C29.22,156.49,16,169.41,16,184c0,31.18,57.71,48,112,48s112-16.82,112-48C240,169.41,226.78,156.49,202.77,147.63Z"></path>
                  </svg>
                </div>
                <span className="text-gray-400 block mt-2 text-center">
                  The wind blows through the abandoned ruins... It seems no one
                  is playing now.
                </span>
              </div>
            </div>
          )}

          {userCampaigns.map((campaign, index) => (
            <div>
              <div
                key={index}
                onClick={() => push(`/campaign/${campaign.id}`)}
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
                    {campaign.streaming?.watchers.length ?? 0} Watching
                  </span>
                </span>
                {campaign.players.map((user, index) => (
                  <div
                    key={user.id}
                    className="absolute flex items-center gap-x-1 inset-x-0 w-full top-2 left-2"
                  >
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt=""
                        referrerPolicy="no-referrer"
                        style={{ marginRight: `${index * 20}px` }}
                        className="w-[32px] h-[32px] object-cover rounded-full"
                      />
                    ) : (
                      <div
                        style={{ marginRight: `${index * 20}px` }}
                        className="w-[32px] h-[32px] text-lg font-bold bg-background text-white flex items-center justify-center aspect-square object-cover select-none pointer-events-none border border-border rounded-full"
                      >
                        {getNameInitials(campaign.owner.name)}
                      </div>
                    )}
                  </div>
                ))}
                <img
                  src={campaign.coverUrl}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="object-fill rounded-xl w-full h-full"
                />
              </div>
              <span className="text-lg background-gradient bg-clip-text text-transparent font-medium whitespace-nowrap select-none cursor-default pointer-events-none">
                {campaign.name}
              </span>
            </div>
          ))}
          {/* <span className="text-blue-500 underline mx-auto block cursor-pointer w-fit">
            See more
          </span> */}
        </div>
      </div>
    </section>
  )
}
