import React from "react"

interface PaginationProps {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
  length: number
  className?: string
  isLoading?: boolean
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  length,
  className,
  isLoading,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1)
  }

  if (length === 0 || (currentPage === 1 && totalPages === 1)) return

  return (
    <div className={`${className} flex items-center space-x-2`}>
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="px-3 py-1 border border-border shadow-md shadow-black/50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {"<"}
      </button>

      {currentPage !== 1 && (
        <button
          onClick={() => onPageChange(1)}
          className="px-3 py-1 border border-border disabled:cursor-not-allowed shadow-md shadow-black/50 rounded-full"
        >
          {1}
        </button>
      )}

      {currentPage > 1 && currentPage - 1 !== 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1 border border-border disabled:cursor-not-allowed shadow-md shadow-black/50 rounded-full"
        >
          {currentPage - 1}
        </button>
      )}

      <span className="px-3 py-1 font-bold text-white background-gradient rounded-full">
        {currentPage}
      </span>

      {currentPage < totalPages - 1 && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 border border-border disabled:cursor-not-allowed shadow-md shadow-black/50 rounded-full"
        >
          {currentPage + 1}
        </button>
      )}

      {currentPage < totalPages - 2 && (
        <span className="px-3 text-gray-500/80 py-1">...</span>
      )}

      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(totalPages)}
          className="px-3 py-1 border border-border disabled:cursor-not-allowed shadow-md shadow-black/50 rounded-full cursor-pointer"
        >
          {totalPages}
        </button>
      )}

      <button
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        className="px-3 py-1 border border-border shadow-md shadow-black/50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {">"}
      </button>
    </div>
  )
}
