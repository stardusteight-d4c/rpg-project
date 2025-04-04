import React, { Fragment } from "react"
import { UserAvatar } from "@/shared/components/content"
import { Button, Tooltip } from "@/shared/components/ui"
import {
  AddressBook,
  ArticleNyTimes,
  Bell,
  ChatCircleDots,
  CompassRose,
  Globe,
  Waveform,
} from "@/shared/components/ui/icons"
import { useAuth } from "@/shared/contexts/Auth/AuthContext"

export const Menu: React.FC<{
  active: MenuItem
  onActive: (value: MenuItem) => void
}> = ({ active, onActive }) => {
  const { currentSession } = useAuth()

  if (!currentSession) return

  return (
    <div className="w-fit relative p-2 max-w-[58px] border-x border-border min-w-[58px] h-screen">
      <div className="flex flex-col items-center gap-y-4">
        <Tooltip text="Map" variant position="right">
          <Button
            title="Map"
            bgColor="gradientBlue"
            active={active === "map"}
            variant="icon"
            shadow={false}
            action={() => onActive("map")}
          >
            <CompassRose />
          </Button>
        </Tooltip>
        <Tooltip text="Sheets" variant position="right">
          <Button
            title="sheets"
            bgColor="gradientBlue"
            active={active === "sheets"}
            variant="icon"
            shadow={false}
            action={() => onActive("sheets")}
          >
            <AddressBook />
          </Button>
        </Tooltip>

        {true && (
          <Fragment>
            <Tooltip text="Handouts" variant position="right">
              <Button
                title="handouts"
                bgColor="gradientBlue"
                active={active === "handouts"}
                variant="icon"
                shadow={false}
                action={() => onActive("handouts")}
              >
                <ArticleNyTimes />
              </Button>
            </Tooltip>
            <Tooltip text="Sounds" variant position="right">
              <Button
                title="sounds"
                bgColor="gradientBlue"
                active={active === "sounds"}
                variant="icon"
                shadow={false}
                action={() => onActive("sounds")}
              >
                <Waveform />
              </Button>
            </Tooltip>
          </Fragment>
        )}

        <Tooltip text="Chat" variant position="right">
          <Button
            title="chat"
            bgColor="gradientBlue"
            active={active === "chat"}
            variant="icon"
            shadow={false}
            action={() => onActive("chat")}
          >
            <ChatCircleDots />
          </Button>
        </Tooltip>
        <Tooltip text="Connect" variant position="right">
          <Button
            title="connect"
            bgColor="gradientBlue"
            active={active === "connect"}
            variant="icon"
            shadow={false}
            action={() => onActive("connect")}
          >
            <Globe />
          </Button>
        </Tooltip>
        <Tooltip text="Notifications" variant position="right">
          <Button
            title="notifications"
            bgColor="gradientBlue"
            active={active === "notifications"}
            variant="icon"
            shadow={false}
            action={() => onActive("notifications")}
          >
            <Bell />
          </Button>
        </Tooltip>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <UserAvatar
          avatarUrl={currentSession.avatarUrl}
          username={currentSession.username}
          name={currentSession.name}
          size={40}
        />
      </div>
    </div>
  )
}
