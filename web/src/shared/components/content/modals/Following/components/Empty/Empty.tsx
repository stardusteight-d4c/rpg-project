import { EmptyState, Loader } from "@/shared/components/ui"
import { Link } from "@/shared/components/ui/icons"

export const Empty: React.FC<{ length: number; isLoading: boolean }> = ({
  length,
  isLoading,
}) => {
  if (length !== 0) return
  return (
    <EmptyState description="Not even the most insane occultists walk alone, there's always something whispering in the dark.">
      {isLoading ? <Loader /> : <Link />}
    </EmptyState>
  )
}
