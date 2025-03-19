"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth, useCampaigns, usePosts, useToast } from "@/shared/contexts"
import { DeleteContentModal } from "@/shared/components/content/modals"
import { Button, GlowingWrapper, ModalWrapper } from "@/shared/components/ui"
import { Check, Panorama, Trash } from "@/shared/components/ui/icons"

export const EditCampaignModal: React.FC<{
  status: boolean
  onStatusChange: (value: boolean) => void
  campaign: ICampaign
}> = ({ onStatusChange, status, campaign }) => {
  const { push } = useRouter()
  const { currentSession } = useAuth()
  const { addToast } = useToast()
  const { update, remove } = useCampaigns()
  const { updateLocalPostsOnEditCampaign } = usePosts()
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [campaignData, setCampaignData] = useState<
    ICampaign & {
      file: File | undefined
    }
  >({
    ...campaign,
    file: undefined,
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
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

  async function onEdit() {
    await update({
      ...campaignData,
      id: campaign.id,
    })
      .then(() => {
        updateLocalPostsOnEditCampaign(campaign.id, campaignData)
        addToast("The campaign has been updated!", "success", 45)
      })
      .catch((error) => {
        addToast(error.message, "error", 45)
      })
      .finally(() => {
        onStatusChange(false)
      })
  }

  async function onDelete() {
    await remove(campaign.id)
      .then(() => {
        addToast("The campaign has been deleted!", "success", 45)
      })
      .catch((error) => {
        addToast(error.message, "error", 45)
      })
      .finally(() => {
        push(`/profile/${currentSession?.username}`)
        setOpenDeleteModal(false)
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

  return (
    <ModalWrapper
      title="Editing Campaign"
      onStatusChange={onStatusChange}
      status={status}
    >
      <DeleteContentModal
        status={openDeleteModal}
        onStatusChange={setOpenDeleteModal}
        action={onDelete}
        text={`You are about to delete your campaign (${campaign.name}). This action cannot be undone!`}
      />
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
            title="Delete Campaign"
            action={() => setOpenDeleteModal(true)}
            variant="modal"
            bgColor="red"
          >
            <Trash />
          </Button>
          <Button
            title="Save Changes"
            action={onEdit}
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
              <div className="relative group">
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
                  src={campaignData.coverUrl}
                  alt=""
                  className="rounded-md object-fill h-[200px] bg-ashes border border-border w-full flex items-center justify-center"
                />
              </div>
            ) : (
              <div className="rounded-md h-[200px] bg-ashes border border-border w-full flex items-center justify-center">
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
    </ModalWrapper>
  )
}
