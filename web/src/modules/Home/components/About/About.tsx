export const About = () => {
  return (
    <section className="max-w-7xl items-center w-full mx-auto my-[150px]">
      <div className="flex text-center mx-auto -mt-2 flex-col gap-y-2">
        <h2 className="text-5xl mt-4 font-bold background-gradient text-transparent bg-clip-text">
          Play, Watch and Connect: <br />
          The RPG Beyond the Table
        </h2>
        <span className="block text-gray-400 w-[500px] mx-auto">
          With intuitive tools and a publishing system, Campfire turns each
          session into an immersive and collaborative experience. Light your
          flame, share epic stories, and find new allies for your journeys!
        </span>
      </div>
      <div className="mt-10 flex flex-row gap-8 mx-auto w-[1000px] items-center">
        <img
          src="/Component 3.png"
          className="col-span-1 w-[610px] border border-border rounded-2xl object-cover bg-border"
        />
        <div className="col-span-1 w-fit flex flex-col gap-y-4">
          <div className="flex items-center gap-x-4">
            <div className="bg-border rounded-full w-fit">
              <div
                style={{
                  background: "linear-gradient(to right, #42d392, #8B5CF6)",
                  WebkitMaskImage: `url('/weapons/sword.svg')`,
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskImage: `url('/weapons/sword.svg'`,
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                }}
                className="relative z-20 w-[42px] h-[42px] scale-125"
              ></div>
            </div>
            <div>
              <span className="background-gradient bg-clip-text text-transparent text-4xl font-medium">
                Interactive tables
              </span>
              <span className="w-[300px] block text-gray-400">
                Create campaigns with customizable sheets, dice rolls and
                intuitive tools.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <div className="bg-border rounded-full w-fit">
              <div
                style={{
                  background: "linear-gradient(to right, #42d392, #8B5CF6)",
                  WebkitMaskImage: `url('/weapons/kriegsbeil.svg')`,
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskImage: `url('/weapons/kriegsbeil.svg'`,
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                }}
                className="relative z-20 w-[42px] h-[42px] scale-125"
              ></div>
            </div>
            <div>
              <span className="background-gradient bg-clip-text text-transparent text-4xl font-medium">
                Session streaming
              </span>
              <span className="w-[300px] block text-gray-400">
                Watch and follow other players' epic adventures.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <div className="bg-border rounded-full w-fit">
              <div
                style={{
                  background: "linear-gradient(to right, #42d392, #8B5CF6)",
                  WebkitMaskImage: `url('/weapons/kompositbogen.svg')`,
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskImage: `url('/weapons/kompositbogen.svg'`,
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                }}
                className="relative z-20 w-[42px] h-[42px] scale-125"
              ></div>
            </div>
            <div>
              <span className="background-gradient bg-clip-text text-transparent text-4xl font-medium">
                Social network
              </span>
              <span className="w-[300px] block text-gray-400">
                Share stories, chronicles and epic moments with the community.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <div className="bg-border rounded-full w-fit">
              <div
                style={{
                  background: "linear-gradient(to right, #42d392, #8B5CF6)",
                  WebkitMaskImage: `url('/weapons/basiliskanzunge.svg')`,
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskImage: `url('/weapons/basiliskanzunge.svg'`,
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                }}
                className="relative z-20 w-[42px] h-[42px] scale-125"
              ></div>
            </div>
            <div>
              <span className="background-gradient bg-clip-text text-transparent text-4xl font-medium">
                Player matchmaking
              </span>
              <span className="w-[300px] block text-gray-400">
                Find groups and new allies for your campaigns.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
