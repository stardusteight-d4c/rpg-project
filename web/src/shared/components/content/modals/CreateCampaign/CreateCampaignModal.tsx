"use client"
{
}
import ReactDOM from "react-dom"
import React, { useState } from "react"
import { useToast, useAuth, useCampaigns } from "@/shared/contexts"
import { Button, GlowingWrapper, ModalWrapper } from "@/shared/components/ui"
import { Check } from "@/shared/components/ui/icons"

export const CreateCampaignModal: React.FC<{
  status: boolean
  onStatusChange: (status: boolean) => void
}> = ({ onStatusChange, status }) => {
  const { currentSession } = useAuth()
  const { addToast } = useToast()
  const { add } = useCampaigns()
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

  function onRemoveCover() {
    setCampaignData({
      ...campaignData,
      file: undefined,
      coverUrl: undefined,
    })
  }

  async function onCreate() {
    await add({
      ...campaignData,
      owner: currentSession!,
    })
      .then(() => {
        addToast("The campaign has been created!", "success", 45)
      })
      .catch((error) => {
        addToast(error.message, "error", 45)
      })
      .finally(() => {
        setCampaignData({
          name: "",
          description: "",
          coverUrl: undefined,
          file: undefined,
        })
        onStatusChange(false)
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
    <ModalWrapper
      title="Create Campaign"
      onStatusChange={onStatusChange}
      status={status}
    >
      <div className="w-[700px]">
        <div className="py-2 px-4 sticky z-[200] border-b border-border shadow-md shadow-black/50 top-0 w-full inset-x-0 bg-background">
          <div className="flex items-center gap-x-4">
            <Button
              title="Change Cover Image"
              action={handleClick}
              variant="modal"
              bgColor="blue"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M241.75,51.32a15.88,15.88,0,0,0-13.86-2.77l-3.48.94C205.61,54.56,170.61,64,128,64S50.39,54.56,31.59,49.49l-3.48-.94A16,16,0,0,0,8,64V192a16,16,0,0,0,16,16,16.22,16.22,0,0,0,4.18-.55l3.18-.86C50.13,201.49,85.17,192,128,192s77.87,9.49,96.69,14.59l3.18.86A16,16,0,0,0,248,192V64A15.9,15.9,0,0,0,241.75,51.32ZM27.42,64.93C46.94,70.2,83.27,80,128,80s81.06-9.8,100.58-15.07L232,64V182.76l-58.07-58.07a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L24,141.37V64ZM213.84,187.21a391.22,391.22,0,0,0-49-9L142.63,156l20-20ZM27.13,191.14,24,192V164l52-52,64.25,64.25q-6-.24-12.25-.25C83,176,45.28,186.23,27.13,191.14ZM192,108a12,12,0,1,1,12,12A12,12,0,0,1,192,108Z"></path>
              </svg>
            </Button>

            <Button
              title="Create Campaign"
              action={onCreate}
              variant="modal"
              bgColor="green"
            >
              <Check />
            </Button>
          </div>
        </div>
        <div className="w-[700px] p-2">
          <div className="space-y-2">
            <div>
              <label
                htmlFor="name"
                className="text-gray-400 text-sm w-full block cursor-pointer"
              >
                Campaign Name
              </label>
              <GlowingWrapper inset="0" border="rounded-md">
                <input
                  id="name"
                  name="name"
                  placeholder="Name"
                  spellCheck="false"
                  value={campaignData.name}
                  onChange={handleChange}
                  className="py-1 px-2 w-full cursor-text hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-md bg-ashes border border-border outline-none"
                />
              </GlowingWrapper>
            </div>
            <div>
              <label
                htmlFor="description"
                className="text-gray-400 text-sm w-full block cursor-pointer"
              >
                Description
              </label>
              <GlowingWrapper inset="0" border="rounded-md">
                <textarea
                  id="description"
                  name="description"
                  placeholder="Description"
                  spellCheck="false"
                  value={campaignData.description}
                  onChange={handleChange}
                  className="py-1 px-2 w-full cursor-text h-[100px] hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-md resize-none bg-ashes border border-border outline-none"
                />
              </GlowingWrapper>
            </div>
            <div>
              <label
                htmlFor="campaign-file-input"
                className="text-gray-400 text-sm w-full block cursor-pointer"
              >
                Cover Image
              </label>
              {campaignData.coverUrl ? (
                <GlowingWrapper inset="0" border="rounded-md">
                  <div className="relative group cursor-pointer">
                    <button
                      onClick={onRemoveCover}
                      className="hidden absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 group-hover:block hover:bg-red-500 bg-background rounded-full p-1 cursor-pointer duration-300 ease-in-out transition-all shadow-md shadow-black/50 "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="#FFFFFF"
                        viewBox="0 0 256 256"
                      >
                        <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-42.34-82.34L139.31,152l18.35,18.34a8,8,0,0,1-11.32,11.32L128,163.31l-18.34,18.35a8,8,0,0,1-11.32-11.32L116.69,152,98.34,133.66a8,8,0,0,1,11.32-11.32L128,140.69l18.34-18.35a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </button>
                    <img
                      onClick={handleClick}
                      src={campaignData.coverUrl}
                      alt=""
                      className="rounded-md object-fill h-[200px] bg-ashes border border-border w-full flex items-center justify-center"
                    />
                  </div>
                </GlowingWrapper>
              ) : (
                <GlowingWrapper inset="0" border="rounded-md">
                  <div
                    onClick={handleClick}
                    className="rounded-md cursor-pointer h-[200px] bg-ashes border border-border w-full flex items-center justify-center"
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
                </GlowingWrapper>
              )}
            </div>
            <input
              id="campaign-file-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
    </ModalWrapper>,
    document.body
  )
}
