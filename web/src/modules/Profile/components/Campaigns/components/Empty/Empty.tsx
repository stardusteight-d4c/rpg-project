import { EmptyState } from "@/shared/components/ui"
import { Flag } from "@/shared/components/ui/icons"

export const Empty: React.FC<{ campaignsLength: number }> = ({
  campaignsLength,
}) => {
  if (campaignsLength !== 0) return

  return (
    <EmptyState description="The Ancient Whispers talk about great narrators… do you know any? Or do you just fear what hides in the shadows?">
      <Flag />
    </EmptyState>
  )
}
