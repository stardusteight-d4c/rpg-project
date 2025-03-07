import { ModalWrapper } from "@/shared/components/ui"

export const DeleteContentModal: React.FC<{
  status: boolean
  onStatusChange: (value: boolean) => void
  text: string
  action: () => void
  isLoading: boolean
}> = ({ status, onStatusChange, text, action, isLoading }) => {
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
          <span className="block w-[300px] text-center text-gray-400">
            {text}
          </span>
          <button
            onClick={action}
            className={`${
              isLoading
                ? " cursor-not-allowed brightness-90 "
                : " cursor-pointer hover:brightness-125 "
            } p-2 mt-2 w-full flex items-center justify-center max-h-[45px] font-medium text-center text-lg bg-red-500 text-white rounded-full`}
          >
            {isLoading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#FFFFFF"
                className="animate-spin"
                viewBox="0 0 256 256"
              >
                <path d="M136,32V64a8,8,0,0,1-16,0V32a8,8,0,0,1,16,0Zm88,88H192a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16Zm-45.09,47.6a8,8,0,0,0-11.31,11.31l22.62,22.63a8,8,0,0,0,11.32-11.32ZM128,184a8,8,0,0,0-8,8v32a8,8,0,0,0,16,0V192A8,8,0,0,0,128,184ZM77.09,167.6,54.46,190.22a8,8,0,0,0,11.32,11.32L88.4,178.91A8,8,0,0,0,77.09,167.6ZM72,128a8,8,0,0,0-8-8H32a8,8,0,0,0,0,16H64A8,8,0,0,0,72,128ZM65.78,54.46A8,8,0,0,0,54.46,65.78L77.09,88.4A8,8,0,0,0,88.4,77.09Z"></path>
              </svg>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </ModalWrapper>
  )
}
