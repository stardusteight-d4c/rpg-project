import React from "react"

export const CallOfCthulhu = () => {
  // Atributos típicos de Call of Cthulhu
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

  // Habilidades comuns
  const skills = [
    { name: "Accounting", value: 5 },
    { name: "Anthropology", value: 1 },
    { name: "Appraise", value: 5 },
    { name: "Archaeology", value: 1 },
    { name: "Charm", value: 15 },
    { name: "Climb", value: 20 },
    { name: "Credit Rating", value: 0 },
    { name: "Cthulhu Mythos", value: 0 },
    { name: "Disguise", value: 5 },
    { name: "Dodge", value: "half DEX" },
    { name: "Drive Auto", value: 20 },
    { name: "Elec Repair", value: 10 },
    { name: "Fast Talk", value: 5 },
    { name: "Fighting(Brawl)", value: 25 },
    { name: "Firearms(HG)", value: 20 },
    { name: "Firearms(R/S)", value: 25 },
    { name: "First Aid", value: 30 },
    { name: "History", value: 5 },
    { name: "Intimidate", value: 15 },
    { name: "Jump", value: 20 },
    { name: "Language(Own)", value: "EDU" },
    { name: "Law", value: 5 },
    { name: "Library Use", value: 20 },
    { name: "Listen", value: 20 },
    { name: "Locksmith", value: 1 },
    { name: "Mech Repair", value: 10 },
    { name: "Medicine", value: 1 },
    { name: "Natural World", value: 10 },
    { name: "Navigate", value: 10 },
    { name: "Occult", value: 5 },
    { name: "Op Hv Machine", value: 1 },
    { name: "Persuade", value: 10 },
    { name: "Psychoanalysis", value: 1 },
    { name: "Psychology", value: 10 },
    { name: "Ride", value: 5 },
    { name: "Sleight of Hand", value: 10 },
    { name: "Spot Hidden", value: 25 },
    { name: "Stealth", value: 20 },
    { name: "Swim", value: 20 },
    { name: "Throw", value: 20 },
    { name: "Track", value: 10 },
  ]

  return (
    <section className="p-2 h-screen overflow-y-scroll no-scrollbar">
      <div className="flex mb-4">
        <img
          src="https://imgcdn.stablediffusionweb.com/2024/10/24/23cb7d83-7cac-43f6-8ac8-84c9cd8475a6.jpg"
          alt="Imagem do Personagem"
          className="w-[200px] border border-border h-[200px] object-cover rounded mr-6"
        />
        <div className="w-full">
          <span className="block text-3xl font-bold background-gradient bg-clip-text text-transparent tracking-wider">
            Erwin Farwell
          </span>
          <p className="text-sm text-gray-400">
            Investigador em Call of Cthulhu
          </p>
        </div>
      </div>

      {/* Atributos */}
      <div className="mb-4 rounded p-2 border border-border bg-border/20">
        <h3 className="text-2xl flex items-center gap-x-2 font-semibold mb-2 background-gradient bg-clip-text text-transparent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0v94.37L90.73,98a8,8,0,0,1,10.07-.38l58.81,44.11L218.73,90a8,8,0,1,1,10.54,12l-64,56a8,8,0,0,1-10.07.38L96.39,114.29,40,163.63V200H224A8,8,0,0,1,232,208Z"></path>
          </svg>{" "}
          Atributos
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(attributes).map(([attribute, value]) => (
            <div
              key={attribute}
              className="flex border-b border-l  rounded-bl p-1 border-border justify-between"
            >
              <span className="font-medium capitalize">{attribute}</span>
              <span className="bg-gradient-to-tr from-border/50 to-transparent rounded-full block px-2">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Habilidades */}
      <div className="mb-4 rounded p-2 border border-border bg-border/20">
        <h3 className="text-2xl font-semibold mb-2 background-gradient bg-clip-text text-transparent">
          Habilidades
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="space-y-1 border-b border-l rounded-bl p-1 border-border"
            >
              <div className="flex justify-between">
                <span className="font-medium">{skill.name}</span>
                <span className="bg-gradient-to-tr from-border/50 to-transparent rounded-full  block px-2">
                  {typeof skill.value === "string"
                    ? skill.value
                    : `${skill.value}%`}
                </span>
              </div>
              {/* Barra de progresso representando a habilidade */}
              {typeof skill.value === "number" && (
                <div className="w-full bg-border overflow-hidden h-2 rounded-full">
                  <div
                    className="h-full background-gradient"
                    style={{ width: `${skill.value}%` }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sanidade */}
      <div className="mb-4 rounded p-2 border border-border bg-border/20">
        <h3 className="text-2xl font-semibold mb-2 background-gradient bg-clip-text text-transparent">
          Sanidade
        </h3>
        <div className="flex justify-between">
          <span className="font-medium">Sanidade Atual</span>
          <span>100</span> {/* Valor fictício, normalmente seria calculado */}
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Sanidade Máxima</span>
          <span>100</span> {/* Similar ao anterior */}
        </div>
      </div>

      {/* Equipamentos */}
      <div className="mb-4 rounded p-2 border border-border bg-border/20">
        <h3 className="text-2xl font-semibold mb-2 background-gradient bg-clip-text text-transparent">
          Equipamentos
        </h3>
        <ul className="list-disc pl-6">
          <li>Revólver</li>
          <li>Lanterna</li>
          <li>Kit de primeiros socorros</li>
        </ul>
      </div>

      {/* Notas e Observações */}
      <div className="mb-4 rounded p-2 border border-border bg-border/20">
        <h3 className="text-2xl font-semibold mb-2 background-gradient bg-clip-text text-transparent">
          Notas e Observações
        </h3>
        <textarea
          className="w-full h-32 p-2 border border-gray-300 rounded"
          placeholder="Escreva suas notas aqui..."
        />
      </div>
    </section>
  )
}
