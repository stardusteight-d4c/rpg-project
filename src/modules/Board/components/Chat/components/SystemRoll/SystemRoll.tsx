interface SystemRollProps {
  results: Array<number>
  diceType: number
}

export const SystemRoll = ({ results, diceType }: SystemRollProps) => {
  function sumArray(numbers: number[]): number {
    return numbers.reduce((acc, num) => acc + num, 0)
  }

  return (
    <div>
      <span className="text-gray-400">
        Rolling {results.length}d{diceType}
      </span>
      {results.length > 1 && (
        <div className="grid w-full mb-2 grid-cols-4 xl:grid-cols-5 gap-2">
          {results.map((result, index) => (
            <div
              key={index}
              className="col-span-1 text-2xl text-white font-bold aspect-square select-none h-full w-full bg-border rounded-2xl flex items-center justify-center text-center"
            >
              {result}
            </div>
          ))}
        </div>
      )}
      <div className="grid w-full mb-2 grid-cols-4 xl:grid-cols-5 gap-2">
        <div className="col-span-1 text-2xl text-white font-bold aspect-square select-none h-full w-full background-gradient rounded-2xl flex items-center justify-center text-center">
          {sumArray(results)}
        </div>
      </div>
    </div>
  )
}
