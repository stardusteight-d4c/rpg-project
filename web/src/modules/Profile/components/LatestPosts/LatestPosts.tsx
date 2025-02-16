export const LatestPosts = () => {
  return (
    <div>
      <h2 className="text-3xl pointer-events-none font-bold mb-2">
        Latest Posts
      </h2>
      <div className="grid grid-cols-2 items-center flex-wrap w-full gap-4">
        {Array.from({ length: 2 }).map((item, index) => (
          <div className="col-span-1 flex relative bg-background w-full border border-border overflow-hidden rounded-3xl pt-2 flex-col gap-y-1">
            <div className="flex select-none px-4 z-20 items-center gap-x-2">
              <img
                src="https://avatars.githubusercontent.com/u/87643260?v=4"
                alt=""
                className="w-[48px] aspect-square object-cover select-none pointer-events-none h-[48px] rounded-full"
              />
              <div className="flex flex-col">
                <span className="block whitespace-nowrap text-lg font-bold -tracking-wide">
                  Gabriel Sena
                </span>
                <span className="text-gray-400 -mt-2 block text-sm">
                  #stardusteight
                </span>
              </div>
              <div className="ml-auto text-gray-500/80 select-none flex items-center gap-x-[2px] mt-1 w-full justify-end">
                <span className="text-xs block">10 hours ago</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#6b7280"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
                </svg>
              </div>
            </div>
            <div className="px-4  mt-1 flex items-center gap-1 flex-wrap">
              <span className="text-gray-400 bg-ashes px-2 border border-border rounded-full w-fit block cursor-pointer">
                #Beyond_the_Mountains_of_Madness
              </span>
              <span className="text-gray-400 bg-ashes px-2 border border-border rounded-full w-fit block cursor-pointer">
                #blackwive
              </span>
              <span className="text-gray-400 bg-ashes px-2 border border-border rounded-full w-fit block cursor-pointer">
                #lohvanna
              </span>
            </div>
            <div className="px-4">
              <span className="block">
                Resumo da campanha de hoje: 1 hora vendo items na lojinha de um
                comerciante local.
                <br />
                <br />
                Pelo menos Xablau Perreira tem preparo. 🤣
              </span>
            </div>

            <div className="px-4 py-2 bg-border mt-2 flex flex-col gap-y-2">
              <div className="flex items-center gap-x-2 mb-2">
                <button className="bg-background flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 hover:bg-gradient-to-tr hover:from-[#42d392] hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#FFFFFF"
                    viewBox="0 0 256 256"
                  >
                    <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path>
                  </svg>
                </button>
                <button className="bg-background flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 hover:bg-gradient-to-tr hover:from-[#42d392] hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#FFFFFF"
                    viewBox="0 0 256 256"
                  >
                    <path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z"></path>
                  </svg>
                </button>
                <button className="bg-background flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 hover:bg-gradient-to-tr hover:from-[#42d392] hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#FFFFFF"
                    viewBox="0 0 256 256"
                  >
                    <path d="M237.66,106.35l-80-80A8,8,0,0,0,144,32V72.35c-25.94,2.22-54.59,14.92-78.16,34.91-28.38,24.08-46.05,55.11-49.76,87.37a12,12,0,0,0,20.68,9.58h0c11-11.71,50.14-48.74,107.24-52V192a8,8,0,0,0,13.66,5.65l80-80A8,8,0,0,0,237.66,106.35ZM160,172.69V144a8,8,0,0,0-8-8c-28.08,0-55.43,7.33-81.29,21.8a196.17,196.17,0,0,0-36.57,26.52c5.8-23.84,20.42-46.51,42.05-64.86C99.41,99.77,127.75,88,152,88a8,8,0,0,0,8-8V51.32L220.69,112Z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
