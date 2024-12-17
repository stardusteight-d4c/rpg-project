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
        <div className="grid mb-2 grid-cols-5 gap-2">
          {results.map((result, index) => (
            <div
              key={index}
              className="col-span-1 text-lg select-none w-[48px] h-[48px] bg-border rounded flex items-center justify-center text-center"
            >
              {result}
            </div>
          ))}
        </div>
      )}
      <div className="select-none text-lg w-[48px] h-[48px] background-gradient rounded flex items-center justify-center text-center">
        {sumArray(results)}
      </div>
    </div>
  )
}
