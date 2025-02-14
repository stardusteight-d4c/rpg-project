"use client"

import ReactDOM from "react-dom"
import { ModalWrapper } from "../../ModalWrapper"
import React, { useState } from "react"
import { GlowingWrapper } from "../../GlowingWrapper"
import { useCampaigns } from "@/shared/contexts/Campaigns/CampaignsContext"
import { currentSession } from "@/shared/contexts/Users/mock-data"

export const CreateCampaignModal: React.FC<{
  status: "open" | "close"
  onStatusChange: (status: "close" | "open") => void
}> = ({ onStatusChange, status }) => {
  const { addCampaign } = useCampaigns()
  const [campaignData, setCampaignData] = useState<{
    name: string
    description: string
    coverUrl: string | undefined
    file: File | undefined
  }>({
    name: "",
    description: "",
    coverUrl: undefined,
    file: undefined,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCampaignData({ ...campaignData, [e.target.name]: e.target.value })
  }

  function updateCampaignData(data: {
    key: keyof {
      name: string
      description: string
      coverUrl: string | undefined
      file: File | undefined
    }
    value: any
  }) {
    setCampaignData((prev) => ({
      ...prev,
      [data.key]: data.value,
    }))
  }

  function handleClick() {
    const fileInput = document.getElementById(
      "campaign-file-input"
    ) as HTMLInputElement
    if (fileInput) {
      fileInput.click()
    }
  }

  const onCreate = async () => {
    addCampaign({
      ...campaignData,
      createdBy: currentSession,
    })
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      const tempUrl = URL.createObjectURL(file)
      updateCampaignData({ key: "file", value: file })
      setCampaignData((prevData) => ({
        ...prevData,
        coverUrl: tempUrl,
      }))
    }
  }

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
              value={campaignData.name}
              onChange={handleChange}
              className="py-1 px-2 w-full cursor-text hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-xl bg-ashes border border-border outline-none"
            />
          </GlowingWrapper>
          <GlowingWrapper inset="0" border="rounded-xl">
            <textarea
              name="description"
              placeholder="Description"
              spellCheck="false"
              value={campaignData.description}
              onChange={handleChange}
              className="py-1 px-2 w-full cursor-text h-[100px] hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-xl resize-none bg-ashes border border-border outline-none"
            />
          </GlowingWrapper>
          {campaignData.coverUrl ? (
            <img
              src={campaignData.coverUrl}
              alt=""
              className="rounded-xl object-fill cursor-pointer h-[200px] bg-border w-full flex items-center justify-center"
            />
          ) : (
            <div
              onClick={handleClick}
              className="rounded-xl cursor-pointer h-[200px] bg-border w-full flex items-center justify-center"
            >
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
          )}
          <input
            id="campaign-file-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            onClick={onCreate}
            className="p-2 font-medium capitalize w-full text-center text-lg bg-blue-500 text-white rounded-full"
          >
            <span className="text-xl font-bold">Create</span>
          </button>
        </div>
      </div>
    </ModalWrapper>,
    document.body
  )
}
