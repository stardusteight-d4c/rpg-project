import { EmptyState } from "@/shared/components/ui"
import { CompassRose } from "@/shared/components/ui/icons"
import { useMaps } from "@/shared/contexts"

export const Empty: React.FC<{ createMode: boolean }> = ({ createMode }) => {
  const { maps } = useMaps()
  if (createMode || maps.length !== 0) return

  return (
    <div className="p-2">
      <EmptyState description="The boundaries of reality have not been defined. What lurks beyond the darkness remains a mystery.">
        <CompassRose />
      </EmptyState>
    </div>
  )
}
