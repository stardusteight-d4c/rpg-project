import { randomUUID } from "node:crypto"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useCharacters } from "@/shared/contexts"
import {
  CustomNumericInput,
  GlowingWrapper,
  GradientSVGWrapper,
} from "@/shared/components/ui"
import { ChartPie } from "@/shared/components/ui/icons"

interface AttributesEditProps {
  activeItems: SheetItems[]
  toggleItem: (item: SheetItems) => void
  character: ISheet
}

export const AttributesEdit = ({
  activeItems,
  character,
  toggleItem,
}: AttributesEditProps) => {
  const { updateCopyCharacter } = useCharacters()
  const [editableData, setEditableData] = useState(character.attributes)

  useEffect(() => {
    setEditableData(character.attributes)
    updateCopyCharacter(character.id ?? randomUUID(), {
      attributes: character.attributes,
    })
  }, [character])

  const handleEdit = (field: string, value: any) => {
    setEditableData((prev) => ({ ...prev, [field]: value }))
    updateCopyCharacter(character.id ?? randomUUID(), {
      attributes: { ...editableData, [field]: value },
    })
  }

  return (
    <div className="my-4 rounded">
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
          {Object.entries(editableData).map(([attribute, value]) => (
            <div
              key={attribute}
              className="bg-border/50 border border-border overflow-hidden rounded"
            >
              <div className="flex justify-between items-center px-4 pt-2">
                <span className="font-medium capitalize text-lg">
                  {attribute}
                </span>
                <GlowingWrapper>
                  <CustomNumericInput
                    value={value}
                    onChange={(value) => handleEdit(attribute, value)}
                  />
                </GlowingWrapper>
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
