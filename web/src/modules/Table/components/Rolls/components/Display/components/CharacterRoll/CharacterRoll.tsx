interface CharacterRollProps {
  name: string
  value: number
  halfValue: number
  fifthValue: number
  rolled: number
}

export const CharacterRoll = ({
  name,
  value,
  halfValue,
  fifthValue,
  rolled,
}: CharacterRollProps) => {
  function getResultMeta() {
    const fumble1 = value >= 50 && rolled === 100
    const fumble2 = value < 50 && rolled >= 96

    if (fumble1 || fumble2) {
      return {
        label: "Fumble",
        bgClass: "bg-gradient-to-tr from-black to-gray-500/10",
      }
    } else if (rolled > value) {
      return {
        label: "Failure",
        bgClass: "bg-gradient-to-tr from-red-600 to-red-500",
      }
    } else if (rolled <= fifthValue) {
      return {
        label: "Extreme Success",
        bgClass: "bg-gradient-to-tr from-violet-600 to-pink-500",
      }
    } else if (rolled <= halfValue) {
      return {
        label: "Hard Success",
        bgClass: "bg-gradient-to-tr from-green-600 to-green-500",
      }
    }
    return {
      label: "Regular Success",
      bgClass: "bg-gradient-to-tr from-green-600 to-green-500",
    }
  }

  const { label, bgClass } = getResultMeta()

  return (
    <div className="w-full rounded-3xl select-none overflow-hidden border border-border">
      <span className="block text-2xl bg-ashes px-4 py-2 font-bold">
        <span className="w-fit block capitalize -tracking-wide">
          {name} Roll
        </span>
      </span>
      <div className="w-full h-[0px] border-t border-t-border" />
      <div className="grid grid-cols-3 bg-border/10 items-center justify-center w-full">
        <span className="col-span-1 block p-2 text-center font-bold text-xl text-red-500">
          {`x>`}
          {value}
        </span>
        <span className="col-span-1 block p-2 border-x border-border text-center font-bold text-xl text-green-500">
          {`x>`}
          {halfValue}
          {`>x`}
        </span>
        <span className="col-span-1 block p-2 text-center font-bold text-xl bg-clip-text text-transparent bg-gradient-to-tr from-violet-500 to-pink-500">
          {fifthValue}
          {`>x`}
        </span>
      </div>
      <div className="w-full h-[0px] border-t border-t-border" />
      <div className={`${bgClass} p-4`}>
        <span className="block px-4 font-black text-4xl text-center">
          {rolled}
        </span>
        <span className="block text-base text-center -mt-2">{label}</span>
      </div>
    </div>
  )
}
