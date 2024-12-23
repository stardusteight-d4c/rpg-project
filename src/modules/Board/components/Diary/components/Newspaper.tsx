import Image from "next/image"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"

export const Newspaper = () => {
  const test = ` A pequena cidade costeira de Innsmouth está em alvoroço após uma série de eventos inexplicáveis envolvendo um jogo de RPG de mesa online. Conhecido por evocar mistérios cósmicos e criaturas além da compreensão humana, Call of Cthulhu tornou-se o epicentro de uma narrativa que parece ultrapassar as barreiras entre ficção e realidade.

  Jogadores de uma sessão recente relataram fenômenos perturbadores: mensagens enigmáticas aparecendo no chat sem que ninguém as tivesse digitado, movimentos de peças no tabuleiro digital aparentemente por conta própria, e até mesmo sons inquietantes que ecoavam pelos fones de ouvido, mesmo quando o microfone de todos estava desligado.
  
  "Eu juro que vi um texto surgir no chat descrevendo um cenário horrível que nenhum de nós criou", disse Victor Reynolds, um dos jogadores. "Era como se algo ou alguém estivesse jogando conosco."
  
  O incidente ganhou ainda mais atenção quando o mestre do jogo, conhecido apenas como "Keeper", afirmou ter sentido uma "presença" em sua casa durante a sessão. "As luzes começaram a piscar, e eu ouvi sussurros vindos do corredor", relatou ele ao The Publisher. "Quando fui verificar, não havia ninguém."`

  return (
    <div className="w-[681px] relative">
      <div className="absolute tracking-tight top-[68px] pr-5 w-[530px] left-[80px] text-black text-3xl h-[82px] overflow-y-scroll font-bold">
        "A Assombração de Call of Cthulhu": Um Mistério Sobrenatural Intriga
        Investigadores
      </div>
      <div className="absolute top-[165px] markdown-context space-y-4 !text-black w-[330px] h-[280px] overflow-y-scroll pr-5 text-justify text-sm left-[80px]">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{test}</ReactMarkdown>
      </div>
      <img
        src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/b6e2a7112977895.601eac8484f94.jpg"
        alt=""
        className="w-[193px] select-none pointer-events-none h-[257px] absolute right-[73px] bottom-[56px]"
      />
      <Image
        src="/newspaper_i.png"
        width={1000}
        height={1000}
        quality={100}
        alt=""
        className="select-none pointer-events-none"
      />
    </div>
  )
}
