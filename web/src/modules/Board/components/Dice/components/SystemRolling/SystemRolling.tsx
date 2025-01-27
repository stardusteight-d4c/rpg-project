import { useState } from "react"

interface SystemRollingProps {
  mode: "system" | "character" | null
}

export const SystemRolling = ({ mode }: SystemRollingProps) => {
  if (mode !== "system") return null
  
  const [numDice, setNumDice] = useState<number>(1)
  const [results, setResults] = useState<number[]>([])
  const [diceType, setDiceType] = useState<number>(6)

  function handleDiceType() {
    const diceTypes = [4, 6, 8, 10, 12, 20, 100]
    const currentIndex = diceTypes.findIndex((dice) => dice === diceType)
    const nextIndex = (currentIndex + 1) % diceTypes.length
    setDiceType(diceTypes[nextIndex])
  }

  const rollDice = (sides: number, quantity: number) => {
    const rolls = Array.from(
      { length: quantity },
      () => Math.floor(Math.random() * sides) + 1
    )
    setResults(rolls)
  }

  return (
    <div className="flex flex-col gap-4 select-none">
      <h4 className="text-xl font-semibold">System Rolling</h4>
      <div className="flex items-start gap-4">
        <div className="flex flex-col gap-y-1">
          <span className="text-sm text-gray-400 block">Number of Dices</span>
          <div className="grid-cols-5 grid gap-2">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                onClick={() => setNumDice(index + 1)}
                key={index}
                className={`${
                  numDice === index + 1 && "background-gradient"
                } col-span-1 text-lg hover:brightness-125 cursor-pointer select-none w-[48px] h-[48px] bg-border rounded-xl flex items-center justify-center text-center`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-y-1">
          <span className="text-sm text-gray-400 block">Dice Type</span>
          <div
            onClick={() => handleDiceType()}
            className="w-[48px] h-[48px] text-lg select-none active:scale-90 transition-all duration-200 ease-in-out cursor-pointer background-gradient rounded-xl flex items-center justify-center text-center"
          >
            d{diceType}
          </div>
        </div>
      </div>
      {results.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold">Results:</h4>
          <p>{results.join(", ")}</p>
        </div>
      )}
      <button
        className="p-2 -mb-2 font-medium w-full text-center text-lg background-gradient hover:brightness-125 text-white rounded-xl border-border border"
        onClick={() => rollDice(diceType, numDice)}
      >
        Roll Dice
      </button>
    </div>
  )
}
