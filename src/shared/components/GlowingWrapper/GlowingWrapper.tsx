interface GlowingWrapperProps {
  children: React.ReactNode
  inset?: string
}

export const GlowingWrapper: React.FC<GlowingWrapperProps> = ({
  children,
  inset,
}) => {
  const insetValue = inset ? ` inset-${inset} ` : " -inset-1 "

  return (
    <div className="relative group">
      <div
        className={`${insetValue} absolute z-[100] rounded-md border-2 border-transparent group-focus-within:border-blue-500 group-hover:border-blue-500 group-hover:brightness-150 transition-all duration-300 pointer-events-none`}
      ></div>
      <div className="relative">{children}</div>
    </div>
  )
}
