import { ProfileInfo } from "../character-sheets/CallOfCthulhu/components"

export const Characters = () => {
  const infos = [
    {
      id: "asdsaas",
      name: "Erwin Farwell",
      player: "Gabriel Sena",
      sex: "male" as "male",
      characterUrl:
        "https://imgcdn.stablediffusionweb.com/2024/10/24/23cb7d83-7cac-43f6-8ac8-84c9cd8475a6.jpg",
      occupation: "Journalist and Private Detective",
      hitPoints: 75,
      magicPoints: 42,
      sanity: 22,
    },
    {
      id: "asfafsafv",
      name: "Erik Bjorn ",
      player: "Gabriel Sena",
      sex: "male" as "male",
      characterUrl:
        "https://neural.love/cdn/thumbnails/1eed6701-3f10-66ae-a3ea-41b70a0743ac/eeb65884-de3b-5ffc-9982-79cfe16f394b.webp?Expires=1767225599&Signature=tnQgxe3HIRNHu4D532pE79A2nbqUhNwYrzKXOsl-ZX9uqsiDQY1orBDBv1pBmKVfHtCWwp9N31Q7wP4n2S~BKTJRHElZheN-DJU5Q3nHRIiXqvXdxKBYnD7ZH3Mcjl6n9RuxIy5YywbWqvTIs05HYX13SmDMOBx4sCaJvD4MBovknJ1OWL~1txwStM7fNnsyLKf8j857Kci1OLDKuDeJyRgKzQryixLSt-KB7lknK2tXGeAA~XW31yW9dbVhw0oeuXwhJAXYtezI9pcGaBHmm2sPtr3BMM7mJtkK-arna11zegqXaYVEeCsdRxQCwTHQUuApPYk0Kc6OHZ4eTnr42w__&Key-Pair-Id=K2RFTOXRBNSROX",
      occupation: "Journalist and Private Detective",
      hitPoints: 150,
      magicPoints: 0,
      sanity: 100,
    },
    {
      id: "aksalskals",
      name: "Lizabeth White",
      player: "Gabriel Sena",
      sex: "female" as "female",
      characterUrl:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f2664fbe-b0bd-454c-bfe6-6e930a07fc49/dh1yf6m-9a50d508-4a14-4f63-9a0b-b4339f5d284a.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2YyNjY0ZmJlLWIwYmQtNDU0Yy1iZmU2LTZlOTMwYTA3ZmM0OVwvZGgxeWY2bS05YTUwZDUwOC00YTE0LTRmNjMtOWEwYi1iNDMzOWY1ZDI4NGEuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.VNORNfSflxfLfH0SH-r1mLEM8eyB8LsRfinCHZuP5Jc",
      occupation: "Journalist and Private Detective",
      hitPoints: 100,
      magicPoints: 12,
      sanity: 84,
    },
  ]

  return (
    <section className="p-2 h-screen overflow-y-scroll no-scrollbar">
      <div className="space-y-2">
        {infos.map((character) => (
          <div
            key={character.id}
            className="cursor-pointer border border-border hover:bg-border p-2 rounded"
          >
            <ProfileInfo {...character} />
          </div>
        ))}
      </div>
    </section>
  )
}
