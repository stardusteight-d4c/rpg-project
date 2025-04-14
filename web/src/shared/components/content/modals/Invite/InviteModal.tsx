"use client"

import { Fragment, useState } from "react"

import { Button, ModalWrapper, Tooltip } from "@/shared/components/ui"
import { Check, CopySimple, Key } from "@/shared/components/ui/icons"
import { useCampaigns, useToast } from "@/shared/contexts"
import { generateKey } from "@/shared/utils"

export const InviteModal: React.FC<{
  campaign: ICampaign
  status: boolean
  onStatusChange: (value: boolean) => void
}> = ({ campaign, status, onStatusChange }) => {
  const { addToast } = useToast()
  const { update } = useCampaigns()
  const campaignKey = campaign.key
    ? String(campaign.key)
        .split("")
        .map((ctr) => Number(ctr))
    : undefined
  const [key, setKey] = useState<number[] | undefined>(campaignKey)

  const getRandomKey = () => {
    setKey(generateKey())
  }

  const copyToClipboard = () => {
    if (!key) return
    const keytext = key.join("")
    navigator.clipboard.writeText(keytext)
    addToast("Copied to clipboard!", "success", 45)
  }

  const onSave = async () => {
    if (!key) return
    return update({ id: campaign.id, key: Number(key.join("")) })
      .then(() => {
        if (campaign.key) {
          addToast("Key has been changed!", "success", 45)
        } else {
          addToast("Key has been created!", "success", 45)
        }
      })
      .catch((error) => addToast(error.message, "error", 45))
      .finally(() => onStatusChange(false))
  }

  return (
    <ModalWrapper
      title="Invite a player"
      status={status}
      onStatusChange={onStatusChange}
    >
      <div className="py-2 px-4 sticky z-[200] border-b border-border shadow-md shadow-black/50 top-0 w-full inset-x-0 bg-background">
        <div className="flex items-center gap-x-4">
          <Button
            action={getRandomKey}
            title={`${key ? "Change Key" : "Generate Key"}`}
            bgColor="gradientPurple"
            variant="modal"
          >
            <Key />
          </Button>
          <Button
            action={onSave}
            title={`${campaign.key ? "Update Key" : "Create Key"}`}
            bgColor={`${campaign.key ? "blue" : "green"}`}
            variant="modal"
          >
            <Check />
          </Button>
        </div>
      </div>
      <div className="w-[700px] p-2 my-4 flex items-center flex-col justify-center">
        <div className="grid grid-cols-7 items-center justify-center w-fit gap-x-2 my-2">
          {key ? (
            <Fragment>
              {key.map((item, index) => (
                <div
                  key={index}
                  className="col-span-1 w-[40px] aspect-square rounded-md bg-border shadow-md shadow-black/50 text-2xl font-bold flex items-center justify-center"
                >
                  <span className="background-gradient bg-clip-text text-transparent w-fit block">
                    {item}
                  </span>
                </div>
              ))}
            </Fragment>
          ) : (
            <Fragment>
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="col-span-1 w-[40px] aspect-square rounded-md bg-border shadow-md shadow-black/50 text-2xl font-bold flex items-center justify-center"
                />
              ))}
            </Fragment>
          )}

          {key && (
            <Tooltip position="right" text="Copy to clipboard" variant>
              <div
                onClick={copyToClipboard}
                className="col-span-1 hover:brightness-125 transition-all duration-300 ease-in-out cursor-pointer text-gray-500 w-fit aspect-square rounded-md text-2xl font-bold"
              >
                <CopySimple />
              </div>
            </Tooltip>
          )}
        </div>
        <span className="text-gray-400 text-center -ml-[35px] w-fit leading-4 text-sm block cursor-pointer">
          Use this code to invite friends
        </span>
      </div>
    </ModalWrapper>
  )
}
