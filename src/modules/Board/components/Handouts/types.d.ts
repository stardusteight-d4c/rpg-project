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
    type: "Note Type 01" | "Note Type 02" | "Newspaper" | "Letter"
    inputs: Array<string>
  }
}
