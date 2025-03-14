import { EditPostModal } from "@/shared/components/content/modals"

export const Wrapper: React.FC<{
  status: boolean
  onStatusChange: (value: boolean) => void
  post: IPost
  children: React.ReactNode
}> = ({ status, onStatusChange, post, children }) => {
  return (
    <div className="flex relative bg-background w-full border border-border rounded-xl pt-4 flex-col">
      <EditPostModal
        onStatusChange={onStatusChange}
        status={status}
        post={post}
      />
      {children}
    </div>
  )
}
