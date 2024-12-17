interface SenderProps {
  name: string
  characterUrl: string
}

export const Sender = ({ name, characterUrl }: SenderProps) => {
  return (
    <div className="flex pb-2 bg-background z-20 items-center gap-x-2">
      <img
        src={characterUrl}
        alt=""
        className="w-[48px] h-[48px] border border-border rounded"
      />
      <span className="block text-base font-bold">{name}</span>
    </div>
  )
}
