import { GradientSVGWrapper } from "@/shared/components/ui"
import { ChartLineUp, ChartPie } from "@/shared/components/ui/icons"
import React from "react"

export const SelectType: React.FC<{
  selectedType: "attributes" | "skills"
  onSelectedType: (type: "attributes" | "skills") => void
}> = ({ selectedType, onSelectedType }) => {
  return (
    <div className="flex p-2 flex-col gap-y-1">
      <h4 className="text-sm text-gray-400 block">Choose a Type</h4>
      <div className="flex items-center gap-2">
        <span
          onClick={() => onSelectedType("attributes")}
          className={`${
            selectedType === "attributes"
              ? " background-gradient "
              : " bg-border "
          } hover:brightness-125 p-2 rounded-xl cursor-pointer`}
        >
          {selectedType === "attributes" ? (
            <ChartPie />
          ) : (
            <GradientSVGWrapper size={32}>
              <ChartPie />
            </GradientSVGWrapper>
          )}
        </span>
        <span
          onClick={() => onSelectedType("skills")}
          className={`${
            selectedType === "skills" ? " background-gradient " : " bg-border "
          } hover:brightness-125 p-2 rounded-xl cursor-pointer`}
        >
          {selectedType === "skills" ? (
            <ChartLineUp />
          ) : (
            <GradientSVGWrapper size={32}>
              <ChartLineUp />
            </GradientSVGWrapper>
          )}
        </span>
      </div>
    </div>
  )
}
