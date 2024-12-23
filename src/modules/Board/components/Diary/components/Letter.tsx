import Image from "next/image"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"

export const Letter = () => {
  const test = `
  Querida Eleanor,
  
  Escrevo estas palavras com a mão trêmula e o coração pesado, pois temo que este possa ser meu último registro. As areias do deserto têm guardado segredos além da compreensão humana, e creio ter me deparado com algo que nunca deveria ter sido desenterrado.
  
  Os hieróglifos nas câmaras que exploramos falam de um "Guardião", uma entidade antiga encarregada de proteger o que chamam de "Coração da Eternidade". No início, pensei que fosse apenas mais uma lenda, um conto criado por mentes supersticiosas. Mas esta noite, algo aconteceu que abalou minha descrença.
  
  Ouvi vozes, Eleanor. Vozes que ecoavam pelas paredes de pedra, sussurrando em línguas que não reconheço. Meu assistente, Charles, desapareceu após insistir em abrir uma porta lacrada há milênios. Encontrei apenas suas ferramentas, ainda quentes, como se ele tivesse se desintegrado no ar.
  
  Agora, estou sozinho. O vento que antes era apenas um alívio no calor do deserto parece carregar uma presença. Minhas lâmpadas oscilam, como se algo ou alguém estivesse respirando ao meu redor. As sombras dançam, mas não há fogo próximo.
  
  Envio esta carta pelo carregador que retornará à cidade pela manhã. Se eu não estiver entre os que voltam, quero que saiba que sempre amei você. E que fiz isso, esta jornada perigosa e insana, para trazer glória e respostas ao mundo.
  
  Mas Eleanor, se encontrarem este lugar, peço que fechem as portas novamente. Há coisas que a humanidade não foi feita para compreender, forças que não podemos domar.
  
  Com todo o amor e saudade,
  Jonathan Marsh
  (Arqueólogo e explorador ao serviço do Museu de Antiguidades de Londres)`

  return (
    <div className="w-[681px] relative">
      <div className="absolute h-[975px] overflow-y-scroll w-[635px] px-5 py-4 space-y-4 markdown-context text-lg text-black left-8 top-4">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{test}</ReactMarkdown>
      </div>
      <Image
        src="/letter_a_with_shadow.png"
        width={1000}
        height={1000}
        quality={100}
        alt=""
        className="select-none pointer-events-none"
      />
    </div>
  )
}
