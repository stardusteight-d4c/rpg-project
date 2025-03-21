import { convertTimestamp } from "@/shared/utils/convertTimestamp"
import React from "react"

export const MasterNotification: React.FC<{
  notification: Partial<INotification>
}> = ({ notification }) => {
  return (
    <div className="flex p-2 border-b border-border select-none bg-background z-20 items-center gap-x-2">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="min-w-[48px] bg-border p-2 select-none pointer-events-none min-h-[48px] border border-border aspect-square rounded-full"
      >
        <path
          d="M28.8626 9.20037C28.4715 9.00867 28.0281 8.95119 27.601 9.03683C27.174 9.12247 26.787 9.34645 26.5001 9.67412L22.2913 14.2104L17.8163 4.17412C17.8161 4.16996 17.8161 4.16579 17.8163 4.16163C17.6563 3.81456 17.4002 3.52061 17.0783 3.31457C16.7564 3.10852 16.3822 2.99902 16.0001 2.99902C15.6179 2.99902 15.2437 3.10852 14.9218 3.31457C14.5999 3.52061 14.3438 3.81456 14.1838 4.16163C14.184 4.16579 14.184 4.16996 14.1838 4.17412L9.70882 14.2104L5.50007 9.67412C5.21128 9.34639 4.82313 9.12221 4.39493 9.03585C3.96673 8.94949 3.52203 9.00569 3.12878 9.19586C2.73553 9.38604 2.41536 9.69974 2.21718 10.089C2.01901 10.4783 1.95373 10.9218 2.03132 11.3516C2.03132 11.3654 2.03132 11.3779 2.04007 11.3916L4.87507 24.3754C4.96234 24.8326 5.20634 25.245 5.56502 25.5416C5.92371 25.8383 6.37462 26.0005 6.84007 26.0004H25.1613C25.6266 26.0002 26.0772 25.8378 26.4356 25.5412C26.794 25.2446 27.0378 24.8324 27.1251 24.3754L29.9601 11.3916C29.9601 11.3779 29.9601 11.3654 29.9688 11.3516C30.0479 10.9212 29.9822 10.4767 29.7821 10.0876C29.582 9.6984 29.2587 9.38644 28.8626 9.20037ZM25.1688 23.9604L25.1613 24.0004H6.83882L6.83132 23.9604L4.00007 11.0004L4.01757 11.0204L9.26757 16.6754C9.37999 16.7969 9.5208 16.8885 9.67738 16.9422C9.83396 16.9958 10.0014 17.0098 10.1647 16.9828C10.328 16.9557 10.482 16.8886 10.613 16.7874C10.744 16.6862 10.8478 16.5541 10.9151 16.4029L16.0001 5.00038L21.0863 16.4066C21.1536 16.5578 21.2574 16.69 21.3884 16.7912C21.5194 16.8924 21.6734 16.9595 21.8367 16.9865C22 17.0135 22.1674 16.9996 22.324 16.9459C22.4806 16.8923 22.6214 16.8006 22.7338 16.6791L27.9838 11.0241L28.0001 11.0004L25.1688 23.9604Z"
          fill="url(#paint0_linear_109_5)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_109_5"
            x1="16.0005"
            y1="2.99902"
            x2="16.0005"
            y2="26.0004"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#42D392" />
            <stop offset="1" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>

      <div className="flex flex-col">
        <span className="block whitespace-nowrap background-gradient w-fit bg-clip-text text-transparent text-lg font-bold -tracking-wide">
          Keeper of Arcane Lore
        </span>
        <span className="text-gray-400 -mt-1 text-sm whitespace-nowrap">
          {notification.content}
        </span>
      </div>
      <div className="text-gray-500/80 select-none flex items-center gap-x-[2px] mt-1 w-full justify-end">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#6b7280"
          viewBox="0 0 256 256"
        >
          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
        </svg>
        <span className="text-xs block max-h-[16px]">
          {notification.createdAt
            ? convertTimestamp(notification.createdAt)
            : convertTimestamp(new Date().toISOString())}
        </span>
      </div>
    </div>
  )
}
