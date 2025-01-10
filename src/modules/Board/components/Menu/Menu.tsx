import { Tooltip } from "@/shared/components"

interface MenuProps {
  active: "map" | "dice" | "characters" | "handouts" | "notifications" | "chat"
  onActive: (
    value: "map" | "dice" | "characters" | "handouts" | "notifications" | "chat"
  ) => void
}

export const Menu = ({ active, onActive }: MenuProps) => {
  return (
    <div className="w-fit h-screen relative p-2">
      <div className="flex flex-col items-center gap-y-4">
        <Tooltip text="Map" variant position="right">
          <span onClick={() => onActive("map")} className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 256 256"
              className={`${
                active === "map" && " background-gradient "
              } rounded-xl p-1 fill-white`}
            >
              <path d="M249.94,120.24l-27.05-6.76a95.86,95.86,0,0,0-80.37-80.37l-6.76-27a8,8,0,0,0-15.52,0l-6.76,27.05a95.86,95.86,0,0,0-80.37,80.37l-27,6.76a8,8,0,0,0,0,15.52l27.05,6.76a95.86,95.86,0,0,0,80.37,80.37l6.76,27.05a8,8,0,0,0,15.52,0l6.76-27.05a95.86,95.86,0,0,0,80.37-80.37l27.05-6.76a8,8,0,0,0,0-15.52Zm-95.49,22.9L139.31,128l15.14-15.14L215,128Zm-52.9,0L41,128l60.57-15.14L116.69,128ZM205.77,109.2,158.6,97.4,146.8,50.23A79.88,79.88,0,0,1,205.77,109.2Zm-62.63-7.65L128,116.69l-15.14-15.14L128,41ZM109.2,50.23,97.4,97.4,50.23,109.2A79.88,79.88,0,0,1,109.2,50.23Zm-59,96.57L97.4,158.6l11.8,47.17A79.88,79.88,0,0,1,50.23,146.8Zm62.63,7.65L128,139.31l15.14,15.14L128,215Zm33.94,51.32,11.8-47.17,47.17-11.8A79.88,79.88,0,0,1,146.8,205.77Z"></path>
            </svg>
          </span>
        </Tooltip>
        <Tooltip text="Characters" variant position="right">
          <span
            onClick={() => {
              onActive("characters")
            }}
            className="cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 256 256"
              className={`${
                active === "characters" && " background-gradient "
              } rounded-xl p-1 fill-white`}
            >
              <path d="M83.19,174.4a8,8,0,0,0,11.21-1.6,52,52,0,0,1,83.2,0,8,8,0,1,0,12.8-9.6A67.88,67.88,0,0,0,163,141.51a40,40,0,1,0-53.94,0A67.88,67.88,0,0,0,81.6,163.2,8,8,0,0,0,83.19,174.4ZM112,112a24,24,0,1,1,24,24A24,24,0,0,1,112,112Zm96-88H64A16,16,0,0,0,48,40V64H32a8,8,0,0,0,0,16H48v40H32a8,8,0,0,0,0,16H48v40H32a8,8,0,0,0,0,16H48v24a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V40A16,16,0,0,0,208,24Zm0,192H64V40H208Z"></path>
            </svg>
          </span>
        </Tooltip>
        <Tooltip text="Handouts" variant position="right">
          <span
            onClick={() => onActive("handouts")}
            className="cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 256 256"
              className={`${
                active === "handouts" && " background-gradient "
              } rounded-xl p-1 fill-white`}
            >
              <path d="M88,112a8,8,0,0,1,8-8h80a8,8,0,0,1,0,16H96A8,8,0,0,1,88,112Zm8,40h80a8,8,0,0,0,0-16H96a8,8,0,0,0,0,16ZM232,64V184a24,24,0,0,1-24,24H32A24,24,0,0,1,8,184.11V88a8,8,0,0,1,16,0v96a8,8,0,0,0,16,0V64A16,16,0,0,1,56,48H216A16,16,0,0,1,232,64Zm-16,0H56V184a23.84,23.84,0,0,1-1.37,8H208a8,8,0,0,0,8-8Z"></path>
            </svg>
          </span>
        </Tooltip>
        <Tooltip text="Chat" variant position="right">
          <span onClick={() => onActive("chat")} className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 256 256"
              className={`${
                active === "chat" && " background-gradient "
              } rounded-xl p-1 fill-white`}
            >
              <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path>
            </svg>
          </span>
        </Tooltip>
        <Tooltip text="Notifications" variant position="right">
          <div
            onClick={() => onActive("notifications")}
            className="cursor-pointer block relative !w-[40px] !h-[40px]"
          >
            <div className="absolute z-50 top-[6px] right-[9px] rounded-full bg-red-500 w-2 h-2" />
            <div className="absolute z-50 animate-ping top-[6px] right-[9px] rounded-full bg-red-500 w-2 h-2" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 256 256"
              className={`${
                active === "notifications" && " background-gradient "
              } rounded-xl p-1 fill-white`}
            >
              <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
            </svg>
          </div>
        </Tooltip>
      </div>
      <img
        src="https://lh3.googleusercontent.com/a/ACg8ocKZ6-8Y81xmgJICx4clB0lEyFaGLS2L4qVB1K6ETBP4k-3Ovlk=s258-c-no"
        alt=""
        referrerPolicy="no-referrer"
        className="w-[40px] absolute bottom-4 cursor-pointer object-cover left-1/2 -translate-x-1/2 h-[40px] rounded-full mt-auto"
      />
    </div>
  )
}
