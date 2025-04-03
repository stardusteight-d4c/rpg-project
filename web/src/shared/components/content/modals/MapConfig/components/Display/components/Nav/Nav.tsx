import { Button } from "@/shared/components/ui"
import { PlusCircle } from "@/shared/components/ui/icons"
import React from "react"

export const Nav: React.FC<{ onCreateMode: (value: boolean) => void }> = ({
  onCreateMode,
}) => {
  return (
    <div className="sticky border-b border-border  shadow-sm shadow-black/50 z-[999] top-0 p-2 w-full inset-x-0 bg-background">
      <Button
        action={() => onCreateMode(true)}
        variant="modal"
        title="Create Map"
        bgColor="gradientBlue"
      >
        <PlusCircle />
      </Button>
    </div>
  )
}
