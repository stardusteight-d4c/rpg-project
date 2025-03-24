import { Heading as Header } from "@/shared/components/ui"
import { Notepad } from "@/shared/components/ui/icons"

export const Heading = () => {
  return (
    <Header title="Posts" className="mb-2">
      <Notepad />
    </Header>
  )
}
