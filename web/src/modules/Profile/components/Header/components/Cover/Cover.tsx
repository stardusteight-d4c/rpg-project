export const Cover: React.FC<{ image?: string }> = ({ image }) => {
  return image ? (
    <img
      src={image}
      alt=""
      className="pointer-events-none h-[327px] select-none w-screen overflow-hidden object-cover"
    />
  ) : (
    <div className="w-full h-[327px] bg-border"></div>
  )
}
