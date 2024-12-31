"use client"

import React, { useState, DragEvent } from "react"
import Image from "next/image"

interface GridItem {
  id: string
  type: string
  x: number
  y: number
  imgUrl: string
}

export const Map: React.FC = () => {
  const [items, setItems] = useState<GridItem[]>([])
  const gridSize = 20
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [startDragPos, setStartDragPos] = useState({ x: 0, y: 0 })
  const [isItemDragging, setIsItemDragging] = useState(false)
  const showResetMap = zoom !== 1 || position.x !== 0 || position.y !== 0
  const handleDrop = (e: DragEvent<HTMLDivElement>, x: number, y: number) => {
    e.preventDefault()

    const itemId = e.dataTransfer.getData("id")
    const imgUrl = e.dataTransfer.getData("imgUrl")
    const type = e.dataTransfer.getData("type")

    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === itemId)
      if (existingItem) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, x, y } : item
        )
      } else {
        return [
          ...prev,
          {
            id: itemId,
            type,
            x,
            y,
            imgUrl,
          },
        ]
      }
    })
  }

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

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault()

    const mouseX = e.clientX - e.currentTarget.getBoundingClientRect().left
    const mouseY = e.clientY - e.currentTarget.getBoundingClientRect().top

    const newZoom =
      e.deltaY < 0 ? Math.min(zoom + 0.1, 3) : Math.max(zoom - 0.1, 0.5)

    const scaleDifference = newZoom / zoom

    setPosition((prevPosition) => {
      const newPosX = prevPosition.x - mouseX * (scaleDifference - 1)
      const newPosY = prevPosition.y - mouseY * (scaleDifference - 1)
      setZoom(newZoom)
      return {
        x: newPosX,
        y: newPosY,
      }
    })
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isItemDragging) return
    setIsDragging(true)
    setStartDragPos({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return

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

interface DraggableItemProps {
  id: string
  imgUrl: string
  type: string
  setIsItemDragging?: (isDragging: boolean) => void
  player?: boolean
}

export const DraggableItem: React.FC<DraggableItemProps> = ({
  id,
  imgUrl,
  type,
  setIsItemDragging,
  player,
}) => {
  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("id", id)
    e.dataTransfer.setData("imgUrl", imgUrl)
    e.dataTransfer.setData("type", type)
    setIsItemDragging && setIsItemDragging(true)
  }

  const handleDragEnd = () => setIsItemDragging && setIsItemDragging(false)
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
      className={`${
        player ? " z-[60] " : " z-[0] "
      } w-full relative select-none  object-cover h-full cursor-grab m-auto flex items-center justify-center`}
    />
  )
}
