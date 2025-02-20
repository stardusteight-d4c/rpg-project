import { matchUsers } from "../Users/mock-data"

const thirtyMinAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString()
const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
const oneMonthAgo = new Date(
  new Date().setMonth(new Date().getMonth() - 1)
).toISOString()

export const campaigns: Array<ICampaign> = [
  {
    id: "3e501429-2c65-44c0-97c8-0d32906f0921",
    tableId: "b3dbc321-4330-4966-a20a-2721a818c2c2",
    name: "Beyond the Mountains of Madness",
    description:
      "Uma jornada épica para explorar ruínas ancestrais no coração da Antártica, onde o terror e o desconhecido se entrelaçam.",
    coverUrl:
      "https://assetsio.gnwcdn.com/call-of-cthulhu-rpg-arkham-sourcebook-artwork.png?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp",
    duration: "42",
    status: "active",
    streaming: { watchers: [], startedAt: thirtyMinAgo },
    players: [matchUsers[1], matchUsers[2]],
    owner: matchUsers[0],
    createdAt: oneMonthAgo,
  },
  {
    id: "a7c8b213-3f2d-4d4b-92e4-9a1d8726a71e",
    tableId: "581d86de-a1f6-4f27-b638-bafbea0448bb",
    name: "The Lost City of Zorath",
    description:
      "Um grupo de aventureiros parte em busca da lendária cidade perdida, enfrentando perigos místicos e civilizações esquecidas.",
    coverUrl:
      "https://cdn.myportfolio.com/01576c1cae45f964574cd467d49a52b8/cb80796e-42ab-43bc-bea0-f12e2907d474_rw_1920.jpg?h=423137e847613be7260e67b60daec37e",
    duration: "127",
    status: "inactive",
    streaming: { watchers: [], startedAt: oneHourAgo },
    players: [matchUsers[0], matchUsers[2]],
    owner: matchUsers[1],
    createdAt: oneMonthAgo,
  },
  {
    id: "d9b2c411-5a48-4f6b-8a02-b6f9bfc8e37d",
    tableId: "b213dff9-144d-4d10-aa27-5ed9e56a4970",
    name: "Shadows Over Eldoria",
    description:
      "Sombras espreitam a cidade de Eldoria enquanto um grupo de heróis luta contra forças sombrias para salvar seu povo.",
    coverUrl:
      "https://mir-s3-cdn-cf.behance.net/project_modules/hd/1e8c1f94180437.5e78948e881c2.jpg",
    duration: "120",
    status: "active",
    streaming: { watchers: [], startedAt: thirtyMinAgo },
    players: [matchUsers[1], matchUsers[0]],
    owner: matchUsers[2],
    createdAt: oneMonthAgo,
  },
  {
    id: "4d0216ab-afa6-4bd6-af19-633fb02ec082",
    tableId: "93263572-79e6-472a-b010-1b31b2307963",
    name: "Horror on the Orient Express",
    description:
      "Uma viagem luxuosa pelo lendário Expresso do Oriente se transforma em um pesadelo quando eventos sobrenaturais e conspirações mortais emergem. Os passageiros devem desvendar segredos antigos e enfrentar horrores indescritíveis antes que o trem alcance seu destino final.",
    coverUrl:
      "https://assetsio.gnwcdn.com/call-of-cthulhu-masks-of-nyarlathotep-artwork.jpeg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp",
    duration: "80",
    status: "active",
    streaming: { watchers: [], startedAt: thirtyMinAgo },
    players: [matchUsers[0], matchUsers[2]],
    owner: matchUsers[1],
    createdAt: oneMonthAgo,
  },
]
