"use client"

import { GlowingWrapper } from "@/shared/components"
import { useNotifications } from "../../../../shared/contexts/Notifications/NotificationsContext"
import { currentSession } from "../../../../shared/contexts/Users/mock-data"
import { useState } from "react"
import { PlayerNotification } from "./components/PlayerNotification"
import { MasterNotification } from "./components/MasterNotification"

export const Notifications = () => {
  const { notifications, addNotification } = useNotifications()
  const [newNotification, setNewNotification] = useState<string | undefined>(
    undefined
  )

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewNotification(e.target.value)
  }

  const onSend = () => {
    if (!newNotification || newNotification?.length === 0) return
    addNotification({
      id: crypto.randomUUID(),
      content: newNotification,
      owner: currentSession,
      createdAt: new Date().toISOString(),
    })
    setNewNotification("")
  }

  return (
    <section className="h-screen overflow-y-scroll no-scrollbar">
      {currentSession.role === "master" && (
        <div>
          <div
            className={`${
              newNotification ? "  " : " border-b border-border "
            } bg-background z-[200] flex items-center gap-x-4 p-2 bottom-0 inset-x-0`}
          >
            <GlowingWrapper styles="w-full" border="rounded-3xl" inset="0">
              <input
                onChange={(e) => handleInputChange(e)}
                value={newNotification}
                placeholder="Create a notification..."
                spellCheck="false"
                className="p-2 px-4 resize-none overflow-y-scroll no-scrollbar w-full cursor-text hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-3xl bg-border/50 border border-border outline-none"
              />
            </GlowingWrapper>

            <span
              onClick={onSend}
              className="flex hover:brightness-125 active:scale-95 transition-all duration-300 ease-in-out items-center  justify-center text-white p-2 rounded-full w-fit  shadow-md shadow-black/50 cursor-pointer bg-gradient-to-tr from-[#42d392] to-[#8B5CF6]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.49,29.8L102,154l41.3,84.87A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14,0-.07-40.06-82.3,48-48a8,8,0,0,0-11.31-11.31l-48,48L24.08,98.25l-.07,0,.14,0L216,40Z"></path>
              </svg>
            </span>
          </div>
          {newNotification && (
            <MasterNotification notification={{ content: newNotification }} />
          )}
        </div>
      )}
      <div>
        {notifications.map((notification) =>
          notification.owner ? (
            <MasterNotification notification={notification} />
          ) : (
            <PlayerNotification notification={notification} />
          )
        )}
      </div>
    </section>
  )
}
