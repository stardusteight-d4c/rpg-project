"use client"

import React, { useState, DragEvent, useRef, useEffect } from "react"
import { DraggableItem } from "../../DraggableItem"
import { useMaps } from "@/modules/Board/contexts/Maps/MapsContext"
import { currentSession } from "@/modules/Board/contexts/Users/mock-data"

interface GridItem {
  id: string
  type: string
  x: number
  y: number
  imgUrl: string
}

export const Exploration: React.FC<{
  map: IMap
}> = ({ map }) => {
  const { wallpaper, addWallpaper } = useMaps()
  const [items, setItems] = useState<GridItem[]>([])
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [startDragPos, setStartDragPos] = useState({ x: 0, y: 0 })
  const [isItemDragging, setIsItemDragging] = useState(false)
  const showResetMap = zoom !== 1 || position.x !== 0 || position.y !== 0
  const [file, setFile] = useState<File | undefined>(undefined)

  function handleClick() {
    const fileInput = document.getElementById("file-input") as HTMLInputElement
    if (fileInput) {
      fileInput.click()
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      const tempUrl = URL.createObjectURL(file)
      setFile(file)
      addWallpaper(tempUrl)
    }
  }

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
    <div className="relative w-full h-[100vh] overflow-hidden">
      <div className="px-2 border border-border bg-background w-fit z-50 shadow-sm shadow-black/50 rounded-full font-medium text-xl absolute bottom-4 right-4">
        <span className="background-gradient bg-clip-text text-transparent whitespace-nowrap select-none cursor-default pointer-events-none">
          {map.name}
        </span>
      </div>
      {map.grid_size?.length &&
        map.grid_size?.length > 0 &&
        currentSession.role === "master" && (
          <div className="absolute bottom-4 left-4 z-50">
            <div
              onClick={handleClick}
              className="flex cursor-pointer select-none items-center group w-fit gap-x-2"
            >
              <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full  shadow-md shadow-black/50 group-hover:bg-blue-500 duration-300 ease-in-out transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#FFFFFF"
                  viewBox="0 0 256 256"
                >
                  <path d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0ZM93.66,77.66,120,51.31V144a8,8,0,0,0,16,0V51.31l26.34,26.35a8,8,0,0,0,11.32-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40A8,8,0,0,0,93.66,77.66Z"></path>
                </svg>
              </button>
              <span className="capitalize">
                {wallpaper
                  ? "Change Background Wallpaper"
                  : "Upload Background Wallpaper"}
              </span>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
        )}

      {map.grid_size?.length && map.grid_size?.length > 0 && wallpaper && (
        <>
          <img
            src={wallpaper}
            className="absolute h-screen object-cover inset-0 select-none pointer-events-none opacity-50 z-0"
            alt=""
          />
        </>
      )}

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
        className="w-full min-h-[100vh] shadow-2xl shadow-black grid absolute"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{
          gridTemplateColumns: `repeat(${map.grid_size![0]}, 1fr)`,
          gridTemplateRows: `repeat(${map.grid_size![1]}, 1fr)`,
          transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
          transformOrigin: "top left",
          cursor: isDragging ? "grabbing" : "grab",
          // aspectRatio: "1 / 1",
          overflow: "hidden",
        }}
      >
        {map.visibility === "low" && <FogOfWar map={map} items={items} />}
        <img
          src={map.image_url}
          alt="Mapa"
          className="absolute z-0 w-full h-full object-fill select-none pointer-events-none"
        />

        {Array.from({ length: map.grid_size![1] }).map((_, rowIndex) =>
          Array.from({ length: map.grid_size![0] }).map((_, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onDrop={(e) => handleDrop(e, colIndex, rowIndex)}
              onDragOver={handleDragOver}
              className="relative w-full border border-transparent rounded-full z-50 aspect-square overflow-hidden h-fit mx-auto"
            >
              <div>
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
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export const FogOfWar: React.FC<{
  map: IMap
  items: GridItem[]
}> = ({ map, items }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    ctx.fillStyle = "#090909"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.globalCompositeOperation = "destination-out"

    items.forEach((item) => {
      const cellWidth = canvas.width / map.grid_size![0]
      const cellHeight = canvas.height / map.grid_size![1]

      const gridX = (item.x + 0.5) * cellWidth // Centraliza no meio do quadrado
      const gridY = (item.y + 0.5) * cellHeight // Centraliza no meio do quadrado
      const radius = Math.max(cellWidth, cellHeight) * 2 // Garante que cobre 2 quadrados ao redor

      const gradient = ctx.createRadialGradient(
        gridX,
        gridY,
        radius * 0.3,
        gridX,
        gridY,
        radius
      )

      gradient.addColorStop(0, "rgba(9, 9, 9, 1)")
      gradient.addColorStop(1, "rgba(9, 9, 9, 0)")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(gridX, gridY, radius, 0, Math.PI * 2)
      ctx.fill()
    })

    ctx.globalCompositeOperation = "source-over"
  }, [map, items])

  return (
    <canvas
      ref={canvasRef}
      className="absolute z-[600] top-0 left-0 w-full h-full pointer-events-none"
    />
  )
}
