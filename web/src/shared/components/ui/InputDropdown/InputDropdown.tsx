import { GlowingWrapper } from "@/shared/components/ui"

export const InputDropdown: React.FC<{
  label: string
  options: string[]
  selected: string | undefined
  onChange: (value: string) => void
  zIndex?: number
}> = ({ label, options, selected, onChange, zIndex = 500 }) => {
  return (
    <li
      style={{ zIndex }}
      className="col-span-1 text-base relative flex flex-col"
    >
      <span className="text-gray-400 text-sm w-full block cursor-pointer">
        {label}
      </span>
      <GlowingWrapper inset="0">
        <div
          style={{ zIndex }}
          className="relative overflow-visible text-center justify-center group py-1 px-2 w-full cursor-pointer hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded bg-border/50 border border-border"
        >
          <span className="capitalize">{selected ?? "Select"}</span>
          <ul className="left-1/2 -translate-x-1/2 bg-background rounded-md shadow-p border border-border top-full hidden absolute z-[900] group-hover:flex flex-col w-full no-scrollbar max-h-[200px] overflow-y-scroll gap-y-1">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => onChange(option.toLowerCase())}
                style={{ zIndex }}
                className="whitespace-nowrap bg-background cursor-pointer flex items-center gap-x-2 hover:brightness-125 p-3"
              >
                <div className="check cursor-pointer !ml-0 !w-fit !px-0 flex items-center gap-x-2">
                  <input
                    type="checkbox"
                    style={{ display: "none" }}
                    checked={selected?.toLowerCase() === option.toLowerCase()}
                    className="cbx2 !ml-0 !w-fit !px-0"
                  />
                  <label
                    htmlFor={option}
                    className="check !ml-0 !w-fit !px-0 pointer-events-none select-none"
                  >
                    <svg width="18px" height="18px" viewBox="0 0 18 18">
                      <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
                      <polyline points="1 9 7 14 15 4"></polyline>
                    </svg>
                  </label>
                  <span className="capitalize">{option}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </GlowingWrapper>
    </li>
  )
}
