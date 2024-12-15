interface RollProps {
  action: string
  values: Array<number>
  result: number
}

export const Roll = ({ action, values, result }: RollProps) => {
  function getResultMeta() {
    if (result >= values[0] * 2) {
      return {
        label: "Fumble",
        bgClass: "bg-gradient-to-tr from-black to-black/10",
      }
    } else if (result > values[0]) {
      return {
        label: "Fail",
        bgClass: "bg-gradient-to-tr from-red-500 to-red-400",
      }
    } else if (result > values[2]) {
      return {
        label: "Success",
        bgClass: "bg-gradient-to-tr from-green-500 to-green-400",
      }
    } else {
      return {
        label: "Extreme Success",
        bgClass: "bg-gradient-to-tr from-violet-500 to-pink-500",
      }
    }
  }

  const { label, bgClass } = getResultMeta()

  return (
    <div className="w-full glassmorphism !shadow-none rounded overflow-hidden border border-border bg-border ">
      <span className="block bg-[#27272a]/50 px-4 py-2 font-bold text-base">
        {action} Roll
      </span>
      <div className="w-full h-[0px] border-t border-t-border" />
      <div className="grid grid-cols-3 items-center justify-center w-full">
        <span className="col-span-1 block p-2 text-center font-bold text-lg text-red-500">
          {`>`}
          {values[0]}
        </span>
        <span className="col-span-1 block p-2 border-x border-border text-center font-bold text-lg text-green-500">
          {`>`}
          {values[1]}
          {`>`}
        </span>
        <span className="col-span-1 block p-2 text-center font-bold text-lg bg-clip-text text-transparent bg-gradient-to-tr from-violet-500 to-pink-500">
          {values[2]}
          {`>`}
        </span>
      </div>
      <div className="w-full h-[0px] border-t border-t-border" />
      <div className={`${bgClass} px-4 py-2`}>
        <span className="block px-4 font-bold text-2xl text-center">
          {result}
        </span>
        <span className="block text-center font-medium -mt-1">{label}</span>
      </div>
    </div>
  )
}
