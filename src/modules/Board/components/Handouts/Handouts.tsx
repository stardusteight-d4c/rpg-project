"use client"

import { useState } from "react"
import { HandoutsDisplay, HandoutsEdit } from "./components"

export const Handouts = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [selectedHandout, setSelectedHandout] = useState<{
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
    type: "Note Type 01" | "Note Type 02" | "Newspaper" | "Letter"
    content: any
  } | null>(null)

  const handouts: Array<{
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
    type: "Note Type 01" | "Note Type 02" | "Newspaper" | "Letter"
    content: any
  }> = [
    {
      id: "salklasklklasas",
      name: "Blackwater Creek Map",
      type: "Newspaper",
      for: [],
      visibility: [],
      content: {
        title:
          '"A Assombração de Call of Cthulhu": Um Mistério Sobrenatural Intriga Investigadores',
        article: `A pequena cidade costeira de Innsmouth está em alvoroço após uma série de eventos inexplicáveis envolvendo um jogo de RPG de mesa online. Conhecido por evocar mistérios cósmicos e criaturas além da compreensão humana, Call of Cthulhu tornou-se o epicentro de uma narrativa que parece ultrapassar as barreiras entre ficção e realidade.

Jogadores de uma sessão recente relataram fenômenos perturbadores: mensagens enigmáticas aparecendo no chat sem que ninguém as tivesse digitado, movimentos de peças no tabuleiro digital aparentemente por conta própria, e até mesmo sons inquietantes que ecoavam pelos fones de ouvido, mesmo quando o microfone de todos estava desligado.
  
"Eu juro que vi um texto surgir no chat descrevendo um cenário horrível que nenhum de nós criou", disse Victor Reynolds, um dos jogadores. "Era como se algo ou alguém estivesse jogando conosco."
  
O incidente ganhou ainda mais atenção quando o mestre do jogo, conhecido apenas como "Keeper", afirmou ter sentido uma "presença" em sua casa durante a sessão. "As luzes começaram a piscar, e eu ouvi sussurros vindos do corredor", relatou ele ao The Publisher. "Quando fui verificar, não havia ninguém."`,
      },
    },
    {
      id: "sasdaasasasdds",
      name: "Carta secreta",
      for: [],
      visibility: [],
      type: "Note Type 02",
      content: {
        text: `A pequena cidade costeira de Innsmouth está em alvoroço após uma série de eventos inexplicáveis envolvendo um jogo de RPG de mesa online. Conhecido por evocar mistérios cósmicos e criaturas além da compreensão humana, Call of Cthulhu tornou-se o epicentro de uma narrativa que parece ultrapassar as barreiras entre ficção e realidade.

Jogadores de uma sessão recente relataram fenômenos perturbadores: mensagens enigmáticas aparecendo no chat sem que ninguém as tivesse digitado, movimentos de peças no tabuleiro digital aparentemente por conta própria, e até mesmo sons inquietantes que ecoavam pelos fones de ouvido, mesmo quando o microfone de todos estava desligado.
  
"Eu juro que vi um texto surgir no chat descrevendo um cenário horrível que nenhum de nós criou", disse Victor Reynolds, um dos jogadores. "Era como se algo ou alguém estivesse jogando conosco."
  
O incidente ganhou ainda mais atenção quando o mestre do jogo, conhecido apenas como "Keeper", afirmou ter sentido uma "presença" em sua casa durante a sessão. "As luzes começaram a piscar, e eu ouvi sussurros vindos do corredor", relatou ele ao The Publisher. "Quando fui verificar, não havia ninguém."`,
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
    type: "Note Type 01" | "Note Type 02" | "Newspaper" | "Letter"
    content: any
  }) {
    setIsEditMode(true)
    setSelectedHandout(handout)
  }

  if (!isEditMode)
    return (
      <HandoutsDisplay
        handouts={handouts}
        handleOnClickHandout={handleOnClickHandout}
      />
    )

  if (isEditMode && selectedHandout)
    return <HandoutsEdit handout={selectedHandout} onEdit={setIsEditMode} />
}
