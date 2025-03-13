import { Button, ModalWrapper } from "@/shared/components/ui"

export const DeleteContentModal: React.FC<{
  status: boolean
  onStatusChange: (value: boolean) => void
  text: string
  action: () => any | Promise<any>
}> = ({ status, onStatusChange, text, action }) => {
  return (
    <ModalWrapper status={status} onStatusChange={onStatusChange}>
      <div className="w-[500px] p-4">
        <h3 className="block text-3xl font-bold text-red-500">Warning!</h3>
        <div className="flex flex-col mt-4 gap-2 items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="58"
            height="58"
            fill="#ef4444"
            viewBox="0 0 256 256"
          >
            <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
          </svg>
          <span className="block w-[300px] pb-2 text-center text-gray-400">
            {text}
          </span>
          <Button title="Delete" action={action} bgColor="red" />
        </div>
      </div>
    </ModalWrapper>
  )
}
