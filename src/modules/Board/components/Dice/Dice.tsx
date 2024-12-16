"use client"

import { useState } from "react"

export const Dice: React.FC = () => {
  const [mode, setMode] = useState<"character" | "system" | null>(null);
  const [selectedType, setSelectedType] = useState<"attributes" | "status" | "skills" | "combat" | null>(null);
  const [diceType, setDiceType] = useState<number>(6);
  const [numDice, setNumDice] = useState<number>(1);
  const [results, setResults] = useState<number[]>([]);

  // Função para rolar os dados
  const rollDice = (sides: number, quantity: number) => {
    const rolls = Array.from({ length: quantity }, () => Math.floor(Math.random() * sides) + 1);
    setResults(rolls);
  };

  const attributes = {
    strength: 50,
    dexterity: 60,
    intelligence: 70,
    power: 65,
    constitution: 55,
    appearance: 60,
    size: 50,
    education: 70,
  }

  const status = {
    hitPoints: 75,
    magicPoints: 42,
    sanity: 22,
  }


  // Habilidades comuns
  const skills = [
    { name: "Accounting", baseValue: 5, currentValue: 50},
    { name: "Anthropology", baseValue: 1, currentValue: 50},
    { name: "Appraise", baseValue: 5, currentValue: 50},
    { name: "Archaeology", baseValue: 1, currentValue: 50},
    { name: "Charm", baseValue: 15, currentValue: 50},
    { name: "Climb", baseValue: 20, currentValue: 50},
    { name: "Credit Rating", baseValue: 0, currentValue: 50},
    { name: "Cthulhu Mythos", baseValue: 0, currentValue: 50},
    { name: "Disguise", baseValue: 5, currentValue: 50},
    { name: "Dodge", baseValue: "half DEX",  currentValue: 50},
    { name: "Drive Auto", baseValue: 20, currentValue: 50},
    { name: "Elec Repair", baseValue: 10, currentValue: 50},
    { name: "Fast Talk", baseValue: 5, currentValue: 50},
    { name: "Fighting(Brawl)", baseValue: 25, currentValue: 50},
    { name: "Firearms(HG)", baseValue: 20, currentValue: 50},
    { name: "Firearms(R/S)", baseValue: 25, currentValue: 50},
    { name: "First Aid", baseValue: 30, currentValue: 50},
    { name: "History", baseValue: 5, currentValue: 50},
    { name: "Intimidate", baseValue: 15, currentValue: 50},
    { name: "Jump", baseValue: 20, currentValue: 50},
    { name: "Language(Own)", baseValue: "EDU", currentValue: 50},
    { name: "Law", baseValue: 5, currentValue: 50},
    { name: "Library Use", baseValue: 20, currentValue: 50},
    { name: "Listen", baseValue: 20, currentValue: 50},
    { name: "Locksmith", baseValue: 1, currentValue: 50},
    { name: "Luck", baseValue: 65, currentValue: 50},
    { name: "Mech Repair", baseValue: 10, currentValue: 50},
    { name: "Medicine", baseValue: 1, currentValue: 50},
    { name: "Natural World", baseValue: 10, currentValue: 50},
    { name: "Navigate", baseValue: 10, currentValue: 50},
    { name: "Occult", baseValue: 5, currentValue: 50},
    { name: "Op Hv Machine", baseValue: 1, currentValue: 50},
    { name: "Persuade", baseValue: 10, currentValue: 50},
    { name: "Psychoanalysis", baseValue: 1, currentValue: 50},
    { name: "Psychology", baseValue: 10, currentValue: 50},
    { name: "Ride", baseValue: 5, currentValue: 50},
    { name: "Sleight of Hand", baseValue: 10, currentValue: 50},
    { name: "Spot Hidden", baseValue: 25, currentValue: 50},
    { name: "Stealth", baseValue: 20, currentValue: 50},
    { name: "Swim", baseValue: 20, currentValue: 50},
    { name: "Throw", baseValue: 20, currentValue: 50},
    { name: "Track", baseValue: 10, currentValue: 50},
  ]

  return (
    <section className="p-4 flex flex-col gap-4">
      <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Rolling
      </h3>

      {/* Escolha entre Character Rolling e System Rolling */}
      {mode === null && (
        <div className="flex flex-col gap-4">
          <button
            className="py-1 px-4 w-fit bg-border text-white rounded border-border border"
            onClick={() => setMode("character")}
          >
             Rolling
          </button>
          <button
            className="py-2 px-4 bg-purple-500 text-white rounded-md"
            onClick={() => setMode("system")}
          >
            System Rolling
          </button>
        </div>
      )}

      {/* Character Rolling */}
      {mode === "character" && (
        <div className="flex flex-col gap-4">
          <h4 className="text-xl font-semibold">Choose a Type:</h4>
          <div className="flex gap-2">
            <button
              className="py-2 px-4 bg-blue-500 text-white rounded-md"
              onClick={() => setSelectedType("attributes")}
            >
              Attributes
            </button>
            <button
              className="py-2 px-4 bg-green-500 text-white rounded-md"
              onClick={() => setSelectedType("status")}
            >
              Status
            </button>
            <button
              className="py-2 px-4 bg-purple-500 text-white rounded-md"
              onClick={() => setSelectedType("skills")}
            >
              Skills
            </button>
            <button
              className="py-2 px-4 bg-red-500 text-white rounded-md"
              onClick={() => setSelectedType("combat")}
            >
              Combat
            </button>
          </div>

          {selectedType === "attributes" && (
            <div>
              <h4 className="font-medium">Attributes:</h4>
              <ul>
                {Object.entries(attributes).map(([key, value]) => (
                  <li key={key} className="py-1">
                    {key}: {value}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedType === "status" && (
            <div>
              <h4 className="font-medium">Status:</h4>
              <ul>
                {Object.entries(status).map(([key, value]) => (
                  <li key={key} className="py-1">
                    {key}: {value}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedType === "skills" && (
            <div>
              <h4 className="font-medium">Skills:</h4>
              <ul>
                {skills.map((skill) => (
                  <li key={skill.name} className="py-1">
                    {skill.name}: {skill.currentValue}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* System Rolling */}
      {mode === "system" && (
        <div className="flex flex-col gap-4">
          <h4 className="text-xl font-semibold">System Rolling</h4>
          <div className="flex items-center gap-4">
            <label className="flex flex-col">
              Dice Type:
              <select
                className="mt-1 p-2 border rounded-md"
                value={diceType}
                onChange={(e) => setDiceType(Number(e.target.value))}
              >
                {[4, 6, 8, 10, 12, 20, 100].map((type) => (
                  <option key={type} value={type}>
                    D{type}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col">
              Number of Dice:
              <input
                type="number"
                className="mt-1 p-2 border rounded-md"
                value={numDice}
                onChange={(e) => setNumDice(Math.max(1, Math.min(10, Number(e.target.value))))}
              />
            </label>
          </div>

          <button
            className="py-2 px-4 bg-blue-500 text-white rounded-md"
            onClick={() => rollDice(diceType, numDice)}
          >
            Roll Dice
          </button>

          {results.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold">Results:</h4>
              <p>{results.join(", ")}</p>
            </div>
          )}
        </div>
      )}

      {/* Reset Button */}
      {mode !== null && (
        <button
          className="py-2 px-4 bg-gray-500 text-white rounded-md"
          onClick={() => {
            setMode(null);
            setSelectedType(null);
            setResults([]);
          }}
        >
          Reset
        </button>
      )}
    </section>
  )
}

