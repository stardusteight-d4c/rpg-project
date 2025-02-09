import { Feed } from "./components"

export function FeedModule() {
  return (
    <FeedModuleWrapper>
      <Feed.Navbar />
      <div className="max-w-7xl mt-[45px] w-full mx-auto flex">
        <Feed.Posts />
        <Feed.Sidebar />
      </div>
      <Feed.Footer />
    </FeedModuleWrapper>
  )
}

const FeedModuleWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <main className="w-screen">{children}</main>
