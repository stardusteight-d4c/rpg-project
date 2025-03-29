import { Components } from "./components"

export const Main: React.FC<{ active: MenuItem }> = ({ active }) => {
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
