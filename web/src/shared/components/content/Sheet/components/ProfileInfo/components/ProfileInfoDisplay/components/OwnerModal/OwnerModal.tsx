import { UserAvatar } from "@/shared/components/content/UserAvatar"
import { ModalWrapper } from "@/shared/components/ui"

export const OwnerModal: React.FC<{
  user: IUser
  status: boolean
  onStatusChange: (value: boolean) => void
}> = ({ user, status, onStatusChange }) => {
  return (
    <ModalWrapper onStatusChange={onStatusChange} status={status}>
      <div className="px-4 py-8 w-[681px] relative">
        <div className="flex flex-col items-center mt-4 gap-y-2 justify-center">
          <UserAvatar {...user} size={100} />
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl background-gradient text-transparent bg-clip-text w-fit font-bold">
              {user.name}
            </span>
            <span className="text-gray-400 -mt-1">{user.username}</span>
          </div>
          <div className="mt-4 flex items-center cursor-pointer group justify-center gap-x-2">
            <span className="bg-border group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all p-2 rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M168,56a8,8,0,0,1,8-8h16V32a8,8,0,0,1,16,0V48h16a8,8,0,0,1,0,16H208V80a8,8,0,0,1-16,0V64H176A8,8,0,0,1,168,56Zm62.56,54.68a103.92,103.92,0,1,1-85.24-85.24,8,8,0,0,1-2.64,15.78A88.07,88.07,0,0,0,40,128a87.62,87.62,0,0,0,22.24,58.41A79.66,79.66,0,0,1,98.3,157.66a48,48,0,1,1,59.4,0,79.66,79.66,0,0,1,36.06,28.75A87.62,87.62,0,0,0,216,128a88.85,88.85,0,0,0-1.22-14.68,8,8,0,1,1,15.78-2.64ZM128,152a32,32,0,1,0-32-32A32,32,0,0,0,128,152Zm0,64a87.57,87.57,0,0,0,53.92-18.5,64,64,0,0,0-107.84,0A87.57,87.57,0,0,0,128,216Z"></path>
              </svg>
            </span>
            <span>Follow</span>
          </div>
        </div>
      </div>
    </ModalWrapper>
  )
}
