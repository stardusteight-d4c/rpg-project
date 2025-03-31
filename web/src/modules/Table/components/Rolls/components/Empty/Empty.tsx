import { EmptyState } from "@/shared/components/ui"
import { DiceFive } from "@/shared/components/ui/icons"

export const Empty: React.FC<{ length: number }> = ({ length }) => {
  if (length !== 0) return

  return (
    <div className="p-2">
      <EmptyState
        height={400}
        description="The gears of the cosmos grind in their eternal march. But here, all is still. No dice roll. No hand dares disturb them."
      >
        <DiceFive />
      </EmptyState>
    </div>
  )
}
