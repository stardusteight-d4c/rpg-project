interface CustomNumericInputProps {
  value: number
  onChange: (value: number) => void
}

export const CustomNumericInput: React.FC<CustomNumericInputProps> = ({
  value,
  onChange,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    if (inputValue === "") {
      onChange(0)
      return
    }

    const newValue = parseInt(inputValue, 10)
    if (!isNaN(newValue)) {
      onChange(Math.max(0, Math.min(100, newValue)))
    }
  }

  return (
    <div className="flex min-w-[35px] min-h-[35px] max-w-[35px] max-h-[35px] rounded-full overflow-hidden items-center">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        className="w-[35px] h-[35px] aspect-square text-center font-medium z-10 relative bg-gray-600/10 outline-none caret-white"
      />
    </div>
  )
}
