export const DisplayMap: React.FC<{ editableData: IMap }> = ({ editableData }) => {
  if (!editableData.imageUrl) return

  return (
    <div className="">
      {editableData.type === "exploration" ? (
        <div className="relative rounded-md overflow-hidden w-full">
          <div
            className="w-full min-h-[100vh] grid "
            style={{
              gridTemplateColumns: `repeat(${editableData.gridSize![0]}, 1fr)`,
              gridTemplateRows: `repeat(${editableData.gridSize![1]}, 1fr)`,
              transformOrigin: "top left",
              overflow: "hidden",
            }}
          >
            <div className="px-2 border border-border bg-background w-fit z-[300] shadow-sm shadow-black/50 rounded-full font-medium text-xl absolute bottom-4 right-4">
              <span className="background-gradient bg-clip-text text-transparent whitespace-nowrap select-none cursor-default pointer-events-none">
                {editableData.name}
              </span>
            </div>

            <img
              src={editableData.imageUrl}
              alt=""
              className="absolute z-0 w-full h-full object-fill select-none pointer-events-none"
            />
            {Array.from({ length: editableData.gridSize![0] }).map(
              (_, rowIndex) =>
                Array.from({ length: editableData.gridSize![1] }).map(
                  (_, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className="relative w-full border-[0.1px] border-l-0 border-t-0 border-background z-50 aspect-square overflow-hidden h-fit mx-auto"
                    ></div>
                  )
                )
            )}
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="px-2 border border-border bg-background w-fit z-[300] shadow-sm shadow-black/50 rounded-full font-medium text-xl absolute bottom-4 right-4">
            <span className="background-gradient bg-clip-text text-transparent whitespace-nowrap select-none cursor-default pointer-events-none">
              {editableData.name}
            </span>
          </div>

          <img
            src={editableData.imageUrl}
            alt=""
            className="aspect-map rounded-md h-[300px] z-0 w-full object-cover select-none pointer-events-none"
          />
        </div>
      )}
    </div>
  )
}
