interface GlowingWrapperProps {
  children: React.ReactNode
  inset?: string
  styles?: string
  border?: string
}

export const GlowingWrapper: React.FC<GlowingWrapperProps> = ({
  children,
  inset,
  styles,
  border,
}) => {
  const insetValue = inset ? ` inset-${inset} ` : " -inset-1 "

  return (
    <div className={`${styles && ` ${styles} `} relative group`}>
      <div
        className={`${insetValue} ${
          border ? ` ${border} ` : " rounded-md "
        } absolute z-[100] border-2 border-transparent group-focus-within:border-blue-500 group-hover:border-blue-500 group-hover:brightness-150 transition-all duration-300 pointer-events-none`}
      ></div>
      <div className="relative">{children}</div>
    </div>
  )
}
