"use client"

import React, { useState } from "react"
import { DeleteContentModal } from "@/shared/components/content/modals"
import {
  Button,
  GradientSVGWrapper,
  ModalWrapper,
} from "@/shared/components/ui"

import { CrownSimple, UserMinus, XCircle } from "@/shared/components/ui/icons"

import { UserAvatar } from "../../UserAvatar"
import { useCampaigns, useToast } from "@/shared/contexts"

export const ManagePlayersModal: React.FC<{
  status: boolean
  onStatusChange: (value: boolean) => void
  campaign: ICampaign
}> = ({ onStatusChange, status, campaign }) => {
  const { kick } = useCampaigns()
  const { addToast } = useToast()
  const [handleKickPlayer, setHandleKickPlayer] = useState<{
    isOpenModal: boolean
    selectedPlayer?: IUser
  }>({
    isOpenModal: false,
    selectedPlayer: undefined,
  })

  const onKickPlayer = async () => {
    const { selectedPlayer } = handleKickPlayer
    if (!selectedPlayer) return
    return kick({
      campaignId: campaign.id,
      playerId: selectedPlayer.id,
    })
      .then(() => {
        addToast(
          `${selectedPlayer.name} was kicked out of the campaign.`,
          "success",
          45
        )
      })
      .catch((error) => addToast(error.message, "error", 45))
  }

  return (
    <ModalWrapper
      title="Manage Players"
      onStatusChange={onStatusChange}
      status={status}
    >
      <DeleteContentModal
        status={handleKickPlayer.isOpenModal}
        onStatusChange={(value: boolean) =>
          setHandleKickPlayer((prev) => ({
            isOpenModal: value,
            selectedPlayer: prev.selectedPlayer,
          }))
        }
        action={onKickPlayer}
        text={`Are you sure about kicking Gabriel Sena from your campaign? This action cannot be undone!`}
      />
      <div className="border-b pb-2 -mt-2 border-border shadow-md shadow-black/50  w-full z-[200] bg-background"></div>
      <div className="w-[700px] space-y-2 p-2">
        {campaign.players.map((player) => (
          <div className="flex items-center justify-between">
            <div className="col-span-1 flex select-none z-20 items-center gap-x-2">
              <UserAvatar
                name={player.name}
                username={player.username}
                avatarUrl={player.avatarUrl}
              />
              <div className="flex flex-col">
                <span className="flex items-center gap-x-2 text-lg font-bold -tracking-wide">
                  {player.name}{" "}
                  {player.id === campaign.owner.id && (
                    <GradientSVGWrapper size={18}>
                      <CrownSimple />
                    </GradientSVGWrapper>
                  )}
                </span>
                <span className="text-gray-400 -mt-2 block text-sm">
                  #{player.username}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <Button
                title="Make Dungeon Master"
                variant="icon"
                bgColor="gradientBlue"
                action={() => {}}
                className="!w-[32px] !h-[32px] !aspect-square"
              >
                <CrownSimple />
              </Button>

              <Button
                title="Kick Player"
                variant="icon"
                bgColor="red"
                action={() =>
                  setHandleKickPlayer({
                    isOpenModal: true,
                    selectedPlayer: player,
                  })
                }
                className="!w-[32px] !h-[32px] !aspect-square"
              >
                <UserMinus />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </ModalWrapper>
  )
}
