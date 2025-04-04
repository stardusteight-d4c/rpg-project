import { Fragment } from "react"
import { RollModal } from "@/shared/components/content/modals"
import { useRolls } from "@/shared/contexts"

export const Dice = () => {
  const { openDiceModal, setOpenDiceModal } = useRolls()

  return (
    <Fragment>
      <RollModal status={openDiceModal} onStatusChange={setOpenDiceModal} />
      <div className="custom-inset-shadow h-[100px] z-[100] absolute left-0 bottom-0 bg-background flex items-center justify-center w-[20vw] border-t border-border">
        <span
          className={`${
            openDiceModal === true ? " rotate-90 " : " hover:rotate-90 "
          }  transition-all transform duration-500 ease-in-out cursor-pointer group bg-ashes p-2 rounded-full  shadow-md shadow-black/50`}
          onClick={() => setOpenDiceModal(true)}
        >
          <svg
            width="52"
            height="52"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M47.1128 11.7944L27.6128 0.436632C27.1234 0.150691 26.5668 0 26 0C25.4332 0 24.8766 0.150691 24.3872 0.436632L4.88719 11.7954C3.87461 12.3844 3.25 13.4823 3.25 14.6716V37.3292C3.25 38.5185 3.87461 39.6154 4.88719 40.2054L24.3872 51.5632C24.8766 51.8492 25.4332 51.9998 26 51.9998C26.5668 51.9998 27.1234 51.8492 27.6128 51.5632L47.1128 40.2054C48.1254 39.6154 48.75 38.5175 48.75 37.3292V14.6716C48.75 13.4823 48.1254 12.3844 47.1128 11.7944ZM26 5.85194L35.618 17.8749H16.382L26 5.85194ZM15.9067 21.1249H36.0923L26 37.5242L15.9067 21.1249ZM22.8414 38.5926L8.92937 36.8539L13.4418 23.3176L22.8414 38.5926ZM38.5582 23.3166L43.0706 36.8529L29.1586 38.5926L38.5582 23.3166ZM39.2864 17.2544L29.9274 5.55741L43.9441 13.7616L39.2864 17.2544ZM12.7136 17.2544L8.01734 13.7322L22.0878 5.53608L12.7136 17.2544ZM11.0876 20.0961L6.50406 33.8476L6.52133 16.6714L11.0876 20.0961ZM24.375 42.059V47.7901L11.9234 40.503L24.375 42.059ZM40.1781 40.4898L27.625 47.8196V42.059L40.1781 40.4898ZM40.9124 20.0961L45.498 16.6572L45.4807 33.7999L40.9124 20.0961ZM26.0142 48.7499H26.0315L26.0223 48.755L26.0142 48.7499Z"
              className={`${
                openDiceModal === true
                  ? " fill-[url(#paint-hover)] "
                  : " group-hover:fill-[url(#paint-hover)] fill-[url(#paint-default)] "
              }  transition-colors transform duration-1000 ease-in-out`}
            />
            <defs>
              <linearGradient
                id="paint-default"
                x1="26"
                y1="0"
                x2="26"
                y2="52"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FFFFFF" />
                <stop offset="1" stopColor="#FFFFFF" />
              </linearGradient>
              <linearGradient
                id="paint-hover"
                x1="26"
                y1="0"
                x2="26"
                y2="52"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#12D9C1" />
                <stop offset="1" stopColor="#EC7FFF" />
              </linearGradient>
            </defs>
          </svg>
        </span>
      </div>
    </Fragment>
  )
}
