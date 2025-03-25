import { Heading as Header } from "@/shared/components/ui"
import { AddressBook } from "@/shared/components/ui/icons"

export const Heading = () => {
  return (
    <Header title="Sheets" className="mb-2">
      <AddressBook />
    </Header>
  )
}
