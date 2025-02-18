interface DonutChartProps {
  percentage: number 
  size?: number 
  strokeWidth?: number 
  backgroundColor?: string
}

export const DonutChart: React.FC<DonutChartProps> = ({
  percentage,
  size = 100,
  backgroundColor = '#4b55631a',
  strokeWidth = 10,
}) => {
  const radius = (size - strokeWidth) / 2 
  const circumference = 2 * Math.PI * radius 
  const progress = (percentage / 100) * circumference

  return (
    <div className="flex flex-col items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        style={{ overflow: "visible" }}
      >
        {/* Fundo do círculo */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
        />
        {/* Progresso */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#gradient)" // Usando gradiente para a cor
          strokeWidth={strokeWidth}
          strokeDasharray={`${progress} ${circumference}`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#42D392" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
