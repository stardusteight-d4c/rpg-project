"use client"

import { ModalWrapper } from "@/shared/components"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { Newspaper } from "./components/Newspaper"
import { Letter } from "./components/Letter"
import { useState } from "react"
import { HandoutModalWrapper } from "./components/HandoutModalWrapper"

export const Diary = () => {
  const [modalState, setModalState] = useState<"close" | "open">("open")

  function handleOpenModal(value: "open" | "close") {
    setModalState(value)
  }

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

  const test = `
  Escrevo estas palavras com a mão trêmula e o coração pesado, pois temo que este possa ser meu último registro. As areias do deserto têm guardado segredos além da compreensão humana, e creio ter me deparado com algo que nunca deveria ter sido desenterrado.
  
  Jonathan Marsh
  (Arqueólogo e explorador ao serviço do Museu de Antiguidades de Londres)`

  return (
    <section className="h-screen overflow-x-hidden no-scrollbar overflow-y-scroll">
      <ul>
        {/* {handoutsCategories.map((category, index) => (
          <li>{category}</li>
        ))} */}

        <HandoutModalWrapper
          onStatusChange={handleOpenModal}
          status={modalState}
          showCloseIcon={false}
        >
          {/* <Newspaper /> */}
          {/* <Letter /> */}
            
        <div className="w-[681px] relative">
          <div className="absolute !font-delius font-medium text-xl w-[480px] !italic space-y-4 markdown-context text-black top-[50px] left-[50px] ">

            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{test}</ReactMarkdown>
          </div>
          <Image
            src="/note_m_with_shadow.png"
            width={1000}
            height={1000}
            quality={100}
            alt=""
            className="select-none pointer-events-none"
          />
        </div>
        </HandoutModalWrapper>
      
      </ul>
    </section>
  )
}
