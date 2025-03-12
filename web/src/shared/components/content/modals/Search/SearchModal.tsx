import React, { useEffect, useState } from "react"
import { GlowingWrapper } from "../../../ui/GlowingWrapper"
import { ModalWrapper } from "../../../ui/ModalWrapper"
import { useUsers } from "@/shared/contexts/Users/UsersContext"
import { getNameInitials } from "@/shared/utils/getNameInitials"
import { useRouter } from "next/navigation"
import { useCampaigns } from "@/shared/contexts/Campaigns/CampaignsContext"
import { UserAvatar } from "../../UserAvatar"

export const SearchModal: React.FC<{
  onStatusChange: (value: boolean) => void
  status: boolean
}> = ({ onStatusChange, status }) => {
  const { searchByUsername } = useUsers()
  const { searchByName } = useCampaigns()
  const { push } = useRouter()
  const [usersFound, setUsersFound] = useState<IUser[]>([])
  const [campaignsFound, setCampaignsFound] = useState<ICampaign[]>([])
  const [searchType, setSearchType] = useState<"campaign" | "player">("player")
  const [searchTerm, setSearchTerm] = useState<string>("")

  useEffect(() => {
    ;(async () => {
      if (searchTerm.length === 0) {
        setUsersFound([])
        setCampaignsFound([])
      }

      if (searchTerm.length >= 4 && searchType === "player") {
        searchByUsername(searchTerm).then((users) => {
          setUsersFound(users)
        })
      }

      if (searchTerm.length >= 4 && searchType === "campaign") {
        searchByName(searchTerm).then((campaigns) => {
          setCampaignsFound(campaigns)
        })
      }
    })()
  }, [searchTerm, searchType])

  return (
    <ModalWrapper
      status={status}
      title="Search"
      onStatusChange={onStatusChange}
    >
      <div className="w-[700px]">
        <div className="py-2 px-4 sticky z-[200] border-b border-border shadow-md shadow-black/50 top-0 w-full inset-x-0 bg-background">
          <div className="flex items-center gap-x-4">
            <button
              onClick={() => {
                setSearchTerm("")
                setSearchType("player")
              }}
              className="cursor-pointer w-fit flex items-center group gap-x-2"
            >
              <div
                className={`
                      ${
                        searchType === "player"
                          ? " bg-gradient-to-tr from-[#42d392] to-[#8B5CF6] "
                          : " bg-ashes "
                      }
                       flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#FFFFFF"
                  viewBox="0 0 256 256"
                >
                  <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                </svg>
              </div>
              <span>Player</span>
            </button>
            <button
              onClick={() => {
                setSearchTerm("")
                setSearchType("campaign")
              }}
              className="cursor-pointer w-fit flex items-center group gap-x-2"
            >
              <div
                className={`
                      ${
                        searchType === "campaign"
                          ? " bg-gradient-to-tr from-[#42d392] to-[#8B5CF6] "
                          : " bg-ashes "
                      }
                       flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#FFFFFF"
                  viewBox="0 0 256 256"
                >
                  <path d="M42.76,50A8,8,0,0,0,40,56V224a8,8,0,0,0,16,0V179.77c26.79-21.16,49.87-9.75,76.45,3.41,16.4,8.11,34.06,16.85,53,16.85,13.93,0,28.54-4.75,43.82-18a8,8,0,0,0,2.76-6V56A8,8,0,0,0,218.76,50c-28,24.23-51.72,12.49-79.21-1.12C111.07,34.76,78.78,18.79,42.76,50ZM216,172.25c-26.79,21.16-49.87,9.74-76.45-3.41-25-12.35-52.81-26.13-83.55-8.4V59.79c26.79-21.16,49.87-9.75,76.45,3.4,25,12.35,52.82,26.13,83.55,8.4Z"></path>
                </svg>
              </div>
              <span>Campaign</span>
            </button>
          </div>
        </div>
      </div>
      <div className="w-[700px] p-2">
        <GlowingWrapper inset="0" border="rounded-md">
          <input
            id="name"
            name="name"
            placeholder={
              searchType === "campaign" ? "Enter a name" : "Enter a username"
            }
            spellCheck="false"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-1 px-2 w-full cursor-text hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-md bg-ashes border border-border outline-none"
          />
        </GlowingWrapper>
        {searchType === "player" && usersFound.length !== 0 && (
          <div className="mt-2 space-y-2">
            {usersFound.map((user) => (
              <div
                onClick={() => push(`/profile/${user.username}`)}
                className="flex p-2 cursor-pointer select-none border border-border bg-ashes rounded-lg z-20 items-center gap-x-2"
              >
                <UserAvatar
                  name={user.name}
                  username={user.username}
                  avatarUrl={user.avatarUrl}
                />
                <div className="flex flex-col">
                  <span className="block text-lg font-bold -tracking-wide">
                    {user.name}
                  </span>
                  <span className="text-gray-400 -mt-2 block text-sm">
                    #{user.username}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        {searchType === "campaign" && campaignsFound.length !== 0 && (
          <div className="mt-2 space-y-2">
            {campaignsFound.map((campaign) => (
              <div
                onClick={() => push(`/campaign/${campaign.id}`)}
                className="flex p-2 cursor-pointer select-none bg-ashes rounded-lg z-20 items-center gap-x-2"
              >
                <img
                  src={campaign.coverUrl}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="w-[48px] aspect-square object-cover select-none pointer-events-none h-[48px] border border-border rounded-full"
                />

                <div className="flex flex-col">
                  <span className="block text-lg font-bold -tracking-wide">
                    {campaign.name}
                  </span>
                  <span className="text-gray-400 -mt-2 block text-sm">
                    {campaign.owner.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ModalWrapper>
  )
}
