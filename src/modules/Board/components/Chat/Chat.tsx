export const Chat = () => {
  return (
    <section className="w-[25vw]  p-4  h-screen">
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center gap-x-2">
          <img
            src="https://avatars.githubusercontent.com/u/87643260?v=4"
            alt=""
            className="w-[48px] h-[48px] rounded-md"
          />
          <span className="block text-xl font-bold">Erwin Farwell</span>
        </div>
        <div>
          <div className="w-full overflow-hidden bg-border rounded-md">
            <span className="block bg-[#27272a] px-4 py-2 font-bold text-xl">
              Stealth Roll
            </span>
            <div className="w-full h-[0px] border-t border-t-border" />
            <div className="grid grid-cols-3 items-center justify-center w-full">
              <span className="col-span-1 block p-2 text-center font-bold text-lg text-red-500">
                {`>`}25
              </span>
              <span className="col-span-1 block p-2 border-x border-border text-center font-bold text-lg text-green-500">
                {`>`}12{`>`}
              </span>
              <span className="col-span-1 block p-2 text-center font-bold text-lg bg-clip-text text-transparent bg-gradient-to-tr from-violet-500 to-pink-500 ">
                5{`>`}
              </span>
            </div>
            <div className="w-full h-[0px] border-t border-t-border" />
            <span className="block bg-red-500 px-4 py-2 font-bold text-2xl text-center">
              50
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
