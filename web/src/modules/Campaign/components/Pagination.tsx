import { usePosts } from "@/shared/contexts/Posts/PostsContext"
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
  const { postEvents } = usePosts()

  const handlePrev = () => {
    if (currentPage > 1 && !postEvents.gettingPosts)
      onPageChange(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages && !postEvents.gettingPosts)
      onPageChange(currentPage + 1)
  }

  return (
    <div className="flex items-center space-x-2 mt-4">
      <button
        className="px-3 py-1 border border-border disabled:cursor-not-allowed shadow-md shadow-black/50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handlePrev}
        disabled={currentPage === 1 || postEvents.gettingPosts}
      >
        {"<"}
      </button>

      {currentPage !== 1 && (
        <button
          className="px-3 py-1 border border-border disabled:cursor-not-allowed shadow-md shadow-black/50 rounded-full"
          onClick={() => onPageChange(1)}
          disabled={postEvents.gettingPosts}
        >
          {1}
        </button>
      )}

      {/* Página Anterior */}
      {currentPage > 1 && currentPage - 1 !== 1 && (
        <button
          className="px-3 py-1 border border-border disabled:cursor-not-allowed shadow-md shadow-black/50 rounded-full"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={postEvents.gettingPosts}
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
          className="px-3 py-1 border border-border disabled:cursor-not-allowed shadow-md shadow-black/50 rounded-full"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={postEvents.gettingPosts}
        >
          {currentPage + 1}
        </button>
      )}

      {/* Indicação de mais páginas */}
      {currentPage < totalPages - 2 && (
        <span className="px-3 text-gray-500/80 py-1">...</span>
      )}

      {/* Última Página */}
      {currentPage < totalPages && (
        <button
          className="px-3 py-1 border border-border disabled:cursor-not-allowed shadow-md shadow-black/50 rounded-full cursor-pointer"
          onClick={() => onPageChange(totalPages)}
          disabled={postEvents.gettingPosts}
        >
          {totalPages}
        </button>
      )}

      {/* Botão Próximo */}
      <button
        className="px-3 py-1 border border-border shadow-md shadow-black/50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleNext}
        disabled={currentPage === totalPages || postEvents.gettingPosts}
      >
        {">"}
      </button>
    </div>
  )
}
