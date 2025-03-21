"use client"

import { useState } from "react"
import { HandoutsCreate, HandoutsDisplay, HandoutsEdit } from "./components"

export const Handouts = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [isCreateMode, setIsCreateMode] = useState<boolean>(false)
  const [selectedHandout, setSelectedHandout] = useState<IHandout | null>(null)

  const handouts: Array<IHandout> = [
    {
      id: "salklasklklasas",
      name: "Blackwater Creek Map",
      for: [
        {
          id: "asdsaas",
          name: "Erwin Farwell",
        },
      ],
      visibility: [],
      content: {
        type: { name: "Newspaper Type 01", inputs: 2 },
        inputs: [
          '"A Assombração de Call of Cthulhu": Um Mistério Sobrenatural Intriga Investigadores',

          `A pequena cidade costeira de Innsmouth está em alvoroço após uma série de eventos inexplicáveis envolvendo um jogo de RPG de mesa online. Conhecido por evocar mistérios cósmicos e criaturas além da compreensão humana, Call of Cthulhu tornou-se o epicentro de uma narrativa que parece ultrapassar as barreiras entre ficção e realidade.
    
Jogadores de uma sessão recente relataram fenômenos perturbadores: mensagens enigmáticas aparecendo no chat sem que ninguém as tivesse digitado, movimentos de peças no tabuleiro digital aparentemente por conta própria, e até mesmo sons inquietantes que ecoavam pelos fones de ouvido, mesmo quando o microfone de todos estava desligado.
  
"Eu juro que vi um texto surgir no chat descrevendo um cenário horrível que nenhum de nós criou", disse Victor Reynolds, um dos jogadores. "Era como se algo ou alguém estivesse jogando conosco."
  
O incidente ganhou ainda mais atenção quando o mestre do jogo, conhecido apenas como "Keeper", afirmou ter sentido uma "presença" em sua casa durante a sessão. "As luzes começaram a piscar, e eu ouvi sussurros vindos do corredor", relatou ele ao The Publisher. "Quando fui verificar, não havia ninguém."`,
        ],
      },
    },
    {
      id: "sasdaasasasdds",
      name: "Carta secreta",
      for: [],
      visibility: [],
      content: {
        type: { name: "Letter Type 02", inputs: 1 },
        inputs: [
          `A pequena cidade costeira de Innsmouth está em alvoroço após uma série de eventos inexplicáveis envolvendo um jogo de RPG de mesa online. Conhecido por evocar mistérios cósmicos e criaturas além da compreensão humana, Call of Cthulhu tornou-se o epicentro de uma narrativa que parece ultrapassar as barreiras entre ficção e realidade.

Jogadores de uma sessão recente relataram fenômenos perturbadores: mensagens enigmáticas aparecendo no chat sem que ninguém as tivesse digitado, movimentos de peças no tabuleiro digital aparentemente por conta própria, e até mesmo sons inquietantes que ecoavam pelos fones de ouvido, mesmo quando o microfone de todos estava desligado.
  
"Eu juro que vi um texto surgir no chat descrevendo um cenário horrível que nenhum de nós criou", disse Victor Reynolds, um dos jogadores. "Era como se algo ou alguém estivesse jogando conosco."
  
O incidente ganhou ainda mais atenção quando o mestre do jogo, conhecido apenas como "Keeper", afirmou ter sentido uma "presença" em sua casa durante a sessão. "As luzes começaram a piscar, e eu ouvi sussurros vindos do corredor", relatou ele ao The Publisher. "Quando fui verificar, não havia ninguém."`,
        ],
      },
    },
  ]

  function handleOnClickHandout(handout: {
    id: string
    name: string
    for: Array<{
      id: string
      name: string
    }>
    visibility: Array<{
      id: string
      name: string
    }>
    content: any
  }) {
    setIsEditMode(true)
    setSelectedHandout(handout)
  }

  if (isCreateMode) return <HandoutsCreate onCreate={setIsCreateMode} />

  if (!isEditMode && !isCreateMode)
    return (
      <HandoutsDisplay
        handouts={handouts}
        onCreate={setIsCreateMode}
        handleOnClickHandout={handleOnClickHandout}
      />
    )

  if (isEditMode && selectedHandout && !isCreateMode)
    return <HandoutsEdit handout={selectedHandout} onEdit={setIsEditMode} />
}
