import { CharactersCreate } from "@/modules/Table/components/Characters/components/CharactersCreate"
import { ModalWrapper } from "@/shared/components"
import { useState } from "react"

export const Sheets = () => {
  const [openModal, setOpenModal] = useState<"open" | "close">("close")

  return (
    <div className="mt-10">
      <ModalWrapper
        showCloseIcon={false}
        status={openModal}
        onStatusChange={setOpenModal}
      >
        <CharactersCreate isModal />
      </ModalWrapper>
      <h2 className="text-4xl pointer-events-none font-bold mb-2 background-gradient text-transparent bg-clip-text">
        Sheets
      </h2>
      <div className="grid grid-cols-12 w-full gap-2">
        {[
          "https://imgcdn.stablediffusionweb.com/2024/10/24/23cb7d83-7cac-43f6-8ac8-84c9cd8475a6.jpg",
          "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/302654499/original/5b4c73a54ca1d9a773ce0b63c79b2156a1d86891/create-ai-art-for-your-character-design-or-any-other-project.png",
          "https://images.nightcafe.studio/jobs/Sw1lrSQg22aRIzYVXhDO/Sw1lrSQg22aRIzYVXhDO--1--ljjvv.jpg",
        ].map((item, index) => (
          <div key={index} className="col-span-1">
            <img
              src={item}
              alt=""
              className="rounded-full w-full h-[99px] cursor-pointer overflow-hidden aspect-square"
            />
          </div>
        ))}
        {Array.from({ length: 24 - 3 }).map((_, index) => (
          <>
            {index === 0 ? (
              <div
                key={index}
                onClick={() => setOpenModal("open")}
                className="col-span-1 cursor-pointer hover:brightness-150 flex items-center justify-center h-[99px] bg-border/80 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="52"
                  height="52"
                  fill="#9ca3af"
                  viewBox="0 0 256 256"
                >
                  <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
                </svg>
              </div>
            ) : (
              <div
                key={index}
                className="col-span-1 h-[99px] bg-border/80 rounded-full"
              />
            )}
          </>
        ))}
      </div>
    </div>
  )
}
