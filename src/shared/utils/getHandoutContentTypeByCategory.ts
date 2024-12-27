import { handoutContentTypes } from "@/modules/Board/components/Handouts/data"

export function getHandoutContentTypeByCategory(category: string):
  | {
      category: string
      types: string[]
    }
  | undefined {
  const match = handoutContentTypes.find((item) => item.category === category)
  return match
}
