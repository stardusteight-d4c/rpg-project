interface BackButtonProps {
  mode: "system" | "character" | null

  setMode: (value: "system" | "character" | null) => void
}

export const BackButton = ({ mode, setMode }: BackButtonProps) => {
  if (mode === null) return null

  return (
    <button
      className="p-2 w-full hover:brightness-125 font-medium text-center text-lg bg-border text-white rounded-xl border-border border"
      onClick={() => {
        setMode(null)
      }}
    >
      Back
    </button>
  )
}
