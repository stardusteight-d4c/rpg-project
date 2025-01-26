import { Board } from "../components"

export function renderingActiveSection(active: MenuItem) {
  return (
    <div className="w-full">
      {active === "map" && <Board.Map />}
      {active === "characters" && <Board.Characters />}
      {active === "handouts" && <Board.Handouts />}
      {active === "chat" && <Board.Chat />}
      {active === "notifications" && <Board.Notifications />}
      {active === "cam" && <Board.Cam />}
    </div>
  )
}
