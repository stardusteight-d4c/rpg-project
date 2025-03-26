import React, { Fragment, useEffect, useState } from "react"
import { ModalWrapper } from "@/shared/components/ui"
import { useCampaigns, useUsers } from "@/shared/contexts"
import { Components } from "./components"

export const SearchModal: React.FC<{
  onStatusChange: (value: boolean) => void
  status: boolean
}> = ({ onStatusChange, status }) => {
  const { listByUsername } = useUsers()
  const { searchByName } = useCampaigns()
  const [users, setUsers] = useState<IUser[]>([])
  const [campaigns, setCampaigns] = useState<ICampaign[]>([])
  const [searchType, setSearchType] = useState<"campaign" | "user">("user")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const userSearch = async () => {
    if (searchTerm.length >= 4 && searchType === "user") {
      setUsers([])
      await listByUsername(searchTerm).then((users) => {
        setUsers(users)
      })
    }
  }

  const campaignsSearch = async () => {
    if (searchTerm.length >= 4 && searchType === "campaign") {
      setCampaigns([])
      await searchByName(searchTerm).then((campaigns) => {
        setCampaigns(campaigns)
      })
    }
  }

  useEffect(() => {
    ;(async () => {
      if (searchTerm.length <= 3) {
        setUsers([])
        setCampaigns([])
      }

      if (isLoading) return

      setIsLoading(true)
      await userSearch()
      await campaignsSearch()
      setIsLoading(false)
    })()
  }, [searchTerm, searchType])

  const handleChangeSearchType = (type: "campaign" | "user") => {
    setSearchTerm("")
    setSearchType(type)
  }

  return (
    <ModalWrapper
      status={status}
      title="Search"
      onStatusChange={onStatusChange}
    >
      <Wrapper>
        <Components.Actions
          onTypeChange={handleChangeSearchType}
          searchType={searchType}
        />
        <Components.Input
          searchTerm={searchTerm}
          searchType={searchType}
          onSearch={setSearchTerm}
        />
        <Components.Users users={users} searchType={searchType} />
        <Components.Campaigns campaigns={campaigns} searchType={searchType} />
        <Components.Loading isLoading={isLoading} searchType={searchType} />
      </Wrapper>
    </ModalWrapper>
  )
}

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const elements = React.Children.toArray(children)

  return (
    <Fragment>
      {elements[0]}
      <div className="w-[700px] px-2 pt-2">
        {elements[1]}
        {elements[2]}
        {elements[3]}
        {elements[4]}
      </div>
    </Fragment>
  )
}
