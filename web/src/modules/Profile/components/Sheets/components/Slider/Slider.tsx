import { motion } from "framer-motion"
import React, { useState, useRef, Fragment } from "react"
import { ProfileInfo } from "@/shared/components/content/Sheet/components/ProfileInfo"
import { SheetModal } from "@/shared/components/content/modals"

export const Slider: React.FC<{ sheets: ISheet[] }> = ({ sheets }) => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [selectedSheet, setSelectedSheet] = useState<ISheet | null>(null)
  const [openSheetModal, setOpenSheetModal] = useState<boolean>(false)

  if (sheets.length === 0) return null

  const onSelectedSheet = (sheet: ISheet) => {
    setSelectedSheet(sheet)
    setOpenSheetModal(true)
  }

  return (
    <Fragment>
      <SheetModal
        status={openSheetModal}
        onStatusChange={setOpenSheetModal}
        sheet={selectedSheet!}
      />
      <motion.div
        ref={sliderRef}
        className="flex w-full gap-4 cursor-grab"
        drag="x"
        dragConstraints={{ right: 0, left: -((sheets.length - 1) * 640) }}
      >
        {sheets.map((sheet) => (
          <motion.div
            key={sheet.id}
            onDoubleClick={() => onSelectedSheet(sheet)}
            className="max-w-[636px] select-none min-w-[636px] border border-border hover:bg-border hover:brightness-105 p-2 rounded-xl"
          >
            <ProfileInfo character={sheet} />
          </motion.div>
        ))}
      </motion.div>
    </Fragment>
  )
}
