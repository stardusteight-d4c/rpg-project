import { Button } from "@/shared/components/ui"
import React, { Fragment, useState } from "react"

export const Attributes: React.FC<{
  activeSheet: ISheet
  selectedType: "attributes" | "skills"
  rollDice: (selectedRoll: { value: number; name: string }) => void
}> = ({ activeSheet, selectedType, rollDice }) => {
  const [selectedAttribute, setSelectedAttribute] = useState<{
    name: string
    value: number
  } | null>(null)
  if (selectedType !== "attributes") return

  return (
    <div className="flex flex-col gap-4">
      <div className="gap-y-1 p-2 flex flex-col">
        <h4 className="text-sm text-gray-400 block">Attributes</h4>
        <ul className="grid grid-cols-3 gap-2">
          {Object.entries(activeSheet.attributes).map(([attribute, value]) => (
            <div
              onClick={() => setSelectedAttribute({ name: attribute, value })}
              key={attribute}
              className={`${
                selectedAttribute?.name === attribute
                  ? " bg-border brightness-125 "
                  : " bg-border/50 "
              } cursor-pointer border border-border overflow-hidden rounded`}
            >
              <div className="flex justify-between items-center px-2 pt-2">
                <span className="font-medium capitalize text-lg">
                  {attribute}
                </span>
                <span className="bg-gray-600/10 w-[35px] h-[35px] rounded-full flex items-center justify-center aspect-square text-center font-medium z-10 relative bg-ashes outline-none caret-white">
                  {value}
                </span>
              </div>
              <div className="w-full bg-gray-600/10">
                <div
                  style={{ width: `${value}%` }}
                  className="w-full background-gradient h-[4px] mt-2"
                />
              </div>
            </div>
          ))}
        </ul>
      </div>
      {selectedAttribute && (
        <Fragment>
          <div className="custom-inset-shadow z-[100] p-4 sticky bottom-0 inset-x-0 bg-background border-t border-border">
            <Button
              variant="default"
              bgColor="gradientBlue"
              title={`${selectedAttribute.name} Roll`}
              action={async () =>
                rollDice({
                  name: selectedAttribute.name,
                  value: selectedAttribute.value,
                })
              }
            />
          </div>
        </Fragment>
      )}
    </div>
  )
}
