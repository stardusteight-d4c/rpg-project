import { EmptyState } from "@/shared/components/ui"
import { AddressBook } from "@/shared/components/ui/icons"

export const Empty: React.FC<{ sheetsLength: number }> = ({ sheetsLength }) => {
  if (sheetsLength !== 0) return

  return (
    <EmptyState description="Not even a sheet? Looks like someone is still waiting for the call of the adventure...">
      <AddressBook />
    </EmptyState>
  )
}
