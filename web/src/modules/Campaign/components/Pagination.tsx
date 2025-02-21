import React from "react"

interface PaginationProps {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1)
  }

  return (
    <div className="flex items-center space-x-2 mt-4">
      <button
        className="px-3 py-1 border border-border shadow-md shadow-black/50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>

      {/* Página Anterior */}
      {currentPage > 1 && (
        <button
          className="px-3 py-1 border border-border shadow-md shadow-black/50 rounded-full"
          onClick={() => onPageChange(currentPage - 1)}
        >
          {currentPage - 1}
        </button>
      )}

      {/* Página Atual */}
      <span className="px-3 py-1 font-bold text-white background-gradient rounded-full">
        {currentPage}
      </span>

      {currentPage < totalPages - 1 && (
        <button
          className="px-3 py-1 border border-border shadow-md shadow-black/50 rounded-full"
          onClick={() => onPageChange(currentPage + 1)}
        >
          {currentPage + 1}
        </button>
      )}

      {/* Indicação de mais páginas */}
      {currentPage < totalPages - 2 && <span className="px-3 text-gray-500/80 py-1">...</span>}

      {/* Última Página */}
      {currentPage < totalPages && (
        <span
          className="px-3 py-1 border border-border shadow-md shadow-black/50 rounded-full cursor-pointer"
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </span>
      )}

      {/* Botão Próximo */}
      <button
        className="px-3 py-1 border border-border shadow-md shadow-black/50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  )
}
