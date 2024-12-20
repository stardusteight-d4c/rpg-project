interface GlowingWrapperProps {
  children: React.ReactNode;
}

export const GlowingWrapper: React.FC<GlowingWrapperProps> = ({ children }) => {
  return (
    <div className="relative group">
    {/* Efeito de brilho e borda no hover */}
    <div className="absolute z-50 -inset-1 rounded-md border-2 border-transparent group-hover:border-blue-500 group-hover:brightness-150 transition-all duration-300 pointer-events-none"></div>
    {/* Conteúdo interno */}
    <div className="relative">{children}</div>
  </div>
  );
};

