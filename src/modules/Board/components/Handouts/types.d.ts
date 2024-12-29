interface IHandout {
  id: string
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

interface IHandoutContentTypes {
  name: string
  inputs: number
}
