export const Actions: React.FC<{
  onTypeChange: (type: "campaign" | "user") => void
  searchType: "campaign" | "user"
}> = ({ onTypeChange, searchType }) => {
  return (
    <div className="py-2 px-4 sticky z-[200] border-b border-border shadow-md shadow-black/50 top-0 w-full inset-x-0 bg-background">
      <div className="flex items-center gap-x-4">
        <button
          onClick={() => {
            onTypeChange("user")
          }}
          className="cursor-pointer w-fit flex items-center group gap-x-2"
        >
          <div
            className={`
                      ${
                        searchType === "user"
                          ? " bg-gradient-to-tr from-[#42d392] to-[#8B5CF6] "
                          : " bg-ashes "
                      }
                       flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#FFFFFF"
              viewBox="0 0 256 256"
            >
              <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
            </svg>
          </div>
          <span>User</span>
        </button>
        <button
          onClick={() => {
            onTypeChange("campaign")
          }}
          className="cursor-pointer w-fit flex items-center group gap-x-2"
        >
          <div
            className={`
                      ${
                        searchType === "campaign"
                          ? " bg-gradient-to-tr from-[#42d392] to-[#8B5CF6] "
                          : " bg-ashes "
                      }
                       flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#FFFFFF"
              viewBox="0 0 256 256"
            >
              <path d="M42.76,50A8,8,0,0,0,40,56V224a8,8,0,0,0,16,0V179.77c26.79-21.16,49.87-9.75,76.45,3.41,16.4,8.11,34.06,16.85,53,16.85,13.93,0,28.54-4.75,43.82-18a8,8,0,0,0,2.76-6V56A8,8,0,0,0,218.76,50c-28,24.23-51.72,12.49-79.21-1.12C111.07,34.76,78.78,18.79,42.76,50ZM216,172.25c-26.79,21.16-49.87,9.74-76.45-3.41-25-12.35-52.81-26.13-83.55-8.4V59.79c26.79-21.16,49.87-9.75,76.45,3.4,25,12.35,52.82,26.13,83.55,8.4Z"></path>
            </svg>
          </div>
          <span>Campaign</span>
        </button>
      </div>
    </div>
  )
}
