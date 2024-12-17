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
  const resetZoom = () => setZoom(1) // Resetar para 1x

  // Manipuladores de Movimento
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartDragPos({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    // Nova posição baseada no movimento do mouse
    const newPosX = e.clientX - startDragPos.x;
    const newPosY = e.clientY - startDragPos.y;

    // Limites do mapa
    const mapWidth = zoom; // Largura da imagem com zoom
    const mapHeight = zoom; // Altura da imagem com zoom
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;

    const maxX = Math.max(0, (containerWidth - mapWidth) / 2);
    const minX = Math.min(0, (mapWidth - containerWidth) / 2);
    const maxY = Math.max(0, (containerHeight - mapHeight) / 2);
    const minY = Math.min(0, (mapHeight - containerHeight) / 2);

    setPosition({
      x: Math.min(maxX, Math.max(minX, newPosX)),
      y: Math.min(maxY, Math.max(minY, newPosY)),
    });
  };

  const handleMouseUp = () => setIsDragging(false);

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
          onClick={resetZoom}
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
}

export const DraggableItem: React.FC<DraggableItemProps> = ({
  id,
  imgUrl,
  type,
}) => {
  // Manipula o início do arrasto
  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("id", id) // Armazena o ID do item no evento
    e.dataTransfer.setData("imgUrl", imgUrl) // Armazena a URL da imagem
    e.dataTransfer.setData("type", type) // Armazena o tipo do item
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
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
