import { characters } from "../Characters/mock-data"
import { matchUsers } from "../Users/mock-data"

export const notifications: INotification[] = [
  {
    id: "33405e84-77e8-4c5a-bd06-6ed09b4c2d2c",
    by: characters[1],
    content: "Changed your Listen skill from 50 to 58 (+8).",
    createdAt: "2025-01-02T10:12:00Z",
  },
  {
    id: "f11292ba-1e17-4a00-9226-18fa9ccf4a4d",
    by: characters[1],
    content: "Changed your Strength attribute from 36 to 42 (+6).",
    createdAt: "2025-01-02T10:00:00Z",
  },
  {
    id: "7dbe3b6f-c27e-4a51-a40c-55c101d98a93",
    by: characters[4],
    content: `Added "Pote Vazio" to your inventory.`,
    createdAt: "2025-01-01T14:57:00Z",
  },
  {
    id: "4afde43a-a344-4b7f-9788-5b2c16d25b86",
    by: characters[3],
    content: "Changed your Appearance attribute from 50 to 42 (-8).",
    createdAt: "2025-01-01T14:40:00Z",
  },
  {
    id: "eb7a23e2-026e-4d00-b0ad-3eb3595ab436",
    by: characters[4],
    content: `Changed the Attacks stat of your Schwerer Dolch from 1 to 2.`,
    createdAt: "2025-01-01T14:30:00Z",
  },
  {
    id: "d8d0eb97-397c-4988-8c57-712aa517d95b",
    owner: matchUsers[0],
    content: `Erik Bjorn defeats the Dream Eater, congratulations!`,
    createdAt: "2025-01-01T14:05:00Z",
  },
]
