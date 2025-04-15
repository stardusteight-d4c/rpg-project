"use client"

import { ChangeEvent, useState } from "react"

import { Button, ModalWrapper, Tooltip } from "@/shared/components/ui"
import { ClipboardText, LockKeyOpen } from "@/shared/components/ui/icons"
import { useAuth, useCampaigns, useToast } from "@/shared/contexts"

export const JoinModal: React.FC<{
  campaign: ICampaign
  status: boolean
  onStatusChange: (value: boolean) => void
}> = ({ campaign, status, onStatusChange }) => {
  const { addToast } = useToast()
  const { join } = useCampaigns()
  const { currentSession } = useAuth()
  const [key, setKey] = useState<number[]>([NaN, NaN, NaN, NaN, NaN, NaN])

  const onKeyChange = (
    e: ChangeEvent<HTMLInputElement>,
    indexInput: number
  ) => {
    const inputValue = e.target.value
    const copyKey = [...key]

    const lastDigit = inputValue.match(/\d$/)?.[0]

    if (lastDigit !== undefined) {
      copyKey[indexInput] = Number(lastDigit)
      setKey(copyKey)

      const nextInput = document.getElementById(`input-${indexInput + 1}`)
      if (nextInput) {
        ;(nextInput as HTMLInputElement).focus()
      }
    } else if (inputValue === "") {
      copyKey[indexInput] = NaN
      setKey(copyKey)
    }
  }

  const onKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    indexInput: number
  ) => {
    if (e.key === "Backspace") {
      const copyKey = [...key]

      if (!key[indexInput] && indexInput > 0) {
        copyKey[indexInput - 1] = NaN
        setKey(copyKey)

        const prevInput = document.getElementById(`input-${indexInput - 1}`)
        if (prevInput) {
          ;(prevInput as HTMLInputElement).focus()
        }

        e.preventDefault()
      }
    }
  }

  const pasteKey = async () => {
    const pastedKey = await navigator.clipboard.readText()
    if (
      pastedKey.length === 6 &&
      /^\d+$/.test(pastedKey) &&
      pastedKey
        .split("")
        .every((digit) => Number(digit) >= 0 && Number(digit) <= 9)
    ) {
      setKey(pastedKey.split("").map((value) => Number(value)))
      addToast("The key has been inserted!", "success", 45)
    } else {
      addToast("Invalid key!", "error", 45)
    }
  }

  const onJoin = async () => {
    if (!key) return
    return join({
      campaignId: campaign.id,
      campaignKey: Number(key.join("")),
      newPlayer: currentSession!,
    })
      .then(() => {
        addToast("You have successfully joined the campaign.", "success", 45)
      })
      .catch((error) => addToast(error.message, "error", 45))
      .finally(() => onStatusChange(false))
  }

  return (
    <ModalWrapper
      title="Join the campaign"
      status={status}
      onStatusChange={onStatusChange}
    >
      <div className="py-2 px-4 sticky z-[200] border-b border-border shadow-md shadow-black/50 top-0 w-full inset-x-0 bg-background">
        <div className="flex items-center gap-x-4">
          <Button action={onJoin} title="Join" bgColor="green" variant="modal">
            <LockKeyOpen />
          </Button>
        </div>
      </div>
      <div className="w-[700px] p-2 my-4 flex items-center flex-col justify-center">
        <div className="grid grid-cols-7 items-center justify-center w-fit gap-x-2 my-2">
          {key.map((digit, index) => (
            <div
              key={index}
              className="col-span-1 flex items-center justify-center w-[40px] aspect-square rounded-md bg-border shadow-md shadow-black/50 overflow-hidden"
            >
              <input
                id={`input-${index}`}
                type="text"
                maxLength={2}
                value={isNaN(digit) ? "" : digit}
                onChange={(e) => onKeyChange(e, index)}
                onKeyDown={(e) => onKeyDown(e, index)}
                inputMode="numeric"
                pattern="[0-9]*"
                className="background-gradient caret-white bg-clip-text text-transparent outline-none text-center w-[40px] text-2xl font-bold flex items-center justify-center"
              ></input>
            </div>
          ))}
          <Tooltip position="right" text="Paste key" variant>
            <div
              onClick={pasteKey}
              className="col-span-1 hover:brightness-125 transition-all duration-300 ease-in-out cursor-pointer text-gray-500 w-fit aspect-square rounded-md text-2xl font-bold"
            >
              <ClipboardText />
            </div>
          </Tooltip>
        </div>
        <span className="text-gray-400 text-center -ml-[35px] w-fit leading-4 text-sm block cursor-default select-none">
          Use this code to invite friends
        </span>
      </div>
    </ModalWrapper>
  )
}
