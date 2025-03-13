"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  CreateSheetModal,
  CreateCampaignModal,
  NotificationsModal,
  SearchModal,
} from "@/shared/components/content/modals"
import { useAuth } from "@/shared/contexts"
import { UserAvatar } from "@/shared/components/content"
import { Button } from "@/shared/components/ui"
import {
  AddressBook,
  Bell,
  Flag,
  MagnifyingGlass,
  Notepad,
  SignOut,
} from "@/shared/components/ui/icons"

export const Navbar = () => {
  const { push } = useRouter()
  const { currentSession, logout } = useAuth()

  const [openSearchModal, setOpenSearchModal] = useState<boolean>(false)
  const [openNotificationsModal, setOpenNotificationsModal] =
    useState<boolean>(false)
  const [openCreateSheetModal, setOpenCreateSheetModal] =
    useState<boolean>(false)
  const [openCreateCampaignModal, setOpenCreateCampaignModal] =
    useState<boolean>(false)

  if (!currentSession) return null

  return (
    <nav className="bg-background fixed inset-x-0 top-0 z-[600] w-screen border-b py-1 border-border shadow-md shadow-black/50 ">
      <CreateSheetModal
        status={openCreateSheetModal}
        onStatusChange={setOpenCreateSheetModal}
      />
      <CreateCampaignModal
        status={openCreateCampaignModal}
        onStatusChange={setOpenCreateCampaignModal}
      />
      <SearchModal
        status={openSearchModal}
        onStatusChange={setOpenSearchModal}
      />
      <NotificationsModal
        status={openNotificationsModal}
        onStatusChange={setOpenNotificationsModal}
      />
      <div className="max-w-7xl flex items-center justify-between mx-auto">
        <h1
          onClick={() => push("/feed")}
          className="font-bold text-3xl cursor-pointer select-none flex gap-y-1"
        >
          <img src="/favicon.png" alt="" className="w-[32px] h-[32px]" />
          Camp
          <span className="background-gradient bg-clip-text text-transparent">
            fire
          </span>
        </h1>
        <div className="flex items-center gap-x-4">
          <Button
            action={() => setOpenSearchModal(true)}
            title="Search"
            bgColor="gradientBlue"
            variant="modal"
          >
            <MagnifyingGlass />
          </Button>

          <Button
            action={() => setOpenCreateSheetModal(true)}
            title="Create Sheet"
            bgColor="gradientBlue"
            variant="modal"
          >
            <AddressBook />
          </Button>

          <Button
            action={() => setOpenCreateCampaignModal(true)}
            title="Create Campaign"
            bgColor="gradientBlue"
            variant="modal"
          >
            <Flag />
          </Button>

          <Button
            action={() => push("/feed")}
            title="Feed"
            bgColor="gradientBlue"
            variant="modal"
          >
            <Notepad />
          </Button>

          <Button
            action={() => setOpenNotificationsModal(true)}
            title="Notifications"
            bgColor="gradientBlue"
            variant="modal"
          >
            <Bell />
            <div className="absolute z-50 top-[4px] right-[7px] rounded-full bg-red-500 w-2 h-2" />
            <div className="absolute z-50 animate-ping top-[4px] right-[7px] rounded-full bg-red-500 w-2 h-2" />
          </Button>

          <Button action={logout} title="Logout" bgColor="red" variant="modal">
            <SignOut />
          </Button>

          <UserAvatar
            name={currentSession.name}
            username={currentSession.username}
            avatarUrl={currentSession.avatarUrl}
            size={32}
            fontSize={16}
          />
        </div>
      </div>
    </nav>
  )
}
