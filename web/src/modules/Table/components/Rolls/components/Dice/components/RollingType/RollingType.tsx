interface RollingTypeProps {
  mode: "system" | "character" | null
  setMode: (value: "system" | "character" | null) => void
}

export const RollingType = ({ setMode, mode }: RollingTypeProps) => {
  if (mode !== null) return null

  return (
    <div className="flex gap-x-2">
      <button
        className="p-2 w-full text-center text-lg bg-border text-white rounded-xl border-border border"
        onClick={() => setMode("system")}
      >
        System Rolling
      </button>
      <button
        className="p-2 w-full text-center text-lg bg-border text-white rounded-xl border-border border"
        onClick={() => setMode("character")}
      >
        Character Rolling
      </button>
    </div>
  )
}
