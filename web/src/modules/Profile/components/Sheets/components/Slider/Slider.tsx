"use client"

import { motion, PanInfo } from "framer-motion"
import React, { useState, useRef, Fragment } from "react"
import { ProfileInfo } from "@/shared/components/content/Sheet/components/ProfileInfo"
import { SheetModal } from "@/shared/components/content/modals"
import { EmptyState, Loader } from "@/shared/components/ui"
import { useAuth } from "@/shared/contexts"

export const Slider: React.FC<{
  sheets: ISheet[]
  onPagination: () => void
  isLoading: boolean
  userId: string
}> = ({ sheets, onPagination, isLoading, userId }) => {
  const { currentSession } = useAuth()
  const sliderRef = useRef<HTMLDivElement>(null)
  const [selectedSheet, setSelectedSheet] = useState<ISheet | null>(null)
  const [openSheetModal, setOpenSheetModal] = useState<boolean>(false)

  if (sheets.length === 0 || !currentSession) return null

  if (currentSession.id !== userId) {
    sheets = sheets.filter((sheet) => sheet.infos.visibility === true)
  }

  const onSelectedSheet = (sheet: ISheet) => {
    setSelectedSheet(sheet)
    setOpenSheetModal(true)
  }

  const handleDrag = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.point.x === 0) {
      onPagination()
    }
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
        onDrag={handleDrag}
      >
        {sheets.map((sheet) => (
          <motion.div
            key={sheet.id}
            onDoubleClick={() => onSelectedSheet(sheet)}
            className="max-w-[636px] select-none min-w-[636px] border border-border hover:bg-border hover:brightness-105 p-2 rounded-xl"
          >
            <ProfileInfo sheet={sheet} />
          </motion.div>
        ))}
        {isLoading && (
          <div className="max-w-[636px] min-w-[636px] rounded-xl">
            <EmptyState
              height={229}
              description="Scouring the abyss of data, searching for character sheets... but something in the darkness watches back."
            >
              <Loader />
            </EmptyState>
          </div>
        )}
      </motion.div>
    </Fragment>
  )
}
