export const Scenario: React.FC<{
  map: IMap
}> = ({ map }) => {
  return (
    <div className="relative w-full h-[100vh] overflow-hidden">
      <div className="px-2 border border-border bg-background w-fit z-50 shadow-sm shadow-black/50 rounded-full font-medium text-xl absolute bottom-4 right-4">
        <span className="background-gradient bg-clip-text text-transparent whitespace-nowrap select-none cursor-default pointer-events-none">
          {map.name}
        </span>
      </div>

      <img
        src={map.imageUrl}
        className="h-screen object-cover w-full select-none pointer-events-none z-0"
        alt=""
      />
    </div>
  )
}
