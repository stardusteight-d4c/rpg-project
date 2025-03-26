import { UserAvatar } from "@/shared/components/content"
import { DonutChart } from "@/shared/components/ui"

export const Avatar: React.FC<{ user: IUser }> = ({ user }) => {
  return (
    <div className="w-full z-50 relative">
      <div className="absolute rounded-full shadow-md shadow-black/50  left-1/2 -translate-x-1/2  top-[-90px]">
        <DonutChart
          percentage={(user.exp!.current / user.exp!.nextLevel) * 100}
          strokeWidth={15}
          size={180}
          backgroundColor="#090909"
        />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-[175px]">
        <h2 className="text-5xl capitalize leading-[70px] text-transparent bg-clip-text background-gradient pointer-events-none -mt-2 font-bold ">
          {user.name}
        </h2>
        <span className="block text-center text-3xl lowercase -mt-[15px] text-gray-400">
          #{user.username}
        </span>
      </div>
      <div className="w-[150px] h-[150px] rounded-full object-cover absolute left-1/2 -translate-x-1/2 top-[-75px]">
        <UserAvatar
          name={user.name}
          username={user.username}
          avatarUrl={user.avatarUrl}
          size={150}
          fontSize={60}
          bgColor="border"
        />
        <div className="bg-background pointer-events-none select-none text-lg font-bold shadow-sm shadow-black/50 absolute bottom-[0px] right-[0px] w-[32px] h-[32px] rounded-full flex items-center justify-center">
          {user.exp?.level}
        </div>
      </div>
    </div>
  )
}
