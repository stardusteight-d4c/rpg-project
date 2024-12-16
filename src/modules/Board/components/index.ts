import { Cam } from "./Cam"
import { CallOfCthulhu } from "./character-sheets"
import { Chat } from "./Chat"
import { Map } from "./Map"
import { Dice } from "./Dice"
import { Characters } from "./Characters"

export const Board = {
  Chat,
  Map,
  Cam,
  Dice,
  CharactersSheets: { CallOfCthulhu },
  Characters,
}
