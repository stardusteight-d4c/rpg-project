"use client"

import { GlowingWrapper, ModalWrapper } from "@/shared/components"
import { useState } from "react"

interface CombatEditModalProps {
  handleOnStatusChange: (status: boolean) => void
  selectedWeapon: CombatItem
  onRemoveItem: (removedWeapon: CombatItem) => void
  onUpdateWeapon: (updatedWeapon: CombatItem) => void
}

export const CombatEditModal = ({
  handleOnStatusChange,
  selectedWeapon,
  onRemoveItem,
  onUpdateWeapon,
}: CombatEditModalProps) => {
  const [editableWeapon, setEditableWeapon] =
    useState<CombatItem>(selectedWeapon)

  const handleEdit = (field: string, value: any) => {
    setEditableWeapon((prev) => ({ ...prev, [field]: value }))
  }

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
              <GlowingWrapper>
                <input
                  value={editableWeapon.damage ?? ""}
                  placeholder="-"
                  onChange={(e) => handleEdit("damage", e.target.value)}
                  className={
                    "border-r border-border text-center bg-background w-full h-full col-span-1 p-2 flex items-center justify-center outline-none"
                  }
                />
              </GlowingWrapper>
              <GlowingWrapper>
                <input
                  value={editableWeapon.range ?? ""}
                  placeholder="-"
                  onChange={(e) => handleEdit("range", e.target.value)}
                  className={
                    "border-r border-border text-center bg-background w-full h-full col-span-1 p-2 flex items-center justify-center outline-none"
                  }
                />
              </GlowingWrapper>
              <GlowingWrapper>
                <input
                  value={editableWeapon.attacks ?? ""}
                  placeholder="-"
                  onChange={(e) => handleEdit("attacks", e.target.value)}
                  className={
                    "border-r border-border text-center bg-background w-full h-full col-span-1 p-2 flex items-center justify-center outline-none"
                  }
                />
              </GlowingWrapper>
              <GlowingWrapper>
                <input
                  value={editableWeapon.ammo ?? ""}
                  placeholder="-"
                  onChange={(e) => handleEdit("ammo", e.target.value)}
                  className={
                    "border-r border-border text-center bg-background w-full h-full col-span-1 p-2 flex items-center justify-center outline-none"
                  }
                />
              </GlowingWrapper>
              <GlowingWrapper>
                <input
                  value={editableWeapon.malfunction ?? ""}
                  placeholder="-"
                  onChange={(e) => handleEdit("malfunction", e.target.value)}
                  className={
                    "border-r border-border text-center bg-background w-full h-full col-span-1 p-2 flex items-center justify-center outline-none"
                  }
                />
              </GlowingWrapper>
            </tr>
          </tbody>
        </table>
        <ul className="mt-2">
          {selectedWeapon.properties.map((property) => (
            <li className="text-gray-400 text-sm list-disc ml-4">{property}</li>
          ))}
        </ul>
        <button
          onClick={() => {
            onUpdateWeapon(editableWeapon)
            handleOnStatusChange(false)
          }}
          className="p-2 mt-4 w-full hover:brightness-125 font-medium text-center text-lg background-gradient text-white rounded"
        >
          Update
        </button>
        {selectedWeapon.name !== "Unarmed" && (
          <button
            onClick={() => {
              onRemoveItem(editableWeapon)
              handleOnStatusChange(false)
            }}
            className="p-2 mt-2 w-full hover:brightness-125 font-medium text-center text-lg bg-red-500 text-white rounded"
          >
            Remove
          </button>
        )}
      </div>
    </ModalWrapper>
  )
}
