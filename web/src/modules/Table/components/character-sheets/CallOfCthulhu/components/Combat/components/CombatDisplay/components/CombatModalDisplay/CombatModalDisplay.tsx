import { ModalWrapper } from "@/shared/components"

interface CombatModalDisplayProps {
  handleOnStatusChange: (status: boolean) => void
  selectedWeapon: Weapon | Gun | Explosive
}

export const CombatModalDisplay = ({
  handleOnStatusChange,
  selectedWeapon,
}: CombatModalDisplayProps) => {
  return (
    <ModalWrapper
      onStatusChange={handleOnStatusChange}
      status={selectedWeapon ? true : false}
    >
      <div className="p-4 w-[681px]">
        <div className="flex items-center gap-x-2">
          <div className="w-[80px] h-[80px] bg-border/50 border border-border flex items-center justify-center rounded aspect-square">
            <div
              style={{
                background: "linear-gradient(to right, #42d392, #8B5CF6)",
                WebkitMaskImage: `url(${selectedWeapon.iconUrl})`,
                WebkitMaskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskImage: `url(${selectedWeapon.iconUrl})`,
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "center",
              }}
              className="relative z-20 w-[80px] h-[80px]"
            ></div>
          </div>
          <span className="text-2xl background-gradient text-transparent bg-clip-text font-medium">
            {selectedWeapon.name}
          </span>
        </div>
        <div className="py-2">
          <span className="text-gray-400">{selectedWeapon.description}</span>
        </div>
        <table className="w-full table-auto ">
          <thead>
            <tr className="grid grid-cols-6 justify-between overflow-hidden rounded-t-md w-full border border-border">
              <th className="col-span-1 border-r border-border p-2 text-xl">
                Skill
              </th>
              <th className="col-span-1 border-r border-border p-2 text-xl">
                Damage
              </th>
              <th className="col-span-1 border-r border-border p-2 text-xl">
                Range
              </th>
              <th className="col-span-1 border-r border-border p-2 text-xl">
                Attacks
              </th>
              <th className="col-span-1 border-r border-border p-2 text-xl">
                Ammo
              </th>
              <th className="col-span-1 p-2 text-xl">Malf</th>
            </tr>
          </thead>
          <tbody>
            <tr className="grid border-x border-b rounded-b-md border-border grid-cols-6 justify-between w-full">
              <td
                className={
                  "border-r border-border col-span-1 p-2 flex items-center justify-center w-full"
                }
              >
                {selectedWeapon.skill}
              </td>
              <td
                className={
                  "border-r border-border col-span-1 p-2 flex items-center justify-center w-full"
                }
              >
                {selectedWeapon.damage}
              </td>
              <td
                className={
                  "border-r border-border col-span-1 p-2 flex items-center justify-center w-full"
                }
              >
                {selectedWeapon.range}
              </td>
              <td
                className={
                  "border-r border-border col-span-1 p-2 flex items-center justify-center w-full"
                }
              >
                {selectedWeapon.attacks}
              </td>
              <td
                className={
                  "border-r border-border col-span-1 p-2 flex items-center justify-center w-full"
                }
              >
                {selectedWeapon.ammo ? selectedWeapon.ammo : "-"}
              </td>
              <td
                className={
                  "col-span-1 border-border p-2 flex items-center justify-center w-full"
                }
              >
                {selectedWeapon.malfunction ? selectedWeapon.malfunction : "-"}
              </td>
            </tr>
          </tbody>
        </table>
        <ul className="mt-2">
          {selectedWeapon.properties.map((property) => (
            <li className="text-gray-400 text-sm list-disc ml-4">{property}</li>
          ))}
        </ul>
      </div>
    </ModalWrapper>
  )
}
