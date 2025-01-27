import { currentSession, matchUsers } from "../MatchUsers/mock-data"

export const characters: ICharacter[] = [
  {
    user: currentSession,
    infos: {
      id: "sdjaksjdksdjkadsjk",
      type: "enemy",
      visibility: false,
      name: "⍀⟟☌⊑⏁ ⋏⍜⍙",
      sex: "neuter" as "neuter",
      characterUrl:
        "https://images-ng.pixai.art/images/orig/d442fdc4-215a-48c0-bdec-5c69cdf2ee8e",
      occupation: "The Detonator of Worlds",
      hitPoints: 250,
      magicPoints: 250,
      sanity: 10,
      inspiration: false,
    },
    attributes: {
      strength: 100,
      dexterity: 100,
      intelligence: 90,
      power: 100,
      constitution: 80,
      appearance: 20,
      size: 100,
      education: 60,
      luck: 42,
    },
    combat: [
      {
        id: "askçsdadsçdças",
        name: "Unarmed",
        iconUrl: "/weapons/fist.svg",
        skill: "Fighting(Brawl)",
        range: "-",
        damage: "1d3",
        attacks: "1",
        description:
          "Combat using only your fists or other unarmed techniques. Effective in close quarters but limited in damage.",
        properties: [
          "Can be used by any character without requiring special equipment.",
          "Damage is low but does not rely on external items.",
        ],
      },
      {
        id: "sdçdslçldaçls",
        name: "Kriegsbeil",
        iconUrl: "/weapons/kriegsbeil.svg",
        skill: "Fighting(Brawl)",
        range: "2m",
        damage: "1d20 + STR",
        attacks: "1",
        description:
          "The Kriegsbeil is a war axe of Germanic origin, commonly associated with heavy blades and a robust shaft. This weapon was designed for powerful strikes, capable of breaking through armor or dealing significant damage, but is generally limited to close combat.",
        properties: [
          "Has a chance to knock down or disarm the opponent.",
          "Heavy and requires the use of both hands to maximize its impact.",
        ],
      },
    ],
    inventory: [
      { id: "asdasafssasafsa", name: "Cantil de Whisky" },
      { id: "saasasdaskçdsaç", name: "Carta achada na Caverna Sagrada" },
      {
        id: "salklasklklasas",
        name: "Blackwater Creek Map",
        for: [
          {
            id: "asdsaas",
            name: "Erwin Farwell",
          },
        ],
        visibility: [
          {
            id: "asdsaas",
            name: "Erwin Farwell",
          },
        ],
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
        for: [
          {
            id: "asdsaas",
            name: "Erwin Farwell",
          },
        ],
        visibility: [
          {
            id: "asdsaas",
            name: "Erwin Farwell",
          },
        ],
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
    ],
    backstory: `
  **Nome:** Lyra Valtharion  
  **Classe:** Guerreira  
  **Raça:** Elfa  
  **Idade:** 128 anos (jovem para os padrões élficos)  
  **Equipamento:** Espada longa ancestral, armadura prateada ornamentada com símbolos lunares, capa azul-acinzentada.  
  **Aparência:** Alta e esguia, com traços nobres, olhos prateados e cabelos acinzentados que brilham como seda à luz do luar.  
  
  ---
  
  # **História**
  
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
    `,
    skills: [
      {
        id: "saklsakdsalkdlska",
        name: "Accounting",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Anthropology",
        baseValue: 1,
        currentValue: 50,
        checked: true,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Appraise",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Archaeology",
        baseValue: 1,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Charm",
        baseValue: 15,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Climb",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Credit Rating",
        baseValue: 0,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Cthulhu Mythos",
        baseValue: 0,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Disguise",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Dodge",
        baseValue: "half DEX",
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Drive Auto",
        baseValue: 20,
        currentValue: 50,
        checked: true,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Elec Repair",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Fast Talk",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Fighting(Brawl)",
        baseValue: 25,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Firearms(HG)",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Firearms(R/S)",
        baseValue: 25,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "First Aid",
        baseValue: 30,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "History",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Intimidate",
        baseValue: 15,
        currentValue: 50,
        checked: true,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Jump",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Language(Own)",
        baseValue: "EDU",
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Law",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Library Use",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Listen",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Locksmith",
        baseValue: 1,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Luck",
        baseValue: 65,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Mech Repair",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Medicine",
        baseValue: 1,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Natural World",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Navigate",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Occult",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Op Hv Machine",
        baseValue: 1,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Persuade",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Psychoanalysis",
        baseValue: 1,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Psychology",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Ride",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Sleight of Hand",
        baseValue: 10,
        currentValue: 50,
        checked: true,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Spot Hidden",
        baseValue: 25,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Stealth",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Swim",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Throw",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Track",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
    ],
  },
  {
    user: currentSession,
    infos: {
      id: "ashdhsjahsjhsdj",
      type: "player",
      name: "Erwin Farwell",
      sex: "male" as "male",
      characterUrl:
        "https://imgcdn.stablediffusionweb.com/2024/10/24/23cb7d83-7cac-43f6-8ac8-84c9cd8475a6.jpg",
      occupation: "Journalist and Private Detective",
      hitPoints: 75,
      magicPoints: 42,
      sanity: 22,
      inspiration: true,
    },
    attributes: {
      strength: 50,
      dexterity: 60,
      intelligence: 70,
      power: 65,
      constitution: 55,
      appearance: 60,
      size: 50,
      education: 70,
      luck: 42,
    },
    combat: [
      {
        id: "askçsdadsçdças",
        name: "Unarmed",
        iconUrl: "/weapons/fist.svg",
        skill: "Fighting(Brawl)",
        range: "-",
        damage: "1d3",
        attacks: "1",
        description:
          "Combat using only your fists or other unarmed techniques. Effective in close quarters but limited in damage.",
        properties: [
          "Can be used by any character without requiring special equipment.",
          "Damage is low but does not rely on external items.",
        ],
      },
      {
        id: "sdçdslçldaçls",
        name: "Kriegsbeil",
        iconUrl: "/weapons/kriegsbeil.svg",
        skill: "Fighting(Brawl)",
        range: "2m",
        damage: "1d20 + STR",
        attacks: "1",
        description:
          "The Kriegsbeil is a war axe of Germanic origin, commonly associated with heavy blades and a robust shaft. This weapon was designed for powerful strikes, capable of breaking through armor or dealing significant damage, but is generally limited to close combat.",
        properties: [
          "Has a chance to knock down or disarm the opponent.",
          "Heavy and requires the use of both hands to maximize its impact.",
        ],
      },
    ],
    inventory: [
      { id: "asdasafssasafsa", name: "Cantil de Whisky" },
      { id: "saasasdaskçdsaç", name: "Carta achada na Caverna Sagrada" },
      {
        id: "salklasklklasas",
        name: "Blackwater Creek Map",
        for: [
          {
            id: "asdsaas",
            name: "Erwin Farwell",
          },
        ],
        visibility: [
          {
            id: "asdsaas",
            name: "Erwin Farwell",
          },
        ],
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
        for: [
          {
            id: "asdsaas",
            name: "Erwin Farwell",
          },
        ],
        visibility: [
          {
            id: "asdsaas",
            name: "Erwin Farwell",
          },
        ],
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
    ],
    backstory: `
  **Nome:** Lyra Valtharion  
  **Classe:** Guerreira  
  **Raça:** Elfa  
  **Idade:** 128 anos (jovem para os padrões élficos)  
  **Equipamento:** Espada longa ancestral, armadura prateada ornamentada com símbolos lunares, capa azul-acinzentada.  
  **Aparência:** Alta e esguia, com traços nobres, olhos prateados e cabelos acinzentados que brilham como seda à luz do luar.  
  
  ---
  
  # **História**
  
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
    `,
    skills: [
      {
        id: "saklsakdsalkdlska",
        name: "Accounting",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Anthropology",
        baseValue: 1,
        currentValue: 50,
        checked: true,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Appraise",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Archaeology",
        baseValue: 1,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Charm",
        baseValue: 15,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Climb",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Credit Rating",
        baseValue: 0,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Cthulhu Mythos",
        baseValue: 0,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Disguise",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Dodge",
        baseValue: "half DEX",
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Drive Auto",
        baseValue: 20,
        currentValue: 50,
        checked: true,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Elec Repair",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Fast Talk",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Fighting(Brawl)",
        baseValue: 25,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Firearms(HG)",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Firearms(R/S)",
        baseValue: 25,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "First Aid",
        baseValue: 30,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "History",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Intimidate",
        baseValue: 15,
        currentValue: 50,
        checked: true,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Jump",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Language(Own)",
        baseValue: "EDU",
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Law",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Library Use",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Listen",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Locksmith",
        baseValue: 1,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Luck",
        baseValue: 65,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Mech Repair",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Medicine",
        baseValue: 1,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Natural World",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Navigate",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Occult",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Op Hv Machine",
        baseValue: 1,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Persuade",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Psychoanalysis",
        baseValue: 1,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Psychology",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Ride",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Sleight of Hand",
        baseValue: 10,
        currentValue: 50,
        checked: true,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Spot Hidden",
        baseValue: 25,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Stealth",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Swim",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Throw",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Track",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
    ],
  },
  {
    user: currentSession,
    infos: {
      type: "npc",
      id: "asddssadsasa",
      visibility: true,
      name: "Hannah Pinkman",
      sex: "female" as "female",
      characterUrl:
        "https://images-ng.pixai.art/images/orig/1ecb2708-051b-4b9c-b379-f61a5a375155",
      occupation: "Journalist and Private Detective",
      hitPoints: 75,
      magicPoints: 42,
      sanity: 22,
      inspiration: true,
    },
    attributes: {
      strength: 50,
      dexterity: 60,
      intelligence: 70,
      power: 65,
      constitution: 55,
      appearance: 60,
      size: 50,
      education: 70,
      luck: 42,
    },
    combat: [
      {
        id: "askçsdadsçdças",
        name: "Unarmed",
        iconUrl: "/weapons/fist.svg",
        skill: "Fighting(Brawl)",
        range: "-",
        damage: "1d3",
        attacks: "1",
        description:
          "Combat using only your fists or other unarmed techniques. Effective in close quarters but limited in damage.",
        properties: [
          "Can be used by any character without requiring special equipment.",
          "Damage is low but does not rely on external items.",
        ],
      },
      {
        id: "sdçdslçldaçls",
        name: "Kriegsbeil",
        iconUrl: "/weapons/kriegsbeil.svg",
        skill: "Fighting(Brawl)",
        range: "2m",
        damage: "1d20 + STR",
        attacks: "1",
        description:
          "The Kriegsbeil is a war axe of Germanic origin, commonly associated with heavy blades and a robust shaft. This weapon was designed for powerful strikes, capable of breaking through armor or dealing significant damage, but is generally limited to close combat.",
        properties: [
          "Has a chance to knock down or disarm the opponent.",
          "Heavy and requires the use of both hands to maximize its impact.",
        ],
      },
    ],
    inventory: [
      { id: "asdasafssasafsa", name: "Cantil de Whisky" },
      { id: "saasasdaskçdsaç", name: "Carta achada na Caverna Sagrada" },
      {
        id: "salklasklklasas",
        name: "Blackwater Creek Map",
        for: [
          {
            id: "asddssadsasa",
            name: "Erwin Farwell",
          },
        ],
        visibility: [
          {
            id: "asdsaas",
            name: "Erwin Farwell",
          },
        ],
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
        for: [
          {
            id: "asdsaas",
            name: "Erwin Farwell",
          },
        ],
        visibility: [
          {
            id: "asdsaas",
            name: "Erwin Farwell",
          },
        ],
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
    ],
    backstory: `
**Nome:** Lyra Valtharion  
**Classe:** Guerreira  
**Raça:** Elfa  
**Idade:** 128 anos (jovem para os padrões élficos)  
**Equipamento:** Espada longa ancestral, armadura prateada ornamentada com símbolos lunares, capa azul-acinzentada.  
**Aparência:** Alta e esguia, com traços nobres, olhos prateados e cabelos acinzentados que brilham como seda à luz do luar.  

---

# **História**

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
  `,
    skills: [
      {
        id: "saklsakdsalkdlska",
        name: "Accounting",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Anthropology",
        baseValue: 1,
        currentValue: 50,
        checked: true,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Appraise",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Archaeology",
        baseValue: 1,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Charm",
        baseValue: 15,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Climb",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Credit Rating",
        baseValue: 0,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Cthulhu Mythos",
        baseValue: 0,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Disguise",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Dodge",
        baseValue: "half DEX",
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Drive Auto",
        baseValue: 20,
        currentValue: 50,
        checked: true,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Elec Repair",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Fast Talk",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Fighting(Brawl)",
        baseValue: 25,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Firearms(HG)",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Firearms(R/S)",
        baseValue: 25,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "First Aid",
        baseValue: 30,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "History",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Intimidate",
        baseValue: 15,
        currentValue: 50,
        checked: true,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Jump",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Language(Own)",
        baseValue: "EDU",
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Law",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Library Use",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Listen",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Locksmith",
        baseValue: 1,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Luck",
        baseValue: 65,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Mech Repair",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Medicine",
        baseValue: 1,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Natural World",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Navigate",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Occult",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Op Hv Machine",
        baseValue: 1,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Persuade",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Psychoanalysis",
        baseValue: 1,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Psychology",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Ride",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Sleight of Hand",
        baseValue: 10,
        currentValue: 50,
        checked: true,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Spot Hidden",
        baseValue: 25,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Stealth",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Swim",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Throw",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Track",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
    ],
  },
  {
    user: matchUsers[1],
    infos: {
      id: "asfafsafv",
      type: "player",
      name: "Erik Bjorn",
      sex: "male" as "male",
      characterUrl:
        "https://neural.love/cdn/thumbnails/1eed6701-3f10-66ae-a3ea-41b70a0743ac/eeb65884-de3b-5ffc-9982-79cfe16f394b.webp?Expires=1767225599&Signature=tnQgxe3HIRNHu4D532pE79A2nbqUhNwYrzKXOsl-ZX9uqsiDQY1orBDBv1pBmKVfHtCWwp9N31Q7wP4n2S~BKTJRHElZheN-DJU5Q3nHRIiXqvXdxKBYnD7ZH3Mcjl6n9RuxIy5YywbWqvTIs05HYX13SmDMOBx4sCaJvD4MBovknJ1OWL~1txwStM7fNnsyLKf8j857Kci1OLDKuDeJyRgKzQryixLSt-KB7lknK2tXGeAA~XW31yW9dbVhw0oeuXwhJAXYtezI9pcGaBHmm2sPtr3BMM7mJtkK-arna11zegqXaYVEeCsdRxQCwTHQUuApPYk0Kc6OHZ4eTnr42w__&Key-Pair-Id=K2RFTOXRBNSROX",
      occupation: "Journalist and Private Detective",
      hitPoints: 150,
      magicPoints: 0,
      sanity: 100,
      inspiration: false,
    },
    attributes: {
      strength: 50,
      dexterity: 60,
      intelligence: 70,
      power: 65,
      constitution: 55,
      appearance: 60,
      size: 50,
      education: 70,
      luck: 42,
    },
    combat: [
      {
        id: "askçsdadsçdças",
        name: "Unarmed",
        iconUrl: "/weapons/fist.svg",
        skill: "Fighting(Brawl)",
        range: "-",
        damage: "1d3",
        attacks: "1",
        description:
          "Combat using only your fists or other unarmed techniques. Effective in close quarters but limited in damage.",
        properties: [
          "Can be used by any character without requiring special equipment.",
          "Damage is low but does not rely on external items.",
        ],
      },
    ],
    inventory: [
      { id: "5as15sc1s5a", name: "Coquetel Molotov" },
      { id: "6a5cs6a56s5", name: "Chave Misteriosa do Louis Bar" },
      { id: "sa59s59sacs", name: "Página sobre a tribo Sicaiook" },
      {
        id: "akdldsaklds",
        name: "Mapa para buscar o Cu(bo)",
        upload:
          "https://wyrmlog.wyrmworld.com/wp-content/uploads/2019/05/mig.png",
        for: [
          {
            id: "asfafsafv",
            name: "Erik Bjorn",
          },
        ],
        visibility: [
          {
            id: "asdsaas",
            name: "Erwin Farwell",
          },
          {
            id: "asfafsafv",
            name: "Erik Bjorn",
          },
        ],
      },
    ],
    backstory: `
  **Nome:** Lyra Valtharion  
  **Classe:** Guerreira  
  **Raça:** Elfa  
  **Idade:** 128 anos (jovem para os padrões élficos)  
  **Equipamento:** Espada longa ancestral, armadura prateada ornamentada com símbolos lunares, capa azul-acinzentada.  
  **Aparência:** Alta e esguia, com traços nobres, olhos prateados e cabelos acinzentados que brilham como seda à luz do luar.  
  
  ---
  
  # **História**
  
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
    `,
    skills: [
      {
        id: "saklsakdsalkdlska",
        name: "Accounting",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Anthropology",
        baseValue: 1,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Appraise",
        baseValue: 5,
        currentValue: 50,
        checked: true,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Archaeology",
        baseValue: 1,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Charm",
        baseValue: 15,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Climb",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Credit Rating",
        baseValue: 0,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Cthulhu Mythos",
        baseValue: 0,
        currentValue: 50,
        checked: true,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Disguise",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Dodge",
        baseValue: "half DEX",
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Drive Auto",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Elec Repair",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Fast Talk",
        baseValue: 5,
        currentValue: 50,
        checked: true,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Fighting(Brawl)",
        baseValue: 25,
        currentValue: 50,
        checked: true,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Firearms(HG)",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Firearms(R/S)",
        baseValue: 25,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "First Aid",
        baseValue: 30,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "History",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Intimidate",
        baseValue: 15,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Jump",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Language(Own)",
        baseValue: "EDU",
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Law",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Library Use",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Listen",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Locksmith",
        baseValue: 1,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Luck",
        baseValue: 65,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Mech Repair",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Medicine",
        baseValue: 1,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Natural World",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Navigate",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Occult",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Op Hv Machine",
        baseValue: 1,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Persuade",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Psychoanalysis",
        baseValue: 1,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Psychology",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Ride",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Sleight of Hand",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Spot Hidden",
        baseValue: 25,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Stealth",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Swim",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Throw",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Track",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
    ],
  },
  {
    user: matchUsers[2],
    infos: {
      id: "aksalskals",
      type: "player",
      name: "Lizabeth White",
      sex: "female" as "female",
      characterUrl:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f2664fbe-b0bd-454c-bfe6-6e930a07fc49/dh1yf6m-9a50d508-4a14-4f63-9a0b-b4339f5d284a.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2YyNjY0ZmJlLWIwYmQtNDU0Yy1iZmU2LTZlOTMwYTA3ZmM0OVwvZGgxeWY2bS05YTUwZDUwOC00YTE0LTRmNjMtOWEwYi1iNDMzOWY1ZDI4NGEuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.VNORNfSflxfLfH0SH-r1mLEM8eyB8LsRfinCHZuP5Jc",
      occupation: "Journalist and Private Detective",
      hitPoints: 100,
      magicPoints: 12,
      sanity: 84,
      inspiration: true,
    },
    attributes: {
      strength: 50,
      dexterity: 60,
      intelligence: 70,
      power: 65,
      constitution: 55,
      appearance: 60,
      size: 50,
      education: 70,
      luck: 42,
    },
    combat: [
      {
        id: "askçsdadsçdças",
        name: "Unarmed",
        iconUrl: "/weapons/fist.svg",
        skill: "Fighting(Brawl)",
        range: "-",
        damage: "1d3",
        attacks: "1",
        description:
          "Combat using only your fists or other unarmed techniques. Effective in close quarters but limited in damage.",
        properties: [
          "Can be used by any character without requiring special equipment.",
          "Damage is low but does not rely on external items.",
        ],
      },
      {
        id: "sakçsaksçkdsçads",
        name: "Schwerer Dolch",
        iconUrl: "/weapons/schwerer-dolch.svg",
        skill: "Fighting(Brawl)",
        range: "0.7m",
        damage: "1d8 + STR",
        attacks: "1",
        description:
          "The Schwerer Dolch is a heavier and larger version of the standard dagger. It has more reach and can deal more damage with each strike, making it suitable for direct combat.",
        properties: [
          "Heavier than a regular dagger, offering more damage.",
          "Longer reach, effective for close-quarters combat.",
          "Good for both stabbing and slashing.",
        ],
      },
      {
        id: "laslçvdskçkd",
        name: "Schwerer Dolch",
        iconUrl: "/weapons/schwerer-dolch.svg",
        skill: "Fighting(Brawl)",
        range: "0.7m",
        damage: "1d8 + STR",
        attacks: "1",
        description:
          "The Schwerer Dolch is a heavier and larger version of the standard dagger. It has more reach and can deal more damage with each strike, making it suitable for direct combat.",
        properties: [
          "Heavier than a regular dagger, offering more damage.",
          "Longer reach, effective for close-quarters combat.",
          "Good for both stabbing and slashing.",
        ],
      },
    ],
    inventory: [],
    backstory: `
  **Nome:** Lyra Valtharion  
  **Classe:** Guerreira  
  **Raça:** Elfa  
  **Idade:** 128 anos (jovem para os padrões élficos)  
  **Equipamento:** Espada longa ancestral, armadura prateada ornamentada com símbolos lunares, capa azul-acinzentada.  
  **Aparência:** Alta e esguia, com traços nobres, olhos prateados e cabelos acinzentados que brilham como seda à luz do luar.  
  
  ---
  
  # **História**
  
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
    `,
    skills: [
      {
        id: "saklsakdsalkdlska",
        name: "Accounting",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Anthropology",
        baseValue: 1,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Appraise",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Archaeology",
        baseValue: 1,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Charm",
        baseValue: 15,
        currentValue: 50,
        checked: true,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Climb",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Credit Rating",
        baseValue: 0,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Cthulhu Mythos",
        baseValue: 0,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Disguise",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Dodge",
        baseValue: "half DEX",
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Drive Auto",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Elec Repair",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Fast Talk",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Fighting(Brawl)",
        baseValue: 25,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Firearms(HG)",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Firearms(R/S)",
        baseValue: 25,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "First Aid",
        baseValue: 30,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "History",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Intimidate",
        baseValue: 15,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Jump",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Language(Own)",
        baseValue: "EDU",
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Law",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Library Use",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Listen",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Locksmith",
        baseValue: 1,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Luck",
        baseValue: 65,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Mech Repair",
        baseValue: 10,
        currentValue: 50,
        checked: true,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Medicine",
        baseValue: 1,
        currentValue: 50,
        checked: true,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Natural World",
        baseValue: 10,
        currentValue: 50,
        checked: true,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Navigate",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Occult",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Op Hv Machine",
        baseValue: 1,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Persuade",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Psychoanalysis",
        baseValue: 1,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Psychology",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Ride",
        baseValue: 5,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Sleight of Hand",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Spot Hidden",
        baseValue: 25,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Stealth",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Swim",
        baseValue: 20,
        currentValue: 50,
        checked: false,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Throw",
        baseValue: 20,
        currentValue: 50,
        checked: true,
      },
      {
        id: "saklsakdsalkdlska",
        name: "Track",
        baseValue: 10,
        currentValue: 50,
        checked: false,
      },
    ],
  },
]
