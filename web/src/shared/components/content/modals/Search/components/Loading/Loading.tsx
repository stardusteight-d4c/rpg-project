import { EmptyState, Loader } from "@/shared/components/ui"

export const Loading: React.FC<{
  isLoading: boolean
  searchType: "campaign" | "user"
}> = ({ isLoading, searchType }) => {
  if (!isLoading) return null

  return (
    <div className="mb-2">
      {searchType === "user" && (
        <EmptyState
          description="Seeking brave souls to face the horrors of the beyond."
          height={150}
        >
          <Loader />
        </EmptyState>
      )}
      {searchType === "campaign" && (
        <EmptyState
          description="In search of new adventures and epic challenges. Where is the next great journey?"
          height={150}
        >
          <Loader />
        </EmptyState>
      )}
    </div>
  )
}
