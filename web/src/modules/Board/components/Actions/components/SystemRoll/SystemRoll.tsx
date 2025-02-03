interface SystemRollProps {
  dice_quantity: number
  dice_type: number
  rolled: Array<number>
  total: number
}

export const SystemRoll = ({
  dice_quantity,
  dice_type,
  rolled,
  total,
}: SystemRollProps) => {
  return (
    <div>
      <span className="text-gray-400">
        Rolling {dice_quantity}d{dice_type}
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
