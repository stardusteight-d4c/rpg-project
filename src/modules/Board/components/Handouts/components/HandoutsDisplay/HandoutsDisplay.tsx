interface HandoutsDisplayProps {
  handouts: Array<{
    id: string
    name: string
    for: Array<{
      id: string
      name: string
    }>
    visibility: Array<{
      id: string
      name: string
    }>
    type: "Note Type 01" | "Note Type 02" | "Newspaper" | "Letter"
    content: any
  }>
  handleOnClickHandout: (handout: {
    id: string
    name: string
    for: Array<{
      id: string
      name: string
    }>
    visibility: Array<{
      id: string
      name: string
    }>
    type: "Note Type 01" | "Note Type 02" | "Newspaper" | "Letter"
    content: any
  }) => void
}

export const HandoutsDisplay = ({
  handouts,
  handleOnClickHandout,
}: HandoutsDisplayProps) => {
  return (
    <section className="relative h-screen overflow-y-scroll no-scrollbar">
      <div className="sticky border-b border-border  shadow-sm shadow-black/50 z-50 top-0 p-2 w-full inset-x-0 bg-background">
        <div className="flex items-center gap-x-4">
          <div
            // onClick={() => setCreateMode(true)}
            className="flex cursor-pointer items-center group w-fit gap-x-2"
          >
            <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full  shadow-md shadow-black/50 group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path>
              </svg>
            </button>
            <span>Create Handout</span>
          </div>
          <div
            // onClick={() => setCreateMode(true)}
            className="flex cursor-pointer items-center group w-fit gap-x-2"
          >
            <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full  shadow-md shadow-black/50 group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0ZM93.66,77.66,120,51.31V144a8,8,0,0,0,16,0V51.31l26.34,26.35a8,8,0,0,0,11.32-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40A8,8,0,0,0,93.66,77.66Z"></path>
              </svg>
            </button>
            <span>Upload Handout</span>
          </div>
        </div>
      </div>

      <div className="p-2">
        <ul className="flex items-center gap-x-2 flex-wrap">
          {handouts.map((handout) => (
            <>
              {handout.type && (
                <li
                  key={handout.id}
                  onClick={() => handleOnClickHandout(handout)}
                  className="p-2 w-fit cursor-pointer hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-sm bg-border/50 border border-dashed border-gray-400/20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#CCCCCC50"
                    viewBox="0 0 256 256"
                  >
                    <path d="M88,112a8,8,0,0,1,8-8h80a8,8,0,0,1,0,16H96A8,8,0,0,1,88,112Zm8,40h80a8,8,0,0,0,0-16H96a8,8,0,0,0,0,16ZM232,64V184a24,24,0,0,1-24,24H32A24,24,0,0,1,8,184.11V88a8,8,0,0,1,16,0v96a8,8,0,0,0,16,0V64A16,16,0,0,1,56,48H216A16,16,0,0,1,232,64Zm-16,0H56V184a23.84,23.84,0,0,1-1.37,8H208a8,8,0,0,0,8-8Z"></path>
                  </svg>
                  <span>{handout.name}</span>
                </li>
              )}
            </>
          ))}
        </ul>
      </div>
    </section>
  )
}
