import { Heading as Header } from "@/shared/components/ui/Heading"
import { Flag } from "@/shared/components/ui/icons"

export const Heading = () => {
  return (
    <Header title="Campaigns" className="mb-2">
      <Flag />
    </Header>
  )
}
