interface SenderProps {
  name: string
  characterUrl: string
}

export const Sender = ({ name, characterUrl }: SenderProps) => {
  return (
    <div className="flex pb-2 select-none bg-background z-20 items-center gap-x-2">
      <img
        src={characterUrl}
        alt=""
        className="w-[48px] object-cover select-none pointer-events-none h-[48px] border border-border rounded-full"
      />
      <span className="block text-lg font-bold -tracking-wide">{name}</span>
    </div>
  )
}
