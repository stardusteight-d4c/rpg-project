interface SystemRollProps {
  diceQuantity: number
  diceType: number
  rolled: Array<number>
  total: number
}

export const SystemRoll = ({
  diceQuantity,
  diceType,
  rolled,
  total,
}: SystemRollProps) => {
  return (
    <div>
      <span className="text-gray-400">
        Rolling {diceQuantity}d{diceType}
      </span>
      {rolled.length > 1 && (
        <div className="grid w-full mb-2 grid-cols-4 xl:grid-cols-5 gap-2">
          {rolled.map((result, index) => (
            <div
              key={index}
              className="col-span-1 text-2xl text-white font-bold aspect-square select-none h-full w-full bg-ashes border border-border rounded-xl flex items-center justify-center text-center"
            >
              {result}
            </div>
          ))}
        </div>
      )}
      <div className="grid w-full mb-2 grid-cols-4 xl:grid-cols-5 gap-2">
        <div className="col-span-1 text-2xl text-white font-bold aspect-square select-none h-full w-full background-gradient rounded-xl flex items-center justify-center text-center">
          {total}
        </div>
      </div>
    </div>
  )
}
