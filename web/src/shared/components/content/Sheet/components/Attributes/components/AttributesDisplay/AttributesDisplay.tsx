import { GradientSVGWrapper } from "@/shared/components/ui"
import { ChartPie } from "@/shared/components/ui/icons"
import { motion } from "framer-motion"

interface AttributesDisplayProps {
  activeItems: SheetItems[]
  toggleItem: (item: SheetItems) => void
  character: ISheet
}

export const AttributesDisplay = ({
  activeItems,
  character,
  toggleItem,
}: AttributesDisplayProps) => {
  return (
    <div className="my-4">
      <div
        onClick={() => toggleItem("attributes")}
        className="flex py-2 cursor-pointer items-center justify-between sticky top-[47px] z-[100] bg-background"
      >
        <h3 className="text-2xl flex items-center gap-x-2 font-semibold">
          <GradientSVGWrapper size={32}>
            <ChartPie />
          </GradientSVGWrapper>
          <span className="background-gradient bg-clip-text text-transparent">
            Attributes
          </span>
        </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#FFFFFF"
          viewBox="0 0 256 256"
          className={`${
            activeItems.includes("attributes") ? "rotate-180" : "rotate-0"
          } transition-all duration-300 ease-in-out`}
        >
          <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
        </svg>
      </div>
      {activeItems.includes("attributes") && (
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(character.attributes).map(([attribute, value]) => (
            <div
              key={attribute}
              className="bg-border/50 border border-border overflow-hidden rounded"
            >
              <div className="flex justify-between items-center px-4 pt-2">
                <span className="font-medium capitalize text-lg">
                  {attribute}
                </span>
                <span className="w-[35px] h-[35px] rounded-full flex items-center justify-center aspect-square text-center font-medium z-10 relative bg-gray-600/10 outline-none caret-white">
                  {value}
                </span>
              </div>

              <div className="w-full bg-gray-600/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="w-full background-gradient h-[4px] mt-2"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
