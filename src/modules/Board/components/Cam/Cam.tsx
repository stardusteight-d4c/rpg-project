import Image from "next/image"

export const Cam = () => {
  return (
    <div className="flex flex-col max-h-screen overflow-y-scroll no-scrollbar p-2 items-center gap-2">
      <div className="w-full">
        <Image
          src="/01.png"
          width={500}
          height={250}
          alt=""
          className="w-full object-cover rounded border border-border cursor-pointer"
        />
      </div>
      <div className="grid grid-cols-3 gap-2 items-center justify-center">
        <Image
          src="/02.png"
          width={250}
          height={100}
          alt=""
          className="col-span-1 w-full h-full object-cover rounded border border-border cursor-pointer"
        />
        <Image
          src="/03.png"
          width={250}
          height={100}
          alt=""
          className="col-span-1 w-full h-full object-cover rounded border border-border cursor-pointer"
        />
        <Image
          src="/01.png"
          width={500}
          height={250}
          alt=""
          className="col-span-1 w-full h-full object-cover rounded border border-border cursor-pointer"
        />
        <Image
          src="/01.png"
          width={500}
          height={250}
          alt=""
          className="col-span-1 w-full h-full object-cover rounded border border-border cursor-pointer"
        />
        <Image
          src="/02.png"
          width={250}
          height={100}
          alt=""
          className="col-span-1 w-full h-full object-cover rounded border border-border cursor-pointer"
        />
        <Image
          src="/03.png"
          width={250}
          height={100}
          alt=""
          className="col-span-1 w-full h-full object-cover rounded border border-border cursor-pointer"
        />
      </div>
    </div>
  )
}
