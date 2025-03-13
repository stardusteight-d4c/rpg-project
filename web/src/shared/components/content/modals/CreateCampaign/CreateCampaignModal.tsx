"use client"

import ReactDOM from "react-dom"
import { useState } from "react"
import { useToast, useAuth, useCampaigns } from "@/shared/contexts"
import { Button, GlowingWrapper, ModalWrapper } from "@/shared/components/ui"
import { Check, FileX, Image, Panorama } from "@/shared/components/ui/icons"

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
              <Panorama />
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
                      <FileX />
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
                    <Image />
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
