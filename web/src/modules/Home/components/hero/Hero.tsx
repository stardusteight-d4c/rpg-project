import Link from "next/link"

export const Hero = () => {
  return (
    <section className="max-w-7xl w-full mx-auto pt-[45px]">
      <div className="relative">
        <div className="flex w-fit items-center pt-10 justify-center mx-auto">
          <h1 className="font-bold text-[50px] flex items-center justify-centercursor-pointer select-none">
            <img src="/favicon.png" alt="" className="w-[52px] h-[52px]" />
            Camp
            <span className="background-gradient bg-clip-text text-transparent">
              fire
            </span>
          </h1>
        </div>
        <div className="mb-10 border-t border-border pt-2 mt-2 w-fit mx-auto flex flex-col items-center justify-center gap-y-1">
          <h2 className="mx-auto font-medium text-center text-4xl">
            Create, play and share epic stories!
          </h2>
          <span className="mx-auto block w-[400px] text-gray-400 text-xl text-center">
            Create campaigns, customize sheets and connect with your friends.
          </span>
          <Link
            href="/auth/signup"
            className="p-2 font-medium capitalize w-[150px] mt-2 text-center text-lg background-gradient text-white rounded-full"
          >
            <span className="text-xl font-bold">Sign up</span>
          </Link>
        </div>
        <img
          src="/Captura de tela 2025-02-12 160124.png"
          alt=""
          className="w-[950px] mx-auto rounded-3xl border border-border object-cover"
        />
      </div>
    </section>
  )
}
