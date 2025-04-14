import { EmptyState } from "@/shared/components/ui"
import { Image } from "@/shared/components/ui/icons"

export const Empty: React.FC<{ imageUrl: string | undefined }> = ({
  imageUrl,
}) => {
  if (imageUrl) return

  return (
    <EmptyState description="No uploads were made.">
      <Image />
    </EmptyState>
  )
}
