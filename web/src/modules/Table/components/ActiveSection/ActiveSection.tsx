import { Components } from "./components"

interface ActiveSectionProps {
  active: MenuItem
}

export const ActiveSection = ({ active }: ActiveSectionProps) => {
  function renderingActiveSection(active: MenuItem) {
    return (
      <div className="w-full">
        {active === "map" && <Components.Map />}
        {active === "sheets" && <Components.Sheets />}
        {active === "handouts" && <Components.Handouts />}
        {active === "chat" && <Components.Chat />}
        {active === "notifications" && <Components.Notifications />}
        {active === "cam" && <Components.Cam />}
        {active === "sounds" && <Components.SoundPad />}
      </div>
    )
  }

  return renderingActiveSection(active)
}
