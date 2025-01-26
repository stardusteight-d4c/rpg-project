export function handleCharacterTooltipText(type: "player" | "npc" | "enemy") {
  if (type === "player") return "Player"
  if (type === "npc") return "NPC"
  if (type === "enemy") return "Enemy"
}
