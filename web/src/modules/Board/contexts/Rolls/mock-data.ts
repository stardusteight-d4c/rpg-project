import { characters } from "../Characters/mock-data"

export const rolls: IRoll[] = [
  {
    id: "f10442e8-12aa-402c-86b6-b37cb62b49de",
    character: characters[1],
    character_roll: {
      name: "stealth",
      value: 65,
      half_value: Math.floor(65 / 2),
      fifth_value: Math.floor(65 / 5),
      rolled: 88,
    },
    createdAt: "2025-02-03T13:50:00Z",
  },
  {
    id: "1b2adb76-ec3c-4b9f-997c-e74d31abcaee",
    character: characters[1],
    character_roll: {
      name: "power",
      value: 60,
      half_value: Math.floor(60 / 2),
      fifth_value: Math.floor(60 / 5),
      rolled: 20,
    },
    createdAt: "2025-02-03T13:51:00Z",
  },
  {
    id: "a02c6a57-8f4f-4c7c-84da-3a4908197664",
    character: characters[4],
    system_roll: {
      dice_quantity: 2,
      dice_type: 10,
      rolled: [4, 2],
      total: 6
    },
    createdAt: "2025-02-03T13:54:00Z",
  },
]
