import { DataFetcher } from "@/shared/components/ui"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center p-4">
      <div className="relative mt-[100px]">
        <div className="absolute text-[80px] floating-p font-bold w-fit z-50 left-[55px] -top-[110px]">
          4
        </div>
        <DataFetcher />
        <div className="absolute text-[80px] floating-p font-bold w-fit z-50 right-[55px] -top-[110px]">
          4
        </div>
      </div>
      <p className="text-sm">
        You have lost yourself in the depths of the unknown...
      </p>
      <p className="text-sm">
        What you are looking for does not exist... or perhaps it never existed.
      </p>
      <Link
        href="/"
        className="cursor-pointer mt-4 w-fit flex items-center group gap-x-2"
      >
        <div className="background-gradient flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 group-hover:brightness-125 duration-300 ease-in-out transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#FFFFFF"
            viewBox="0 0 256 256"
          >
            <path d="M248,124a56.11,56.11,0,0,0-32-50.61V72a48,48,0,0,0-88-26.49A48,48,0,0,0,40,72v1.39a56,56,0,0,0,0,101.2V176a48,48,0,0,0,88,26.49A48,48,0,0,0,216,176v-1.41A56.09,56.09,0,0,0,248,124ZM88,208a32,32,0,0,1-31.81-28.56A55.87,55.87,0,0,0,64,180h8a8,8,0,0,0,0-16H64A40,40,0,0,1,50.67,86.27,8,8,0,0,0,56,78.73V72a32,32,0,0,1,64,0v68.26A47.8,47.8,0,0,0,88,128a8,8,0,0,0,0,16,32,32,0,0,1,0,64Zm104-44h-8a8,8,0,0,0,0,16h8a55.87,55.87,0,0,0,7.81-.56A32,32,0,1,1,168,144a8,8,0,0,0,0-16,47.8,47.8,0,0,0-32,12.26V72a32,32,0,0,1,64,0v6.73a8,8,0,0,0,5.33,7.54A40,40,0,0,1,192,164Zm16-52a8,8,0,0,1-8,8h-4a36,36,0,0,1-36-36V80a8,8,0,0,1,16,0v4a20,20,0,0,0,20,20h4A8,8,0,0,1,208,112ZM60,120H56a8,8,0,0,1,0-16h4A20,20,0,0,0,80,84V80a8,8,0,0,1,16,0v4A36,36,0,0,1,60,120Z"></path>
          </svg>
        </div>
        <span>Return to Sanity</span>
      </Link>
    </div>
  )
}
