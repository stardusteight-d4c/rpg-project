import Image from "next/image"

export const Cam = () => {
  return (
    <div className="flex flex-col w-full select-none max-h-screen overflow-y-scroll no-scrollbar items-center">
      <div className="w-[550px] h-screen flex items-center justify-center flex-col relative">
        <Image
          src="/01.png"
          width={500}
          height={250}
          alt=""
          className="w-full rounded-md pointer-events-none object-cover cursor-pointer"
        />
        <div className="grid grid-cols-3 gap-[8px] mt-[8px] w-full items-center justify-center">
          <Image
            src="/02.png"
            width={250}
            height={100}
            alt=""
            className="col-span-1 pointer-events-none rounded-md w-full h-full object-cover cursor-pointer"
          />
          <Image
            src="/03.png"
            width={250}
            height={100}
            alt=""
            className="col-span-1 pointer-events-none rounded-md w-full h-full object-cover cursor-pointer"
          />
          <Image
            src="/01.png"
            width={500}
            height={250}
            alt=""
            className="col-span-1 pointer-events-none rounded-md w-full h-full object-cover cursor-pointer"
          />
          <Image
            src="/01.png"
            width={500}
            height={250}
            alt=""
            className="col-span-1 pointer-events-none rounded-md w-full h-full object-cover cursor-pointer"
          />
          <Image
            src="/02.png"
            width={250}
            height={100}
            alt=""
            className="col-span-1 pointer-events-none rounded-md w-full h-full object-cover cursor-pointer"
          />
          <Image
            src="/03.png"
            width={250}
            height={100}
            alt=""
            className="col-span-1 pointer-events-none rounded-md w-full h-full object-cover cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}
