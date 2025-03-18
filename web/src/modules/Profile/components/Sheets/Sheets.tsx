"use client"

import { motion } from "framer-motion"
import React, { useEffect, useState, useRef } from "react"
import { ProfileInfo } from "@/shared/components/content/Sheet/components/ProfileInfo"
import { SheetModal } from "@/shared/components/content/modals"
import { EmptyState, Heading } from "@/shared/components/ui"
import { AddressBook } from "@/shared/components/ui/icons"
import { useSheets } from "@/shared/contexts"

export const Sheets: React.FC<{ user: IUser }> = ({ user }) => {
  const { userSheets, getUserSheets } = useSheets()
  const sliderRef = useRef<HTMLDivElement>(null)
  const [selectedSheet, setSelectedSheet] = useState<ISheet | null>(null)
  const [openSheetModal, setOpenSheetModal] = useState<boolean>(false)

  const onSelectedSheet = (sheet: ISheet) => {
    setSelectedSheet(sheet)
    setOpenSheetModal(true)
  }

  useEffect(() => {
    ;(async () => {
      await getUserSheets(user.id)
    })()
  }, [user.id])

  return (
    <div>
      <SheetModal
        status={openSheetModal}
        onStatusChange={setOpenSheetModal}
        sheet={selectedSheet!}
      />
      <Heading title="Sheets" className="mb-2">
        <AddressBook />
      </Heading>

      {userSheets.size === 0 ? (
        <EmptyState description="Not even a sheet? Looks like someone is still waiting for the call of the adventure...">
          <AddressBook />
        </EmptyState>
      ) : (
        <motion.div
          ref={sliderRef}
          className="flex w-full gap-4 cursor-grab"
          drag="x"
          dragConstraints={{ right: 0, left: -((userSheets.size - 1) * 640) }}
        >
          {Array.from(userSheets.values()).map((sheet) => (
            <motion.div
              key={sheet.id}
              onDoubleClick={() => onSelectedSheet(sheet)}
              className="max-w-[636px] select-none min-w-[636px] border border-border hover:bg-border hover:brightness-105 p-2 rounded-xl"
            >
              <ProfileInfo character={sheet} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
