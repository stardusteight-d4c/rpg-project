import { EmptyState } from "@/shared/components/ui"
import { Notepad } from "@/shared/components/ui/icons"

export const Empty: React.FC<{ isEmpty: boolean }> = ({ isEmpty }) => {
  if (!isEmpty) return

  return (
    <EmptyState description="In the beginning, there was chaos. Now there's just this blank space.">
      <Notepad />
    </EmptyState>
  )
}
