import Image from "next/image"

export const Cam = () => {
  return (
    <div className="flex flex-col p-2 items-center justify-center gap-2">
      <div className="w-full">
        <Image
          src="/01.png"
          width={500}
          height={250}
          alt=""
          className="w-full object-cover rounded-2xl"
        />
      </div>
      <div className="grid grid-cols-3 gap-2 items-center justify-center">
        <Image
          src="/02.png"
          width={250}
          height={100}
          alt=""
          className="col-span-1 rounded-2xl"
        />
        <Image
          src="/03.png"
          width={250}
          height={100}
          alt=""
          className="col-span-1 rounded-2xl"
        />
        <Image
          src="/01.png"
          width={500}
          height={250}
          alt=""
          className="w-full object-cover rounded-2xl"
        />
      </div>
    </div>
  )
}
