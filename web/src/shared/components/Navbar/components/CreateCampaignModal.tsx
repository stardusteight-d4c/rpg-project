"use client"

import ReactDOM from "react-dom"
import { ModalWrapper } from "../../ModalWrapper"
import React from "react"
import { GlowingWrapper } from "../../GlowingWrapper"

export const CreateCampaignModal: React.FC<{
  status: "open" | "close"
  onStatusChange: (status: "close" | "open") => void
}> = ({ onStatusChange, status }) => {
  return ReactDOM.createPortal(
    <ModalWrapper onStatusChange={onStatusChange} status={status}>
      <div className="w-[700px] p-4">
        <h3 className="block text-3xl font-bold">Create Campaign</h3>
        <div className="mt-4 space-y-2">
          <GlowingWrapper inset="0" border="rounded-xl">
            <input
              name="name"
              placeholder="Name"
              spellCheck="false"
              // value={formData.email}
              // onChange={handleChange}
              className="py-1 px-2 w-full cursor-text hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-xl bg-ashes border border-border outline-none"
            />
          </GlowingWrapper>
          <GlowingWrapper inset="0" border="rounded-xl">
            <textarea
              name="description"
              placeholder="Description"
              spellCheck="false"
              // value={formData.password}
              // onChange={handleChange}
              className="py-1 px-2 w-full cursor-text h-[100px] hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-xl resize-none bg-ashes border border-border outline-none"
            />
          </GlowingWrapper>
          <div className="rounded-xl cursor-pointer h-[200px] bg-border w-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="52"
              height="52"
              fill="#9ca3af"
              viewBox="0 0 256 256"
            >
              <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z"></path>
            </svg>
          </div>
        </div>
      </div>
    </ModalWrapper>,
    document.body
  )
}
