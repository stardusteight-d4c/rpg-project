import { Board } from ".."

interface ActiveSectionProps {
  active: MenuItem
}

export const ActiveSection = ({ active }: ActiveSectionProps) => {
  function renderingActiveSection(active: MenuItem) {
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

  return renderingActiveSection(active)
}
