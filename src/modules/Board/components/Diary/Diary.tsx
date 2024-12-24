"use client"

import { ModalWrapper } from "@/shared/components"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { useState } from "react"
import { HandoutModalWrapper } from "./components/HandoutModalWrapper"
import { HandoutDisplay } from "./components/HandoutDisplay"

export const Diary = () => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [showHandout, setShowHandout] = useState<{
    id: string
    name: string
    type: "Note Type 01" | "Note Type 02" | "Newspaper" | "Letter"
    content: any
  } | null>(null)

  const handouts = [
    {
      id: "salklasklklasas",
      name: "Blackwater Creek Map",
      type: "Newspaper",
      for: [],
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
      for: [
        {
          id: "alsmdlsamdslamds",
          name: "Gabriel Sena",
          username: "#stardusteight",
          avatarUrl: "https://avatars.githubusercontent.com/u/87643260?v=4",
        },
      ],
      type: "Note Type 02",
      content: {
        text: `A pequena cidade costeira de Innsmouth está em alvoroço após uma série de eventos inexplicáveis envolvendo um jogo de RPG de mesa online. Conhecido por evocar mistérios cósmicos e criaturas além da compreensão humana, Call of Cthulhu tornou-se o epicentro de uma narrativa que parece ultrapassar as barreiras entre ficção e realidade.

Jogadores de uma sessão recente relataram fenômenos perturbadores: mensagens enigmáticas aparecendo no chat sem que ninguém as tivesse digitado, movimentos de peças no tabuleiro digital aparentemente por conta própria, e até mesmo sons inquietantes que ecoavam pelos fones de ouvido, mesmo quando o microfone de todos estava desligado.
  
"Eu juro que vi um texto surgir no chat descrevendo um cenário horrível que nenhum de nós criou", disse Victor Reynolds, um dos jogadores. "Era como se algo ou alguém estivesse jogando conosco."
  
O incidente ganhou ainda mais atenção quando o mestre do jogo, conhecido apenas como "Keeper", afirmou ter sentido uma "presença" em sua casa durante a sessão. "As luzes começaram a piscar, e eu ouvi sussurros vindos do corredor", relatou ele ao The Publisher. "Quando fui verificar, não havia ninguém."`,
      },
    },
  ]

  const handoutsCategories = [
    "Letters",
    "Notes",
    "Newspapers",
    "Books",
    "Passports",
    "Postcards",
    "Magazines",
    "Telegrams",
    "Certificates",
    "Bank check",
    "Reports/forms",
    "Ids",
    "Licenses",
    "Photos",
    "Tapes",
    "Wall writing",
    "Computer",
    "Tickets",
    "CCTV",
    "Film reel",
  ]

  function handleBack() {
    if (editMode) {
      setEditMode(false)
    } else if (showHandout && !editMode) {
      setShowHandout(null)
    }
  }

  return (
    <section className="relative h-screen overflow-y-scroll no-scrollbar">
      <div className="sticky border-b border-border  shadow-sm shadow-black/50 z-50 top-0 p-2 w-full inset-x-0 bg-background">
        <div className="flex items-center gap-x-4">
          {!showHandout && (
            <div
              // onClick={() => setCreateMode(true)}
              className="flex cursor-pointer items-center group w-fit gap-x-2"
            >
              <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full  shadow-md shadow-black/50 group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#FFFFFF"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path>
                </svg>
              </button>
              <span>Create Handout</span>
            </div>
          )}
          {showHandout && (
            <div
              onClick={handleBack}
              className="cursor-pointer w-fit flex items-center group gap-x-2"
            >
              <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#FFFFFF"
                  viewBox="0 0 256 256"
                >
                  <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
                </svg>
              </button>
              <span>Back</span>
            </div>
          )}
          {showHandout && (
            <div
              onClick={() => setEditMode(true)}
              className="flex cursor-pointer items-center group w-fit gap-x-2"
            >
              <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full  shadow-md shadow-black/50 group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#FFFFFF"
                  viewBox="0 0 256 256"
                >
                  <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.69,147.32,64l24-24L216,84.69Z"></path>
                </svg>
              </button>
              <span>Update Handout</span>
            </div>
          )}
        </div>
      </div>

      {editMode && showHandout && (
        <div>
         Não implementado
        </div>
      )}

      {showHandout && !editMode ? (
        <div className="">
<div>
  <ul className="grid grid-cols-3 gap-2">
    <li className="col-span-1 bgbor7 rounded border border-border">
    Visible to 
    {/* 'todos' | 'lista de personagens' | 'invisivel' */}
    </li>
  </ul>
</div>
          <HandoutDisplay {...showHandout} />
        </div>
      ) : (
        <>
          {!editMode && (
            <div className="p-2">
              <ul className="flex items-center gap-x-2 flex-wrap">
                {handouts.map((handout) => (
                  <>
                    {handout.type && (
                      <li
                        key={handout.id}
                        onClick={() => setShowHandout(handout as any)}
                        className="p-2 w-fit cursor-pointer hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-sm bg-border/50 border border-dashed border-gray-400/20"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          fill="#CCCCCC50"
                          viewBox="0 0 256 256"
                        >
                          <path d="M88,112a8,8,0,0,1,8-8h80a8,8,0,0,1,0,16H96A8,8,0,0,1,88,112Zm8,40h80a8,8,0,0,0,0-16H96a8,8,0,0,0,0,16ZM232,64V184a24,24,0,0,1-24,24H32A24,24,0,0,1,8,184.11V88a8,8,0,0,1,16,0v96a8,8,0,0,0,16,0V64A16,16,0,0,1,56,48H216A16,16,0,0,1,232,64Zm-16,0H56V184a23.84,23.84,0,0,1-1.37,8H208a8,8,0,0,0,8-8Z"></path>
                        </svg>
                        <span>{handout.name}</span>
                      </li>
                    )}
                  </>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </section>
  )
}
