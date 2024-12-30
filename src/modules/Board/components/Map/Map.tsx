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
  const showResetMap = zoom !== 1 || position.x !== 0 || position.y !== 0
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

    // Calculando a posição relativa do mouse no mapa
    const mouseX = e.clientX - e.currentTarget.getBoundingClientRect().left
    const mouseY = e.clientY - e.currentTarget.getBoundingClientRect().top

    // Zoom para dentro ou fora
    const newZoom =
      e.deltaY < 0
        ? Math.min(zoom + 0.1, 3) // Scroll para cima (zoom in)
        : Math.max(zoom - 0.1, 0.5) // Scroll para baixo (zoom out)

    // Calcular a diferença de zoom
    const scaleDifference = newZoom / zoom

    // Ajusta a posição do mapa para que o ponto do cursor permaneça fixo
    setPosition((prevPosition) => {
      const newPosX = prevPosition.x - mouseX * (scaleDifference - 1)
      const newPosY = prevPosition.y - mouseY * (scaleDifference - 1)
      setZoom(newZoom) // Atualiza o zoom
      return {
        x: newPosX,
        y: newPosY,
      }
    })
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
    <div className="relative aspect-square w-[50vw] h-[100vh] overflow-hidden">
      <img
        src="/wallpaper.png"
        className="absolute h-screen object-cover inset-0 select-none pointer-events-none opacity-30 z-0"
        alt=""
      />

      {showResetMap && (
        <div
          onClick={resetConfig}
          className="absolute top-2 left-2 z-50 flex gap-2"
        >
          <div className="flex select-none cursor-pointer items-center group w-fit gap-x-2">
            <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full  shadow-md shadow-black/50 group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M224,128a96,96,0,0,1-94.71,96H128A95.38,95.38,0,0,1,62.1,197.8a8,8,0,0,1,11-11.63A80,80,0,1,0,71.43,71.39a3.07,3.07,0,0,1-.26.25L44.59,96H72a8,8,0,0,1,0,16H24a8,8,0,0,1-8-8V56a8,8,0,0,1,16,0V85.8L60.25,60A96,96,0,0,1,224,128Z"></path>
              </svg>
            </button>
            <span>Default View</span>
          </div>
        </div>
      )}
      <div
        className="w-[50vw] h-[683px] shadow-2xl shadow-black grid absolute"
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
          aspectRatio: "1 / 1",
          overflow: "hidden",
        }}
      >
        <div
          className="absolute circle-effect overflow-hidden pointer-events-none select-none w-[5000px] h-[5000px] z-[50]"
          onDragOver={handleDragOver}
          onDrop={handleDragOver}
          draggable="false"
          style={{
            left: `${(items[0]?.x * 100) / gridSize}%`,
            top: `${(items[0]?.y * 100) / gridSize}%`,
            transform: "translate(-50%, -50%)",
            marginTop: "15px",
            marginLeft: "15px",
          }}
        ></div>
        <Image
          src="/Simple-house-1.png"
          alt="Mapa"
          width={1000}
          height={1000}
          quality={100}
          className="absolute aspect-square z-0 w-full h-full object-fill select-none pointer-events-none"
        />

        {Array.from({ length: gridSize }).map((_, rowIndex) =>
          Array.from({ length: gridSize }).map((_, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onDrop={(e) => handleDrop(e, colIndex, rowIndex)}
              onDragOver={handleDragOver}
              className="relative rounded-full aspect-square overflow-hidden w-fit h-full mx-auto"
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
  player?: boolean 
}

export const DraggableItem: React.FC<DraggableItemProps> = ({
  id,
  imgUrl,
  type,
  setIsItemDragging,
  player
}) => {
  // Manipula o início do arrasto
  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("id", id) // Armazena o ID do item no evento
    e.dataTransfer.setData("imgUrl", imgUrl) // Armazena a URL da imagem
    e.dataTransfer.setData("type", type) // Armazena o tipo do item
    setIsItemDragging && setIsItemDragging(true) // Ativa estado de arrasto de item
  }

  const handleDragEnd = () => setIsItemDragging && setIsItemDragging(false) // Finaliza o arrasto de item
  if (imgUrl.length === 0) return null
  return (
    <img
      draggable
      onMouseEnter={() => setIsItemDragging && setIsItemDragging(true)}
      onMouseLeave={() => setIsItemDragging && setIsItemDragging(false)}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      src={imgUrl}
      alt={type}
      className={`${player ? ' z-[60] ' : ' z-[0] '} w-full relative select-none  object-cover h-full cursor-grab m-auto flex items-center justify-center`}
    />
  )
}
