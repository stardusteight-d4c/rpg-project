"use client"

import React, { useState, DragEvent } from "react"
import Image from "next/image"

// Define o tipo de item no grid
interface GridItem {
  id: string // Identificador único do item
  type: string // Tipo do item (usado para lógica ou estilização)
  x: number // Coluna atual
  y: number // Linha atual
  imgUrl: string // URL da imagem do item
}

// Componente principal do mapa
export const Map: React.FC = () => {
  const [items, setItems] = useState<GridItem[]>([]) // Começa com o grid vazio
  const gridSize = 20 // Número de linhas e colunas no grid
  const [zoom, setZoom] = useState(1) // Estado para o zoom
  const [position, setPosition] = useState({ x: 0, y: 0 }) // Estado para posição do mapa
  const [isDragging, setIsDragging] = useState(false) // Estado para arrasto
  const [startDragPos, setStartDragPos] = useState({ x: 0, y: 0 }) // Posição inicial ao arrastar
  const [isItemDragging, setIsItemDragging] = useState(false) // Novo estado para arrasto de itens

  // Manipula o drop dos itens no grid
  const handleDrop = (e: DragEvent<HTMLDivElement>, x: number, y: number) => {
    e.preventDefault()

    // Recupera os dados do item arrastado
    const itemId = e.dataTransfer.getData("id")
    const imgUrl = e.dataTransfer.getData("imgUrl")
    const type = e.dataTransfer.getData("type")

    setItems((prev) => {
      // Verifica se o item já existe no grid
      const existingItem = prev.find((item) => item.id === itemId)
      if (existingItem) {
        // Atualiza a posição se já existir
        return prev.map((item) =>
          item.id === itemId ? { ...item, x, y } : item
        )
      } else {
        // Adiciona o item se ainda não existir
        return [
          ...prev,
          {
            id: itemId,
            type,
            x,
            y,
            imgUrl, // Usa a URL da imagem do item arrastado
          },
        ]
      }
    })
  }

  // Previne o comportamento padrão ao arrastar sobre uma célula
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const increaseZoom = () => setZoom((prev) => Math.min(prev + 0.1, 3)) // Máximo 3x
  const decreaseZoom = () => setZoom((prev) => Math.max(prev - 0.1, 0.5)) // Mínimo 0.5x
  const resetConfig = () => (
    setZoom(1),
    setPosition({
      x: Math.min(Math.max(0)),
      y: Math.min(Math.max(0)),
    })
  )

  // Manipula o scroll para ajustar o zoom
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault()

    // Zoom para dentro ou fora
    const newZoom =
      e.deltaY < 0
        ? Math.min(zoom + 0.1, 3) // Scroll para cima (zoom in)
        : Math.max(zoom - 0.1, 0.5) // Scroll para baixo (zoom out)

    setZoom(newZoom)
  }

  // Manipuladores de Movimento
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isItemDragging) return
    setIsDragging(true)
    setStartDragPos({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return

    // Nova posição baseada no movimento do mouse
    const newPosX = e.clientX - startDragPos.x
    const newPosY = e.clientY - startDragPos.y

    setPosition({
      x: Math.min(Math.max(newPosX)),
      y: Math.min(Math.max(newPosY)),
    })
  }

  const handleMouseUp = () => setIsDragging(false)

  return (
    <div className="relative w-[50vw] h-[100vh] overflow-hidden">
      <div className="absolute top-4 left-4 z-50 flex gap-2">
        <button
          onClick={increaseZoom}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          +
        </button>
        <button
          onClick={decreaseZoom}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          -
        </button>
        <button
          onClick={resetConfig}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Reset
        </button>
      </div>
      <div
        className="w-[50vw] h-[100vh] grid absolute"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
          transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
          transformOrigin: "top left",
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        {/* Background do mapa */}
        <Image
          src="/Simple-house-1.png"
          alt="Mapa"
          width={1000}
          height={1000}
          className="absolute z-0 w-full h-full object-fill select-none pointer-events-none"
        />

        {/* Grid com células */}
        {Array.from({ length: gridSize }).map((_, rowIndex) =>
          Array.from({ length: gridSize }).map((_, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onDrop={(e) => handleDrop(e, colIndex, rowIndex)}
              onDragOver={handleDragOver}
              className="relative overflow-hidden"
            >
              {items
                .filter((item) => item.x === colIndex && item.y === rowIndex)
                .map((item) => (
                  <DraggableItem
                    key={item.id}
                    id={item.id}
                    imgUrl={item.imgUrl}
                    type={item.type}
                    setIsItemDragging={setIsItemDragging}
                  />
                ))}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// Componente para itens arrastáveis
interface DraggableItemProps {
  id: string // Identificador único do item
  imgUrl: string // URL da imagem
  type: string // Tipo do item (usado para lógica ou estilização)
  setIsItemDragging?: (isDragging: boolean) => void
}

export const DraggableItem: React.FC<DraggableItemProps> = ({
  id,
  imgUrl,
  type,
  setIsItemDragging,
}) => {
  // Manipula o início do arrasto
  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("id", id) // Armazena o ID do item no evento
    e.dataTransfer.setData("imgUrl", imgUrl) // Armazena a URL da imagem
    e.dataTransfer.setData("type", type) // Armazena o tipo do item
    setIsItemDragging && setIsItemDragging(true) // Ativa estado de arrasto de item
  }

  const handleDragEnd = () => setIsItemDragging && setIsItemDragging(false) // Finaliza o arrasto de item

  return (
    <div
      draggable
      onMouseEnter={() => setIsItemDragging && setIsItemDragging(true)}
      onMouseLeave={() => setIsItemDragging && setIsItemDragging(false)}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="w-full h-full cursor-grab m-auto flex items-center justify-center"
    >
      <img
        src={imgUrl}
        alt={type}
        className="w-full border border-border rounded h-full select-none object-cover"
      />
    </div>
  )
}
