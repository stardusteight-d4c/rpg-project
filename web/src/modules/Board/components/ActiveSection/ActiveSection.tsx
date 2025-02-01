import { Cam } from "../Cam"
import { Characters } from "../Characters"
import { Chat } from "../Chat"
import { Handouts } from "../Handouts"
import { Map } from "../Map"
import { Notifications } from "../Notifications"
import { Sounds } from "../Sounds"

interface ActiveSectionProps {
  active: MenuItem
}

export const ActiveSection = ({ active }: ActiveSectionProps) => {
  function renderingActiveSection(active: MenuItem) {
    return (
      <div className="w-full">
        {active === "map" && <Map />}
        {active === "characters" && <Characters />}
        {active === "handouts" && <Handouts />}
        {active === "chat" && <Chat />}
        {active === "notifications" && <Notifications />}
        {active === "cam" && <Cam />}
        {active === "sounds" && <Sounds />}
      </div>
    )
  }

  return renderingActiveSection(active)
}
