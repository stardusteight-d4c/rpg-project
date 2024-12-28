type HandoutType =
  | "Letter"
  | "Id"
  | "Note"
  | "Newspaper"
  | "Bank check"
  | "Book"
  | "Passport"
  | "Postcard"
  | "Magazine"
  | "Telegram"

interface IHandout {
  id: string
  type: HandoutType
  name: string
  for: Array<{
    id: string
    name: string
  }>
  visibility: Array<{
    id: string
    name: string
  }>
  content: {
    type: {
      name: string
      inputs: number
    }
    inputs: Array<string>
  }
}
