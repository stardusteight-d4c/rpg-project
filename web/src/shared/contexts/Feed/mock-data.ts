import { matchUsers } from "../Users/mock-data"

export const posts: IPost[] = [
  {
    id: "96f0d01f-a00f-47fa-a2fb-3c64e7a3a500",
    user: matchUsers[1],
    content: `Obrigado, aventureiros, por mais uma sessão memorável! Nos vemos na próxima, e lembrem-se: o perigo espreita em cada sombra... 🌙🔮

🎭📖 Como foi a sessão para vocês? Algum momento favorito? Comentem abaixo! 👇🔥`,
    likedByUser: true,
    likesCount: 25,
    tags: [
      {
        type: "campaign",
        value: "Beyond_the_Mountains_of_Madness",
        linkId: "c84df9de-5834-43ef-a526-d838a77e75dc",
      },
      {
        type: "user",
        value: "stardusteight",
        linkId: "a30e60ac-d957-4280-9d8a-249651a19671",
      },
      {
        type: "user",
        value: "lohvanna",
        linkId: "5e081598-5f15-414e-86a6-d20bf3497550",
      },
    ],
    comments: [],
    createdAt: "2025-02-09T14:24:00Z",
  },
  {
    id: "2a3bca46-17de-4b54-8d1b-9f7ad4fa85cb",
    user: matchUsers[0],
    content: `Resumo da campanha de hoje: 1 hora vendo items na lojinha de um comerciante local.

Pelo menos Xablau Perreira tem preparo. 🤣`,
    tags: [
      {
        type: "campaign",
        value: "Beyond_the_Mountains_of_Madness",
        linkId: "c84df9de-5834-43ef-a526-d838a77e75dc",
      },
      {
        type: "user",
        value: "blackwive",
        linkId: "4d6f7287-2e27-4389-bccb-c5beaf761a7d",
      },
      {
        type: "user",
        value: "lohvanna",
        linkId: "5e081598-5f15-414e-86a6-d20bf3497550",
      },
    ],
    comments: [
      {
        id: "4814476e-f807-4eda-962f-870730920ccf",
        user: matchUsers[2],
        content: "Você comprou 2 pães filha da put%! DOIS PÃES!!!!!",
        createdAt: "2025-02-09T14:24:00Z",
      },
      {
        id: "8beba58a-d5b7-41ff-8418-c1673595d24b",
        user: matchUsers[0],
        content: `Quando você estiver à beira da morte, vendo seus HP escorrerem
        diante de seus olhos, o coração acelerado e a insanidade
        tomando conta... tudo porque ignorou a fome. E então, quando
        for tarde demais, só restará o arrependimento... 😉`,
        createdAt: "2025-02-09T14:50:00Z",
      },
    ],
    createdAt: "2025-02-09T13:24:00Z",
  },
]
