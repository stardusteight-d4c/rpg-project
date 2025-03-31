import React from "react"

export const ToBottom: React.FC<{
  showButton: boolean
  scrollToBottom: () => void
}> = ({ showButton, scrollToBottom }) => {
  if (!showButton) return

  return (
    <button
      onClick={scrollToBottom}
      className="absolute z-40 bottom-[110px] left-1/2 -translate-x-1/2 bg-ashes text-white p-1 rounded-full border border-border shadow-md shadow-black/60"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="#FFFFFF"
        viewBox="0 0 256 256"
      >
        <path d="M205.66,149.66l-72,72a8,8,0,0,1-11.32,0l-72-72a8,8,0,0,1,11.32-11.32L120,196.69V40a8,8,0,0,1,16,0V196.69l58.34-58.35a8,8,0,0,1,11.32,11.32Z"></path>
      </svg>
    </button>
  )
}
