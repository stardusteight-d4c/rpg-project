import ReactMarkdown from "react-markdown"

interface BackstoryProps {
  activeItems: (
    | "attributes"
    | "skills"
    | "inventory"
    | "combat"
    | "backstory"
    | null
  )[]
  toggleItem: (
    item: "attributes" | "skills" | "inventory" | "combat" | "backstory"
  ) => void
}

export const Backstory = ({ activeItems, toggleItem }: BackstoryProps) => {
  const backstory = `
  **Nome:** Lyra Valtharion  
  **Classe:** Guerreira  
  **Raça:** Elfa  
  **Idade:** 128 anos (jovem para os padrões élficos)  
  **Equipamento:** Espada longa ancestral, armadura prateada ornamentada com símbolos lunares, capa azul-acinzentada.  
  **Aparência:** Alta e esguia, com traços nobres, olhos prateados e cabelos acinzentados que brilham como seda à luz do luar.  
  
  ---
  
  ### **História**
  
  Lyra nasceu no coração de **Silverglade**, um reino élfico isolado e protegido por florestas encantadas. Desde cedo, ela mostrou uma afinidade incomum com a espada, um talento que chamou a atenção dos Sentinelas Lunares, uma ordem de elite que defendia o reino contra ameaças externas. Embora os elfos de Silverglade preferissem o arco e a magia, Lyra sentia-se mais conectada à força e à elegância do combate corpo a corpo, acreditando que a espada era a extensão mais pura da alma de um guerreiro.
  
  **O Chamado da Guerra:**  
  Quando Lyra tinha apenas 90 anos, um ataque surpresa de invasores humanos rompeu a paz secular de Silverglade. Lyra lutou ao lado dos Sentinelas Lunares, mas a batalha terminou em tragédia. Seu mentor e amigo, o Capitão Elyndor, foi morto protegendo-a. Antes de morrer, ele entregou a Lyra sua espada ancestral, **Auriel**, dizendo:  
  *"Essa lâmina não é apenas para matar. Ela é uma promessa de que nossos valores jamais serão esquecidos."*  
  
  **A Jornada Solitária:**  
  Após a batalha, Lyra sentiu-se consumida pela culpa e decidiu partir em exílio voluntário, jurando aprimorar suas habilidades e buscar justiça para os caídos. Durante sua jornada, Lyra enfrentou criaturas sombrias, explorou ruínas esquecidas e desvendou segredos antigos que conectavam seu povo às forças do cosmos. Sua armadura prateada, forjada pelos mestres artífices de Silverglade, tornou-se um símbolo de esperança e luz para aqueles que a encontravam.  
  
  **O Retorno e o Destino:**  
  Lyra descobriu que os invasores estavam ligados a um império humano corrupto que desejava usar a magia élfica para conquistar o mundo. Determinada a proteger seu lar e expor a verdade, ela retornou a Silverglade, não como uma simples guerreira, mas como uma heroína marcada por suas cicatrizes e pelo brilho inabalável de sua determinação.  
  
  **Personalidade:**  
  Lyra é determinada, séria e movida por um profundo senso de justiça. Embora possa parecer reservada, ela demonstra grande empatia por aqueles que sofrem injustiças. Sua experiência com perda e sacrifício a tornou sábia e estratégica, sempre priorizando o bem maior.  
  
  **Habilidades Notáveis:**  
  - **Golpe Lunar:** Um ataque devastador que canaliza energia prateada de sua espada, inspirado nas fases da lua.  
  - **Defesa Celestial:** Sua armadura pode refletir ataques mágicos de menor intensidade.  
  - **Liderança Inspiradora:** Lyra tem o dom de motivar aliados, despertando coragem até nos momentos mais sombrios.  
  
  Agora, Lyra percorre o mundo, lutando não apenas por Silverglade, mas por todos aqueles que não podem se defender sozinhos. Sua espada brilha como uma estrela cadente no campo de batalha, e sua lenda continua a crescer.
    `

  return (
    <div className="mb-4 rounded border border-border">
      <div
        onClick={() => toggleItem("backstory")}
        className="flex p-2 cursor-pointer items-center justify-between sticky top-[49px] z-[100] shadow-sm shadow-black/50 bg-[#0e0e0e]"
      >
        <h3 className="text-2xl flex items-center gap-x-2 font-semibold">
          <span className="p-2 rounded">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28.9562 24.3187L24.8075 4.59366C24.7538 4.33572 24.6497 4.09091 24.5012 3.87331C24.3526 3.65572 24.1626 3.46962 23.9419 3.3257C23.7212 3.18179 23.4742 3.0829 23.2152 3.03471C22.9562 2.98652 22.6902 2.98999 22.4325 3.04491L16.5812 4.30241C16.0637 4.41574 15.6118 4.72883 15.3239 5.17359C15.036 5.61836 14.9353 6.15881 15.0437 6.67741L19.1925 26.4024C19.285 26.8524 19.5295 27.2569 19.8851 27.5478C20.2407 27.8388 20.6856 27.9984 21.145 27.9999C21.287 27.9997 21.4286 27.9846 21.5675 27.9549L27.4188 26.6974C27.9369 26.5838 28.3893 26.2701 28.6772 25.8246C28.9652 25.379 29.0655 24.8378 28.9562 24.3187ZM17 6.26866C17 6.26116 17 6.25741 17 6.25741L22.85 5.00741L23.2663 6.99116L17.4163 8.24991L17 6.26866ZM17.8275 10.2024L23.68 8.94616L24.0975 10.9337L18.25 12.1912L17.8275 10.2024ZM18.6575 14.1487L24.51 12.8912L26.1725 20.7962L20.32 22.0537L18.6575 14.1487ZM27 24.7424L21.15 25.9924L20.7337 24.0087L26.5837 22.7499L27 24.7312C27 24.7387 27 24.7424 27 24.7424ZM13 3.99991H7C6.46957 3.99991 5.96086 4.21063 5.58579 4.5857C5.21071 4.96077 5 5.46948 5 5.99991V25.9999C5 26.5303 5.21071 27.0391 5.58579 27.4141C5.96086 27.7892 6.46957 27.9999 7 27.9999H13C13.5304 27.9999 14.0391 27.7892 14.4142 27.4141C14.7893 27.0391 15 26.5303 15 25.9999V5.99991C15 5.46948 14.7893 4.96077 14.4142 4.5857C14.0391 4.21063 13.5304 3.99991 13 3.99991ZM7 5.99991H13V7.99991H7V5.99991ZM7 9.99991H13V21.9999H7V9.99991ZM13 25.9999H7V23.9999H13V25.9999Z"
                fill="url(#paint0_linear_59_11)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_59_11"
                  x1="16.9997"
                  y1="3.00098"
                  x2="16.9997"
                  y2="27.9999"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#42D392" />
                  <stop offset="1" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="background-gradient bg-clip-text text-transparent">
            Backstory
          </span>
        </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#cccccc80"
          viewBox="0 0 256 256"
          className={`${
            activeItems.includes("backstory") ? "rotate-180" : "rotate-0"
          } transition-all duration-300 ease-in-out`}
        >
          <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
        </svg>
      </div>
      {activeItems.includes("backstory") && (
        <div className="p-2 space-y-4 text-base">
          <ReactMarkdown>{backstory}</ReactMarkdown>
        </div>
      )}
    </div>
  )
}
